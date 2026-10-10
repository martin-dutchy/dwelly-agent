# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote for comparison. No other contractor is named, so I moved the job to double_quotation and sent the scope to the internal team. I told the landlord and resent the correct estimate, as the earlier email attached the wrong document. The job is on hold until 10 April.

## Where the case stands
Stage double_quotation. First estimate (Alder Compliance £1,370.00) with landlord. Landlord asked for a second quote. Waiting on the internal team to source a second contractor, review 2025-04-10. No approval, assignment or visit.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation | internal | internal | A1 ✅ |
| 2 | OTHER | Sent scope and attachment to the internal team to source a second itemised quote, reply by 2025-04-10 | Maya Langley / Operations team, internal | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Told landlord the second quote is being obtained, report back by 10 April, and resent the correct estimate (the earlier email had the wrong attachment) | Landlord | email | A3 ✅ |
| 4 | WAIT | Hold until second quote arrives, review 2025-04-10 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Maya Langley / Operations team (internal) via email, existing thread (event 003 email)** (verified)

> Job NBL-008-3466, Flat 5, 55 Lantern Quay. The landlord has asked for a second quote for comparison, so please source one more contractor, quote only. Scope, one priced line per item: (1) repaint bedroom, plus other rooms if needed; (2) replace burnt bedroom carpet; (3) replace bathroom flooring; (4) repair broken plug; (5) repair dripping bath tap; (6) repair damaged bathroom shelf. Please also price the bathroom boxing repaint or repair for water damage, as noted in the report. Attachment: attachment-01-check-out-inspection-report.pdf. For reference, the first estimate is a single £1,370.00 line from Alder Compliance (attachment-02-estimate.pdf). It leaves the carpet in place and replaces the tap, so the quotes may not match like for like. Please state VAT clearly. Reply by 2025-04-10. Note: the report is dated 5 January 2026 but signed 3 April 2025. Please check which date is right.

**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. We're getting a second quote from another contractor for comparison, and I'll update you by 10 April. Apologies: our earlier email attached the inspection report twice rather than the estimate. The estimate is from Alder Compliance for £1,370.00, with no VAT itemised, and I'm resending it now. It leaves the bedroom carpet in place and replaces the bathroom tap, which differs from the original request, so the second quote will be priced item by item. Nothing is approved or booked yet; the work only goes ahead once you confirm which quote you'd like.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Requesting a second quote does not approve any work or spend.
- The £1,370.00 estimate is not recorded as a quote or approved.
- No visit or contractor booking was made.

## Remaining work
- Internal team to source the second quote by 10 April.
- Send both quotes to the landlord for a decision.
- Landlord to choose; then approve and assign.

## Missing or unavailable information
- Second contractor's quote.
- Whether the carpet and tap scope should follow the original request or the estimate.
- Attachment-04-invoice.pdf is listed but not in the history; its contents are unseen.

## Conflicts between sources
- Event 006 attached the inspection report twice instead of the estimate; corrected.
- Inspection report dated 5 Jan 2026 but signed 3 April 2025; flagged internally.
- Estimate keeps the carpet and replaces the tap, differing from the original request.
- The first provider was assigned but never replied; the estimate was dated 3 April and the history does not show how it arrived.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The estimate from Alder Compliance (£1,370.00) has gone to the landlord, who wants a second quote. The second quote is outstanding, then the landlord's decision.

**2. What is the next action, for whom, and through which channel?**

Internal team (email) to source the second itemised quote by 10 April. Landlord (email) has been told and has the correct estimate.

**3. Does anything need a human decision?**

No. This is routine. The landlord decides between the quotes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. Fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Maya Langley / Operations team","recipient_role":"internal","channel":"email","contact":"existing thread (event 003 email… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (sourced via internal team) for … | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
