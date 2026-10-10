# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider answered our quote request with only a 👍, which can't be treated as a quote. I asked them plainly for a price and date on the existing thread and kept the job on hold, review 2025-10-27. The property is void, so no tenant was contacted.

## Where the case stands
Paused (void property), landlord approval confirmed, provider assigned. Quote requested at event 006; the only reply (event 009) is a 👍 with no quote. Waiting on provider, review 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor in plain words for a priced quote (VAT stated) and earliest date | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold waiting for provider quote, review 2025-10-27 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for your reply. A 👍 doesn't tell us if you can quote, so could you reply with your price (say whether VAT is included) for: living space vacuum and light clean, and en-suite limescale removal at Flat 2, 172 Alder Lane? A PDF or plain-text email is fine.
> - Please also tell us the earliest date you could do the work. The flat is empty, so please don't assume anyone will be there; we will confirm access with you.
> 
> Why: Event 009 is an emoji only, with no quote. The attachment on the earlier email was unavailable.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not a quote, an acceptance or a visit date
- No work is approved or booked and no cost is agreed
- Nothing is established about the unseen attachment or the landlord's spend approval amount

## Remaining work
- Provider to send quote; then record_quote and send to the landlord for approval if needed
- Arrange access by keys or caretaker, because the property is void
- Pop-up plug and flaking paint in the report are separate repair issues, not in this cleaning scope

## Missing or unavailable information
- Contractor's quote and availability
- Attachment-86-document was unavailable

## Conflicts between sources
- Inspection report is dated 23 June 2026 but signed 24 October 2025, and the case is in October 2025. Treated as a date anomaly that doesn't affect the cleaning scope.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and provider assigned, but the job is paused as the property is void. No quote has been received (👍 only). Quote, access arrangement and visit are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor on the existing thread asking for a priced quote and availability (done, A1). The wait is recorded with a review on 2025-10-27 (A2).

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing, and nothing needs authority yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied with a 👍 only (no quote). Plain re… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
