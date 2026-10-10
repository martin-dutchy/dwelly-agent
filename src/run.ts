// Batch runner: process every case folder autonomously and write ANSWERS/<id>/.
// Usage: pnpm cases --in cases/practice --out ANSWERS [--only 01,06] [--concurrency 6] [--model claude-sonnet-5-5]
// Robustness: add --chaos 0.15 [--seed x] to inject random tool failures into every case.
// Public-format cases: pnpm cases --in "HackatonPublicCases/Property Management" --out runs/pm [--at auto|12|50%|none]
//   --at defaults to "auto" (replay: cut at a decision point) under HackatonPublicCases/ and to "none" (take the
//   case as it comes, every event visible) anywhere else, which is what the Reality Test cases need.
// Time budget: --deadline HH:MM (local) and/or --budget-min M; the earlier wins. Per-case timeouts shrink to fit,
//   cases that can no longer start get an honest "not processed" escalation. --resume keeps finished cases.
//   Ctrl-C once: in-flight cases get the fallback answer, unstarted ones are skipped; twice: exit at once.
// Ends with an estimated operational-value line and writes <out>/RUN_SUMMARY.md (per-case table and the summary lines).
import 'dotenv/config';
import { execFileSync } from 'node:child_process';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { toolsetStartLine } from './agent/adapters/organiserApi.js';
import { readOrganiserEnv } from './agent/adapters/toolMap.js';
import { listCases } from './agent/cases.js';
import { flagsLine, parseHarnessFlags } from './agent/harness/flags.js';
import { claude, streamFn, temperatureFor } from './agent/models.js';
import { jevEnabled } from './agent/jev.js';
import { createOpsToolset } from './agent/opsTools.js';
import { operationalValue, runSummaryMarkdown, valueLine } from './agent/runValue.js';
import { baseTimeoutMs, caseTimeoutMs, hhmm, parseDeadline } from './runner/budget.js';
import { budgetSkipFiles, writeFallback } from './runner/fallback.js';
import { processCase as runOneCase } from './runner/processCase.js';
import { isComplete, resumedRow } from './runner/resume.js';
import { retryLine, retryStats } from './runner/retries.js';
import { NO_DECISION, type Row } from './runner/types.js';

const { values } = parseArgs({
  options: {
    in: { type: 'string', default: 'cases/practice' },
    out: { type: 'string', default: 'ANSWERS' },
    only: { type: 'string' },
    concurrency: { type: 'string', default: '6' },
    model: { type: 'string', default: process.env.CASE_MODEL ?? 'claude-sonnet-5-5' },
    thinking: { type: 'string', default: 'medium' },
    timeout: { type: 'string', default: '300' },
    at: { type: 'string' },
    chaos: { type: 'string', default: '0' },
    seed: { type: 'string', default: '1' },
    'budget-min': { type: 'string' },
    deadline: { type: 'string' },
    resume: { type: 'boolean', default: false },
    // Pre-submit critic. CRITIC=on in the environment also reaches the runs `pnpm loop` spawns.
    critic: { type: 'string', default: process.env.CRITIC || 'off' },
    // Harness v2 layers, e.g. --harness brief,skills or all. HARNESS in the environment also reaches `pnpm loop` runs.
    harness: { type: 'string', default: process.env.HARNESS ?? '' },
  },
});
if (!['on', 'off'].includes(values.critic!)) {
  console.error('--critic must be on or off');
  process.exit(1);
}
let flags: ReturnType<typeof parseHarnessFlags>;
try {
  flags = parseHarnessFlags(values.harness);
} catch (e) {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
}
const THINKING = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'] as const;
type Thinking = (typeof THINKING)[number];
if (!THINKING.includes(values.thinking as Thinking)) {
  console.error(`--thinking must be one of ${THINKING.join(', ')}`);
  process.exit(1);
}
const thinking = values.thinking as Thinking;
/** For run.json only; must match the thinking level critic/critic.ts runs the critic at. */
const CRITIC_THINKING = 'low';
const criticModel = values.critic === 'on' ? claude(process.env.CRITIC_MODEL || 'claude-opus-5-5') : undefined;

