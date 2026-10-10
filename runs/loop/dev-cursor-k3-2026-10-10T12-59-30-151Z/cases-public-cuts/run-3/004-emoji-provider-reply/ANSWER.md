# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied with only a 👍 to the quote request. I did not treat it as a quote and asked a plain question by email for confirmation and a price. The job is on hold with a review date of 2025-10-27. No human decision is needed.

## Where the case stands
Paused (void property), on hold waiting for provider. Landlord approval is confirmed for provider selection, but there is no quote yet. The provider's only reply was a 👍.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor to confirm they will quote and to send the price as a PDF or plain text, stating VAT | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-10-27 for the quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a thumbs-up emoji, so we can't tell what it means. Can you confirm you will quote for the cleaning at Flat 2, 172 Alder Lane (living space vacuum and light clean; en-suite limescale removal)?
> - Please send your quote as a PDF or plain text, stating the price and whether VAT is included.
> - The attachment on our earlier email may not have opened. Please say if you did not receive the checkout inspection report.
> 
> Why: The reply was an emoji only, which is not a quote or a clear acceptance. We need a price before the landlord can approve spend.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, an acceptance or a booking.
- No spend has been approved and no price is known.
- The cleaning scope does not cover the failed pop-up plug or the flaking paint.

## Remaining work
- Provider to send the quote; the agency then records it and checks it against the landlord's approval or sends it to the landlord.
- Review on 2025-10-27; if there is still no reply, chase on another channel.
- The failed pop-up plug and flaking paint may need separate jobs if the landlord wants them dealt with.

## Missing or unavailable information
- The quote and its VAT status.
- Whether the provider received the checkout report; the event 006 attachment-86 was unavailable.

## Conflicts between sources
- The report is dated 23 June 2026 and its signature is dated 24 October 2025. Both dates are odd relative to today (2025-10-24), so I treated the report only as scope evidence.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is paused because the property is void. Landlord approval is confirmed and the provider is assigned, but the quote request has only had an emoji reply. The quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

A plain request for confirmation and a price, sent by email to the contractor on the existing thread. Hold until 2025-10-27.

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing. There is no tenant to inform because the property is void.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009: provider replied with 👍 only. Not read as a quote or confirmed acceptance. Plai… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for the contractor to confirm they will quot… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
