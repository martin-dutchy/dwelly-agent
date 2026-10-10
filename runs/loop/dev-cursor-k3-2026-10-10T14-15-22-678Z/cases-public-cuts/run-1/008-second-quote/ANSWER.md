# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote. I recorded the first quote, moved the job to double_quotation, and told the landlord. I also sent the estimate itself, because the earlier email had attached the inspection report twice. The job is on hold to 9 April.

## Where the case stands
Quote loop, stage double_quotation. First quote (Alder Compliance £1,370, no VAT shown) recorded, not approved. Landlord asked for a second comparison quote; we are sourcing it. Hold review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SEND_QUOTE_FOR_APPROVAL | Told landlord a second quote is being obtained, report back by 9 April, and sent the actual Alder estimate that was missing from the earlier email | Landlord | email | A4 ✅ |
| 2 | WAIT | Hold until 9 April for the second quote | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison for Flat 5, 55 Lantern Quay. We're sourcing another contractor now and will update you by 9 April. Sorry: my earlier email attached the inspection report twice instead of the estimate. The first estimate is from Alder Compliance, £1,370.00 in total (no VAT itemised), dated 3 April 2025. It covers sanding, filling and painting the bathroom with damp paint, painting all walls and the ceiling in the main room, replacing the bathroom lino, repairing the plug socket and shelf, and replacing the bathroom tap. It says the main-room carpet can stay, so it differs from our request to replace the burnt carpet. Nothing is approved yet; we'll hold that quote while we get the second one.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no spend committed
- Moving to double_quotation does not name or instruct a second contractor
- The estimate scope differs from the request (carpet left, tap replaced)

## Remaining work
- Source a second contractor and send them the same scope and inspection report, quote only
- Report both quotes to the landlord for decision
- Clarify carpet and tap scope differences and the bedroom ceiling water ingress

## Missing or unavailable information
- No second contractor named in the case
- Inspection report date (5 Jan 2026) conflicts with signature date 3 April 2025
- Quote shows no VAT status
- No provider reply on record

## Conflicts between sources
- Event 006 attachments were the inspection report, not the estimate
- Estimate says carpet stays and tap is replaced, but the request was to replace the carpet and repair the tap
- Inspection date 5 Jan 2026 vs signature 3 April 2025

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first quote of £1,370 from Alder Compliance is recorded but not approved. The landlord wants a second comparison quote, which is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote and sending the correct estimate (done). Then source a second contractor via the double_quotation stage.

**3. Does anything need a human decision, and why?**

No. This is a routine second-quote request. The landlord makes the final choice once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Conflicts: event 006 to landlord attached the check-out inspection report twice, not the estimate (attachme… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second comparison quote being sourced at landlord's request; first q… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
