# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** routine

Riverside Works attended and found the toilet needs replacing and repiping, and has sent a quote. The landlord has been asked to approve it (event 017), and that decision is still pending. I recorded the visit as needs_quote, put the job on hold for the landlord with a review on 2026-08-15, asked the provider to resend a readable quote, and told the tenant the next step.

## Where the case stands
Ticket NBL-002-quote-approval, stage "result" (needs_quote). Riverside Works attended (event 016, 2026-08-12) and found the toilet needs replacing and repiping; a quote was sent to the landlord (Quinn) for approval (event 017). Landlord approval is pending. The 2026-08-07 approval (event 003) covered attendance only, not this quote. The quote amount is not readable in the case.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Works to resend the quote with the amount, VAT status, itemised scope and photos as PDF or plain text, and confirm no order will be raised before landlord approval. | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the visit took place, a replacement quote is with the landlord, and no work date is confirmed yet. | Noah Turner, tenant | sms | A3 ✅ |
| 3 | WAIT | Record the visit result as needs_quote and hold the job for the landlord's decision, reviewing on 2026-08-15. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> Dear Riverside Works,
> 
> Thank you for attending Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ.
> 
> The quote and photos in your email did not come through to us as readable documents. Could you please resend the quote with the amount (including whether VAT is included), the itemised scope, and the photos as PDF or plain text in your reply?
> 
> We have sent the quote to the landlord for approval. We will not raise an order until the landlord has approved it.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Noah Turner (tenant) via sms, 07700 900422** (verified)

> Hello Noah, this is Northbridge Lettings. Riverside Works attended your flat for the blocked toilet. They found the toilet needs replacing and have sent a quote to your landlord for approval. We will update you once we hear back. We are not able to confirm a date for the work yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the quote to the landlord does not mean they approved it.
- The 2026-08-07 landlord approval covered attendance only, not the replacement quote.
- The quote amount and photos are not readable, so no spend has been approved or recorded.
- The visit date conflict (08/08 vs 09/08) is not resolved; the provider attended, so it does not change the outcome.
- The tenant SMS and provider email were sent before the ticket reference was corrected; both were sent successfully (A2, A3).

## Remaining work
- Landlord (Quinn) to approve or decline the replacement toilet and cistern quote. Review on 2026-08-15; chase by SMS or phone if no reply (3-day rule, sent 2026-08-12).
- Riverside Works to resend the readable quote and photos.
- After approval: assign or approve the work, book the visit, then invoice and final checks.
- Not in the case: the tenant's direct contact, the landlord's contact details, and the spend limit on file.

## Missing or unavailable information
- Quote amount and VAT status (attachment-65 unavailable).
- Photos (attachments 33, 75, 13, 88, 21 unavailable) and report (attachment-04).
- Landlord decision on the quote.
- Confirmed visit date (08/08 vs 09/08 conflict in events 009-013).

## Conflicts between sources
- Visit date: event 009 says 09/08/2026, events 010-013 say 08/08/2026 (and 'tomorrow' from 08/08). The provider attended, so the actual date is unconfirmed but not decisive.
- Event 003 landlord approval (attend only) vs event 017 quote approval request: the quote is not yet approved. The record's 'landlord_approval: confirmed' refers to the earlier attendance approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage is result/needs_quote. The quote is with the landlord and awaiting approval. Outstanding: landlord decision, a readable quote from the provider, and then the work, invoice and closure.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works to resend the quote and photos by email (A2). Tell the tenant by SMS that the visit happened and the quote is with the landlord (A3). Wait for the landlord's reply, reviewing on 2026-08-15 (A6).

**3. Does anything need a human decision, and why?**

No. The quote has not been approved, and the landlord (not a human at the agency) must decide. Escalation is not needed unless the landlord does not reply after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email, 2026-08-12 (event 016): engineer attended the … | 1 | ❌ failed | Ticket 002-quote-approval not found on read-back |
| A2 | `send_message` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","ticket_re… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900422","ticket_ref":"002-quote-approval","body":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"002-quote-approval","reason":"Waiting for Landlord","comment":"Waiting for landlord (Quinn) decision on Riverside Works repla… | 1 | ❌ failed | Ticket 002-quote-approval not found on read-back |
| A5 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email, 2026-08-12 (event 016): engineer attended … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Waiting for landlord (Quinn) decision on Riverside Works r… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
- A1: Ticket ref typo (002-quote-approval vs NBL-002-quote-approval). Retried with correct ref from list_tickets and verified as A5.
- A4: Same ref error. Retried with correct ref and verified as A6.
