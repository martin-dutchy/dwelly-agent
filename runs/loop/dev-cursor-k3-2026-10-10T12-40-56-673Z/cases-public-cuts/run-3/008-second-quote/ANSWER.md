# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a comparison quote after receiving the £1,370 estimate. No alternative contractor is named anywhere, so I asked the landlord for one (or permission to source one), noted the record and put the job on hold to 9 April.

## Where the case stands
Quote loop. Alder Compliance estimate £1,370 sent to landlord, not approved. Landlord asked for a comparison quote. Ticket on hold awaiting landlord's contractor preference, review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord whether they have a preferred contractor for the second quote, otherwise we source one with the same scope | Landlord | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-04-09 for landlord's reply | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Landlord (landlord) via email, agency landlord record** (verified)

> - Happy to get a second quote for comparison. Do you have a contractor you would like us to approach? If not, we will source one ourselves and send them the same scope and check-out report.
> 
> Why: Landlord asked for a comparison quote (event 009); no second contractor is named on the property record. The first estimate of £1,370 is not approved and stays on hold.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for a second quote does not approve the first estimate or any spend
- No second contractor has been instructed yet
- No tenant to message: tenant has vacated

## Remaining work
- Obtain second quote once contractor identified (agency/landlord)
- Landlord decision on quotes
- Chase on 2025-04-09 if no reply

## Missing or unavailable information
- Second contractor name; no other contractor is named in the case or property record
- Attachment-04 invoice listed but not in the history; not seen

## Conflicts between sources
- Estimate leaves carpet in place and replaces the tap, differing from the requested scope
- Inspection report dated 5 Jan 2026 but signed April 2025; carpet burn described as pre-existing in the narrative
- Case hints list attachment-04-invoice.pdf, which is not in the history

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

One estimate (Alder Compliance, £1,370) has gone to the landlord and is unapproved. The landlord wants a second quote. Outstanding: second contractor, second quote, landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for a preferred contractor for the comparison quote, or confirming we source one; hold with review 2025-04-09.

**3. Does anything need a human decision, and why?**

No. This is routine; the landlord decides on the quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Happy to get a s… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord (event 009, 6 Apr) asked for a second subcontractor quote. First estimate (Alder Compliance, £1,37… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to name a contractor for a comparison quote; fi… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
