import type { Decision } from '../agent/caseAgent.js';
import type { LedgerEntry } from '../agent/ledger.js';
import { parseHistory } from '../agent/publicCases.js';
import type { Actor, CaseStatus, EventKind, HumanTask, OpsEvent, TaskContext } from './store.js';

/**
 * Turns one case-worker run into what a person sees in the portal: a timeline entry per action, message,
 * block, follow-up and escalation, and a human task for every escalation with everything needed to decide.
 * Pure: no I/O, so it is the same for batch runs, post-call follow-ups and re-runs after a human decision.
 */

export type RunOutput = {
  decision?: Decision;
  ledger: LedgerEntry[];
  policyLog?: { tool: string; reason: string }[];
  gateLog?: { tool: string; block?: boolean; reasons?: string[]; attempt?: number; error?: string }[];
  error?: string;
};
export type TaskDraft = Omit<HumanTask, 'id' | 'created_at' | 'resolved_at' | 'decision' | 'status'>;

const MESSAGE_TOOLS = new Set(['send_message', 'request_information', 'request_landlord_approval']);
const FOLLOW_UP_TOOLS = new Set(['schedule_follow_up', 'put_on_hold']);
const STATUS = { verified: 'verified', failed: 'failed', unverifiable: 'unverified' } as const;

const s = (v: unknown) => (v === undefined || v === null ? '' : String(v));
const money = (v: unknown) => (typeof v === 'number' ? ` £${v.toLocaleString('en-GB', { maximumFractionDigits: 2 })}` : '');

/** One line a person can read, for any tool call the case worker can make. */
export function describeAction(tool: string, a: Record<string, unknown>): string {
  switch (tool) {
    case 'send_message':
      return `${cap(s(a.channel))} to ${s(a.recipient_name)} (${s(a.recipient_role)})`;
    case 'request_information':
      return `Asked ${s(a.recipient_name)} (${s(a.recipient_role)}) for information by ${s(a.channel)}`;
    case 'request_landlord_approval':
      return `Asked landlord ${s(a.landlord)} for approval${money(a.amount_gbp)}`;
    case 'record_landlord_decision':
      return `Recorded landlord decision: ${s(a.decision)}${money(a.cap_gbp)}`;
    case 'assign_contractor':
      return `Assigned ${s(a.contractor)} to ${s(a.ticket_ref)}${a.visit_window ? ` (${s(a.visit_window)})` : ''}`;
    case 'set_visit':
      return `Booked visit ${s(a.datetime)} (${s(a.slot_text)}), access: ${s(a.access)}`;
    case 'record_work_result':
      return `Work result: ${s(a.outcome)}`;
    case 'record_quote':
      return `Recorded quote from ${s(a.provider)}${money(a.amount_gbp)} ${a.vat === 'plus_vat' ? '+ VAT' : ''}`.trim();
    case 'approve_quote':
      return `Approved quote${money(a.amount_gbp)} for ${s(a.contractor)}`;
    case 'record_invoice':
      return `Recorded invoice from ${s(a.issuer)}${money(a.amount_gbp)} (${s(a.who_pays)})`;
    case 'hold_payment':
      return `Held payment to ${s(a.payee)}`;
    case 'schedule_follow_up':
      return `Follow-up on ${s(a.due_on)}: ${s(a.purpose)}`;
    case 'put_on_hold':
      return `On hold (${s(a.reason)}) until ${s(a.review_on)}: ${s(a.comment)}`;
    case 'resume_auto':
      return 'Returned the job to auto mode';
    case 'close_ticket':
      return `Closed ${s(a.ticket_ref)} (${s(a.mode)}): ${s(a.resolution)}`;
    case 'escalate_to_human':
      return `Escalated ${s(a.priority)} to ${s(a.team)}: ${s(a.reason)}`;
    case 'create_ticket':
      return `Opened job: ${s(a.category)}, ${s(a.severity)}: ${s(a.description)}`;
    case 'update_ticket':
      return `Updated ${s(a.ref)}${a.stage ? ` to ${s(a.stage)}` : ''}${a.note ? `: ${s(a.note)}` : ''}`;
    case 'log_call':
      return `Logged ${s(a.direction)} call with ${s(a.party_name)}: ${s(a.outcome)}`;
    case 'add_note':
      return `Note on ${s(a.entity)}: ${s(a.note)}`;
    default:
      return `${tool.replace(/_/g, ' ')}`;
  }
}
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function messageBody(tool: string, a: Record<string, unknown>) {
  if (tool === 'send_message') return s(a.body);
  if (tool === 'request_information') return `${((a.questions as string[]) ?? []).map((q) => `- ${q}`).join('\n')}\n\nWhy: ${s(a.why)}`;
  return `${s(a.decision_needed)}${money(a.amount_gbp)}\nOptions: ${((a.options as string[]) ?? []).join('; ')}${a.deadline ? `\nDeadline: ${s(a.deadline)}` : ''}`;
}

