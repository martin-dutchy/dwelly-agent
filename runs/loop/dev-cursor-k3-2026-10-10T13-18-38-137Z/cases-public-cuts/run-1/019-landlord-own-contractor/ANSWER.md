# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine garden job has stalled for two months with no landlord reply. I chased the landlord by SMS (earlier contact was email), updated the tenant, noted the approval conflict, and put the job on hold with review on 17 March.

## Where the case stands
At landlord approval gate; ticket in init, on hold waiting for landlord; no recorded landlord decision; no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS chase asking for a 1/2/3 decision (our contractor, own, tenant fix) and cap by 2025-03-17 | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, no work booked, next update by 17 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold with review 2025-03-17 and follow-up | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). We still need your decision: (1) we instruct our contractor, (2) you arrange your own contractor, or (3) tenant tidies it. Our notes mention a £500+VAT quote, but we have no written approval from you. Please reply by 2025-03-17 with 1, 2 or 3 (and a cap if any). The tenant is chasing.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord to tell us how they want it handled, and we have just chased them by text. No work can be booked until they decide. We will update you by 17 March at the latest. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The chase does not establish landlord approval or any route
- The £500+VAT figure is from an internal note only, not a quote I have seen
- Nothing is booked or assigned

## Remaining work
- Landlord decision outstanding (agency/Maya)
- If none by 2025-03-17, escalate P3 maintenance for a human to reach the landlord by another route
- Garden photos unavailable

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Written quote document

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote; there is no landlord message or decision on record and later holds say the landlord is unreachable. Treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stuck at the landlord gate since January. Landlord has never replied in writing. Event 009 claims approval of a £500+VAT quote but there is no recorded decision, so I treat it as unapproved. Tenant is chasing.

**2. What is the next action, who is it for, and through which channel?**

SMS chase to the landlord (decision by 17 March) and an email update to the tenant; hold and follow-up set for 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine job, and a second-channel chase was only just sent. If the landlord is still silent on 17 March, escalate P3 maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT quote (Harbour Compliance), but no l… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord's written decision: our cont… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Landlord","purpose":"Check for landlord decision; if none, es… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
