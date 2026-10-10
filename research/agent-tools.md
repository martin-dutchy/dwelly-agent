# Agent tool catalogue (derived from the cases)

Source: a full read of the 50 public Property Management cases (`HackatonPublicCases/Property Management/001-050`), the 22 practice cases (`cases/practice/`), and the current tools (`src/agent/opsTools.ts`, `src/core/tools.ts`). Done 10 Oct 2026.

## 1. What the cases actually are

Every public PM case is **one maintenance job moving through a workflow engine**. The history has 1,505 events:

| Channel | Events | What it is |
|---|---|---|
| Email | 506 | Agency ↔ tenant / landlord / contractor |
| Update | 443 | Stage changes and system prompts |
| Hold | 236 | "Put on hold by X. Reason: Waiting for Provider/Landlord/Tenant/Other. Comment: …" |
| Note | 192 | Internal notes, pasted emails, call summaries |
| Call | 74 | Call transcripts, including failed calls |
| SMS | 54 | "Please check your email…" nudges and appointment reminders |

The lifecycle (exact system strings):

```
intake (AI classification: Issue / Severity ROUTINE / Confidence / Q&A)
 → "Please approve selection of provider and category"
 → "Please complete landlord approval step first"            ← GATE
     ask landlord: our contractor? your own? tenant self-fix? (3-day wait timer)
 → "Landlord approval confirmed. Proceed to provider selection."
 → "Maintenance provider assigned"  (auto-emails tenant + contractor; SMS nudge)
     [quote loop: provider quote → landlord → "Quote was approved by landlord" → instruct proceed]
 → "Visit date selected - dd/mm/yyyy hh:mm" / "Visit date confirmed/rescheduled" (auto-confirmations + tenant SMS reminder)
 → "Task has been moved to Result"
 → "Request marked as completed, lets do the final checks"
     "Skipped uploading one or more documents. Reason provided: …"
     "Need confirmation from landlord"
     "We need to check the key return before completing the request" → "Keys return confirmed"
 → "All checks have been completed; the request is now closed"
   | "Task has been completed without payment"  (landlord's own contractor / tenant fixed / no charge)
   | "Task has been completed by supervisor"
```

**System triggers are the decision points** the Reality Test is likely to cut at:

| Trigger (exact) | Count | Expected agent behaviour |
|---|---|---|
| "Please check if we need to provide a response to {provider/landlord/tenant}. If not, please return this request to auto mode." | ~54 | Triage the inbound message: reply, update state, or resume auto |
| "Please complete landlord approval step first" | 25 | Get or record the landlord decision before assigning anyone |
| "No work results; we need to check what is happening" | 16 | The visit date has passed: chase the provider and check with the tenant |
| "Waiting for landlord/tenant response before provider selection (3 days)" / "No … response after 3 days. Please review manually." | 16 | Chase on another channel, then escalate |
| "Message received from landlord/tenant. Please review and proceed manually." | 8 | Interpret the reply (approve / decline / own contractor / conditional) |
| "3+ reminders have been sent to provider. Please check what's happening." | 6 | Call the provider, then reassign or escalate. Stop the auto-reminders if the provider already replied |
| "Email received from provider, but expected data could not be extracted" | 6 | Read it yourself. Ask for a PDF invoice or quote if needed |
| "Property is **NOT TENANTED** — moved to Paused" | 3 | Void property: no tenant notices. The keys/caretaker route is needed |
| "This task is closed, but we have received an email from the tenant" | some | Triage. Open a new or related job if the email is unrelated |
| "Paused automatically: exceeded visit/move-out/hold deadline by 2 days" | 1 | Hold review dates must be kept current |
| "Validation: (Priority cannot be decreased to N. Current priority is M.)" | ~10 | Priority only goes up. Treat as non-blocking and don't loop (case 024 retried 3×) |
| "Work results isset, please select next stage" / "Please add results of inspection" | few | Choose: complete or ask for a quote / upload the inspection result |

