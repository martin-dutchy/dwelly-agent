# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T12-40-56-673Z/cases-public-cuts/run-3 --only 008-second-quote,019-landlord-own-contractor,025-warranty-dates,038-tenant-own-appliance,040-tenant-resolved,047-three-chases --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 008-second-quote | action_taken | 3 | 0 | 0.045 | 18 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.042 | 19 |  |
| 025-warranty-dates | action_taken | 6 | 0 | 0.059 | 27 |  |
| 038-tenant-own-appliance | action_taken | 4 | 0 | 0.039 | 17 |  |
| 040-tenant-resolved | action_taken | 7 | 0 | 0.075 | 29 |  |
| 047-three-chases | action_taken | 4 | 0 | 0.048 | 21 |  |

- Done in 29s · total cost $0.31 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 6 autonomous · 0 escalated · 28 verified write actions (local mock environment) · $0.051 and 22 s per case · ~3.0 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
