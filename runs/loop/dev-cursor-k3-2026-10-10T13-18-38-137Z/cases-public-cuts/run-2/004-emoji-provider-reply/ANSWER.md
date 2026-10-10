# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied to the quote request with only a thumbs-up emoji. I treated it as unclear, emailed them on the existing thread to ask what it meant and for a priced quote by 27 Oct, noted the raw reply, and kept the job on hold with a 27 Oct review. The property is void, so no tenant was contacted.

## Where the case stands
Ticket NBL-004-emoji-provider-reply: landlord approval confirmed, provider assigned, property void and ticket on hold waiting for the provider. The provider's only reply is a thumbs-up emoji, so there is no quote yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider to say what the thumbs-up meant and send a price (with VAT status) by 27 Oct | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Keep the job on hold waiting for the provider's quote; review 2025-10-27 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a thumbs-up only. Does that mean you can do the clean, or have you already sent a quote? If so, please resend it as a PDF or plain text.
> - Please give your price for the checkout clean at Flat 2, 172 Alder Lane (living space: vacuum and light clean; en-suite: limescale removal), and say whether VAT is included, by Monday 27 October.
> 
> Why: A thumbs-up is not a quote or a clear acceptance; we need the price before the landlord can approve spend. The attachment on our earlier email also showed as unavailable.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up is not a quote, a booking or approval of any spend.
- No contractor visit is booked.
- No cost has been confirmed or approved.

## Remaining work
- Provider to send a clear quote; then record it and send it to the landlord for approval if over the spend limit (agency, review 27 Oct)
- If still no answer by the review date, chase on another channel or reassign (agency)
- Pop-up plug and flaking paint are repairs outside this cleaning scope; a separate job is needed if the landlord wants them done.

## Missing or unavailable information
- Provider's quote and VAT status
- Attachment-86 from event 006 was unavailable and was not seen

## Conflicts between sources
- The checkout report is dated 23 June 2026, but its signature is dated 24 Oct 2025. I relied on it only for the cleaning scope, which matches the request.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is paused and on hold waiting for the provider. Landlord approval is confirmed and the provider is assigned. The provider's reply was an emoji, so we still have no quote. The quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

An email to the provider, on the existing thread, asking what the thumbs-up meant and for a price with VAT status by 27 Oct. The job is on hold with a review on 27 Oct.

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing. A human is only needed if the provider stays silent after the chase, or if the quote goes over the landlord's limit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"ticket Case 004 Flat 2, 172 Alder Lane","note":"Event 009: provider replied with a thumbs-up emoji only (raw text \"👍\"). Not tr… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"Case 004","reason":"Waiting for Provider","comment":"Waiting for a clear quote (price, VAT) for the checkout clean; the provi… | 1 | ❌ failed | Ticket Case 004 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for a clear quote (price, VAT) for the check… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
- A3: The first hold used the wrong ticket reference and was not applied. I found the right reference (NBL-004-emoji-provider-reply) with list_tickets and retried; that hold is A4 and verified.
