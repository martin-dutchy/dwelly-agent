// Batch runner: process every case folder autonomously and write ANSWERS/<id>/.
// Usage: pnpm cases --in cases/practice --out ANSWERS [--only 01,06] [--concurrency 6] [--model claude-sonnet-5-5]
// Robustness: add --chaos 0.15 [--seed x] to inject random tool failures into every case.
// Public-format cases: pnpm cases --in "HackatonPublicCases/Property Management" --out runs/pm [--at auto|12|50%]
// Thinking: --thinking off|minimal|low|medium|high|xhigh|max (default medium). Claude's summarised thinking is logged.
// Per case: ANSWER.md, REASONING.md, TRANSCRIPT.md (full, untruncated), trace.jsonl, result.json.
// Per run: RUN.md (index), run.json (manifest: git commit, args, models), run.log (console output).
import 'dotenv/config';
import { execFileSync } from 'node:child_process';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { chaosPlan } from './core/failures.js';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { runCase } from './agent/caseAgent.js';
import { type LoadedCase, casePrompt, listCases, loadCase } from './agent/cases.js';
import { claude, streamFn } from './agent/models.js';
import { jevEnabled, prescreen, screenNote } from './agent/jev.js';
import { createOpsToolset } from './agent/opsTools.js';
import { type Usage, renderAnswer, renderReasoning, renderTranscript } from './agent/report.js';
import { CASE_SYSTEM_PROMPT } from './agent/systemPrompt.js';

const { values } = parseArgs({
  options: {
    in: { type: 'string', default: 'cases/practice' },
    out: { type: 'string', default: 'ANSWERS' },
    only: { type: 'string' },
    concurrency: { type: 'string', default: '6' },
    model: { type: 'string', default: process.env.CASE_MODEL ?? 'claude-sonnet-5-5' },
    thinking: { type: 'string', default: 'medium' },
    timeout: { type: 'string', default: '300' },
    at: { type: 'string', default: 'auto' },
    chaos: { type: 'string', default: '0' },
    seed: { type: 'string', default: '1' },
  },
});

const THINKING = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'] as const;
type Thinking = (typeof THINKING)[number];
if (!THINKING.includes(values.thinking as Thinking)) throw new Error(`--thinking must be one of ${THINKING.join(', ')}`);
const thinking = values.thinking as Thinking;

const model = claude(values.model!);
mkdirSync(values.out!, { recursive: true });
const runLog = join(values.out!, 'run.log');
// Console output is mirrored to run.log so a reader can see exactly what the run printed.
const log = (line: string) => {
  console.log(line);
  appendFileSync(runLog, `${new Date().toISOString()} ${line}\n`);
};
const git = (...args: string[]) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim();
  } catch {
    return undefined;
  }
};
const only = values.only?.split(',').map((s) => s.trim());
const dirs = listCases(values.in!).filter((d) => !only || only.some((o) => d.endsWith(`/${o}`)));

type Row = { id: string; outcome: string; severity?: string; actions: number; failed: number; escalated: boolean; cost: number; secs: number; error?: string };

