# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a comparison quote after receiving the first estimate. I recorded the first quote, asked the landlord for a preferred contractor, returned the ticket to auto mode and put it on hold until 9 April.

## Where the case stands
Quote loop. Alder Compliance estimate of £1,370 (no VAT shown) recorded as Q-101 and sent to the landlord, not approved. The landlord asked for a second quote. The ticket is on hold until 2025-04-09 waiting for the landlord to name a contractor.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord whether they have a preferred contractor for a second quote, otherwise we source one | Langley, landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2025-04-09 for the landlord's answer | Langley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> - Happy to get a second quote. Do you have a preferred contractor you'd like us to send the scope to? If not, please say so and we will look for another contractor ourselves.
> 
> Why: Landlord asked for a comparison quote; no other contractor is on file. The first estimate (£1,370, no VAT shown) stays on hold, not approved. Note it leaves the burnt bedroom carpet in place, unlike the original request.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no second contractor has been instructed.
- Recording the quote does not mean it is accepted.
- Nothing here decides who pays, e.g. deposit deductions.

## Remaining work
- Get a second quote once the landlord names a contractor, or send the scope to a contractor we find.
- Send both quotes to the landlord for a decision.
- Clarify the first quote's scope: it leaves the burnt carpet, includes a tap replacement, and shows no VAT.
- Check the attachments: the inspection report is dated January 2026 but signed April 2025, and an invoice file is present with no matching event.

## Missing or unavailable information
- Landlord's preferred contractor.
- Whether the estimate includes VAT.
- The provider has never replied on the thread.

## Conflicts between sources
- The inspection report is dated 5 January 2026 but was signed 3 April 2025.
- The report says the carpet burn pre-existed, while the request treats it as damage to replace.
- The estimate leaves the carpet in place and replaces the tap, which differs from the request.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first estimate (£1,370) is with the landlord and unapproved. The landlord wants a second quote, which is outstanding. The ticket is on hold until 2025-04-09.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord asking for a preferred contractor for the second quote (done, A2), then wait with a review on 2025-04-09 (A4).

**3. Does anything need a human decision, and why?**

No. A second quote is routine, and the landlord keeps the approval decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `request_information` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","questions":["Happy … | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to name a preferred contractor for a second quo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
