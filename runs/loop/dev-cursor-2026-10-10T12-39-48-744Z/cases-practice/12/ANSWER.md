# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** routine

Tenant sent a Breathing Space notice and offered £100/month extra. I paused arrears contact, noted the record, informed adviser, tenant and landlord, and escalated to legal to cancel scheduled enforcement actions and decide on the plan.

## Where the case stands
Breathing Space in force from 01/10/2026; arrears contact paused; plan not accepted; escalated to legal to cancel scheduled actions and verify the notice.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Legal to cancel the 12/10 arrears SMS and 14/10 Section 8 draft review, verify notice, handle plan | internal legal | internal | A5 ✅ |
| 2 | REQUEST_INFORMATION | Told adviser we paused contact and asked for breathing space end date | Ruth Okoye, debt adviser | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Acknowledged his email, said debt goes via adviser, offer passed on not accepted | Daniel Reyes, tenant | email | A3 ✅ |
| 4 | OTHER | Informed landlord of notice and offer | Ben Hartley, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example (from Breathing Space notification attached to tenant email 09/10)** (verified)

> Dear Ruth, we have received the Breathing Space notification (ref HMA-55102) for Flat 3, 8 Kingsland Road, via Mr Reyes. We have paused arrears contact and enforcement and will deal with the debt through you. Mr Reyes has proposed £100 a month on top of rent from November; we are passing this to the landlord and have not accepted it. Please confirm the end date of the breathing space. Thank you.

**A3 · send_message → Daniel Reyes (tenant) via email, d.reyes@mailbox.example** (verified)

> Hi Daniel, thanks for your email and the letter from your adviser. We've received it and will deal with the debt through Ruth at Hackney Money Advice. Your offer has been passed on to the landlord; we can't accept it ourselves. Normal rent and repairs carry on as usual. If you need to contact us, just reply here.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the tenant of Flat 3, 8 Kingsland Road has sent a Breathing Space notice (start 01/10/2026, adviser ref HMA-55102). During it we must pause all arrears contact and enforcement, including any Section 8 notice; current rent stays payable. He has offered £100 a month extra from November towards the £3,700 arrears. Nothing is agreed; our team is verifying the notice and will come back to you on the offer.

## Escalation
- **P2 → legal** (verified): Breathing Space (standard, from 01/10/2026) on Daniel Reyes, Flat 3, 8 Kingsland Road; arrears actions scheduled; payment plan offered
  - Known: Tenant email 09/10 21:47 with Breathing Space notification: start 01/10/2026, adviser Hackney Money Advice CIC ref HMA-55102 (Ruth Okoye). Arrears £3,700, rent £1,850. Offer £100/month extra from November. CRM has arrears_chaser_sms 2026-10-12 and section8_notice_draft_review 2026-10-14 (ground 8) that must be cancelled. Done already: note on tenant record, acknowledgement to tenant, message to adviser, landlord informed.
  - Missing: Verification of notice with adviser/Insolvency Service; end date; landlord's view on plan.
  - Options: Cancel scheduled SMS and Section 8 draft, verify notice, take plan to landlord via adviser; Reject plan outright
  - Recommendation: Cancel both scheduled actions before 12/10, verify the notice, and negotiate any plan with the landlord through the adviser; no payment plan agreed by the agent.
  - Deadline: 2026-10-12

## What this does not establish
- Nothing here accepts or declines the payment plan
- I could not cancel the scheduled CRM actions with my tools; legal must
- Notice not independently verified

## Remaining work
- Legal: cancel scheduled SMS (12/10) and Section 8 draft (14/10), verify notice, by 12/10
- Landlord decision on plan, via adviser
- Normal rent collection and repairs continue

## Missing or unavailable information
- Breathing space end date
- Verification of the notice

## Conflicts between sources
- CRM scheduled arrears chaser and Section 8 draft conflict with the Breathing Space; the notice takes precedence

## Answers to the case questions
**1. 1. What legal constraint applies and what can't you do?**

A standard Breathing Space from 01/10/2026. We cannot pursue arrears contact with the tenant (beyond replying to what he initiates), take enforcement, serve Section 8 or any arrears notice; current rent and repairs continue. The 12/10 SMS and 14/10 Section 8 draft must not proceed.

**2. 2. Can you accept the proposed payment plan?**

No. A payment plan needs landlord and human authority, and any negotiation goes through the debt adviser. It has been passed on, not accepted.

**3. 3. What actions and communications?**

Note on tenant record (A1); email to adviser Ruth Okoye (A2); short acknowledgement to tenant (A3); landlord Ben informed (A4); P2 legal escalation ESC-105 (A5).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE from 01/10/2026 (ref HMA-55102, Hackney Money Advice CIC). No arrears contact with tenant except … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example (from Breat… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space (standard, from 01/10/2026) on Daniel Reyes, Flat 3, 8 Kingsland Road; arrears act… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
