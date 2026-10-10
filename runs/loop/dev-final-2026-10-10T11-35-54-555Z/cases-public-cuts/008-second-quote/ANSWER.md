# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second comparison quote. I recorded the first estimate (£1,370) and emailed the landlord asking for a preferred contractor. The job is on hold until 2025-04-09.

## Where the case stands
Quote stage, on hold. First estimate (Alder Compliance, £1,370, no VAT itemised) was sent to the landlord. The landlord asked for a second quote for comparison. No other contractor is on file. Property is vacant, so no tenant messages are needed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord whether they have a preferred contractor for the comparison quote, or whether we should find one | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold for landlord reply, review 2025-04-09 | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Landlord (landlord) via email, existing thread (event 009 email)** (verified)

> - Yes, we can get a comparison quote. Do you have a preferred contractor you'd like us to ask? If not, please say so and we'll look for another contractor to quote on the same scope.
> 
> Why: Landlord asked for a second quote; no other contractor is on file. First estimate (£1,370, no VAT itemised) stays on hold, not approved.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- No second contractor has been instructed
- The scope differences are not resolved

## Remaining work
- Get the second quote once the landlord answers (agency)
- Landlord decides between quotes
- If no reply by 2025-04-09, chase on a second channel (agency)
- Confirm with the provider that the tap replacement and carpet scope match the request, since the first quote leaves the carpet and replaces the tap

## Missing or unavailable information
- Landlord's preferred contractor
- The estimate does not say whether VAT applies
- No contractor confirmation of the visit or scope

## Conflicts between sources
- The estimate leaves the burnt carpet and replaces the tap, which differs from the original request. The inspection report says the carpet burn was already on the inventory. The inspection report is dated 5 January 2026, after the case dates, and was signed 3 April 2025.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

A quote has been sent to the landlord, who wants a second quote for comparison. The second quote and the landlord's decision are outstanding.

**2. What is the next action, for whom, through which channel?**

Email to the landlord asking for a preferred contractor for the second quote. The job is on hold, review 2025-04-09.

**3. Does anything need a human decision?**

No. This is routine and the landlord holds the decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","questions":["Yes, … | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord wants a second quote; waiting for preferred contractor name… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
