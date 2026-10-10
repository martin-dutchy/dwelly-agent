import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import type { Decision } from '../agent/caseAgent.js';
import type { LedgerEntry } from '../agent/ledger.js';
import { createVoiceServer } from '../voice/server.js';
import { type CallRow, type EventRow, memoryStore } from '../voice/store.js';
import { decideTask, ingestCall, ingestPublicCase } from './ingest.js';
import { recordRun, type RunOutput } from './record.js';
import { createOps } from './routes.js';
import { memoryOpsStore } from './store.js';
import { appendHistoryEvent, createWorker } from './worker.js';

const entry = (id: string, tool: string, args: Record<string, unknown>, status: LedgerEntry['status'] = 'verified'): LedgerEntry => ({
  id,
  tool,
  args,
  key: `${tool}:${id}`,
  attempts: 1,
  status,
  evidence: [`${id} read back`],
});
const decision = (over: Partial<Decision> = {}): Decision => ({
  case_state: 'Quote with the landlord',
  next_actions: [{ type: 'ESCALATE_TO_HUMAN', action: 'Hand the spend decision to a person', recipient: 'management', channel: 'internal', ledger_id: 'A2' }],
  boundaries: ['Escalating does not approve the quote'],
  remaining_work: ['Landlord or manager decides'],
  missing_info: ['Landlord spend limit'],
  outcome: 'escalated',
  severity: 'routine',
  summary: 'Quote above any known limit; escalated.',
  answers: [],
  actions_claimed: [],
  failed_actions: [],
  conflicts: ['Overview says £165, history says £172.51'],
  assumptions: [],
  ...over,
});
const escalation = { priority: 'P2', team: 'management', reason: 'Approve £207 quote without a landlord limit?', known: 'Quote £172.51 + VAT', missing: 'Spend limit', options: ['Approve', 'Ask landlord first'], recommendation: 'Ask landlord first', deadline: '2026-10-17' };

describe('recordRun', () => {
  it('turns a run into a timeline and a human task with the context to decide', () => {
    const run: RunOutput = {
      decision: decision(),
      ledger: [
        entry('A1', 'send_message', { recipient_name: 'Grace', recipient_role: 'tenant', channel: 'email', contact: 'existing thread', body: 'Quote is with the landlord.' }),
        entry('A2', 'escalate_to_human', escalation),
        entry('A3', 'schedule_follow_up', { due_on: '2026-10-17', purpose: 'Chase landlord' }),
      ],
      policyLog: [{ tool: 'approve_quote', reason: 'No recorded landlord approval covers £207' }],
    };
    const r = recordRun({ caseId: 'C1', runId: 'run_1', run, historyMd: '# h\n\n<a id="event-001"></a>\n## 2026-10-15 09:00:00 UTC — event 001\n\n- **Channel:** Email\n\nQuote attached' });
    expect(r.events.map((e) => e.kind)).toEqual(['message', 'escalation', 'follow_up', 'blocked', 'decision', 'human_task']);
    expect(r.events[0]).toMatchObject({ title: 'Email to Grace (tenant)', detail: 'Quote is with the landlord.', status: 'verified' });
    expect(r.events[3]).toMatchObject({ title: 'Denied by policy: approve quote', status: 'denied' });
    expect(r.status).toBe('waiting_on_human');
    expect(r.tasks[0]).toMatchObject({ priority: 'P2', question: escalation.reason, options: escalation.options, recommendation: 'Ask landlord first' });
    expect(r.tasks[0].context).toMatchObject({ known: 'Quote £172.51 + VAT', deadline: '2026-10-17', blocked: run.policyLog, conflicts: decision().conflicts });
    expect(r.tasks[0].context.next_actions?.[0]).toMatchObject({ type: 'ESCALATE_TO_HUMAN', status: 'verified' });
    expect(r.tasks[0].context.recent_history).toContain('Quote attached');
  });

  it('marks a run without a decision as failed so a person picks it up', () => {
    const r = recordRun({ caseId: 'C1', runId: 'r', run: { ledger: [], error: 'timed out' }, historyMd: '' });
    expect(r.status).toBe('failed');
    expect(r.events[0]).toMatchObject({ kind: 'run_failed', detail: 'timed out' });
  });
});

