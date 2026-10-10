# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T14-31-00-014Z/cases-practice --only 01,02,03,05,06,07,08,10,11,12,13,15,16,17,18,20,21,23,24 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 19 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 404c3763 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 01 | escalated | 5 | 0 | 0.059 | 24 |  |
| 02 | action_taken | 5 | 0 | 0.065 | 28 |  |
| 03 | escalated | 7 | 0 | 0.089 | 38 |  |
| 05 | action_taken | 5 | 0 | 0.060 | 25 |  |
| 06 | escalated | 8 | 0 | 0.107 | 37 |  |
| 07 | action_taken | 3 | 0 | 0.046 | 17 |  |
| 08 | escalated | 4 | 0 | 0.066 | 27 |  |
| 10 | escalated | 5 | 1 | 0.089 | 34 |  |
| 11 | action_taken | 4 | 0 | 0.047 | 21 |  |
| 12 | escalated | 5 | 0 | 0.059 | 24 |  |
| 13 | action_taken | 7 | 0 | 0.072 | 26 |  |
| 15 | action_taken | 3 | 0 | 0.043 | 21 |  |
| 16 | escalated | 7 | 0 | 0.072 | 29 |  |
| 17 | escalated | 5 | 0 | 0.059 | 25 |  |
| 18 | action_taken | 4 | 0 | 0.047 | 21 |  |
| 20 | escalated | 6 | 0 | 0.068 | 29 |  |
| 21 | action_taken | 2 | 0 | 0.046 | 17 |  |
| 23 | escalated | 9 | 0 | 0.116 | 44 |  |
| 24 | action_taken | 6 | 0 | 0.075 | 27 |  |

- Done in 107s · total cost $1.28 · decisions 19/19 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 9 autonomous · 10 escalated · 99 verified write actions (local mock environment) · $0.068 and 27 s per case · ~10.2 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
