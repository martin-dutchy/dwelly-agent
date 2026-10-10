# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied to the quote request with only a 👍. I did not treat it as a quote. I asked for a written price and date by email, noted the record, and put the ticket on hold until 2025-10-28.

## Where the case stands
Ticket NBL-004 is paused because the property is void. A quote was requested from the provider, and the provider's only reply was a 👍. It is on hold, waiting for the provider, with a review on 2025-10-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked the provider by email for a written quote (price, VAT status, earliest date), because the 👍 is not a quote. | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold waiting for the provider's quote, review 2025-10-28. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply, but a thumbs-up isn't something we can treat as a quote. Please reply with your price for the cleaning at Flat 2, 172 Alder Lane (living space: vacuum and light clean; en-suite: limescale removal), stating whether VAT is included, ideally as a PDF or plain text.
> - Please also confirm the earliest date you could do the work. The property is empty, so access would be arranged by us.
> 
> Why: Event 009 was an emoji only, with no price or scope. We need a written quote before the landlord can approve any spend.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not establish a quote, a price, acceptance of scope or a visit date.
- No contractor visit is booked.
- Nothing has been sent to the landlord, because there is no figure to approve yet.
- The pop-up plug and flaking paint are outside this cleaning scope.

## Remaining work
- Provider to send a written quote; then record it and send it to the landlord for approval (owner: agency ops).
- Review on 2025-10-28; if there is still no quote, chase on another channel (phone).
- Arrange access via keys or caretaker for the void property once a date is agreed.

## Missing or unavailable information
- Written quote and VAT status
- Provider's availability
- The attachment-86-document in event 006 was unavailable

## Conflicts between sources
- The checkout report is dated 23 June 2026 but signed 24 Oct 2025. The scope is consistent, so I proceeded on the scope and noted it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is confirmed and the provider is assigned. The property is void and the ticket is paused. A quote was requested and the provider has sent only a 👍, so the quote is still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Done: a plain-text request to the provider by email for a written quote with VAT status and earliest date (A1). The ticket is on hold with review on 2025-10-28 (A4).

**3. Does anything need a human decision, and why?**

No. This is routine and one question to the provider moves it forward. There is no tenant to inform.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"ticket: Flat 2, 172 Alder Lane checkout clean","note":"Event 009 from the provider was a thumbs-up emoji only: no quote, no accep… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"Flat 2, 172 Alder Lane","reason":"Waiting for Provider","comment":"Waiting for a written quote (price, VAT status, earliest d… | 1 | ❌ failed | Ticket Flat 2, 172 Alder Lane not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for a written quote (price, VAT status, earl… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
- A3: The first hold used the property address instead of the ticket ref. I retried with NBL-004-emoji-provider-reply and it verified as A4.
