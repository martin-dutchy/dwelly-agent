# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approval ("Yes go ahead") is recorded. The 'confirmed' visit in the system is unreliable: 30/08/2025 is a Saturday, the tenant has not confirmed, and the caller named a different company. I asked the provider to confirm, told the tenant the date is not yet confirmed, and set a follow-up for 28/08.

## Where the case stands
Stage: visit. Landlord approved. Keystone Compliance is assigned. The visit is NOT firmly booked. The tenant only agreed a tentative Monday 10-12 slot and is to confirm by text. The system recorded 30/08/2025, which is a Saturday. Waiting on the provider to confirm date and company.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the exact visit date and window, and which company is attending, because the system date and the 'Monday' slot clash and the call named Riverside Works | Keystone Compliance, contractor | email | A6 ✅ |
| 2 | REPLY_TO_TENANT | Tell Clara the landlord approved, and that the visit date is not yet confirmed | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Review on 2025-08-28 whether the provider has confirmed the date, then use set_visit | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (failed)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our email of 26/08 said the visit was confirmed for Monday 10-12 (30/08/2025), but that date is a Saturday, and the tenant has only agreed a tentative Monday morning slot by phone and is still to confirm by text. Please can you confirm the exact date and window you will attend? Also, the call log names the caller as Isaac Palmer from Riverside Works, not Keystone Compliance. Please confirm who is attending. The landlord has approved sending a contractor to look at the oven. If a quote is needed, please send it to us for approval before any work starts.

**A3 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, the landlord has approved the oven repair. Our last email called the visit "confirmed" for Monday morning 10-12 (30/08/2025). Please treat that as not yet confirmed: 30/08 is a Saturday, and the contractor still needs to confirm the date and window. Please text the contractor with your preferred time once you have checked with your partner. We are confirming the date with them and will let you know once it is settled. Thanks for your patience.

**A6 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our email of 26/08 said the visit was confirmed for Monday 10-12 (30/08/2025), but that date is a Saturday, and the tenant has only agreed a tentative Monday morning slot by phone and is still to confirm by text. Please can you confirm the exact date and window you will attend? Also, the call log names the caller as Isaac Palmer from Riverside Works, not Keystone Compliance. Please confirm who is attending. The landlord has approved sending a contractor to look at the oven. If a quote is needed, please send it to us for approval before any work starts.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval covers sending a contractor to inspect, not any quote or repair cost.
- No visit has been booked with set_visit.
- The cause of the fault and who pays are not established.

## Remaining work
- Provider to confirm date/window and identity (agency, follow-up 28/08)
- Tenant to text the contractor with her preferred time
- Quote loop if the repair needs one
- Result, invoice and close

## Missing or unavailable information
- Provider-confirmed visit date
- Which company is attending
- Attachment at event 014 was unavailable
- Oven model

## Conflicts between sources
- Visit date 30/08/2025 is a Saturday, but the slot is described as Monday.
- Provider: Keystone Compliance was assigned, but the call came from Isaac Palmer of Riverside Works.
- Tenant name: Clara vs Ruben Oakley vs Grace Mercer vs Harriet Fletcher.
- Two different contact numbers were given.
- Trusted the system assignment (Keystone). The visit date is treated as unconfirmed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and a provider is assigned. The visit date is unconfirmed, with conflicting date, weekday and company details. The result, and any quote, are still to come.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm the date and window and which company is attending. The tenant has been told by email that the date is not yet confirmed.

**3. Does anything need a human decision, and why?**

No. This is routine and can be settled by asking the provider. If there is still no confirmation by 28/08, I will chase again.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to request to send Ke… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ❌ failed | No send_message record on read-back |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"026","body… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-08-28","party":"Keystone Compliance","purpose":"Check provider has confirmed visit date/window and which … | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to request to sen… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A6 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-026","due_on":"2025-08-28","party":"Keystone Compliance","purpose":"Check provider has confirmed visit date/window and wh… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A1: Used the wrong ref '026'. Retried with NBL-026 as A5.
- A2: send_message returned HTTP 500 for the provider email. Resent as A6 and it verified.