describe('appendHistoryEvent', () => {
  it('adds the next numbered event half an hour after the last one', () => {
    const h = '# Case 1 history\n\nTotal events: 1\n\n<a id="event-001"></a>\n## 2025-07-22 15:49:57 UTC — event 001\n\n- **Channel:** Note\n\nStart';
    const out = appendHistoryEvent(h, { channel: 'Note', from: 'Agency staff (human review)', to: 'Agency / system', body: 'Decision: approve' });
    expect(out).toContain('Total events: 2');
    expect(out).toContain('## 2025-07-22 16:19:57 UTC — event 002');
    expect(out).toContain('- **From:** Agency staff (human review)');
  });
});

describe('the human loop', () => {
  it('escalates, takes a person\'s decision into the case history, and re-runs the agent on it', async () => {
    const store = memoryOpsStore();
    const prompts: string[] = [];
    const worker = createWorker(store, {
      runner: async ({ prompt }) => {
        prompts.push(prompt);
        // First run escalates; the second sees the person's decision and acts on it.
        return prompts.length === 1
          ? { decision: decision(), ledger: [entry('A1', 'escalate_to_human', escalation)] }
          : {
              decision: decision({ outcome: 'action_taken', next_actions: [{ type: 'REQUEST_LANDLORD_APPROVAL', action: 'Ask landlord', recipient: 'Ellis, landlord', channel: 'email', ledger_id: 'A1' }] }),
              ledger: [entry('A1', 'request_landlord_approval', { landlord: 'Ellis', decision_needed: 'Approve quote', amount_gbp: 207, options: ['approve'] })],
            };
      },
    });
    const id = await ingestPublicCase(store, worker, '021', 5);
    await new Promise((r) => setTimeout(r, 50));
    expect((await store.getCase(id))?.status).toBe('waiting_on_human');
    const [task] = await store.listTasks({ status: 'open' });
    expect(task.context.recent_history).toContain('event 005');

    await decideTask(store, worker, task.id, { choice: 'Ask landlord first', note: 'Do not approve yourself', by: 'Iona Quill' });
    await new Promise((r) => setTimeout(r, 50));
    expect(prompts[1]).toContain('Decision by Iona Quill (agency staff, human review)');
    expect(prompts[1]).toContain('Do not approve yourself');
    const c = (await store.getCase(id))!;
    expect(c.status).toBe('waiting_on_party');
    const kinds = (await store.events(id)).map((e) => e.kind);
    expect(kinds).toContain('human_decision');
    expect(kinds.filter((k) => k === 'run_started')).toHaveLength(2);
    expect(await store.listTasks({ status: 'open' })).toHaveLength(0);
    expect(await decideTask(store, worker, task.id, { choice: 'again', note: '', by: 'x' })).toBeUndefined();
  });
});

