// The test loop: one command runs a frozen split, grades it, and diffs against the baseline.
// Usage: pnpm loop [--split dev|holdout] [--chaos 0.15] [--seed 1] [--only 01,003] [--save-baseline]
// Exits 1 on a regression (mean score down more than 5 points, a new critical, or lower coverage).
// The holdout split prints aggregates only: never tune on it.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    split: { type: 'string', default: 'dev' },
    chaos: { type: 'string', default: '0' },
    seed: { type: 'string', default: '1' },
    only: { type: 'string' },
    concurrency: { type: 'string', default: '6' },
    'save-baseline': { type: 'boolean', default: false },
  },
});

type Group = { dir: string; only: string[]; at?: string };
type CaseRow = { key: string; score: number | null; critical: string[]; outcome: string; error?: string; cost: number; secs: number };
type Summary = { split: string; at: string; chaos: number; cases: number; decided: number; judged: number; mean: number; criticalCases: number; cost: number; rows: CaseRow[] };

const split = values.split!;
const holdout = split === 'holdout';
const splits = JSON.parse(readFileSync('cases/splits.json', 'utf8')) as Record<string, Group[]>;
const groups = splits[split];
if (!Array.isArray(groups)) throw new Error(`Unknown split "${split}" (have: ${Object.keys(splits).filter((k) => !k.startsWith('_')).join(', ')})`);
const only = values.only?.split(',').map((s) => s.trim());

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const root = join('runs', 'loop', `${split}-${stamp}`);
const slug = (dir: string) => dir.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
const tsx = (args: string[]) => spawnSync('pnpm', ['exec', 'tsx', ...args], { stdio: holdout ? ['ignore', 'ignore', 'inherit'] : 'inherit' });
const readJson = (p: string) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : undefined);

const rows: CaseRow[] = [];
for (const g of groups) {
  const ids = g.only.filter((id) => !only || only.includes(id));
  if (!ids.length) continue;
  const out = join(root, slug(g.dir));
  console.log(`\n▶ ${split}: ${g.dir} (${ids.length} cases)${holdout ? ' — output hidden' : ''}`);
  const common = ['--only', ids.join(','), '--concurrency', values.concurrency!];
  tsx(['src/run.ts', '--in', g.dir, '--out', out, ...common, '--chaos', values.chaos!, '--seed', values.seed!, ...(g.at ? ['--at', g.at] : [])]);
  tsx(['src/eval/judge.ts', '--cases', g.dir, '--answers', out, '--label', `${split}-${slug(g.dir)}`, ...common, ...(holdout ? ['--summary-only'] : [])]);
  for (const id of ids) {
    const r = readJson(join(out, id, 'result.json'));
    const grades = readJson(join(out, id, 'grades.json'));
    rows.push({
      key: `${slug(g.dir)}/${id}`,
      score: grades?.score ?? null,
      critical: grades?.critical ?? [],
      outcome: r?.decision?.outcome ?? (existsSync(join(out, id, 'ANSWER.md')) ? 'CRASH' : 'MISSING'),
      error: r?.error,
      cost: r?.usage?.cost ?? 0,
      secs: (r?.usage?.durationMs ?? 0) / 1000,
    });
  }
}

const judged = rows.filter((r) => r.score !== null);
const summary: Summary = {
  split,
  at: stamp,
  chaos: Number(values.chaos),
  cases: rows.length,
  decided: rows.filter((r) => !['CRASH', 'MISSING'].includes(r.outcome) && !r.error).length,
  judged: judged.length,
  // An ungraded case counts as 0: coverage is part of the score.
  mean: rows.reduce((a, r) => a + (r.score ?? 0), 0) / (rows.length || 1),
  criticalCases: rows.filter((r) => r.critical.length).length,
  cost: rows.reduce((a, r) => a + r.cost, 0),
  rows,
};

mkdirSync('evals', { recursive: true });
const tag = `${split}${summary.chaos > 0 ? '-chaos' : ''}${only ? '-partial' : ''}`;
const baselinePath = join('evals', `baseline-${tag}.json`);
const baseline = readJson(baselinePath) as Summary | undefined;
writeFileSync(join(root, 'summary.json'), JSON.stringify(summary, null, 2));
writeFileSync(join('evals', `latest-${tag}.json`), JSON.stringify(summary, null, 2));

const fmt = (n: number) => (n > 0 ? `+${n.toFixed(1)}` : n.toFixed(1));
console.log(`\n══ ${split}${summary.chaos > 0 ? ` (chaos ${summary.chaos})` : ''} ══`);
console.log(`Coverage ${summary.decided}/${summary.cases} decided · ${summary.judged} judged · mean ${summary.mean.toFixed(1)} · critical in ${summary.criticalCases} · $${summary.cost.toFixed(2)}`);

const regressions: string[] = [];
if (baseline) {
  console.log(`vs baseline ${baseline.at}: mean ${fmt(summary.mean - baseline.mean)} · coverage ${summary.decided - baseline.decided >= 0 ? '+' : ''}${summary.decided - baseline.decided} · critical ${summary.criticalCases - baseline.criticalCases >= 0 ? '+' : ''}${summary.criticalCases - baseline.criticalCases}`);
  if (summary.mean < baseline.mean - 5) regressions.push(`mean score dropped ${fmt(summary.mean - baseline.mean)}`);
  if (summary.decided < baseline.decided) regressions.push('coverage dropped');
  if (summary.criticalCases > baseline.criticalCases) regressions.push('more cases with critical failures');
  if (!holdout) {
    const before = new Map(baseline.rows.map((r) => [r.key, r]));
    const table = rows.map((r) => {
      const b = before.get(r.key);
      const delta = r.score !== null && b?.score != null ? r.score - b.score : undefined;
      return { case: r.key, score: r.score ?? '-', was: b?.score ?? '-', delta: delta === undefined ? '' : fmt(delta), outcome: r.outcome, critical: r.critical.join(',') || '-' };
    });
    console.table(table);
    const worse = table.filter((t) => t.delta.startsWith('-') && Number(t.delta) <= -20).map((t) => t.case);
    if (worse.length) console.log(`Cases down 20+ points: ${worse.join(', ')}`);
  }
} else {
  if (!holdout) console.table(rows.map((r) => ({ case: r.key, score: r.score ?? '-', outcome: r.outcome, critical: r.critical.join(',') || '-' })));
  console.log(`No baseline yet for "${tag}": run again with --save-baseline to set one.`);
}

if (values['save-baseline']) {
  writeFileSync(baselinePath, JSON.stringify(summary, null, 2));
  console.log(`Saved baseline: ${baselinePath}`);
}
if (holdout) console.log('Holdout: aggregates only. Do not open its run folder while tuning.');
console.log(`Run folder: ${root}`);
if (regressions.length) {
  console.log(`\n✗ REGRESSION: ${regressions.join('; ')}`);
  process.exitCode = 1;
}
