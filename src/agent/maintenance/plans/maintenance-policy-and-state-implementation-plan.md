# M1: landlord-authority gates, follow-up and closure tools, maintenance policy, case-state hints

Status: ready to implement · Shape: default plan · Owner: Martin (code), Marc may draft `maintenance-policy.md` in parallel · Written 2026-10-10 11:35 BST by Claude for Marc · Window: now to the 13:00 schema freeze.

Parent: [docs/plans/dwelly-case-worker-master-plan.md](../../../../docs/plans/dwelly-case-worker-master-plan.md) (M1, AC3, AC4, AC18–AC20). Spec for the rules: [docs/plans/master-plan-review-2026-10-10.md](../../../../docs/plans/master-plan-review-2026-10-10.md) §2 (invariants I1, I4, I6, I9, I14) and §3 (tiers T0–T3, act / ask / wait / escalate). Conventions: `AGENTS.md`, `docs/plans/README.md`.

---

## Goal

Turn the safety rules that are prompt-only today into code the judge can see in the trace, give the agent verifiable tools for "wait" and "close", and hand it deterministic hints about where the case stands. All of it generic: nothing in this milestone knows about a specific case.

## User-visible outcome

On any organiser-format case, `REASONING.md` shows (a) every landlord-authority decision the agent relied on as a `record_landlord_decision` ledger entry with the exact quote from the history, (b) every "wait" as a `schedule_follow_up` entry with a review date, (c) every closure with a payment mode and proof that both parties were told, and (d) a `policyLog` line whenever the agent tried to spend, assign, close or message outside those rules. A `<case_state_hints>` block in the prompt lists stage, dates, holds, chases, attachments and address mismatches, labelled as derived.

## Context / current state (main at e7c08da)

- `src/agent/caseAgent.ts`: pi loop; `policyBlock()` blocks `update_bank_details` always and `approve_quote` only when `request_landlord_approval` for the same `ticket_ref` was verified *in this run*; `submit_decision` validator checks claimed ledger ids, unresolved entries, `escalated` ⇒ `escalate_to_human`, `needs_info` ⇒ `request_information`. `no_action` has no requirement. A policy-blocked tool can be called again indefinitely until the 300 s timeout.
- `src/agent/opsTools.ts`: 14 tools, per-case in-memory state, `verify()` reads back tickets or the records log. `update_ticket` takes `stage` and `note` only. No follow-up, hold, landlord-decision or closure semantics.
- `src/agent/systemPrompt.ts` + `src/core/policy.md`: generic lettings policy; "Never wait. Nobody will reply during this run" with no distinction between *do not block* and *the right business action is to hold with a review date*.
- `src/agent/publicCases.ts` (after M0b): `parseHistory()` gives `{ n, header, body }` per event; `loadPublicCase()` returns `brief`, `inputs`, `cutoff`, `totalEvents`. Event bodies carry `- **Channel:**`, `- **From:**`, `- **To:**` lines; `field()` and `routineKind()` already parse them.
- `src/run.ts`: builds `prompt = casePrompt(c) + screenNote(screen)` and calls `runCase`. Nothing passes the raw inputs text to the hooks.
- Tests: `policyHooks.test.ts` shows the faux-provider pattern for hook tests (`fauxProvider`, `fauxAssistantMessage`, `fauxToolCall`).

## Requirements

