# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied only with a thumbs-up, which is not a quote, so I asked them in writing for confirmation, a VAT-inclusive price and an earliest date, and put the job on hold until 2025-10-27. The property is void, so no tenant contact is needed, and access is still to be confirmed. No human decision is needed yet.

## Where the case stands
Paused on ticket NBL-004-emoji-provider-reply (cleaning quote, Flat 2, 172 Alder Lane). Landlord approval is recorded as confirmed (event 002). The provider's only reply is a thumbs-up emoji (event 009), which is not a quote or a confirmation of work. The property is void (NOT TENANTED, confirmed by get_property), so there is no tenant route. On hold for the provider, review 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask the cleaning provider in writing to confirm they can do the living-space and en-suite cleaning, give a price including VAT, and give their earliest date. | Cleaning provider (Case 004) | email | A1 ✅ |
| 2 | WAIT | Hold the job for the provider's reply, review 2025-10-27. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Contractor (cleaning provider, Case 004) (contractor) via email, existing thread (event 009 email)** (verified)

> Hello,
> 
> Thank you for your reply. We received only a thumbs-up symbol, so we are not sure whether you are able to take this job.
> 
> Could you please reply in writing with:
> 1. Whether you can carry out the cleaning at Flat 2, 172 Alder Lane, Bellmere, ZZ3 1ZZ, as listed in the checkout report (living space: vacuum and light clean; en-suite: limescale removal).
> 2. Your price for this work, and whether it includes VAT.
> 3. Your earliest available date to attend.
> 
> The property is currently empty, so we will also confirm access arrangements with you once we hear from you.
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up is not a quote, acceptance or booking. Nothing has been assigned or approved.
- No price, visit date or access arrangement has been confirmed.
- The landlord's spend limit is not on file, so the quote cannot be approved yet.

## Remaining work
- Provider to reply with confirmation, price incl. VAT and date (review 2025-10-27).
- Once a quote arrives, send it to the landlord for approval (no spend limit on file).
- Confirm the access route for the void flat (agency key or caretaker) before any visit.
- Resolve the checkout report date conflict.

## Missing or unavailable information
- Provider's written confirmation, price and availability.
- Landlord spend limit or cleaning approval amount.
- Access route for the void property.

## Conflicts between sources
- The checkout report shows an appointment date of 23 June 2026 and a signature of 24 October 2025 11:01, which do not fit the case timeline (today is 2025-10-24 01:48 UTC). I used the report's cleaning items, which match the request, and did not rely on its dates.
- Event 006 lists attachment-86-document as unavailable. The checkout report PDF is present, so I used it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is recorded (event 002). The provider was assigned, but its only reply is a thumbs-up (event 009), which is not a quote. The property is void. Outstanding: the provider's written quote and confirmation, the landlord's approval of the quote, and the access route.

**2. What is the next action, who is it for, and through which channel?**

Email the cleaning provider on the existing thread (event 009) asking for written confirmation, a VAT-inclusive price and an earliest date (MSG-101, ledger A1). The job is on hold for the provider with a review date of 2025-10-27 (ledger A3).

**3. Does anything need a human decision, and why?**

Not yet. The provider's reply is unclear, but a clarifying question is routine work. A human decision only becomes needed if the quote is above the approved amount or the provider does not reply by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Contractor (cleaning provider, Case 004)","recipient_role":"contractor","channel":"email","contact":"existing thread (eve… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with a thumbs-up only (event 009). Aske… | 1 | ❌ failed | Ticket 004-emoji-provider-reply not found on read-back |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with a thumbs-up only (event 009), … | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
- A2: put_on_hold failed because I used the wrong ticket ref. Looked up the ticket with list_tickets and retried with NBL-004-emoji-provider-reply, which verified as A3.
