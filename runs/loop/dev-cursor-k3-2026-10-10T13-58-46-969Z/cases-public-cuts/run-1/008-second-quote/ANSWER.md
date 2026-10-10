# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second comparison quote. I recorded the first quote (£1,370), moved the job to double_quotation, told the landlord, scheduled a follow-up for 10 April and returned the job to auto mode.

## Where the case stands
Stage double_quotation. First quote (Alder Compliance £1,370) recorded and sent to landlord, who asked for one other subcontractor to quote for comparison. No second contractor is named in the case, so the second provider is being sourced. Nothing approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SEND_QUOTE_FOR_APPROVAL | Told landlord a second quote is being sourced on the same scope, first quote on hold, update by 10 April | Landlord | email | A3 ✅ |
| 2 | RECLASSIFY | Moved ticket to double_quotation so a second provider is sourced | internal | internal | A2 ✅ |
| 3 | WAIT | Follow-up 10 April to report on second quote or chase | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison for Flat 5, 55 Lantern Quay, using the same scope and the check-out report. We're sourcing the second contractor now and will update you once we have it. Please note the first estimate (£1,370) leaves the burnt bedroom carpet in place and replaces the bath tap, which differs from the original request, so we'll ask the second contractor to price the full original list. Nothing is approved or instructed yet; the first estimate is on hold while you compare. We'll update you by Thursday 10 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor is instructed and no spend approved
- Recording the quote does not mean it is accepted
- Second quote has not been requested from a named contractor yet; stage change triggers sourcing

## Remaining work
- Source second quote on the full original scope (including carpet replacement and the tap repair)
- Report both quotes to landlord for decision, owner: agency, by 10 April
- Landlord approval needed before any work

## Missing or unavailable information
- Attachment-04 invoice not seen in history
- No second contractor named in the case

## Conflicts between sources
- Estimate scope differs from the request (carpet left, tap replaced).
- Inspection report dated 5 January 2026 but signed 3 April 2025, which is inconsistent with the case dates.
- Event 009 says 'Morning' but was sent in the evening; minor.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first quote of £1,370 from Alder Compliance went to the landlord, who asked for a second quote. The second quote is outstanding and no work is approved.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being sourced (sent). The job is at double_quotation for a second provider. Follow-up is set for 10 April.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-10","party":"Landlord","purpose":"Report second quote status to landlord; chase second contra… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
