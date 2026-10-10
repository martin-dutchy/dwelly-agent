# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has stalled for two months awaiting landlord approval; the landlord has never replied. I asked the landlord a clear yes/no question with a reply date, updated the tenant, noted the conflicting record and held the job to 18 March.

## Where the case stands
Landlord approval gate; no recorded landlord decision. Waiting on landlord (hold to 2025-03-18). Tenant told.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for explicit yes/no on Harbour Compliance £500+VAT or own contractor, reply by 2025-03-18 | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, no date yet, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-03-18 then chase landlord on a second channel | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord) (landlord)** (verified)

> Tenant at Flat 25, 185 Copperfield Walk asks for the back garden to be cleared of rubbish, levelled and gravelled. Our notes mention a £500 + VAT quote from Harbour Compliance, but we hold no written approval from you. Do you approve us instructing Harbour Compliance (yes/no), or will you arrange your own contractor? Please reply by 2025-03-18.
> 
> Options: Yes, instruct our contractor Harbour Compliance at £500 + VAT; I will arrange my own contractor (please send name and date); No, not proceeding

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing about the back garden. We are still waiting for the landlord's decision, and we have just sent them a clear yes/no question with a reply date of 18 March. Until they answer we cannot book any work or give a date. We will update you by 18 March at the latest. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve any spend or contractor
- Nothing is booked; no date promised to the tenant
- Event 009 note is not treated as landlord authority

## Remaining work
- Landlord decision (agency awaiting)
- On approval: assign contractor, book visit
- If silent by 18 March: chase on SMS/phone and consider escalation P3

## Missing or unavailable information
- Landlord's written decision
- Tenant photos unavailable
- Whether the quote's scope matches the request

## Conflicts between sources
- Event 009 says landlord approved the quote; events 010-018 show landlord unreachable and approval outstanding. Trusted the later events and the lack of any landlord words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. No landlord decision is recorded; a note says £500+VAT was approved but there is no evidence and later events show approval is still awaited. Outstanding: landlord decision, then contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Approval request to the landlord (via the landlord record, A1) and an update to the tenant by email (A2); hold until 18 March, then chase on a second channel.

**3. Does anything need a human decision, and why?**

Not yet. It is a routine job with a slow landlord. If still silent after the 18 March chase, escalate as P3.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins (landlord)","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant at Flat 25, 185 Copperfield Walk a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 note says landlord approved £500+VAT with Harbour Compliance, but th… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on Harbour Compliance £5… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
