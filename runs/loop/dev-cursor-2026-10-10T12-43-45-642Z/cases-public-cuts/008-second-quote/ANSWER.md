# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a comparison quote. No other contractor is on file, so I asked the landlord to name one, resent the Alder £1,370 estimate (the earlier email had the inspection report attached twice, not the estimate), noted the ticket and held it with a review on 2025-04-09.

## Where the case stands
Quote loop. Alder Compliance estimate of £1,370 is held awaiting the landlord. The landlord asked for a second quote and no other contractor is named. We are waiting on the landlord, review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Replied to the landlord: second quote agreed in principle, asked who to approach, resent the estimate that was missing from the earlier email | Landlord | email | A1 ✅ |
| 2 | WAIT | Hold and chase on 2025-04-09 for the second contractor's name, then send the same scope for a quote only | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, yes, we're happy to get a second quote for comparison. Two things. First, our earlier email attached the check-out report twice by mistake, not the estimate. The estimate is attached now: £1,370.00 from Alder Compliance, no VAT itemised. It covers sanding, filling and painting the bathroom with damp paint, painting all walls and the ceiling in the main room, replacing the bathroom lino, and repairing the plug socket and shelf. It also covers replacing the bathroom tap. It says the bedroom carpet can stay. Second, we have no other contractor on file for this property. Please send us the name and contact of the contractor you'd like to quote, or tell us to choose one. We'll send them the same scope and the inspection report, for a quote only, once we hear back. Nothing is approved yet. We'll chase you on 2025-04-09 if we haven't heard.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no spend is committed
- The second quote has not been requested because no contractor is named yet
- The Alder estimate's contents differ from the original scope; this has not been resolved

## Remaining work
- Landlord to name a second contractor
- Then send that contractor the scope and the report for a quote only
- Compare the quotes and ask the landlord to decide
- Clarify the carpet and tap scope differences with Alder Compliance

## Missing or unavailable information
- Name and contact of the second contractor
- The estimate attachment-04 invoice file exists but is not referenced in the history

## Conflicts between sources
- Inspection report is dated 5 January 2026 but signed 3 April 2025, and describes the carpet burn as both new and pre-existing
- Event 006 said an estimate was attached but only the inspection report was
- Estimate replaces the tap and leaves the carpet, which differs from the request

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A single quote (Alder Compliance, £1,370) has been recorded and sent to the landlord. The landlord wants a second quote, and none has been requested yet. The property is vacant, so there is no tenant to contact.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (sent) asking for the second contractor's name. Chase on 2025-04-09, then send the same scope to that contractor for a quote only.

**3. Does anything need a human decision, and why?**

No. The second quote is routine. The landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No other contractor named i… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to name a second contractor (or authorise us to… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-09","party":"Landlord","purpose":"Chase landlord for second contractor name; then send same s… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
