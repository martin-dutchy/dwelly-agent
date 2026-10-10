# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** escalated · **Severity:** routine

Clarke reports the lounge spotlights and ceiling board are done. His invoice is £277.72 + VAT against the approved £198.37 + VAT. I recorded the result and invoice, held payment, asked the contractor to explain, and escalated to accounts.

## Where the case stands
Stage: result. Works reported complete by the contractor. Invoice 2311 (£333.26 inc VAT) is about 40% over the approved quote (£238.04 inc VAT). Payment is held. We are waiting on the contractor for an explanation and photos, and accounts for a decision. The ticket cannot close yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor to explain the £79.35 + VAT increase and send the completion photos and a breakdown | Clarke, contractor | email | A4 ✅ |
| 2 | ESCALATE_TO_HUMAN | Accounts to decide on the invoice variance after the contractor replies; payment held | accounts | internal | A5 ✅ |
| 3 | WAIT | Chase the contractor on 2025-10-10 | Clarke, contractor | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> - Invoice 2311 (£277.72 + VAT) is higher than the approved quote of £198.37 + VAT. Please explain the extra £79.35 + VAT and say whether extra work was agreed with anyone beforehand.
> - Please send the promised photos of the completed work and a breakdown of the invoice.
> 
> Why: Invoice exceeds the approved amount; payment is on hold until explained and approved.

## Escalation
- **P3 → accounts** (verified): Invoice 2311 is about 40% over the approved quote; the automatic check did not flag it.
  - Known: Quote £198.37 + VAT (£238.04 inc), landlord replied "Pls go ahead" on 2025-09-28 against that figure. Invoice 2311 on 2025-10-08: £277.72 + VAT (£333.26 inc), +£95.22 inc VAT (~40%). Work reported complete. Property is void. Payment held (HOLD-101). Contractor asked for explanation and photos (REQ-102). Invoice recorded as landlord_direct, an assumption.
  - Missing: Reason for the increase, any variation agreed, photos, who pays (landlord or tenant deposit deduction), and the checker's "matches approval" result, which conflicts with the figures.
  - Options: Ask the landlord to approve the higher amount once the contractor explains; Pay only the approved £238.04 inc VAT; Dispute the invoice with the contractor
  - Recommendation: Keep payment held. Once the contractor explains, ask the landlord to approve the variance or pay only the approved amount. Do not close until photos and a decision are in.

## What this does not establish
- Recording the work result does not confirm the work quality; photos are outstanding.
- Holding payment does not decide whether the extra cost is valid or who pays.
- The landlord's approval covered only the £198.37 + VAT quote, not the higher invoice.

## Remaining work
- Contractor to explain the overage and send photos
- Accounts or the landlord to decide on the variance
- Release the held payment or pay a reduced amount
- File the invoice and photos, tell the landlord, then close. The property is void, so there is no tenant to message.

## Missing or unavailable information
- Reason for the £79.35 + VAT overage
- Completion photos
- Who pays (landlord direct or deposit deduction)

## Conflicts between sources
- The invoice checker returned no flags and said it matched the approval, but the invoice is £333.26 inc VAT against the approved £198.37 + VAT (£238.04). I trusted the figures in the documents.
- The contractor says the works were at a 'studio'. The property is Flat 8, and the contractor name varies (Clarke/Harriet) in the notes. This is likely a labelling issue, not a different property.
- The check-out report is dated 25 August 2026, which is after today (2025-10-08) and probably a typo.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works are reported complete and the invoice has been received. The invoice is about 40% over the approved quote. Photos, an explanation of the extra cost, and a decision on it are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email the contractor, Clarke, asking for an explanation of the overage, photos and a breakdown. Payment is held, and a follow-up is set for 2025-10-10.

**3. Does anything need a human decision, and why?**

Yes. Accounts must decide whether to approve the higher amount, because the landlord only approved the quote and I have no authority to pay beyond it. Escalated as ESC-103 (P3).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-007-0235","outcome":"completed","evidence":"Clarke (contractor) email 2025-10-08 16:28: two spotlights and ceiling board … | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_work_result |
| A2 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Contractor email 2025… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A3 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311","reason":"Invoice £277.72 + VAT is about 40% above the approved quote of £198.37 + VAT, with no… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A4 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Invoi… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A5 | `escalate_to_human` | {"priority":"P3","team":"accounts","reason":"Invoice 2311 is about 40% over the approved quote; the automatic check did not flag it.","known… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke, contractor","purpose":"Chase explanation of invoice overage and completi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
