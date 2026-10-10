import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ingestPublicCase } from './ingest.js';
import { type Batch, type CaseGrade, type OpsStore, newId } from './store.js';
import type { Worker } from './worker.js';

/**
 * Eval runs: hand a whole case set to the case worker from the portal, watch it live, then grade it with the
 * same judge as `pnpm eval`. Each case is cut at its decision point, exactly like the batch runner's replay.
 */

export const CASE_SETS: Record<string, { name: string; dir: () => string }> = {
  'pm-public': { name: 'Public Property Management cases', dir: () => join(process.cwd(), 'HackatonPublicCases', 'Property Management') },
  // Any other folder of organiser-format cases (e.g. the Reality Test cases), set by the operator.
  ...(process.env.OPS_IMPORT_DIR ? { custom: { name: `Cases in ${process.env.OPS_IMPORT_DIR.split('/').filter(Boolean).at(-1)}`, dir: () => resolve(process.env.OPS_IMPORT_DIR!) } } : {}),
};

/** Batches started from the live page carry this name, so the page finds its latest run again after a restart. */
export const LIVE_LABEL = 'Live import';

export async function startBatch(store: OpsStore, worker: Worker, set: keyof typeof CASE_SETS, only?: string[], answersRoot = process.env.OPS_RUNS_DIR ?? join(process.cwd(), 'runs', 'ops'), label?: string) {
  const spec = CASE_SETS[set];
  if (!spec) throw new Error(`unknown case set ${String(set)}`);
  const casesDir = spec.dir();
  const ids = readdirSync(casesDir)
    .filter((f) => statSync(join(casesDir, f)).isDirectory() && (!only || only.includes(f)))
    .sort();
  const id = newId('eval').replace('_', '-').slice(0, 13);
  const stamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const batch = await store.addBatch({ id, name: `${label ? `${label}: ` : ''}${spec.name}, ${stamp}`, case_set: set, total: ids.length, answers_dir: join(answersRoot, id), cases_dir: casesDir, grading: 'not_started' });
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
  // The judge exits 1 when it finds critical failures (a CI signal); grading is done when every case has a grade.
  const graded = (await store.batchCases(batch.id)).filter((c) => c.grade).length;
  await store.setGrading(batch.id, graded === batch.total ? 'done' : code === 0 ? 'done' : 'failed');
}

/**
 * Rebuild an eval run from a folder of results on disk: this portal's own runs (runs/ops/<id>) or any
 * `pnpm cases` output over the public cases. Each <case>/result.json becomes the case's timeline, and a
 * grades.json next to it becomes its score. Nothing is re-run.
 */
export async function importRun(store: OpsStore, answersDir: string, o: { id?: string; name?: string; set?: keyof typeof CASE_SETS } = {}) {
  const set = o.set ?? 'pm-public';
  const casesDir = CASE_SETS[set].dir();
  const ids = readdirSync(answersDir).filter((f) => existsSync(join(answersDir, f, 'result.json')) && existsSync(join(casesDir, f))).sort();
  if (!ids.length) return undefined;
  const id = o.id ?? `import-${answersDir.split('/').filter(Boolean).at(-1)!.replace(/[^\w-]/g, '').slice(0, 24)}`;
  if (await store.getBatch(id)) return store.getBatch(id);
  const graded = ids.every((f) => existsSync(join(answersDir, f, 'grades.json')));
  const when = new Date(statSync(join(answersDir, ids[0], 'result.json')).mtime).toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const b = await store.addBatch({ id, name: o.name ?? `${CASE_SETS[set].name}, ${when}`, case_set: set, total: ids.length, answers_dir: answersDir, cases_dir: casesDir, grading: graded ? 'done' : 'not_started' });
  const { ingestPublicCaseRecord } = await import('./ingest.js');
  const { recordRun } = await import('./record.js');
  for (const caseNo of ids) {
    const r = JSON.parse(readFileSync(join(answersDir, caseNo, 'result.json'), 'utf8'));
    const c = await ingestPublicCaseRecord(store, caseNo, typeof r.cutoff === 'number' ? r.cutoff : undefined, casesDir, b.id);
    const runId = newId('run');
    await store.startRun({ id: runId, case_id: c.id, trigger: 'imported result' });
    const out = { decision: r.decision, ledger: r.ledger ?? [], policyLog: r.policyLog, gateLog: r.gateLog, error: r.error };
    const { events, tasks, status } = recordRun({ caseId: c.id, runId, run: out, historyMd: c.history_md, at: new Date(Date.parse(b.created_at)) });
    await store.addEvents([{ case_id: c.id, ts: new Date(Date.parse(b.created_at) - 1).toISOString(), kind: 'run_started', actor: 'agent', title: 'Case worker started: new case', detail: null, status: null, run_id: runId, data: null }, ...events]);
    for (const t of tasks) await store.addTask(t);
    await store.setStatus(c.id, status);
    const read = (f: string) => (existsSync(join(answersDir, caseNo, f)) ? readFileSync(join(answersDir, caseNo, f), 'utf8') : null);
    await store.finishRun(runId, { outcome: r.decision?.outcome ?? 'no_decision', cost: r.cost ?? r.usage?.cost ?? null, answer_md: read('ANSWER.md'), reasoning_md: read('REASONING.md') });
    const g = readGrade(join(answersDir, caseNo, 'grades.json'));
    if (g) await store.setGrade(c.id, g);
  }
  return b;
}
