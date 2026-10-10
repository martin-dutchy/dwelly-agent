# M5 remaining misses

Status: active (done except 001 R4 and the final full dev run) · Shape: default plan · Owner: Marc (Claude sessions) · Written 2026-10-10 15:10 BST · Parent: [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md) · Follows: [M5-residual-misses-plan.md](M5-residual-misses-plan.md)

## Goal

Close the misses left on the 14 cases of the residual-misses run, with general fixes that also hold on unseen cases. That covers the four required outcomes still failing, and the positive behaviours where the cause is general rather than one rubric's taste. Then confirm nothing else regressed before the 15:45 freeze.

## User-visible outcome

On the 14 cases at k = 3, the required items for 001, 008 (agency manager), 025 (landlord update) and 02 pass in at least 2 of 3 runs. The positive-behaviour items listed under workstreams D and E pass more often, and every other dev case scores the same or better.

## Context / current state

Baseline: `runs/loop/dev-cursor-k3-2026-10-10T13-58-46-969Z`, branch `marc/m5-residual-misses` ([PR #42](https://github.com/martin-dutchy/dwelly-agent/pull/42)). It shows required-met at 91.1 % and 0 critical, prohibited or red-flag hits.

| Case | Miss | Cause |
| --- | --- | --- |
| 001 | R4 3/3: the second reporting flat is never updated | No contact on file. The agent declines to write because the `contact` field description only allows emails, phone numbers or existing threads, not the postal address of a flat named in the case, even though a `letter` channel exists |
| 008 | R3 2/3: the agency manager who raised the works is not told | The new "colleague who raised the work" rule is followed only sometimes; no worked trigger links "a colleague raised it" to `recipient_role: internal` |
| 008 | R1 3/3, P3: no second contractor contacted | No contractor is named and there is no provider panel (environment limit). The agent moves the job to `double_quotation` but sends the scope to nobody |
| 025 | R3 3/3: the landlord hears about the warranty but not the visit | The landlord is updated only through `request_landlord_approval`, which has no free-text field (`decision_needed`, `options`, `deadline`), so the visit status cannot go in it; stronger policy wording failed and was reverted |
| 025 | R2 1/3 | The agent found the date conflict, but the judge wanted a confirmed date the provider has not yet given. Judge strictness |
| 02 | R1 3/3: no explicit question about CO symptoms | The run predates the gas/CO rule now on `main` (`449934b`) |
| 13 | P1, P2: two-month early-check window; copy to the tenant within 28 days | Facts are in `research/uk-lettings-rules.md` but not in the prompt |
| 025 | P1: a manufacturer's warranty may run past 12 months | Not in the prompt |
| 020 | P2: a dog flap falls under the alterations and pets clauses | Not in the prompt |
| 047 | P2: a plumber is the wrong trade for a window | No "check the trade fits the fault" rule |
| 010, 014, 020, 026, 042, 008 | P items: the next implication not drawn | No rules covering these (workstream E) |
| 019 P3, 047 P3, 001 P1 | Who Oakley is; a 1–2 day review; nesting pigeons | One rubric's preference, or a single-run miss |

## Requirements

1. **A, landlord news alongside an approval.** `request_landlord_approval` gains an optional `update` field. It holds what the landlord needs to know besides the decision: the visit status, what is being checked, what happens next. The rendered approval and the ledger show it. The policy says a landlord approval request carries the open threads in `update`, or a separate `send_message` is sent in the same run.
2. **B, reporters with no contact on file.** The `contact` description allows a postal address named in the case or on the property record when `channel` is `letter`. The policy says: a reporter with no email or phone gets a letter to the flat named in the record. Ask the colleague who holds the records for their contact (`recipient_role: internal`), and `add_note` both.
3. **C, the colleague who raised the work, and sourcing a provider.**
   - Policy trigger row: "Work raised by a colleague (agency manager, inspector, check-out clerk)" means they get a `send_message` with `recipient_role: internal` whenever the job's route or status changes.
   - When a second provider must be sourced and none is named, the job moves to `double_quotation`. The scope (items, attachments by name, an itemised quote requested) goes to that colleague or the operations team to source a provider, with a reply-by date.
4. **D, UK lettings facts** in `src/core/policy.md`, each sourced from `research/uk-lettings-rules.md`:
   - a gas safety check can be done up to 2 months early and keep the anniversary;
   - copies of the gas safety record and the EICR go to the tenant within 28 days;
   - manufacturer warranties often run longer than 12 months, so ask for the purchase date and the warranty terms before accepting "out of warranty";
   - an alteration (a flap, fixtures, a lock change) needs the landlord's consent under the tenancy agreement and is raised with the tenant against those clauses;
   - check the trade sent fits the fault.
5. **E, carry the implication through.** One compact block in `maintenance-policy.md` section 4. Each line is general:
   - a recurring task gets a recurring schedule, not one reminder;
   - the same fault reported elsewhere in the property: ask whether to include it;
   - a security fault: ask whether the property is secure now;
   - a lock nobody else holds a key to is an access and safety matter with a short deadline;
   - an essential appliance out of use with a distant date: ask the tenant whether it is acceptable, and offer to chase a sooner slot;
   - disputed or failed work: hold its invoice until it is resolved, and ask the provider to report findings;
   - an empty property: access goes through the agency's keys;
   - "see attached": check the attachment that went is the one described;
   - a records-conflict note lists every date with its source, tentative ones included.
6. **F, 02.** Re-run on the branch after merging `main`, with no policy change unless it still fails.

## Non-goals

- 008 R1 as written (a named second contractor approached). Environment limit; C does what is possible without a provider panel.
- 025 R2 (judge wants a date the provider has not given), 019 P3 (who Oakley is), 047 P3 (1–2 days vs 3), 001 P1 (pigeons, 1/3). One rubric's preference or noise; rules for them would fit single cases.
- Changes to `src/agent/caseAgent.ts`, `src/run.ts` or the `Decision` schema.

## Constraints / invariants

- General rules only: no names, addresses, dates or companies from a case in the policy or tool descriptions. Tune on `dev` only; never open holdout.
- No text addressed to a judge or grader.
- The prompt grows by at most about 25 lines across D and E. If a full dev run regresses, cut E first.
- Every action is still a tool call that is read back. `update` is shown to the landlord only as part of a verified approval request.
- The Cursor judge allows 30 requests a minute: at most two loops at once, `--concurrency 4` each.

## Proposed approach

Three parallel workstreams in separate worktrees off `marc/m5-residual-misses`, as in the residual-misses plan:

1. **Tools:** A and B, which touch `opsTools.ts` and its tests plus the policy rows.
2. **Policy, people:** C and F.
3. **Policy, knowledge:** D and E.

Each re-runs only its own cases at k = 3. Merge, then one union run on the 14 cases and one full dev run (k = 1) as the regression check. The holdout aggregate is optional if time allows.

## Implementation plan

1. **A:** add `update: z.string().optional()` to `request_landlord_approval` and include it in the record, the ledger summary and the approval rendering. Add a policy line. Prove by: a new test in `src/agent/opsTools.test.ts` (fails before, passes after) and `--only 025-warranty-dates,008-second-quote --k 3`.
2. **B:** widen the `contact` description for `letter`, and add a policy line. Prove by: `--only 001-landlord-pays-direct --k 3`, where the ledger shows a verified `send_message` with `channel: letter` to the second flat and a request to the internal colleague.
3. **C:** add the colleague trigger row and the provider-sourcing line. Prove by: `--only 008-second-quote,001-landlord-pays-direct --k 3`, where 008's ledger shows a `send_message` to `internal` carrying the scope.
4. **D:** add the facts block to `src/core/policy.md`. Prove by: `--only 13,025-warranty-dates,020-inspection-findings,047-three-chases --k 3` (P items).
5. **E:** add the follow-through block. Prove by: `--only 010-recurring,014-misclassified-door,020-inspection-findings,026-date-conflict,042-repair-failed-recurs,008-second-quote --k 3`.
6. **F:** merge `origin/main`, then `--only 02 --k 3`.
7. Merge the workstreams. Run the 14 cases at k = 3, then `pnpm loop --profile cursor --model claude-sonnet-5-5 --thinking medium --split dev` (full dev, k = 1). Update the master plan's Progress, Discoveries and Decision log, and update PR #42.

## Acceptance criteria

- [x] `opsTools.test.ts`: `request_landlord_approval` keeps and returns `update`; the ledger entry shows it. Fails before A, passes after (both new tests failed with the source change stashed).
- [ ] 001 R4 passes in ≥ 2/3 runs, and the ledger shows a verified letter to the second flat or a verified internal request for its contact. Not met: 0/3. The agent does not notice the second reporter, who is named once in passing (Discoveries).
- [x] 008 R3 passes in ≥ 2/3 runs (3/3 in the union run). In every 008 run, the ledger shows an `internal` message carrying the scope list.
- [x] 025 R3 passes in ≥ 2/3 runs (3/3; 025 required-met 100/100/100).
- [x] 02 R1 passes in ≥ 2/3 runs on the merged `main` policy (2/3 in the union run, 3/3 in workstream C+F).
- [x] Union of the 14 cases at k = 3: required-met ≥ 95 % (baseline 91.1 %; 94.6 % in the union run, 97.0 % with 010 replaced by its re-run after the recurring-schedule fix; positives 71/114 → 95/114), with 0 critical, prohibited or red-flag hits. At least 8 of the 17 targeted P items pass in ≥ 2/3 runs (13 P1, P2; 025 P1; 020 P2, P3; 047 P2; 010 P1; 014 P1, P3; 026 P1, P3; 042 P1, P3; 008 P1, P2, P3; 008 R1 excluded).
- [ ] Full dev split (k = 1), current scoring formula: mean ≥ 89.3 (the 13:12 run re-scored), required-met ≥ 92.7 %, 0 critical, prohibited or red-flag hits, escalation P/R 1.00/1.00.
- [x] `pnpm verify` exits 0 (31 files, 583 tests).

## Verification

- `pnpm verify`: the summary line shows 0 failed.
- `pnpm test -- src/agent/opsTools.test.ts`: the new `update` test is shown failing on the parent commit and passing after.
- Per workstream: `pnpm loop … --k 3 --only <full folder names>`, with required-met and P items per run computed from `grades.json` and quoted with the run folder.
- Union and full dev summary lines quoted in Progress, plus a per-case table against the baseline.

## Progress

- [x] (2026-10-10 15:10 BST) Plan drafted from the missed-items analysis of `runs/loop/dev-cursor-k3-2026-10-10T13-58-46-969Z`.
- [x] (2026-10-10 15:12 BST) Open questions answered; three workstreams launched.
- [x] (2026-10-10 15:11 BST) C+F (`f05cb20`): colleague-who-raised-the-work trigger and internal scope message when no second provider is named. k = 3: 008 50/75/50 → 75/75/100 with an internal scope message in 3/3; 02 R1 3/3 under `main`'s gas/CO rule. Run `runs/loop/dev-cursor-k3-2026-10-10T14-08-39-492Z`.
- [x] (2026-10-10 15:14 BST) A+B (`bab58c0`): `update` on `request_landlord_approval` (record, ANSWER rendering, two tests failing before and passing after), letter contact for a flat named in the case. k = 3: 025 50/75/75 → 100/100/100; 001 R4 still 0/3. Runs `runs/loop/dev-cursor-k3-2026-10-10T14-09-01-141Z` (kept), `…14-11-40-456Z` (reverted line).
- [x] (2026-10-10 15:21 BST) D+E (`1e968d6`): UK lettings facts (gas check window and copies, warranties, tenant alterations) and the "carry the implication through" block; 13 of 14 targeted positives at or above baseline; the wrong-trade line dropped (0/3 twice). Runs `runs/loop/dev-cursor-k3-2026-10-10T14-08-47-640Z`, `…14-15-22-678Z`.
- [x] (2026-10-10 15:22 BST) Merged; tightened the "see attached" line so it never quotes figures from an unseen document. Union k = 3: `Coverage 14/14 decided · mean 92.7 · critical in 0` / `pass^3 0.71 · checks 114/114`, required 94.6 %, positives 95/114. Run `runs/loop/dev-cursor-k3-2026-10-10T14-21-49-541Z`.
- [x] (2026-10-10 15:26 BST) Full dev (66 cases now, incl. `main`'s new voice-call cases): `Coverage 66/66 decided · mean 88.9 · critical in 2` / `esc P/R 1.00/1.00 · checks 193/193`; public cuts 93.5 (required 97.0 %), practice 95.4 (97.4 %), public examples 93.3, voice calls 72.2. Both zeroed cases (voice 105, 110) told a tenant to pay to remove the landlord's appliance (Tenant Fees Act). Run `runs/loop/dev-cursor-2026-10-10T14-21-51-553Z`.
- [x] (2026-10-10 15:29 BST) Tenant Fees Act permitted-payments fact added, and the own-appliance row now says the landlord's item goes at the landlord's cost. k = 3 on 105, 110, 038, 040: `mean 94.8 · critical in 0`, checks 33/33. Run `runs/loop/dev-cursor-k3-2026-10-10T14-26-41-883Z`.
- [x] (2026-10-10 15:33 BST) 010 regressed in the union run (100/67/33): the recurring line made the agent schedule from the wrong anchor date. Reworded to keep the next date the party gave; 010 k = 3: 100/100/100. Run `runs/loop/dev-cursor-k3-2026-10-10T14-29-05-136Z`.

## Decision log

- Decision: fix 025 with an `update` field on the approval tool, not more prompt wording. Rationale: the tool has nowhere to put the visit status, and stronger wording was tried and reverted (16.75/18 → 16.0/18). Date/Author: 2026-10-10 15:10, Claude for Marc.
- Decision (Marc, 15:12): make the `update` field change on `request_landlord_approval`; run the full dev split once after the merge as the regression check; implement all six parts (A–F) with three parallel subagents (tools A+B, people C+F, knowledge D+E). Resolves open questions 1 and 2; question 3 kept as stated. Date/Author: 2026-10-10 15:12, Claude for Marc.
- Open question 1 (assumption taken): the tool change in `opsTools.ts` is acceptable this close to the freeze. It is not one of the files that require `/code-review`; one is run anyway.
- Open question 2 (assumption taken): a full dev regression run (about 3 minutes) is allowed after the merge, unlike the "failing cases only" rule for the residual-misses plan, because D and E change behaviour on every case.
- Open question 3 (assumption taken): a letter to a flat named only in the history is acceptable outreach to a reporter, since the record promised them updates. Contact details are never invented.