const t0 = Date.now();
let deadline: Date | undefined;
try {
  deadline = parseDeadline(values['budget-min'], values.deadline, new Date(t0));
} catch (e) {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
}
const budgetMs = deadline ? deadline.getTime() - t0 : undefined;
const runFlags = process.argv
  .slice(2)
  .map((a) => (/[\s'"$`\\]/.test(a) ? JSON.stringify(a) : a))
  .join(' ');

const model = claude(values.model!);
try {
  mkdirSync(values.out!, { recursive: true });
} catch (e) {
  console.error(`cannot create ${values.out}: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
}
const runLog = join(values.out!, 'run.log');
/** Console output, mirrored with timestamps to <out>/run.log. */
const log = (line: string) => {
  console.log(line);
  try {
    appendFileSync(runLog, `${new Date().toISOString()} ${line}\n`);
  } catch {}
};
const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const git = (...args: string[]) => {
  try {
    return execFileSync('git', args, { cwd: REPO, timeout: 5000, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return undefined;
  }
};
const organiser = readOrganiserEnv(process.env);
const only = values.only?.split(',').map((s) => s.trim());
const dirs = listCases(values.in!).filter((d) => !only || only.some((o) => d.endsWith(`/${o}`)));
const outDirOf = (dir: string) => join(values.out!, basename(dir));

// Ctrl-C: the first stops the run cleanly (see header), the second exits at once.
const interrupt = new AbortController();
process.on('SIGINT', () => {
  if (interrupt.signal.aborted) process.exit(130);
  console.log('\nCtrl-C: stopping. Running cases get the fallback answer, unstarted cases are skipped. Ctrl-C again exits at once.');
  deadline = new Date();
  interrupt.abort();
});

/** Extra time a case gets after its own timeout before the runner stops it. Must stay below
 *  WRITE_MARGIN_MS in budget.ts, so a stopped case still ends before the deadline. */
const GUARD_GRACE_MS = 15_000;
let abandoned = 0;
const processCase = (dir: string, timeoutMs: number) =>
  runOneCase(dir, timeoutMs, {
    outDir: outDirOf(dir),
    modelId: values.model!,
    model,
    streamFn,
    thinking,
    criticModel,
    flags,
    at: values.at,
    chaos: Number(values.chaos),
    seed: values.seed!,
    organiser,
    interrupt: interrupt.signal,
    graceMs: GUARD_GRACE_MS,
    log,
    onStopped: () => abandoned++,
  });

function skipCase(dir: string): Row {
  const id = basename(dir);
  const outDir = outDirOf(dir);
  try {
    mkdirSync(outDir, { recursive: true });
    const reason = interrupt.signal.aborted ? 'interrupt' : 'budget';
    writeFallback(outDir, budgetSkipFiles(id, { deadline: deadline ?? new Date(), skippedAt: new Date(), reason, flags: runFlags }));
  } catch (e) {
    console.error(`  could not write the skip answer for ${id}: ${e instanceof Error ? e.message : String(e)}`);
  }
  return { id, outcome: 'BUDGET SKIP', actions: 0, failed: 0, cost: 0, secs: 0, retries: 0, note: 'budget' };
}

async function pool<T, R>(items: T[], n: number, fn: (t: T) => Promise<R>) {
  const results: R[] = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await fn(items[idx]);
        const r = results[idx] as Row;
        log(`  ✓ ${r.id} ${r.outcome} · ${r.actions} actions (${r.failed} not verified) (${r.secs.toFixed(0)}s, $${r.cost.toFixed(3)})${r.error ? ` ERROR ${r.error}` : ''}`);
      }
    }),
  );
  return results;
}

const concurrency = Number(values.concurrency);
const done = values.resume ? dirs.filter((d) => isComplete(outDirOf(d))) : [];
const todo = dirs.filter((d) => !done.includes(d));
const base = baseTimeoutMs(Number(values.timeout), budgetMs, concurrency, todo.length);

const manifest = {
  startedAt: new Date(t0).toISOString(),
  command: `pnpm cases ${runFlags}`,
  args: values,
  model: values.model,
  thinking,
  temperature: temperatureFor(model, thinking),
  critic: criticModel?.id ?? 'off',
  models: {
    agent: { id: model.id, thinking, temperature: temperatureFor(model, thinking) },
    ...(criticModel && { critic: { id: criticModel.id, thinking: CRITIC_THINKING, temperature: temperatureFor(criticModel, CRITIC_THINKING) } }),
  },
  harness: flags,
  jev: jevEnabled(),
  commit: git('rev-parse', 'HEAD'),
  dirty: !!git('status', '--porcelain'),
  node: process.version,
  cases: dirs.map((d) => basename(d)),
};
try {
  writeFileSync(join(values.out!, 'run.json'), JSON.stringify(manifest, null, 2));
} catch {}
const startLines = [
  `Running ${dirs.length} cases with ${values.model}, thinking ${thinking} (concurrency ${values.concurrency}, Jev ${jevEnabled() ? 'on' : 'off'}${criticModel ? `, critic ${criticModel.id}` : ''}${flagsLine(flags) !== 'none' ? `, harness ${flagsLine(flags)}` : ''}${Number(values.chaos) > 0 ? `, chaos ${values.chaos} seed ${values.seed}` : ''}${deadline ? `, deadline ${hhmm(deadline)}, case timeout ${Math.round(base / 1000)}s` : ''}${values.resume ? `, resuming ${done.length} of ${dirs.length}` : ''}) at commit ${manifest.commit?.slice(0, 8) ?? 'unknown'}${manifest.dirty ? ' with uncommitted changes' : ''}…`,
  toolsetStartLine(organiser, createOpsToolset().tools.map((t) => t.name)),
];
for (const l of startLines) log(l);
const ran = await pool(todo, concurrency, async (dir) => {
  const t = caseTimeoutMs(base, deadline, Date.now());
  return t === 'skip' ? skipCase(dir) : processCase(dir, t);
});
const byDir = new Map<string, Row>([...done.map((d): [string, Row] => [d, resumedRow(outDirOf(d), basename(d))]), ...todo.map((d, i): [string, Row] => [d, ran[i]])]);
const rows = dirs.map((d) => byDir.get(d)!);
console.table(rows.map((r) => ({ ...r, cost: `$${r.cost.toFixed(3)}`, secs: Math.round(r.secs) })));
const total = rows.reduce((a, r) => a + r.cost, 0);
const wallMs = Date.now() - t0;
const skipped = rows.filter((r) => r.note === 'budget').length;
const doneLine = `Done in ${(wallMs / 1000).toFixed(0)}s · total cost $${total.toFixed(2)} · decisions ${rows.filter((r) => !NO_DECISION.has(r.outcome)).length}/${rows.length} · resumed ${done.length} · budget-skipped ${skipped}`;
const retrySummary = retryLine(retryStats(ran), concurrency, ran.length - skipped, wallMs, budgetMs);
log(doneLine);
log(retrySummary);
if (skipped) console.log(`Skipped cases can be re-run with the same command plus --resume (and a new --deadline).`);
try {
  const value = valueLine(operationalValue(rows), organiser ? 'organiser API, local mock after any failure' : 'local mock environment');
  log(value);
  mkdirSync(values.out!, { recursive: true });
  writeFileSync(join(values.out!, 'RUN_SUMMARY.md'), runSummaryMarkdown({ command: `pnpm cases ${runFlags}`, startLines, rows, doneLine, retryLine: retrySummary, valueLine: value }));
  writeFileSync(join(values.out!, 'run.json'), JSON.stringify({ ...manifest, finishedAt: new Date().toISOString(), totalCost: total, rows }, null, 2));
} catch (e) {
  console.error(`Could not write RUN_SUMMARY.md or run.json: ${e instanceof Error ? e.message : String(e)}`);
}

// Abandoned agents (timed out past the guard, or interrupted) may still be running: flush the output and exit.
const code = interrupt.signal.aborted ? 130 : 0;
if (abandoned || code) process.stdout.write('', () => process.exit(code));
