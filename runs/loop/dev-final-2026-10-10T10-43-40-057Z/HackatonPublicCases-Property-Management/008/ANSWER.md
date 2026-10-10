# Case 008: ANSWER

**Outcome:** escalated · **Severity:** routine

The vacant-property check-out works job is waiting on the landlord to choose between two quotes (Eliza Bennett £1,370; Kendall £1,700+VAT). I requested a formal landlord decision with a recommendation and escalated the unpaid previous-invoice question to accounts. No quote was approved.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Two quotes are in, and the agency emailed the landlord on 6 May asking which to proceed with. Outstanding: the landlord's decision; the quotes aren't like-for-like (Eliza's excludes the burnt carpet and replaces a tap that only drips; VAT is unclear; Kendall's scope is unconfirmed); the status of the previous refurb invoice; and the roof works to be inspected first. No works are booked.

**2. What is the next action, who is it for, and through which channel?**

A formal approval request (APR-101) went to the landlord, Langley, recommending a re-quote from Eliza Bennett that includes the carpet and a tap repair. The invoice-payment query went to accounts (ESC-102). The contractors can't be instructed until the landlord decides.

**3. Does anything need a human decision, and why?**

Yes. Accounts must confirm whether the previous invoice has been paid, because I can't see payment records. The landlord must approve the spend. I've not approved either quote because the landlord hasn't confirmed and the scopes differ.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Which quote to proceed with for check-out works at Flat 5, 55 Lantern Q… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"accounts","reason":"Landlord asked whether the previous refurb invoice from the contractor (Kendall) has been paid;… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P3 → accounts** (verified): Landlord asked whether the previous refurb invoice from the contractor (Kendall) has been paid; contractor is chasing. I can't see payment records.
  - Known: Job NBL-008-3466, Flat 5, 55 Lantern Quay. Event 024 (6 May 2025) asks the landlord about the unpaid prior refurb invoice. Quotes: Eliza Bennett £1,370 (carpet excluded), Kendall £1,700+VAT. Landlord has not yet confirmed a quote. Landlord email (event 023) and chaser (event 021) reference other properties, so records look muddled. No tickets exist in the system for this job.
  - Missing: Payment status of the previous refurb invoice; which property it relates to; landlord decision on quote; quote scope comparison; check-out report is dated Jan 2026 but signed Apr 2025 (date conflict).
  - Options: Check payment status and reply to the landlord and contractor; Hold the invoice if the landlord disputes it
  - Recommendation: Confirm payment status, tell the landlord, and clean up the cross-property references on this job. Do not approve either quote until the landlord confirms.

## Failed or unverified actions
_None._
