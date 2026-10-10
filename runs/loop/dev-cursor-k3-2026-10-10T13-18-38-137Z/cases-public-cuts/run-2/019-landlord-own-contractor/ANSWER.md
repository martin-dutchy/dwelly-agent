# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has been stuck since January because the landlord has not responded. A note says the landlord approved a £500+VAT quote, but later holds contradict it and there are no landlord words on record. I treated it as unapproved, sent the landlord an SMS with a deadline, updated the tenant and put the ticket on hold with a review date.

## Where the case stands
At the landlord approval gate, on hold. The landlord has not replied since January. No contractor is assigned. Review is due 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Sent an SMS asking for an explicit yes, own contractor, or decline by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant we are still waiting on the landlord and will update them by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Held the ticket with a review date of 17 March | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re Flat 25, 185 Copperfield Walk: the tenant has asked for the back garden to be cleared of rubbish, levelled and gravelled. We have not had your reply by phone or email. Please reply YES to approve our contractor (Harbour Compliance, quoted £500 + VAT), or tell us you will use your own contractor, or that you decline. We need your answer by Monday 17 March please.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for calling about the back garden. We're sorry for the wait. We're still waiting for the landlord's decision and haven't been able to reach them by phone or email, so we've now texted them asking for an answer by Monday 17 March. No work is booked yet and we can't give a date until the landlord decides. We'll update you by Tuesday 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked. The chase does not establish landlord consent, the cost, or who pays.
- The tenant's request that the garden be treated as part of the tenancy is unverified.

## Remaining work
- Landlord decision. Owner: agency, on review 2025-03-17.
- If the landlord stays silent after 17 March, escalate. Landlord reachability is a possible issue for the property manager.
- Record the landlord's decision with their exact words, then assign a contractor or arrange their own.
- Garden photos are unavailable and still need to be obtained.

## Missing or unavailable information
- Landlord's explicit decision
- Garden photos (unavailable)
- Written quote document

## Conflicts between sources
- Event 009 says the landlord approved the quote, but events 010-017 say we are still waiting for the landlord. I trusted the later holds, because no landlord words are on record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is routine and waiting at the landlord gate. There is no verified landlord decision. The £500+VAT Harbour Compliance quote in the event 009 note is unverified, and the quote document is not in the case. The tenant chased on 13 March.

**2. What is the next action, who is it for, and through which channel?**

An SMS to the landlord (A1) asking for a clear decision by 17 March, plus an email update to the tenant (A2). The ticket is on hold until 17 March (A4).

**3. Does anything need a human decision, and why?**

Not yet. This is a routine chase. If the landlord is still silent after 17 March, escalate to the property manager.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 note says landlord approved £500+VAT quote (Harbour Compliance), but… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting explicit landlord decision (approve our … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
