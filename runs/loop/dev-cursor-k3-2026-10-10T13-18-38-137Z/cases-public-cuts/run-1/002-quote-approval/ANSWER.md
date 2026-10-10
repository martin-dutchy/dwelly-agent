# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The provider attended and says the toilet needs replacing, and has sent a quote. The quote went to the landlord on 12 Aug. I recorded the result, asked the provider for a readable quote, updated the tenant and put the job on hold until 13 Aug.

## Where the case stands
Stage: result (needs quote). Quote sent to landlord (event 017) and awaiting approval. The provider's quote and photos were not visible to us, so the quote is not recorded. Ticket on hold, review 2026-08-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to resend quote as PDF/plain text with total, VAT, items and the attendance date; do not start work before approval | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: toilet needs replacing, quote with landlord, no date yet, next update by 13 Aug | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord approval of the quote, review 2026-08-13; chase on a second channel if still silent | Quinn, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for attending. The quote and photos did not come through on our side. Please resend the quote as a PDF or plain text, with the total, whether VAT is included, the items covered and the estimated completion time.
> - Please confirm the date the engineer attended, as our record shows both 08/08 and 09/08.
> 
> Why: We need the quote figure and visit date before the landlord can decide and before we record the quote. Please do not start work until we confirm approval.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file (event 007 thread)** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited and found the toilet needs to be replaced, as it can't be safely removed to clear the blockage. They have sent a quote, which we have passed to your landlord for approval. We can't give a date for the work until that's approved. We'll update you by 13 August at the latest. If you have no other working toilet, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result does not approve the quote or spend.
- No contractor instruction for the replacement work; no date is booked.
- Quote amount and photos not seen, so nothing stated about them.

## Remaining work
- Landlord decision on the quote (the agency chases from 13 Aug)
- Provider to resend the quote and confirm the visit date
- record_quote, then approve and book the works once the landlord approves
- Invoice and final checks, then close

## Missing or unavailable information
- Quote amount, VAT and scope
- Photos and report
- Actual visit date (08/08 vs 09/08)

## Conflicts between sources
- Visit date: event 009 says next day (09/08), events 010-013 say 08/08, and 'tomorrow' wording is inconsistent. Asked provider to confirm.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit is done and a quote is needed. The quote is with the landlord for approval. Outstanding: the landlord decision, a readable quote and photos from the provider, and the visit date discrepancy.

**2. What is the next action, who is it for, and through which channel?**

Ask the provider by email for the quote in a readable form. The tenant has been updated by email. Wait for the landlord, with a review on 13 Aug.

**3. Does anything need a human decision, and why?**

No. The landlord's approval is routine and is pending. Escalate only if the landlord stays silent after a chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Provider email event 016 (2026-08-12): engineer attended; toilet … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 007 thread)","body":"Dear… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017; awaiting approval. Also … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
