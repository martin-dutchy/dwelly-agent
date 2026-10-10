# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote from another subcontractor, and the £1,370 Alder estimate does not cover the full scope (bedroom carpet omitted, bath tap replacement not supported by the report). I asked the landlord for a subcontractor name and told the contractor to revise the estimate, then put the job on hold until 2025-04-09 for the landlord's reply.

## Where the case stands
Check-out estimate stage. Provider (Alder Compliance) gave an estimate of £1,370.00 (event 006, attachment-02). Landlord (Langley) replied at event 009 asking to try another subcontractor for comparison. No landlord approval, no booking, no work. On hold for landlord, review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for the name of the subcontractor they want to quote, or confirm use of our contractor; explain the estimate scope gaps and that the contractor is revising it | Langley, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Alder Compliance to revise the estimate to the full scope (bedroom carpet included, tap repair not replacement), itemised, with VAT stated | Alder Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Wait with review date 2025-04-09 for landlord reply and revised estimate | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> Hello, thank you for your message about Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. We can get a second quote. Do you have a subcontractor you would like us to use? If so, please send their name and contact details and we will send them the full scope. If not, we will ask our current contractor to revise the estimate. Please note the current estimate (£1,370.00, no VAT shown) does not cover the burnt bedroom carpet, and it includes replacing the bath tap, which the inspection records as dripping rather than broken. We are asking the contractor to revise it. Nothing will be booked until you approve a quote. Kind regards, Northbridge Lettings

**A2 · send_message → Alder Compliance (contractor) via email, existing thread (event 003 email)** (verified)

> Hello, regarding Job NBL-008-3466 at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. Your estimate of £1,370.00 does not match the full request. Please revise it to cover all items: repaint the bedroom and any other rooms needed; replace the burnt and stained bedroom carpet (the estimate says it can stay); replace the bathroom flooring; repair the broken basin plug; repair the dripping bath tap (repair, not replacement, unless you find it needs replacing); repair the damaged bathroom shelf. Please state whether VAT applies and itemise the price. Thank you, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's message is a request for a second quote, not approval; no spend is authorised
- The £1,370 estimate is not approved and does not establish the cost, VAT or final scope
- Nothing has been booked; no contractor has been assigned
- Damage liability and deposit deductions are not decided here

## Remaining work
- Landlord to name a second subcontractor or confirm our contractor (review 2025-04-09)
- Alder Compliance to send a revised, full-scope itemised estimate
- Landlord decision on the chosen quote, then assign, visit, result, invoice and close

## Missing or unavailable information
- Second subcontractor name (landlord)
- Revised full-scope estimate with VAT (provider)
- Check-out invoice attachment-04 is referenced but not in the case files
- Landlord's tenancy status/void confirmation not shown on property record

## Conflicts between sources
- Event 006 says the estimate is attached, but the attachments on that email are the inspection report (attachment-03), not the estimate; the landlord may not have seen the £1,370 estimate.
- Inspection report dates: appointment 5 January 2026 and signature 3 April 2025, which is after today (2025-04-06) for the January date; treated as a recording error, dates unconfirmed.
- Estimate says the bathroom tap is replaced; inspection says it is dripping (repair). Trusted the inspection for scope.
- Estimate says main-room carpet can stay; request and inspection record burnt and stained bedroom carpet. Trusted the request and inspection.
- Estimate covers painting the main room; request is bedroom and other rooms. Scope to be confirmed by the revised estimate.
- Inspection report has two versions (attachment-01 and attachment-03) with the same findings and different wording.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Provider estimate received (£1,370, no VAT shown) but not approved. Landlord asked for a second subcontractor quote (event 009). Outstanding: landlord's subcontractor choice, a revised full-scope estimate, the landlord's approval, and the visit.

**2. 2. What is the next action, who is it for, and through which channel?**

Email the landlord Langley on the existing thread (A1) asking for a subcontractor name or confirmation of our contractor. Email Alder Compliance on the existing thread (A2) for a revised, itemised, full-scope estimate. Hold until 2025-04-09 (A3).

**3. 3. Does anything need a human decision, and why?**

No escalation now. The second-quote request is routine and the landlord has not approved spend. A human is needed only if the landlord stays silent past the chase rule or the provider cannot revise the scope.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 003 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a second quote from another subcontractor (event … | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