## 2. The exceptions the data keeps throwing (where judgement points live)

Seen across almost every case. These are the red flags a judge will look for:

- **Conflicting identity data.** Wrong property address in outgoing emails (031, 033, 034, 037, 038, 039, 045, 047, 048, 008, 009). Tenant names and phones that differ (021, 043, 044, 050, 002). Provider or company names that differ (011, 012, 015, 026, 050). SMS sent under the wrong brand.
- **Money mismatches.** Invoice above the approved quote (007: £240 vs £238.04). Invoice from a different company (003, 015, 050). Amount matching neither quote (050). Overview and history disagree (032).
- **Scope creep or drift.** Instructed "both carpets" when only one was approved (005). Quote adds unrequested items (006). Estimate silently drops a requested item (008). Only clearance approved, levelling never done (019).
- **Gates broken.** Provider assigned before landlord approval (043, 039, 013, 029). Approval recorded after the work was done (001, 019, 048). Agency approved the spend itself (003). Emoji "👍" taken as approval (032).
- **Dates.** Visit date in the past (032, 033, 048). Weekday doesn't match the date (039). Invoiced before the visit (050). Missed appointments (030). Visit never updated after a reschedule (026, 036).
- **Closure without proof.** No tenant confirmation (028, 035, 040, 049). Completion based on hearsay (029). Invoice never captured (022, 023, 043). Landlord not told the outcome (025, 040).
- **Safety hidden in routine.** Smoke detector water damage (035). Glass-shatter warning (014). Communal area might be the freeholder's responsibility (018). Nesting birds in a tree to be removed (001).
- **Unrelated issues on a job.** Fence, conservatory leak, parking, bins, Direct Debit, other properties (024, 027, 039, 041, 045, 047, 008).
- **Privacy.** Tenant contact shared with the landlord's contractor only after consent (045).
- **Unparseable / unavailable data.** "[Text/transcription unavailable…]", emoji-only emails, attachments marked unavailable.
- **Follow-ups that need a date.** Next meter reading on 15 Sep (010). Contractor "next month" (014). Re-inspection (040).

## 3. Tool catalogue

Legend: ✅ have it (opsTools) · 🟡 partial or only in core/voice tools · 🆕 missing. "Cases" counts how many public PM cases (/50) use it, plus practice cases (P).

### A. Read / context
| Tool | Purpose and key params | Cases | Status |
|---|---|---|---|
| `get_job(ref)` / `list_jobs(property?, tenant?)` | Current stage, mode, hold, priority, approvals, provider, visit, quote/invoice, keys, docs | all, P6 | ✅ (fields thin) |
| `get_property(address)` | Tenancy status (tenanted / NOT TENANTED), landlord, **spend limit**, landlord preferences (own contractor, preferred provider), key location (office / caretaker / agency key), block / freeholder | ~50, P many | 🆕 |
| `find_contact(name/phone/role)` | Tenant, landlord or provider with channel and contact code | ~20, P | 🟡 core `find_tenant` |
| `verify_identity(person, evidence)` | Gate before disclosing anything | P11, P15, P16 | 🟡 core only |
| `get_tenancy(tenant)` | Deposit, periodic status, responsibilities clauses | P15, P18, P22 | 🟡 core only |
| `list_providers(category)` | Choose or reassign a contractor | 8 | 🆕 |
| `list_scheduled_actions(entity)` | Arrears chasers, notices, reminders | P12 | 🆕 |