1. **R1 Evidence-based landlord authority (I1, AC18).** `approve_quote` and `assign_contractor` run only with a verified `record_landlord_decision` for the ticket whose `evidence_quote` appears verbatim in the case inputs, or an explicit `emergency_justification`, or an amount within a limit whose text also appears in the inputs. A `record_landlord_decision` whose quote is not in the inputs is rejected and logged.
2. **R2 Waiting is verifiable (I9, AC19).** `schedule_follow_up` exists; outcome `no_action` and any `WAIT` next action require a verified `schedule_follow_up` (or `add_note` for `no_action`).
3. **R3 Closure needs proof and informed parties (I6).** `update_ticket` to `completed` requires a `payment` mode and, for landlord and tenant each, a verified `send_message` to that role this run or a history quote showing they already know, or an explicit not-applicable reason.
4. **R4 No block loops (I14, AC20).** The third policy block of the same tool returns "stop and submit"; the decision validator then accepts the case with the blocked intent listed in `assumptions` or `failed_actions`.
5. **R5 Outgoing text names this property (I4).** A message body with a UK postcode different from the case property's is held once with the reason; the agent may resend with `address_check: "intentional: <why>"` (asking the landlord which property they meant is legitimate), and the override is logged.
6. **R6 Decision vocabulary (AC4).** `Decision` gains optional `case_state` and `next_actions[]` (typed, with `ledger_id`); the validator requires a verified ledger id for every type except `WAIT` (needs `schedule_follow_up`), `ESCALATE_TO_HUMAN` (needs `escalate_to_human`) and `NO_ACTION`.
7. **R7 Maintenance policy in the prompt.** `maintenance-policy.md` appended to the system prompt: state machine, vocabulary, tiers, hard rules, inbound-message triage, the wait-versus-block distinction.
8. **R8 Case-state hints (AC3).** Deterministic, try/catch-wrapped, organiser-format only, rendered as derived hints: stage, parties and last contact, open approvals, dates with sources and conflicts, amounts, holds and reminder counts per party, attachments referenced vs present, address mismatches, candidate unrelated issues.

## Non-goals

- An LLM pass for state reconstruction. Hints are regex and counting only.
- Replacing `approve_quote`, `assign_contractor` or `update_ticket`; they gain arguments and gates, nothing is renamed (the 22 practice cases and `report.ts` keep working).
- The critic (M3), `checks.json` (M4), the organiser-API adapter (M5).
- `get_property`, `record_quote`, `record_invoice`, `share_tenant_contact`, `log_call` from `research/agent-tools.md`. Tool surface stays under 20: 14 today + 2 new = 16.
- Any case-specific rule. If a rule only makes sense for one public case, it does not go in.

## Constraints / invariants

- `Decision` changes are additive and optional; schema freeze at 13:00, additive after.
- `src/run.ts` never aborts the batch; hints and gates must throw nothing out of `runCase`.
- Every new write tool has a read-back in `verify()`.
- No text aimed at an evaluator in `maintenance-policy.md` or any message template (AC15).
- Holdout cases (practice 04, 09, 14, 19, 22; public 031, 036, 041, 045, 048, 050) are not opened for the tests. AC3 uses 002, 025, 047.
- File ownership per the master plan §5: all files below are Martin's. Marc may draft `maintenance-policy.md` text and hand it over; Martin wires it.

## Proposed approach

New module `src/agent/maintenance/`:

```
src/agent/maintenance/
  gates.ts                # policyBlock replacement: landlord authority, closure, block cap, address check, evidence lookup
  gates.test.ts
  stateReconstruct.ts     # CaseState from parsed events (+ index.md property line); renderHints()
  stateReconstruct.test.ts
  maintenance-policy.md   # appended to the system prompt
  index.ts                # exports
  plans/                  # this plan
```

Touched: `opsTools.ts` (two tools, `update_ticket` arguments, verifiers), `caseAgent.ts` (use `gates.ts`, pass block counts, `no_action` / `next_actions` validators, `Decision` extension, new `evidenceText` option), `systemPrompt.ts` (append policy), `run.ts` (compute hints, pass `evidenceText`), `publicCases.ts` (export the parsed events and property line on the loaded case; additive fields).

### Evidence check (the primitive everything else uses)

`quoteAppears(quote, evidenceText)`: normalise both (lower-case, collapse whitespace, strip curly quotes and trailing punctuation), require `quote.length >= 15`, return `evidenceText.includes(quote)`. `evidenceText` is the concatenation of every input's content plus the brief, passed from `run.ts` as `CaseRunOptions.evidenceText` (fallback: `opts.prompt`). This is the anti-fabrication primitive: the agent cannot invent an approval, a limit, or "the tenant already knows" without pointing at text that exists.

