import type { IncomingMessage, ServerResponse } from 'node:http';
import type { CallRow, EventRow } from '../voice/store.js';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fetchAudio } from '../voice/finalize.js';
import { parseHistory } from '../agent/publicCases.js';
import { join } from 'node:path';
import { CASE_SETS, LIVE_LABEL, gradeBatch, importRun, startBatch } from './batch.js';
import { liveData, livePage } from './livePage.js';
import { batchView } from './batchView.js';
import { evalRunPage, evalsPage } from './evalPages.js';
import { DEMO_CASE, DEMO_TENANT, BEN_SCENARIO, contractorQuote, demoCase, isDemoCall, onDemoCall, recordedLandlordCall, resetDemo, seedDemo, tenantWhatsApp } from './demo.js';
import { demoPage } from './demoPage.js';
import { showData } from './showData.js';
import { showPage } from './showPage.js';
import { decideTask, ingestCall, ingestPracticeCase, ingestPublicCase } from './ingest.js';
import { bubbles, outgoingWhatsApp, sendWhatsApp } from './whatsapp.js';
import { casePage, inboxPage, taskPage, textPage } from './pages.js';
import { reallyDelivered, threadOf } from './waPhone.js';
import { needsReason } from './status.js';
import { briefFor, caseIntro, warmBrief } from './brief.js';
import { type OpsStore, createOpsStore } from './store.js';
import { type Worker, appendHistoryEvent, createWorker } from './worker.js';

/**
 * The operations portal, mounted by the voice server under /ops behind the admin password.
 *   /ops                     inbox: tasks waiting on a person, every case and its status
 *   /ops/cases/:id           one case: timeline of calls, actions, messages, denials, follow-ups, decisions
 *   /ops/tasks/:id           decide a task, with everything the person needs on one screen
 *   /ops/api/...             the same data as JSON
 */

export type Ops = {
  store: OpsStore;
  worker: Worker;
  evalWorker: Worker;
  onCallFinalized: (call: CallRow, events: EventRow[]) => Promise<void>;
  /** Place an outbound voice call (set by the voice server when ElevenLabs telephony is configured). */
  dial?: (to: string, scenarioId: string) => Promise<string>;
};

