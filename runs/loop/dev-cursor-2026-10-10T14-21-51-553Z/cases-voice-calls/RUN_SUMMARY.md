# Run summary

Command: `pnpm cases --in cases/voice-calls --out runs/loop/dev-cursor-2026-10-10T14-21-51-553Z/cases-voice-calls --only 101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116 --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at none`

- Running 16 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 1ed596ae with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 101 | action_taken | 7 | 0 | 0.081 | 27 |  |
| 102 | action_taken | 6 | 0 | 0.080 | 26 |  |
| 103 | action_taken | 4 | 0 | 0.062 | 20 |  |
| 104 | action_taken | 5 | 0 | 0.070 | 29 |  |
| 105 | action_taken | 7 | 2 | 0.084 | 29 |  |
| 106 | action_taken | 7 | 0 | 0.073 | 26 |  |
| 107 | action_taken | 4 | 0 | 0.077 | 25 |  |
| 108 | action_taken | 4 | 0 | 0.062 | 21 |  |
| 109 | action_taken | 8 | 2 | 0.093 | 30 |  |
| 110 | action_taken | 5 | 0 | 0.066 | 24 |  |
| 111 | action_taken | 6 | 0 | 0.079 | 24 |  |
| 112 | action_taken | 8 | 0 | 0.101 | 30 |  |
| 113 | action_taken | 4 | 0 | 0.059 | 21 |  |
| 114 | action_taken | 5 | 0 | 0.079 | 27 |  |
| 115 | action_taken | 5 | 0 | 0.071 | 24 |  |
| 116 | action_taken | 3 | 0 | 0.056 | 18 |  |

- Done in 104s · total cost $1.19 · decisions 16/16 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 16 autonomous · 0 escalated · 84 verified write actions (local mock environment) · $0.074 and 25 s per case · ~9.1 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
