# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stuck since January awaiting the landlord. A note says £500+VAT was approved, but there is no written approval and the hold says funds were wanted up front. I re-asked the landlord for a clear written decision, updated the tenant and set a hold with review date 18 March.

## Where the case stands
Stuck at landlord approval gate (stage init). No written landlord decision ever received; landlord not reached since Jan. Held, review 2025-03-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no: our contractor up to £500+VAT, or own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: nothing booked, waiting on landlord, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up to chase landlord by phone on 18 March | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Tenant at Flat 25, 185 Copperfield Walk asks for garden clearance of rubbish and construction waste, levelling and gravel. Our notes mention a £500 + VAT quote, but we have no written approval from you. Please reply in writing (email or text) with one answer: (a) yes, go ahead with our contractor up to £500 + VAT, or (b) you will arrange your own contractor (please send their name and a date). (£600)
> 
> Options: Yes, use our contractor up to £500 + VAT; I will arrange my own contractor (send name and date); Tenant to deal with it themselves

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord to confirm how they want it handled, and nothing is booked yet. Today we have sent them a clear yes/no question by a second route. We will update you by 18 March whatever happens. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve any spend or assign a contractor
- Nothing is booked; no visit date exists
- Does not establish the garden is the landlord's responsibility to improve (gravel/levelling may be an upgrade, not a repair)

## Remaining work
- Obtain written landlord decision and record it
- Then assign Harbour Compliance or log landlord's own contractor
- Chase by phone 18 March; escalate if still silent
- Tenant's garden photos unavailable; ask again if needed

## Missing or unavailable information
- Written landlord decision
- Garden photos
- Whether the £500+VAT quote was ever formally approved or funds received

## Conflicts between sources
- Event 009 says landlord approved £500+VAT, but no landlord words are on file and event 010 says to get funds up front; treated as unverified.
- Ticket id suggests own contractor, but the landlord has not said so.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. No written landlord decision; landlord unreachable. Hearsay note of £500+VAT approval is unverified. Nothing assigned or booked.

**2. What is the next action, who is it for, and through which channel?**

Written yes/no approval request to the landlord (APR-101, via landlord record), update to the tenant by email, hold and follow-up for 18 March with a phone chase.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job, so no escalation now. If the landlord stays silent after the 18 March chase, escalate for a decision on how to proceed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant at Flat 25, 185 Copperfield Walk asks for gar… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting written landlord decision: our contracto… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-18","purpose":"Chase landlord by phone; update tenant","party":"Landlord"} | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
