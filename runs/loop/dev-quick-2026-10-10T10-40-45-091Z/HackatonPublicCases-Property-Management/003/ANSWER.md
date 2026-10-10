# Case 003: ANSWER

**Outcome:** escalated · **Severity:** routine

The checkout clean and dumped-item removal job for Flat 30, 30 Harbour View is on hold, and the record contradicts itself: the contractor was told to proceed, then the job was put on hold two minutes later. No estimate amount is on file, no ticket exists in the system, and I had no contact details for the contractor, so I could not message him. I escalated to maintenance (ESC-101, P2) to confirm the hold, obtain an itemised estimate and check the inspection report dates. No spend was approved and no contractor message was sent.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The job is on hold (Theo Quinn, 17:40 UTC, 'Hold for works') after a 'proceed' email to contractor Bennett and an 'Estimate approved' note at 17:38-17:39. Outstanding: the estimate amount and itemised scope, the approval basis, whether the hold means stop, the contractor's contact details, and a ticket record for NBL-003-2766.

**2. What is the next action, who is it for, and through which channel?**

The next action is a human decision on the hold and estimate, escalated to maintenance as ESC-101. Once confirmed, message contractor Bennett to pause work and send a written, itemised estimate through the contact on file. I could not send this now because no contact details were available in this run.

**3. Does anything need a human decision, and why?**

Yes. The estimate amount is unknown, so spend cannot be approved, and the contradictory 'proceed' and 'hold' instructions need a decision. The inspection report's dates also conflict (2026 appointment vs 2025 signature), so the scope needs checking before any work.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Checkout clean and dumped-item removal estimate for Flat 30, 30 Harbour View is stalled. The… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |

## Escalations
- **P2 → maintenance** (verified): Checkout clean and dumped-item removal estimate for Flat 30, 30 Harbour View is stalled. The record says the estimate was approved and the contractor told to proceed, then the job was put on hold two minutes later. No estimate amount is on file, so no spend can be approved.
  - Known: Job NBL-003-2766 was sent to contractor Bennett on 22 Jul 2025 16:00 with the checkout inspection report attached. Bennett asked if the attachment had not come through. The job was re-sent and the email said "Received :) Please proceed" at 17:38. A note says "Estimate approved" at 17:39. Theo Quinn then placed the job on hold ("Other: Hold for works") at 17:40. The report lists bedroom and bathroom cleaning, dumped items in both rooms, a bedroom carpet clean, a failed bedroom door handle and a damaged bathroom toilet roll holder. No ticket exists under NBL-003-2766 in list_tickets or get_ticket.
  - Missing: The contractor's estimate amount and itemised scope; who approved it and at what amount; whether the hold means stop or pause; Bennett's contact details (not on file in this run); the inspection report's dates conflict (2026 appointment vs 22 July 2025 signature); no ticket record exists.
  - Options: Keep on hold; get Bennett's written itemised estimate before any work. Recommended.; Lift hold, confirm amount and approver, approve within limit, instruct Bennett to proceed.; Cancel and re-raise as a properly recorded checkout clean once the report date is confirmed.
  - Recommendation: Keep the job on hold. Ask Theo Quinn whether the hold means stop, and check the inspection report dates. Get Bennett's written itemised estimate, and approve only once amount and approver are recorded. Message Bennett to pause work until confirmed.

## Failed or unverified actions
- none: No state-changing actions failed. My first escalate_to_human attempts failed validation because of a formatting error in the options parameter, and I resent it correctly (ESC-101). The contractor message was not sent because no contact details were on file.