### Step 1 · `record_landlord_decision` (R1, 20 min)

```ts
record_landlord_decision: {
  ticket_ref: string,
  decision: 'approved_our_contractor' | 'approved_own_contractor' | 'approved_quote' | 'declined'
          | 'tenant_self_fix' | 'conditional' | 'unclear',
  evidence_quote: string,          // verbatim from an email, SMS, call summary or note in the inputs
  source: string,                  // e.g. "history.md event 010" or "inputs/email_landlord.eml"
  amount_cap_gbp?: number,         // when the approval names a figure
  conditions?: string,             // for 'conditional'
}
```

Gate in `beforeToolCall`: block unless `quoteAppears(evidence_quote)`. Reason text: "the quote is not in the case inputs; copy the landlord's words exactly or record the decision as `unclear`". Verify: records log (same as `add_note`). `unclear` and `conditional` never authorise anything; the prompt says what to do with them (ask the landlord, one question).

### Step 2 · Landlord-authority gate (R1, 20 min)

`approve_quote` gains optional `emergency_justification?: string` and `limit_evidence_quote?: string`. `assign_contractor` gains optional `emergency_justification?: string` and `decision_ref?: string` (ledger id of the `record_landlord_decision`).

Allowed when any of:
- a verified `record_landlord_decision` for the same `ticket_ref` with decision `approved_our_contractor` (assign) or `approved_quote` with `amount_gbp <= amount_cap_gbp` when a cap was recorded (approve);
- `emergency_justification` of 20+ characters (logged to `policyLog` as an override so the critic and the judge see it);
- `limit_evidence_quote` that `quoteAppears()` and contains a £ figure `>= amount_gbp` (approve only).

Blocked otherwise, with the reason naming the missing piece ("no landlord decision recorded for J-1: call record_landlord_decision with the landlord's exact words, or request_landlord_approval and schedule_follow_up"). The existing in-run rule (asked this run, not answered) stays and wins.

`approved_own_contractor` blocks `assign_contractor` with "the landlord is using their own contractor: do not assign ours; record, inform the tenant, schedule a follow-up".

### Step 3 · `schedule_follow_up` and the `no_action` validator (R2, 15 min)

```ts
schedule_follow_up: { ticket_ref?: string, party: 'landlord'|'tenant'|'contractor'|'internal',
                      reason: string, review_on: string /* YYYY-MM-DD */, action_on_review: string }
```

Gate: `review_on` parses as a date and is not before the case's "today" (from the brief; skip the check when unknown). Verify: records log. Validator in `submit_decision`: `outcome === 'no_action'` ⇒ a verified `schedule_follow_up` or `add_note`, else reject with "doing nothing is fine, but leave a verified trace: schedule_follow_up with a review date, or add_note with why no action is needed".

### Step 4 · Block cap (R4, 10 min)

`blockCounts: Map<tool, number>` in `runCase`. On the third policy block of the same tool the reason becomes: "stop: `<tool>` is not available in this case under policy. Do not call it again. Submit your decision and list this in assumptions (why the action was not taken) or failed_actions." The `submit_decision` validator does not require anything further for capped tools. Jev's two-block cap is unchanged.

### Step 5 · Closure semantics (R3, 20 min)

`update_ticket` gains `payment?: 'with_payment' | 'without_payment'`, `resolution?: string`, `landlord_informed?: string`, `tenant_informed?: string`. Each `*_informed` is one of: a ledger id of a verified `send_message` with the matching `recipient_role`; `history: <quote>` that `quoteAppears()`; `not_applicable: <reason>` (agency-raised job with no tenant, void property). Gate when `stage === 'completed'`: all four present and valid, else block with the missing one. `payment` and `resolution` land on the ticket so `verify()` reads them back.

