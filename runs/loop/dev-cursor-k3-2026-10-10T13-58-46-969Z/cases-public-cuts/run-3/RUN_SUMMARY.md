# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T13-58-46-969Z/cases-public-cuts/run-3 --only 001-landlord-pays-direct,008-second-quote,010-recurring,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,025-warranty-dates,026-date-conflict,042-repair-failed-recurs,047-three-chases --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 10 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit e0fc43d7 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 5 | 0 | 0.063 | 27 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.072 | 24 |  |
| 010-recurring | action_taken | 4 | 0 | 0.046 | 22 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.048 | 22 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.045 | 21 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.055 | 24 |  |
| 025-warranty-dates | action_taken | 5 | 1 | 0.067 | 27 |  |
| 026-date-conflict | action_taken | 5 | 1 | 0.060 | 22 |  |
| 042-repair-failed-recurs | action_taken | 5 | 0 | 0.061 | 27 |  |
| 047-three-chases | escalated | 5 | 0 | 0.056 | 25 |  |

- Done in 49s · total cost $0.57 · decisions 10/10 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 9 autonomous · 1 escalated · 44 verified write actions (local mock environment) · $0.057 and 24 s per case · ~4.7 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
