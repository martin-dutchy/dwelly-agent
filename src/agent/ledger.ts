import type { Verification } from './verify.js';

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
};

export const canonical = (v: unknown): string =>
  Array.isArray(v)
    ? `[${v.map(canonical).join(',')}]`
    : v && typeof v === 'object'
      ? `{${Object.keys(v)
          .sort()
          .map((k) => `${k}:${canonical((v as Record<string, unknown>)[k])}`)
          .join(',')}}`
      : JSON.stringify(v);

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
    if (prior) {
      // A retry of the same intent updates the same entry: one action, several attempts.
      Object.assign(prior, { attempts: prior.attempts + 1, apiError, status, ref: v.ref ?? prior.ref });
      prior.evidence.push(v.evidence);
      return prior;
    }
    const entry: LedgerEntry = { id: `A${this.entries.length + 1}`, tool, args, key, attempts: 1, apiError, status, ref: v.ref, evidence: [v.evidence] };
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
