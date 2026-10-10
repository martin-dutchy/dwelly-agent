# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T13-49-22-017Z/cases-public-cuts/run-1 --only 008-second-quote,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,025-warranty-dates,047-three-chases --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 4d59b652 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 008-second-quote | action_taken | 4 | 0 | 0.103 | 18 |  |
| 014-misclassified-door | action_taken | 5 | 0 | 0.077 | 22 |  |
| 019-landlord-own-contractor | action_taken | 5 | 0 | 0.083 | 23 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.096 | 26 |  |
| 025-warranty-dates | action_taken | 6 | 0 | 0.073 | 31 |  |
| 047-three-chases | escalated | 5 | 0 | 0.067 | 23 |  |

- Done in 49s · total cost $0.50 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 5 autonomous · 1 escalated · 30 verified write actions (local mock environment) · $0.083 and 24 s per case · ~3.2 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
