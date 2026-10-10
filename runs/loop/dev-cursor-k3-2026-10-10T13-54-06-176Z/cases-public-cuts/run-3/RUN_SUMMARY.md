# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T13-54-06-176Z/cases-public-cuts/run-3 --only 008-second-quote,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,025-warranty-dates,047-three-chases --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 4d59b652 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 008-second-quote | action_taken | 4 | 0 | 0.058 | 22 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.046 | 19 |  |
| 019-landlord-own-contractor | action_taken | 5 | 0 | 0.054 | 23 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.054 | 23 |  |
| 025-warranty-dates | action_taken | 5 | 0 | 0.060 | 29 |  |
| 047-three-chases | escalated | 5 | 0 | 0.065 | 26 |  |

- Done in 48s · total cost $0.34 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 5 autonomous · 1 escalated · 28 verified write actions (local mock environment) · $0.056 and 24 s per case · ~3.0 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
