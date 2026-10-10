// Deterministic checks a draft decision must pass before the pre-submit review runs. Pure functions.
import type { LedgerEntry } from '../ledger.js';
import { unansweredQuestions } from '../decisionPoints.js';

const MIN_PACKET_TEXT = 10;

/** What an escalation packet lacks for a human to decide from it: short known / missing / recommendation, no options. */
export function escalationPacketProblems(args: Record<string, unknown>): string[] {
  const missing: string[] = [];
  for (const k of ['known', 'missing', 'recommendation'])
    if (String(args[k] ?? '').trim().length < MIN_PACKET_TEXT) missing.push(k);
  const options = Array.isArray(args.options) ? args.options.filter((o) => String(o ?? '').trim()) : [];
  if (!options.length) missing.push('options');
  return missing;
}

/** Problems with a draft that the code can find on its own: unanswered case questions, thin escalation packets. */
export function preCriticProblems(decision: { answers?: { question?: string; answer?: string }[] }, ledger: LedgerEntry[], brief: string): string[] {
  const problems: string[] = [];
  const unanswered = unansweredQuestions(brief, decision.answers ?? []);
  if (unanswered.length)
    problems.push(`answers is missing ${unanswered.length} of the case's questions: ${unanswered.map((q) => `"${q}"`).join(', ')}. Add an answer for each, using its wording.`);
  const escalations = ledger.filter((e) => e.tool === 'escalate_to_human' && e.status === 'verified');
  escalations.forEach((e, i) => {
    const gaps = escalationPacketProblems(e.args);
    // A thin packet followed by a complete one to the same team has been fixed; a verified escalation cannot be edited.
    const fixedLater = escalations.slice(i + 1).some((x) => x.args.team === e.args.team && !escalationPacketProblems(x.args).length);
    if (gaps.length && !fixedLater)
      problems.push(`escalation packet incomplete: ${gaps.join(', ')} (${e.id}). A human must be able to decide from it alone: escalate again to the same team with the full packet.`);
  });
  return problems;
}
