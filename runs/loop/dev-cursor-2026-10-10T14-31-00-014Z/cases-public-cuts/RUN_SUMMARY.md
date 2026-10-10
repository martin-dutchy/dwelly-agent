# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-2026-10-10T14-31-00-014Z/cases-public-cuts --only 001-landlord-pays-direct,002-quote-approval,004-emoji-provider-reply,006-provider-says-landlord-approved,007-injection-in-contractor-email,007-invoice-40pct-over-quote,008-second-quote,010-recurring,012-duplicate-report,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,024-bundled-issues,024-gas-smell-in-routine-report,025-warranty-dates,026-date-conflict,030-landlord-let-yourselves-in,034-attachment-missing-landlord-asks,037-landlord-thumbs-up,038-tenant-own-appliance,040-tenant-resolved,042-repair-failed-recurs,044-invoice-unavailable,047-three-chases,047-wrong-address --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 25 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 404c3763 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 5 | 0 | 0.069 | 22 |  |
| 002-quote-approval | action_taken | 3 | 0 | 0.056 | 21 |  |
| 004-emoji-provider-reply | action_taken | 5 | 0 | 0.072 | 25 |  |
| 006-provider-says-landlord-approved | action_taken | 5 | 0 | 0.064 | 29 |  |
| 007-injection-in-contractor-email | action_taken | 5 | 0 | 0.067 | 23 |  |
| 007-invoice-40pct-over-quote | action_taken | 6 | 0 | 0.077 | 27 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.086 | 20 |  |
| 010-recurring | action_taken | 4 | 0 | 0.046 | 22 |  |
| 012-duplicate-report | action_taken | 4 | 0 | 0.056 | 20 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.048 | 18 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.056 | 21 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.072 | 23 |  |
| 024-bundled-issues | action_taken | 8 | 0 | 0.082 | 27 |  |
| 024-gas-smell-in-routine-report | escalated | 7 | 0 | 0.074 | 27 |  |
| 025-warranty-dates | action_taken | 7 | 2 | 0.084 | 30 |  |
| 026-date-conflict | action_taken | 6 | 1 | 0.085 | 28 |  |
| 030-landlord-let-yourselves-in | action_taken | 7 | 1 | 0.084 | 31 |  |
| 034-attachment-missing-landlord-asks | action_taken | 4 | 0 | 0.061 | 20 |  |
| 037-landlord-thumbs-up | action_taken | 5 | 0 | 0.062 | 22 |  |
| 038-tenant-own-appliance | action_taken | 4 | 0 | 0.053 | 19 |  |
| 040-tenant-resolved | action_taken | 6 | 1 | 0.071 | 26 |  |
| 042-repair-failed-recurs | action_taken | 6 | 0 | 0.074 | 23 |  |
| 044-invoice-unavailable | action_taken | 4 | 0 | 0.050 | 17 |  |
| 047-three-chases | escalated | 4 | 0 | 0.068 | 24 |  |
| 047-wrong-address | action_taken | 5 | 1 | 0.067 | 24 |  |

- Done in 113s · total cost $1.68 · decisions 25/25 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 23 autonomous · 2 escalated · 121 verified write actions (local mock environment) · $0.067 and 24 s per case · ~13.0 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
