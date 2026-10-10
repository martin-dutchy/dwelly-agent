# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-2026-10-10T12-43-45-642Z/cases-public-cuts --only 001-landlord-pays-direct,002-quote-approval,004-emoji-provider-reply,006-provider-says-landlord-approved,007-injection-in-contractor-email,007-invoice-40pct-over-quote,008-second-quote,010-recurring,012-duplicate-report,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,024-bundled-issues,024-gas-smell-in-routine-report,025-warranty-dates,026-date-conflict,030-landlord-let-yourselves-in,034-attachment-missing-landlord-asks,037-landlord-thumbs-up,038-tenant-own-appliance,040-tenant-resolved,042-repair-failed-recurs,044-invoice-unavailable,047-three-chases,047-wrong-address --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 25 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 4 | 0 | 0.063 | 20 |  |
| 002-quote-approval | action_taken | 5 | 0 | 0.056 | 22 |  |
| 004-emoji-provider-reply | action_taken | 4 | 1 | 0.062 | 18 |  |
| 006-provider-says-landlord-approved | action_taken | 4 | 0 | 0.054 | 22 |  |
| 007-injection-in-contractor-email | action_taken | 5 | 0 | 0.064 | 20 |  |
| 007-invoice-40pct-over-quote | action_taken | 6 | 0 | 0.071 | 23 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.053 | 21 |  |
| 010-recurring | action_taken | 4 | 0 | 0.046 | 19 |  |
| 012-duplicate-report | action_taken | 4 | 0 | 0.055 | 19 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.043 | 18 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.044 | 19 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.074 | 24 |  |
| 024-bundled-issues | action_taken | 7 | 0 | 0.074 | 26 |  |
| 024-gas-smell-in-routine-report | escalated | 3 | 0 | 0.059 | 23 |  |
| 025-warranty-dates | action_taken | 5 | 0 | 0.056 | 26 |  |
| 026-date-conflict | action_taken | 4 | 0 | 0.057 | 20 |  |
| 030-landlord-let-yourselves-in | action_taken | 6 | 1 | 0.078 | 31 |  |
| 034-attachment-missing-landlord-asks | action_taken | 6 | 0 | 0.055 | 19 |  |
| 037-landlord-thumbs-up | action_taken | 4 | 0 | 0.046 | 15 |  |
| 038-tenant-own-appliance | action_taken | 4 | 0 | 0.040 | 17 |  |
| 040-tenant-resolved | action_taken | 6 | 1 | 0.065 | 27 |  |
| 042-repair-failed-recurs | action_taken | 5 | 0 | 0.065 | 22 |  |
| 044-invoice-unavailable | action_taken | 4 | 0 | 0.057 | 20 |  |
| 047-three-chases | action_taken | 6 | 0 | 0.056 | 25 |  |
| 047-wrong-address | action_taken | 5 | 1 | 0.061 | 22 |  |

- Done in 97s · total cost $1.46 · decisions 25/25 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 24 autonomous · 1 escalated · 114 verified write actions (local mock environment) · $0.058 and 21 s per case · ~12.3 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
