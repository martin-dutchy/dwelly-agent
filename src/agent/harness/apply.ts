import type { Decision } from '../caseAgent.js';
import type { CompletionCheck, CompletionProblem, Guard, GuardContext, GuardVerdict, ToolCall } from './contracts.js';

const appliesTo = (g: Guard, tool: string) => tool !== 'submit_decision' && (g.tools === '*' || g.tools.includes(tool));

/** The first guard that blocks the call. A guard that throws is skipped: a broken rule must not stall the case. */
export function firstGuardBlock(guards: readonly Guard[], call: ToolCall, ctx: GuardContext): (GuardVerdict & { guard: string }) | undefined {
  for (const g of guards) {
    if (!appliesTo(g, call.tool)) continue;
    try {
      const v = g.check(call, ctx);
      if (v) return { ...v, guard: g.id };
    } catch {}
  }
  return undefined;
}

/**
 * Problems from every completion check, split into those to bounce back now and those past their cap.
 * `counts` is per check id and persists across submits in one run.
 */
export function completionProblems(checks: readonly CompletionCheck[], decision: Partial<Decision>, ctx: GuardContext, counts: Map<string, number>, cap = 2) {
  const bounce: CompletionProblem[] = [];
  const capped: CompletionProblem[] = [];
  for (const c of checks) {
    let found: CompletionProblem[] = [];
    try {
      found = c.check(decision, ctx);
    } catch {}
    if (!found.length) continue;
    const n = counts.get(c.id) ?? 0;
    if (n < cap) {
      counts.set(c.id, n + 1);
      bounce.push(...found);
    } else capped.push(...found);
  }
  return { bounce, capped };
}
