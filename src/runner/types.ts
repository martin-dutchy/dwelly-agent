/** One line of the batch summary table. */
export type Row = {
  id: string;
  outcome: string;
  actions: number;
  failed: number;
  cost: number;
  secs: number;
  retries: number;
  /** `resumed` (kept from an earlier run) or `budget` (never started). */
  note?: string;
  error?: string;
};

/** Outcomes that mean the agent produced no decision for the case. */
export const NO_DECISION = new Set(['NO DECISION', 'CRASH', 'BUDGET SKIP']);
