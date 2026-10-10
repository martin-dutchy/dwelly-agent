# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job has been stuck at landlord approval since January; the landlord never replied and the 'approved' note has no landlord words behind it. I asked the landlord a clear yes/no, updated the tenant and set a review for 18 March.

## Where the case stands
Landlord approval gate; ticket at init, on hold. No recorded landlord decision. Waiting on landlord (asked 2025-03-13, review 2025-03-18). Tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a yes/no: instruct Harbour Compliance at £500+VAT, or own contractor (name/date) | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord go-ahead, no date promised, next update by 2025-03-18 | Tenant | email | A2 ✅ |
| 3 | WAIT | Review landlord reply on 2025-03-18 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes say a £500 + VAT quote from Harbour Compliance was approved on 31 Jan, but we hold no written confirmation from you. Please reply yes or no: should we instruct Harbour Compliance at £500 + VAT? Or will you arrange your own contractor (if so, please give their name and a date)? (£600)
> 
> Options: Yes, instruct Harbour Compliance at £500 + VAT (cap £600 incl. VAT); I will arrange my own contractor (name and date please); Decline the work

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are sorry for the delay. We still need the landlord's written go-ahead, so today we have sent them a short yes/no question asking whether to use our contractor or whether they will arrange their own. We can't give a date for the work until they answer. We will check again on 2025-03-18 and update you then, sooner if they reply.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve spend or assign a contractor
- Tenant message promises no date
- The £500+VAT note is not treated as landlord authority

## Remaining work
- Landlord decision (record it with their exact words)
- Then assign contractor, visit, invoice, close
- If landlord silent on 2025-03-18, chase on another channel and escalate P3

## Missing or unavailable information
- Landlord's written decision
- Garden photos unavailable
- Which contractor (Harbour Compliance vs landlord's own)

## Conflicts between sources
- Event 009 says landlord approved the quote, but there is no landlord statement and later holds say still waiting; treated as not approved.
- Notes mention Oakley's contractor, while the landlord is called Jenkins; unclear who Oakley is.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; no recorded landlord decision, landlord unreachable since Jan. Outstanding: landlord decision on route (our contractor at £500+VAT or own), then work.

**2. What is the next action, who is it for, and through which channel?**

Yes/no approval request to the landlord (A1) and a status update to the tenant by email (A2); follow-up 2025-03-18 (A3).

**3. Does anything need a human decision, and why?**

Not yet; it is routine and the landlord has been asked. If still silent on 18 March after a second-channel chase, escalate P3 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-18","party":"Landlord","purpose":"Chase landlord decision on garden job; i… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT Harbour Compliance quote; events 010… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
