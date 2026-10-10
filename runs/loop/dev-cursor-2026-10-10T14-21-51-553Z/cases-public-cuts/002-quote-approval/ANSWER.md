# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The provider attended and says the toilet must be replaced. The quote is already with the landlord. I recorded the result, asked the provider for a readable quote, updated the tenant and set a hold and follow-up for 13 Aug.

## Where the case stands
Stage: result (needs_quote). Provider attended and quoted for a new toilet and cistern. The quote was sent to the landlord at event 017 and approval is awaited. The ticket is on hold until 2026-08-13. The provider has been asked for a readable quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Works for a readable quote PDF, the photos and the actual visit date | Riverside Works, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on status, ask if they have another toilet, next update by 14 Aug | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord decision, review 13 Aug, then chase by SMS | Landlord (Quinn) | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend your quote as a readable PDF (or plain text) with the amount, whether VAT is included, and the items covered, plus the visit photos, by 2026-08-14.
> - Please confirm the date the engineer attended, as our records show both 08/08 and 09/08/2026.
> 
> Why: The quote attachment was not readable on our side, so we cannot record the figure. Please do not start work until we confirm landlord approval.

**A3 · send_message → Noah Turner (tenant) via email, existing thread (event 007 email)** (verified)

> Hello Noah, Riverside Works have visited and say the toilet needs to be removed and replaced, as the blockage can't be cleared otherwise. Their quote has gone to your landlord for approval, so we can't give a date for the work yet. Do you have another working toilet you can use? If not, please tell us today and we'll try to speed things up. We'll update you by Friday 14 August at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not approve the quote or the spend.
- No work has been authorised yet.
- The quote figure has not been seen or recorded.

## Remaining work
- Landlord decision on the quote (landlord). Chase by SMS on 13 Aug (agency).
- Readable quote and photos (provider). Record the quote once received.
- Confirm the tenant has a usable toilet. If not, speed things up.

## Missing or unavailable information
- Quote amount, VAT status and scope (attachments unavailable)
- Actual visit date
- Landlord's reply and spend limit

## Conflicts between sources
- Visit date: event 009 says 'next day' (09/08), events 010-013 say 08/08 but describe it as 'tomorrow'. Asked the provider to confirm.
- Provider email names Eliza/Riverside Works, and the call summary names Northbridge Lettings. Treated as the same parties.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The visit is done and the quote has gone to the landlord. We are waiting for the landlord's approval. The readable quote and photos are outstanding from the provider.

**2. What is the next action, who is it for, and through which channel?**

Ask the provider for a readable quote by email, and update the tenant by email. Chase the landlord by SMS on 13 Aug if there is no reply.

**3. Does anything need a human decision, and why?**

No. The decision on the quote is the landlord's, and it is pending. Escalate only if the landlord stays silent after the chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email 2026-08-12 (event 016): engineer attended; … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hello Noah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote (Riverside Works email 12 Aug) sent to landlord even… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-13","party":"Landlord","purpose":"Chase landlord on second channel (SMS) for quote … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
