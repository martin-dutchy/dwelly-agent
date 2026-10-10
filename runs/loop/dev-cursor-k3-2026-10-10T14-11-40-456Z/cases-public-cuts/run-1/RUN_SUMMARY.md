# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T14-11-40-456Z/cases-public-cuts/run-1 --only 001-landlord-pays-direct,008-second-quote,025-warranty-dates --concurrency 3 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 3 cases with claude-sonnet-5-5, thinking medium (concurrency 3, Jev off) at commit bab58c01 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 5 | 0 | 0.093 | 20 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.111 | 19 |  |
| 025-warranty-dates | action_taken | 5 | 1 | 0.099 | 26 |  |

- Done in 26s · total cost $0.30 · decisions 3/3 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 3 · next run: keep --concurrency 3
- Value (estimate): 3 autonomous · 0 escalated · 13 verified write actions (local mock environment) · $0.101 and 22 s per case · ~1.4 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