### B. Job lifecycle
| Tool | Purpose and key params | Cases | Status |
|---|---|---|---|
| `create_job(property, category, severity, description, related_ref?)` | New job, or split an unrelated issue off an existing one | 50, P9 | ✅ `create_ticket` |
| `update_job(ref, description?, category?, priority_raise?)` | Edit the description or name, set the category, raise priority (**never lower**) | ~12 | 🟡 `update_ticket` (stage/note only) |
| `request_landlord_approval(ref, question, options, amount?, deadline)` | Options: our contractor / your own / tenant self-fix / approve quote | ~40, P5 | ✅ |
| `record_landlord_decision(ref, decision, evidence_quote, cap?, conditions?)` | decision ∈ approved · declined · own_contractor · tenant_self_fix · conditional · unclear. **Unclear (👍, ambiguous) → don't proceed** | ~35 | 🆕 |
| `assign_provider(ref, provider, category, instruction_mode, cap?)` | instruction_mode ∈ complete_or_quote · quote_only · proceed_approved. Auto-notifies the tenant and contractor | 33, P8 | ✅ `assign_contractor` (no mode/cap) |
| `share_tenant_contact(ref, provider, consent_basis)` | Privacy-gated contact sharing | 5 | 🆕 |
| `record_quote(ref, provider, amount, vat, items[], doc?)` | Capture a quote (often unparsed email) | 12 | 🆕 |
| `approve_quote(ref, quote_id, approval_basis)` | **Only** with a recorded landlord decision or within the spend limit | 7, P (prohibited ×3) | ✅ needs a code guard |
| `instruct_provider(ref, approved_scope, cap, asks[])` | Go-ahead to proceed, with the asks (photos, invoice as PDF, dates) | 10 | 🆕 (send_message today) |
| `set_visit(ref, datetime, slot_text, access)` | access ∈ tenant_home · agency_key · caretaker · lockbox. Sends confirmations. Rejects past dates and weekday/date mismatch | 20 | 🆕 |
| `record_work_result(ref, outcome, evidence)` | outcome ∈ completed · partial · needs_quote · no_access · missed_appointment | 25 | 🆕 |
| `record_invoice(ref, amount, vat, issuer, payee, due, who_pays)` | who_pays ∈ agency · landlord_direct · rent_deduction · tenant_recharge · warranty_no_charge. **Auto-compares against the approved quote and the assigned provider** | 15 | 🆕 |
| `record_payment(ref, payer, evidence)` | Landlord "Paid" | 3 | 🆕 |
| `attach_document(ref, kind, file)` / `skip_document(ref, reason)` | kind ∈ invoice · quote · photos · inspection_report. A skip **needs a reason** | ~30 | 🆕 |
| `confirm_keys_returned(ref, evidence)` | Closing checklist | ~15 | 🆕 |
| `close_job(ref, mode, resolution)` | mode ∈ final_checks · without_payment · by_supervisor. **Preconditions: work evidence, tenant confirmation or a reason, landlord informed, invoice captured or skipped with a reason, keys** | 50 | 🆕 |
| `cancel_job(ref, reason)` | Duplicate or withdrawn | few | ✅ |

### C. Workflow control
| Tool | Purpose and key params | Cases | Status |
|---|---|---|---|
| `put_on_hold(ref, reason, comment, review_on)` | reason ∈ Waiting for Landlord · Waiting for Provider · Waiting for Tenant · Other. **review_on required** (deadline auto-pause) | 49 (236 events) | 🆕 **biggest gap** |
| `resume_auto(ref)` | "return this request to auto mode" after triaging an inbound message | ~30 | 🆕 |
| `schedule_follow_up(ref?, date, party, purpose, recurring?)` | 3-day landlord timer, next meter reading, re-inspection, "next month" | ~10 | 🆕 |
| `cancel_scheduled_action(id, reason)` | Stop arrears chasers or notices under Breathing Space | P12 | 🆕 |

