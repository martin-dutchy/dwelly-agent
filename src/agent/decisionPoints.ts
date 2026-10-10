// The questions a case brief asks, and which of them a decision leaves unanswered.
// Shared by the submit_decision validator (agent side) and the decision_points_answered check (eval side).

/** Questions listed under a "questions / decision points" heading of the brief (numbered or bulleted lines). */
export function parseQuestions(brief: string): string[] {
  const out: string[] = [];
  let inside = false;
  for (const line of brief.split('\n')) {
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      // The case title (H1) may mention "question" without being a list of them.
      inside = heading[1].length > 1 && /question|decision point|to decide/i.test(heading[2]);
      continue;
    }
    const item = inside && line.match(/^\s*(?:\d+[.)]|[-*])\s+(.+)$/);
    if (item) out.push(item[1].trim());
  }
  return out;
}

const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'is', 'it', 'for', 'in', 'on', 'what', 'who', 'does', 'do', 'this', 'that', 'be', 'any', 'with', 'by', 'through', 'which', 'why', 'how', 'are', 'there']);
const tokens = (s: string) => new Set(s.toLowerCase().replace(/[^a-z0-9£ ]+/g, ' ').split(/\s+/).filter((t) => t && !STOP.has(t)));

/** Share of the question's content words that also appear in the candidate (0 to 1). */
export function overlap(question: string, candidate: string) {
  const q = tokens(question);
  if (!q.size) return 0;
  const c = tokens(candidate);
  return [...q].filter((t) => c.has(t)).length / q.size;
}

/** The brief's questions with no matching entry in `answers` (paraphrases and a full positional list both count). */
export function unansweredQuestions(brief: string, answers: { question?: string; answer?: string }[] = []): string[] {
  const questions = parseQuestions(brief);
  return questions.filter((q, i) => {
    const best = Math.max(0, ...answers.filter((x) => x.answer?.trim()).map((x) => overlap(q, x.question ?? '')));
    return best < 0.5 && !(answers.length >= questions.length && answers[i]?.answer?.trim());
  });
}
