# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second comparison quote after receiving the £1,370 Alder Compliance estimate. I recorded the first quote, moved the job to double_quotation, told the landlord, and put the job on hold until 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second comparison quote; we are sourcing it.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Told landlord a second quote is being obtained, first quote on hold, update by 10 April; asked for any preferred contractor | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold for second quote with review date 2025-04-10 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, thanks for your reply. Yes, we'll get a second quote for comparison for Flat 5, 55 Lantern Quay, using the same scope and check-out inspection report. The first quote stays on hold and nothing will be approved or started until you decide. For reference, the first estimate is £1,370 with no VAT shown, and it says the bedroom carpet can stay rather than being replaced. We'll update you by Thursday 10 April, or sooner when the second quote arrives. If you have a preferred contractor you'd like us to ask, just let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- Moving to double_quotation does not mean a second contractor has been instructed yet
- No visit is booked

## Remaining work
- Source a second provider and send the same scope plus inspection report for a quote only (agency)
- Send both quotes to landlord for decision
- Clarify the first quote: no VAT shown, tap replaced although only a repair was asked, carpet not replaced

## Missing or unavailable information
- No second contractor is named in the case or property record
- Attachment-04-invoice.pdf is listed but not in history; not seen
- Inspection report is dated January 2026 but signed April 2025, and says the carpet burn pre-existed the tenancy; dates are inconsistent

## Conflicts between sources
- Inspection report dates (5 Jan 2026, signed 3 Apr 2025) are inconsistent with the case timeline
- Estimate says the carpet can stay and replaces the tap, while the request asked for carpet replacement and a tap repair
- Report says the carpet burn pre-existed; the request treats it as new damage

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first quote has gone to the landlord, who wants a second for comparison. The second quote is outstanding and no decision or approval exists yet.

**2. What is the next action, who is it for, and through which channel?**

Reply to the landlord by email (done, A3) and source the second provider via double_quotation stage (A2), reviewing on 10 April.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord makes the proceed decision once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (same scope) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
