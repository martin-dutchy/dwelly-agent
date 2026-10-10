# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for one other subcontractor to quote for comparison. I recorded the first quote (£1,370), moved the job to double_quotation, emailed the landlord with the estimate resent and a report-back date, and put the job on hold until 10 April.

## Where the case stands
Stage double_quotation, on hold until 2025-04-10. First quote (Alder Compliance £1,370) recorded, not approved. Waiting on a second provider quote being sourced and on the landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation so a second provider is sourced for the same scope | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, report back by 10 April, and resent the first estimate | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for the second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, yes, we will get a second quote for comparison for Flat 5, 55 Lantern Quay. We are sourcing another contractor for the same scope and will report back by Thursday 10 April. Nothing is approved or booked in the meantime. Also, our earlier email seems to have carried the inspection report twice rather than the first estimate, so I am resending it: Alder Compliance quoted £1,370.00 (no VAT itemised) for bathroom and main room painting, new bathroom lino, plug socket and shelf repair and a new bathroom tap. It leaves the bedroom carpet in place, although we asked for it to be replaced. Please tell us if you have a contractor you would like us to approach.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No spend approved and no contractor booked
- Landlord's request for a second quote does not decline the first
- Second provider not yet instructed; the tool route is the stage change
- Did not read attachment-04 invoice; not relevant yet

## Remaining work
- Second provider to quote the same scope (owner: agency, review 2025-04-10)
- Landlord decision on the quotes
- Clarify the carpet scope: the estimate leaves the carpet in place, while the request asked for replacement
- Confirm the first contractor's VAT position

## Missing or unavailable information
- No second contractor named in the case
- VAT treatment of the first quote
- Inspection report is dated 5 January 2026 but signed April 2025

## Conflicts between sources
- Estimate leaves the carpet and replaces the tap, differing from the request
- Event 006 attached the inspection report twice instead of the estimate
- Report dated Jan 2026 but signed April 2025

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote of £1,370 from Alder Compliance is held with the landlord. The landlord has asked for a comparison quote. The second quote and the landlord's decision are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Source a second provider (double_quotation stage). The landlord has been told by email that it is under way.

**3. Does anything need a human decision, and why?**

No. This is a routine second-quote request. The landlord will decide on approval when both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (same scope); first quote on hol… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
