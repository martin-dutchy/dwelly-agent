# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider answered the quote request with only a thumbs-up emoji. I asked them in plain words for a written quote and kept the job on hold with a review date of 2025-10-28. No human decision is needed yet.

## Where the case stands
Paused/on hold, waiting for the provider's written quote. Landlord approval to proceed to provider selection is confirmed, and the contractor was asked for a quote. Their only reply is a thumbs-up emoji. The property is void.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor in plain words whether the thumbs-up means they will quote, and ask for the quote with VAT status and the earliest date | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold waiting for the provider's quote; review 2025-10-28 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for the thumbs-up. Does it mean you can quote for the cleaning at Flat 2, 172 Alder Lane (living space vacuum and light clean, en-suite limescale removal)?
> - Please send your price as a PDF or plain-text reply, saying whether it includes VAT, and the earliest date you could do the work.
> - Please also tell us if the checkout report attached to our earlier email did not open for you, and we will resend it.
> 
> Why: Reply was an emoji only, so we cannot tell whether a quote was sent or is coming; we need a written quote before asking the landlord to approve spend.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji is not a quote, an acceptance or a confirmed date
- No spend is approved and no visit is booked
- The unseen attachment's contents are not known

## Remaining work
- Get the quote, record it, then send it to the landlord (our-contractor approval is already on file, but the amount needs checking against the spend limit)
- Review on 2025-10-28 and chase on another channel if there is no reply
- Arrange keys or caretaker access for the void property

## Missing or unavailable information
- Written quote
- Confirmation of what the thumbs-up meant
- Access route (keys or caretaker) for the void property

## Conflicts between sources
- The inspection report is dated 23 June 2026 but signed 24 Oct 2025, and has a 2025 previous report. The scope matches the request, so I treated it as a data oddity.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is on hold, waiting for the provider. The landlord has approved, and the provider was asked for a quote. Their reply was an emoji only, so there is no quote yet. The property is void.

**2. What is the next action, who is it for, and through which channel?**

A plain-words clarification and quote request to the contractor by email, already sent (A1). The hold is on until 2025-10-28 (A3).

**3. Does anything need a human decision, and why?**

No. This is a routine wait on the provider. If the contractor is still silent after the review date, chase on another channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Provider replied with a thumbs-up emoji only (event 009), not a quote or a confirmation. As… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for written quote from contractor after emoj… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
