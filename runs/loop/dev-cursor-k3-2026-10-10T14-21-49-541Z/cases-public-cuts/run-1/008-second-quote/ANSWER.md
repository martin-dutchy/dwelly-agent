# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote. I recorded the first quote, moved the job to double_quotation and asked the internal team to source a second one. I told the landlord, corrected the earlier wrong attachment, and put the job on hold until 10 April.

## Where the case stands
Stage double_quotation. First quote (Alder Compliance £1,370) recorded, not approved. Second quote being sourced by the internal team; job on hold, review 2025-04-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Move job to double_quotation and ask internal team to source a second itemised quote by 10 April | Operations team / Maya Langley, internal | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Reply to landlord confirming second quote, correcting the wrong attachment and sending the actual estimate | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold for second quote, review 10 April | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, existing thread (event 009 email)** (verified)

> Hi, yes, we'll get a second quote from another contractor for comparison and will report back once we have it. Sorry too: our earlier email (6 April) attached the check-out inspection report instead of the estimate. The correct estimate is attached. It is from Alder Compliance for £1,370.00 (no VAT itemised), covering bathroom sanding/filling/damp paint, painting all walls and ceiling in the main room, new bathroom lino, plug socket and shelf repair, and a new bathroom tap. It says the bedroom carpet can stay, although the check-out report records burn damage, and it includes a tap replacement where we only asked for a drip repair. We'll ask the second contractor to price each item separately, including the carpet. Nothing is approved yet. Please hold off on a decision on the first estimate; we'll update you by 11 April.

**A4 · send_message → Operations team / Maya Langley (internal) via email, existing thread (event 001 request note)** (verified)

> NBL-008-3466, Flat 5, 55 Lantern Quay: the landlord wants a second quote for comparison (event 009). Please source one other contractor, quote only. Scope, itemised price per item: 1) repaint bedroom (and other rooms if needed); 2) replace burnt bedroom carpet; 3) replace bathroom flooring; 4) repair broken plug; 5) repair dripping bath tap (repair, not replace); 6) repair damaged bathroom shelf; also bathroom boxing repaint/repair for water damage. Attachment: attachments/attachment-01-check-out-inspection-report.pdf. First quote for reference: Alder Compliance £1,370 lump sum (attachments/attachment-02-estimate.pdf), which leaves the carpet and replaces the tap. Please reply with the itemised quote by 10 April. Note: the report is dated 5 Jan 2026 but signed 3 April 2025, so please check the date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no spend is committed
- Recording the quote does not mean it is accepted or that its scope (carpet left, tap replaced) is right
- No second contractor has yet been identified or has quoted

## Remaining work
- Internal team to source the second itemised quote by 10 April
- Send both quotes to the landlord for a decision
- Visit booking after approval

## Missing or unavailable information
- Second contractor's quote
- Estimate has no VAT detail
- attachment-04-invoice.pdf not reviewed

## Conflicts between sources
- Event 006 attachments were the inspection report, not the estimate; trusted attachment-02 as the estimate
- Inspection report dated 5 Jan 2026 but signed 3 April 2025
- Estimate leaves the carpet and replaces the tap, against the request

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A single estimate of £1,370 from Alder Compliance is awaiting landlord decision. The landlord wants a comparison quote, which is outstanding. The landlord was earlier sent the wrong attachment, now corrected.

**2. What is the next action, who is it for, and through which channel?**

The internal team is asked by email to source a second itemised quote by 10 April. The landlord was emailed to confirm and given the correct estimate.

**3. Does anything need a human decision, and why?**

No escalation. The landlord's decision on the quotes comes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Operations team / Maya Langley","recipient_role":"internal","channel":"email","contact":"existing thread (event 001 reque… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second itemised quote (sourced via internal team) for la… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-008-3466","note":"Route: our contractors, second quote requested by landlord. Event 006 email attached the inspection report … | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
