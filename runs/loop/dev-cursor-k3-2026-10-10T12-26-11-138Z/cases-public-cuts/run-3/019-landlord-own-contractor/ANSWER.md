# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request stuck at landlord approval since January. A note says a £500+VAT quote was approved, but there is no recorded landlord words. I sent the landlord an SMS yes/no, told the tenant, and held the ticket with a review on 18 March.

## Where the case stands
Landlord approval gate, ticket at init, on hold waiting for landlord. No recorded landlord decision. Landlord asked by SMS; review 2025-03-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking Jenkins for a yes/no on our contractor at £500+VAT, or own contractor | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, no date, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up to 2025-03-18 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, it's Northbridge Lettings about the back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk. Our notes show a £500 + VAT quote but we have no written approval from you. Can you reply yes or no: do you approve us instructing our contractor at £500 + VAT, with payment details to follow? Or reply if you'd rather use your own contractor. We've tried calling and emailing, so a text reply is fine. Thanks, Maya

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the garden. We're still waiting for the landlord to confirm how they want this done, and we've just sent them a text as well as our earlier email and calls. We can't book any work until they reply, so we can't give a date yet. We'll chase again and update you by 18 March. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved
- The SMS does not establish landlord approval
- Garden condition and responsibility unverified; photos unavailable

## Remaining work
- Await landlord reply and record decision
- Assign Harbour Compliance only after recorded approval
- If silent by 18 March, escalate P3 for landlord contact

## Missing or unavailable information
- Landlord's written decision
- Tenant's garden photos (unavailable)
- Whether funds up front were requested/received

## Conflicts between sources
- Event 009 says landlord approved the quote, but event 010 says get funds up front and later events say still waiting for the landlord; no landlord words on record, so approval was treated as not established.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

At the landlord gate. A £500+VAT quote is noted as approved (event 009) but there is no landlord statement on record and the landlord hasn't responded to the email or calls. Outstanding: a clear landlord decision, then assignment.

**2. What is the next action, who is it for, and through which channel?**

SMS to Jenkins (landlord) asking for a yes/no, plus an email to the tenant with status. Hold and follow-up set for 18 March.

**3. Does anything need a human decision?**

Not yet. This is routine and the landlord has now been contacted on a second channel. If still silent after 18 March, escalate to maintenance P3.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Asked landlord by SMS for yes/no approval of £500… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-18","purpose":"Chase landlord decision; update tenant; consider escalation… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
