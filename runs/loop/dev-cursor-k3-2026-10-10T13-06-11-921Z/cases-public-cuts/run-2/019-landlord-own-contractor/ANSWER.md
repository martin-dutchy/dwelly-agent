# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stuck for 8 weeks with no landlord reply. I chased the landlord by SMS with a clear yes/own contractor/no question, updated the tenant, and put the job on hold with a review on 18 March.

## Where the case stands
At landlord approval gate, ticket in init, on hold waiting for landlord; review 2025-03-18. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS chase to landlord with a clear three-way decision question | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord decision, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold waiting for landlord, review 2025-03-18 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings here about the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). We emailed on 17 Jan and 8 Feb and haven't had a reply. Our notes mention a £500 + VAT quote, but we have no written approval from you. Please reply with one of: (1) YES, go ahead with our contractor up to £500 + VAT; (2) you'll arrange your own contractor (name and date please); or (3) no. The tenant is chasing us.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing, and sorry for the wait on the garden. We still need the landlord's decision before any work can be booked. We've just tried them again by text as well as email. We'll update you by 18 March whatever happens. We can't give a date for the work until the landlord has agreed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or assigns a contractor.
- The chase does not establish the landlord's decision.
- The tenant update gives no work date.

## Remaining work
- Landlord decision outstanding (agency owns chase).
- If still silent at review on 18 March, escalate to a human for another route to reach the landlord (P3 maintenance).
- Garden photos were unavailable; request again if needed for a quote.

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Written record of the £500+VAT quote

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but no landlord words are on file and later holds say we are still waiting. I treated it as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. The landlord has never replied (emails 17 Jan and 8 Feb). A note says a £500+VAT quote was approved, but there is no landlord wording on file and later holds say we are still waiting. The tenant is chasing.

**2. What is the next action, who is it for, and through which channel?**

SMS chase to the landlord (A1), tenant email update (A2), and a hold to 18 March (A3).

**3. Does anything need a human decision, and why?**

Not yet. It's a routine job and the landlord has been chased on a second channel. If there is still no reply by 18 March, escalate P3.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written decision (our contrac… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 note says landlord approved £500+VAT quote (Harbour Compliance), but… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
