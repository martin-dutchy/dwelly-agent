# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

Cleaning quote requested from the contractor; they replied with only a thumbs-up. I asked for written confirmation and a priced quote, and kept the job on hold for provider with review on 2025-10-27. No escalation needed.

## Where the case stands
Paused/waiting for provider. Landlord approval to proceed with provider selection is confirmed; quote requested from the contractor, who has only replied with a thumbs-up. No quote received. Property is void.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor to confirm in words and send a priced quote (VAT stated) | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold waiting for provider, review 2025-10-27 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a thumbs-up only, so we can't tell what it means. Can you confirm in words whether you can quote for the cleaning at Flat 2, 172 Alder Lane (living space vacuum and light clean; en-suite limescale removal)?
> - Please send your price, saying whether VAT is included, as a PDF or plain-text email. The checkout report is attached to our earlier email; tell us if you can't open it.
> 
> Why: A thumbs-up is not a quote or a confirmed acceptance; we need the price to take it to the landlord/approve.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up is not a quote, acceptance or confirmed price
- No spend approved and no visit booked
- The attachment-86-document on event 006 was unavailable and not seen

## Remaining work
- Receive and record the quote, then approve within limit or send to landlord (agency, on review 2025-10-27)
- Arrange keys/caretaker access for the void property once quote is approved
- Separate failed pop-up plug and flaking paint issues are not in this cleaning scope; consider separate jobs

## Missing or unavailable information
- Contractor's quote and VAT status
- Meaning of the thumbs-up
- Spend limit/access arrangements not checked

## Conflicts between sources
- Checkout report dates (23 June 2026 appointment, signed 24 Oct 2025) are inconsistent with the case date; treated as a data quirk, scope unaffected.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote requested from provider and job on hold; the provider's only reply is a thumbs-up, so no quote exists yet. Void property, no tenant.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor on the existing thread asking for a written confirmation and priced quote (A1); hold to 2025-10-27 (A2).

**3. Does anything need a human decision, and why?**

No. This is routine chasing; a human is needed only if the quote exceeds limits or the provider stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with a thumbs-up only; asked for wr… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
