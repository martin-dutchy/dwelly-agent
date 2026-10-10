# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord has not replied since January, and the last message to them was on 8 Feb. Notes disagree on whether the £500+VAT quote was approved, so I treated it as unapproved. I sent the landlord a one-question approval request, updated the tenant, and held the ticket to 18 March.

## Where the case stands
Landlord approval gate; ticket at init, on hold waiting for landlord, review 2025-03-18. No landlord reply has ever been received.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a yes/no on instructing Harbour Compliance up to £600 inc VAT, or to name their own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord go-ahead, next update by 18 March, no date promised | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-03-18 | Jenkins, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes say a £500+VAT quote from Harbour Compliance was agreed, but we have no written confirmation from you. Do you approve us instructing Harbour Compliance up to £500+VAT (£600 inc VAT)? Yes or no please. Or tell us if you will use your own contractor. (£600)
> 
> Options: Yes, instruct our contractor up to £600 inc VAT; I will arrange my own contractor (please send name and date); No

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. Sorry for the wait. We still need the landlord's written go-ahead before any work can be booked, and we have just asked them again for a clear yes or no. We will chase again and update you by 18 March. We haven't got a date for the work yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or assigned; no visit is booked.
- The £500+VAT figure is from an internal note only; no quote document seen.
- Garden photos were unavailable and were not seen.

## Remaining work
- Landlord decision (agency, chase on review date)
- If approved, record the decision and assign contractor
- Possible second-channel chase or escalation if still silent at the review date
- Confirm whether garden work is a landlord repair responsibility

## Missing or unavailable information
- Landlord's written decision
- Quote document
- Garden photos
- Landlord's phone number is not visible, so the second-channel chase was not possible

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but events 010-017 show no landlord contact and funds outstanding. Treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is stuck at the landlord approval gate. The landlord has not responded in about two months, and the tenant chased on 13 March. A £500+VAT quote is noted, but no landlord approval is on record.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request has gone to the landlord (A1) and a status update to the tenant by email (A2). The ticket is held until 18 March (A3).

**3. Does anything need a human decision, and why?**

Not yet. The landlord is the decision-maker. If they stay silent past 18 March, escalate or chase on another channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on instructing… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT; later holds show no contact/funds. … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
