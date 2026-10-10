# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven fault, landlord approved Keystone. Tenant disputes the visit date (record 30/08 vs her 8 Sept). I asked the provider to confirm, told the tenant it is unconfirmed, recorded the landlord approval, added notes and set a follow-up for 1 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance (event 009). Visit date unconfirmed by provider: record says 30/08/2025 10-12, tenant says 08/09/2025. No visit result recorded. Waiting on provider to confirm date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Keystone Compliance to confirm the agreed visit date (30/08 vs 08/09) and whether anyone attended today | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8 Sept is not yet confirmed, and we are checking with the provider | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Chase provider on 2025-09-01 if no reply; then set_visit once provider confirms | Keystone Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Which date did you agree with the tenant for the oven visit: 30/08/2025 (our record) or 08/09/2025 (what the tenant says)?
> - Did anyone attend today (30/08) between 10 and 12? If not, please confirm the date you can attend and the time window.
> 
> Why: Our record says 30/08/2025 10-12, but the tenant phoned today saying she arranged 8 September. Only the provider can confirm the date; no visit result has been reported.

**A3 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling. Our record currently shows the oven visit as 30 August, 10-12, but you've told us you arranged 8 September. I'm not able to confirm 8 September yet, as it needs the contractor to confirm it. I've asked them to confirm the date today and will update you as soon as they reply. If anyone turns up or calls in the meantime, please let us know. Sorry for the mix-up.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms 8 September or 30 August as the real appointment
- No visit result recorded: not treated as missed or no-access
- Landlord approval covers sending the contractor only, no quote or spend approved

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency)
- Visit, diagnosis, quote if needed, invoice, close

## Missing or unavailable information
- Provider's confirmed visit date
- Whether a visit happened on 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- Visit date 30/08/2025 (events 017-020) vs 08/09/2025 (event 021); trusted neither until provider confirms
- 30/08/2025 is described as Monday but is a Saturday
- Names inconsistent across events (Keystone/Riverside Works/Lantern Utilities; Clara/Ruben Oakley/Grace Mercer)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned, stage visit. Visit date disputed (30/08 per record, 08/09 per tenant) and unconfirmed by the provider. No result yet.

**2. What is the next action, who is it for, and through which channel?**

Provider asked by email to confirm the date (REQ-101); tenant told by email the date is being confirmed; chase 2025-09-01.

**3. Does anything need a human decision, and why?**

No. A question to the provider resolves it; routine severity.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 asking t… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"02… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-01","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date (30/08 vs 08/09);… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"026","note":"Record conflicts: visit 30/08/2025 (events 017-020) vs tenant's 08/09/2025 (event 021); 30/08/2025 is a Saturday yet… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-026-date-conflict","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to … | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after record_landlord_decision |
| A7 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Visit date conflict: record 30/08/2025 10-12 (events 017-020) vs tenant's 08/09/2025 (event 021). … | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
- A1: Used wrong ticket ref (026); retried with NBL-026-date-conflict as A6, verified.
