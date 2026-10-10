# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T12-43-45-642Z/cases-practice --only 01,02,03,05,06,07,08,10,11,12,13,15,16,17,18,20,21 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 17 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 01 | escalated | 6 | 0 | 0.064 | 26 |  |
| 02 | action_taken | 5 | 0 | 0.061 | 26 |  |
| 03 | action_taken | 7 | 0 | 0.071 | 34 |  |
| 05 | action_taken | 6 | 0 | 0.058 | 25 |  |
| 06 | escalated | 8 | 0 | 0.088 | 34 |  |
| 07 | action_taken | 2 | 0 | 0.034 | 14 |  |
| 08 | escalated | 3 | 0 | 0.041 | 21 |  |
| 10 | escalated | 3 | 0 | 0.050 | 23 |  |
| 11 | action_taken | 4 | 0 | 0.044 | 22 |  |
| 12 | escalated | 5 | 0 | 0.056 | 24 |  |
| 13 | action_taken | 5 | 0 | 0.056 | 24 |  |
| 15 | action_taken | 2 | 0 | 0.041 | 20 |  |
| 16 | escalated | 7 | 0 | 0.080 | 31 |  |
| 17 | escalated | 5 | 0 | 0.052 | 23 |  |
| 18 | action_taken | 3 | 0 | 0.042 | 20 |  |
| 20 | escalated | 8 | 0 | 0.086 | 37 |  |
| 21 | action_taken | 2 | 0 | 0.038 | 15 |  |

- Done in 87s · total cost $0.96 · decisions 17/17 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 9 autonomous · 8 escalated · 81 verified write actions (local mock environment) · $0.057 and 25 s per case · ~8.4 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
