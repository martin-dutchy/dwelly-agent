# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T14-09-01-141Z/cases-public-cuts/run-1 --only 001-landlord-pays-direct,008-second-quote,025-warranty-dates --concurrency 3 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 3 cases with claude-sonnet-5-5, thinking medium (concurrency 3, Jev off) at commit 88a94bce with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 7 | 0 | 0.127 | 28 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.160 | 26 |  |
| 025-warranty-dates | action_taken | 5 | 0 | 0.118 | 27 |  |

- Done in 28s · total cost $0.40 · decisions 3/3 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 3 · next run: keep --concurrency 3
- Value (estimate): 3 autonomous · 0 escalated · 16 verified write actions (local mock environment) · $0.135 and 27 s per case · ~1.7 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
