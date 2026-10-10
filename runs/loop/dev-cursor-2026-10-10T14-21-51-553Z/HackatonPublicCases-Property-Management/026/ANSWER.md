# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the contractor, and the visit slot was sent to the tenant and provider with a weekday/date mismatch. I asked the provider to confirm the real date, told the tenant the slot is unconfirmed, recorded the landlord decision, added a conflict note and set a follow-up for 27 Aug.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance; provider assigned. Visit date unconfirmed: the system says Monday 30/08/2025 but that is a Saturday, and the tenant has not confirmed the tentative slot. Waiting on the provider to confirm the date (follow-up 27 Aug).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the actual visit date (30/08 is a Saturday, 'Monday' is 01/09) by 27 Aug | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the slot is not confirmed, offer to chase a sooner slot, and say when she will next hear from us | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on the provider's date confirmation, then set_visit | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm the actual visit date for the oven repair at Flat 3, 3 Willowmere Road. Our last email said "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday (Monday is 01/09/2025). The tenant has not yet confirmed the tentative slot either. Please reply by 2025-08-27 with the date you can attend, and please do not treat the slot as booked until then. Also, our records show a call from "Riverside Works" about this job; please confirm that was you. Quote only if needed; do not start chargeable work without our approval.

**A3 · send_message → Clara (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, sorry for the confusion: our last email said "Monday morning 10-12 (30/08/2025)", but 30 August is a Saturday. Please treat that slot as not yet confirmed. We are asking the engineer to confirm the exact date, and nobody should be expected until they do. If you'd like a sooner slot, as the oven is out of use, let us know and we'll ask. You can also text the engineer with the day that suits. The landlord has approved the visit. We'll update you by 27 August.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked; set_visit was not used because the provider has not confirmed a date.
- Landlord approval covers sending Keystone only; any quote needs separate approval.
- The messages do not establish the cause of the fault or who pays.

## Remaining work
- Agency to get the provider's confirmed date, then set_visit and update the tenant
- Quote to the landlord if the repair needs one
- Invoice, final checks and closing after the work

## Missing or unavailable information
- Provider-confirmed visit date
- Oven make and model
- Attachment from event 014 (unavailable)

## Conflicts between sources
- 30/08/2025 is a Saturday but events 018/019 say Monday (01/09 would be Monday)
- Event 016 names Riverside Works, Isaac Palmer, Grace Mercer and Harriet Fletcher, but the assigned provider is Keystone Compliance and the tenant is Clara (addressed as Ruben Oakley); treated as the same job
- Two tenant contact numbers on file: 07700 900721 and 07700 900077

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is in and Keystone Compliance is assigned. The visit date is not reliably confirmed: 30/08/2025 is a Saturday but the slot is described as Monday, and the tenant had not confirmed it. The provider's confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm the actual date; email the tenant that the slot is unconfirmed; follow-up on 27 Aug, then set_visit once confirmed.

**3. Does anything need a human decision, and why?**

No. This is a routine date clarification that the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 asking t… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"026","body… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-08-27","party":"Keystone Compliance","purpose":"Chase provider to confirm actual visit date (30/08 is Sat… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"026","note":"Conflicts: events 018/019 say Monday 30/08/2025 but that is a Saturday (Monday = 01/09). Event 016 call names Rivers… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `resume_auto` | {"ticket_ref":"026"} | 1 | ❌ failed | Ticket 026 not found on read-back |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 aski… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A8 | `resume_auto` | {"ticket_ref":"NBL-026"} | 1 | ✅ verified | Ticket NBL-026 read back after resume_auto |

## Failed or unverified actions
- A1: Used the wrong ticket ref (026); retried as NBL-026 and verified as A7.
- A6: Same wrong ref; retried as NBL-026 and verified as A8.
