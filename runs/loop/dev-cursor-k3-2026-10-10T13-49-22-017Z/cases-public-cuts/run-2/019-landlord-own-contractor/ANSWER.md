# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stalled for two months awaiting landlord approval with conflicting notes. I sent the landlord a clear yes/no SMS with a 17 March deadline, updated the tenant, noted the conflict and set a hold and follow-up for 17 March.

## Where the case stands
Stuck at landlord approval gate (stage init, on hold). No recorded landlord decision; landlord has never replied since Jan. Route unclear: our contractor (£500+VAT note) vs Oakley's contractor. Nothing assigned or booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS yes/no question on our contractor (up to £500+VAT) or own contractor details/attendance, reply needed by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no visit booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up to 17 March; then phone landlord and escalate P3 if silent | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya's team at Northbridge Lettings re the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). Our notes conflict: one says you approved a £500+VAT quote, another says Oakley's contractor may quote. Please reply YES or NO by 17 March: do you approve us instructing our contractor for this work (up to £500+VAT)? If you're using your own contractor, please give their name, whether they have already attended, and a date. Thanks.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing about the back garden. Sorry for the wait. We're still waiting for the landlord to confirm how the work will be arranged, and we've just sent them a clear yes/no question by text, asking for an answer by 17 March. No contractor visit is booked yet, so please don't expect anyone until we confirm a date. We'll update you by 18 March. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not approve any spend or contractor
- The £500+VAT note is not landlord authority and is not treated as approval
- Garden pictures were unavailable so condition is unverified

## Remaining work
- Landlord answer on route and approval (Maya/agency)
- If silent after 17 March, phone and consider P3 management escalation
- Quote/contractor assignment only after recorded landlord decision
- Garden pictures to be re-requested if needed

## Missing or unavailable information
- Landlord's decision/approval
- Whether Oakley's contractor or Harbour Compliance attended or quoted
- Garden photos unavailable

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance, but events 010-018 say still waiting for landlord approval and Oakley's contractor was to quote; treated as no approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; no recorded landlord decision, landlord unresponsive since January; conflicting notes on route and approved quote; tenant chased 13 March.

**2. What is the next action, who is it for, and through which channel?**

SMS to landlord Jenkins asking yes/no for our contractor or own contractor details (reply by 17 March); email update to tenant; hold with review 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine chase on a second channel is done; if the landlord stays silent after 17 March, escalate P3 to management.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 says landlord approved £500+VAT quote (Harbour Compliance) bu… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on our contractor (£500+… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Jenkins, landlord","purpose":"Check reply; if none, phone lan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
