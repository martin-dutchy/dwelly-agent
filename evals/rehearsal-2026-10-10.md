# Rehearsal 2026-10-10 (AC13)

Aggregates only: 11 of the 25 cases are the frozen holdout split.

- Code: `main` at `bb56a9a` (uncommitted changes were plan documents and `.gitignore` only).
- Cases: 25 (`make-rehearsal-set.sh`: holdout split plus 14 public cases never used for tuning), `--at auto`.
- Command: `pnpm cases --in runs/rehearsal-cases --out runs/rehearsal --at auto --concurrency 8 --deadline 13:39 --critic off`, started 13:24:46 BST.
- Agent: `claude-sonnet-5-5`, thinking medium, Jev off, case timeout 300 s.

```
Done in 75s · total cost $1.26 · decisions 25/25 · resumed 0 · budget-skipped 0
Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8 or raise to 10
Value (estimate): 23 autonomous · 2 escalated · 93 verified write actions (local mock environment) · $0.050 and 20 s per case · ~10.0 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
```

- Slowest case: 29.9 s (`jq -s 'map(.usage.durationMs // 0) | max' runs/rehearsal/*/result.json`).
- Retry events in traces: 0 (`grep -c '"type":"retry"' runs/rehearsal/*/trace.jsonl`).
- Resume drill: `Done in 0s · total cost $0.00 · decisions 25/25 · resumed 25 · budget-skipped 0`.
- Judge (`pnpm eval --summary-only --model cursor:composer-2.5`): `Mean score 94.2 · critical/prohibited hits in 0/25 cases (checks: 0)`. The Cursor judge is a different model from the Opus judge behind the committed baselines, so this mean is not directly comparable to them.
