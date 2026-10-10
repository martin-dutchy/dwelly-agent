# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job has stalled for two months awaiting the landlord, who has never replied. Records conflict on whether a £500+VAT quote was approved. I asked the landlord a single clear question by SMS, updated the tenant, noted the conflict and set a follow-up for 17 March.

## Where the case stands
Landlord approval gate; ticket at init, on hold. No recorded landlord decision. Waiting on landlord (SMS sent, reply by 17/03). Tenant told.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord by SMS whether we instruct our contractor (£500+VAT) or they use their own, with name/date, reply by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord route unconfirmed, no date, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on landlord reply 17 March | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Jenkins (landlord) via sms, agency landlord record** (verified)

> - For the back garden at Flat 25, 185 Copperfield Walk (clearance, levelling, gravel): do you want us to instruct our contractor (quote £500 + VAT), or are you arranging your own contractor?
> - If your own contractor: their name and a date they will attend, and has anyone already attended?
> - Please reply by 2025-03-17.
> 
> Why: No landlord reply on file. Notes say a £500+VAT quote was approved, but there is no recorded words from the landlord, and other notes suggest a contractor of the landlord's side. We cannot instruct anyone until clear.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email; tenant call event 018)** (verified)

> Hello, thanks for chasing, and sorry for the wait on the garden. We still don't have a clear answer from the landlord on who will do the work. We have sent them a text today asking whether they want us to arrange it or will use their own contractor, and asked for a reply by 17 March. We can't give a date for the work yet. We will update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved
- The note about £500+VAT approval is not the landlord's own words and is not treated as authority
- Nothing here confirms scope, cause or who pays

## Remaining work
- Landlord to answer route question (owner: landlord/Maya Palmer)
- Record decision and assign or await own contractor
- Garden photos still unavailable; request again if needed
- If no reply by 17/03, escalate P3 maintenance

## Missing or unavailable information
- Landlord's explicit decision
- Garden photos
- Whether Harbour Compliance or the landlord's contractor attended or quoted

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but the landlord never replied and later notes say we are still waiting. Treated as no approval.
- Events 015/016 refer to Oakley's contractor, which suggests a landlord-side route, against Harbour Compliance in event 009.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

At the landlord approval gate, on hold. The landlord has not replied since January. Notes claim an approved £500+VAT quote, but nothing in the landlord's own words supports it. The route (our contractor or their own) is unknown.

**2. What is the next action, for whom, via which channel?**

SMS to the landlord asking which route, reply by 17 March (second channel after the earlier email); email update to the tenant; follow-up set for 17 March.

**3. Does anything need a human decision?**

Not yet. This is a routine job and the landlord is being chased. If there is still no reply by 17 March, escalate P3 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","questions":["For the back garden… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email; tenant call event 018)",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance, but no land… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-03-17","purpose":"Check landlord reply on route (our contractor vs own); if none, escalate P3 and update tenant by 18/03","t… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
