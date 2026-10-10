# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with only a 👍. I treated that as unclear, asked a plain question on the same email thread, noted the record and kept the job on hold until 2025-10-27.

## Where the case stands
Paused/on hold, waiting for provider. Landlord approval to proceed is confirmed. Contractor assigned and asked for a quote. Their only reply was a 👍. No quote yet. Property is not tenanted.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor in plain words to confirm they will quote, and to send the price (with VAT status) and earliest date | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-10-27 for the contractor's written reply, then chase once on a different channel | Contractor, provider | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply. Could you confirm in words whether you can quote for the checkout clean at Flat 2, 172 Alder Lane (living space vacuum and light clean; en-suite limescale removal)?
> - If yes, please send your price and say whether it includes VAT, as a PDF or plain-text email, and the earliest date you could attend.
> - Our first email's second attachment did not come through; the checkout inspection report is attached to that email. Please tell us if you cannot open it.
> 
> Why: The provider's reply was only a thumbs-up emoji, which is not a quote or a clear acceptance.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not count as a quote, acceptance or a visit date.
- Nothing is approved or booked, and no spend is committed.
- The unavailable attachment on event 006 was not seen.

## Remaining work
- Get the quote from the contractor, record it and check it against the landlord's limit and approval (agency, by 2025-10-27)
- Arrange access through keys or the caretaker once a visit is agreed (no tenant)

## Missing or unavailable information
- Written quote or clear acceptance from the contractor
- Attachment-86 on event 006 was unavailable

## Conflicts between sources
- The checkout report shows an appointment date of 23 June 2026 but a signature date of 24 Oct 2025. The scope is consistent either way, so I noted it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is paused and waiting for the provider. Landlord approval is confirmed and a contractor is assigned. The contractor has not yet given a quote, only a 👍. The property is vacant.

**2. What is the next action, who is it for, and through which channel?**

A plain-language email to the contractor on the existing thread asking for confirmation, a quote and a date (A1). The hold is set to review on 2025-10-27 (A3).

**3. Does anything need a human decision, and why?**

No. This is routine chasing of a provider. If there is still no clear reply after the review date, chase on another channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009 provider reply was a 👍 only: not a quote or confirmed acceptance. Plain question… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for a written quote or clear yes/no from the… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
