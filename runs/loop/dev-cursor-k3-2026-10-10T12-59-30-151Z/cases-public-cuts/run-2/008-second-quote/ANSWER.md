# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a comparison quote. I recorded the first estimate, moved the job to double_quotation, emailed the landlord and put the job on hold to 2025-04-10. No human decision is needed.

## Where the case stands
Quote loop. First quote (Alder Compliance £1,370, no VAT shown) recorded and sent to landlord; landlord asked for one other subcontractor to quote. Ticket moved to double_quotation and on hold to 2025-04-10 awaiting second quote. Nothing approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation so a second provider is sourced for a quote only | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first is on hold, and we will report back by 2025-04-10 | Landlord | email | A4 ✅ |
| 3 | WAIT | Hold until second quote arrives; review 2025-04-10 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we are arranging one more contractor to quote the same works at Flat 5, 55 Lantern Quay, for comparison. The first estimate is on hold and nothing has been approved or started. Please note it differs slightly from the original list (it leaves the bedroom carpet and replaces the bath tap). We will come back to you with both quotes by 2025-04-10 at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; no work instructed
- Recording the quote does not accept it or its scope differences
- No second contractor has yet been contacted: none is named in the case

## Remaining work
- Second provider to be sourced and sent the same scope and check-out report (agency, at double_quotation stage)
- Send both quotes to landlord for decision by 2025-04-10
- Check inspection report dates (Jan 2026) versus 2025 job dates

## Missing or unavailable information
- No second contractor named
- Alder quote VAT status unclear
- Event 006 attachments were inspection reports, not the estimate; estimate file attachment-02 was used

## Conflicts between sources
- Alder estimate leaves the bedroom carpet and replaces the tap, against the original request
- Inspection reports dated 5 Jan 2026 but signed April 2025
- Report notes burn damage as pre-existing, while the request treats it as new damage
- Hint says provider visit not booked; the job is at the quote stage

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine check-out works job at quote stage. One quote (£1,370) is in; the landlord wants a second for comparison. Outstanding: second quote, then landlord decision. Property appears void, so no tenant contact.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being obtained (sent). Next, a second provider is sourced via the double_quotation stage; hold review 2025-04-10.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord request for second quote handled. Same scope plus check-out report to go to the second provider fo… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (quote only) for landlord compar… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
