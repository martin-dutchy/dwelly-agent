# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** routine

The 8 August visit did not clear the blocked toilet; Riverside Works reports it needs replacing and has quoted for a new toilet and cistern. The quote was sent to the landlord on 12 August for approval, which is still outstanding. I recorded the needs-quote result, placed the job on hold for the landlord until 14 August, updated the tenant by SMS, and asked Riverside Works to resend the readable quote.

## Where the case stands
Ticket NBL-002-quote-approval is at result stage. Riverside Works attended on 8 Aug 2026 but did not clear the blockage; they report the toilet needs replacing/repiping and sent a quote for a new toilet and cistern. The quote was forwarded to the landlord (Quinn) on 12 Aug 06:17 UTC asking for approval to raise an order. Approval for the replacement is outstanding. The quote amount and photos are not readable in the file.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the toilet could not be cleared, that a replacement quote has gone to the landlord, and that we will update him once we hear back. | Noah Turner, tenant | sms | A3 ✅ |
| 2 | CHASE_PROVIDER | Ask Riverside Works to re-send the quote amount (plus VAT or not), itemised scope and photos, since the attachments are unreadable on our file. | Riverside Works, contractor | email | A4 ✅ |
| 3 | WAIT | Hold the job waiting for the landlord's decision on the replacement quote; review on 2026-08-14. | internal | internal | A2 ✅ |
| 4 | OTHER | Record the work outcome as needs_quote with the provider's evidence. | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Noah Turner (tenant) via sms, 07700 900422** (verified)

> Hello Noah, this is Northbridge Lettings about the blocked toilet at Flat 3, 15 Willowmere Road. Riverside Works attended on 8 August. They could not clear the blockage safely and say the toilet needs replacing. We have sent their quote to the landlord for approval and will update you once we hear back. If you have any further problems, please call us. Thank you for your patience.

**A4 · send_message → Riverside Works (contractor) via email, existing thread (event 016 email from Riverside Works)** (verified)

> Thank you for your visit report for Flat 3, 15 Willowmere Road. The quote and photos did not come through legibly on our file. Please reply with the total quote amount (and whether it is plus VAT), the itemised scope, and the re-sent quote and photos. We have sent the quote to the landlord for approval and will not instruct works until it is approved.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the quote to the landlord does not mean they approved it; no approval is recorded.
- No spend has been committed and no contractor has been instructed for the replacement.
- The recorded result does not confirm the cause of the blockage or who pays for the replacement.
- The quote amount is not established; no record_quote was made because the figure is not readable.

## Remaining work
- Landlord (Quinn) to approve or decline the replacement toilet and cistern quote (review 2026-08-14).
- Obtain the quote amount and readable documents from Riverside Works, then record_quote and seek approval within the spend limit.
- Once approved, book the replacement visit and confirm access with the tenant.
- Record the invoice, file documents and close the ticket after completion and landlord confirmation.

## Missing or unavailable information
- Quote amount and whether VAT applies (attachment-65 unavailable).
- Readable photos and inspection report (attachments unavailable).
- Landlord's decision on the replacement.
- Property spend limit and landlord contact details (property record shows only the address).

## Conflicts between sources
- Event 003 and 008 say the contractor would call the tenant; event 009 says the visit was agreed with the tenant, and event 014 shows no work result. Visit outcome is taken from the provider email (event 016).
- Event 009 describes earlier failed attempts to unblock; the visit of 8 Aug is the scheduled appointment in event 010/011, so the 'attempts' are treated as earlier history.
- Initial approval (event 002/003) covered sending a contractor to attend, not the replacement; the replacement approval is still outstanding.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At result stage. The visit happened on 8 Aug but the blockage was not cleared; the contractor's replacement quote is with the landlord, awaiting approval. Outstanding: landlord decision, readable quote amount, the replacement visit, invoice, and closure.

**2. What is the next action, who is it for, and through which channel?**

Tell the tenant Noah Turner by SMS on 07700 900422 (done, MSG-101). Ask Riverside Works by email on the existing thread for the quote amount and readable documents (done, MSG-102). The landlord Quinn already has the quote (event 017) and must respond; a review is set for 2026-08-14.

**3. Does anything need a human decision, and why?**

Not yet. The replacement needs landlord approval, which is the landlord's decision. No escalation is needed while that is pending; escalate if the landlord does not respond by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12 04:45 UTC): engineer… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Landlord (Quinn) to approve or decline the Riverside Works… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900422","body":"Hello Noah, this is Northbridge L… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email from Riversi… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
