// The test loop: one command runs a frozen split, grades it, and diffs against the baseline.
// Usage: pnpm loop [--profile quick|cursor|final] [--split dev|holdout] [--k 3] [--chaos 0.15] [--seed 1] [--only 01,003]
//                  [--no-judge] [--baseline <file>] [--save-baseline] [--rescore <run-root>]
//   quick (default): Haiku agent, Sonnet judge. Fast and cheap, for iterating.
//   cursor:          Haiku agent, Cursor-plan judge (CURSOR_JUDGE_MODEL, default composer-2.5; needs CURSOR_API_KEY).
//   final:           CASE_MODEL agent (Sonnet), JUDGE_MODEL judge (Opus). The real score, run before decisions that matter.
//   Override any part with --model, --judge-model, --thinking, --concurrency.
//   --k N:       run every case N times (same seed: chaos is a fixed perturbation, the variance is the model's);
//                prints per-case marks (✓✗✓), pass@1, pass^N and decision stability.
//   --no-judge:  deterministic checks only (no judge call); pass = no failed critical/prohibited check.
//   --rescore R: skip the agent and the judge, rebuild summary.json from an existing run folder R.
// Deterministic checks (case checks.json + global checks) run on every case run before the judge result is read;
// a failed critical/prohibited check zeroes that run like a critical rubric item.
// Exits 1 on a malformed checks.json (before any agent run), on any failed critical/prohibited check, or on a regression
// (mean score down more than 5 points, a new critical, or lower coverage).
// Baselines are kept per profile, split and k. The holdout split prints aggregates only: never tune on it.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { runCaseChecks } from './checks.js';
import { loadAllChecks, specErrorLine } from './runChecks.js';
import { type EscalateLabel, type RunRow, buildRunRow, compareToBaseline, summarize } from './summary.js';

const { values } = parseArgs({
  options: {
    profile: { type: 'string', default: 'quick' },
    split: { type: 'string' },
    model: { type: 'string' },
    'judge-model': { type: 'string' },
    thinking: { type: 'string' },
    concurrency: { type: 'string' },
    chaos: { type: 'string', default: '0' },
    seed: { type: 'string', default: '1' },
    only: { type: 'string' },
    k: { type: 'string', default: '1' },
    'no-judge': { type: 'boolean', default: false },
    baseline: { type: 'string' },
    rescore: { type: 'string' },
    'save-baseline': { type: 'boolean', default: false },
  },
});

const PROFILES: Record<string, { model: string; judge: string; thinking: string; concurrency: string }> = {
  quick: { model: 'claude-haiku-5-5', judge: 'claude-sonnet-5-5', thinking: 'low', concurrency: '16' },
  cursor: { model: 'claude-haiku-5-5', judge: `cursor:${process.env.CURSOR_JUDGE_MODEL || 'composer-2.5'}`, thinking: 'low', concurrency: '8' },
  final: { model: process.env.CASE_MODEL ?? 'claude-sonnet-5-5', judge: process.env.JUDGE_MODEL ?? 'claude-opus-5-5', thinking: 'medium', concurrency: '8' },
};

type Group = { dir: string; only: string[]; at?: string };
type Meta = { split: string; profile: string; config: { model: string; judge: string; thinking: string; concurrency: string }; k: number; chaos: number; seed: string; noJudge: boolean; groups: Group[] };

const slug = (dir: string) => dir.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
const readJson = (p: string) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : undefined);
const only = values.only?.split(',').map((s) => s.trim());
const stamp = new Date().toISOString().replace(/[:.]/g, '-');

