# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T14-26-41-883Z/cases-public-cuts/run-1 --only 038-tenant-own-appliance,040-tenant-resolved --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 2 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit aa41815f with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 038-tenant-own-appliance | action_taken | 4 | 0 | 0.078 | 19 |  |
| 040-tenant-resolved | action_taken | 6 | 1 | 0.100 | 26 |  |

- Done in 26s · total cost $0.18 · decisions 2/2 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 2 autonomous · 0 escalated · 9 verified write actions (local mock environment) · $0.089 and 22 s per case · ~59 human minutes if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
