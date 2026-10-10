# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date conflicts: the record says Monday 30/08/2025, which is a Saturday, and the tenant says 8 September. I asked the provider to confirm the real date, told the tenant it is unconfirmed, and put the job on hold until 2 Sept. No human decision is needed.

## Where the case stands
Stage: visit. Landlord approved Keystone (event 009). Visit date unconfirmed: system says "Monday 30/08/2025" (a Saturday), tenant says 8 Sept. Waiting on provider to confirm; on hold, review 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Keystone to confirm the actual visit date in writing by 2 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, nobody should be expected today, and we will update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting provider date confirmation, review 2025-09-02 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - What date and time have you actually agreed for the oven visit at Flat 3, 3 Willowmere Road: Monday 8 September 2025 (the tenant's understanding) or 30/08/2025 (which is a Saturday, not a Monday)?
> - If you were not planning to attend this morning, please confirm you will not be attending today, and confirm the date you can do in writing by 2025-09-02.
> 
> Why: Our records say Monday 30/08/2025, but 30/08 is a Saturday; the tenant called to say the visit was arranged for 8 September. Only the provider can confirm the real date.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi Clara, thanks for calling. Sorry for the confusion. Our record says 30/08/2025 and "Monday", but 30 August is a Saturday, so the dates don't fit. You've told us 8 September was agreed. We've asked Keystone to confirm the actual date in writing, and 8 September is not confirmed until they do. Please don't plan around anyone attending today unless they contact you. We'll update you by 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked or rescheduled; 8 Sept is not confirmed
- Nothing established about the oven fault, cost or who pays
- The landlord was not messaged this run

## Remaining work
- Provider to confirm date; then set_visit and tell tenant
- Visit, result, invoice and closing still outstanding
- Landlord to be updated once the date is confirmed

## Missing or unavailable information
- Provider-confirmed visit date
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday
- System date 30/08 vs tenant's 8 Sept
- Tenant, provider and company names differ across events (Ruben/Clara/Grace; Keystone/Riverside/Lantern)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned. The visit date is disputed (30/08 per system, a Saturday labelled Monday, vs 8 Sept per tenant) and neither is provider-confirmed. The visit, result and invoice are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone by email to confirm the date; update the tenant by email (both sent); hold until 2 Sept.

**3. Does anything need a human decision, and why?**

No. A question to the provider resolves the date, so this is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Waiting for Keystone to confirm visit date: 30/08/2025 (system, a Saturday la… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 say Monday 30/08/2025 (a Saturday); tenant says 08/09/2025 (event 021). No provider co… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone to confirm visit date: 30/08/2025 (sys… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A3: Used the wrong ticket ref (026); retried with NBL-026-date-conflict and it verified as A5.
