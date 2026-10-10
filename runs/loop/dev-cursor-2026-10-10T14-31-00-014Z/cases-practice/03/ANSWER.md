# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped in a lock he reported stiff on 22 Sep (R-4766, unactioned). Created emergency JOB-101, assigned the on-file out-of-hours locksmith, informed tenant and landlord, linked R-4766, escalated P1 for ETA confirmation and set a follow-up.

## Where the case stands
Emergency JOB-101 at visit stage, Hackney Locks 24/7 assigned for tonight 21:30-23:30 (awaiting contractor confirmation). Tenant and landlord told. Recharge decision awaits locksmith report.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Hackney Locks 24/7 for emergency extraction and entry tonight | Hackney Locks 24/7, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Texted tenant: locksmith coming, don't pay tonight, cost decided by report, spare key option, 999 if unwell | Jonah Okafor, tenant | sms | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 handover to confirm locksmith ETA by phone tonight | internal | internal | A7 ✅ |
| 4 | WAIT | Follow up tomorrow on entry, secure door, cause report, recharge, R-4766 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about tonight. We've sent Hackney Locks 24/7 (our out-of-hours locksmith) to 27 Bethnal Green Road, target arrival tonight between 9.30 and 11.30pm; we'll confirm if that changes. Please don't pay them anything tonight. Your lock was reported stiff on 22 Sep, so this may well be a lock fault, which is the landlord's cost; the locksmith's report will settle who pays and nobody will ask you for money before we've spoken to you. If you can, wait somewhere warm nearby, and please don't force the door. The spare-key route (office, Mon-Fri 9-17.30, £50 refundable deposit) is there too, but isn't needed if the locksmith gets you in. If you feel unsafe or unwell, call 999. We'll email you tomorrow with an update.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight (Sat 10 Oct) your tenant Jonah Okafor was locked out of 27 Bethnal Green Road when his key snapped in the front door lock. He had reported it stiff on 22 Sep (R-4766, not yet actioned - our apologies). Under your emergency instruction we've sent Hackney Locks 24/7 to extract the key, restore entry and secure the door; this is within your emergency authority. The locksmith will report on cause. If the lock has failed it is your cost and we'll bring any lock replacement quote to you; we won't charge the tenant unless the report shows misuse. We'll update you tomorrow.

## Escalation
- **P1 → maintenance** (verified): Out-of-hours lockout of vulnerable tenant; confirm locksmith attendance and who pays
  - Known: Jonah Okafor (T-1002, anxiety, prefers email) outside 27 Bethnal Green Road, cold, key snapped in front door lock. Stiff-lock ticket R-4766 open since 22 Sep, unassigned. Landlord approves emergencies without asking. JOB-101 emergency created, Hackney Locks 24/7 assigned 21:30-23:30 (not yet confirmed by contractor). Tenant and landlord messaged.
  - Missing: Contractor confirmation of attendance/ETA; cause (worn lock vs misuse) - locksmith report decides recharge; whether tenant has a warm place to wait.
  - Options: Phone Hackney Locks 24/7 (+447700900314) to confirm ETA tonight; If no attendance, try another out-of-hours locksmith; Review locksmith report tomorrow and decide recharge
  - Recommendation: Confirm ETA by phone now; treat as landlord cost unless report shows misuse.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not decide who pays; the locksmith's report decides.
- Not confirmed that the contractor has accepted the window.
- The sms does not substitute for a phone call to the tenant.

## Remaining work
- Human to phone locksmith to confirm ETA tonight
- Locksmith report on cause; recharge decision
- Lock repair/replacement under R-4766, landlord cost if fault
- Confirm door secure after entry

## Missing or unavailable information
- Cause of failure (worn lock vs misuse)
- Whether the 22 Sep report was made on the portal (ticket R-4766 suggests yes)
- Contractor ETA

## Conflicts between sources
- Policy says out-of-hours lockout is at tenant's cost, but also that a broken lock is landlord responsibility; prior stiff-lock ticket means cause unclear, so the locksmith's report decides, per policy.

## Answers to the case questions
**1. Is this tenant-responsibility lockout or landlord lock fault? What is uncertain?**

Probably a landlord-responsibility lock fault: the lock was stiff for weeks and R-4766 (22 Sep) confirms it was reported. Uncertain: whether wear or key misuse caused the snap; the locksmith's report decides the recharge. It is not a simple lost-key case.

**2. What options do you give the tenant tonight and who pays?**

1) Emergency locksmith tonight (Hackney Locks 24/7): not charged to the tenant tonight; landlord pays if lock fault, recharge only if the report shows misuse. 2) Spare key from office Mon-Fri 9-17.30 with £50 refundable deposit: not usable tonight and doesn't help with a snapped key stuck in the lock. Landlord has approved emergencies without asking and is within spend limit.

**3. What actions do you take?**

Created emergency JOB-101, assigned Hackney Locks 24/7, linked R-4766, texted tenant, emailed landlord, escalated P1 (ESC-105), scheduled follow-up FUP-104.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"locks","severity":"emergency","description":"Tenant locked out at night (Sat 10 Oct 21:15). Key snapped in f… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:30"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `update_ticket` | {"ref":"R-4766","note":"Linked to emergency JOB-101: key snapped in this lock on 10 Oct. Stiff-lock report of 22 Sep never progressed past i… | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"JOB-101","body":"Hi Jonah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-11","purpose":"Confirm entry restored, door secure, locksmith cause report; decide recharge; chase… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout of vulnerable tenant; confirm locksmith attendance and who pays","known… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
