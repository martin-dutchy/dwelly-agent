# Run summary

Command: `pnpm cases --in cases/voice-calls --out runs/loop/dev-cursor-2026-10-10T14-31-00-014Z/cases-voice-calls --only 101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at none`

- Running 16 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 404c3763 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 101 | action_taken | 7 | 0 | 0.073 | 25 |  |
| 102 | action_taken | 5 | 0 | 0.082 | 28 |  |
| 103 | action_taken | 3 | 0 | 0.060 | 20 |  |
| 104 | action_taken | 5 | 0 | 0.074 | 31 |  |
| 105 | action_taken | 7 | 2 | 0.082 | 29 |  |
| 106 | action_taken | 4 | 0 | 0.061 | 20 |  |
| 107 | action_taken | 7 | 2 | 0.102 | 29 |  |
| 108 | action_taken | 5 | 0 | 0.069 | 23 |  |
| 109 | action_taken | 7 | 1 | 0.088 | 30 |  |
| 110 | action_taken | 5 | 0 | 0.070 | 27 |  |
| 111 | escalated | 9 | 0 | 0.091 | 31 |  |
| 112 | action_taken | 7 | 0 | 0.096 | 32 |  |
| 113 | action_taken | 4 | 0 | 0.061 | 21 |  |
| 114 | action_taken | 5 | 0 | 0.074 | 24 |  |
| 115 | action_taken | 5 | 0 | 0.076 | 27 |  |
| 116 | action_taken | 4 | 0 | 0.059 | 20 |  |

- Done in 82s · total cost $1.22 · decisions 16/16 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 15 autonomous · 1 escalated · 84 verified write actions (local mock environment) · $0.076 and 26 s per case · ~9.1 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
