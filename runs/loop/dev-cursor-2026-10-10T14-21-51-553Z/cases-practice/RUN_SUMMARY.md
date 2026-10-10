# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T14-21-51-553Z/cases-practice --only 01,02,03,05,06,07,08,10,11,12,13,15,16,17,18,20,21,23,24 --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 19 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 1ed596ae with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 01 | escalated | 5 | 0 | 0.062 | 23 |  |
| 02 | action_taken | 5 | 0 | 0.061 | 27 |  |
| 03 | escalated | 6 | 0 | 0.065 | 28 |  |
| 05 | action_taken | 6 | 0 | 0.065 | 25 |  |
| 06 | escalated | 7 | 0 | 0.101 | 36 |  |
| 07 | action_taken | 3 | 0 | 0.043 | 17 |  |
| 08 | escalated | 3 | 0 | 0.058 | 23 |  |
| 10 | escalated | 3 | 0 | 0.062 | 26 |  |
| 11 | action_taken | 3 | 0 | 0.038 | 18 |  |
| 12 | escalated | 5 | 0 | 0.059 | 26 |  |
| 13 | action_taken | 7 | 0 | 0.068 | 27 |  |
| 15 | action_taken | 3 | 0 | 0.042 | 19 |  |
| 16 | escalated | 7 | 0 | 0.073 | 27 |  |
| 17 | escalated | 5 | 0 | 0.059 | 26 |  |
| 18 | action_taken | 4 | 0 | 0.046 | 22 |  |
| 20 | escalated | 6 | 0 | 0.067 | 28 |  |
| 21 | action_taken | 3 | 0 | 0.054 | 21 |  |
| 23 | action_taken | 8 | 0 | 0.094 | 35 |  |
| 24 | action_taken | 6 | 0 | 0.082 | 28 |  |

- Done in 134s · total cost $1.20 · decisions 19/19 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 10 autonomous · 9 escalated · 95 verified write actions (local mock environment) · $0.063 and 25 s per case · ~9.8 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