describe('calls', () => {
  const call: CallRow = {
    conversation_id: 'conv_abcdef123456',
    tester_id: null,
    scenario_id: 'landlord-two-quotes',
    brain: 'native',
    status: 'graded',
    started_at: '2026-10-10T12:00:00.000Z',
    ended_at: '2026-10-10T12:04:00.000Z',
    duration_secs: 240,
    passed: true,
    grade: [],
    flags: [],
    transcript: [
      { role: 'agent', message: 'Hello, this is Northbridge Lettings about the void refurb quotes.' },
      { role: 'user', message: 'Go with the cheaper one but nothing over 1400.' },
    ],
    analysis: { transcript_summary: 'Landlord chose the cheaper quote with a £1,400 cap.' },
  };
  const voiceEvents: EventRow[] = [
    { ts: '2026-10-10T12:02:00.000Z', type: 'tool_refused', name: 'record_landlord_decision', result: { ok: false, error: 'readback_required', say: 'Read the details back to the caller and get a clear yes before doing this.' } },
    { ts: '2026-10-10T12:03:00.000Z', type: 'ledger', entry: { tool: 'record_landlord_decision', status: 'verified', args: { decision: 'approve', amount_gbp: 1400 } } },
    { ts: '2026-10-10T12:03:30.000Z', type: 'ledger', entry: { tool: 'escalate_to_human', status: 'verified', args: { priority: 'P2', reason: 'Landlord asked for a call back about the unpaid invoice', handover_summary: 'Unpaid invoice on another job' } } },
  ];

  it('records the call, the voice agent\'s denials and hand-overs, then runs the follow-ups', async () => {
    const store = memoryOpsStore();
    const runs: string[] = [];
    const worker = createWorker(store, { runner: async ({ prompt }) => (runs.push(prompt), { decision: decision({ outcome: 'action_taken', next_actions: [] }), ledger: [] }) });
    const id = await ingestCall(store, worker, call, voiceEvents);
    expect(id).toMatch(/^V008-landlord-two-quotes-/);
    const events = await store.events(id);
    expect(events.find((e) => e.kind === 'call')).toMatchObject({ actor: 'voice_agent', detail: 'Landlord chose the cheaper quote with a £1,400 cap.' });
    expect(events.find((e) => e.kind === 'blocked')).toMatchObject({ title: 'Denied on the call: record landlord decision', status: 'denied' });
    expect(events.find((e) => e.kind === 'action')).toMatchObject({ title: 'Recorded landlord decision: approve', status: 'verified' });
    const [task] = await store.listTasks({ caseId: id });
    expect(task).toMatchObject({ question: 'Landlord asked for a call back about the unpaid invoice' });
    expect(task.context.call?.transcript).toContain('nothing over 1400');
    // The follow-up run sees the call in the case history.
    expect(runs[0]).toContain('Landlord chose the cheaper quote');
    // Finalize can fire twice: the second ingest is a no-op.
    await ingestCall(store, worker, call, voiceEvents);
    expect(runs).toHaveLength(1);
  });
});

describe('portal routes', () => {
  it('serves the inbox and accepts a decision behind the admin password', async () => {
    const ops = await createOps(memoryOpsStore());
    const store = ops.store;
    await store.upsertCase({ id: 'C9', title: 'Case 009: Garden', property: 'Flat 1, 2 Lane', source: 'public', source_ref: null, status: 'waiting_on_human', index_md: '# Case 009: Garden', history_md: '# h\n\nTotal events: 0\n' });
    const task = await store.addTask({ case_id: 'C9', run_id: null, priority: 'P1', team: 'safeguarding', question: 'Tenant <script>alert(1)</script> at risk?', recommendation: 'Call today', options: ['Call today'], context: {} });
    const server = createVoiceServer({ ADMIN_PASSWORD: 'pw' } as NodeJS.ProcessEnv, memoryStore(), ops).listen(0);
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const auth = { authorization: `Basic ${Buffer.from('x:pw').toString('base64')}` };
    try {
      expect((await fetch(`${base}/ops`)).status).toBe(401);
      const inbox = await (await fetch(`${base}/ops`, { headers: auth })).text();
      expect(inbox).toContain('Tenant &lt;script&gt;');
      expect(inbox).not.toContain('<script>alert');
      expect((await fetch(`${base}/ops/tasks/${task.id}`, { headers: auth })).status).toBe(200);
      const r = await fetch(`${base}/ops/tasks/${task.id}/decide`, { method: 'POST', headers: { ...auth, 'content-type': 'application/x-www-form-urlencoded' }, body: 'choice=Call+today&by=Iona&note=', redirect: 'manual' });
      expect(r.status).toBe(303);
      expect((await store.getTask(task.id))?.status).toBe('resolved');
      const api = await (await fetch(`${base}/ops/api/cases/C9`, { headers: auth })).json();
      expect(api.events.map((e: { kind: string }) => e.kind)).toContain('human_decision');
    } finally {
      server.close();
    }
  });
});

