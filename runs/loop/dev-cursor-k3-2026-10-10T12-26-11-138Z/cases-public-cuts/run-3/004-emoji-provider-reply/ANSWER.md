# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with only a 👍, which can't be read as a quote. I asked them on the same email thread for a written price and VAT status. The job stays on hold with a review on 2025-10-27. The property is void, so there is no tenant to message.

## Where the case stands
Ticket at mp_time, on hold waiting for provider. Landlord approval confirmed, provider assigned, property void. Quote requested at event 006; the provider's only reply (event 009) was a 👍, so no quote received.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked the contractor in plain words for a written quote with VAT status, in the body or as a PDF | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold and follow-up set to 2025-10-27; phone the contractor if there is still no quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply, but a 👍 doesn't tell us if you can quote. Please reply in words with your price for the cleaning at Flat 2, 172 Alder Lane (living space: vacuum and light clean; en-suite: limescale removal), and say whether the price includes VAT.
> - Please attach the quote as a PDF or put the figures in the body of the email. The earlier attachment didn't come through on our side; the checkout report is attached to our original email.
> 
> Why: The contractor's reply was only an emoji, so no quote or acceptance has been received.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, acceptance or booking, and I have treated it as none of these.
- No spend approved, no visit booked.
- The unavailable attachment (attachment-86) has not been seen.

## Remaining work
- Get the contractor's written quote, record it and check it against the landlord's approval or spend limit.
- Book access via keys or caretaker, as the property is void.
- Check the report dates: it says appointment 23 June 2026 and a signature of 24 Oct 2025 11:01, which is after the current time.

## Missing or unavailable information
- Written quote amount and VAT status
- Unavailable attachment-86

## Conflicts between sources
- The checkout report gives its appointment date as 23 June 2026 and a signature of 24 Oct 2025 11:01, but the case date is 2025-10-24 01:48. The report is still used only to scope the cleaning.
- The ticket stage is mp_time, but the history says the ticket is paused as the property is void.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is confirmed and a provider is assigned. The property is void and the job is on hold waiting for the provider's quote. The reply was only an emoji, so the quote, its approval and the visit are all still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask the contractor by email for a written quote with VAT status (sent, A1). Then wait, reviewing on 2025-10-27 (A2, A3).

**3. Does anything need a human decision, and why?**

No. This is routine and one question moves it forward. The report date inconsistencies are noted and can be checked at the quote stage.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with only a thumbs-up emoji; asked … | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-004-emoji-provider-reply","due_on":"2025-10-27","purpose":"Check for written cleaning quote from contractor; if none, cha… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
