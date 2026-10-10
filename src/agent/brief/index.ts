// Brief: facts, conflicts, deadlines and money computed from the bundle before the model reads it.
// Wave 0 stub: carries the organiser-format state hints as untyped notes, so the prompt is unchanged.
import type { CaseBrief, CaseBundle } from '../harness/contracts.js';
import { hintsFor } from '../maintenance/stateReconstruct.js';

export function compileBrief(b: CaseBundle): CaseBrief {
  const hints = hintsFor({ dir: b.dir, cutoff: b.cutoff });
  return {
    now: b.now,
    parties: b.parties,
    facts: [],
    conflicts: [],
    deadlines: [],
    money: { quotes: [], approvals: [], invoices: [] },
    questions: b.questions,
    tags: [],
    notes: hints.text ? [hints.text] : [],
  };
}

/** The brief as prompt text. Never throws. */
export function renderBrief(brief: CaseBrief): string {
  return brief.notes.join('\n\n');
}
