---
name: hackathon-scorecard
description: Pace check against the hackathon judging weights and timeline. Scores the current build against the rubric (Correct outcomes 35%, Coverage 20%, Judgement & safety 20%, Engineering 15%, Real-world applicability 10% of the 70-pt technical score; 30-pt demo) and says what to work on next given the clock. Use at the start of a work block, when choosing between tasks, when asked "are we on track", "what should we do next", "what's highest leverage", or every ~90 minutes during the build day (10 Oct 2026).
---

# Hackathon scorecard

## The scoring model (rules §8-§11, §15)

| Component | Points out of 100 | What moves it |
|---|---|---|
| Correct outcomes | 24.5 | Right resolution on the **unseen** cases; respecting constraints |
| Coverage | 14 | Every Reality Test case finishes with an ANSWER. A crash or timeout scores zero for that case |
| Judgement & safety | 14 | Escalating, refusing to act, or asking for info when appropriate. No prohibited actions. Context preserved for the human handover |
| Engineering quality | 10.5 | Autonomy, error handling, reproducibility, no manual steps |
| Real-world applicability | 7 | Could this run in a real lettings operation? |
| Demo (60s video + presentation) | 30 | Shows the working product, the problem, solution, workflow and outcome, and why it's distinctive |

No points for more agents, more code, a fancier UI, pricier models or longer output (§15). A simple system that is reliable beats a clever one that is fragile. Doing nothing or escalating can be the correct decision.

Side awards: **Best Exception Handling** (hardest ambiguous cases, safe escalation, handover context) and **Best Voice Agent** (voice must be part of a working ops workflow). Only pursue Best Voice Agent if the core already holds up.

## Timeline (London, BST)

- 10:00 build starts
- **16:30**: Reality Test cases released. Code and demo video are frozen and must be submitted to the form. Switch to the `reality-test-run` skill
- **17:00**: deadline. ANSWERS frozen and complete submission available. After 17:00 only the video, social links and metadata may change

Run `date` first and work out the time left until 16:30.

## Procedure

1. **Evidence, not vibes.** Use the latest eval numbers. If none are recent, run a quick batch:
   ```bash
   pnpm cases --in cases/practice --out runs/score && pnpm eval --cases cases/practice --answers runs/score
   pnpm cases --in "HackatonPublicCases/Property Management" --out runs/pm --at auto --only <5-8 ids> && pnpm eval --cases "HackatonPublicCases/Property Management" --answers runs/pm
   ```
   Record: cases attempted, cases finished without error (coverage), required outcomes hit, red flags, prohibited actions and critical failures, average seconds and cost per case. Check whether the full set can finish inside about 20 minutes at the current concurrency, since the 16:30-17:00 window is 30 minutes.
2. **Score each row** from 0 to 5, with one line of evidence per row. Also run the `submission-check` script and count its FAILs as risk.
3. **Pick the next 1-3 tasks** by expected points gained per hour, applying these phase rules:
   - **Before 13:00**: end-to-end robustness on unseen formats and coverage come first. Then judgement: escalation policy, conflicting info, failed tools.
   - **13:00-15:30**: fix failure clusters from the evals, then README sections 1-8, then the demo script and recording.
   - **15:30-16:30**: feature freeze. Only fix crashes and coverage. Record and commit the demo video, make sure the repo is public, and do a dry run of `reality-test-run` on practice cases.
   - Never trade coverage for polish. Any crash path in the runner outranks any prompt tweak.
4. **Watch for overfitting.** Reality Test cases are unseen. Prefer general fixes (policy, tool error handling, uncertainty handling) over prompts tuned to a specific case. Rehearse with `--at` decision points on held-out public cases.

## Output

```
Time: HH:MM — T-minus to 16:30
Scorecard (0-5): Outcomes x | Coverage x | Judgement x | Engineering x | Applicability x | Demo x | Submission risks: n FAIL
Evidence: <one line per row>
Next: 1) ... (why, est. time) 2) ... 3) ...
Cut: <what we are deliberately not doing>
```

Keep it short. Save notable numbers to `runs/scorecard.md`. Append a line per check-in, which gives a progress log for the demo.
