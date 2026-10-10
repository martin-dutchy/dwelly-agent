# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after his key snapped in the front door. A stiff-lock report (R-4766) from 22 Sep was never actioned. I assigned Hackney Locks 24/7 for tonight under the landlord's emergency authority, messaged tenant and landlord, and escalated P1 so a human can phone the locksmith to confirm attendance.

## Where the case stands
R-4766 at visit stage, Hackney Locks 24/7 assigned 21:30-23:30 tonight (not yet confirmed by them). Waiting on locksmith attendance and report; follow-up 11 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Hackney Locks 24/7 for tonight | Hackney Locks 24/7, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant locksmith is being sent and what he will pay | Jonah Okafor, tenant | sms | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1: phone locksmith to confirm ETA | internal | internal | A5 ✅ |
| 4 | WAIT | Follow up on 11 Oct for locksmith report and recharge decision | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about tonight. We've found your stiff-lock report from 22 Sept (R-4766) and have sent an emergency job to Hackney Locks 24/7 to get you in and make the door secure; target is tonight. They may ring you, so please keep your phone on. If you can, wait somewhere warm nearby, and ring 999 if you feel unsafe. You won't be asked to pay on the doorstep. Who pays is decided from the locksmith's report on the cause, and we'll tell you before any charge. The spare key from our office is only Mon-Fri 9-17.30 (£50 refundable deposit), so it can't help tonight. We'll update you by email tomorrow.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight your tenant at 27 Bethnal Green Road was locked out when his key snapped in the front door lock (half still in it). He had reported the lock as stiff on 22 Sept (R-4766), which was not actioned. Under your emergency instruction we have sent Hackney Locks 24/7 tonight to get him in and secure the door. Cost is not yet known and is within your emergency authority; a lock replacement may be needed, and we'll send you the locksmith's report. Who bears the cost depends on that report. We apologise for the earlier delay.

## Escalation
- **P1 → maintenance** (verified): Out-of-hours lockout of vulnerable tenant at night; locksmith needs confirming
  - Known: Jonah Okafor (T-1002, anxiety, prefers email) locked out at 27 Bethnal Green Road, key snapped in lock, outside in the cold. Stiff-lock ticket R-4766 open since 22 Sep, never assigned. Landlord approves emergencies without asking. Hackney Locks 24/7 (C-14, out of hours) assigned for 21:30-23:30 tonight; SMS sent to tenant, email to landlord.
  - Missing: Locksmith has not confirmed attendance (I cannot phone from this run). Cause (worn lock vs tenant damage) unknown; cost unknown.
  - Options: Phone Hackney Locks 24/7 on +447700900314 to confirm ETA and tell the tenant; If no attendance, find another out-of-hours locksmith or alternative for the tenant tonight
  - Recommendation: Phone the locksmith now to confirm attendance; recharge decided on the locksmith's report, with the ignored Sept stiff-lock report counting towards landlord responsibility.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not confirm they will attend or when.
- Nothing decides who pays; the locksmith's report does.
- Nothing tells us whether the tenant is back inside.

## Remaining work
- Human to phone the locksmith and tenant tonight (maintenance)
- Obtain the locksmith report and decide the recharge
- Replace the lock if needed; send the landlord the report
- Email the tenant tomorrow (he prefers email)

## Missing or unavailable information
- Locksmith's confirmation and ETA
- Cause of the lock failure
- Tenant's claim of reporting on the portal is matched by R-4766

## Conflicts between sources
- The tenant says he reported it 'on the portal I think'. Ticket R-4766 confirms it, still at init and unassigned.

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably a landlord-responsibility lock fault: the lock was reported stiff on 22 Sep (R-4766) and never actioned, and a snapped key in a stiff lock suggests a worn lock. This is not a simple lost key. Uncertain: whether the lock was faulty or the key was damaged or misused. Under policy the locksmith's report decides the recharge.

**2. What options do you give the tenant tonight and who pays for each?**

1) Emergency locksmith Hackney Locks 24/7 tonight. The tenant is not charged on the doorstep. Cost is covered under the landlord's emergency approval for now, and the final recharge follows the locksmith's report. 2) Spare/master key from the office: not available tonight, as it is Mon-Fri 9-17.30 with a £50 refundable deposit. It is also not suited to a snapped key stuck in the lock.

**3. What actions do you take?**

Linked the call to R-4766 and noted it, assigned the locksmith, sent the tenant an SMS with a timescale and safety note, emailed the landlord, escalated P1 (ESC-103) for phone confirmation, and scheduled a follow-up for 11 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4766","note":"10 Oct 21:15 out-of-hours call: tenant locked out, key snapped in front door lock (half stuck). Links to this stiff-… | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:30"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout of vulnerable tenant at night; locksmith needs confirming","known":"Jon… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4766","due_on":"2026-10-11","purpose":"Confirm tenant is in and door secure, get locksmith report on cause, decide recharge… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
