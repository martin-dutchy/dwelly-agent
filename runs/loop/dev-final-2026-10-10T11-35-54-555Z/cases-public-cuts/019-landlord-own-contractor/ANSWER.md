# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job stalled since January with the landlord silent. The note of a £500+VAT approval is not backed by the landlord's own words. I re-asked the landlord a clear question, updated the tenant and set a hold to 17 March.

## Where the case stands
Intake/landlord approval gate. No landlord decision recorded. Ticket on hold waiting for landlord until 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no: our contractor up to £500+VAT, or own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no date yet, review 17 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-03-17 then chase by phone/escalate | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk. Our notes show a £500 + VAT quote but no written approval from you. Please reply yes or no: may we instruct our contractor (Harbour Compliance) up to £500 + VAT? Or tell us if you will use your own contractor, with their name and a date. (£600)
> 
> Options: Yes, instruct our contractor up to £500 + VAT (£600 inc VAT); I will arrange my own contractor (please give name and date); Decline the works

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing today. Sorry for the wait. We still need the landlord's written go-ahead for the garden work, and we have just emailed them again with a clear yes/no question. We can't give a date until they answer. We will update you as soon as we hear, and we will review this again on 17 March.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve spend or assign a contractor.
- Nothing is booked and no date is promised.

## Remaining work
- Landlord decision outstanding (owner: property manager Maya).
- If no reply by 17 March, phone the landlord and escalate P3 to maintenance/management.
- Garden photos were unavailable and have not been seen.

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Landlord's second contact channel

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but events 010-017 show the agency still chasing the landlord. I treated it as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. No recorded landlord decision. A £500+VAT quote is noted, but approval is hearsay and the later holds contradict it. The landlord has not replied to calls or email.

**2. What is the next action, who is it for, and through which channel?**

Written yes/no request to the landlord (Jenkins) by email, plus a status update to the tenant by email. Both done.

**3. Does anything need a human decision, and why?**

Not yet. It is routine work. If the landlord stays silent past 17 March, a human should consider a P3 escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden clearance, levelling and gravel at Flat … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting written yes/no from landlord (our contra… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
