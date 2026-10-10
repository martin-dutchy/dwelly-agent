# Case 12: ANSWER

**Outcome:** escalated · **Severity:** routine

A Standard Breathing Space started 01/10/2026 covering the £3,700 rent arrears, so arrears contact and enforcement must stop while ongoing rent continues. The tenant's £100/month payment plan was not accepted; it was escalated to management (ESC-105), and the tenant, debt adviser and landlord were told. The scheduled arrears SMS (12 Oct) and Section 8 ground 8 review (14 Oct) still need cancelling by a person, as no tool exists for that.

## Answers
**1. What legal constraint applies to this account right now and what does it mean you cannot do?**

A Standard Breathing Space started 01/10/2026 and covers the £3,700 rent arrears. For its duration we cannot contact the tenant about those arrears (contact goes through Hackney Money Advice CIC), cannot take enforcement action, and cannot issue arrears-based notices such as the ground 8 Section 8 notice. The 12 Oct arrears SMS and 14 Oct Section 8 review must not run. Ongoing rent of £1,850/month remains payable and rent contact continues.

**2. Can you accept the proposed payment plan?**

No, not directly. The £100/month on top of rent is a payment plan, which needs a human decision, and the arrears are under Breathing Space. I passed it to management (ESC-105) and told the tenant and adviser that any arrangement will be handled through the adviser.

**3. What actions and communications do you make, to whom?**

Added a note to the tenant record (NOTE-101). Emailed the tenant (MSG-102) to acknowledge the Breathing Space, explain that arrears go via his adviser, confirm rent still applies and that the plan is with management. Emailed the adviser Ruth Okoye (MSG-103) to confirm the arrears hold and ask for receipt confirmation. Emailed landlord Ben Hartley (MSG-104) about the Breathing Space, the paused actions and the pending proposal. Escalated to management (ESC-105).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1020 Daniel Reyes / P-220 Flat 3, 8 Kingsland Road","note":"Standard Breathing Space notified by debt adviser Hackney Money Adv… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel,\n\nThank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ruth Okoye, Hackney Money Advice CIC","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoney… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P2","team":"management","reason":"Tenant Daniel Reyes (T-1020, Flat 3, 8 Kingsland Road) proposes £100/month on top of rent fro… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Escalations
- **P2 → management** (verified): Tenant Daniel Reyes (T-1020, Flat 3, 8 Kingsland Road) proposes £100/month on top of rent from November to clear £3,700 arrears. This is a payment plan, which needs a human decision. A Standard Breathing Space (start 01/10/2026, adviser Hackney Money Advice CIC ref HMA-55102) is in force, so arrears cannot be pursued now.
  - Known: Breathing Space notice (attachment, from adviser Ruth Okoye) covers £3,700 rent arrears, start 01/10/2026. CRM arrears £3,700 (2 months x £1,850), consistent. Tenant email 09/10/2026 21:47 from the address on file. Tenant told: Breathing Space noted, arrears go via adviser, rent continues, plan passed to management. Adviser and landlord (Ben Hartley) notified by email (MSG-102/103/104). Note NOTE-101 added to the tenant record.
  - Missing: No tool exists to cancel or pause the scheduled arrears_chaser_sms (2026-10-12) or section8_notice_draft_review (2026-10-14, ground 8). These still need cancelling by a person. Adviser has not yet confirmed receipt. Breathing Space not independently verified beyond the adviser's notice.
  - Options: Decline a direct payment plan now; agree any arrears plan with the adviser after the Breathing Space ends or as the adviser proposes (recommended); Accept the £100/month proposal in principle, to be formalised with the adviser; Ask the landlord whether to waive or reduce arrears (landlord decision)
  - Recommendation: Do not accept the plan directly. Route any arrears arrangement through Ruth Okoye. Cancel the 12 Oct arrears SMS and 14 Oct Section 8 review now. Confirm the tenant's ongoing rent is being paid.
  - Deadline: 2026-10-12 09:00

## Failed or unverified actions
- escalate_to_human (first two attempts): Failed validation twice because the options parameter was malformed. Retried with a clean call, which verified as ESC-105.
