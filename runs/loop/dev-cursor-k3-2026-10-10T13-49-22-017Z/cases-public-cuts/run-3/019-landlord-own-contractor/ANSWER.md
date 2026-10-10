# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine garden job stuck for two months at the landlord gate; landlord never answered email or calls. I sent a one-question SMS and a formal approval request with a 18 March deadline, updated the tenant, noted the record conflict and set a hold and follow-up.

## Where the case stands
Ticket at init, landlord approval gate, on hold (Waiting for Landlord, review 2025-03-18). Landlord has never replied; no recorded decision; route (our contractor vs landlord's own) unclear.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS to landlord asking yes/no on Harbour Compliance £500+VAT or own contractor (name/date), reply by 18 March | Jenkins, landlord | sms | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Formal approval request (cap £600 incl VAT) with own-contractor option | Jenkins, landlord | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no visit booked, next update by 19 March | Tenant | email | A3 ✅ |
| 4 | WAIT | Hold and follow-up until 18 March | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Our records conflict on the garden job at Flat 25, 185 Copperfield Walk (clearing rubbish, levelling, gravel). One note says a £500+VAT quote from Harbour Compliance was approved; other notes mention a contractor arranged via Oakley. Please reply YES/NO: do you approve our contractor Harbour Compliance at £500 + VAT (up to £600 incl. VAT)? If you are using your own contractor, please give their name, whether they have visited, and a date. Please reply by 2025-03-18. (£600)
> 
> Options: Yes - approve Harbour Compliance at £500 + VAT, cap £600 incl. VAT; I will arrange my own contractor (please give name and date); No - do not proceed with the garden work

**A2 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings here. We've emailed and tried calling about the garden at Flat 25, 185 Copperfield Walk. Quick question: do you approve us using Harbour Compliance at £500 + VAT, or are you arranging your own contractor (if so, name and date please)? Please reply by 18 March. Thanks.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We're still waiting for the landlord to confirm how the work will be arranged (our contractor or their own). We've now emailed and texted them with a reply-by date of 18 March. No visit is booked yet. We'll update you by 19 March at the latest, sooner if we hear back. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; no contractor assigned
- The £500+VAT note (event 009) is an internal note, not the landlord's recorded words, so is not treated as authority
- Whether the garden is the landlord's responsibility or part of the tenancy is not decided

## Remaining work
- Landlord decision (agency owner/Maya Palmer) due 18 March
- If no reply by 18 March, escalate P3 maintenance
- Garden photos unavailable; request again if needed
- Clarify who Oakley is and whether their contractor already quoted/attended

## Missing or unavailable information
- Landlord decision/words
- Identity and status of Oakley's contractor
- Garden photos (unavailable)

## Conflicts between sources
- Event 009 says landlord approved £500+VAT, but no landlord words exist and event 010/017 say funds upfront and still waiting for landlord; events 015/016 suggest Oakley's contractor route. Treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval gate; landlord silent since January. Conflicting notes on a £500+VAT Harbour Compliance quote and a possible own-contractor route. No approval recorded; nothing booked.

**2. What is the next action, who is it for, and through which channel?**

Landlord Jenkins: SMS and approval request asking yes/no on Harbour Compliance or own contractor, reply by 18 March. Tenant updated by email.

**3. Does anything need a human decision, and why?**

Not yet. This is routine and the landlord chase is in progress; escalate P3 if no reply by 18 March.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Our records conflict on the garden job at Flat 25, 1… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Records conflict: event 009 says £500+VAT quote approved, Harbour Compliance to go ahead… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on Harbour Compliance £5… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-18","purpose":"Review landlord reply; if none, escalate P3 and update tena… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