### Step 6 · Address check (R5, 15 min)

`casePostcodes`: UK postcode regex over the case property line (`- **Property:**` in the brief, or `property`/`address` fields in practice `crm.json`); if none found, the check is off. On `send_message` / `request_information`: postcodes in `body` that are not the case's ⇒ hold once with "the message names postcode X; this case is Y. If intentional (for example asking the landlord which property they meant), resend with `address_check: 'intentional: <why>'`". With `address_check` present, allow and log to `policyLog`. One hold per recipient.

### Step 7 · `Decision` extension and `next_actions` validator (R6, 15 min)

```ts
next_actions: z.array(z.object({
  type: z.enum([...the 14 types from the master plan, plus 'NO_ACTION']),
  ledger_id: z.string().optional(),
  detail: z.string(),
})).optional(),
case_state: z.object({ stage: z.string(), waiting_on: z.string().optional(), open_approvals: z.array(z.string()).optional() }).passthrough().optional(),
confidence: z.enum(['high','medium','low']).optional(),
```

Validator: every `next_actions[]` entry except `NO_ACTION` has a `ledger_id` that is verified; `WAIT` must point at `schedule_follow_up`, `ESCALATE_TO_HUMAN` at `escalate_to_human`, `CLOSE_*` at an `update_ticket` with the matching `payment`. `report.ts` renders `next_actions` under the summary when present (additive).

### Step 8 · `maintenance-policy.md` (R7, 20 min; Marc can draft)

Sections, in this order, each short:
1. The Northbridge state machine with the exact system trigger strings (`research/agent-tools.md` §1) and what each trigger expects.
2. Decision vocabulary: the 14 types, one line each, and which tool makes each one real.
3. Tool tiers T0–T3 (review §3.1) in the agent's words.
4. Hard rules: landlord authority with evidence; no close with a party uninformed; never state content of an attachment you have not seen; address mismatch ⇒ confirm; safety categories expedite; three unanswered chases ⇒ another channel, reassignment or escalation; latest verified instruction from the entitled party wins; `unclear` and emoji replies are not approvals.
5. Inbound-message triage: landlord / tenant / provider / third party, from `research/eval-inventory.md` §4, as "if the message says X, the next action is Y".
6. Waiting versus blocking: "Nobody replies during this run, so never block on a reply. When the right business action is to wait (landlord asked within 3 days, provider within the reminder cadence, appointment in the future, review date not reached), record it with `schedule_follow_up` and finish. Do not chase a party you contacted less than the cadence ago."
7. Closure checklist and the two payment modes.
8. Escalation triggers with priority and team (review §3.2 table), and "escalate the decision, do the T1 work around it".

`systemPrompt.ts` appends it after `policy.md`. Lint: `grep -iE "judge|grader|score" src/agent/maintenance/maintenance-policy.md` is empty.

### Step 9 · Case-state hints (R8, 30 min, cut first if behind)

`stateReconstruct.ts` takes the visible `HistoryEvent[]`, the property line and the attachment list. All regex over `header`, `field(body, 'Channel'|'From'|'To')` and body text.

| Field | How |
|---|---|
| `stage` | last matching system trigger string → stage name from `agent-tools.md` §1; else `unknown` |
| `waiting_on` | last `Hold` event's `Reason:`; cleared by a later message from that party |
| `parties.last_contact[role]` | last event `From:` or `To:` that role, with event number and date |
| `open_approvals` | `request_landlord_approval`-like emails (to Landlord containing "advise" / "approve" / "quote") with no later landlord message |
| `dates[]` | every `\d{1,2}(st|nd|rd|th)? (Jan…Dec)`, `dd/mm/yyyy`, "tomorrow", "next week" with event number; `conflicts` when two confirmations name different dates for the same visit |
| `amounts[]` | `£\s?\d[\d,]*(\.\d\d)?` with event number and the nearest "quote" / "invoice" word |
| `chases[role]` | count of reminder-kind events (`routineKind()` from `publicCases.ts`) to that role since their last reply |
| `attachments` | names referenced in bodies (`Attachment`, `.pdf`, `.jpg`, `photo`, `invoice attached`) split into present / referenced-but-absent |
| `address_mismatches[]` | postcodes in bodies that differ from the property's, with event number |
| `unrelated_issues[]` | sentences in tenant or landlord messages containing a maintenance noun (fence, roof, leak, boiler, parking, bins, …) absent from the initial request |

