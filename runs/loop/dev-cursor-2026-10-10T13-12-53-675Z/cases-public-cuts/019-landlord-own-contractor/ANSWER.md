# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord has been silent since January. An internal note claims approval of a £500+VAT quote, but there is no landlord wording on file. I sent a second-channel SMS chase with a deadline, updated the tenant, and held the ticket to 18 March.

## Where the case stands
At landlord approval gate, on hold (Waiting for Landlord) to 2025-03-18. Landlord has never replied; no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking Jenkins for a yes/no on the £500+VAT quote or own contractor by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant no work is booked, landlord answer awaited, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 18 March for landlord reply | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk. We have not had your written go-ahead. Our contractor's quote is £500 + VAT. Please reply YES to approve it, or tell us if you will use your own contractor, by 17 March. We have emailed before (17 Jan, 8 Feb) and tried calling.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord's decision, so no work is booked yet. We have just sent them a further message asking for an answer by 17 March. We will update you by 18 March at the latest, and sooner if they reply. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or the contractor
- The chase does not confirm the garden is the landlord's responsibility or who pays
- Event 009 note is not treated as landlord authority

## Remaining work
- Landlord decision (approve, own contractor or decline)
- If approved: record decision, assign contractor Harbour Compliance, book visit
- If no reply by 18 March: escalate P3 maintenance for contact route/ownership
- Garden photos unavailable; not seen

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Landlord contact details are not visible in the case

## Conflicts between sources
- Event 009 says landlord approved £500+VAT, but events 010-017 show the landlord never replied. Treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine garden job still at the landlord approval gate. Landlord has not replied; an unverified note says £500+VAT was approved. Nothing is assigned or booked.

**2. What is the next action, who is it for, and through which channel?**

SMS chase to the landlord (done) with a reply needed by 17 March; tenant told by email; hold to 18 March.

**3. Does anything need a human decision, and why?**

Not yet. If the landlord is still silent at the 18 March review, escalate P3 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord yes/no on £500+VAT quote or … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT; later holds (010, 015, 017) show la… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
