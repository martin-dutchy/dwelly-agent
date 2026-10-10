# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and says the toilet needs replacing; the quote is already with the landlord for approval. I recorded the result, asked the provider for a readable quote, updated the tenant, and put the job on hold with a review on 14 Aug.

## Where the case stands
Stage: result (needs_quote). Provider visited and quoted for a new toilet and cistern. Quote sent to landlord (event 017) for approval; no reply yet. Ticket on hold, review 2026-08-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on the quote; chase on a second channel on 2026-08-14 if silent | Landlord (Quinn) | internal | A4 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to resend the quote as PDF or plain text with amount, VAT and items, and confirm the visit date | Riverside Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote with landlord for approval, next update by 14 Aug, tell us if this is their only toilet | Noah Turner, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - The quote and photos did not come through on our side. Please resend the quote as a PDF, or reply in plain text with the amount, whether VAT is included, and the items covered.
> - Please confirm the date the engineer attended (our record shows 08/08/2026, though the call at event 009 mentioned the next day).
> 
> Why: Need the quote figure to record it accurately; attachments unavailable.

**A3 · send_message → Noah Turner (tenant) via email, tenant email on file (event 007 thread)** (verified)

> Dear Noah, thank you for your patience. Riverside Works have visited and say the toilet needs to be removed and replaced, and they have sent a quote. We have asked your landlord to approve it and will confirm the next steps once they reply. We'll update you by Friday 14 August at the latest. If the toilet is your only one and you can't use it, please tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not approve the quote or any spend.
- I have not seen the quote, photos or report, so the amount and contents are unknown.
- No appointment for the replacement work is booked or implied.

## Remaining work
- Landlord approval decision (owner: landlord; chase 2026-08-14)
- Record the quote once the figure is received, then approve and book work
- Confirm the visit date with the provider
- Final checks, invoice and closure after the work

## Missing or unavailable information
- Quote amount, VAT status and items (attachments unavailable)
- Whether the tenant has another working toilet

## Conflicts between sources
- Visit date: event 009 call says next day (09/08), system and emails say 08/08/2026, and the 'tomorrow' wording does not match. Asked provider to confirm the attendance date.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done, quote needed work identified, quote sent to landlord at event 017 and awaiting approval. Outstanding: landlord decision, readable quote figure, work, invoice, close.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply (chase by SMS or phone on 14 Aug); ask Riverside Works by email for the quote as PDF or plain text; tenant updated by email.

**3. Does anything need a human decision, and why?**

No. The only decision is the landlord's approval of the quote, which is requested and followed up. No escalation needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12): engineer attended;… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 007 thread)","body":"Dear… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord for approval at event 017; awaiting… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-14","party":"Landlord","purpose":"Chase landlord approval of quote on second channe… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
