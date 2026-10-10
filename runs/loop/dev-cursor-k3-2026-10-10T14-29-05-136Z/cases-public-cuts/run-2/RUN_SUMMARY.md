# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T14-29-05-136Z/cases-public-cuts/run-2 --only 010-recurring --concurrency 3 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 1 cases with claude-sonnet-5-5, thinking medium (concurrency 3, Jev off) at commit 404c3763 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 010-recurring | action_taken | 4 | 0 | 0.044 | 21 |  |

- Done in 21s · total cost $0.04 · decisions 1/1 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 3 · next run: keep --concurrency 3
- Value (estimate): 1 autonomous · 0 escalated · 4 verified write actions (local mock environment) · $0.044 and 21 s per case · ~26 human minutes if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
