# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote after receiving the first estimate. No other contractor is on file, so I replied asking for their preference, noted the ticket and placed it on hold until 2025-04-09.

## Where the case stands
Stage mp_time: Alder Compliance estimate (£1,370, sent to landlord event 006) unapproved. Landlord asked for a second comparison quote. On hold waiting for landlord to name a contractor; review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Confirm a second quote is being arranged and ask the landlord which contractor to approach (none on file) | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold for landlord's contractor choice, review 2025-04-09 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, thanks for your note. Yes, we can get a second quote for comparison for Flat 5, 55 Lantern Quay (same scope as the first, plus the check-out report). We don't have another contractor on file for this property. Do you have one you'd like us to approach, or shall we choose one from our usual list? Nothing is approved or committed on the first estimate in the meantime. We'll chase again on 2025-04-09.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No second quote has been requested yet and nothing is approved.
- The first estimate is not approved or rejected.
- Nothing here confirms the scope or price.

## Remaining work
- Obtain a second quote once a contractor is named, send both to the landlord for decision (agency)
- Chase the landlord on 2025-04-09 if there is no reply
- Clarify the first estimate: no VAT shown, carpet excluded, tap replaced

## Missing or unavailable information
- Second contractor name; no other contractor in the case or property record
- Attachment-04 invoice not visible/relevant at this stage

## Conflicts between sources
- Estimate omits carpet replacement and includes tap replacement, unlike the original request. Inspection report dated 5 January 2026 but signed April 2025, and describes the carpet burn as pre-existing.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first estimate (£1,370, Alder Compliance) is with the landlord and unapproved. The landlord wants a second comparison quote, which is outstanding along with a contractor choice.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (done) confirming a second quote and asking which contractor to use. Hold and chase on 2025-04-09.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord holds the decision on the contractor and quote.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Event 009: landlord asked for one other subcontractor to quote for comparison. No other contractor named in… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to name a contractor for second comparison quot… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
