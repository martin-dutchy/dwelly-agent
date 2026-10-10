# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote to compare with the £1,370 estimate. No other contractor is named, so I moved the job to double_quotation, sent the scope to operations, told the landlord, and held the job until 10 April.

## Where the case stands
Stage double_quotation. First estimate (Alder Compliance, £1,370, sent to landlord 6 Apr) is on hold. Landlord asked for a second quote. Waiting on operations to source a provider; review 2025-04-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved the ticket to double_quotation and sent the scope to operations to source a second itemised quote, reply by 10 April | Operations team / agency manager | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told the landlord a second quote is being obtained, expected around 10 April, and that nothing is approved or booked | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 10 April for the second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Operations team / agency manager (internal) via email, operations team (internal)** (verified)

> NBL-008-3466, Flat 5, 55 Lantern Quay: landlord has asked for a second quote for comparison. Please source one more provider (different from Alder Compliance) for a QUOTE ONLY, itemised per item: 1) repaint bedroom and any other rooms needed (incl. bathroom boxing, damp paint); 2) replace burnt bedroom carpet; 3) replace bathroom flooring; 4) repair broken plug (basin plug/plug socket per report); 5) repair dripping bath tap; 6) repair damaged bathroom shelf. Please state VAT. Attachment: attachment-01-check-out-inspection-report.pdf (also attachment-03). Note the first estimate was a single line of £1,370 and left the carpet in place, so itemising matters. Please reply by 2025-04-10. The first quote stays on hold.

**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, yes, we'll get a second quote from another contractor for the same works at Flat 5, 55 Lantern Quay, and send it to you alongside the first so you can compare. We've asked for it to be itemised and expect to have it by around 10 April; we'll update you then. Nothing is approved or booked in the meantime. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval, contractor assignment or spend was made
- The second quote is not yet obtained and its price is unknown
- Nothing here decides which quote is chosen or who pays (landlord or tenant deposit)

## Remaining work
- Operations to source the second provider and quote by 10 April
- Then send both quotes to the landlord for a decision
- The first estimate has not been recorded with record_quote; its attachment was read, and it is a single £1,370 line with no VAT stated, and it leaves the carpet in place, which differs from the request

## Missing or unavailable information
- Second contractor's quote
- Whether the carpet should be replaced as requested, given that the first estimate says it can stay

## Conflicts between sources
- Estimate says the carpet can stay, but the request asked for it to be replaced.
- The estimate and inspection report dates (3 Apr 2025 signature vs a 5 Jan 2026 appointment) are inconsistent.
- The event 009 landlord email says 'Morning', but it was sent in the evening.
- Attachment-04-invoice.pdf is listed in the hints but is not in the case.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate has gone to the landlord, who wants a second quote for comparison. The second quote is outstanding. No work is approved.

**2. What is the next action, who is it for, and through which channel?**

Operations (internal) source an itemised second quote by 10 April. The landlord was told by email.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides between quotes later. Operations only need to source a provider, which is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. Fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Operations team / agency manager","recipient_role":"internal","channel":"email","contact":"operations team (internal)","t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second itemised quote from a new provider (landlord requ… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