/** The last few history events verbatim: what the agent was looking at when it asked for help. */
export function recentHistory(historyMd: string, n = 6): string {
  const { events } = parseHistory(historyMd);
  return events
    .slice(-n)
    .map((e) => `### ${e.header}\n${e.body}`)
    .join('\n\n')
    .slice(0, 8000);
}

export function recordRun(o: {
  caseId: string;
  runId: string;
  run: RunOutput;
  historyMd: string;
  call?: TaskContext['call'];
  /** For cases without a history.md: the latest inputs, verbatim. */
  latest?: string;
  at?: Date;
}): { events: OpsEvent[]; tasks: TaskDraft[]; status: CaseStatus } {
  const base = (o.at ?? new Date()).getTime();
  let tick = 0;
  // Ledger entries carry no time of their own: keep them in order, a few ms apart.
  const ts = () => new Date(base + tick++ * 5).toISOString();
  const ev = (kind: EventKind, actor: Actor, title: string, detail: string | null, status: string | null, data: Record<string, unknown> | null): OpsEvent => ({
    case_id: o.caseId,
    ts: ts(),
    kind,
    actor,
    title,
    detail,
    status,
    run_id: o.runId,
    data,
  });
  const { decision: d, ledger } = o.run;
  const events: OpsEvent[] = [];
  const tasks: TaskDraft[] = [];

  for (const e of ledger) {
    const a = e.args as Record<string, unknown>;
    const status = STATUS[e.status];
    const kind: EventKind = MESSAGE_TOOLS.has(e.tool) ? 'message' : FOLLOW_UP_TOOLS.has(e.tool) ? 'follow_up' : e.tool === 'escalate_to_human' ? 'escalation' : 'action';
    const detail = kind === 'message' ? messageBody(e.tool, a) : kind === 'escalation' ? s(a.recommendation) : e.evidence.at(-1) ?? null;
    events.push(ev(kind, 'agent', describeAction(e.tool, a), detail, status, { ledger_id: e.id, tool: e.tool, args: a, attempts: e.attempts, evidence: e.evidence }));
  }
  for (const b of o.run.policyLog ?? []) events.push(ev('blocked', 'system', `Denied by policy: ${b.tool.replace(/_/g, ' ')}`, b.reason, 'denied', { tool: b.tool }));
  for (const g of o.run.gateLog ?? [])
    if (g.block) events.push(ev('blocked', 'system', `Message held by the pre-send check (${g.tool})`, (g.reasons ?? []).join('; '), 'held', { tool: g.tool, attempt: g.attempt }));

  if (d) {
    events.push(
      ev('decision', 'agent', `Decision: ${d.outcome.replace(/_/g, ' ')}`, d.summary, d.outcome, {
        case_state: d.case_state,
        next_actions: d.next_actions,
        boundaries: d.boundaries,
        remaining_work: d.remaining_work,
        missing_info: d.missing_info,
        conflicts: d.conflicts,
        severity: d.severity,
      }),
    );
  } else {
    events.push(ev('run_failed', 'system', 'The case worker did not reach a decision', o.run.error ?? null, 'failed', null));
  }

  // Every verified escalation is a question for a person, with what they need to answer it in one screen.
  const statusOf = (id?: string) => (id ? STATUS[ledger.find((x) => x.id === id)?.status ?? 'failed'] : 'not performed');
  for (const e of ledger.filter((x) => x.tool === 'escalate_to_human' && x.status === 'verified')) {
    const a = e.args as Record<string, any>;
    const task: TaskDraft = {
      case_id: o.caseId,
      run_id: o.runId,
      priority: s(a.priority) || 'P2',
      team: s(a.team) || 'management',
      question: s(a.reason),
      recommendation: a.recommendation ? s(a.recommendation) : null,
      options: Array.isArray(a.options) ? a.options.map(String) : [],
      context: {
        case_state: d?.case_state,
        known: s(a.known),
        missing: s(a.missing),
        missing_info: d?.missing_info,
        conflicts: d?.conflicts,
        boundaries: d?.boundaries,
        remaining_work: d?.remaining_work,
        next_actions: d?.next_actions.map((n) => ({ type: n.type, action: n.action, recipient: n.recipient, channel: n.channel, status: statusOf(n.ledger_id) })),
        blocked: o.run.policyLog,
        recent_history: o.latest?.slice(0, 8000) || recentHistory(o.historyMd),
        call: o.call,
        deadline: a.deadline ? s(a.deadline) : undefined,
      },
    };
    tasks.push(task);
    events.push(ev('human_task', 'system', `Waiting on a person (${task.priority}, ${task.team}): ${task.question}`, task.recommendation, 'open', null));
  }

  const closed = ledger.some((e) => e.tool === 'close_ticket' && e.status === 'verified');
  const status: CaseStatus = !d ? 'failed' : tasks.length ? 'waiting_on_human' : closed ? 'closed' : 'waiting_on_party';
  return { events, tasks, status };
}
