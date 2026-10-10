# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

Provider attended and reports the toilet needs replacing, with a quote. The quote was already sent to the landlord. I recorded the result, updated the tenant, asked the provider to resend the unreadable attachments, and put the job on hold until 13 Aug.

## Where the case stands
Result stage: Riverside Works attended and need a quote approved (new toilet and cistern). Quote sent to landlord at event 017; no reply yet. Ticket on hold, review 2026-08-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on the quote; hold with review 13 Aug | Quinn, landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask Riverside Works to resend the quote (amount, VAT) and photos as PDF or plain text | Riverside Works, contractor | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: quote with landlord, no date yet, next update by 13 Aug | Noah Turner, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Noah Turner (tenant) via email, tenant email on file (event 007 thread)** (verified)

> Dear Noah, Riverside Works have visited and say the toilet needs to be removed and replaced, so they have sent a quote. We have passed it to the landlord for approval. We can't give a date for the work until they reply. We'll update you by 13 August at the latest. If the blockage gets worse or there is any leaking, tell us straight away.

**A4 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Please resend the quote as a PDF or in plain text, with the amount, whether VAT is included, and the photos; the attachments did not reach us.
> 
> Why: We cannot see the quote figure and need it to record the quote and support the landlord's decision.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not approve the quote or spend.
- I have not seen the quote amount, photos or report; none is recorded.
- No work is booked; no date has been promised to the tenant.

## Remaining work
- Landlord to approve or decline the quote (agency chases 13 Aug).
- Record the quote once the figure is received, then approve and book the works.
- Invoice, tenant confirmation and close after the work.

## Missing or unavailable information
- Quote amount, VAT status, photos and report (attachments unavailable).

## Conflicts between sources
- Visit date: call (event 009) says the next day (9 Aug); system and emails say 08/08 yet describe it as 'tomorrow'. The provider's report says the visit happened, so no further action.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit done; quote with the landlord awaiting approval. Outstanding: landlord decision, quote figure and photos, the works, invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's decision (review 13 Aug). Ask Riverside Works by email to resend the quote. Tenant updated by email.

**3. Does anything need a human decision, and why?**

No. The landlord decides on the quote. Escalate only if they stay silent past the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-002-quote-approval","outcome":"needs_quote","evidence":"Riverside Works email (event 016, 2026-08-12): engineer attended,… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 007 thread)","ticket_ref"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord at event 017 for approval; awaiting… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A4 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
_None._
