# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works request has been stuck at the landlord gate since January because the landlord is silent. I sent a fresh approval request, updated the tenant, and set a hold and follow-up for 17 March.

## Where the case stands
Landlord approval gate, ticket at init, on hold waiting for landlord. No contractor assigned. Landlord has never replied since 17 Jan; calls have failed. Review 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written decision on route (our contractor with spend cap, own contractor, or decline) | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: still awaiting landlord, nothing booked, next update by 17 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up to 17 March to chase landlord on a second channel | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Tenant asks for the back garden to be cleared of rubbish and construction waste, levelled and gravelled. Do you want us to instruct our contractor (a £500 + VAT quote is noted on file, but we have no written approval from you), will you use your own contractor, or something else? Please reply by text or email, or call Maya.
> 
> Options: Approve our contractor, stating the maximum spend including VAT; You arrange your own contractor (please give name and date); Decline the works

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord's decision and haven't been able to reach them by phone. We have just sent them a fresh request by another route. Nothing is booked yet, so we can't give a date. We will update you by Monday 17 March, even if we have no answer by then. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve any spend or contractor.
- The tenant update does not promise a date or confirm the works will go ahead.
- The £500+VAT figure is a note only: no quote document is on file.

## Remaining work
- Landlord decision outstanding (owner: property manager Maya)
- If approved: record decision, assign contractor within the cap; if own contractor: get name and date
- Clarify the event 009 note against the hold note
- Escalate P2 if landlord still silent after the 17 March chase

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- The quote document and who issued it (note names Harbour Compliance)

## Conflicts between sources
- Event 009 says the landlord approved a £500+VAT quote, but later holds say we are still waiting for the landlord and no landlord words are on file. I treated approval as not given.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate with no authorised route. Landlord decision is outstanding; no contractor is assigned.

**2. What is the next action, who is it for, and through which channel?**

Approval request to the landlord via the landlord record (APR-101), tenant email update (MSG-102), and a chase on 17 March by phone/SMS.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and the chase cadence is still running. If the landlord remains silent after 17 March, escalate. Maya should also reconcile the conflicting 'landlord approved' note.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant asks for the back garden to be cleared of rub… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written decision on route and… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","purpose":"Chase landlord by phone/SMS; update tenant; consider escala… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
