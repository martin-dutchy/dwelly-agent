# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied to the quote request with only a 👍, which is not usable. I asked them plainly for a written quote and earliest date, and held the job with a review on 2025-10-28. No human decision is needed.

## Where the case stands
Landlord approval confirmed and provider assigned. Property is void, so the job is paused. The quote was requested on 24 Oct. The provider's only reply is a 👍, so there is no quote. We are waiting on the provider; hold review is 2025-10-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider for a written quote (amount, VAT) and earliest date, as the 👍 is not a quote | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold waiting for provider, review 2025-10-28 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply. Could you send your quote (amount, and whether VAT is included) for the checkout clean at Flat 2, 172 Alder Lane: vacuum and light clean of the living space, and limescale removal in the en-suite? A PDF or plain-text reply is fine.
> - Please also say the earliest date you could do the work. The flat is empty, so we will arrange access once you confirm.
> 
> Why: Provider replied with only a thumbs-up emoji, which is not a quote or a confirmed date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, a visit date or an acceptance of the work.
- No spend approved and no visit booked.
- The attachment-86-document sent with the quote request was unavailable, so I have not seen it.

## Remaining work
- Provider to send a quote; then record it, check it against the landlord's limit or send it for approval.
- Agree access (void property, keys or caretaker) once the provider confirms a date.
- Possible follow-up: the checkout report also records a failed pop-up plug and flaking paint. These are not in this cleaning scope and may need separate jobs.

## Missing or unavailable information
- Quote amount and VAT status
- Provider's availability
- Whether the property has a spend limit or approval cap (not checked)

## Conflicts between sources
- The checkout report is dated 23 June 2026 and signed 24 Oct 2025, which is inconsistent. It was used only for the scope of work.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is approved and a provider is assigned, but it is paused because the property is void. The quote is outstanding: the provider sent only a 👍.

**2. What is the next action, who is it for, and through which channel?**

Ask the contractor for a written quote and a date by email on the existing thread (done, A1). The job is held until 2025-10-28 (A2).

**3. Does anything need a human decision, and why?**

No. This is routine provider follow-up. Escalate only if the provider stays silent after the review date and chasing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with a 👍 only; no quote given. Ask… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
