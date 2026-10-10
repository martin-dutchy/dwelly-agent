# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T13-49-11-448Z/cases-public-cuts/run-3 --only 001-landlord-pays-direct,008-second-quote,010-recurring,019-landlord-own-contractor,025-warranty-dates,026-date-conflict,042-repair-failed-recurs --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 7 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 4d59b652 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 6 | 0 | 0.056 | 24 |  |
| 008-second-quote | action_taken | 3 | 0 | 0.067 | 23 |  |
| 010-recurring | action_taken | 3 | 0 | 0.039 | 17 |  |
| 019-landlord-own-contractor | action_taken | 5 | 0 | 0.048 | 20 |  |
| 025-warranty-dates | action_taken | 5 | 0 | 0.058 | 26 |  |
| 026-date-conflict | action_taken | 4 | 0 | 0.046 | 22 |  |
| 042-repair-failed-recurs | action_taken | 6 | 0 | 0.055 | 23 |  |

- Done in 46s · total cost $0.37 · decisions 7/7 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 7 autonomous · 0 escalated · 32 verified write actions (local mock environment) · $0.053 and 22 s per case · ~3.5 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
