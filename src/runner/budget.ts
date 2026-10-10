// Global time budget for a batch run: one deadline, per-case timeouts that shrink as it approaches.

/** A case is not started with less than this left before the deadline. */
export const MIN_START_MS = 60_000;
/** Headroom left for writing files after a case's timeout fires. */
export const WRITE_MARGIN_MS = 20_000;
const FLOOR_MS = 90_000;
const MAX_AHEAD_MS = 3 * 60 * 60_000;

/**
 * The run's deadline: `budgetMin` minutes from `now`, or `HH:MM` local time today; the earlier wins.
 * Undefined when neither is given. Throws on a malformed, passed or implausibly distant deadline.
 */
export function parseDeadline(budgetMin: string | undefined, deadlineHHMM: string | undefined, now: Date): Date | undefined {
  const candidates: Date[] = [];
  if (budgetMin !== undefined) {
    const m = Number(budgetMin);
    if (!Number.isFinite(m) || m <= 0) throw new Error(`--budget-min must be a positive number of minutes, got "${budgetMin}"`);
    candidates.push(new Date(now.getTime() + m * 60_000));
  }
  if (deadlineHHMM !== undefined) {
    const match = /^(\d{1,2}):(\d{2})$/.exec(deadlineHHMM.trim());
    if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) throw new Error(`--deadline must be HH:MM (24-hour, local time), got "${deadlineHHMM}"`);
    const d = new Date(now);
    d.setHours(Number(match[1]), Number(match[2]), 0, 0);
    if (d.getTime() <= now.getTime()) throw new Error(`--deadline ${deadlineHHMM} has already passed (now ${hhmm(now)})`);
    if (d.getTime() - now.getTime() > MAX_AHEAD_MS) throw new Error(`--deadline ${deadlineHHMM} is more than 3 hours away (now ${hhmm(now)}); check the clock`);
    candidates.push(d);
  }
  return candidates.length ? new Date(Math.min(...candidates.map((d) => d.getTime()))) : undefined;
}

/** Per-case timeout before clamping: `min(timeout, max(90 s, 2 × budget × concurrency / N))`. */
export function baseTimeoutMs(timeoutSec: number, budgetMs: number | undefined, concurrency: number, n: number): number {
  const cap = timeoutSec * 1000;
  if (budgetMs === undefined || n <= 0) return cap;
  return Math.min(cap, Math.max(FLOOR_MS, Math.floor((2 * budgetMs * Math.max(1, concurrency)) / n)));
}

/** The timeout for a case starting at `now`, or `'skip'` when there is no longer time to start it. */
export function caseTimeoutMs(baseMs: number, deadline: Date | undefined, now: number): number | 'skip' {
  if (!deadline) return baseMs;
  const remaining = deadline.getTime() - now;
  if (remaining < MIN_START_MS) return 'skip';
  return Math.min(baseMs, remaining - WRITE_MARGIN_MS);
}

export const hhmm = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
