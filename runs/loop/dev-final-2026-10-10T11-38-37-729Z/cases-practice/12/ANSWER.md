# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** routine

Tenant offered £100/month towards £3,700 arrears and attached a standard Breathing Space notice from 01/10/2026. I paused arrears activity (noted), replied to tenant and adviser without accepting the plan, and escalated to legal to stop the scheduled SMS and Section 8 draft.

## Where the case stands
Breathing Space active from 01/10/2026. Escalated to legal (ESC-102). Plan not accepted. Waiting on legal/landlord decision and adviser confirmation of end date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Escalate to legal: suspend 12/10 arrears SMS and 14/10 Section 8 draft, decide on plan with landlord | internal legal team | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge email and notice, say plan is not agreed yet and goes via adviser | Daniel Reyes, tenant | email | A3 ✅ |
| 3 | OTHER | Tell debt adviser notice received, arrears contact paused, offer not accepted, ask for end date | Ruth Okoye, debt adviser | email | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Daniel Reyes (tenant) via email, d.reyes@mailbox.example** (verified)

> Hi Daniel, thank you for getting in touch and for sending the letter from your debt adviser. We have received it and noted your breathing space on your account. We are not chasing the arrears while it applies, and any discussion of your offer will go through your adviser, Ruth Okoye. We can't agree the plan ourselves, so it has been passed to a colleague and the landlord to consider. Your current rent still needs to be paid as normal. If you have any repair issues, contact us as usual. Kind regards, Mare & Co Lettings

**A4 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example** (verified)

> Dear Ruth, we have received the breathing space notification (ref HMA-55102, start 01/10/2026) for Daniel Reyes at Flat 3, 8 Kingsland Road, via his email. Arrears contact and enforcement are paused. Mr Reyes has proposed £100 a month on top of rent from November; this has not been accepted and is with our team and the landlord. We will reply to you about it. Please could you confirm the end date of the breathing space? Kind regards, Mare & Co Lettings

## Escalation
- **P2 → legal** (verified): Breathing Space in force; payment plan offer; scheduled arrears SMS (12/10) and Section 8 draft (14/10) must be stopped
  - Known: Daniel Reyes, Flat 3, 8 Kingsland Road. Arrears £3,700 (2 months), rent £1,850. Emailed 09/10 offering £100/month on top of rent from November; lost job in August; 1 adult, 2 children. Attached notification: standard Breathing Space from 01/10/2026, adviser Ruth Okoye HMA-55102. CRM has arrears_chaser_sms on 2026-10-12 and section8 ground 8 draft review on 2026-10-14. I have noted the account and replied to tenant and adviser without accepting any plan.
  - Missing: Verification of the notice with the adviser/Insolvency Service; landlord's view on the plan (£100/month would take about 37 months); ability to remove the scheduled actions in the system, which I cannot do with my tools.
  - Options: Cancel both scheduled actions, ask landlord to consider plan via adviser; Verify notice first, keep all arrears activity suspended meanwhile
  - Recommendation: Suspend both scheduled actions now; confirm notice with adviser; put the plan to landlord Ben Hartley and respond via adviser; no Section 8 during breathing space.
  - Deadline: Before 2026-10-12

## What this does not establish
- Acknowledging the notice does not verify it with the Insolvency Service/adviser
- Not accepting or rejecting the plan; that is for the landlord and a human
- Cannot remove scheduled system actions with my tools; relied on escalation

## Remaining work
- Legal: cancel scheduled SMS 12/10 and Section 8 review 14/10
- Landlord Ben Hartley to consider plan via adviser
- Confirm breathing space end date with adviser
- Current rent remains payable

## Missing or unavailable information
- Breathing space end date
- Landlord's view on plan

## Conflicts between sources
- Scheduled CRM actions (arrears SMS, Section 8 draft) conflict with the Breathing Space notice; the notice takes priority.

## Answers to the case questions
**1. 1. What legal constraint applies and what can't you do?**

A standard Breathing Space (from 01/10/2026) covers the £3,700 arrears. We cannot chase the arrears with the tenant, take enforcement action or serve/draft Section 8 or other arrears notices. The scheduled arrears SMS (12/10) and Section 8 draft review (14/10) must not go ahead. Current rent and repair contact continue. Contact the tenant started is fine to acknowledge, and arrears talks go through the adviser.

**2. 2. Can you accept the proposed payment plan?**

No. Payment plans need a human and the landlord's agreement. I only acknowledged it. At £100/month it would take about 37 months, so it needs a considered decision, via the adviser.

**3. 3. What actions and communications, to whom?**

Note on tenant account (A1, applied though API errored); escalation to legal P2 ESC-102 (A2); acknowledgement email to Daniel (A3, sent on retry); email to adviser Ruth Okoye (A4). The landlord has not been messaged yet; legal to put the plan to him.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE (standard) from 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC ref HMA-55102. Arrears £… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space in force; payment plan offer; scheduled arrears SMS (12/10) and Section 8 draft (1… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank yo… | 2 | ✅ verified | MSG-105 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
- A3: First attempt MSG-103 not applied; retried once, MSG-105 verified.
- A1: API timed out but read-back confirmed NOTE-101 exists; not retried.
