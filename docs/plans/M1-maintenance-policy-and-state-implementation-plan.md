# M1: landlord-authority gates, follow-up and closure tools, maintenance policy, case-state hints

Status: implemented on marc/m1-gates, PR open (delta plan) · Shape: default plan · Owner: Marc · Written 2026-10-10 11:35 BST, rewritten 12:05 BST as a delta after Martin's commits `6f12bd6`, `5776204`, `d158159` landed most of the original scope on main · Branch for the remaining gaps: `marc/m1-gates`.

Parent: [docs/plans/dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md) (M1, AC3, AC4, AC18–AC20). Spec for the rules: [docs/plans/master-plan-review-2026-10-10.md](master-plan-review-2026-10-10.md) §2 (invariants I1, I4, I6, I9, I14) and §3 (tiers T0–T3). Conventions: `AGENTS.md`, `docs/plans/README.md`.

---

## Goal

Turn the safety rules that are prompt-only today into code that shows in the trace, give the agent verifiable tools for "wait" and "close", and put the maintenance policy in the prompt. All of it generic: nothing in this milestone knows about a specific case.

## User-visible outcome

On any organiser-format case, `REASONING.md` shows (a) every landlord-authority decision the agent relied on as a `record_landlord_decision` ledger entry whose quote exists in the case inputs, (b) every "wait" as a verified `schedule_follow_up` or `put_on_hold` entry, (c) every closure with a payment mode and proof that both tenant and landlord were told, and (d) a `policyLog` line whenever the agent tried to spend, assign, close or message outside those rules, with no tool blocked more than three times.

## Context / current state (main at 46a0dc6)

Already done by Martin's commits; the original steps they cover are closed:

