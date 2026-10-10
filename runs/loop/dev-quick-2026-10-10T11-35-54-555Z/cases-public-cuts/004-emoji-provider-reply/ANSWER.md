# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied only with a thumbs-up, which is not a usable quote or confirmation. I asked them in writing for a price with VAT status and an earliest date, and held the job until 2025-10-27. No tenant is involved because the property is void.

## Where the case stands
Paused on a void property (NOT TENANTED, event 004). Landlord approval (event 002) and provider assignment (event 003) are recorded. Amelia put the job on hold for the provider (event 007). The provider's only reply is a thumbs-up (event 009), which is not a quote or a confirmation. No quote, visit or work result yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask the provider in writing for a plain-text price (with VAT status) and their earliest attendance date for the living-space vacuum and light clean and the en-suite limescale removal. Told them not to quote the plug and paint items. | Cleaning provider (existing thread, event 009) | email | A1 ✅ |
| 2 | WAIT | Hold the job for the provider's written reply, review on 2025-10-27; chase by phone if still nothing. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Contractor (cleaning provider, Flat 2, 172 Alder Lane) (contractor) via email, existing thread (event 009 email)** (verified)

> Hello,
> 
> Thank you for your reply. We received a thumbs-up only, so we are not sure whether you are able to quote.
> 
> Please reply in writing with:
> 1. Your price for the cleaning at Flat 2, 172 Alder Lane, Bellmere, ZZ3 1ZZ: vacuuming and light clean of the living space, and limescale removal in the en-suite (shower area, facing and tap).
> 2. Whether the price includes VAT.
> 3. The earliest date you could attend. The property is currently empty, so access will be arranged by us.
> 
> Please note the checkout report also lists a failed pop-up plug mechanism and flaking paint in the en-suite. These are not part of this cleaning request, so please do not quote for them.
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up does not confirm the provider will attend, the price or the date.
- No quote received, so nothing approved or spent.
- No tenant contact: the property is void.
- The failed pop-up plug and flaking paint are not part of this cleaning job and are not yet logged as a separate repair.

## Remaining work
- Provider to send a written quote (operations; review 2025-10-27).
- Once a quote arrives: record it and send to the landlord for approval; no spend limit is on file.
- Decide whether to log the failed en-suite pop-up plug and flaking paint as a separate repair (not done in this run).
- Verify the checkout report dates (see conflicts).

## Missing or unavailable information
- Provider's price and VAT status.
- Provider's earliest attendance date.
- Spend limit for this property (none on file).
- Attachment 'attachment-86-document' is unavailable; the checkout PDF is present.

## Conflicts between sources
- The checkout report shows an appointment date of 23 June 2026 and a signature date of 24 October 2025, while today is 2025-10-24. The 'current' inspection date is therefore in the future. I relied on the cleaning findings but the dates need checking.
- The history says 'Landlord approval confirmed', but the property is void and no spend limit is on file. I treated that approval as covering the provider step only, not the spend.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused on a void property. Landlord approval (event 002) and provider assignment (event 003) are recorded. The provider's only reply is a thumbs-up (event 009). Outstanding: a written quote, landlord approval of the amount, the visit and completion.

**2. What is the next action, who is it for, and through which channel?**

Email the provider (existing thread, event 009) asking for a written price with VAT status and an earliest date. Hold the job until 2025-10-27 for review.

**3. Does anything need a human decision, and why?**

No. It is routine. A decision is only needed later if the quote exceeds what the landlord approves; no spend limit is on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Contractor (cleaning provider, Flat 2, 172 Alder Lane)","recipient_role":"contractor","channel":"email","contact":"existi… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied only with a thumbs-up (event 009), … | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
