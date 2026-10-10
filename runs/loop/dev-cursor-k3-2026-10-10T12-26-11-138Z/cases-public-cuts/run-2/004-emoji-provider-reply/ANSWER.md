# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with only a thumbs-up emoji, which isn't a usable quote. I asked them on the same thread for a written price and VAT status, and put the job on hold until 2025-10-27.

## Where the case stands
Stage mp_time, on hold (Waiting for Provider) until 2025-10-27. Landlord approval to proceed to provider selection is confirmed; contractor assigned and asked to quote (event 006). Contractor's only reply is a thumbs-up emoji, which is not a quote. Property is void, so there is no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked contractor on the same email thread for the written quote amount and VAT status, as a PDF or plain text; re-sent the checkout report. | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-10-27 for the quote; then chase on another channel (phone) if nothing arrives. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply (a thumbs-up). Can you confirm in writing the price to quote for the checkout clean at Flat 2, 172 Alder Lane: living space vacuum and light clean, en-suite limescale removal, and whether it includes VAT?
> - Please send it as a PDF or plain-text email. The attachment on our earlier email did not come through, so the checkout report is attached again.
> 
> Why: A thumbs-up is not a quote; we need an amount before the landlord can approve spend.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up is not a quote, price or booking.
- No spend approved and no visit booked.
- The request does not confirm the contractor accepts the job.

## Remaining work
- Contractor to send a quote; then record_quote and send it to the landlord for approval if above the limit (no spend limit is on file).
- Review on 2025-10-27; phone the contractor if there is still no reply.
- Visit via keys or caretaker, since the property is void.

## Missing or unavailable information
- Quote amount and VAT status
- Attachment-86-document on event 006 was unavailable and has not been seen
- Spend limit not on file

## Conflicts between sources
- The checkout report is dated 23 June 2026 and was signed 24 October 2025, which is inconsistent with today's date. It only establishes the scope, so I used it for scope alone.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is paused, waiting for the provider's quote. The contractor has only sent an emoji. The quote amount and the landlord's approval of spend are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask the contractor by email for a written quote (done, A1), then wait until 2025-10-27 (A2) and phone them if there is no reply.

**3. Does anything need a human decision, and why?**

No. Asking for a quote and holding with a review date is routine work.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with only a thumbs-up emoji (event … | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
