# Case 03: ANSWER

**Outcome:** escalated · **Severity:** urgent

Tenant Jonah Okafor (P-202, vulnerable) is locked out after his front door key snapped in the lock; he says he is safe. I asked him for his DOB by SMS so identity can be verified, sent him the out-of-hours locksmith number and the cost position, and emailed the landlord. The locksmith has not been dispatched: identity is unverified and no visit window is set, so I escalated to maintenance (ESC-105) for tonight's dispatch.

## Answers
**1. 1. Tenant-responsibility lockout or landlord lock fault?**

Undetermined. A snapped key could be tenant damage or loss (tenant cost out of hours), but the lock has been stiff since 22 Sep (R-4766, still unassigned), which points to a possible lock fault (landlord). The locksmith's report decides the recharge. Still uncertain: the cause of the snap, whether the stiffness contributed, and the tenant's identity.

**2. 2. Options for the tenant tonight and who pays?**

(a) Locksmith Hackney Locks 24/7 (C-14, +447700900314) attends once identity is confirmed. Landlord pays if the report finds a lock fault; tenant pays if the key was lost or damaged. (b) Tenant arranges his own locksmith at his cost, with recharge settled later from the report. Nothing is charged to the tenant before the report. The office key safe is only open Mon-Fri 9-17.30 (£50 refundable), so it cannot help tonight.

**3. 3. Actions taken?**

Requested DOB and welfare check by SMS (REQ-101); sent tenant SMS with locksmith contact and cost position (MSG-102); added note to R-4766 (NOTE-103); emailed landlord Margaret Ellison (MSG-104); escalated to maintenance P1 for dispatch (ESC-105). The locksmith was not booked and no visit window was set.

**4. Master key question?**

Spare keys are in the office key safe, which is only collectable Mon-Fri 9-17.30 with a £50 refundable deposit. Tonight it is not available. Policy does not allow out-of-hours key collection.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","questions":["Please reply with your da… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","body":"Hi Jonah, sorry you're locked o… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"R-4766","note":"2026-10-10 21:15 out-of-hours call from tenant Jonah Okafor (P-202): front door key snapped off in the lock, tena… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout of a vulnerable tenant (anxiety disclosed) at 27 Bethnal Green Road, P-… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Escalations
- **P1 → maintenance** (verified): Out-of-hours lockout of a vulnerable tenant (anxiety disclosed) at 27 Bethnal Green Road, P-202, outside in the cold. The locksmith cannot be dispatched until identity is verified and a visit window is set.
  - Known: Tenant Jonah Okafor (T-1002) called at 21:15 on Sat 10 Oct: front door key snapped in the lock, half still in it. He is outside and says he is safe. He says the lock has been stiff for weeks. Ticket R-4766 (22 Sep, stiff lock) is still at init and unassigned. Policy: lost keys are tenant cost out of hours; broken lock is landlord; if cause unclear the locksmith's report decides. Landlord Margaret Ellison (L-02, overseas, email preferred) emailed (MSG-104). Contractor on record: Hackney Locks 24/7 (C-14, +447700900314, out of hours). SMS to tenant asking for DOB (REQ-101) and giving the locksmith number (MSG-102). Note NOTE-103 added to R-4766.
  - Missing: Tenant's DOB not yet confirmed (CRM DOB 1985-11-02, unverified). Cause of the snap (lock fault or key damage/loss) unknown until the locksmith attends. No visit window set. Landlord has not approved the callout cost; emergencies need no approval, but this may be routine (limit £250).
  - Options: Once DOB is confirmed, dispatch Hackney Locks 24/7 (C-14) tonight. Landlord pays if the locksmith finds a lock fault; tenant pays if the key was lost or damaged. Recharge follows the locksmith report.; Dispatch now as urgent, landlord pays provisionally, recharge decided afterwards.; Tenant arranges his own locksmith tonight at his cost, recharge decided later from the report.
  - Recommendation: Option 1. Dispatch C-14 tonight once DOB is confirmed. Don't charge the tenant before the locksmith's report. Link R-4766 and reassess the lock fault there.
  - Deadline: 2026-10-10 23:00

## Failed or unverified actions
_None._
