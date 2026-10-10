# Run summary

Command: `pnpm cases --in "HackatonChallenges/Property Management" --out ANSWERS --at 100% --concurrency 8 --deadline 16:52 --critic off`

- Running 30 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off, deadline 16:52, case timeout 300s) at commit 68387876 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001 | action_taken | 4 | 0 | 0.072 | 26 |  |
| 002 | escalated | 6 | 0 | 0.101 | 38 |  |
| 003 | action_taken | 6 | 0 | 0.104 | 36 |  |
| 004 | action_taken | 7 | 0 | 0.082 | 27 |  |
| 005 | escalated | 7 | 0 | 0.083 | 26 |  |
| 006 | action_taken | 4 | 0 | 0.057 | 20 |  |
| 007 | action_taken | 5 | 0 | 0.080 | 30 |  |
| 008 | escalated | 9 | 0 | 0.113 | 39 |  |
| 009 | action_taken | 4 | 0 | 0.061 | 23 |  |
| 010 | action_taken | 5 | 0 | 0.079 | 32 |  |
| 011 | action_taken | 7 | 0 | 0.103 | 34 |  |
| 012 | action_taken | 6 | 0 | 0.083 | 29 |  |
| 013 | action_taken | 5 | 0 | 0.079 | 27 |  |
| 014 | action_taken | 8 | 0 | 0.103 | 34 |  |
| 015 | action_taken | 7 | 0 | 0.097 | 31 |  |
| 016 | action_taken | 6 | 0 | 0.074 | 27 |  |
| 017 | action_taken | 5 | 0 | 0.080 | 33 |  |
| 018 | action_taken | 4 | 0 | 0.064 | 20 |  |
| 019 | action_taken | 4 | 0 | 0.065 | 23 |  |
| 020 | escalated | 9 | 2 | 0.093 | 32 |  |
| 021 | action_taken | 5 | 0 | 0.073 | 29 |  |
| 022 | action_taken | 4 | 0 | 0.070 | 21 |  |
| 023 | escalated | 4 | 0 | 0.086 | 31 |  |
| 024 | action_taken | 4 | 0 | 0.074 | 26 |  |
| 025 | action_taken | 5 | 0 | 0.071 | 28 |  |
| 026 | escalated | 7 | 1 | 0.093 | 38 |  |
| 027 | action_taken | 5 | 0 | 0.072 | 23 |  |
| 028 | action_taken | 3 | 0 | 0.058 | 19 |  |
| 029 | action_taken | 4 | 0 | 0.075 | 27 |  |
| 030 | action_taken | 4 | 0 | 0.060 | 23 |  |

- Done in 117s · total cost $2.40 · decisions 30/30 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8 or raise to 10
- Value (estimate): 24 autonomous · 6 escalated · 160 verified write actions (local mock environment) · $0.080 and 28 s per case · ~17.0 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
