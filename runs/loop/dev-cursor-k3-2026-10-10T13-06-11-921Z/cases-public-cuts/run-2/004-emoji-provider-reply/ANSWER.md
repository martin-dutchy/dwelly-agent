# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider's only reply to our quote request was a 👍, which cannot be read as a quote or acceptance. I asked them plainly by email to clarify and send the quote, noted the record, and put the job on hold with a review date of 28 Oct.

## Where the case stands
Landlord approval confirmed, provider assigned, flat is void. We asked the provider for a quote and they replied only with a 👍. No quote has been received. Ticket on hold waiting for the provider, review 2025-10-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider whether the 👍 means they accept, and whether a quote has been sent; ask for it as a PDF or plain text | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold waiting for the provider, review and chase on 2025-10-28 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply (we received a 👍). Can you confirm whether that means you can do the cleaning at Flat 2, 172 Alder Lane (living space vacuum and light clean, en-suite limescale removal)?
> - Have you already sent a quote? If so, please resend it as a PDF or plain-text reply with the price and whether VAT is included. If not, please send it when ready.
> - Our earlier email's extra attachment did not come through; the checkout report is attached to the main email. Please tell us if you cannot see it.
> 
> Why: The provider's reply was an emoji only, so we cannot tell if they accepted or have quoted. No quote has been received.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, an acceptance or a booking
- No spend has been approved or committed
- No visit is booked
- No tenant has been contacted because the property is void

## Remaining work
- Provider to clarify and send a quote
- Then record the quote and send it to the landlord if approval does not already cover the amount; arrange access by keys or caretaker
- The ticket was left in the paused/mp_time stage; the void-property pause was not cleared

## Missing or unavailable information
- Provider's quote and acceptance
- The extra attachment on event 006 was unavailable and has not been seen

## Conflicts between sources
- The checkout report says the appointment was 23 June 2026 but the signature is dated 24 Oct 2025, which is inconsistent. The scope still matches the request.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord has approved and a provider is assigned. The property is void and the job is paused. The provider replied with a 👍 only. The quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Plain clarifying email to the contractor on the existing thread, already sent (A1). Then wait, with a chase on 2025-10-28 (A3, A4).

**3. Does anything need a human decision, and why?**

No. This is routine provider clarification. Nothing needs a human yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009 provider reply was a raw \"👍\" only. Not treated as a quote or confirmed accepta… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for the provider to clarify the 👍 reply and… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-004-emoji-provider-reply","due_on":"2025-10-28","purpose":"Chase provider for the quote if none has arrived","party":"Con… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
