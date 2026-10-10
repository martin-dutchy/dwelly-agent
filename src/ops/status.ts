import type { HumanTask, OpsCase, OpsEvent } from './store.js';

/**
 * One vocabulary for every page: why a case stopped (one code per case), how trustworthy each action is
 * (provenance), and who has the ball. Computed from events, never stored, so every page agrees.
 */

export type StopReason = 'no_decision' | 'unconfirmed' | 'handed_over' | 'policy_stop' | 'waiting' | 'no_action' | 'resolved' | 'working';

/** Label, and whether it earns colour. Only states that need someone get a tone. */
export const STOP: Record<StopReason, { label: string; tone: 'danger' | 'needs' | 'policy' | 'info' | null }> = {
  no_decision: { label: 'Agent did not finish', tone: 'danger' },
  unconfirmed: { label: 'Action not confirmed', tone: 'danger' },
  handed_over: { label: 'Handed to a person', tone: 'needs' },
  policy_stop: { label: 'Stopped by policy', tone: 'policy' },
  waiting: { label: 'Waiting on someone else', tone: null },
  no_action: { label: 'Chose to do nothing', tone: null },
  resolved: { label: 'Resolved by agent', tone: null },
  working: { label: 'Agent working', tone: 'info' },
};
export const STOP_ORDER: StopReason[] = ['no_decision', 'unconfirmed', 'handed_over', 'policy_stop', 'waiting', 'no_action', 'resolved'];

const WRITES = new Set(['action', 'message', 'follow_up', 'escalation']);

/** Events of the most recent case-worker run (the run that defines where the case stands now). */
export function lastRun(events: OpsEvent[]): OpsEvent[] {
  const start = events.map((e) => e.kind).lastIndexOf('run_started');
  return start < 0 ? events : events.slice(start);
}

/** Precedence: did not finish > not confirmed > handed over > policy stop > waiting > no action > resolved. */
export function stopReason(c: OpsCase, events: OpsEvent[], tasks: HumanTask[]): StopReason {
  if (c.status === 'queued' || c.status === 'agent_working') return 'working';
  const run = lastRun(events);
  const decision = [...run].reverse().find((e) => e.kind === 'decision');
  if (c.status === 'failed' || !decision) return 'no_decision';
  const writes = run.filter((e) => WRITES.has(e.kind) && e.actor === 'agent');
  if (writes.some((e) => e.status !== 'verified')) return 'unconfirmed';
  if (tasks.some((t) => t.case_id === c.id)) return 'handed_over';
  const blocked = run.filter((e) => e.kind === 'blocked');
  const lastBlocked = blocked.at(-1);
  if (lastBlocked && !writes.some((e) => e.ts > lastBlocked.ts && e.kind !== 'follow_up')) return 'policy_stop';
  if (decision.status === 'no_action') return 'no_action';
  if (decision.status === 'resolved' || c.status === 'closed') return 'resolved';
  return 'waiting';
}

export type Provenance = 'confirmed' | 'not_confirmed' | 'failed' | 'denied';
export const PROVENANCE: Record<Provenance, { glyph: string; label: string; tone: 'ok' | 'danger' | 'policy' }> = {
  confirmed: { glyph: '✓', label: 'Confirmed', tone: 'ok' },
  not_confirmed: { glyph: '◐', label: 'Not confirmed', tone: 'danger' },
  failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
  denied: { glyph: '⊘', label: 'Denied by policy', tone: 'policy' },
};
export const provenanceOf = (e: OpsEvent): Provenance =>
  e.kind === 'blocked' ? 'denied' : e.status === 'verified' ? 'confirmed' : e.status === 'failed' ? 'failed' : 'not_confirmed';

/** Words that mark a decision as hard to undo: such options need a written reason. */
export const IRREVERSIBLE = /\b(pay|payment|release|refund|approve|approval|bank|account details|transfer|serve|notice|evict|terminate|terminat|deposit|close the case|delete|change (the )?details)\b/i;
export const needsReason = (option: string) => IRREVERSIBLE.test(option) && !/\b(do not|don't|keep|hold|ask|wait)\b/i.test(option.split(/[,;.]/)[0]);
