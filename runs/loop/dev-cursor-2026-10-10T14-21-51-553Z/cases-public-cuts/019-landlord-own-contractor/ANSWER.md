# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has stalled for two months at the landlord gate; records conflict on whether the landlord approved our contractor or is using their own. I asked the landlord for one clear written decision by 17 March, updated the tenant, noted the conflict and put the job on dated hold.

## Where the case stands
Landlord approval gate; no recorded landlord decision; held waiting for landlord until 2025-03-17. Tenant waiting for an update.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm route (our contractor £500+VAT or own contractor, and whether theirs has attended) by 17 March | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 17 March | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Please confirm in writing how the back garden work at Flat 25 should go ahead. Our notes say a £500+VAT quote was approved (Harbour Compliance), but other notes suggest your own contractor may be quoting or attending. Has your contractor attended or will they? We don't want the work done twice. (£500)
> 
> Options: Yes, use our contractor (Harbour Compliance) at £500 + VAT; I will use my own contractor (please give name and date); Tenant not to be offered the work / other instruction
> 
> Update: Tenant chased us on 13 March for an update. We have tried to reach you by phone and email since 8 Feb. No work is booked yet. Please reply by 17 March, by email or text.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait. We are still waiting for the landlord to confirm how the garden work will go ahead (through our contractor or their own). No visit is booked yet. We have emailed them again today with a reply-by date of 17 March, and we will update you by 18 March whatever the answer.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; no contractor assigned
- The £500+VAT note is not landlord authority in the landlord's words
- Garden photos not seen

## Remaining work
- Landlord decision on route
- Then assign contractor or record own contractor, tell tenant
- Review 17 March; if still silent, chase by SMS/phone and consider P2 escalation

## Missing or unavailable information
- Landlord's written decision
- Whether landlord's own contractor attended or quoted
- Garden photos

## Conflicts between sources
- Event 009 says the landlord approved £500+VAT with Harbour Compliance, but the holds suggest the landlord's own contractor and no approval is recorded. Treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Unapproved at the landlord gate. The landlord has never replied. Notes conflict on whether £500+VAT was approved. Outstanding: the landlord's decision and the route.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/route question by email (A1), tenant update by email (A2), hold to 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Escalate if the landlord is still silent after the 17 March chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Please confirm in writing how the back garden work a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; holds (010-… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Written confirmation of route (our contractor £50… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
