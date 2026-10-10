# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and reports the toilet needs replacing; quote already sent to landlord for approval. I recorded the result, asked the provider for the unreadable quote, updated the tenant and put the job on hold to 13 Aug awaiting the landlord.

## Where the case stands
Stage: result (needs quote). Quote sent to landlord (event 017) and awaiting approval; on hold to 2026-08-13. Quote figure not seen by me; asked provider to resend. Tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Works to resend quote/photos as PDF or plain text with total, VAT, scope, and say whether toilet is usable | Riverside Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord for approval, no work until agreed, next update by 14 Aug, tell us if no usable toilet | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Hold waiting for landlord decision on quote; review 2026-08-13, then chase on a second channel | Quinn, landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - The quote and photos did not come through on our side. Please resend the quote as a PDF or reply in plain text with the total, whether it includes VAT, the scope, and the estimated completion time.
> - Is the toilet usable at the moment, or is the tenant without a working toilet?
> 
> Why: Need the quote figure and VAT status to record it exactly and so the landlord can decide; do not start work until approved.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file (event 007 thread)** (verified)

> Dear Noah, Riverside Works have been out and say the toilet needs replacing, as it can't safely be removed to clear the blockage. They've sent a quote, which we've passed to the landlord for approval. Work can't start until they've agreed. We're also checking the quote details with the contractor. We'll update you by 14 August at the latest. If the toilet is unusable and you have no other toilet available, please reply and tell us so we can treat it as more urgent. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not approve the quote or any spend.
- Quote amount, VAT and scope are unseen (attachments unavailable); not recorded or stated.
- Tenant update does not promise a visit date.

## Remaining work
- Landlord decision on quote (agency chases 2026-08-13)
- Provider to resend quote; then record_quote
- On approval, approve quote/book work with Riverside Works
- Confirm with tenant whether toilet is usable; escalate urgency if not

## Missing or unavailable information
- Quote amount, VAT status, scope and photos (attachments unavailable)
- Whether the tenant has a working toilet

## Conflicts between sources
- Visit date: event 009 says next day (09/08) but system/emails say 08/08 while calling it 'tomorrow'. Provider confirms attendance, so treated as done.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done, provider needs a quote for a new toilet and cistern. Quote sent to landlord, no reply yet. Outstanding: landlord approval, quote details from provider, tenant toilet-usability check.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works for the quote as PDF/plain text (email); keep tenant informed (email, sent); wait for landlord, review 2026-08-13 and chase on a second channel.

**3. Does anything need a human decision, and why?**

No. The landlord's approval of the quote is pending and is routine; escalate P2 only if the landlord stays silent after the chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12): engineer attended; toilet needs r… | 1 | ❌ failed | Ticket NBL-002 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 007 thread)","body":"Dear… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002","reason":"Waiting for Landlord","comment":"Quote sent to landlord (event 017) for approval; also awaiting quote figu… | 1 | ❌ failed | Ticket NBL-002 not found on read-back |
| A5 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12): engineer attended;… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord (event 017) for approval; also awai… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
- A1: Used wrong ticket ref; retried with NBL-002-quote-approval (A5).
- A4: Same wrong ref; retried successfully (A6).
