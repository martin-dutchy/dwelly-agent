# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stuck awaiting the landlord for two months, with conflicting notes on approval and route. I asked the landlord for a clear written decision by 18 March, updated the tenant, noted the conflict and held with a review date.

## Where the case stands
At landlord approval gate. No landlord decision is recorded in the agency's own words. Landlord has not replied since January. Held, waiting for landlord, review 2025-03-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written decision: our contractor at £500+VAT, own contractor, or decline, by 18 March | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up on 18 March; chase landlord by SMS/phone then | Jenkins, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk (tenant request, chased 13 March). Our notes conflict: one says you approved a £500+VAT quote for Harbour Compliance, another suggests you are arranging your own contractor. We have no written confirmation from you. Please reply by email by 18 March 2025 with which route you want. (£600)
> 
> Options: Yes: go ahead with our contractor on the £500+VAT quote (£600 including VAT); You will arrange your own contractor (please give name and date); Decline the work

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait on your garden request. We are still waiting for the landlord to confirm how the work will be arranged, and we have emailed them again today asking for a written answer by 18 March. No contractor or date is booked yet. We will update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord request does not approve any spend or contractor.
- No contractor assigned or visit booked.
- The tenant message promises no date.

## Remaining work
- Landlord decision (owner: landlord/property manager Maya)
- Then assign contractor or record own contractor and get name/date
- Chase on 18 March if still silent; escalate P3 if still no answer

## Missing or unavailable information
- Landlord's written decision
- Garden photos unavailable
- Whether Harbour Compliance or Oakley's contractor is the route

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance, but events 014-016 point to the landlord's own contractor and the landlord never replied. Treated as no approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate. No recorded landlord decision; the note of £500+VAT approval (event 009) is unsupported and conflicts with notes about the landlord's own contractor. The landlord has not responded. The tenant chased on 13 March.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord for a written route decision by 18 March (done); tenant updated by email; chase by SMS/phone on 18 March.

**3. Does anything need a human decision, and why?**

Not yet. The decision is the landlord's. If they are still silent after the 18 March chase, escalate P3 to maintenance, and the property manager can try a call.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Garden clearance, levelling and gravel at Flat 25, 1… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 says landlord approved £500+VAT, Harbour Compliance; events 0… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written route decision (our c… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-18","purpose":"Chase landlord by SMS/phone if no reply; update tenant","pa… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
