# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The provider attended and reported the toilet needs replacing. The quote had already gone to the landlord. I recorded the result as needs_quote, asked the provider for a readable quote, updated the tenant and put the ticket on hold until 13 Aug.

## Where the case stands
Visit done; Riverside Works say the toilet needs replacing and sent a quote. Quote sent to landlord (event 017) for approval; no reply yet. We have not seen the quote amount or photos (attachments unavailable). Ticket on hold, review 2026-08-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Works to resend the quote (amount, VAT, scope) and photos as PDF/plain text, and not to start work before approval | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord, no date yet, next update by 13 Aug; asked if they have another toilet | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord decision on quote; review 2026-08-13, then chase on a second channel | Quinn, landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Your quote and photos did not come through on our side. Please resend the quote as a PDF or plain text, stating the amount, whether VAT is included, and the scope.
> - Please confirm the estimated completion time, and whether the toilet can be used in the meantime.
> 
> Why: We need to record the quote exactly and the landlord decides on it; please do not start work until we confirm approval.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file (events 007, 012)** (verified)

> Dear Noah, Riverside Works have visited and say the toilet needs replacing, as it can't safely be removed to clear the blockage. They have sent a quote, which we have passed to the landlord for approval. We can't give a date for the work until that decision is made. We will update you by 13 August. If you have no other working toilet and this is a problem, please tell us. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result does not approve the quote or any spend.
- We have not seen the quote amount, so it is not recorded and nothing was said about cost.
- No contractor instruction for the replacement work has been given.

## Remaining work
- Landlord decision on quote (agency, chase 13 Aug)
- Record quote once readable copy received
- Approve quote and have the provider book the work after landlord approval
- Check tenant has a usable toilet; escalate if not
- Invoice, final checks, close

## Missing or unavailable information
- Quote amount, VAT status and scope
- Photos and report
- Whether the tenant has another working toilet
- Landlord spend limit not on file

## Conflicts between sources
- Appointment date: event 009 says the next day (09/08), while events 010–013 say 08/08 and also 'tomorrow'. The visit took place per the provider's email (event 016), so it is not material now.
- Event 003 says the contact was Leo, while event 009 says Eliza. Not material.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done, quote awaiting landlord approval. Outstanding: landlord decision, a readable copy of the quote, then the work, invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works by email for a readable quote; the tenant has been updated by email; wait for the landlord's reply, with a review on 13 Aug.

**3. Does anything need a human decision, and why?**

No. The landlord decides on the quote and the routine steps are covered. Escalate only if the landlord stays silent after the second-channel chase, or if the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12): engineer attended;… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (events 007, 012)","body":"Dear … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017 for approval; also awaiti… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `resume_auto` | {"ticket_ref":"NBL-002-quote-approval"} | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after resume_auto |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017 for approval; also awaiti… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
