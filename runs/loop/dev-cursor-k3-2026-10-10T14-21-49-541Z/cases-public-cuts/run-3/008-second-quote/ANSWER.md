# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote for comparison. I recorded the first quote, moved the job to double_quotation, asked internal to source another contractor, corrected the landlord's earlier wrong attachment and held the job with a review date of 10 April.

## Where the case stands
Double_quotation stage, on hold to 2025-04-10. First quote (Alder Compliance £1,370) recorded, unapproved. Waiting on internal team to source a second itemised quote; landlord informed. Property is vacant, so no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SEND_QUOTE_FOR_APPROVAL | Told landlord a second quote is being obtained, sent the correct estimate (earlier email had the wrong attachment) and flagged scope differences; update promised by 11 April | Langley, landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Asked internal team to source one other contractor for an itemised quote by 10 April | Agency manager / operations team | email | A4 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> Hi Langley, yes, we are getting a second quote for comparison for Flat 5, 55 Lantern Quay. Sorry: our earlier email attached the check-out inspection report rather than the estimate. The correct estimate is attached: Alder Compliance, £1,370.00 in one line, no VAT itemised, dated 3 April. Please note it leaves the bedroom carpet as it is (we had asked for replacement of the burnt carpet) and replaces the bathroom tap (we had asked for a repair). We are asking the second contractor to price the original scope as an itemised quote. Nothing is approved yet, and we will update you by 11 April.

**A4 · send_message → Agency manager / operations team (internal) via email, existing thread (event 001 request)** (verified)

> The landlord wants a second quote for comparison on NBL-008-3466 (Flat 5, 55 Lantern Quay). Please source one other contractor and ask for an itemised quote per item: repaint bedroom (and other rooms if needed); replace burnt bedroom carpet; replace bathroom flooring; repair broken plug; repair dripping bath tap; repair damaged bathroom shelf. Attached: check-out inspection report and the first estimate (Alder Compliance £1,370, one line, carpet excluded, tap replaced). Please reply by 10 April 2025. The job is now at double_quotation stage.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; recording the quote does not approve spend
- Second contractor not yet identified or instructed
- Does not settle who pays (landlord vs tenant deposit) for damage

## Remaining work
- Internal team to source second itemised quote by 10 April
- Send both quotes to landlord for decision
- Clarify with Alder Compliance the carpet exclusion, tap replacement, VAT and itemisation

## Missing or unavailable information
- Second contractor's quote
- Itemised breakdown and VAT status of Alder Compliance estimate

## Conflicts between sources
- Event 006 said estimate attached but attached the inspection report twice; sent the correct estimate
- Inspection report dated 5 January 2026 yet signed 3 April 2025 (before the stated date)
- Estimate replaces tap and keeps carpet, differing from the original request
- Hint lists attachment-04-invoice.pdf which is not provided; not relied on

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote of £1,370 from Alder Compliance is with the landlord, who has asked for a second quote. Outstanding: a second itemised quote, then the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Internal team sources the second contractor (email, sent). Landlord told by email on the existing thread.

**3. Does anything need a human decision, and why?**

No escalation. Sourcing a second quote is routine; the landlord makes the approval decision later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Agency manager / operations team","recipient_role":"internal","channel":"email","contact":"existing thread (event 001 req… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for a second itemised quote (sourced by internal team) for l… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
