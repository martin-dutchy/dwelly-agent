import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { loadPublicCase, parseHistory } from '../agent/publicCases.js';
import { exportCall } from '../voice/export.js';
import { scenarioById } from '../voice/scenarios.js';
import type { CallRow, EventRow } from '../voice/store.js';
import { describeAction, recentHistory } from './record.js';
import type { OpsEvent, OpsStore, TaskContext } from './store.js';
import { type Worker, appendHistoryEvent } from './worker.js';

/**
 * How cases enter the portal: a finished phone call, a public example opened for a demo, and a person's
 * decision on a task. Each one records what happened and then hands the case to the case worker.
 */

const PUBLIC = () => join(process.cwd(), 'HackatonPublicCases', 'Property Management');
const s = (v: unknown) => (v === undefined || v === null ? '' : String(v));
const title = (indexMd: string, fallback: string) => indexMd.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
const property = (indexMd: string) => indexMd.match(/\*\*Property:\*\*\s*(.+)/)?.[1]?.trim() ?? null;
/** index.md without the sections that give the ending away. */
const openIndex = (indexMd: string) => indexMd.split(/^## Overview/m)[0].replace(/^- \*\*(Status|Updated|Completed):\*\*.*\n/gm, '').trim();

function callContext(call: CallRow): NonNullable<TaskContext['call']> {
  const summary = s((call.analysis as { transcript_summary?: string } | null)?.transcript_summary);
  const transcript = (call.transcript ?? [])
    .filter((t) => t.message)
    .map((t) => `${t.role === 'agent' ? 'Agent' : 'Caller'}: ${t.message}`)
    .join('\n')
    .slice(0, 6000);
  return { summary: summary || undefined, transcript: transcript || undefined };
}

/** What the voice agent did on the call, as timeline events: verified actions, refusals and escalations. */
export function callEvents(caseId: string, call: CallRow, voiceEvents: EventRow[]): { events: OpsEvent[]; escalations: Record<string, unknown>[] } {
  const scenario = scenarioById(call.scenario_id);
  const ctx = callContext(call);
  const base: Omit<OpsEvent, 'ts' | 'kind' | 'title' | 'detail' | 'status' | 'data' | 'actor'> = { case_id: caseId, run_id: `call:${call.conversation_id}` };
  const events: OpsEvent[] = [
    {
      ...base,
      ts: call.started_at,
      kind: 'call',
      actor: 'voice_agent',
      title: `Phone call ${scenario?.direction === 'outbound' ? 'to' : 'from'} the ${scenario?.role ?? 'caller'}${call.duration_secs ? ` (${Math.round(call.duration_secs / 60)} min)` : ''}`,
      detail: ctx.summary ?? 'No call summary yet.',
      status: call.passed === null ? null : call.passed ? 'checks passed' : 'checks failed',
      data: { conversation_id: call.conversation_id, scenario: call.scenario_id, transcript: ctx.transcript, flags: call.flags, grade: call.grade },
    },
  ];
  const escalations: Record<string, unknown>[] = [];
  for (const e of voiceEvents) {
    if (e.type === 'ledger') {
      const entry = e.entry as { tool: string; status: string; args: Record<string, unknown>; evidence?: string[] };
      if (entry.tool === 'escalate_to_human' && entry.status === 'verified') escalations.push(entry.args);
      events.push({
        ...base,
        ts: e.ts,
        kind: entry.tool === 'escalate_to_human' ? 'escalation' : 'action',
        actor: 'voice_agent',
        title: entry.tool === 'escalate_to_human' ? `Escalated ${s(entry.args.priority)} on the call: ${s(entry.args.reason)}` : describeAction(entry.tool, entry.args),
        detail: entry.tool === 'escalate_to_human' ? s(entry.args.handover_summary) || null : (entry.evidence?.at(-1) ?? null),
        status: entry.status === 'verified' ? 'verified' : entry.status === 'failed' ? 'failed' : 'unverified',
        data: { tool: entry.tool, args: entry.args },
      });
    }
    // Permission denials: a write without a read-back and a yes, or a tool that needs the caller verified first.
    const result = (e.result ?? {}) as { ok?: boolean; error?: string; say?: string };
    if (e.type === 'tool_refused' || (e.type === 'tool' && result.ok === false && result.error === 'not_verified'))
      events.push({ ...base, ts: e.ts, kind: 'blocked', actor: 'system', title: `Denied on the call: ${s(e.name).replace(/_/g, ' ')}`, detail: s(result.say) || s(result.error), status: 'denied', data: { tool: e.name } });
  }
  return { events, escalations };
}

/**
 * After a call: record the call and the voice agent's actions, then (for calls about a case) run the case
 * worker on the case with the call as its newest events, so the follow-ups happen without anyone asking.
 */
export async function ingestCall(store: OpsStore, worker: Worker, call: CallRow, voiceEvents: EventRow[]) {
  const scenario = scenarioById(call.scenario_id);
  const ledger = voiceEvents.filter((e) => e.type === 'ledger').map((e) => e.entry) as Parameters<typeof exportCall>[1];
  const tmp = mkdtempSync(join(tmpdir(), 'ops-call-'));
  try {
    const dir = scenario?.source ? exportCall(call, ledger, tmp) : undefined;
    const id = dir ? dir.split('/').at(-1)! : `CALL-${call.conversation_id.slice(-8)}`;
    const index = dir
      ? readFileSync(join(dir, 'index.md'), 'utf8')
      : `# Case ${id}: ${scenario?.title ?? 'Inbound call'}\n\n## Case details\n\n- **Source role:** ${scenario?.role ?? 'caller'} (phone)\n`;
    const history = dir ? readFileSync(join(dir, 'history.md'), 'utf8') : `# Case ${id} history\n\nTotal events: 0\n`;
    if (await store.getCase(id)) return id; // already ingested (finalize can fire twice)
    await store.upsertCase({ id, title: title(index, id), property: property(index), source: 'voice', source_ref: call.conversation_id, status: 'agent_working', index_md: index, history_md: history });
    const { events, escalations } = callEvents(id, call, voiceEvents);
    await store.addEvents([
      { case_id: id, ts: new Date(Date.parse(call.started_at) - 1000).toISOString(), kind: 'case_opened', actor: 'system', title: dir ? `Case opened from public case ${scenario!.source!.case} at event ${scenario!.source!.cutAfterEvent}` : 'Case opened from an inbound call', detail: null, status: null, run_id: null, data: { scenario: call.scenario_id } },
      ...events,
    ]);
    const callCtx = callContext(call);
    // The voice agent's own hand-overs wait on a person straight away, with the call as their context.
    for (const a of escalations)
      await store.addTask({
        case_id: id,
        run_id: `call:${call.conversation_id}`,
        priority: s(a.priority) || 'P2',
        team: 'maintenance',
        question: s(a.reason),
        recommendation: null,
        options: [],
        context: { known: s(a.handover_summary), call: callCtx, recent_history: dir ? recentHistory(history) : undefined },
      });
    if (dir) await worker.enqueue(id, 'follow-ups after the call', callCtx);
    else await store.setStatus(id, escalations.length ? 'waiting_on_human' : 'waiting_on_party');
    return id;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/** Open a public example at its decision point (or after a given event) and let the case worker take it. */
export async function ingestPublicCase(store: OpsStore, worker: Worker, caseNo: string, afterEvent?: number, root = PUBLIC()) {
  const dir = join(root, caseNo);
  const indexMd = readFileSync(join(dir, 'index.md'), 'utf8');
  const historyMd = readFileSync(join(dir, 'history.md'), 'utf8');
  const cut = afterEvent ?? loadPublicCase(dir, 'auto').cutoff;
  const { preamble, events } = parseHistory(historyMd);
  const kept = events.slice(0, cut);
  const id = `PM${caseNo}-e${cut}`;
  const history = `${preamble.replace(/Total events: \d+/, `Total events: ${kept.length}`)}\n\n${kept.map((e) => `<a id="event-${String(e.n).padStart(3, '0')}"></a>\n## ${e.header}\n\n${e.body}`).join('\n\n')}\n`;
  const index = openIndex(indexMd);
  await store.upsertCase({ id, title: title(index, id), property: property(index), source: 'public', source_ref: `${caseNo}@${cut}`, status: 'agent_working', index_md: index, history_md: history });
  await store.addEvents([{ case_id: id, ts: new Date().toISOString(), kind: 'case_opened', actor: 'system', title: `Opened public case ${caseNo} after event ${cut} of ${events.length}`, detail: kept.at(-1)?.header ?? null, status: null, run_id: null, data: null }]);
  void worker.enqueue(id, 'new case');
  return id;
}

/** Open one of our practice cases (case.md + inputs/). Grading files never reach the agent. */
export async function ingestPracticeCase(store: OpsStore, worker: Worker, caseNo: string, root = join(process.cwd(), 'cases', 'practice')) {
  const dir = join(root, caseNo);
  const HIDDEN = new Set(['rubric.json', 'tool_failures.json', 'checks.json', 'expected.json']);
  const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  const files = Object.fromEntries(
    walk(dir)
      .filter((p) => !HIDDEN.has(p.split('/').at(-1)!))
      .map((p) => [relative(dir, p), readFileSync(p, 'utf8')]),
  );
  const brief = files['case.md'] ?? '';
  const id = `P${caseNo}`;
  await store.upsertCase({ id, title: title(brief, id).replace(/^Case (\d+)/, `Practice case $1`), property: brief.match(/Flat [^,\n]+, [^\n(]+/)?.[0]?.trim() ?? null, source: 'practice', source_ref: caseNo, status: 'agent_working', index_md: brief, history_md: '', files });
  await store.addEvents([{ case_id: id, ts: new Date().toISOString(), kind: 'case_opened', actor: 'system', title: `Opened practice case ${caseNo}`, detail: Object.keys(files).join(', '), status: null, run_id: null, data: null }]);
  void worker.enqueue(id, 'new case');
  return id;
}

/**
 * A person's decision on a task: recorded on the timeline and written into the case history as an agency
 * note, then the case worker runs again and acts on it.
 */
export async function decideTask(store: OpsStore, worker: Worker, taskId: string, d: { choice: string; note: string; by: string }) {
  const task = await store.resolveTask(taskId, d);
  if (!task) return undefined;
  const c = await store.getCase(task.case_id);
  if (!c) return undefined;
  const body = [
    `Decision by ${d.by} (agency staff, human review) on the escalation "${task.question}":`,
    `Decision: ${d.choice}`,
    d.note.trim() ? `Note: ${d.note.trim()}` : '',
    'The case worker should now carry out this decision and tell the parties who need to know.',
  ]
    .filter(Boolean)
    .join('\n\n');
  if (c.files) {
    // Practice layout: the decision arrives as a new input file, like any other document on the case.
    const n = Object.keys(c.files).filter((f) => f.startsWith('inputs/human_decision_')).length + 1;
    await store.setFiles(c.id, { ...c.files, [`inputs/human_decision_${n}.md`]: `# Agency staff decision (human review)\n\n${body}\n` });
  } else await store.setHistory(c.id, appendHistoryEvent(c.history_md, { channel: 'Note', from: 'Agency staff (human review)', to: 'Agency / system', body }));
  await store.addEvents([{ case_id: c.id, ts: new Date().toISOString(), kind: 'human_decision', actor: 'human', title: `${d.by} decided: ${d.choice}`, detail: d.note || null, status: 'resolved', run_id: task.run_id, data: { task_id: task.id, question: task.question } }]);
  void worker.enqueue(c.id, `acting on ${d.by}'s decision`);
  return task;
}
