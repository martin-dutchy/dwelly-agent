# Run summary

Command: `pnpm cases --in cases/voice-calls --only V026-tenant-conflicting-appointment-m0r4t5,V001-landlord-own-gardener-5nz179,V025-contractor-oven-warranty-cpq7cs,V038-landlord-tenant-own-washer-6q5ek6 --out runs/voice-calls --at none`

- Running 4 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 0957aa3b with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| V001-landlord-own-gardener-5nz179 | action_taken | 4 | 0 | 0.101 | 19 |  |
| V025-contractor-oven-warranty-cpq7cs | action_taken | 5 | 1 | 0.122 | 26 |  |
| V026-tenant-conflicting-appointment-m0r4t5 | action_taken | 5 | 1 | 0.134 | 25 |  |
| V038-landlord-tenant-own-washer-6q5ek6 | action_taken | 4 | 0 | 0.107 | 23 |  |

- Done in 26s · total cost $0.47 · decisions 4/4 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 4 autonomous · 0 escalated · 16 verified write actions (local mock environment) · $0.116 and 23 s per case · ~1.7 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