let meta: Meta;
let root: string;
if (values.rescore) {
  root = values.rescore;
  meta = readJson(join(root, 'meta.json'));
  if (!meta) {
    // Run folders written before meta.json existed: k = 1, groups from the frozen split named in their summary.json.
    const old = readJson(join(root, 'summary.json'));
    if (!old?.split) throw new Error(`${root}: no meta.json or summary.json, so --rescore cannot tell which cases it holds`);
    const splits = JSON.parse(readFileSync('cases/splits.json', 'utf8')) as Record<string, Group[]>;
    meta = { split: old.split, profile: old.profile, config: old.config, k: 1, chaos: old.chaos ?? 0, seed: '1', noJudge: false, groups: splits[old.split] };
  }
  if (values['no-judge']) meta.noJudge = true;
  if (values.split) meta.split = values.split;
} else {
  const base = PROFILES[values.profile!];
  if (!base) throw new Error(`Unknown profile "${values.profile}" (have: ${Object.keys(PROFILES).join(', ')})`);
  const split = values.split ?? 'dev';
  const splits = JSON.parse(readFileSync('cases/splits.json', 'utf8')) as Record<string, Group[]>;
  if (!Array.isArray(splits[split])) throw new Error(`Unknown split "${split}" (have: ${Object.keys(splits).filter((k) => !k.startsWith('_')).join(', ')})`);
  const k = Math.max(1, Number(values.k) || 1);
  meta = {
    split,
    profile: values.profile!,
    config: { model: values.model ?? base.model, judge: values['judge-model'] ?? base.judge, thinking: values.thinking ?? base.thinking, concurrency: values.concurrency ?? base.concurrency },
    k,
    chaos: Number(values.chaos),
    seed: values.seed!,
    noJudge: values['no-judge']!,
    groups: splits[split],
  };
  root = join('runs', 'loop', `${split}-${values.profile}${k > 1 ? `-k${k}` : ''}-${stamp}`);
}
const { split, k } = meta;
const holdout = split === 'holdout';
const groups = meta.groups.map((g) => ({ ...g, ids: g.only.filter((id) => !only || only.includes(id)) })).filter((g) => g.ids.length);
/** k = 1 keeps the flat <root>/<group>/<id> layout of earlier runs; k > 1 uses <root>/<group>/run-<i>/<id>. */
const runDir = (g: Group, i: number) => (k > 1 ? join(root, slug(g.dir), `run-${i}`) : join(root, slug(g.dir)));

// Fail loudly on a malformed checks.json before spending anything on the agent or the judge.
const { specs, errors } = loadAllChecks(groups.flatMap((g) => g.ids.map((id) => join(g.dir, id))).filter(existsSync));
if (errors.length) {
  for (const e of errors) console.log(specErrorLine(e));
  process.exit(1);
}

/** Runs a child script, buffering its output so parallel groups don't interleave. Holdout output is discarded. */
const tsx = (args: string[]) =>
  new Promise<string>((resolve) => {
    const child = spawn('pnpm', ['exec', 'tsx', ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    child.on('close', () => resolve(holdout ? '' : out));
  });

const { config: cfg } = meta;
const t0 = Date.now();
if (!values.rescore) {
  console.log(
    `Loop: ${split} · profile ${meta.profile} · agent ${cfg.model} (thinking ${cfg.thinking}) · judge ${meta.noJudge ? 'off (checks only)' : cfg.judge} · concurrency ${cfg.concurrency}${k > 1 ? ` · k ${k}` : ''}${meta.chaos > 0 ? ` · chaos ${meta.chaos}` : ''}`,
  );
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, 'meta.json'), JSON.stringify(meta, null, 2));
  // Groups run in parallel; within a group the k runs go one after another, each agent run followed by its judge.
  await Promise.all(
    groups.map(async (g) => {
      const common = ['--only', g.ids.join(','), '--concurrency', cfg.concurrency];
      for (let i = 1; i <= k; i++) {
        const out = runDir(g, i);
        const runLog = await tsx(['src/run.ts', '--in', g.dir, '--out', out, ...common, '--model', cfg.model, '--thinking', cfg.thinking, '--chaos', String(meta.chaos), '--seed', meta.seed, ...(g.at ? ['--at', g.at] : [])]);
        const judgeLog = await tsx(['src/eval/judge.ts', '--cases', g.dir, '--answers', out, '--model', cfg.judge, '--label', `${split}-${meta.profile}-${slug(g.dir)}${k > 1 ? `-run${i}` : ''}`, ...common, ...(meta.noJudge ? ['--no-judge'] : []), ...(holdout ? ['--summary-only'] : [])]);
        console.log(`\n▶ ${g.dir}${k > 1 ? ` run ${i}/${k}` : ''} (${g.ids.length} cases)${holdout ? ': output hidden' : `\n${runLog.trim()}\n${judgeLog.trim()}`}`);
      }
    }),
  );
} else {
  console.log(`Rescore: ${root} · ${split} · profile ${meta.profile} · k ${k}${meta.noJudge ? ' · checks only' : ''}`);
}

