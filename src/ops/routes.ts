import type { IncomingMessage, ServerResponse } from 'node:http';
import type { CallRow, EventRow } from '../voice/store.js';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { CASE_SETS, gradeBatch, startBatch } from './batch.js';
import { batchView } from './batchView.js';
import { evalRunPage, evalsPage } from './evalPages.js';
import { decideTask, ingestCall, ingestPracticeCase, ingestPublicCase } from './ingest.js';
import { casePage, inboxPage, taskPage, textPage } from './pages.js';
import { type OpsStore, createOpsStore } from './store.js';
import { type Worker, createWorker } from './worker.js';

/**
 * The operations portal, mounted by the voice server under /ops behind the admin password.
 *   /ops                     inbox: tasks waiting on a person, every case and its status
 *   /ops/cases/:id           one case: timeline of calls, actions, messages, denials, follow-ups, decisions
 *   /ops/tasks/:id           decide a task, with everything the person needs on one screen
 *   /ops/api/...             the same data as JSON
 */

export type Ops = { store: OpsStore; worker: Worker; evalWorker: Worker; onCallFinalized: (call: CallRow, events: EventRow[]) => Promise<void> };

export async function createOps(store: OpsStore = createOpsStore()): Promise<Ops> {
  await store.init();
  const worker = createWorker(store);
  // Eval runs get their own pool so a 50-case run never delays live follow-ups after calls.
  const evalWorker = createWorker(store, { concurrency: Number(process.env.OPS_EVAL_CONCURRENCY ?? 6) });
  return {
    store,
    worker,
    evalWorker,
    // Never let a follow-up failure reach the voice server: it is logged and shown on the case instead.
    onCallFinalized: async (call, events) => {
      if (process.env.OPS_AUTO_FOLLOW_UP === '0') return;
      await ingestCall(store, worker, call, events).catch((e) => console.error('[ops] ingest call', call.conversation_id, e));
    },
  };
}

const MAX_BODY = 64 * 1024;
async function readBody(req: IncomingMessage) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY) throw new Error('body too large');
  }
  return raw;
}
async function readForm(req: IncomingMessage): Promise<Record<string, string>> {
  const raw = await readBody(req);
  if ((req.headers['content-type'] ?? '').includes('application/json')) return JSON.parse(raw || '{}');
  return Object.fromEntries(new URLSearchParams(raw));
}
const html = (res: ServerResponse, body: string, status = 200) => res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' }).end(body);
const json = (res: ServerResponse, body: unknown, status = 200) => res.writeHead(status, { 'content-type': 'application/json' }).end(JSON.stringify(body));
const redirect = (res: ServerResponse, to: string) => res.writeHead(303, { location: to }).end();

async function eventsOf(store: OpsStore, ids: string[]) {
  const out: Record<string, Awaited<ReturnType<OpsStore['events']>>> = {};
  for (const id of ids) out[id] = await store.events(id);
  return out;
}