export async function createOps(store: OpsStore = createOpsStore()): Promise<Ops> {
  await store.init();
  // WhatsApp replies the agent sent to the demo tenant also go out through the channel API when one is configured.
  const worker = createWorker(store, {
    afterRun: (caseId, events) => {
      if (caseId !== DEMO_CASE) return;
      for (const e of outgoingWhatsApp(events)) void sendWhatsApp(DEMO_TENANT.phone, e.detail ?? '').catch((err) => console.error('[ops] whatsapp', err));
    },
  });
  // Eval runs get their own pool so a 50-case run never delays live follow-ups after calls.
  const evalWorker = createWorker(store, { concurrency: Number(process.env.OPS_EVAL_CONCURRENCY ?? 6) });
  // Real calls saved for the demo (data/private/calls, git-ignored: real people's voices): ingest them, which runs the follow-ups.
  if (!process.env.DATABASE_URL && process.env.OPS_IMPORT_CALLS !== '0') {
    const dir = join(process.cwd(), 'data', 'private', 'calls');
    try {
      for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
        const { call, events } = JSON.parse(readFileSync(join(dir, f), 'utf8'));
        void ingestCall(store, worker, call, events).catch((e) => console.error('[ops] import call', f, e));
      }
    } catch {}
  }
  // The show's Flat 9 case: run it through WhatsApp, the quote and Ben's call so its steps are real agent output.
  if (!process.env.DATABASE_URL && process.env.OPS_SEED_DEMO !== '0') void seedDemo(store, worker).catch((e) => console.error('[ops] seed demo', e));
  // Without a database, bring back earlier eval runs from disk so a restart loses nothing.
  if (!process.env.DATABASE_URL && process.env.OPS_IMPORT_RUNS !== '0') {
    const root = join(process.cwd(), 'runs', 'ops');
    try {
      for (const d of readdirSync(root)) await importRun(store, join(root, d), { id: d }).catch((e) => console.error('[ops] import', d, e));
    } catch {}
  }
  if (process.env.OPS_WARM_BRIEFS !== '0') setTimeout(() => void store.listTasks({ status: 'open' }).then((ts) => ts.forEach(async (t) => { const c = await store.getCase(t.case_id).catch(() => undefined); warmBrief(t, c ? caseIntro(c) : undefined); })).catch(() => {}), 4000);
  return {
    store,
    worker,
    evalWorker,
    // Never let a follow-up failure reach the voice server: it is logged and shown on the case instead.
    onCallFinalized: async (call, events) => {
      if (process.env.OPS_AUTO_FOLLOW_UP === '0') return;
      if (isDemoCall(call)) await onDemoCall(store, worker, call, events).catch((e) => console.error('[ops] demo call', e));
      else await ingestCall(store, worker, call, events).catch((e) => console.error('[ops] ingest call', call.conversation_id, e));
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
    // The five-second brief: a fast model condenses the task (cached; falls back to the task's own words).
    const brief = await briefFor(t, { timeoutMs: 12_000, caseIntro: caseIntro(c) });
    return html(res, taskPage({ t, c, openTasks: await openTasks(), from: new URL(req.url ?? '/', 'http://x').searchParams.get('from') ?? undefined, brief }));
  }
  const decide = path.match(/^\/ops\/tasks\/([\w-]+)\/decide$/)?.[1];
  if (decide && req.method === 'POST') {
    const f = await readForm(req);
    const choice = String(f.choice ?? '').trim();
    const by = String(f.by ?? '').trim().slice(0, 80);
    if (!choice || !by) return html(res, textPage('Missing details', 'Choose a decision and give your name.'), 400);
    // Hard-to-undo choices need a written reason: enforced here, not only in the page's script.
    if (needsReason(choice) && String(f.note ?? '').trim().length < 10) {
      const t = await store.getTask(decide);
      const c = t && (await store.getCase(t.case_id));
      if (t && c) return html(res, taskPage({ t, c, openTasks: await openTasks(), error: 'That option is hard to undo. Add a short reason before sending.', from: new URL(req.url ?? '/', 'http://x').searchParams.get('from') ?? undefined }), 400);
    }
    const t = await decideTask(store, worker, decide, { choice: choice.slice(0, 500), note: String(f.note ?? '').slice(0, 4000), by });
    if (!t) return html(res, textPage('Already decided', 'This task was already decided or does not exist.'), 409);
    return (req.headers.accept ?? '').includes('application/json') ? json(res, t) : redirect(res, `/ops/cases/${encodeURIComponent(t.case_id)}`);
  }
  // A person answers the tenant directly on WhatsApp from the decision page: recorded, delivered, agent resumes.
  const waReply = path.match(/^\/ops\/tasks\/([\w-]+)\/whatsapp$/)?.[1];
  if (waReply && req.method === 'POST') {
    const f = await readForm(req);
    const text = String(f.text ?? '').trim().slice(0, 1000);
    const by = String(f.by ?? '').trim().slice(0, 80);
    const from = new URL(req.url ?? '/', 'http://x').searchParams.get('from') ?? '';
    const wantsJson = (req.headers.accept ?? '').includes('application/json');
    if (!text || !by) return wantsJson ? json(res, { ok: false, error: 'Write the message and give your name.' }, 400) : html(res, textPage('Missing details', 'Write the message and give your name.'), 400);
    const t = await store.resolveTask(waReply, { choice: 'Answered the tenant on WhatsApp', note: text, by });
    if (!t) return wantsJson ? json(res, { ok: false, error: 'This task was already decided.' }, 409) : html(res, textPage('Already decided', 'This task was already decided.'), 409);
    const ts = new Date().toISOString();
    const c = await store.getCase(t.case_id);
    if (c) {
      const event = { channel: 'WhatsApp', from: `Agency staff (${by})`, to: 'Tenant', body: text };
      if (c.files?.['history.md']) await store.setFiles(c.id, { ...c.files, 'history.md': appendHistoryEvent(c.files['history.md'], event) });
      else if (!c.files) await store.setHistory(c.id, appendHistoryEvent(c.history_md, event));
      await store.addEvents([
        { case_id: c.id, ts, kind: 'human_decision', actor: 'human', title: `${by} decided: Answered the tenant on WhatsApp`, detail: text, status: 'resolved', run_id: t.run_id, data: { task_id: t.id } },
        { case_id: c.id, ts, kind: 'message', actor: 'human', title: `WhatsApp to the tenant from ${by}`, detail: text, status: 'sent', run_id: null, data: { channel: 'whatsapp', direction: 'outbound' } },
      ]);
      if (c.id === DEMO_CASE) void sendWhatsApp(DEMO_TENANT.phone, text).catch(() => {});
      // Eval-run cases stay frozen as graded; live cases go back to the agent.
      if (!c.batch_id) void worker.enqueue(c.id, `acting on ${by}'s WhatsApp reply`);
    }
    if (wantsJson) return json(res, { ok: true, message: { text, ts }, delivered: reallyDelivered(t.case_id), caseUrl: `/ops/cases/${encodeURIComponent(t.case_id)}` });
    return redirect(res, `/ops/tasks/${encodeURIComponent(t.id)}${from ? `?from=${encodeURIComponent(from)}` : ''}`);
  }
  // The case's WhatsApp thread for the tenant's phone on the decision page: only messages that exist.
  const thread = path.match(/^\/ops\/api\/tasks\/([\w-]+)\/thread$/)?.[1];
  if (thread) {
    const t = await store.getTask(thread);
    if (!t) return json(res, { error: 'not found' }, 404);
    return json(res, { thread: threadOf(await store.events(t.case_id)), delivered: reallyDelivered(t.case_id) });
  }
  const runFile = path.match(/^\/ops\/runs\/([\w-]+)\/(answer|reasoning)$/);
  if (runFile) {
    const r = await store.getRun(runFile[1]);
    const text = runFile[2] === 'answer' ? r?.answer_md : r?.reasoning_md;
    return text ? html(res, textPage(`${runFile[2].toUpperCase()}.md`, text)) : html(res, textPage('Not found', 'No such file yet'), 404);
  }

  // Demo: the tenant's WhatsApp, the quote, the landlord call and the one human decision, on the real agents.
  // The real recording of a call, proxied from ElevenLabs (the key stays on the server).
  const audio = path.match(/^\/ops\/show\/audio\/(conv_[\w]+)$/)?.[1];
  if (audio) {
    const r = await fetchAudio(audio);
    if (!r.ok || !r.body) return json(res, { error: 'no audio' }, 404);
    res.writeHead(200, { 'content-type': r.headers.get('content-type') ?? 'audio/mpeg', 'cache-control': 'private, max-age=3600' });
    for await (const chunk of r.body) res.write(chunk);
    return void res.end();
  }
  // Reset the demo: reopen every decided task, drop people's replies from the cases, back to the start.
  if (path === '/ops/show/reset' && req.method === 'POST') {
    for (const t of await store.listTasks()) {
      if (t.status !== 'resolved' || t.decision?.by === 'system') continue;
      await store.reopenTask(t.id);
      const c = await store.getCase(t.case_id);
      if (!c) continue;
      await store.deleteHumanEvents(c.id);
      const strip = (md: string) => {
        const { preamble, events } = parseHistory(md);
        const kept = events.filter((e) => !/- \*\*From:\*\* Agency staff/.test(e.body));
        if (kept.length === events.length) return md;
        return `${preamble.replace(/Total events: \d+/, `Total events: ${kept.length}`)}\n\n${kept.map((e) => `<a id="event-${String(e.n).padStart(3, '0')}"></a>\n## ${e.header}\n\n${e.body}`).join('\n\n')}\n`;
      };
      if (c.files?.['history.md']) await store.setFiles(c.id, { ...c.files, 'history.md': strip(c.files['history.md']) });
      else if (!c.files) await store.setHistory(c.id, strip(c.history_md));
      await store.setStatus(c.id, 'waiting_on_human');
    }
    return redirect(res, '/ops/show');
  }
  if (path === '/ops/show') {
    const d = await showData(store);
    if (!d) return html(res, textPage('Nothing to show yet', 'Run or import an eval run first (Eval runs).'), 404);
    return html(res, showPage(d, await openTasks()));
  }
  if (path === '/ops/demo') {
    const c = await demoCase(store);
    const events = c ? await store.events(c.id) : [];
    return html(res, demoPage({ c, events, tasks: c ? await store.listTasks({ caseId: c.id }) : [], bubbles: bubbles(events), canDial: !!ops.dial, openTasks: await openTasks() }));
  }
  if (req.method === 'POST' && path.startsWith('/ops/demo/')) {
    const f = await readForm(req);
    const step = path.slice('/ops/demo/'.length);
    if (step === 'whatsapp' && String(f.text ?? '').trim()) await tenantWhatsApp(store, worker, String(f.text).trim().slice(0, 1000));
    if (step === 'quote') await contractorQuote(store, worker);
    if (step === 'call') {
      if (f.mode === 'live' && ops.dial && String(f.to ?? '').trim()) {
        try {
          await ops.dial(String(f.to).trim(), BEN_SCENARIO.id);
        } catch (e) {
          return html(res, textPage('Call not placed', e instanceof Error ? e.message : String(e)), 400);
        }
      } else await recordedLandlordCall(store, worker, f.mode !== 'recorded-simple');
    }
    if (step === 'reset') {
      await resetDemo(store);
      for (const t of await store.listTasks({ caseId: DEMO_CASE, status: 'open' })) await store.resolveTask(t.id, { choice: 'Demo restarted', note: '', by: 'system' });
    }
    return redirect(res, '/ops/demo');
  }
  // Production WhatsApp inbound (Twilio / WhatsApp Business API webhook): the tenant's message reaches the case worker.
  if (path === '/ops/whatsapp/webhook' && req.method === 'POST') {
    const f = await readForm(req);
    const text = String(f.Body ?? f.text ?? '').trim();
    if (text) await tenantWhatsApp(store, worker, text.slice(0, 1000));
    res.writeHead(200, { 'content-type': 'text/xml' }).end('<Response></Response>');
    return;
  }

  // Live: import every case in a folder, run the case worker on each, watch the cards finish.
  const caseSets = () =>
    Object.entries(CASE_SETS)
      .map(([id, x]) => {
        let count = 0;
        try {
          count = readdirSync(x.dir()).filter((f) => statSync(join(x.dir(), f)).isDirectory()).length;
        } catch {}
        return { id, name: x.name, count };
      })
      .filter((x) => x.count);
  const liveBatch = async (id?: string | null) => {
    const all = await store.listBatches();
    return id ? all.find((x) => x.id === id) : all.find((x) => x.name.startsWith(`${LIVE_LABEL}:`));
  };
  if (path === '/ops/live' || path === '/ops/live/') {
    const b = await liveBatch(new URL(req.url ?? '/', 'http://x').searchParams.get('b'));
    return html(res, livePage({ d: await liveData(store, b), sets: caseSets(), openTasks: await openTasks() }));
  }
  if (path === '/ops/live/import' && req.method === 'POST') {
    const f = await readForm(req);
    const set = String(f.set ?? 'pm-public');
    if (!CASE_SETS[set]) return html(res, textPage('Unknown case folder', set), 400);
    const b = await startBatch(store, ops.evalWorker, set, undefined, undefined, LIVE_LABEL);
    return redirect(res, `/ops/live?b=${encodeURIComponent(b.id)}`);
  }
  const liveId = path.match(/^\/ops\/api\/live\/([\w-]+)$/)?.[1];
  if (liveId) {
    const b = await store.getBatch(liveId);
    if (!b) return json(res, { error: 'no such run' }, 404);
    return json(res, await liveData(store, b));
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
  if (path === '/ops/api/import' && req.method === 'POST') {
    // Show a `pnpm cases` output folder (or an earlier portal run) as an eval run: nothing is re-run.
    const f = await readForm(req);
    const dir = join(process.cwd(), String(f.dir ?? ''));
    if (!f.dir || !dir.startsWith(join(process.cwd(), 'runs'))) return html(res, textPage('Bad folder', 'Give a folder under runs/, e.g. runs/pm'), 400);
    const b = await importRun(store, dir);
    if (!b) return html(res, textPage('Nothing to import', `No <case>/result.json under ${f.dir} matches a public case.`), 400);
    return redirect(res, `/ops/evals/${encodeURIComponent(b.id)}`);
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
    // Compare with the latest earlier graded run of the same case set.
    const earlier = (await store.listBatches()).filter((x) => x.case_set === b.case_set && x.created_at < b.created_at && x.grading === 'done');
    let prev: { mean: number | null; scores: Record<string, number> } | undefined;
    if (earlier[0]) {
      const scores: Record<string, number> = {};
      for (const c of await store.batchCases(earlier[0].id)) if (c.grade && c.source_ref) scores[c.source_ref.split('@')[0]] = c.grade.score;
      const vals = Object.values(scores);
      prev = { mean: vals.length ? Math.round(vals.reduce((a, x) => a + x, 0) / vals.length) : null, scores };
    }
    return html(res, evalRunPage({ b, v, openTasks: await openTasks(), prev }));
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
