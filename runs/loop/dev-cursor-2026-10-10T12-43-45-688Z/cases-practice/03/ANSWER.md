# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped in a lock already reported stiff on 22 Sep (R-4766). Treated as emergency: assigned Hackney Locks 24/7, told tenant, landlord and locksmith, escalated P1 for human confirmation of attendance.

## Where the case stands
R-4766 at stage visit; Hackney Locks 24/7 assigned for tonight, awaiting their attendance and report; follow-up 11 Oct; P1 escalated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned emergency locksmith for tonight | Hackney Locks 24/7, contractor | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant locksmith is coming, no upfront payment, recharge decided by report, spare keys only Mon-Fri | Jonah Okafor, tenant | sms | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to confirm locksmith attendance tonight | internal | internal | A8 ✅ |
| 4 | WAIT | Follow up 11 Oct for locksmith report and invoice | Hackney Locks 24/7 | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, we've sent Hackney Locks 24/7 (emergency locksmith) to 27 Bethnal Green Road tonight; target is within 24h, we're aiming for this evening. They'll phone you. You won't be asked to pay on the spot. Your stiff lock was reported on 22 Sep, so the locksmith's report will decide who pays: a worn or faulty lock is the landlord's cost. Please don't pay anyone yourself. Spare keys are in our office safe (Mon-Fri 9-17.30, £50 refundable deposit) but can't be collected tonight, and the locksmith is quicker anyway. If you feel unsafe or can't stay warm, call 999 or let us know. We'll update you by email tomorrow.

**A4 · send_message → Hackney Locks 24/7 (contractor) via phone_call, +447700900314** (verified)

> Emergency lockout, 27 Bethnal Green Road E1 6LA, tenant Jonah Okafor +447700900102, waiting outside. Key snapped in front door lock, half stuck in barrel. Lock reported stiff since 22 Sep. Please attend tonight, open, replace/repair lock so tenant can secure the door, and send a written report on cause (worn/faulty lock vs misuse) with invoice: it decides recharge. Landlord pre-approves emergencies; call us before any spend above £250.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight your tenant at 27 Bethnal Green Road was locked out after a key snapped in the front door lock (reported stiff since 22 Sep, ticket R-4766). Under your emergency instruction we've sent Hackney Locks 24/7. Their report will decide whether the cost is yours (faulty lock) or the tenant's. We'll update you once they've reported and will come back to you before any spend over £250.

## Escalation
- **P1 → maintenance** (failed): Out-of-hours lockout, vulnerable tenant (anxiety) outside at night; ticket note update errored
  - Known: Jonah Okafor (T-1002, vulnerable) locked out 21:15 Sat 10 Oct, key snapped in front door lock. Stiff-lock ticket R-4766 open since 22 Sep, never assigned. Hackney Locks 24/7 assigned tonight (A1), landlord emailed, tenant texted. update_ticket gave HTTP 500; stage read-back shows visit but note may not have saved.
  - Missing: Locksmith confirmation of attendance/time; cause; who pays; no DOB verification tool available (caller matched records by name/address).
  - Options: Human confirms by phone that locksmith is attending tonight; If locksmith unavailable, find another out-of-hours locksmith, make safe, landlord pre-approved emergencies; Arrange temporary accommodation if tenant cannot get in
  - Recommendation: Phone Hackney Locks 24/7 now to confirm ETA and re-add the ticket note; recharge decision after locksmith report (likely landlord given stiff-lock history).
  - Deadline: Tonight
- **P1 → maintenance** (verified): Out-of-hours lockout, vulnerable tenant outside at night; ticket note update errored
  - Known: Jonah Okafor (T-1002, vulnerable) locked out 21:15 Sat 10 Oct, key snapped in lock. R-4766 stiff lock open since 22 Sep unactioned. Hackney Locks 24/7 assigned (A1), landlord emailed, tenant texted.
  - Missing: Locksmith ETA confirmation; cause; who pays.
  - Options: Phone locksmith to confirm ETA; Alternative locksmith if none; Temporary accommodation if needed
  - Recommendation: Phone Hackney Locks now to confirm attendance; recharge after report.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not decide who pays
- No confirmed arrival time; the window is a target
- Landlord informed but has not responded

## Remaining work
- Human: confirm locksmith attending tonight
- Review locksmith report, decide recharge (landlord if faulty/stiff lock)
- Email tenant update tomorrow
- Landlord update after report

## Missing or unavailable information
- Locksmith confirmation and ETA
- Cause of failure
- Whether tenant reported on portal (ticket R-4766 shows yes, 22 Sep)

## Conflicts between sources
- Tenant said he 'thinks' he reported on the portal; ticket R-4766 confirms it (22 Sep).

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably landlord-leaning: the stiff lock was reported 22 Sep and never actioned, and a broken lock is landlord responsibility. Uncertain: whether the key snapped through wear in a faulty lock or misuse/old key; the locksmith's report decides recharge.

**2. What options do you give the tenant tonight and who pays for each?**

Emergency locksmith tonight, paid upfront by agency/landlord (landlord pre-approves emergencies), recharge to tenant only if report shows tenant cause. Spare key from office is Mon-Fri 9-17.30 with £50 refundable deposit, so not available tonight. Tenant told not to pay anyone himself.

**3. What actions do you take?**

Assigned locksmith to existing ticket R-4766 (no duplicate), texted tenant, phoned/messaged locksmith, emailed landlord, scheduled follow-up, escalated P1.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `update_ticket` | {"ref":"R-4766","note":"10 Oct 21:15 tenant phoned out of hours: key snapped in front door lock, locked out at night. Lock reported stiff si… | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"phone_call","contact":"+447700900314","ticket_ref":"R-4766",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4766","due_on":"2026-10-11","purpose":"Confirm locksmith attended, get cause report and invoice, decide recharge, update te… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout, vulnerable tenant (anxiety) outside at night; ticket note update error… | 1 | ❌ failed | ESC-105 was returned but is not in the escalate_to_human log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout, vulnerable tenant outside at night; ticket note update errored","known… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- A2: update_ticket returned HTTP 500; read-back shows stage visit in place, not retried; note content unconfirmed, recorded in escalation
- A7: Escalation ESC-105 not applied; retried once, verified as ESC-106 (A8)
