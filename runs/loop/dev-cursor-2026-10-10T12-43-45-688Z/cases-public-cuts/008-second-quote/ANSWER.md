# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote. No other contractor is named on file, so I asked the landlord for one, resent the estimate that event 006 had failed to attach, noted the record and held the job to 9 April.

## Where the case stands
Stage mp_time. First estimate (Alder Compliance £1,370) sent to landlord, who asked for a second comparison quote. On hold waiting for landlord to name a contractor; review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Confirmed second quote will be obtained, resent the estimate, asked landlord which contractor to approach | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-04-09 for landlord's contractor choice | Langley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, thanks for your reply. Yes, we can get a comparison quote. Our email on 6 April attached the check-out report twice rather than the estimate, sorry. The estimate is attached now: Alder Compliance, £1,370.00 (no VAT itemised). It covers bathroom and main room painting, bathroom lino, plug socket, shelf and bathroom tap. It says the bedroom carpet can stay. We have no second contractor on file for this property. Could you tell us which contractor you would like us to ask, or should we choose one? Once we have a name we will send them the same scope for a quote only. We will update you by 9 April. No work will go ahead until you approve.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; the £1,370 estimate is neither accepted nor rejected
- No second contractor has been instructed
- Estimate has no VAT itemised and differs from the original scope (carpet kept, tap replaced)

## Remaining work
- Obtain landlord's contractor choice, then send same scope for a quote only
- Compare quotes and get landlord's decision
- Agency owns the follow-up on 2025-04-09

## Missing or unavailable information
- Name of the second contractor (none in case or property record)

## Conflicts between sources
- Inspection report dated 5 Jan 2026 but signed 3 April 2025, and the estimate says the carpet can stay while the request says replace it; neither affects this step.
- Event 006 attached the inspection report twice instead of the estimate.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate of £1,370 from Alder Compliance is with the landlord. The landlord wants a comparison quote. Outstanding: a second contractor's name, the second quote, and the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (sent, verified) asking which contractor to approach for the second quote. The job is on hold until 9 April.

**3. Does anything need a human decision, and why?**

No. This is routine; the landlord's decision on the quotes comes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 2 | ✅ verified | MSG-103 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. First estimate: Alder Compl… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Second quote requested by landlord; awaiting preferred contractor na… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
- A1 attempt 1: MSG-101 not in send log; retried once and attempt 2 verified (MSG-103)