async function processCase(dir: string): Promise<Row> {
  const started = Date.now();
  let c: LoadedCase | undefined;
  const outDir = join(values.out!, dir.split('/').at(-1)!);
  mkdirSync(outDir, { recursive: true });
  try {
    c = loadCase(dir, values.at);
    const prompt = casePrompt(c);
    const screen = await prescreen(prompt);
    const toolset = createOpsToolset(c.seedTickets);
    const writeTools = toolset.tools.filter((t) => t.kind === 'write').map((t) => t.name);
    const failures = chaosPlan(writeTools, Number(values.chaos), `${values.seed}:${c.id}`, c.failures);
    const chaos = Object.fromEntries(Object.entries(failures).filter(([k]) => !(k in c!.failures)));
    const run = await runCase({
      caseId: c.id,
      prompt: prompt + screenNote(screen),
      systemPrompt: CASE_SYSTEM_PROMPT,
      model,
      streamFn,
      failures,
      media: c.media,
      toolset,
      thinkingLevel: thinking,
      timeoutMs: Number(values.timeout) * 1000,
    });
    const assistants = run.messages.filter((m: any) => m.role === 'assistant') as any[];
    const usage: Usage = {
      input: assistants.reduce((a, m) => a + (m.usage?.input ?? 0), 0),
      output: assistants.reduce((a, m) => a + (m.usage?.output ?? 0), 0),
      cost: assistants.reduce((a, m) => a + (m.usage?.cost?.total ?? 0), 0),
      turns: assistants.length,
      durationMs: Date.now() - started,
    };
    const thinkingTokens = assistants.reduce((a, m) => a + (m.usage?.reasoning ?? 0), 0);
    writeFileSync(join(outDir, 'ANSWER.md'), renderAnswer(c, run.decision, run.ledger, run.error));
    writeFileSync(join(outDir, 'REASONING.md'), renderReasoning(c, run.decision, run.ledger, run.messages, usage, run.error, { screen, gateLog: run.gateLog, policyLog: run.policyLog, chaos }));
    writeFileSync(join(outDir, 'TRANSCRIPT.md'), renderTranscript(c, { model: values.model!, thinking, systemPrompt: CASE_SYSTEM_PROMPT, messages: run.messages, trace: run.trace, error: run.error }));
    writeFileSync(join(outDir, 'trace.jsonl'), run.trace.map((e) => JSON.stringify(e)).join('\n') + '\n');
    writeFileSync(
      join(outDir, 'result.json'),
      JSON.stringify(
        {
          id: c.id,
          model: values.model,
          thinking,
          cutoff: c.cutoff,
          totalEvents: c.totalEvents,
          inputs: c.inputs.map((i) => ({ name: i.name, ...i.parse })),
          withheld: c.withheld,
          chaos,
          screen,
          gateLog: run.gateLog,
          policyLog: run.policyLog,
          decision: run.decision,
          ledger: run.ledger,
          state: run.state,
          usage: { ...usage, thinkingTokens },
          error: run.error,
        },
        null,
        2,
      ),
    );
    return {
      id: c.id,
      outcome: run.decision?.outcome ?? 'NO DECISION',
      severity: run.decision?.severity,
      actions: run.ledger.length,
      failed: run.ledger.filter((e) => e.status !== 'verified').length,
      escalated: run.ledger.some((e) => e.tool === 'escalate_to_human' && e.status === 'verified'),
      cost: usage.cost,
      secs: usage.durationMs / 1000,
      error: run.error,
    };
  } catch (e) {
    // A crash must never cost us the case: write an honest fallback and move on.
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    writeFileSync(join(outDir, 'ANSWER.md'), `# Case ${c?.id ?? dir}: ANSWER\n\n**Outcome:** escalated (system failure)\n\nThe system crashed while processing this case: ${msg}\nA human must handle it.\n`);
    writeFileSync(join(outDir, 'REASONING.md'), `# Case ${c?.id ?? dir}: REASONING\n\nRun crashed: ${msg}\n${stack ? `\n\`\`\`\n${stack}\n\`\`\`\n` : ''}`);
    writeFileSync(join(outDir, 'result.json'), JSON.stringify({ id: c?.id ?? dir, model: values.model, thinking, crashed: true, error: msg, stack, inputs: c?.inputs.map((i) => ({ name: i.name, ...i.parse })) }, null, 2));
    return { id: c?.id ?? dir, outcome: 'CRASH', actions: 0, failed: 0, escalated: false, cost: 0, secs: (Date.now() - started) / 1000, error: msg };
  }
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
        log(`  ✓ ${r.id} ${r.outcome} · ${r.actions} actions (${r.failed} not verified)${r.escalated ? ' · escalated' : ''} (${r.secs.toFixed(0)}s, $${r.cost.toFixed(3)})${r.error ? ` ERROR ${r.error}` : ''}`);
      }
    }),
  );
  return results;
}

const manifest = {
  startedAt: new Date().toISOString(),
  command: process.argv.slice(2),
  args: values,
  model: values.model,
  thinking,
  jev: jevEnabled(),
  commit: git('rev-parse', 'HEAD'),
  dirty: !!git('status', '--porcelain'),
  node: process.version,
  cases: dirs.map((d) => d.split('/').at(-1)),
};
writeFileSync(join(values.out!, 'run.json'), JSON.stringify(manifest, null, 2));
log(`Running ${dirs.length} cases from ${values.in} with ${values.model}, thinking ${thinking} (concurrency ${values.concurrency}, Jev ${jevEnabled() ? 'on' : 'off'}${Number(values.chaos) > 0 ? `, chaos ${values.chaos} seed ${values.seed}` : ''}) at commit ${manifest.commit?.slice(0, 8) ?? '?'}${manifest.dirty ? ' (uncommitted changes)' : ''}…`);
const t0 = Date.now();
const rows = await pool(dirs, Number(values.concurrency), processCase);
console.table(rows.map((r) => ({ ...r, cost: `$${r.cost.toFixed(3)}`, secs: Math.round(r.secs) })));
const total = rows.reduce((a, r) => a + r.cost, 0);
const decided = rows.filter((r) => !['NO DECISION', 'CRASH'].includes(r.outcome)).length;
log(`Done in ${((Date.now() - t0) / 1000).toFixed(0)}s · total cost $${total.toFixed(2)} · decisions ${decided}/${rows.length}`);

const finishedAt = new Date().toISOString();
writeFileSync(join(values.out!, 'run.json'), JSON.stringify({ ...manifest, finishedAt, totalCost: total, decided, rows }, null, 2));
writeFileSync(
  join(values.out!, 'RUN.md'),
  `# Run ${manifest.startedAt}

- **Command:** \`pnpm cases ${manifest.command.join(' ')}\`
- **Cases from:** \`${values.in}\` · **Model:** \`${values.model}\` · **Thinking:** \`${thinking}\` · **Jev:** ${manifest.jev ? 'on' : 'off'}${Number(values.chaos) > 0 ? ` · **Chaos:** ${values.chaos} (seed ${values.seed})` : ''}
- **Commit:** \`${manifest.commit ?? 'unknown'}\`${manifest.dirty ? ' (with uncommitted changes)' : ''} · **Node:** ${manifest.node}
- **Finished:** ${finishedAt} · **Decisions:** ${decided}/${rows.length} · **Cost:** $${total.toFixed(2)}

Each case folder holds \`ANSWER.md\` (decision and verified actions), \`REASONING.md\` (inputs and how they were parsed, checks, ledger, condensed trace with thinking), \`TRANSCRIPT.md\` (everything the model saw and did, untruncated), \`trace.jsonl\` (raw timestamped events) and \`result.json\`. Console output is in \`run.log\`.

| Case | Outcome | Severity | Actions | Not verified | Escalated | Secs | Cost | Error |
|---|---|---|---|---|---|---|---|---|
${rows
  .map((r) => `| [${r.id}](${r.id}/ANSWER.md) · [reasoning](${r.id}/REASONING.md) · [transcript](${r.id}/TRANSCRIPT.md) | ${r.outcome} | ${r.severity ?? ''} | ${r.actions} | ${r.failed} | ${r.escalated ? 'yes' : ''} | ${Math.round(r.secs)} | $${r.cost.toFixed(3)} | ${(r.error ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')} |`)
  .join('\n')}
`,
);
log(`Run index: ${join(values.out!, 'RUN.md')}`);
