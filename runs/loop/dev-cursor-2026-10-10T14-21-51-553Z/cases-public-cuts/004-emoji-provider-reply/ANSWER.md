# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider's only reply to the quote request was a thumbs-up emoji, which cannot be read as a quote. I asked them in plain terms for an itemised quote by 27 Oct and put the job on hold with that review date. Nothing needs a human yet.

## Where the case stands
Ticket paused/on hold, waiting on provider for a readable itemised quote. Landlord approval to proceed to provider selection already confirmed. Property is void; no tenant to contact.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask contractor to clarify the thumbs-up and send an itemised quote by 27 Oct | Contractor (assigned provider) | email | A1 ✅ |
| 2 | WAIT | Hold until 27 Oct 2025 for the provider's quote, then review | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a thumbs-up only, so we can't tell what it meant. Have you already sent a quote, or are you confirming you will quote? Please reply in plain text or PDF.
> - Please give an itemised price (say if VAT is included) for: living space vacuum, living space light clean, and en-suite limescale removal, per the checkout report attached to our email of 24 Oct.
> - Please reply by 27 Oct 2025. The flat is empty, so please tell us what access you need (agency keys).
> 
> Why: Provider's only reply was an emoji; we need a readable quote before the landlord can approve spend.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, acceptance or a booked visit
- No spend approved or visit booked
- Landlord approval to proceed does not approve a specific price

## Remaining work
- Provider: send readable itemised quote; then record_quote and check against landlord approval/limit
- Agency: review on 27 Oct; do not send a fourth identical reminder, change channel if no reply
- Agency: consider separate jobs for pop-up plug and flaking paint from the report

## Missing or unavailable information
- Readable quote and amount
- attachment-86-document unavailable
- Access arrangements (agency keys) for empty flat

## Conflicts between sources
- Checkout report dated 23 June 2026 (future) but signed 24 Oct 2025; treated as a date error, scope of cleaning is consistent with the request
- Email references attachment-86-document (unavailable) while only the checkout report PDF is on file

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote was requested from the provider on 24 Oct. They replied only with a 👍. No quote has been received, no visit booked, and the landlord has not yet seen any figure. The empty flat means there is no tenant.

**2. What is the next action, who is it for, and through which channel?**

Plain-language request to the contractor by email on the existing thread for clarification and an itemised quote by 27 Oct, with a hold and review on 27 Oct.

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing. A human would only be needed if the provider stays silent after the review, or for the out-of-scope defects.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with only a 👍 (event 009); asked f… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Raw provider reply: \"👍\" (event 009), treated as unreadable, not a quote or acceptance. C… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
