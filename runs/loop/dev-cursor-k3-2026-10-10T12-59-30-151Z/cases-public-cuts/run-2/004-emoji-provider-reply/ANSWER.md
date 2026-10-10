# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider replied to the quote request with only a 👍, which is not a usable quote. I asked plainly for a written quote and a date, kept the job on hold with a review date of 2025-10-27, and noted the record. No human decision is needed.

## Where the case stands
Paused (void property), landlord approval confirmed, provider assigned, quote requested. Provider's only reply was a thumbs-up, so no quote exists. Waiting on provider, review 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked the contractor for a written quote (VAT stated) and earliest date, since the reply was only a 👍 | Contractor | email | A1 ✅ |
| 2 | WAIT | Hold for provider quote, review 2025-10-27 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was just a thumbs-up, so we can't tell if you are quoting. Please reply with your price in writing (stating whether VAT is included) for: vacuum and light clean of the living space, and limescale removal in the en-suite, as per the checkout report.
> - Please confirm the earliest date you could attend. The flat is empty, so access would be by agency key; we will confirm arrangements once the quote is approved.
> 
> Why: Event 009 is an emoji only and is not a quote or a usable answer.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, acceptance or a booking.
- No visit is booked and no spend is approved.
- Nothing here confirms the report's date discrepancy.

## Remaining work
- Provider to send written quote; then record_quote and check against the landlord's approval/limit.
- Book the visit via agency key once the provider confirms a date.
- If there's no reply by 2025-10-27, chase on another channel.

## Missing or unavailable information
- Written quote and VAT status
- Provider's available date
- Attachment-86 on event 006 was unavailable

## Conflicts between sources
- Checkout report appointment date is 23 June 2026 but it was signed on 24 Oct 2025; treated as a data error, noted only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is confirmed and a provider is assigned. The property is void and the job is paused on hold. The provider has only sent a 👍, so the quote is still outstanding, along with a visit date.

**2. What is the next action, who is it for, and through which channel?**

Done: email to the contractor on the existing thread asking for a written quote and an earliest date. Next: wait until 2025-10-27, then chase on another channel if there is no reply.

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing. The report date mismatch is noted only.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with 👍 only; asked for a written q… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009 provider reply was 👍 only: not a quote. Property is void, so no tenant messages.… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
