# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote after the first estimate. No other contractor is named, so the job moved to double_quotation, the landlord was told by email, and a hold was set to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance) with landlord undecided; landlord asked for a second quote; second provider not yet sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Second quote being sourced; ticket moved to double_quotation and held with review 10 April | internal | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first estimate on hold, will update by 10 April, asked for a preferred contractor | Landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thank you for your reply. Yes, we will get a second quote for comparison for Flat 5, 55 Lantern Quay, using the same list of works and the check-out report. We've moved the job to the second-quote stage and will keep the first estimate on hold meanwhile. Please don't approve anything yet. One point for when you compare: the first estimate says the bedroom carpet can stay, whereas the original request was to replace the burnt carpet, so we'll ask the second contractor to price it both ways. If you already have a preferred contractor, tell us their name. We'll update you by Thursday 10 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve either quote or any spend
- Does not name or instruct a second contractor yet
- Does not confirm the first estimate's figure is right

## Remaining work
- Source second contractor and send same scope for quote only (agency ops)
- Report both quotes to landlord by 10 April
- Clarify carpet scope and whether tap needs replacing vs repair

## Missing or unavailable information
- No second contractor named in the case
- Landlord's preferred contractor, if any
- Invoice attachment-04 not seen in history

## Conflicts between sources
- Estimate says carpet can stay vs request to replace burnt carpet
- Estimate includes replacing tap vs request to repair
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025
- Estimate dated 3 Apr but sent to landlord 6 Apr; email attached the inspection report rather than the estimate

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate has gone to the landlord, who wants a second quote for comparison. The job is now at the second-quote stage on hold. Outstanding: second quote and the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote (done), and sourcing a second provider via the double_quotation stage. Review on 10 April.

**3. Does anything need a human decision, and why?**

No. Getting a second quote is routine; the landlord decides between quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email 06/04) asked for one other subcontractor to quote for co… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced at landlord's request; first estimate hel… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
