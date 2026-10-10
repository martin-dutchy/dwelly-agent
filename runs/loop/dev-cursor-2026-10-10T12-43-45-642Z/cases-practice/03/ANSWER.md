# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** action_taken · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped in a lock reported stiff on 22 Sept (R-4766, never actioned). Treated as an emergency: assigned the out-of-hours locksmith on the existing ticket, informed tenant, locksmith and landlord, and escalated P1 for monitoring.

## Where the case stands
R-4766 at visit stage, Hackney Locks 24/7 assigned for tonight, ETA unconfirmed. Waiting on locksmith attendance and report; follow-up 2026-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Hackney Locks 24/7 for emergency attendance tonight | Hackney Locks 24/7, contractor | phone_call | A2 ✅ |
| 2 | REPLY_TO_TENANT | Texted tenant with plan, no charge tonight, update tomorrow | Jonah Okafor, tenant | sms | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to monitor locksmith attendance | internal | internal | A7 ✅ |
| 4 | WAIT | Follow-up on locksmith report and recharge decision 11 Oct | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Hackney Locks 24/7 (contractor) via phone_call, +447700900314** (verified)

> Emergency callout tonight: 27 Bethnal Green Road, London E1 6LA. Tenant Jonah Okafor (+447700900102) is locked out, key snapped in the front door lock with half still in it. Tenant is vulnerable and outside in the cold. Please attend as soon as possible, remove the broken key, get him in and make the door secure. Landlord has pre-approved emergency work. Tenant reported the lock stiff since 22 Sept, so please give a written report on the cause (worn/faulty lock vs key damage) and a quote for any replacement lock before fitting anything over the emergency make-safe. Please confirm your ETA.

**A4 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about tonight. We've sent our emergency locksmith, Hackney Locks 24/7, to 27 Bethnal Green Road. Our target is to get you in tonight; they'll confirm an arrival time with you on 07700 900102. Your lock was reported stiff in September, so we're treating this as a possible lock fault. You don't need to pay the locksmith tonight; their report on the cause will decide any charge, and we'll tell you before anything is billed to you. Please don't force the lock. The office key safe is only open Mon-Fri, so the locksmith is the quickest route. If you feel unsafe or need somewhere warm, call 999 if in danger. We'll email you tomorrow with an update.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight (Sat 10 Oct) your tenant at 27 Bethnal Green Road was locked out after his key snapped in the front door lock. He had reported the lock stiff on 22 Sept (ticket R-4766, not yet actioned). As emergencies are pre-approved, we've sent Hackney Locks 24/7 out tonight to get him in and make the door secure. If the lock is found faulty it is your responsibility, and we'll send you their report and any quote for a replacement lock (anything beyond emergency make-safe above £250 will come to you for approval). We'll update you once the locksmith reports.

## Escalation
- **P1 → maintenance** (verified): Out-of-hours lockout of vulnerable tenant (anxiety), outside at night; confirm locksmith attends
  - Known: Jonah Okafor, 27 Bethnal Green Road, key snapped in front door lock, outside in cold, caller says safe. Lock reported stiff 22/09 (R-4766, never actioned). Landlord pre-approves emergencies. Hackney Locks 24/7 assigned and briefed, tenant and landlord informed.
  - Missing: Locksmith ETA confirmation; cause of failure (worn lock vs key damage); caller's DOB not verified on the call; whether tenant has a safe place to wait.
  - Options: Locksmith attends tonight, landlord pays if lock fault; If locksmith cannot attend, arrange alternative locksmith or warm place for tenant
  - Recommendation: Monitor tonight for locksmith confirmation; call tenant if no ETA within 30 minutes. Decide recharge from locksmith report.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not decide who pays; the locksmith's report does.
- The visit time is not confirmed.
- No replacement lock has been approved.

## Remaining work
- Maintenance on-call: confirm locksmith attends tonight (ESC-105)
- Agency: collect locksmith report and invoice, decide recharge, tell tenant (email) and landlord
- Agency: close R-4766 only after completion and the lock is confirmed safe

## Missing or unavailable information
- Locksmith ETA
- Cause of failure
- Caller DOB not verified

## Conflicts between sources
- Tenant says he reported the lock on the portal; the system holds R-4766 (22 Sept, stage init). Treated as the same report.

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably a landlord lock fault, not a lost-key lockout: the key snapped, and the stiff lock was logged on 22 Sept (R-4766). Uncertain: whether the lock is worn or the key was already damaged, and whether the portal report matches R-4766. The locksmith's report decides any recharge, per policy.

**2. What options do you give the tenant tonight and who pays for each?**

Option 1 (taken): emergency locksmith tonight. No charge to the tenant tonight; the landlord pays if the lock is faulty (emergencies pre-approved), and the tenant is told before any recharge if the report says otherwise. Option 2: the spare/master key. The key safe is Mon-Fri 9-17.30 with a £50 refundable deposit, so it is not available tonight and wouldn't help with a snapped key stuck in the lock. We did not ask him to pay for a locksmith.

**3. What actions do you take?**

Noted R-4766 and assigned Hackney Locks 24/7 (A1, A2), briefed the locksmith (A3), texted the tenant (A4), emailed the landlord (A5), scheduled a follow-up for 11 Oct (A6) and escalated P1 (A7).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4766","note":"Out-of-hours 10/10 21:15: tenant locked out, key snapped in front door lock (half stuck). Lock reported stiff since … | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 (emergency, ASAP tonight)"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"phone_call","contact":"+447700900314","ticket_ref":"R-4766",… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4766","due_on":"2026-10-11","party":"Hackney Locks 24/7 / Jonah Okafor","purpose":"Confirm tenant is back in, get locksmith… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout of vulnerable tenant (anxiety), outside at night; confirm locksmith att… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
