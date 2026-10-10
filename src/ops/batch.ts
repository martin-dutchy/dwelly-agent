import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ingestPublicCase } from './ingest.js';
import { type Batch, type CaseGrade, type OpsStore, newId } from './store.js';
import type { Worker } from './worker.js';

/**
 * Eval runs: hand a whole case set to the case worker from the portal, watch it live, then grade it with the
 * same judge as `pnpm eval`. Each case is cut at its decision point, exactly like the batch runner's replay.
 */

export const CASE_SETS: Record<string, { name: string; dir: () => string }> = {
  'pm-public': { name: 'Public Property Management cases', dir: () => join(process.cwd(), 'HackatonPublicCases', 'Property Management') },
};

export async function startBatch(store: OpsStore, worker: Worker, set: keyof typeof CASE_SETS, only?: string[]) {
  const spec = CASE_SETS[set];
  if (!spec) throw new Error(`unknown case set ${String(set)}`);
  const casesDir = spec.dir();
  const ids = readdirSync(casesDir)
    .filter((f) => statSync(join(casesDir, f)).isDirectory() && (!only || only.includes(f)))
    .sort();
  const id = newId('eval').replace('_', '-').slice(0, 13);
  const stamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const batch = await store.addBatch({ id, name: `${spec.name}, ${stamp}`, case_set: set, total: ids.length, answers_dir: join(process.cwd(), 'runs', 'ops', id), cases_dir: casesDir, grading: 'not_started' });
  // Ingest them all first (status "queued"), then the worker's pool works through them.
  for (const caseNo of ids) await ingestPublicCase(store, worker, caseNo, undefined, casesDir, batch.id);
  return batch;
}

/** The judge's grades.json for one case, reduced to what a person reads: score, critical hits, what was missed. */
export function readGrade(path: string): CaseGrade | undefined {
  if (!existsSync(path)) return undefined;
  const g = JSON.parse(readFileSync(path, 'utf8')) as {
    score: number;
    critical: string[];
    items: { id: string; text: string }[];
    grades: { overall_note: string; items: { id: string; verdict: string }[] };
  };
  const verdict = (id: string) => g.grades.items.find((x) => x.id === id)?.verdict;
  const text = (id: string) => g.items.find((x) => x.id === id)?.text ?? id;
  return {
    score: g.score,
    critical: g.critical.map(text),
    failed_required: g.items.filter((i) => i.id.startsWith('R') && verdict(i.id) !== 'true').map((i) => i.text),
    red_flags: g.items.filter((i) => i.id.startsWith('F') && verdict(i.id) === 'true').map((i) => i.text),
    note: g.grades.overall_note,
  };
}

/** Run the judge over the batch's answers in a child process (same code path as `pnpm eval`), then store the grades. */
export async function gradeBatch(store: OpsStore, batch: Batch, opts: { model?: string; concurrency?: number } = {}) {
  await store.setGrading(batch.id, 'running');
  const args = ['src/eval/judge.ts', '--cases', batch.cases_dir, '--answers', batch.answers_dir, '--concurrency', String(opts.concurrency ?? 6), '--label', batch.id];
  if (opts.model) args.push('--model', opts.model);
  const code = await new Promise<number>((resolve) => {
    const child = spawn(join(process.cwd(), 'node_modules', '.bin', 'tsx'), args, { env: process.env, stdio: ['ignore', 'inherit', 'inherit'] });
    child.on('exit', (c) => resolve(c ?? 1));
    child.on('error', () => resolve(1));
  });
  for (const c of await store.batchCases(batch.id)) {
    const caseNo = c.source_ref?.split('@')[0];
    const g = caseNo ? readGrade(join(batch.answers_dir, caseNo, 'grades.json')) : undefined;
    if (g) await store.setGrade(c.id, g);
  }
  await store.setGrading(batch.id, code === 0 ? 'done' : 'failed');
}
