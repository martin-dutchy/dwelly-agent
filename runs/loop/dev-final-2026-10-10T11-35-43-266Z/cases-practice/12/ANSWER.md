# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** routine

Tenant admitted £3,700 arrears and offered £100/month; his attached notice shows a standard Breathing Space from 01/10/2026. I stopped all arrears activity, acknowledged the tenant, informed the adviser and landlord, noted the record and escalated to legal to cancel the scheduled SMS and Section 8 review.

## Where the case stands
Escalated to legal (ESC-101). Waiting on a human to verify the notice, cancel the 12 Oct SMS and 14 Oct Section 8 review, and decide on the plan with the landlord and adviser.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Legal to verify the notice and cancel the 12 Oct SMS and 14 Oct Section 8 review | legal team | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledged the tenant's email and explained that the plan is pending | Daniel Reyes, tenant | email | A2 ✅ |
| 3 | REQUEST_INFORMATION | Asked the adviser to confirm the breathing space end date and told her of the offer | Ruth Okoye, debt adviser | email | A3 ✅ |
| 4 | WAIT | Check on 12 Oct that the scheduled arrears actions are cancelled | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Daniel Reyes (tenant) via email, d.reyes@mailbox.example** (verified)

> Hi Daniel, thanks for your email and the letter from your debt adviser. We have it and have noted your Breathing Space. We won't chase you about the arrears while it runs, and we'll deal with that through Ruth Okoye at Hackney Money Advice. I can't accept or turn down your £100 a month offer myself. It has been passed to a colleague and to your landlord, and any reply will go through your adviser. Your normal rent is still due, and repairs carry on as usual. Please contact us about anything on that side. Kind regards, Mare & Co Lettings

**A3 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example** (verified)

> Dear Ruth, we have received the Breathing Space notice (ref HMA-55102, start 01/10/2026) for Daniel Reyes, Flat 3, 8 Kingsland Road. We have stopped arrears contact and enforcement activity and will deal with you on the debt. Mr Reyes has offered £100 a month on top of rent from November. That offer is with our team and the landlord for review. We will reply to you, not to him. Please confirm the end date of the breathing space. Regards, Mare & Co Lettings

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the tenant at Flat 3, 8 Kingsland Road has sent a Breathing Space notice from his debt adviser, effective 01/10/2026. While it runs we must stop all arrears contact and enforcement, and we can't serve or prepare arrears notices. He has offered £100 a month extra from November. I haven't accepted it; our team will come back to you with options. His current rent is still due. Regards, Mare & Co Lettings

## Escalation
- **P2 → legal** (verified): Breathing Space notified for Daniel Reyes (Flat 3, 8 Kingsland Road); arrears chaser SMS (12 Oct) and Section 8 Ground 8 draft review (14 Oct) are scheduled and must stop; payment plan offer needs authority
  - Known: Tenant email 09/10/2026 admits 2 months arrears (£3,700), job loss in August, offers £100/month extra from November. Attached notice: standard Breathing Space started 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC, ref HMA-55102. CRM shows scheduled arrears_chaser_sms 2026-10-12 and section8_notice_draft_review 2026-10-14 (ground 8). Household: 1 adult, 2 children. Rent £1,850/month, landlord Ben Hartley. I have sent acknowledgements to tenant, adviser and landlord, and added a note; no arrears chasing or notice work done.
  - Missing: Verification of the notice with the Insolvency Service/adviser; exact end date (standard is 60 days, so about 30 Nov, unconfirmed); landlord's view on the plan; ability to cancel the scheduled actions (no tool available to me). £100/month would take about 37 months and does not cover the arrears quickly.
  - Options: Cancel both scheduled actions now, verify notice, route plan discussion via adviser and landlord after review; Landlord decides on plan with adviser once breathing space ends
  - Recommendation: Cancel the 12 Oct SMS and 14 Oct Section 8 review today. Verify the notice. Do not accept or refuse the plan; take it to the landlord and adviser. Keep ongoing rent and repairs contact normal.
  - Deadline: Before 2026-10-12 09:00

## What this does not establish
- Acknowledging the offer does not accept it
- I could not cancel the scheduled CRM actions myself; no tool exists for that
- The notice has not been independently verified
- Nothing here decides the arrears, rent or tenancy position

## Remaining work
- Legal: cancel scheduled SMS and Section 8 review, verify the notice
- Landlord and adviser: consider the payment plan, with a human leading
- Confirm the breathing space end date

## Missing or unavailable information
- Breathing space end date (about 30 Nov if standard 60 days)
- Landlord's view on the plan

## Conflicts between sources
- The CRM schedules an arrears SMS and a Section 8 review, which conflicts with the Breathing Space. I followed the Breathing Space.

## Answers to the case questions
**1. 1. What legal constraint applies and what can't you do?**

A standard Breathing Space started 01/10/2026 (about 60 days, end date to confirm). We must stop all arrears contact and enforcement, so no arrears chaser SMS, no Section 8 or Ground 8 notice or draft, and no court steps. Contact with the debtor about the debt happens through the adviser, except where the debtor starts it. Current rent stays payable and repair contact continues.

**2. 2. Can you accept the proposed payment plan?**

No. Payment plans need human and landlord authority. I acknowledged the offer without accepting or refusing it. At £100 a month it would take about 37 months to clear £3,700, on top of the rent. It is being reviewed via legal, the landlord and the adviser.

**3. 3. What actions and communications, to whom?**

Acknowledged the tenant by email (A2). Emailed adviser Ruth Okoye (A3). Told landlord Ben Hartley (A4). Added a note to the tenant record to stop arrears actions (A5). Escalated to legal P2 (A1). Scheduled a 12 Oct check that the SMS and Section 8 review were cancelled (A6).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space notified for Daniel Reyes (Flat 3, 8 Kingsland Road); arrears chaser SMS (12 Oct) … | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A2 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `add_note` | {"entity":"T-1020","note":"Breathing Space (standard) from 01/10/2026, adviser Ruth Okoye HMA-55102. STOP arrears chaser SMS (12/10) and Sec… | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A6 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Confirm legal has cancelled arrears SMS and Section 8 review for Reyes (Breathing Space)","party":"interna… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
