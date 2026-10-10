# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The provider attended and says the toilet needs replacing, with a quote. The quote went to the landlord at event 017 and no reply has arrived. I recorded the result as needs_quote, asked the provider for a readable quote and the visit date, updated the tenant, and put the job on hold with a review on 14 Aug.

## Where the case stands
Stage: result (needs quote). Quote sent to landlord at event 017 and awaiting approval. Provider asked to resend the quote figure. Ticket on hold, review 2026-08-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the quote; chase on a second channel on 2026-08-14 if no reply | Quinn, landlord | internal | A4 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to resend the quote with amount, VAT and scope, and to confirm the visit date | Riverside Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote is with the landlord, no date yet, next update by 14 Aug | Noah Turner, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - The quote and photos did not reach us. Please resend the quote as a PDF or plain text, stating the amount, whether it includes VAT, and the scope.
> - Please confirm the engineer's visit date, as our records show both 08/08 and 09/08.
> 
> Why: We need the quote figure to record it and for the landlord's decision; no work should start until the landlord approves.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file (events 007, 012)** (verified)

> Dear Noah, thanks for your patience. Riverside Works attended and say the toilet needs replacing, so they have sent a quote. We have passed it to your landlord for approval and will update you as soon as we have an answer, and in any case by 14 August. We can't give a date for the work until it is approved. Please let us know if the toilet is unusable or anything gets worse.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The work is not approved and no date is promised.
- The quote amount and contents are unseen; the attachments were unavailable.
- The tenant's mention of the visit date (08/08 vs 09/08) is not resolved.

## Remaining work
- Landlord to approve or decline the quote (agency chases 2026-08-14)
- Provider to resend the quote, then record_quote
- After approval, approve the quote and arrange the works
- Invoice and final checks

## Missing or unavailable information
- Quote amount, VAT and scope (attachment unavailable)
- Photos and report not seen
- Spend limit not on the property record

## Conflicts between sources
- Visit date: event 009 says the next day (09/08), events 010-013 say 08/08, and 'tomorrow' in those messages is inconsistent. Provider asked to confirm. Not blocking.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened. The provider needs to replace the toilet and cistern. The quote is with the landlord for approval and no reply has come. The quote figure is not visible to us. Approval, the works, the invoice and final checks are all still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's decision, with a chase on a second channel on 14 Aug. Meanwhile I emailed the provider for the quote in readable form and emailed the tenant an update.

**3. Does anything need a human decision, and why?**

No. The landlord's approval is routine and is being awaited. Escalate only if the landlord stays silent after the chase and the tenant is suffering.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Provider email event 016 (2026-08-12): engineer attended; toilet … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (events 007, 012)","body":"Dear … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017 for approval; also awaiti… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-14","party":"Landlord","purpose":"Chase landlord on quote approval via second chann… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
