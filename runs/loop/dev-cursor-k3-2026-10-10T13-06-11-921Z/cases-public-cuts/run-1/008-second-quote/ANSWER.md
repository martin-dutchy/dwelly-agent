# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote for comparison. I recorded the first estimate, moved the job to double_quotation, told the landlord, and held the job with a review on 9 April. No human decision is needed.

## Where the case stands
Stage double_quotation. First estimate (Alder Compliance £1,370, no VAT itemised) recorded as Q-101, not approved. Landlord asked for one other subcontractor to quote; agency is sourcing it. Review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first estimate on hold, scope differences flagged, update by 9 April | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 9 April while the second provider is sourced | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we are now arranging a second quote from another contractor for comparison, using the same scope and the check-out report. The first estimate stays on hold and nothing will go ahead until you approve. One thing to flag: the first estimate leaves the bedroom carpet in place and includes a new bathroom tap, which differs from our original request, so we will ask the second contractor to price the original list. If you have a preferred contractor, tell us. We will update you by 9 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- Moving to double_quotation does not mean a second contractor has been instructed yet
- No work or visit is booked

## Remaining work
- Source a second contractor quote on the original scope (ops, by 9 April)
- Send both quotes to landlord for decision
- Chase Alder Compliance if needed to clarify carpet/tap scope and VAT

## Missing or unavailable information
- No second contractor named in the case; no VAT status on estimate
- Attachment-04 invoice listed but not seen in history

## Conflicts between sources
- Estimate omits bedroom carpet replacement and includes tap replacement, unlike original request.
- Inspection report dated 5 January 2026 but signed 3 April 2025, after the case dates; treated as the report on file.
- Landlord email says 'Morning' but arrived in the evening; immaterial.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Estimate of £1,370 from Alder Compliance sent to landlord; landlord wants one more quote. Second quote outstanding; no approval given.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being sourced (sent). Ticket moved to double_quotation and held to 9 April.

**3. Does anything need a human decision, and why?**

No. Second quote is routine; the landlord decides on the quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced for comparison at landlord's request; fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A5 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
