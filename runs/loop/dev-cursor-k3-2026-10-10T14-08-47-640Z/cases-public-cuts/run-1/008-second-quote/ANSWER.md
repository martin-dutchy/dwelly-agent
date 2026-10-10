# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote for comparison. Moved job to double_quotation, told landlord by email, held to 9 April. No human decision needed.

## Where the case stands
Stage double_quotation; on hold to 2025-04-09 awaiting a second quote. First estimate (Alder Compliance) not approved. Property vacated, so no tenant message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation so a second provider is sourced (no other contractor named in case) | internal | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Emailed landlord confirming a second quote is being obtained, update by 9 April, asked for any preferred contractor | Landlord | email | A2 ✅ |
| 3 | WAIT | Hold for second quote, review 9 April | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thanks for your reply. Yes, we'll get a second quote for comparison for Flat 5, 55 Lantern Quay. The job has moved to the second-quote stage and we'll send the same scope and the check-out report to another contractor, for a quote only. The first estimate stays on hold and nothing is approved or booked. We'll update you by 9 April. If you'd like a particular contractor used, tell us their name. One point to flag: the first estimate suggests the bedroom carpet can stay, though the original request was to replace it, so you may want to decide on that when comparing.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; the first estimate is neither accepted nor rejected
- Second quote not yet obtained

## Remaining work
- Source second contractor for a quote on the same scope (agency maintenance team)
- Compare quotes and send to landlord by 9 Apr review
- Scope differences (carpet, tap) to be resolved

## Missing or unavailable information
- Name of any landlord-preferred second contractor
- VAT status of the first estimate

## Conflicts between sources
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025
- Estimate replaces the bathroom tap and leaves the carpet, unlike the request (repair tap, replace carpet)
- Event 006 attached the inspection report, not the estimate; the estimate file is attachment-02
- Hold event 007 vs landlord reply event 009

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

First estimate (£1,370, Alder Compliance) sent to landlord, who asked for a second quote. Second quote outstanding; no approval given.

**2. What is the next action, who is it for, and through which channel?**

Landlord emailed that a second quote is being sought (done); job moved to double_quotation so a second provider is sourced; review 9 April.

**3. Does anything need a human decision, and why?**

No. Second-quote requests are routine; the landlord decides between quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email 6 Apr) asked for one other subcontractor to quote for co… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (comparison requested by landlor… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
