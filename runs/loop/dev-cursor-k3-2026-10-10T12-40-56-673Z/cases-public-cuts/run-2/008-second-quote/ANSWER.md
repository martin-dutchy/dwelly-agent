# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second comparison quote. We found the first email had attached the inspection report twice instead of the estimate. We recorded the £1,370 estimate, resent it, asked the landlord to name a second contractor, and put the job on hold to 2025-04-09.

## Where the case stands
Stage mp_time, on hold until 2025-04-09. Alder Compliance estimate £1,370 recorded but not approved. Landlord asked for a second quote; we have asked them to name a contractor. Property is vacant, so there is no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Tell landlord a second quote is wanted, resend the estimate that was missing from the earlier email, and ask which contractor to use | Langley, landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2025-04-09 for the landlord's contractor choice or decision | Langley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we can get a second quote for comparison. Sorry, our earlier email attached the check-out report twice rather than the estimate. The estimate from Alder Compliance is attached now: £1,370.00 in total (no VAT itemised), covering bathroom sanding/filling/damp paint, painting the main room walls and ceiling, new bathroom lino, plug socket and shelf repairs and a new bathroom tap. It says the main-room carpet can stay as it is, which differs from our request to replace it. To get the second quote: do you have a contractor you would like us to use? If not, let us know and we will choose one. Nothing is approved yet and no work will start until you say so. We will check back with you on 2025-04-09.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Nothing is instructed to a second contractor yet
- The message does not confirm the scope or who pays (deposit deductions are not decided)

## Remaining work
- Once the landlord names a contractor (or after the review date, we choose one), send them the same scope and inspection report for a quote only
- Landlord to decide on the quotes
- Clarify the carpet and tap scope differences with the provider

## Missing or unavailable information
- Landlord's preferred second contractor
- The invoice attachment (attachment-04) is not referenced in the history and was not used

## Conflicts between sources
- Estimate says carpet can stay and the tap is replaced, but the request was to replace the carpet and repair the tap
- Inspection report is dated 5 Jan 2026 but signed 3 April 2025
- Event 006 claimed to attach the estimate but attached the report twice
- Report says the carpet burn was pre-existing, which affects any deposit claim

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote from Alder Compliance (£1,370, no VAT itemised) is recorded and not approved. The landlord wants a second quote. Outstanding: a second contractor to quote, and the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord, already sent: a second quote is being arranged, the estimate is attached, and we ask which contractor to use. Review on 2025-04-09.

**3. Does anything need a human decision, and why?**

No. This is routine. The landlord decides on approval, and the second-quote request needs only a contractor name.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","at… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord (event 009) asked for a second contractor quote for comparison. No other contractor named in the c… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to name a second contractor for comparison quot… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
