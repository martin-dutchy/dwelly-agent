# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The dishwasher door job NBL-012 is at visit stage and the landlord agreed to an engineer attending. The visit is not confirmed because a caller from "Cedar Utilities" offered a slot on Wed 29/04 8am-12pm, but the assigned contractor is Riverside Compliance and the tenant name differs. I placed the ticket on hold until 2026-04-28, asked Riverside to confirm, and told the tenant we are checking the visit.

## Where the case stands
Ticket NBL-012 (dishwasher door, Flat 9, 89 Juniper Mews) is at visit stage, routine severity. Landlord agreed for an engineer to attend (events 008, 012). Riverside Compliance was assigned (event 013/015). Tenant reports all troubleshooting checks done and door still not closing (event 011). Visit is not confirmed: the tenant was called by "Grant from Cedar Utilities" about Wed 29/04 8-12, which does not match the assigned contractor. Ticket is on hold, waiting for the provider, review 2026-04-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Riverside Compliance to confirm whether Cedar Utilities/Grant is their engineer, that they can attend Wed 29/04/2026 8am-12pm, and that the tenant is Leo Turner. Told them not to attend until confirmed in writing. | Riverside Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the Wed 29 April 8am-12pm visit is being confirmed with the contractor, and that we will text once confirmed. | Leo Turner, tenant | sms | A3 ✅ |
| 3 | WAIT | Hold ticket NBL-012 as Waiting for Provider; review on 2026-04-28 and set the visit only once the contractor confirms. | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Dear Riverside Compliance,
> 
> Re: Dishwasher door repair, Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ (tenant Leo Turner, 07700 900763).
> 
> Our tenant has received a call from "Grant from Cedar Utilities" about a dishwasher inspection on Wednesday 29 April, 8am to 12pm. We have not confirmed that visit with you yet. Please could you reply to confirm:
> 1. Whether Cedar Utilities / Grant is attending on your behalf, or whether this is a different company.
> 2. That you can attend Wednesday 29 April between 8am and 12pm.
> 3. That the tenant's name is Leo Turner (the call referred to "Leo Kendall").
> 
> Please do not attend until we have confirmed the visit with you in writing. Our earlier email of 26 April 2026 is withdrawn until then.
> 
> Thank you,
> Northbridge Lettings

**A3 · send_message → Leo Turner (tenant) via sms, 07700 900763** (verified)

> Hi Leo, thanks for trying the checks. Our contractor Riverside Compliance is handling the dishwasher door. You had a call about a visit on Wednesday 29 April, 8am to 12pm, from "Cedar Utilities". We are confirming with Riverside that this call was from them, and we will text you once the visit is confirmed. Please don't worry if you don't hear the same day. If you have any concerns, reply here. Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the request to the contractor and the tenant does not confirm the visit, the engineer's identity, or the cause of the fault.
- No set_visit booking has been made, so the 29/04 08:00 slot in event 017 is not a confirmed booking.
- No repair quote exists, so approval for the repair cost is not established.
- The landlord's approval covers an engineer attending to investigate and repair if possible; it sets no spend cap and that is not recorded.

## Remaining work
- Riverside Compliance to confirm the engineer, company and the 29/04 slot (review 2026-04-28).
- Once confirmed, book the visit with set_visit (access: tenant_home, per the slot) and notify tenant and contractor.
- After the visit, record the work result and any quote; the repair cost needs landlord approval if above any limit (none recorded).
- Chase landlord (Imogen Oakley / Maya Kendall) if a quote is needed.

## Missing or unavailable information
- Identity of the caller 'Grant from Cedar Utilities' and whether they are Riverside Compliance's engineer.
- Landlord spend limit for the dishwasher repair (property record has none).
- Confirmation of tenant name: 'Leo Turner' (event 014/015) vs 'Leo Kendall' (event 016).
- Current contractor's written confirmation of the 29/04 slot.

## Conflicts between sources
- Event 016 says the caller was 'Grant from Cedar Utilities' and the tenant was 'Leo Kendall'; the case record and events 014/015 say Riverside Compliance and 'Leo Turner'. Trusted the case record; flagged for confirmation.
- Event 017 records a visit at 08:00 on 29/04 but event 016 gives only a window of 8-12, and the visit was never booked with set_visit. Treated the visit as unconfirmed.
- Event 001 cites an old email from 16 Sept 2025 and event 004 notes an unclear sink email from 'Ruben'. Not relied on.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Routine job at visit stage. Tenant reports the door still will not close after the checks (event 011). Riverside Compliance is assigned (events 013/015). The visit is unconfirmed: the Cedar Utilities call and the 08:00 slot in event 017 do not match the assigned contractor. Outstanding: contractor confirmation of the engineer and slot, the visit booking, the attendance result, and any repair quote and approval.

**2. 2. What is the next action, who is it for, and through which channel?**

Email Riverside Compliance (existing thread, event 015) to confirm the engineer, company, slot and tenant name. SMS Leo Turner on 07700 900763 that the visit is being confirmed and we will text once it is. Hold NBL-012 until 2026-04-28.

**3. 3. Does anything need a human decision, and why?**

No urgent decision now. The routine repair is within the landlord's agreed scope. Escalate only if Riverside cannot confirm the visit, or if the repair quote exceeds the landlord's approval, or if the Cedar Utilities caller turns out to be an unknown third party.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-012","reason":"Waiting for Provider","comment":"Visit not yet confirmed. Event 016 call came from \"Grant from Cedar Util… | 1 | ✅ verified | Ticket NBL-012 read back after put_on_hold |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900763","ticket_ref":"NBL-012","body":"Hi Leo, tha… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
