# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job has stalled since January with no recorded landlord decision; notes conflict on whether £500+VAT was approved. I chased the landlord by SMS with a clear question and deadline, updated the tenant, noted the conflict and put the job on hold to 18 March.

## Where the case stands
Landlord approval gate; ticket at init, on hold waiting for landlord until 2025-03-18. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS to landlord asking yes/own contractor by 18 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no visit booked, next update by 19 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 18 March for landlord reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). We couldn't reach you by phone or email. Our notes show a £500+VAT quote from Harbour Compliance, but we have no written approval from you. Please reply by 18 March with either: (1) YES, go ahead with Harbour Compliance up to £500+VAT, or (2) you will use your own contractor (please give their name and a date). The tenant is chasing us.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait. We are still waiting for the landlord to confirm how the garden work will go ahead, and no visit is booked yet. We have just messaged them again by text and asked for an answer by 18 March. We will update you by 19 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval is established; the £500+VAT figure is only an agency note.
- Chasing does not commit any spend or book any contractor.
- Garden pictures were unavailable and not seen.

## Remaining work
- Landlord decision (approve Harbour Compliance / own contractor) - landlord
- Record decision, then assign or wait for own contractor - agent
- If still silent after 18 March, consider escalation to human (landlord unreachable since January) - agent

## Missing or unavailable information
- Landlord's written decision
- Whether Harbour Compliance quote was actually approved or Oakley's contractor is the route
- Garden photos

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but later holds say we are still waiting for the landlord and want funds up front. No landlord words are recorded, so I treated it as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. No written landlord decision exists; the landlord has been unreachable. Outstanding: landlord's yes or own-contractor choice, then work, which is unscheduled.

**2. What is the next action, who is it for, and through which channel?**

SMS chase to the landlord (done) and email update to the tenant (done); hold until 18 March.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and the landlord has only had one chase on a second channel today. If still silent after 18 March, a human should consider contacting the landlord another way.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT Harbour Compliance; events 010-017 s… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes (Harbour Complian… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
