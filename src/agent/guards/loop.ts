import { canonical } from '../../core/failures.js';
import type { Guard } from '../harness/contracts.js';
import type { LedgerEntry } from '../ledger.js';
import { tierOf } from './tiers.js';

const norm = (v: unknown): unknown =>
  typeof v === 'string'
    ? v.toLowerCase().replace(/\s+/g, ' ').trim()
    : Array.isArray(v)
      ? v.map(norm)
      : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, norm(x)]))
        : v;
const intent = (tool: string, args: Record<string, unknown>) => `${tool}:${canonical(norm(args))}`;

// Reads leave no ledger entry, so they are counted here, per run: a run's ledger array is the same object for the whole run.
const reads = new WeakMap<readonly LedgerEntry[], Map<string, { count: number; writes: number }>>();

/**
 * Blocks the same write after it has failed twice (case and spacing ignored), and the same read a third time
 * with no write in between: neither can give a different answer.
 */
export const loopDetector: Guard = {
  id: 'loop.detector',
  tools: '*',
  check(call, ctx) {
    const key = intent(call.tool, call.args);
    if (tierOf(call.tool) === 0) {
      const seen = reads.get(ctx.ledger) ?? new Map<string, { count: number; writes: number }>();
      reads.set(ctx.ledger, seen);
      const writes = ctx.ledger.reduce((n, e) => n + e.attempts, 0);
      const prev = seen.get(key);
      const count = prev && prev.writes === writes ? prev.count + 1 : 1;
      seen.set(key, { count, writes });
      if (count < 3) return undefined;
      return {
        rule: 'loop.repeated_read',
        reason: `${call.tool} with these arguments has run ${count} times and nothing has changed since, so it will return the same answer. Change approach or submit: act on what you have, or call submit_decision.`,
      };
    }
    const failed = ctx.ledger.filter((e) => e.status === 'failed' && e.tool === call.tool && intent(e.tool, e.args) === key);
    const attempts = failed.reduce((n, e) => n + e.attempts, 0);
    if (attempts < 2) return undefined;
    return {
      rule: 'loop.repeated_failure',
      reason: `${call.tool} with these arguments has already failed ${attempts} times (${failed.map((e) => e.id).join(', ')}). Change approach or submit: use another route (another channel, another provider, log_call), or list it in failed_actions and escalate_to_human.`,
    };
  },
};
