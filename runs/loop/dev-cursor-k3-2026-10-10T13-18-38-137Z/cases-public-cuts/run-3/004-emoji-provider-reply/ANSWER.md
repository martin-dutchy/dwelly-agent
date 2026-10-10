# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

Checkout clean quote request was sent to the provider; the only reply is a thumbs-up emoji, which can't be read as a quote. I asked a plain question by email on the same thread, kept the job on hold with a review date of 2025-10-28 and noted the raw reply.

## Where the case stands
Paused/on hold, waiting on the provider for a clear answer and a written quote. Property is void. Landlord approval to proceed is on record. No quote received yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor what the thumbs-up means and to send a written quote (with VAT status) by 2025-10-28 | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-10-28, then chase on a different channel if there is no quote | Contractor, provider | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a thumbs-up, so we can't tell what it means. Does it mean you can quote, and have you already sent a quote?
> - Please send your price as a PDF or plain-text reply, stating whether it includes VAT, for the vacuum and light clean of the living space and limescale removal in the en-suite at Flat 2, 172 Alder Lane, by 2025-10-28.
> - The checkout report is attached to our earlier email; please tell us if you can't open it.
> 
> Why: Emoji-only reply is unreadable as a quote or an acceptance; we need a clear answer before landlord approval of any price.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up does not establish a quote, acceptance or a price.
- Nothing here approves spend or books a visit.
- The unseen attachment (attachment-86-document) is not assumed to contain anything.

## Remaining work
- Provider to send quote; then record_quote and send to landlord if needed.
- Review on 2025-10-28; chase on another channel if silent.
- Check the report date anomaly if it matters.

## Missing or unavailable information
- Provider's quote and meaning of the emoji
- Attachment-86-document unavailable

## Conflicts between sources
- Checkout report appointment date is 23 June 2026 but the signature is dated 24 Oct 2025; treated as a data anomaly, not relied on.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote requested from the provider; the reply is an emoji only. Quote outstanding, then landlord sign-off of the price. The property is void, so no tenant contact.

**2. What is the next action, who is it for, and through which channel?**

Plain-question email to the contractor on the existing thread asking for a clear answer and a written quote by 2025-10-28 (A1); hold until then (A2).

**3. Does anything need a human decision, and why?**

No. This is routine provider follow-up; no authority is needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied only with a thumbs-up emoji (event … | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009 raw provider reply: \"👍\" - not a quote or confirmed acceptance. Property is voi… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