### D. Communication
| Tool | Purpose and key params | Cases | Status |
|---|---|---|---|
| `send_message(ref, recipient, role, channel, body, attachments[])` | channel ∈ email · sms · whatsapp · phone_call · letter. **Pre-send check: the address, names and job ref in the body must match the job** | 50, P21 | ✅ (no attachments, no consistency check) |
| `chase(ref, party, channel)` | Counted reminder. Escalate at 3 or more; stop once the party has replied | ~30 | 🟡 send_message |
| `log_call(ref, party, direction, outcome, summary)` | outcome ∈ connected · voicemail · failed · wrong_number | 28 | 🆕 |
| `request_information(ref, party, questions[], why)` | Missing facts or evidence (photos, which window, how it broke) | ~15, P5 | ✅ |
| `add_note(ref, note, kind?)` | kind ∈ record_conflict · injection_flag · access_attempt · general | 50, P5 | ✅ |
| `log_general_request(topic, route_to)` | Non-repair: parking, bins, DD, other property → council, block management, accounts | 5, P21 | 🆕 |

### E. Safety, finance, escalation
| Tool | Purpose and key params | Cases | Status |
|---|---|---|---|
| `escalate_to_human(priority, team, reason, known, missing, options, recommendation)` | Handover packet | 1 public, P13 | ✅ |
| `hold_payment(payee, reason)` | Suspected fraud, invoice mismatch | P10, P17 | ✅ |
| `update_bank_details(...)` | **Honeypot**: only ever a prohibited action. Block it in code | P (prohibited) | ✅ needs a block |
| `flag_account(entity, flag, reason)` | flag ∈ safeguarding · fraud · restricted_disclosure · deceased | P10, P16, P22 | 🆕 |
| `record_compliance(property, cert, status, expiry, access_attempts)` / `record_inspection(ref, issues, report)` | Gas / EICR / EPC, periodic inspection (020: the report contradicts "No issues") | 1, P13 | 🆕 |
| `start_move_out(tenant, notice_date, earliest_end)` | Notice period (2 months) | P18 | 🆕 (low priority) |

## 4. Guards: rules that belong in code, not the prompt

These turn the recurring red flags into deterministic `beforeToolCall` checks:

1. **Landlord gate**: `assign_provider` or `approve_quote` is blocked unless there is a recorded `approved` landlord decision, the amount is within the spend limit, or severity is emergency.
2. **Consistency check on outgoing text**: `send_message` is blocked if the body names a different property address, tenant or provider than the job record.
3. **Invoice vs quote**: `record_invoice` flags amount > approved, issuer ≠ assigned provider, or invoice date before the visit. Payment is held and escalated.
4. **Scope**: `instruct_provider` is blocked if its scope exceeds the approved scope.
5. **Dates**: `set_visit` rejects past dates and weekday/date mismatches.
6. **Priority**: priority may only rise, and a validation error ends the attempt (no retry loop).
7. **Void property**: no tenant-facing messages when the property is NOT TENANTED.
8. **Close preconditions**: `close_job` is blocked unless the checklist is met, or each skipped item has a reason.
9. **No duplicates**: identical send or hold within the run → block (we already block repeat verified writes).
10. **Chase cap**: after 3 chases to one party, the next must be another channel, a reassign, or an escalation.
11. **Honeypots**: `update_bank_details` is always blocked. `approve_quote` is limited by rule 1.

## 5. Recommendation

- **Build first (highest frequency or score impact):** `put_on_hold` + `resume_auto`, `record_landlord_decision`, `set_visit`, `record_work_result`, `record_quote` / `record_invoice` (with the comparison), `attach_document` / `skip_document`, `confirm_keys_returned`, `close_job` (with preconditions), `log_call`, `schedule_follow_up`, and `get_property`. Also attachments on `send_message`, and guards 1, 2, 3 and 8.
- **Fold in from core:** `find_contact`, `verify_identity` and `get_tenancy` (practice cases need the identity gate).
- **Later:** `flag_account`, `cancel_scheduled_action`, `log_general_request`, `record_compliance`, `start_move_out`.
- **Keep the surface about 25 tools** with enums rather than 40 narrow ones. Tool choice degrades as the list grows.
- **Expect supplied tools.** The Reality Test may hand us the organisers' own tools (rules §5: "interact with supplied tools"). Keep our tools behind an adapter so we can map our names onto theirs quickly.
