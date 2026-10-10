# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T14-21-49-541Z/cases-public-cuts/run-2 --only 001-landlord-pays-direct,008-second-quote,010-recurring,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,025-warranty-dates,026-date-conflict,042-repair-failed-recurs,047-three-chases --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 10 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 1ed596ae with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 5 | 0 | 0.056 | 22 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.059 | 24 |  |
| 010-recurring | action_taken | 6 | 1 | 0.055 | 23 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.045 | 20 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.047 | 19 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.056 | 25 |  |
| 025-warranty-dates | action_taken | 6 | 0 | 0.065 | 29 |  |
| 026-date-conflict | action_taken | 4 | 0 | 0.049 | 22 |  |
| 042-repair-failed-recurs | action_taken | 6 | 0 | 0.067 | 27 |  |
| 047-three-chases | escalated | 4 | 0 | 0.054 | 22 |  |

- Done in 68s · total cost $0.55 · decisions 10/10 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 9 autonomous · 1 escalated · 47 verified write actions (local mock environment) · $0.055 and 23 s per case · ~5.0 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
