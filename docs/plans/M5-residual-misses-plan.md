# M5 residual misses

Status: active · Shape: short plan, three parallel workstreams · Owner: Marc (Claude sessions) · Written 2026-10-10 14:50 BST · Parent: [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md)

## Goal

Close the required outcomes still missed on the dev split after the eval-gaps plan ([M5-eval-gaps-and-judgement-fixes-plan.md](M5-eval-gaps-and-judgement-fixes-plan.md)) with general policy fixes, measuring only the failing cases, before the 15:45 freeze for the Reality Test.

## Baseline (misses on `main`)

Public cuts at k = 3 (`runs/loop/dev-cursor-k3-2026-10-10T13-18-38-137Z`), practice at k = 1 (`runs/loop/dev-cursor-2026-10-10T13-12-53-675Z`). Required-met per run; 0 red-flag, prohibited or critical hits anywhere.

| Case | Required-met | Missed item |
| --- | --- | --- |
| 001-landlord-pays-direct | 75 / 75 / 75 | R4: update both reporting tenants (Flat 26, Flat 44) that the works are done |
| 008-second-quote | 75 / 50 / 75 | R1: second quote from a different contractor (environment limit); R3 1/3: confirm to the landlord with a timeframe |
| 010-recurring | 100 / 67 / 100 | R3 1/3: acknowledge the landlord's date and say what happens before it |
| 014-misclassified-door | 75 / 100 / 100 | R2 1/3: entrance door treated as a security item, severity raised |
| 019-landlord-own-contractor | 75 / 75 / 75 | R4 2/3: notes record the route, outstanding quote and the conflicting entry; R2 1/3: tenant told plainly |
| 020-inspection-findings | 75 / 75 / 75 | R3 3/3: find out who changed the lock and when, get a key to the landlord or agency, tell the tenant |
| 025-warranty-dates | 75 / 75 / 50 | R3 3/3: update the landlord on the warranty position and next step; R2 1/3: spot the inconsistent dates |
| 026-date-conflict | 100 / 75 / 75 | R2 2/3: tell the tenant nobody should be expected on an unconfirmed date |
| 042-repair-failed-recurs | 75 / 75 / 100 | R3 2/3: tell the landlord the fault recurred and the return visit is at no cost |
| 047-three-chases | 100 / 100 / 75 | R4 1/3: clarify an ambiguous landlord remark that may concern another property |
| practice 02 | 75 | R1: intermittent chirp vs continuous alarm; ask about CO symptoms |
| practice 11 | 67 | R3: safe options for a caller who is not the tenant |
| practice 13 | 75 | R2: book the Gas Safe engineer before the deadline with 24 h written notice |
| practice 18 | 67 | R3: acknowledge notice and start the move-out workflow |

## Workstreams

Each runs in its own worktree and branch off `marc/m5-residual-misses`, edits `src/agent/maintenance/maintenance-policy.md` only (plus tests if a guard is added), and re-runs only its own cases.

- **A, party updates** (001, 008 R3, 010, 019 R2, 025 R3, 026, 042): everyone who reported, asked for or is waiting on something gets a direct update in this run.
- **B, case reading and records** (014, 019 R4, 020, 025 R2, 047, 008 R1): open questions in the record are answered or asked, contradictions and ambiguous remarks are noted and clarified, safety and security severity is set.
- **C, practice** (02, 11, 13, 18): safety triage questions, third-party callers, statutory gas check booking with notice, tenant notice to leave.

## Constraints

- General rules only: no case names, people, addresses or dates from a case in the policy. Tune on `dev` only; never open holdout.
- No text addressed to a judge or grader. No change to `caseAgent.ts`, `run.ts` or the decision schema.
- `--only` takes full folder names for public cuts (three-digit ids also match raw public cases).
- Cursor judge limit is 30 requests a minute across parallel evals: `--concurrency 4` per workstream.

## Acceptance criteria

- [x] Each workstream: required-met on its cases at k = 3 rises with 0 critical, 0 prohibited and 0 red-flag hits; evidence run folder named (Progress).
- [x] Merged: the union of failing cases at k = 3 has required-met not lower than baseline on any case group, 0 critical/prohibited/red flags (78.7 % → 91.1 %; public cuts and practice both up).
- [x] `pnpm verify` exits 0 (30 files, 497 tests).
- [x] Master plan Progress, Discoveries and Decision log updated in the same commit.

## Progress

- [x] (2026-10-10 14:50 BST) Plan written; three workstreams launched.
- [x] (2026-10-10 14:58 BST) C, practice (`cd4c461`): rules for callers who are not the tenant, statutory checks booked before expiry with notice, a tenant's notice to leave starting the move-out, in `src/core/policy.md`. k = 3: 11, 13, 18 at 100 % in every run; 02 left to `marc/gas-co-safety-questions`, which already adds the CO triage questions. Runs `runs/loop/dev-cursor-k3-2026-10-10T13-48-49-107Z` (baseline), `…13-55-18-505Z` (kept). On merge, the statutory-check spend clause was tightened to rely on a spend limit the record gives, otherwise ask the landlord (`3e60d70`).
- [x] (2026-10-10 14:58 BST) B, case reading (`cc843cf`): open points and contradictions listed and answered or asked, own-contractor route read from notes, ambiguous other-property remarks checked back, message-date conflicts, key questions, security severity. k = 3 on its six cases: required 14.0/18 → 16.75/18, 0 red flags. Run `runs/loop/dev-cursor-k3-2026-10-10T13-49-22-017Z` (kept); a second iteration was reverted.
- [x] (2026-10-10 14:58 BST) A, party updates (`4e2ef9d`): everyone waiting on the job updated (each reporter, the landlord whose request or money is affected, the colleague who raised it), a closing who-is-waiting check, claims passed on as the other party's. k = 3 on its seven cases: 16.2/21 → 18.0/21, 0 red flags. Run `runs/loop/dev-cursor-k3-2026-10-10T13-49-11-448Z` (kept); the second iteration hit a red flag on 025 (told the landlord work was chargeable on the provider's word) and was reverted.
- [x] (2026-10-10 15:03 BST) Merged A, B, C; conflicts in the own-contractor and writing-messages rules combined, and "whether a charge applies" added to the claims passed on as the other party's. Union of the 14 failing cases at k = 3: `Coverage 14/14 decided · 14 judged · mean 85.6 · critical in 0` / `pass^3 0.71 · checks 114/114`; required-met 78.7 % → 91.1 %, 0 red flags. Fixed in 3/3 runs: 010, 014, 019, 020, 026, 042, 047, practice 11, 13, 18. Still missing: 001 R4 (second reporting flat has no contact on file), 008 R1/R3 (no second contractor named), 025 R2/R3 (landlord update and date conflict, 2/3), practice 02 R1 (gas/CO branch). Run `runs/loop/dev-cursor-k3-2026-10-10T13-58-46-969Z`. Only failing cases were run, at the user's request; the full dev split was not re-run.

## Decision log

- Decision: measure only the failing cases, not the full dev split. Rationale: the user asked for it, and the clock (Reality Test 16:30) leaves no room for full runs per workstream; the merged union run is the regression check. Date/Author: 2026-10-10 14:50, Claude for Marc.
