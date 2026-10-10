# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote. I recorded the first quote, moved the job to double_quotation, told the landlord and put the job on hold until 2025-04-10.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance, £1,370, no VAT shown) recorded but not approved. Landlord asked for a comparison quote. A second provider still needs sourcing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Emailed the landlord to confirm a second quote is being obtained and when we will report back | Landlord | email | A4 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for the second quote; the ticket is at double_quotation for second provider sourcing | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, yes, we will get a second quote for comparison, using the same scope and inspection report. The first estimate is £1,370 with no VAT shown. It leaves the bedroom carpet in place, whereas the original request was to replace it. Nothing is approved yet. We will report back with the second quote by 2025-04-10. If you have a preferred contractor, please tell us their name.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or commit spend
- Moving to double_quotation does not mean a second provider has accepted
- No tenant to message (tenant vacated)

## Remaining work
- Source second provider and obtain quote for the same scope (maintenance team)
- Report both quotes to landlord by 2025-04-10 and get a clear decision

## Missing or unavailable information
- No second contractor named in case
- Landlord's preferred contractor not known
- attachment-04-invoice.pdf listed but not in history

## Conflicts between sources
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025
- Estimate scope leaves the carpet and replaces the tap, unlike the request
- Hint lists attachment-04-invoice.pdf, which is not in the history

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

A first quote of £1,370 is with the landlord, who wants a comparison quote. The second quote is outstanding and nothing is approved.

**2. What is the next action, for whom, and by which channel?**

Source a second provider (stage double_quotation). The landlord has been told by email and a review is set for 2025-04-10.

**3. Does anything need a human decision?**

No. The landlord decides after both quotes are in. The Jan 2026 versus Apr 2025 report date discrepancy and the scope differences are noted.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord request for comparison quote logged. Inspection report attachments are dated Jan 2026 but signed A… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote for landlord comparison; first q… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
