# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T13-53-59-750Z/cases-public-cuts/run-3 --only 001-landlord-pays-direct,008-second-quote,010-recurring,019-landlord-own-contractor,025-warranty-dates,026-date-conflict,042-repair-failed-recurs --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 7 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 4d59b652 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 5 | 0 | 0.052 | 22 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.075 | 23 |  |
| 010-recurring | action_taken | 5 | 0 | 0.049 | 21 |  |
| 019-landlord-own-contractor | action_taken | 5 | 0 | 0.052 | 22 |  |
| 025-warranty-dates | action_taken | 5 | 0 | 0.059 | 26 |  |
| 026-date-conflict | action_taken | 4 | 0 | 0.047 | 21 |  |
| 042-repair-failed-recurs | action_taken | 5 | 0 | 0.056 | 22 |  |

- Done in 47s · total cost $0.39 · decisions 7/7 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 7 autonomous · 0 escalated · 33 verified write actions (local mock environment) · $0.056 and 22 s per case · ~3.6 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