`renderHints(state)` returns `<case_state_hints derived="deterministic parse of the visible history; verify every line against the events before relying on it">…</case_state_hints>`; `run.ts` appends it to the prompt. Whole thing wrapped: on any throw, return `''` and record `hintsError` in `result.json`. Practice-format cases (no events) return `''`.

## Implementation plan

| # | Step | Owner | Est. | Prove by |
|---|---|---|---|---|
| 1 | `quoteAppears` + `record_landlord_decision` tool and gate | Martin | 20 min | `gates.test.ts`: quote present ⇒ verified; quote absent ⇒ blocked and in `policyLog` |
| 2 | Landlord-authority gate on `approve_quote` / `assign_contractor` | Martin | 20 min | `gates.test.ts`: four cases: no decision ⇒ blocked; `approved_quote` within cap ⇒ allowed; `approved_own_contractor` ⇒ assign blocked; `emergency_justification` ⇒ allowed and logged (AC18) |
| 3 | `schedule_follow_up` + `no_action` validator | Martin | 15 min | `gates.test.ts`: `no_action` with nothing ⇒ rejected; with verified follow-up ⇒ accepted (AC19) |
| 4 | Block cap | Martin | 10 min | `gates.test.ts`: third `update_bank_details` ⇒ "stop and submit"; decision then accepted (AC20) |
| 5 | Closure semantics | Martin | 20 min | `gates.test.ts`: `completed` without `payment` ⇒ blocked; with both parties via ledger ids ⇒ verified with `payment` read back |
| 6 | Address check | Martin | 15 min | `gates.test.ts`: foreign postcode ⇒ held once; `address_check` ⇒ sent and logged; no case postcode ⇒ check off |
| 7 | `Decision` extension + `next_actions` validator + `report.ts` render | Martin | 15 min | `caseAgent.test.ts`: `WAIT` without `schedule_follow_up` id ⇒ rejected; existing tests unchanged |
| 8 | `maintenance-policy.md` + prompt wiring | Marc drafts, Martin wires | 20 min | `pnpm typecheck`; AC15 grep empty; one dev-split case shows the policy in `trace.jsonl` system prompt |
| 9 | `stateReconstruct.ts` + `renderHints` + `run.ts` wiring | Martin | 30 min | `stateReconstruct.test.ts` on 047 cut 10, 025 cut 30, 002 cuts 18 and 19 (AC3); a practice case renders `''`; a malformed history renders `''` with `hintsError` |
| 10 | Regression | Martin | 10 min | `pnpm verify` green; `pnpm loop --profile quick` mean ≥ M0 baseline, critical 0; then `--profile final` on `--only 003,008,026` |

Order is the priority order. At 12:40, whatever of steps 8–9 is not done is cut (master plan §6 scope ladder); steps 1–7 are the milestone.

## Acceptance criteria