export async function opsRoutes(path: string, req: IncomingMessage, res: ServerResponse, ops: Ops) {
  const { store, worker } = ops;
  // The decisions inbox is for live work: tasks raised inside eval runs are shown on the run instead.
  const liveTasks = async () => {
    const out = [];
    for (const t of await store.listTasks({ status: 'open' })) if (!(await store.getCase(t.case_id))?.batch_id) out.push(t);
    return out;
  };
  const openTasks = async () => (await liveTasks()).length;

  if (path === '/ops' || path === '/ops/') {
    const cases = await store.listCases(100);
    return html(res, inboxPage({ tasks: await liveTasks(), cases, events: await eventsOf(store, cases.map((c) => c.id)) }));
  }
  const caseId = path.match(/^\/ops\/cases\/([\w.-]+)$/)?.[1];
  if (caseId) {
    const c = await store.getCase(caseId);
    if (!c) return html(res, textPage('Not found', `No case ${caseId}`), 404);
    return html(res, casePage({ c, events: await store.events(caseId), tasks: await store.listTasks({ caseId }), runs: await store.runs(caseId), openTasks: await openTasks() }));
  }
  const taskId = path.match(/^\/ops\/tasks\/([\w-]+)$/)?.[1];
  if (taskId) {
    const t = await store.getTask(taskId);
    const c = t && (await store.getCase(t.case_id));
    if (!t || !c) return html(res, textPage('Not found', `No task ${taskId}`), 404);
    return html(res, taskPage({ t, c, openTasks: await openTasks() }));
  }
  const decide = path.match(/^\/ops\/tasks\/([\w-]+)\/decide$/)?.[1];
  if (decide && req.method === 'POST') {
    const f = await readForm(req);
    const choice = String(f.choice ?? '').trim();
    const by = String(f.by ?? '').trim().slice(0, 80);
    if (!choice || !by) return html(res, textPage('Missing details', 'Choose a decision and give your name.'), 400);
    const t = await decideTask(store, worker, decide, { choice: choice.slice(0, 500), note: String(f.note ?? '').slice(0, 4000), by });
    if (!t) return html(res, textPage('Already decided', 'This task was already decided or does not exist.'), 409);
    return (req.headers.accept ?? '').includes('application/json') ? json(res, t) : redirect(res, `/ops/cases/${encodeURIComponent(t.case_id)}`);
  }
  const runFile = path.match(/^\/ops\/runs\/([\w-]+)\/(answer|reasoning)$/);
  if (runFile) {
    const r = await store.getRun(runFile[1]);
    const text = runFile[2] === 'answer' ? r?.answer_md : r?.reasoning_md;
    return text ? html(res, textPage(`${runFile[2].toUpperCase()}.md`, text)) : html(res, textPage('Not found', 'No such file yet'), 404);
  }

  // Eval runs
  if (path === '/ops/evals' || path === '/ops/evals/') {
    const runs = [];
    for (const b of await store.listBatches()) {
      const cs = await store.batchCases(b.id);
      const tasks = (await store.listTasks()).filter((t) => cs.some((c) => c.id === t.case_id));
      runs.push({ b, done: cs.filter((c) => !['queued', 'agent_working'].includes(c.status)).length, running: cs.filter((c) => c.status === 'agent_working').length, needed: new Set(tasks.map((t) => t.case_id)).size });
    }
    const sets = Object.entries(CASE_SETS).map(([id, s]) => {
      const dir = s.dir();
      let count = 0;
      try {
        count = readdirSync(dir).filter((f) => statSync(join(dir, f)).isDirectory()).length;
      } catch {}
      return { id, name: s.name, count };
    });
    return html(res, evalsPage({ runs, openTasks: await openTasks(), sets: sets.filter((x) => x.count) }));
  }
  if (path === '/ops/api/batches' && req.method === 'POST') {
    const f = await readForm(req);
    const set = String(f.set ?? 'pm-public');
    if (!CASE_SETS[set]) return html(res, textPage('Unknown case set', set), 400);
    const only = f.only ? String(f.only).split(',').map((x) => x.trim()) : undefined;
    const b = await startBatch(store, ops.evalWorker, set, only);
    return (req.headers.accept ?? '').includes('application/json') ? json(res, b) : redirect(res, `/ops/evals/${encodeURIComponent(b.id)}`);
  }
  const evalId = path.match(/^\/ops\/(?:api\/)?evals\/([\w-]+)$/)?.[1];
  if (evalId) {
    const b = await store.getBatch(evalId);
    if (!b) return html(res, textPage('Not found', `No eval run ${evalId}`), 404);
    const cs = await store.batchCases(b.id);
    const ids = new Set(cs.map((c) => c.id));
    const runs: Record<string, Awaited<ReturnType<OpsStore['runs']>>> = {};
    for (const c of cs) runs[c.id] = await store.runs(c.id);
    const v = batchView(cs, await eventsOf(store, [...ids]), (await store.listTasks()).filter((t) => ids.has(t.case_id)), runs);
    if (path.startsWith('/ops/api/')) return json(res, { batch: b, done: v.done, running: v.running, queued: v.queued, outcomes: v.outcomes, needed: v.needed.length, tools: v.tools, nextSteps: v.nextSteps, meanScore: v.meanScore, critical: v.critical, cost: v.cost });
    return html(res, evalRunPage({ b, v, openTasks: await openTasks() }));
  }
  const grade = path.match(/^\/ops\/evals\/([\w-]+)\/grade$/)?.[1];
  if (grade && req.method === 'POST') {
    const b = await store.getBatch(grade);
    if (!b) return html(res, textPage('Not found', `No eval run ${grade}`), 404);
    if (b.grading !== 'running') void gradeBatch(store, b).catch((e) => console.error('[ops] grade', b.id, e));
    return redirect(res, `/ops/evals/${encodeURIComponent(b.id)}`);
  }

  // JSON API
  if (path === '/ops/api/public-case' && req.method === 'POST') {
    const f = await readForm(req);
    const raw = String(f.case ?? '').trim();
    // "P10" opens practice case 10; a plain number opens a public Property Management case.
    const practice = /^p\s*\d+$/i.test(raw);
    const no = practice ? raw.replace(/\D/g, '').padStart(2, '0') : raw.padStart(3, '0');
    if (!/^\d{2,3}$/.test(no)) return html(res, textPage('Bad case number', 'Use a public case number such as 021, or P10 for practice case 10.'), 400);
    const after = /^\d+$/.test(String(f.after ?? '').trim()) ? Number(f.after) : undefined;
    try {
      const id = practice ? await ingestPracticeCase(store, worker, no) : await ingestPublicCase(store, worker, no, after);
      return (req.headers.accept ?? '').includes('application/json') ? json(res, { id }) : redirect(res, `/ops/cases/${encodeURIComponent(id)}`);
    } catch (e) {
      return html(res, textPage('Could not open case', e instanceof Error ? e.message : String(e)), 400);
    }
  }
  if (path === '/ops/api/cases') return json(res, await store.listCases(200));
  const apiCase = path.match(/^\/ops\/api\/cases\/([\w.-]+)$/)?.[1];
  if (apiCase) {
    const c = await store.getCase(apiCase);
    if (!c) return json(res, { error: 'not found' }, 404);
    return json(res, { case: c, events: await store.events(apiCase), tasks: await store.listTasks({ caseId: apiCase }), runs: (await store.runs(apiCase)).map(({ answer_md, reasoning_md, ...r }) => r) });
  }
  if (path === '/ops/api/tasks') return json(res, await store.listTasks({ status: 'open' }));
  return json(res, { error: 'not found' }, 404);
}