// Read every run back from disk and evaluate the deterministic checks in-process (same code as pnpm checks).
const runRows: RunRow[] = groups.flatMap((g) =>
  g.ids.flatMap((id) => {
    const caseDir = join(g.dir, id);
    const spec = specs.get(caseDir);
    const expected = readJson(join(caseDir, 'expected.json'));
    const label = (spec?.expect?.escalate ?? expected?.escalate) as EscalateLabel | undefined;
    return Array.from({ length: k }, (_, j) => {
      const answersDir = join(runDir(g, j + 1), id);
      return buildRunRow({
        key: `${slug(g.dir)}/${id}`,
        run: j + 1,
        result: readJson(join(answersDir, 'result.json')),
        grades: meta.noJudge ? undefined : readJson(join(answersDir, 'grades.json')),
        checks: existsSync(caseDir) ? runCaseChecks(caseDir, answersDir, spec).results : [],
        answerExists: existsSync(join(answersDir, 'ANSWER.md')),
        label,
        tags: spec?.tags,
      });
    });
  }),
);

const metrics = summarize(runRows, k);
const summary = {
  split,
  profile: meta.profile,
  config: cfg,
  at: values.rescore ? (readJson(join(root, 'summary.json'))?.at ?? stamp) : stamp,
  chaos: meta.chaos,
  ...(values.rescore ? { rescoredFrom: root } : {}),
  wallSecs: values.rescore ? (readJson(join(root, 'summary.json'))?.wallSecs ?? 0) : Math.round((Date.now() - t0) / 1000),
  ...metrics,
};
type Summary = typeof summary;

const tag = `${meta.profile}-${split}${meta.chaos > 0 ? '-chaos' : ''}${only ? '-partial' : ''}${k > 1 ? `-k${k}` : ''}`;
const ownBaseline = values.baseline ?? join('evals', `baseline-${tag}.json`);
// An --only run is compared, on the shared cases, with the full-split baseline when it has no partial
// baseline of its own or the full one was measured more recently (the code under test has moved on).
const fullBaseline = join('evals', `baseline-${tag.replace('-partial', '')}.json`);
const measuredAt = (p: string) => String((readJson(p) as { at?: string } | undefined)?.at ?? '');
const preferFull = !existsSync(ownBaseline) || measuredAt(fullBaseline) > measuredAt(ownBaseline);
const baselinePath = !values.baseline && only && existsSync(fullBaseline) && preferFull ? fullBaseline : ownBaseline;
const baseline = readJson(baselinePath) as (Partial<Summary> & Pick<Summary, 'at' | 'mean' | 'decided' | 'criticalCases' | 'rows'>) | undefined;
writeFileSync(join(root, 'summary.json'), JSON.stringify(summary, null, 2));
if (!values.rescore) {
  mkdirSync('evals', { recursive: true });
  writeFileSync(join('evals', `latest-${tag}.json`), JSON.stringify(summary, null, 2));
}

const fmt = (n: number) => (n > 0 ? `+${n.toFixed(1)}` : n.toFixed(1));
const pct = (n: number | null | undefined) => (n == null ? '-' : n.toFixed(2));
const s = summary;
console.log(`\n══ ${split} · ${meta.profile}${k > 1 ? ` · k ${k}` : ''}${s.chaos > 0 ? ` (chaos ${s.chaos})` : ''} ══`);
console.log(`Coverage ${s.decided}/${s.cases} decided · ${s.judged} judged · mean ${s.mean.toFixed(1)} · critical in ${s.criticalCases} · agent $${s.cost.toFixed(2)} + judge $${s.judgeCost.toFixed(2)} · ${s.wallSecs}s`);
console.log(
  `pass@1 ${pct(s.passAt1)}${s.passK !== null ? ` · pass^${k} ${pct(s.passK)}` : ''}${s.stability ? ` · stable ${s.stability.stableCases}/${s.stability.cases}` : ''} (pass by ${s.passBasis}) · esc P/R ${pct(s.escalation.precision)}/${pct(s.escalation.recall)} over ${s.escalation.runs} labelled run(s)` +
    `${s.injection ? ` · inject ${s.injection.successes}/${s.injection.runs}` : ''}${s.recovery ? ` · recovery ${s.recovery.recovered}/${s.recovery.hit}` : ''} · checks ${s.checks.evaluated - s.checks.failed}/${s.checks.evaluated} · $${s.perCase.cost.toFixed(3)}/case-run · ${s.perCase.secs.toFixed(0)}s/case-run`,
);
if (!holdout) {
  if (s.escalation.over.length) console.log(`Over-escalated: ${s.escalation.over.join(', ')}`);
  if (s.escalation.missed.length) console.log(`Missed escalations: ${s.escalation.missed.join(', ')}`);
  if (s.stability?.unstable.length) console.log(`Unstable: ${s.stability.unstable.map((u) => `${u.key} (${u.fields.join(',')})`).join('; ')}`);
}

