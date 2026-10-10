# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T14-15-22-678Z/cases-public-cuts/run-2 --only 008-second-quote,010-recurring,014-misclassified-door,020-inspection-findings,025-warranty-dates,026-date-conflict,042-repair-failed-recurs,047-three-chases --concurrency 3 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 8 cases with claude-sonnet-5-5, thinking medium (concurrency 3, Jev off) at commit d4430887 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 008-second-quote | action_taken | 5 | 0 | 0.091 | 33 |  |
| 010-recurring | action_taken | 5 | 0 | 0.050 | 23 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.041 | 18 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.058 | 25 |  |
| 025-warranty-dates | action_taken | 6 | 1 | 0.071 | 30 |  |
| 026-date-conflict | action_taken | 5 | 0 | 0.061 | 28 |  |
| 042-repair-failed-recurs | action_taken | 6 | 0 | 0.059 | 22 |  |
| 047-three-chases | escalated | 5 | 0 | 0.069 | 28 |  |

- Done in 81s · total cost $0.50 · decisions 8/8 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 3 · next run: keep --concurrency 3
- Value (estimate): 7 autonomous · 1 escalated · 40 verified write actions (local mock environment) · $0.063 and 26 s per case · ~4.3 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