describe('eval runs', () => {
  it('runs a case set through the worker and summarises why cases stopped short', async () => {
    const { startBatch } = await import('./batch.js');
    const { batchView } = await import('./batchView.js');
    const store = memoryOpsStore();
    let n = 0;
    const worker = createWorker(store, {
      concurrency: 3,
      runner: async () => {
        n++;
        // Case 1 escalates, case 2 has a policy denial and a failed write, case 3 acts cleanly.
        if (n === 1) return { decision: decision(), ledger: [entry('A1', 'escalate_to_human', escalation)] };
        if (n === 2)
          return {
            decision: decision({ outcome: 'action_taken', next_actions: [{ type: 'CHASE_PROVIDER', action: 'Chase', recipient: 'Swift, contractor', channel: 'email', ledger_id: 'A1' }] }),
            ledger: [entry('A1', 'send_message', { recipient_name: 'Swift', recipient_role: 'contractor', channel: 'email', body: 'Date?' }), entry('A2', 'assign_contractor', { contractor: 'Swift' }, 'failed')],
            policyLog: [{ tool: 'approve_quote', reason: 'No recorded landlord approval covers £640. Send it to the landlord.' }],
          };
        return { decision: decision({ outcome: 'action_taken', next_actions: [{ type: 'ASSIGN_PROVIDER', action: 'Assign', recipient: 'Swift, contractor', channel: 'email', ledger_id: 'A1' }] }), ledger: [entry('A1', 'assign_contractor', { contractor: 'Swift' })] };
      },
    });
    const { mkdtempSync } = await import('node:fs');
    const b = await startBatch(store, worker, 'pm-public', ['003', '021', '032'], mkdtempSync(`${(await import('node:os')).tmpdir()}/ops-test-`));
    expect(b.total).toBe(3);
    // Eval-run cases stay out of the live inbox.
    expect(await store.listCases()).toHaveLength(0);
    await new Promise((r) => setTimeout(r, 100));
    const cs = await store.batchCases(b.id);
    const events: Record<string, Awaited<ReturnType<typeof store.events>>> = {};
    for (const c of cs) events[c.id] = await store.events(c.id);
    const v = batchView(cs, events, await store.listTasks(), {});
    expect(v.done).toBe(3);
    expect(v.needed).toHaveLength(1);
    expect(v.denials).toMatchObject([{ tool: 'approve_quote', cases: [expect.anything()] }]);
    expect(v.notThrough).toMatchObject([{ tool: 'assign_contractor' }]);
    expect(v.tools.find((t) => t.tool === 'assign_contractor')).toMatchObject({ requested: 2, confirmed: 1, notThrough: 1 });
    expect(v.tools.find((t) => t.tool === 'approve_quote')).toMatchObject({ requested: 1, denied: 1 });
    expect(Object.fromEntries(v.outcomes)).toEqual({ escalated: 1, action_taken: 2 });
    // The judge's files are on disk in the batch runner's layout.
    const { existsSync, rmSync } = await import('node:fs');
    expect(existsSync(`${b.answers_dir}/021/ANSWER.md`)).toBe(true);
    expect(JSON.parse((await import('node:fs')).readFileSync(`${b.answers_dir}/021/result.json`, 'utf8')).cutoff).toBeGreaterThan(0);
    rmSync(b.answers_dir, { recursive: true, force: true });
  });
});

