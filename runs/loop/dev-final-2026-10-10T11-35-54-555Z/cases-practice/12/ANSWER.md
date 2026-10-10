# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** routine

Tenant offered £100/month toward £3,700 arrears but a Breathing Space has applied since 01/10/2026. I paused arrears contact, informed the adviser and landlord, noted the record and escalated to legal, mainly to stop the scheduled SMS and Section 8 draft.

## Where the case stands
Breathing Space active since 01/10/2026. Payment plan unanswered, pending human/landlord review via adviser. Scheduled SMS (12/10) and Section 8 draft (14/10) flagged for cancellation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Told debt adviser the notice is received, arrears contact paused, plan under review | Ruth Okoye, debt adviser | email | A1 ✅ |
| 2 | OTHER | Informed landlord of Breathing Space and paused actions | Ben Hartley, landlord | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalate to legal: stop scheduled chaser/Section 8 draft, decide on payment plan | internal legal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example** (verified)

> Dear Ms Okoye, we have received the Breathing Space notification (ref HMA-55102, start 01/10/2026) for Daniel Reyes, Flat 3, 8 Kingsland Road. We have paused arrears contact and enforcement and will route anything about the debt through you. Mr Reyes emailed us a proposal to pay £100 a month on top of rent from November. We cannot accept or decline it at this stage; it has gone to our team for review and we will reply to you. Please confirm the end date of the breathing space. Current rent remains payable as normal.

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Daniel Reyes at Flat 3, 8 Kingsland Road has a Breathing Space (debt respite) in place from 01/10/2026, covering the £3,700 rent arrears. While it lasts we can't chase the arrears, serve arrears notices or take enforcement steps, and we are pausing the planned reminder and Section 8 draft. Current rent is still due. He has offered £100 a month extra from November; our team will review it and come back to you. Nothing is needed from you now.

## Escalation
- **P2 → legal** (verified): Breathing Space in force; payment plan offer needs authority; scheduled SMS (12/10) and Section 8 draft (14/10) must be stopped
  - Known: Tenant Daniel Reyes (T-1020), Flat 3, 8 Kingsland Road, rent £1,850, arrears £3,700 (2 months). Standard Breathing Space from 01/10/2026, adviser Ruth Okoye HMA-55102 (attachment). Tenant emailed 09/10 offering £100/month extra from November, lost job in August, 2 children. I have informed the adviser and landlord, and noted the tenant record.
  - Missing: Exact breathing space end date (likely ~end Nov); landlord's view on the plan; whether I can remove the scheduled actions (no tool).
  - Options: Cancel scheduled actions; respond to the plan via adviser after landlord decision; Reject plan (not recommended)
  - Recommendation: Cancel the 12/10 SMS and 14/10 Section 8 draft now; take the landlord's view on the plan and answer through the adviser; no notices during the breathing space.
  - Deadline: 2026-10-12 before the SMS fires

## What this does not establish
- No decision on the payment plan was made or implied
- Nothing here changes the rent owed or ends the tenancy
- Scheduled actions could not be cancelled with my tools; flagged in note and escalation

## Remaining work
- Legal to cancel 12/10 SMS and 14/10 Section 8 draft
- Landlord view and reply on plan via adviser
- Confirm breathing space end date
- Current rent and repair contact continue as normal

## Missing or unavailable information
- Breathing space end date
- Landlord's view on the plan

## Conflicts between sources
- Scheduled arrears SMS and Section 8 draft conflict with the Breathing Space; the notice was trusted.

## Answers to the case questions
**1. What legal constraint applies and what can't you do?**

A standard Breathing Space (from 01/10/2026). We cannot contact the tenant about the arrears (go through adviser Ruth Okoye), take enforcement action, or serve arrears-ground notices such as Section 8 Ground 8. Current rent and repair contact continue.

**2. Can you accept the proposed payment plan?**

No. Agreeing payment plans needs human and landlord authority. It has been escalated, and any reply will go via the adviser.

**3. What actions and communications do you make, to whom?**

Emailed the debt adviser (A1), emailed the landlord (A2), added a note to the tenant record to cancel the 12/10 SMS and 14/10 Section 8 draft (A3), and escalated to legal P2 (A4). I did not message the tenant about the arrears.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Dan… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE from 01/10/2026 (Hackney Money Advice CIC, HMA-55102, Ruth Okoye). Arrears £3,700 covered. No arr… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space in force; payment plan offer needs authority; scheduled SMS (12/10) and Section 8 … | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