const regressions: string[] = [];
const baseK = baseline?.k ?? 1;
if (baseline) {
  if (baseK !== k) console.log(`baseline k=${baseK} vs run k=${k}: comparing means only`);
  const d = compareToBaseline(s, baseline);
  const signed = (n: number) => `${n >= 0 ? '+' : ''}${n}`;
  const scope = d.scope === 'all' ? '' : ` (same ${d.shared} cases)`;
  if (!d.shared) console.log(`vs baseline ${baseline.at} (${baselinePath}): no cases in common, nothing to compare`);
  else console.log(`vs baseline ${baseline.at}${scope}: mean ${fmt(d.cur.mean - d.base.mean)} · coverage ${signed(d.cur.decided - d.base.decided)} · critical ${signed(d.cur.criticalCases - d.base.criticalCases)}`);
  if (d.notInBaseline.length) console.log(`Not in the baseline, not compared: ${holdout ? `${d.notInBaseline.length} case(s)` : d.notInBaseline.join(', ')}`);
  regressions.push(...d.regressions);
  if (!holdout) {
    const before = new Map(baseline.rows.map((r) => [r.key, r]));
    const table = s.rows.map((r) => {
      const b = before.get(r.key);
      const delta = r.score !== null && b?.score != null ? r.score - b.score : undefined;
      return { case: r.key, ...(k > 1 ? { runs: r.marks } : {}), score: r.score === null ? '-' : Number(r.score.toFixed(1)), was: b?.score ?? '-', delta: delta === undefined ? '' : fmt(delta), outcome: r.outcome, critical: r.critical.join(',') || '-' };
    });
    console.table(table);
    const worse = table.filter((t) => t.delta.startsWith('-') && Number(t.delta) <= -20).map((t) => t.case);
    if (worse.length) console.log(`Cases down 20+ points: ${worse.join(', ')}`);
  }
} else {
  if (!holdout) console.table(s.rows.map((r) => ({ case: r.key, ...(k > 1 ? { runs: r.marks } : {}), score: r.score === null ? '-' : Number(r.score.toFixed(1)), outcome: r.outcome, critical: r.critical.join(',') || '-' })));
  console.log(`No baseline at ${baselinePath}: run again with --save-baseline to set one.`);
}
if (values['save-baseline']) {
  // Never the full-split fallback: a subset run must not overwrite the full baseline.
  writeFileSync(ownBaseline, JSON.stringify(summary, null, 2));
  console.log(`Saved baseline: ${ownBaseline}`);
}
if (holdout) console.log('Holdout: aggregates only. Do not open its run folder while tuning.');
console.log(`Run folder: ${root}`);

const critChecks = s.checks.failures.filter((f) => f.severity === 'critical' || f.severity === 'prohibited');
if (critChecks.length) {
  if (holdout) console.log(`\n✗ CHECK FAILED: ${critChecks.length} critical/prohibited check failure(s) (holdout: details hidden)`);
  else for (const f of critChecks) console.log(`✗ CHECK FAILED ${f.key}${k > 1 ? `/run-${f.run}` : ''} ${f.id}: ${f.detail}`);
  process.exitCode = 1;
}
if (regressions.length) {
  console.log(`\n✗ REGRESSION: ${regressions.join('; ')}`);
  process.exitCode = 1;
}
