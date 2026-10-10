import { type FailureClass, canonical, classifyFailure } from '../core/failures.js';
import type { Verification } from './verify.js';

export { canonical };

export type LedgerStatus = 'verified' | 'failed' | 'unverifiable';

export type LedgerEntry = {
  id: string; // A1, A2… referenced by the agent in submit_decision
  tool: string;
  args: Record<string, unknown>;
  key: string; // idempotency key: tool + canonical args
  attempts: number;
  apiError?: string;
  status: LedgerStatus;
  ref?: string;
  evidence: string[];
  /** Set while the entry is failed: what kind of failure, and what to do next. */
  failureClass?: FailureClass;
  nextStep?: string;
};

/** The failure class and next step as one sentence for the model, or '' when the entry is not failed. */
export const failureNote = (e: LedgerEntry) => (e.failureClass ? ` Failure class: ${e.failureClass}. Next: ${e.nextStep}` : '');

/**
 * Source of truth for "what did the agent actually do". ANSWER.md's action table is rendered
 * from here, never from the model's prose, so a claimed-but-failed action can't slip through.
 */
export class ActionLedger {
  readonly entries: LedgerEntry[] = [];

  keyOf(tool: string, args: Record<string, unknown>) {
    return `${tool}:${canonical(args)}`;
  }

  findVerified(tool: string, args: Record<string, unknown>) {
    const key = this.keyOf(tool, args);
    return this.entries.find((e) => e.key === key && e.status === 'verified');
  }

  record(tool: string, args: Record<string, unknown>, apiError: string | undefined, v: Verification): LedgerEntry {
    const key = this.keyOf(tool, args);
    const status: LedgerStatus = v.status === 'verified' ? 'verified' : v.status === 'unverifiable' ? 'unverifiable' : 'failed';
    const prior = this.entries.find((e) => e.key === key && e.status !== 'verified');
    const typed = (attempts: number) => (status === 'failed' ? classifyFailure(tool, attempts, apiError) : { failureClass: undefined, nextStep: undefined });
    if (prior) {
      // A retry of the same intent updates the same entry: one action, several attempts.
      Object.assign(prior, { attempts: prior.attempts + 1, apiError, status, ref: v.ref ?? prior.ref }, typed(prior.attempts + 1));
      prior.evidence.push(v.evidence);
      return prior;
    }
    const entry: LedgerEntry = { id: `A${this.entries.length + 1}`, tool, args, key, attempts: 1, apiError, status, ref: v.ref, evidence: [v.evidence] };
    if (status === 'failed') Object.assign(entry, typed(1));
    this.entries.push(entry);
    return entry;
  }

  get(id: string) {
    return this.entries.find((e) => e.id === id);
  }

  /** Actions that did not end verified; the final decision must account for each. */
  unresolved() {
    return this.entries.filter((e) => e.status !== 'verified');
  }
}
