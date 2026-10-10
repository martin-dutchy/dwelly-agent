# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote. I moved the job to double_quotation, recorded the first quote, and emailed the landlord the correct estimate. Our earlier email had attached the inspection report twice instead of the estimate. A follow-up is set for 9 April.

## Where the case stands
Ticket at double_quotation. First quote (Alder Compliance £1,370, no VAT itemised) recorded but not approved. Landlord asked for a second quote; no second contractor named in the case, so the job moved to the stage where a second provider is sourced. Follow-up set for 9 April.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation so a second provider is sourced for the same scope | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Emailed landlord: second quote being obtained, correct estimate attached, first on hold | Langley, landlord | email | A3 ✅ |
| 3 | WAIT | Follow-up on 9 April for second quote and landlord reply | Langley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we are arranging a second quote from another contractor for comparison and the first quote is on hold, nothing is approved. Apologies: our earlier email attached the check-out report twice instead of the estimate. The correct estimate is attached: Alder Compliance, £1,370.00 total (no VAT itemised), covering bathroom sanding/filling/damp paint, painting all walls and ceiling in the main room, new bathroom lino, plug socket and shelf repair and a replacement bathroom tap. It says the main-room carpet can stay, whereas we asked about replacing the burnt carpet. If you have a preferred contractor for the second quote, tell us their name. We will update you once the second quote arrives, and by 9 April at the latest on progress.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or commit spend
- Moving to double_quotation does not mean a second provider has been found or has quoted
- The landlord has not approved any works

## Remaining work
- Source second provider quote for same scope (agency, by 9 April)
- Landlord decision after comparing quotes
- Clarify scope: carpet replacement, tap repair vs replacement

## Missing or unavailable information
- No second contractor named; landlord preferred contractor unknown
- VAT status of Alder quote

## Conflicts between sources
- Event 006 attached the inspection report twice instead of the estimate; the correct estimate was re-sent
- Inspection report dated 5 Jan 2026 but signed 3 April 2025
- Estimate leaves the carpet and replaces the tap, which differs from the request

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote of £1,370 from Alder Compliance is recorded but not approved. The landlord wants a second comparison quote. The second provider is still to be sourced, and the landlord has not yet decided on any works.

**2. What is the next action, who is it for, and through which channel?**

Source the second quote through the double_quotation stage. I emailed the landlord to confirm this and to send the correct estimate. Follow-up due 9 April.

**3. Does anything need a human decision, and why?**

No. Getting a second quote is routine. The landlord's approval decision comes later, once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","at… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-09","party":"Landlord / second provider","purpose":"Check second quote sourced; update landlo… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
