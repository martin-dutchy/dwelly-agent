# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote to compare. I recorded Alder Compliance's £1,370 estimate and emailed the landlord to ask for a preferred contractor. The email also flagged that the earlier send attached the wrong document. The job is on hold with a review on 2025-04-09.

## Where the case stands
Quote stage. Alder Compliance quote £1,370 recorded, not approved. Landlord asked for a second comparison quote. Waiting on landlord for a preferred contractor, review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked landlord whether they have a preferred contractor for the comparison quote, otherwise we source one. Also corrected the earlier email's wrong attachment and summarised the first quote. | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold waiting for landlord, review 2025-04-09 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Landlord (landlord) via email, agency landlord record** (verified)

> - Do you have a preferred contractor we should ask for the comparison quote? If not, we will send the scope to another contractor ourselves.
> 
> Why: Landlord asked for a second quote. Also, our earlier email (event 006) attached the check-out inspection report twice rather than the estimate, so please note the first quote is from Alder Compliance: £1,370.00 (no VAT itemised) covering painting the bathroom and main-room walls/ceiling, replacing bathroom lino, repairing the plug socket and shelf, and replacing the bathroom tap. It says the bedroom carpet can stay, which differs from our request to replace the burnt carpet. Nothing is approved yet and no work will start until you confirm. We will send the estimate PDF properly and share the comparison quote when we have it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- No second contractor has been instructed yet
- The estimate's contents were summarised from the attachment; scope differs from the request (carpet not replaced, tap replaced, no VAT stated)

## Remaining work
- Obtain the comparison quote (landlord's preferred contractor or one we source) and send both quotes to the landlord
- Clarify whether Alder's £1,370 includes VAT and the carpet scope
- Landlord decision on which quote to approve

## Missing or unavailable information
- Landlord's preferred contractor
- Whether the £1,370 includes VAT
- Event 006 attached the inspection report, not the estimate
- Inspection report is dated 5 January 2026 but signed 3 April 2025, a date inconsistency

## Conflicts between sources
- Estimate leaves the carpet in place, but the request was to replace it
- Estimate replaces the tap, but the request was to repair it
- Inspection report dated 5 January 2026 but signed 3 April 2025
- Event 006 says estimate attached, but the attachments were the inspection report

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

One quote (£1,370, Alder Compliance) is recorded and unapproved. The landlord wants a comparison quote. Still needed: the second quote and the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for a preferred contractor for the second quote (otherwise we source one). Hold with review on 2025-04-09.

**3. Does anything need a human decision, and why?**

No. This is routine quote-loop work. The landlord makes the approval decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Do you have a pr… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a second comparison quote; first quote (Alder Com… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
