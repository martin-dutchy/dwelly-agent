# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with just a 👍. I asked them by email for a proper written quote and availability, noted the record and kept the job on hold with a review on 2025-10-27. No tenant to notify (void) and no human decision needed yet.

## Where the case stands
Ticket NBL-004-emoji-provider-reply: void property, landlord approval to proceed confirmed, contractor assigned, quote requested (event 006). Contractor replied only with 👍. On hold waiting for provider, review 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked the contractor in writing for a confirmed quote (price, VAT status, availability) as the 👍 isn't usable | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold for provider quote, review 2025-10-27 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply. A thumbs-up isn't enough for us to record, so could you confirm in writing whether you can quote for Flat 2, 172 Alder Lane (living space: vacuum and light clean; en-suite: limescale removal)?
> - If so, please send the total price, say whether VAT is included, and give your earliest availability, as a PDF or plain-text email.
> 
> Why: Event 009 was an emoji only; no quote or availability has been received, and we cannot approve or book anything without one.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, acceptance, or a booking.
- Nothing is approved, priced or scheduled.
- The unseen attachment-86 contents are not known.

## Remaining work
- Contractor to send written quote; then record_quote and send to landlord if above spend limit
- Arrange access via keys/caretaker (void) once a date is confirmed
- Review 2025-10-27; if still silent, phone or reassign

## Missing or unavailable information
- Written quote and availability
- Attachment-86 (unavailable)

## Conflicts between sources
- Checkout report dates (appointment 23 June 2026, signature 24 Oct 2025 11:01) are later than the case's today (2025-10-24 01:48); treated as indicative of scope only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused/on hold for the provider. Landlord approval is confirmed and a contractor is assigned, but there is no usable quote: the only reply was an emoji. The quote, landlord approval of it if needed, and access arrangements are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor on the existing thread asking for a written quote, VAT status and availability (done, REQ-101). Then wait until 2025-10-27 and phone or reassign if there is no answer.

**3. Does anything need a human decision, and why?**

No. This is a routine chase. The checkout report's dates look inconsistent (23 June 2026 appointment, signed after today), which is noted for Amelia to check but does not block the quote.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"ticket Case 004 Flat 2, 172 Alder Lane","note":"Event 009 provider reply was a 👍 only: not a quote, not usable. Asked plainly fo… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"Case 004","reason":"Waiting for Provider","comment":"Waiting for a written quote (price, VAT, availability) from the contract… | 1 | ❌ failed | Ticket Case 004 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for a written quote (price, VAT, availabilit… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
- A3: First put_on_hold used the wrong ticket ref; retried with NBL-004-emoji-provider-reply and verified as A4.