describe('shared vocabulary', () => {
  it('picks one stop reason per case by precedence', async () => {
    const { stopReason } = await import('./status.js');
    const c = { id: 'C', status: 'waiting_on_party' } as never;
    const ev = (kind: string, status: string | null, extra: object = {}) => ({ case_id: 'C', ts: '2026-10-10T10:00:00Z', kind, actor: 'agent', title: '', detail: null, status, run_id: 'r', data: null, ...extra }) as never;
    const decided = ev('decision', 'action_taken');
    expect(stopReason(c, [ev('run_started', null), ev('message', 'verified'), decided], [])).toBe('waiting');
    expect(stopReason(c, [ev('run_started', null), ev('message', 'failed'), decided], [{ case_id: 'C' } as never])).toBe('unconfirmed');
    expect(stopReason(c, [ev('run_started', null), ev('escalation', 'verified'), decided], [{ case_id: 'C' } as never])).toBe('handed_over');
    expect(stopReason(c, [ev('run_started', null), ev('blocked', 'denied'), decided], [])).toBe('policy_stop');
    expect(stopReason(c, [ev('run_started', null)], [])).toBe('no_decision');
  });

  it('asks for a reason only on options that are hard to undo', async () => {
    const { needsReason } = await import('./status.js');
    expect(needsReason('Release the £1,932 payout to the new account')).toBe(true);
    expect(needsReason('Approve the £640 quote')).toBe(true);
    expect(needsReason('Keep the hold and call the landlord back')).toBe(false);
    expect(needsReason('Ask the landlord to confirm in writing')).toBe(false);
  });

  it('refuses a hard-to-undo decision without a reason', async () => {
    const ops = await createOps(memoryOpsStore());
    await ops.store.upsertCase({ id: 'C1', title: 'Case 1', property: null, source: 'public', source_ref: null, status: 'waiting_on_human', index_md: '# Case 1', history_md: '# h\n\nTotal events: 0\n' });
    const task = await ops.store.addTask({ case_id: 'C1', run_id: null, priority: 'P2', team: 'accounts', question: 'Release payout?', recommendation: 'Release the payout', options: [], context: {} });
    const server = createVoiceServer({ ADMIN_PASSWORD: 'pw' } as NodeJS.ProcessEnv, memoryStore(), ops).listen(0);
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const headers = { authorization: `Basic ${Buffer.from('x:pw').toString('base64')}`, 'content-type': 'application/x-www-form-urlencoded' };
    try {
      const r = await fetch(`${base}/ops/tasks/${task.id}/decide`, { method: 'POST', headers, body: 'choice=Release+the+payout&by=Iona&note=ok', redirect: 'manual' });
      expect(r.status).toBe(400);
      expect(await r.text()).toContain('hard to undo');
      expect((await ops.store.getTask(task.id))?.status).toBe('open');
      const ok = await fetch(`${base}/ops/tasks/${task.id}/decide`, { method: 'POST', headers, body: 'choice=Release+the+payout&by=Iona&note=Confirmed+by+phone+with+the+landlord', redirect: 'manual' });
      expect(ok.status).toBe(303);
    } finally {
      server.close();
    }
  });
});

describe('live page', () => {
  it('starts empty with an import button and lists a run’s cases by state', async () => {
    const { liveData, livePage } = await import('./livePage.js');
    const store = memoryOpsStore();
    const empty = await liveData(store, undefined);
    expect(empty.cards).toEqual([]);
    const page = livePage({ d: empty, sets: [{ id: 'pm-public', name: 'Public cases', count: 50 }], openTasks: 0 });
    expect(page).toContain('action="/ops/live/import"');
    expect(page).toContain('Import cases');
    const b = await store.addBatch({ id: 'eval-live1', name: 'Live import: x', case_set: 'pm-public', total: 1, answers_dir: '/tmp/x', cases_dir: '/tmp/y', grading: 'not_started' });
    await store.upsertCase({ id: 'C1', title: 'Case 001: Leak', property: null, source: 'public', source_ref: '001@5', status: 'queued', index_md: '', history_md: '', batch_id: b.id });
    const d = await liveData(store, b);
    expect(d.cards).toMatchObject([{ id: 'C1', no: '001', title: 'Leak', state: 'queued' }]);
    expect(d.totals).toMatchObject({ cases: 1, queued: 1 });
  });
});
