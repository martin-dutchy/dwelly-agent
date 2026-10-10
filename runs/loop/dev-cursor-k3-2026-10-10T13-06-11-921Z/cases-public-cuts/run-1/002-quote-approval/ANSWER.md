# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and says the toilet needs replacing, with a quote. Quote already sent to landlord for approval. I recorded the needs-quote result, asked the provider for a readable quote, updated the tenant, and put the job on hold to 14 Aug with a follow-up.

## Where the case stands
Stage: result (needs quote). Quote sent to landlord at event 017, awaiting decision. Provider asked to resend quote/photos readably. Ticket on hold to 2026-08-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Works to resend quote (amount, VAT, scope) and photos in readable form; do not start work yet | Riverside Works, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord for approval, next update by 14 Aug | Noah Turner, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord decision on quote; chase on second channel 14 Aug | Landlord (Quinn) | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for attending. The quote and photos did not come through on our side. Please resend the quote as a PDF or in plain text, stating the amount, whether VAT is included, and the scope (new toilet and cistern, repiping).
> - Please also resend the photos and confirm your estimated completion time. Please do not start work until we confirm landlord approval.
> 
> Why: Attachments unavailable; we cannot record the quote or state its amount without seeing it.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file (event 007)** (verified)

> Dear Noah, thank you for letting Riverside Works in. They found the toilet can't be safely unblocked as it is and have sent a quote for replacing it. We've passed this to the landlord for approval and will let you know as soon as we hear. We'll update you by 14 August at the latest. If the toilet is your only one and this is causing real difficulty, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or spend.
- Quote amount, scope and photos not seen, so not recorded.
- No work booked; no completion date promised.

## Remaining work
- Landlord decision on quote (agency chases 14 Aug)
- Readable quote from provider, then record_quote
- On approval: approve quote, book works, invoice, close

## Missing or unavailable information
- Quote amount/VAT/scope and photos (attachments unavailable)
- Landlord's spend limit not on property record

## Conflicts between sources
- Visit date recorded as 08/08 in system but call summary says next day (09/08), and messages say 'tomorrow' with 08/08; the visit evidently happened per provider email, so not pursued.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done; provider says toilet needs replacement and sent a quote. Landlord approval of the quote is outstanding; quote contents unseen by us.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works by email for a readable quote and photos; update tenant by email; wait for landlord with chase on 14 Aug.

**3. Does anything need a human decision, and why?**

No human escalation now; the decision is the landlord's. Escalate P2 if the landlord stays silent after the chase and the tenant has no usable toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Provider email event 016 (2026-08-12): engineer attended, toilet … | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 007)","body":"Dear Noah, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote emailed to landlord at event 017 asking approval; al… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-14","party":"Landlord","purpose":"Chase landlord on second channel (SMS/phone) if n… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
