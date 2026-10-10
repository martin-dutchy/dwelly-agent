# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for another subcontractor's quote. I recorded the first quote (£1,370), moved the job to double_quotation, and told the landlord. I also sent the right estimate, because the earlier email had attached the inspection report twice. A follow-up is set for 10 April.

## Where the case stands
Stage double_quotation. Landlord asked for a second quote; first quote (Alder Compliance £1,370, recorded Q-101) is held and unapproved. Second provider still to be sourced. Follow-up set for 10 April.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SEND_QUOTE_FOR_APPROVAL | Told landlord a second quote is being obtained, re-sent the correct estimate (earlier email wrongly attached the inspection report twice), report back by 10 April | Landlord | email | A3 ✅ |
| 2 | WAIT | Follow-up on 10 April to check the second quote and report both to the landlord | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, yes, we will get a second quote for comparison for Flat 5, 55 Lantern Quay and are sourcing another contractor now. Apologies: our earlier email attached the check-out report twice instead of the estimate. The correct estimate is attached. It is from Alder Compliance, totals £1,370.00 (no VAT itemised) and covers bathroom sanding/filling/damp paint, painting walls and ceiling in the main room, replacing the bathroom lino, repairing the plug socket and shelf, and replacing the bathroom tap. It says the main-room carpet can stay, which differs from our request to replace the burnt carpet. We are holding that quote and nothing is approved or booked. We will update you by Thursday 10 April, or sooner when the second quote arrives.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; recording the quote does not accept it
- Moving to double_quotation does not itself instruct another contractor

## Remaining work
- Source a second provider at double_quotation stage and send same scope for a quote only (agency ops)
- Report both quotes to landlord for decision
- Clarify scope differences with the first quote: carpet left, tap replaced although only a repair was requested, VAT not itemised, supplier named Alder Compliance (compliance-type name for decorating work)

## Missing or unavailable information
- No second contractor named in the case
- VAT status of the quote
- The estimate's tap replacement and carpet scope differ from the request

## Conflicts between sources
- Event 006 said the estimate was attached but attached the inspection report twice; the estimate is attachment-02.
- Inspection report is dated 5 January 2026 but signed 3 April 2025, which is after the stated date of inspection.
- Estimate says carpet can stay and replaces the tap, against the request to replace the carpet and repair the tap.
- Event 009 landlord email says 'Morning' but is timed in the evening; immaterial.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate of £1,370 is held with the landlord. They want a comparison quote. The second provider is still to be sourced and nothing is approved.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (sent) confirming the second quote and attaching the estimate; the job is now at double_quotation, with a follow-up on 10 April.

**3. Does anything need a human decision, and why?**

No. The second quote is routine; the landlord decides between quotes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced for comparison at landlord's request; fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A5 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-10","party":"Landlord","purpose":"Check second quote sourced; report both quotes to landlord … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
