# Case 12: ANSWER

**Outcome:** escalated · **Severity:** urgent

A standard Breathing Space has been active since 01/10/2026, so arrears contact and enforcement must stop. I noted the account and told the tenant, adviser and landlord. I escalated to legal because the scheduled SMS and Section 8 review must be cancelled and the payment plan needs a landlord decision.

## Answers
**1. What legal constraint applies and what can't you do?**

Standard Breathing Space from 01/10/2026 (adviser Ruth Okoye, HMA-55102). I cannot chase the arrears with the tenant, send the 12/10 arrears SMS, prepare or serve a Section 8 / Ground 8 notice (14/10 review), or take any enforcement action. Arrears matters go through the adviser. Current rent and repairs contact continue. The tenant started this contact, so a brief acknowledgement is allowed.

**2. Can you accept the proposed payment plan?**

No. Payment plans need a human and the landlord's decision. The tenant was told it has been passed on and that nothing is confirmed. The reply will go via the adviser.

**3. What actions and communications do you make, to whom?**

Account note NOTE-101. Acknowledgement to the tenant (MSG-102). Message to the adviser (MSG-103). Message to landlord Ben Hartley (MSG-104) asking him not to contact the tenant about arrears. Escalation ESC-105 to legal (P2) to cancel the scheduled SMS and Section 8 review, confirm the Breathing Space end date and obtain the landlord's view on the plan.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE (standard) from 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC ref HMA-55102. Arrears c… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank yo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Dan… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space active; scheduled arrears SMS (12/10) and Section 8 draft review (14/10) must be c… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Escalations
- **P2 → legal** (verified): Breathing Space active; scheduled arrears SMS (12/10) and Section 8 draft review (14/10) must be cancelled; payment plan needs landlord decision
  - Known: Email 09/10 from Daniel Reyes (T-1020) plus Breathing Space notice: standard, start 01/10/2026, adviser Ruth Okoye HMA-55102, debt £3,700 (2 months, rent £1,850). CRM scheduled arrears_chaser_sms 12/10 and Ground 8 notice draft review 14/10. Tenant lost job Aug, has 2 children. I noted the account, replied to tenant, informed adviser and landlord.
  - Missing: I cannot cancel scheduled CRM actions with my tools. Breathing Space end date not stated (standard is normally 60 days). Landlord's view on £100/month plan unknown.
  - Options: Cancel both scheduled actions now and take landlord's view on the plan via the adviser; Leave scheduled actions (not recommended, breach)
  - Recommendation: Cancel the 12/10 SMS and 14/10 Section 8 review before Monday, confirm Breathing Space end date with the adviser, seek landlord decision on the £100/month plan and reply via adviser.

## Failed or unverified actions
_None._