| Original step | Status | Evidence |
|---|---|---|
| 1 `record_landlord_decision` tool | Done, minus the verbatim-quote check | `src/agent/opsTools.ts` tool at l.180–201 (decisions `approved / declined / own_contractor / tenant_self_fix / conditional / unclear`, `cap_gbp`), guard l.456–458 rejects thin approvals (emoji, "ok") via `tooThinForApproval` in `opsChecks.ts` |
| 2 Landlord-authority gate | Done (different shape from the draft) | `guard()` l.443–455: `assign_contractor` blocked on a declined / own-contractor / tenant-fix / unclear decision and while the seeded ticket says `landlord_approval: 'required'` (non-emergency); `approve_quote` needs an `approved`/`conditional` decision within `cap_gbp` or the CRM spend limit. `caseAgent.ts` `policyBlock()` l.129–139 also blocks approving a quote the agent asked about in this run. No `emergency_justification` argument; emergencies pass via `severity: 'emergency'` on the ticket |
| 3 `schedule_follow_up` | Tool done; validator gap | Tool l.320–332 (`due_on`, `party`, `purpose`, `recurring`), `put_on_hold` l.161–172 with `review_on`; both verified by read-back |
| 4 Block cap | Not done | `beforeToolCall` returns every block with no count |
| 5 Closure semantics | Done as a new tool, landlord check gap | `close_ticket` l.291–305 with `mode: final_checks / without_payment / by_supervisor`, `resolution`, `tenant_confirmation`, `landlord_informed`; guard l.472–487 checks work result, invoice, invoice flags and that `tenant_confirmation` is non-empty. `landlord_informed` is never checked |
| 6 Address check | Done, stricter than drafted | `guard()` l.464–471 with `foreignAddresses()` (unit-level addresses, not postcodes) blocks `send_message` / `request_information` naming another property; no override argument |
| 7 `Decision` extension | Done | `caseAgent.ts` l.19–72: required `case_state` (string) and typed `next_actions[]` with `ledger_id`; validator l.190–203. Gap: a `WAIT` with no `ledger_id` passes (l.193) |
| 8 `maintenance-policy.md` | Drafted, not wired | `src/agent/maintenance/maintenance-policy.md` (PR #8); `systemPrompt.ts` l.39–47 has Martin's "job workflow" section instead; tool names in the draft predate the real ones |
| 9 Case-state hints | Owned by a separate agent | `stateReconstruct.ts` as a pure module; wiring hints into the prompt is deferred to after it lands |

How the toolset sees the case: `src/run.ts` calls `createOpsToolset(seedFromCase(c))`, so anything the guards need from the case inputs travels on `OpsSeed` (built in `src/agent/opsSeed.ts`) without touching `run.ts` (Martin's PR #11 rewrites it).

## Requirements (remaining gaps)

1. **G1 Evidence quote must be real (AC18, I1).** `record_landlord_decision.evidence_quote` must appear in the case inputs the agent was given. Matching normalises case, whitespace, smart quotes and apostrophes, dashes and edge punctuation, and accepts a substring. Date and channel move out of the quote into optional `source` field. Not found ⇒ block, `policyLog`, reason tells the model to copy the words exactly or record `unclear`. No case text (unit tests, unfamiliar format) ⇒ check off.
2. **G2 Waiting leaves a trace (AC19, I9).** In the `submit_decision` validator, a `WAIT` next action must cite a verified `schedule_follow_up` or `put_on_hold`; outcome `no_action` needs a verified `schedule_follow_up`, `put_on_hold` or `add_note`. Enforced only when those tools exist in the toolset (practice and core toolsets must not deadlock).
3. **G3 No block loops (AC20, I14).** Count policy blocks per tool name plus `ticket_ref`. The third block of the same key tells the model to stop calling it and submit now, saying what it could not do and why. The end-of-run "you must now call submit_decision" nudge still works.
4. **G4 Closing tells both parties (I6).** `close_ticket.landlord_informed` (contract name fixed: an eval check depends on it) is one of: a verified ledger id of a `send_message` / `request_information` / `request_landlord_approval` to the landlord this run; `history: <short quote>`; `not_applicable: <reason>`. Empty or a ledger id that is not such a verified entry ⇒ blocked.
5. **G5 Maintenance policy in the prompt (R7).** Reconcile `maintenance-policy.md` with the real tools and with `policy.md` and `systemPrompt.ts`, keep it short, and append it after `policy.md`. AC15 grep clean.

## Non-goals

- An LLM pass for state reconstruction; the hints module and its prompt wiring (separate agent, then later).
- Postcode-level address check with an `address_check` override (the unit-address guard covers the observed cases; revisit if a dev case needs to ask the landlord which property they meant and the guard blocks it).
- `emergency_justification` arguments (the ticket severity path exists).
- Editing `src/run.ts`.
- Any case-specific rule.

## Constraints / invariants

- `Decision` changes stay additive; this delta adds none.
- `runCase` throws nothing new; every new check fails open when its inputs are missing.
- No text aimed at an evaluator in `maintenance-policy.md`, prompts or tool descriptions (AC15).
- Holdout cases are not opened.

## Proposed approach

- **G1**: `quoteAppears(quote, evidence)` in `opsChecks.ts` (pure). `OpsSeed.evidence?: string` filled by `seedFromCase` from the brief plus every input's content. `guard('record_landlord_decision')` calls it when `evidence` is non-empty. A quote under 6 normalised characters skips the substring check (the thin-approval rule already handles those for approvals; `unclear` with "👍" must be recordable).
- **G2**: extend the existing `next_actions` loop and the `hasTool` block in `caseAgent.ts`.
- **G3**: `policyBlocks: Map<string, number>` in `runCase`, keyed `tool|ticket_ref`. Third and later blocks get the stop-and-submit wording.
- **G4**: the close guard in `opsTools.ts` needs to see the ledger, which lives in `runCase`. Add an optional `ledger` argument to `Toolset.guard` (`caseAgent.ts` passes `ledger.entries`); without it, ledger-id citations are accepted unchecked (same fail-open rule). Same parsing for `tenant_confirmation` is out of scope (free text stays allowed).
- **G5**: edit the draft in place, then `systemPrompt.ts` reads it next to `policy.md`.

## Implementation plan

| # | Step | Est. | Prove by |
|---|---|---|---|
| 0 | This delta | 10 min | committed first |
| 1 | G1 `quoteAppears` + seed evidence + guard + description | 25 min | `opsTools.test.ts`: matcher normalisation cases; guard blocks an invented quote, passes a quote copied from a seeded history with different quotes/whitespace; no evidence ⇒ off; `seedFromCase` on a dev public case carries the history text |
| 2 | G2 WAIT / `no_action` trace | 15 min | `policyHooks.test.ts`: WAIT without ledger id ⇒ rejected; `no_action` with nothing ⇒ rejected naming the tools; with verified `schedule_follow_up` ⇒ accepted; core toolset ⇒ not enforced |
| 3 | G3 block cap | 10 min | `policyHooks.test.ts`: third `update_bank_details` returns the stop message and the following decision is accepted |
| 4 | G4 `landlord_informed` | 20 min | `opsTools.test.ts` / `policyHooks.test.ts`: empty ⇒ blocked; id of a tenant message ⇒ blocked; id of a verified landlord message ⇒ closes; `history:` and `not_applicable:` ⇒ accepted |
| 5 | G5 policy wiring | 20 min | `pnpm typecheck`; prompt contains the policy; AC15 grep empty |
| 6 | Regression | 15 min | `pnpm verify`; `pnpm loop --profile final --only <4–6 dev ids>` vs the fresh dev baselines |

## Acceptance criteria

- [x] **AC-M1-1 (AC18).** Given case inputs containing `Please approve this quote for works.`, when the agent records `approved` with evidence `"please approve this quote for works"` (different case and quotes), then it is verified; with an invented sentence, then it is blocked, `policyLog` has the reason, and the ledger is unchanged. With no case text, the check is off.
- [x] **AC-M1-2 (AC19).** `no_action` with no verified `schedule_follow_up`, `put_on_hold` or `add_note` ⇒ rejected naming those tools; a `WAIT` next action with no `ledger_id` ⇒ rejected; with a verified `schedule_follow_up` cited ⇒ accepted. A toolset without those tools is not affected.
- [x] **AC-M1-3 (AC20).** The third policy block of the same tool and ticket contains "stop" and "submit_decision"; the subsequent `submit_decision` is accepted.
- [x] **AC-M1-4 (I6).** `close_ticket` with `landlord_informed` empty, or citing a ledger id that is not a verified message to the landlord, ⇒ blocked naming `landlord_informed`; citing a verified `send_message` to `recipient_role: landlord`, or `history: …`, or `not_applicable: …` ⇒ closes and reads back `completed`.
- [x] **AC-M1-5 (R7).** The case system prompt contains the maintenance policy after `policy.md`; it names only tools that exist; `grep -riE "judge|grader|score this|give this" src/agent src/core | grep -v src/eval` shows nothing addressed to an evaluator.
- [x] **AC-M1-6.** `pnpm verify` exits 0; the dev-case behaviour check shows no critical regression against the fresh baseline rows.

## Verification

Run from the worktree root and show the output.

- [x] `pnpm verify`
- [x] `pnpm test -- src/agent/policyHooks.test.ts src/agent/opsTools.test.ts`
- [x] `grep -riE "judge|grader|score this|give this" src/agent src/core | grep -v src/eval`
- [x] `pnpm loop --profile final --only <ids>` on 4–6 dev cases; compare mean and critical counts with the same rows in `evals/baseline-final-dev.json`

## Decision log

| Question | Decision | Revisit |
|---|---|---|
| Strip date/channel from the quote, or make the matcher tolerant? | Both, lightly: the description now asks for the verbatim words only, with an optional `source` field for date and channel; the matcher normalises case, whitespace, quotes, dashes and edge punctuation, and also accepts a match after dropping a trailing parenthesised or ` - `-separated annotation. | If dev runs show legitimate blocks on call summaries. |
| Where does the guard get the case text without editing `run.ts`? | `OpsSeed.evidence`, built in `seedFromCase` (the only seam `run.ts` already calls). | — |
| How does the close guard see the ledger? | Optional `ledger` argument on `Toolset.guard`, passed by `caseAgent.ts`. Fail open without it. | — |
| Block cap key | `tool|ticket_ref`. A block on a different ticket is a different intent. | — |
| `history:` quotes in `landlord_informed` | Accepted on form only, not checked against the case text, to avoid a new close deadlock. | If dev runs show invented `history:` quotes, run them through `quoteAppears`. |
| Tenant timescales: `systemPrompt.ts` says give the severity target, the policy draft said never promise one | Severity target allowed, phrased as a target; never an invented appointment, cost or availability. Practice rubrics 05 and 18 reward a realistic timescale. | — |
| Who may voice a landlord decision in `record_landlord_decision`? | Any non-`unclear` decision is blocked when every event containing the quote is `From:` the tenant or a contractor/provider (hearsay). The landlord, the agency or its system, a bare company name, or no event structure are allowed, because organiser histories record landlord answers as agency notes and system events. The attachment bypass now needs the exact file name of a real attachment. | If a case shows a tenant forwarding the landlord's own written reply. |
| Dev run 11:02 BST: 037 and 002 dropped 20+ points with the first policy text | Two generic wording fixes: review dates by severity (next working day for urgent) with a tenant update while waiting; a missing attachment is chased only when the next action needs it. Re-run: both 100. | — |

## Progress

- 12:05 delta plan committed. 12:20 G1–G5 implemented with tests (`pnpm verify`: 174 tests green). Dev behaviour check on 6 dev cases with the final text: mean 91.2 vs 90.3 for the same rows in the 10:57Z baseline, 0 critical in both; no gate fired spuriously (empty `policyLog` on all six).
- 12:30 (M5 lane, branch `marc/m5-runner`): step 9 `run.ts` wiring done. `processCase` calls `hintsFor(c)` right after `loadCase` and appends `hints.text` to the prompt; `result.json` carries `hintsError`. Checked live: public 017 has `<case_state_hints>` in its `trace.jsonl` prompt, practice 01 and 02 have none; a `history.md` without event anchors gives `hintsError: "history.md has no event anchors"` and the case still runs.
- 13:00 (branch `marc/landlord-speaker`): plan-review gap closed. `record_landlord_decision` now blocks an approval quoted from a tenant or contractor event (hearsay → record `unclear`, `request_landlord_approval`), and the attachment bypass requires the exact name of a real attachment (`hearsaySpeaker`, `namesAttachment` in `opsChecks.ts`). New tests in `opsTools.test.ts`; `pnpm verify` green (409 tests after rebase on main). Full dev loop (final): mean 90.2 vs 91.0, 0 critical, esc P/R 1.00/1.00. The new block fired 0 times; in 006 the model already asked the landlord without trying to record the provider's claim. Down 20+: public 003 and 008 back to baseline (50, 100) at k 2; cut 040 is 76 at k 2 and passes 1 of 2 on unmodified main (passive ask about the faulty machine), so it is flaky there too. None of the three called `record_landlord_decision`.
