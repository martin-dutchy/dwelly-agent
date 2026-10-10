# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider answered our quote request with only a thumbs-up. I asked them plainly for a written quote and put the job on hold with a review date of 2025-10-27. The flat is empty, so there is no tenant to message.

## Where the case stands
Paused, waiting for provider. Landlord approval confirmed and a provider is assigned. The provider replied with only a thumbs-up, which is not a quote. No quote has been received.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider to confirm in writing that they can do the job and to send the quote (with VAT status and earliest date) | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold waiting for the provider's quote; review 2025-10-27 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply (a thumbs-up). Can you confirm you can do this job and send your quote, in writing or as a PDF, for Flat 2, 172 Alder Lane: living space vacuum and light clean, en-suite limescale removal?
> - Please say whether the price includes VAT, and the earliest date you could do it. The flat is empty, so we can arrange access.
> 
> Why: The provider replied with only an emoji, which is not a quote. The attachment on the original email was also unavailable, so we need the quote in writing.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up does not count as a quote, acceptance or a visit date.
- No contractor visit is booked and no spend is approved.
- The attachment on the original email was unavailable, so we have not seen it.

## Remaining work
- Provider to send the written quote.
- Once received: record it and send it to the landlord for approval if needed, then book access (agency key or landlord).
- Review on 2025-10-27; if there is still no quote, chase on another channel (phone).

## Missing or unavailable information
- Written quote from the provider
- Provider's availability
- Access arrangements for the empty flat

## Conflicts between sources
- The checkout report is dated 23 June 2026 but was signed 24 October 2025, which is inconsistent. It does not change the cleaning scope, so I made no change for it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is paused waiting for the provider. Landlord approval is confirmed and a provider is assigned, but we have no quote, because the reply was only a thumbs-up.

**2. What is the next action, who is it for, and through which channel?**

Ask the provider by email, on the existing thread, for a written quote. This is done (A1). The hold is set to review on 2025-10-27 (A2).

**3. Does anything need a human decision, and why?**

No. This is routine, and asking the provider for the quote and holding with a review date covers it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with only a thumbs-up; written quot… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
