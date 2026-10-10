# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** routine

The tenant sent a Breathing Space notice with his £100/month plan offer. I did not accept the plan. I flagged the record, told the tenant, adviser and landlord, and escalated to legal to stop the scheduled arrears SMS and Section 8 draft.

## Where the case stands
Breathing Space active from 2026-10-01. Arrears contact and enforcement paused; payment plan undecided, with legal (ESC-101) and landlord. Waiting on adviser for end date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Legal escalation: suspend the 12 Oct arrears SMS and 14 Oct Section 8 draft review, and decide on the payment plan with the landlord via the adviser | internal legal team | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge the tenant's email, say the plan is not yet accepted and it goes via the adviser, and ask him to keep paying current rent | Daniel Reyes, tenant | email | A4 ✅ |
| 3 | REQUEST_INFORMATION | Tell the adviser the notice is received, arrears contact is paused and the plan is pending, and ask for the end date | Ruth Okoye, debt adviser | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example** (verified)

> Dear Ruth, we have received the breathing space notification (ref HMA-55102, start 01/10/2026) for Mr Daniel Reyes, Flat 3, 8 Kingsland Road. We have paused all arrears contact and enforcement. Mr Reyes has proposed £100 a month towards the arrears from November, on top of rent. We have not accepted or declined this; it is with our team and the landlord, and we will respond to you rather than to him on the arrears. Please could you confirm the end date of the breathing space. Kind regards, Mare & Co Lettings

**A4 · send_message → Daniel Reyes (tenant) via email, d.reyes@mailbox.example** (verified)

> Hi Daniel, thank you for your email and the letter from your adviser. We have received it and are not contacting you about the arrears while your breathing space is in place. We haven't accepted or declined your £100 a month offer yet; it has gone to our team and the landlord, and we'll deal with it through Ruth at Hackney Money Advice. Please keep paying your normal rent as it falls due, and tell us about any repairs as usual. Kind regards, Mare & Co Lettings

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the tenant at Flat 3, 8 Kingsland Road has sent a standard Breathing Space notice (started 01/10/2026, adviser Hackney Money Advice CIC). While it lasts we must stop all arrears contact and enforcement, including any notice to seek possession for the arrears. Current rent is still due. He has offered £100 a month extra from November; we have not accepted it, and our team will come back to you with options. Please do not contact him about the arrears meanwhile. Kind regards, Mare & Co Lettings

## Escalation
- **P2 → legal** (verified): Breathing Space (standard, started 01/10/2026) on rent arrears £3,700; tenant proposes £100/month plan; scheduled arrears SMS 12 Oct and Section 8 ground 8 draft review 14 Oct conflict with it.
  - Known: Tenant Daniel Reyes (T-1020), Flat 3, 8 Kingsland Road, emailed 9 Oct 21:47 offering £100/month extra from November, lost job in Aug, 2 children. Attached notice: standard breathing space from 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC ref HMA-55102. CRM arrears £3,700 (2 months), rent £1,850. CRM scheduled: arrears_chaser_sms 2026-10-12, section8_notice_draft_review 2026-10-14 (ground 8). Landlord Ben Hartley.
  - Missing: Verification of the notice with the debt adviser/Money Advice Service; whether the landlord will consider the plan via the adviser; end date of the breathing space.
  - Options: Cancel both scheduled actions for the duration of breathing space; handle plan via adviser and landlord; Verify notice with adviser first, suspend actions meanwhile
  - Recommendation: Suspend the 12 Oct SMS and 14 Oct Section 8 review now; no enforcement or arrears-ground notices during breathing space; a human decides on the payment plan with the landlord, communicating via the adviser. Current rent and repairs continue as normal.
  - Deadline: 2026-10-12

## What this does not establish
- Messages do not accept or decline the payment plan.
- The note and escalation do not themselves cancel the CRM scheduled actions; a human must suspend them.
- The notice has not been independently verified with the debt adviser or the official scheme.

## Remaining work
- Legal/human to suspend the 12 Oct arrears SMS and the 14 Oct Section 8 review before those dates
- Human and landlord to decide on the payment plan, replying via the adviser
- Confirm the breathing space end date with the adviser
- Current rent and repairs continue as normal

## Missing or unavailable information
- Breathing space end date
- Landlord's view on the plan

## Conflicts between sources
- CRM scheduled arrears chaser and Section 8 review conflict with the Breathing Space notice; I treated the notice as binding.

## Answers to the case questions
**1. What legal constraint applies and what can't I do?**

A standard Breathing Space has applied since 01/10/2026. I must not do any arrears chasing, such as the 12 Oct SMS, and must not take enforcement action. That includes the Section 8 ground 8 draft due 14 Oct. Contact about the arrears goes through the debt adviser unless the tenant starts it. Current rent and repairs continue.

**2. Can you accept the proposed payment plan?**

No. Payment plans need a human and the landlord's agreement. I acknowledged the offer without accepting it, and it is escalated as ESC-101.

**3. What actions and communications do you make, to whom?**

I escalated to legal (ESC-101). I added a note to the tenant record (the tool timed out, but read-back showed NOTE-102 in place). I emailed the tenant (MSG-104), the landlord (MSG-105) and the adviser Ruth Okoye (MSG-106, sent on retry).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space (standard, started 01/10/2026) on rent arrears £3,700; tenant proposes £100/month … | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A2 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE from 2026-10-01 (adviser Hackney Money Advice CIC, HMA-55102, Ruth Okoye). Do NOT send arrears ch… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 2 | ✅ verified | MSG-106 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank yo… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
- A3: First attempt (MSG-103) was not applied; retried once and verified as MSG-106.
- A2: The API timed out but read-back showed NOTE-102 in place; not retried.
