# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has waited on the landlord since January. Our notes say the landlord approved £500+VAT, but we hold nothing in their words, and phone calls have gone unanswered. I asked the landlord for a clear written decision, updated the tenant, and set a hold and follow-up for 2025-03-17.

## Where the case stands
Landlord approval gate, ticket at init and on hold waiting for landlord. No landlord decision in the landlord's own words. The landlord has not replied since January.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for written decision: our contractor (£500+VAT) or their own | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, no date yet | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up 2025-03-17 to chase on second channel | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Please confirm in writing whether we may instruct our contractor (Harbour Compliance, quoted £500 + VAT) for the back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk, or whether you will arrange your own contractor. Our notes say approval was given by phone but we hold nothing in your words, and we have been unable to reach you by phone. (£600)
> 
> Options: Yes, instruct Harbour Compliance at £500 + VAT (agency asks for funds up front); I will use my own contractor (please send name and date); Decline the work

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord to confirm in writing how the work will be arranged. We have written to them again today and will update you as soon as we hear. We can't give a date until that is confirmed. Apologies for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve spend or assign a contractor.
- The tenant update promises no date.
- The event 009 note that the landlord approved is not the landlord's words, so it is not treated as authority.

## Remaining work
- Landlord decision outstanding (agency owns the chase).
- If still silent after the 2025-03-17 chase, escalate P3 to maintenance.
- Garden photos unavailable; request them if work proceeds.
- Funds up front from landlord, per the event 010 hold.

## Missing or unavailable information
- Landlord's written decision
- Tenant's garden photos (unavailable)
- Landlord contact details are not on file

## Conflicts between sources
- Event 009 says the landlord approved the work, but events 010-018 show no contact and the landlord is still being chased. I trusted the lack of any recorded landlord words.
- The case name says own contractor, but nothing in the history shows the landlord choosing that.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at the landlord approval gate (ticket at init, on hold). The landlord's written decision is outstanding. A £500+VAT quote exists, but approval is only a hearsay note. Funds up front were also requested.

**2. What is the next action, who is it for, and through which channel?**

Written approval request to the landlord by email (A1), tenant update by email (A2), and a chase on a second channel on 2025-03-17 (A4).

**3. Does anything need a human decision, and why?**

Not yet. This is a routine wait. If the landlord is still silent after the chase, escalate P3 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Please confirm in writing whether we may instruct ou… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Written landlord decision requested 2025-03-13 (o… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Landlord (Jenkins)","purpose":"Chase landlord on second chann… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
