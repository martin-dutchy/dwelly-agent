# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor answered the quote request with only a 👍. I treated it as unclear, asked them one plain question by email, noted the raw reply and report date discrepancy, and set a hold to 2025-10-28. No human decision needed.

## Where the case stands
Paused/on hold (Waiting for Provider, review 2025-10-28). Quote requested from contractor; only reply is an emoji. Property void, no tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked contractor to say in words whether they will quote or already have, and send amount and VAT by 2025-10-28 | Contractor, provider | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-10-28 for the quote | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - We received a 👍 from you. Does this mean you will quote for the clean at Flat 2, 172 Alder Lane (living space vacuum and light clean; en-suite limescale removal), or have you already sent a quote?
> - Please reply in words with your quote amount (and whether VAT is included), ideally as a PDF or plain text, by 2025-10-28.
> 
> Why: An emoji alone cannot be treated as a quote or confirmation, and we need a quote before the landlord can approve spend.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, acceptance or confirmed attendance
- No spend approved, no visit booked
- Nothing here confirms cost

## Remaining work
- Contractor to send quote; then record_quote and send to landlord for approval
- Review 2025-10-28; if no answer, chase on another channel

## Missing or unavailable information
- Contractor quote
- Attachment-86 from event 006 was unavailable

## Conflicts between sources
- Checkout report appointment date 23 June 2026 vs signature 24 Oct 2025 and case date Oct 2025; scope is consistent so relied on for scope only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval confirmed and provider assigned, but ticket is paused (void property). Quote requested; the reply was an emoji only. The quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor on the existing thread asking for a plain-words confirmation and the quote, by 2025-10-28.

**3. Does anything need a human decision, and why?**

No. It is routine clarification; the report date oddity is noted only.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Provider replied with raw text \"👍\" (event 009). Not treated as a quote or confirmation. … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for the contractor to confirm in words and s… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["W… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
_None._
