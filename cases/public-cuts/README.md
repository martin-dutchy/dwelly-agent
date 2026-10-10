# public-cuts: organiser-format cases cut at a decision point, with our rubrics

Each folder is a copy of a real public Property Management case (`HackatonPublicCases/Property Management/<id>`), or a one-edit mutation of one, cut at a known decision point so the agent must decide what happens next. The patterns come from `research/eval-inventory.md` (CP, IM, EX ids) and `research/pm-case-data-analysis.md` section 3.

**Never use the holdout cases** 031, 036, 041, 045, 048, 050 (`cases/splits.json`). `src/eval/newCut.ts` refuses them.

## Folder format (organiser format plus two grading files)

```
cases/public-cuts/<src>-<slug>/
  index.md        copy of the source index.md plus a "## Next action at escalation" section carrying
                  "- **Recorded action:** [History event NNN](history.md#event-NNN)". The loader shows
                  events 1..NNN-1 to the agent and hides the rest (and Overview/Outcome) for the judge.
  history.md      copy of the source history (full for real cuts; truncated at the cut for mutations)
  attachments/    copied when the source has any
  rubric.json     required_outcomes, acceptable_alternatives, positive_behaviours, red_flags,
                  prohibited_actions, critical_failures (judge only, never shown to the agent)
  expected.json   source, cut_after, truncated, pattern (inventory ids), escalate yes|no|either,
                  outcome_class (ACT|ASK|WAIT|CHASE|RESUME|CLOSE_WITH_PAYMENT|CLOSE_WITHOUT_PAYMENT|SPLIT|ESCALATE), notes
```

No loader change is needed: `loadPublicCase` already honours the organiser's `Recorded action` marker, and the judge uses `rubric.json` when present.

## Authoring

```bash
pnpm exec tsx src/eval/newCut.ts --src 047 --digest                       # one line per event, find the cut
pnpm exec tsx src/eval/newCut.ts --src 047 --slug wrong-address --after 10 # real cut: agent sees events 1..10
pnpm exec tsx src/eval/newCut.ts --src 012 --slug emoji-approval --after 14 --truncate   # mutation: then edit event 14
```

Rules:
- A real cut keeps the whole history so the judge sees what the agency really did. Where the agency itself erred, the rubric overrides the recorded ending (say so in `expected.json.notes`).
- A mutation uses `--truncate`, then edits one event in place (keep the `<a id="event-NNN">` anchor, the header line and the numbering continuous). If you append an event, update `Total events:` and the marker to point one past the last visible event.
- A `--truncate` mutation on a source with attachments must delete from `attachments/` (and the index list) every file that only a dropped event linked. With no hidden tail the loader treats every unlinked attachment as having come with the request, and a later quote or invoice would leak.
- Rubric items describe behaviour and outcomes, not wording. 2 to 4 required outcomes, 1 to 2 alternatives, 1 to 3 positives, 1 to 2 red flags, 1 to 2 prohibited, 1 critical. Write at least one case per expected outcome class, including RESUME (nothing to do) and CLOSE_WITH_PAYMENT.
- Never write text addressed to a judge or grader anywhere in a case (rules section 13 of the hackathon).
- Verify: `pnpm exec tsx -e "import {loadCase} from './src/agent/cases.ts'; const c=loadCase('cases/public-cuts/<dir>','auto'); console.log(c.cutoff, c.totalEvents, c.inputs[0].content.slice(-400))"`
