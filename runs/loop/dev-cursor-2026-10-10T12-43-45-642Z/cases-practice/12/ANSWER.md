# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** urgent

The tenant sent a standard Breathing Space notice from 01/10/2026 along with a £100/month plan offer. I paused all arrears contact, logged a note, and told the tenant, adviser and landlord. I escalated to legal, mainly so the scheduled arrears SMS and Section 8 draft are cancelled.

## Where the case stands
Escalated to legal (ESC-101). Arrears contact paused; scheduled 12 Oct SMS and 14 Oct S8 draft flagged for cancellation by a human. Waiting on human review and adviser confirmation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Legal to verify the Breathing Space notice, cancel the scheduled arrears SMS and Section 8 draft, and handle the plan via the adviser | internal (legal) | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledged notice, said no arrears chasing, plan not agreed by us, keep paying current rent | Daniel Reyes, tenant | email | A3 ✅ |
| 3 | OTHER | Told the debt adviser the notice is received and the plan is under review | Ruth Okoye, debt adviser | email | A4 ✅ |
| 4 | OTHER | Informed the landlord of the Breathing Space and its effects | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Daniel Reyes (tenant) via email, d.reyes@mailbox.example** (verified)

> Hi Daniel, thank you for your email and the letter. We have noted your Breathing Space and will not chase you about the arrears while it applies. Please keep paying your current rent as normal. I can't agree your offer of £100 a month myself; it has been passed to a colleague and we will deal with it through your adviser, Ruth Okoye. Repairs and day-to-day matters carry on as usual. Please tell us if you need anything.

**A4 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example** (verified)

> Dear Ruth, we have received the Breathing Space notification (ref HMA-55102, start 01/10/2026) for Daniel Reyes, Flat 3, 8 Kingsland Road. All arrears contact and enforcement is paused on our side. Mr Reyes has proposed £100 a month towards arrears from November. We cannot accept that at this stage; a colleague will review it with the landlord and reply to you. Please confirm the end date of the breathing space.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Daniel Reyes at Flat 3, 8 Kingsland Road has sent us a Breathing Space notice (standard, from 01/10/2026) covering the £3,700 arrears. While it applies we must pause all arrears contact and enforcement, including any Section 8 notice. Current rent remains due. He has offered £100 a month extra from November; nothing is agreed and a colleague will come back to you after checking the notice with his adviser.

## Escalation
- **P2 → legal** (verified): Breathing Space (standard, started 01/10/2026) on rent arrears of £3,700; tenant proposes £100/month plan
  - Known: Tenant Daniel Reyes (T-1020), Flat 3, 8 Kingsland Road. Email 09/10/2026 with Breathing Space notification: standard, start 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC, ref HMA-55102. Arrears £3,700 (2 months). CRM has scheduled arrears chaser SMS on 2026-10-12 and Section 8 ground 8 draft review on 2026-10-14. Tenant offers £100/month extra from November. Tenant has 2 children, lost job in August.
  - Missing: Verification of the notice with the adviser/Money Advice Service; landlord's view on the plan; end date of breathing space (standard is 60 days).
  - Options: Cancel both scheduled actions and suspend all arrears contact/enforcement; route arrears matters via adviser; Landlord considers plan via adviser after human review
  - Recommendation: Cancel the 12 Oct arrears SMS and 14 Oct Section 8 draft now (I cannot remove scheduled actions with my tools); human to verify the notice and handle any plan negotiation with the adviser.

## What this does not establish
- Replying does not accept the payment plan or alter the debt
- I could not remove the scheduled actions myself; a note and escalation flag them
- The notice has not been independently verified with the debt adviser or the official scheme

## Remaining work
- Legal: cancel 12 Oct SMS and 14 Oct S8 draft review (today is 10 Oct, so by 12 Oct)
- Legal/management: verify the notice, confirm the end date, review the plan with the landlord via the adviser
- Diarise review on breathing space end

## Missing or unavailable information
- Breathing Space end date
- Landlord's view on the plan

## Conflicts between sources
- CRM scheduled arrears SMS and Section 8 draft conflict with the Breathing Space notice; the notice takes precedence.

## Answers to the case questions
**1. What legal constraint applies and what can't you do?**

A standard Breathing Space has applied since 01/10/2026. We cannot contact the tenant about the arrears (except in reply to him), take enforcement action, or serve or draft arrears notices such as Section 8 ground 8. Current rent and repairs contact continue. The 12 Oct SMS and 14 Oct S8 draft must not run.

**2. Can you accept the proposed payment plan?**

No. Payment plans need a human, and the landlord's agreement. It goes through the debt adviser.

**3. What actions and communications do you make, to whom?**

Escalated to legal (ESC-101), added a note on the tenant record, replied to the tenant, wrote to the adviser Ruth Okoye, and informed landlord Ben Hartley.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space (standard, started 01/10/2026) on rent arrears of £3,700; tenant proposes £100/mon… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A2 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE from 01/10/2026 (HMA-55102, Ruth Okoye). No arrears contact with tenant, no enforcement, no Secti… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank yo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Dan… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
_None._
