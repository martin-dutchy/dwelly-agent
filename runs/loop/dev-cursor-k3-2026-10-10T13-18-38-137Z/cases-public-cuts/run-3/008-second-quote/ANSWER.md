# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote for comparison. I moved the job to double_quotation, told the landlord and resent the first estimate (event 006 had not attached it), and held the job to 2025-04-10.

## Where the case stands
Double_quotation stage, on hold until 2025-04-10. First estimate (Alder Compliance £1,370) awaiting landlord decision; landlord asked for a second quote. No other contractor is named in the case.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Email landlord confirming second quote is being obtained, resending the first estimate, asking for any preferred contractor, with update promised by 2025-04-10 | Landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for the second provider's quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we are arranging a second quote for comparison for the check-out works at Flat 5, 55 Lantern Quay, using the same scope and inspection report. The first estimate stays on hold meanwhile and nothing will go ahead without your approval. Please note our earlier email may not have included the estimate itself, so I am attaching it again: £1,370.00 from Alder Compliance, no VAT itemised. It does not include replacing the bedroom carpet (it says the carpet can stay). If you have a preferred contractor, please tell us their name. We will update you by 2025-04-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Moving to double_quotation does not approve any spend or the first estimate.
- No second contractor has been instructed yet; no quote exists from one.

## Remaining work
- Source a second contractor and send the same scope and inspection report for a quote only (maintenance team).
- Review 2025-04-10 and report both quotes to the landlord for decision.
- Clarify the carpet replacement omitted from the first estimate and the tap replacement.

## Missing or unavailable information
- Name of a second contractor; no preferred contractor in the records.
- Whether the landlord received the first estimate, as the event 006 attachments were the inspection report only.

## Conflicts between sources
- Inspection report dated 5 Jan 2026 but case is April 2025 (signature 3 Apr 2025).
- Estimate says carpet can stay, but the request was to replace it; the estimate includes tap replacement though the request was to repair it.
- Event 006 said estimate attached but listed the inspection report twice.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate of £1,370 from Alder Compliance is awaiting a landlord decision. The landlord has asked for a second comparison quote. The job is now at double_quotation, on hold to 2025-04-10. The second quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

The landlord was emailed to confirm the second quote is being obtained, with the estimate re-attached. Next, the maintenance team sources the second provider.

**3. Does anything need a human decision, and why?**

No. This is routine work. The only decision needed is the landlord's, on which quote to approve, once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Event 006 email to landlord listed the inspection report twice as attachments and not the estimate (attachm… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote requested by landlord; waiting for second provider to b… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