- [ ] **AC-M1-1 (AC18).** Given no verified `record_landlord_decision` for `J-1`, when the agent calls `approve_quote` or `assign_contractor` on `J-1` without `emergency_justification`, then the call is blocked, `policyLog` has the reason, and the ledger is unchanged. Given `record_landlord_decision` with an `evidence_quote` absent from the inputs, then it is blocked and logged. Given a quote present in the inputs with `approved_quote` and a cap ≥ the amount, then `approve_quote` is verified.
- [ ] **AC-M1-2 (AC19).** Given `submit_decision` with `outcome: 'no_action'` and no verified `schedule_follow_up` or `add_note`, then the decision is rejected with a reason naming both tools; given a verified `schedule_follow_up`, then it is accepted.
- [ ] **AC-M1-3 (AC20).** Given a policy-blocked tool called three times with the same intent, then the third result contains "stop" and the subsequent `submit_decision` is accepted; no trace shows the same tool blocked more than three times.
- [ ] **AC-M1-4 (I6).** Given `update_ticket` to `completed` without `payment`, or with `landlord_informed` missing, then it is blocked naming the missing field; given ledger ids of verified `send_message` calls to landlord and tenant and `payment: 'without_payment'`, then the ticket reads back `stage completed, payment without_payment`.
- [ ] **AC-M1-5 (I4).** Given a case property `ZZ3 7ZZ` and a `send_message` body containing `ZZ3 5ZZ`, then the first attempt is held with both postcodes in the reason; with `address_check: 'intentional: asking which property'`, then it is sent and the override is in `policyLog`.
- [ ] **AC-M1-6 (AC4).** Given `next_actions: [{ type: 'WAIT' }]` with no `ledger_id`, then `submit_decision` is rejected; given `ledger_id` of a verified `schedule_follow_up`, then accepted and `ANSWER.md` lists the typed action.
- [ ] **AC-M1-7 (AC3).** `stateReconstruct.test.ts`: 047 at cut 10 lists an address mismatch at event 010 (`ZZ3 5ZZ` vs `ZZ3 7ZZ`); 025 at cut 30 lists at least two conflicting appointment dates with event numbers; 002 at cut 18 reports the stage as awaiting landlord approval of a quote (events 017 quote sent, 018 hold "Waiting for Landlord"); 002 at cut 19 reports an open approval answered (event 019: "Please approve this quote for works."), which is also the positive fixture for AC-M1-1: `record_landlord_decision` with that quote is verified and `approve_quote` is then allowed.
- [ ] **AC-M1-8.** A practice-format case and a history with no `event-NNN` anchors both render no hints and no error escapes `runCase`.
- [ ] **AC-M1-9.** `pnpm verify` exits 0; all 34 existing tests still pass; `pnpm loop --profile quick` shows no regression against the saved quick baseline.

## Verification

Run from the repo root and show the output.

- [ ] `pnpm verify`
- [ ] `pnpm test -- src/agent/maintenance/gates.test.ts` (AC-M1-1 to AC-M1-6)
- [ ] `pnpm test -- src/agent/maintenance/stateReconstruct.test.ts` (AC-M1-7, AC-M1-8)
- [ ] `grep -iE "judge|grader|score this|give this" src/agent/maintenance/maintenance-policy.md` returns nothing (AC15)
- [ ] `pnpm loop --profile quick` exits 0 (no regression); then `pnpm loop --profile final --only 003,008,026` and read `policyLog` in one `REASONING.md` to confirm a gate fired or did not fire as expected
- [ ] `pnpm cases --in "HackatonPublicCases/Property Management" --only 047 --at 10 --out runs/m1-047` then open `runs/m1-047/047/REASONING.md`: the hints block names the `ZZ3 5ZZ` mismatch and `assign_contractor` does not appear verified (AC7 preview)

## Open questions resolved by assumption

| Question | Assumption | Revisit |
|---|---|---|
| Should `emergency_justification` be checked against severity? | No code check (severity is a model judgement); it is logged so the critic (M3) and the judge see it. | If the dev split shows it used as a bypass, require `severity: emergency` in the final decision for the case to pass validation. |
| Does the address check apply to practice cases? | Only when a postcode is found in `crm.json`; otherwise off. | Never block on absence of data. |
| Is the quote check too strict for call summaries paraphrased by the system? | 15-char minimum and whitespace/case/quote normalisation; the agent is told to copy the words as written in the summary. | Lower to 10 chars if the dev split shows legitimate blocks. |
| Where do `payment` and `resolution` live for the organiser API adapter (M5)? | On the ticket object; the adapter maps them later. | M5. |
