# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant locked out at night after key snapped; vulnerable (anxiety). Locksmith Hackney Locks 24/7 assigned under emergency authority, tenant and landlord told, call logged, P1 escalated to confirm attendance tonight.

## Where the case stands
Ticket R-4766 at visit stage, locksmith assigned for tonight, no confirmed arrival time. Waiting on locksmith confirmation (human, ESC-106) and then locksmith report to decide recharge.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover to confirm locksmith attendance tonight and call tenant back | internal maintenance | internal | A6 ✅ |
| 2 | REPLY_TO_TENANT | Text tenant: locksmith requested, don't pay tonight, spare key unavailable out of hours | Jonah Okafor, tenant | sms | A3 ✅ |
| 3 | ASSIGN_PROVIDER | Assign Hackney Locks 24/7 as emergency | Hackney Locks 24/7, contractor | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, it's Mare and Co. We've asked Hackney Locks 24/7 to get to you tonight as an emergency; we can't promise an arrival time yet, they may call you. We found your report of the stiff lock (R-4766) from 22 Sept, so we're treating this as a lock fault. Please don't pay the locksmith tonight; the cost will be sorted afterwards. The spare key at our office can only be collected Mon-Fri 9-17.30 (£50 refundable deposit), so it can't help tonight, and it wouldn't work with a snapped key stuck in the lock anyway. If you can't wait safely outside, tell us and we'll help find somewhere warm. In immediate danger call 999.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight (Sat 10 Oct) your tenant at 27 Bethnal Green Road was locked out when his key snapped in the front door lock. He had reported the lock as stiff on 22 Sept (R-4766, not yet actioned). In line with your emergency instruction we have sent Hackney Locks 24/7 to make the door safe and open. No quote yet. Whether the cost falls to you or the tenant will depend on the locksmith's report; given the earlier stiffness report it looks likely to be a lock fault. We'll send you the report and invoice when we have them.

## Escalation
- **P1 → maintenance** (verified): Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith attendance tonight
  - Known: Jonah Okafor (T-1002, vulnerable: anxiety) outside 27 Bethnal Green Road, cold, call 10/10 21:15. Prior ticket R-4766 (stiff lock, 22/09) still at init. Hackney Locks 24/7 (C-14, out of hours) assigned under emergency (ledger A1); landlord notes say approve emergencies without asking; landlord emailed. Tenant texted; told not to pay tonight.
  - Missing: Locksmith confirmation of arrival time; cause of failure (worn lock vs misuse); who pays.
  - Options: Phone Hackney Locks 24/7 on +447700900314 to confirm attendance tonight; If locksmith cannot attend, arrange alternative locksmith or emergency accommodation for tenant
  - Recommendation: Phone the locksmith now to confirm ETA and call the tenant back; recharge decided on locksmith's report, leaning landlord given the 22/09 stiff-lock report.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not decide who pays.
- No arrival time has been confirmed to the tenant.
- Did not phone the locksmith myself; the escalation asks a human to confirm attendance.

## Remaining work
- Human to confirm locksmith attendance tonight (ESC-106)
- Obtain locksmith report and invoice, decide recharge, send to landlord
- Replace/repair lock; link to earlier stiff-lock job R-4766

## Missing or unavailable information
- Locksmith ETA
- Cause of key failure / locksmith report
- Whether tenant can wait safely outside

## Conflicts between sources
- Tenant says he reported the lock on the portal 'I think'; confirmed by ticket R-4766 (22 Sept), still at init and unassigned.

## Answers to the case questions
**1. Is this tenant-responsibility lockout or landlord lock fault? What is uncertain?**

Probably a landlord-responsibility lock fault: the tenant reported the lock stiff on 22 Sept (R-4766, never actioned) and a stiff lock plausibly caused the key to snap. Not certain: the cause (worn lock vs key misuse/old key). Policy says the locksmith's report decides the recharge. It is not a lost-key case.

**2. What options do you give the tenant tonight and who pays?**

(1) Emergency locksmith Hackney Locks 24/7 tonight: we've told him not to pay tonight; cost provisionally landlord (emergency approved per landlord notes, within £250 limit), final recharge per the locksmith's report. (2) Spare key from office: only Mon-Fri 9-17.30 with £50 refundable deposit, so not available tonight and unlikely to help with a snapped key stuck in the lock. If he cannot stay outside safely, he should tell us; 999 if in danger.

**3. What actions do you take?**

Assigned locksmith under emergency (A1), logged call (A2), SMS to tenant (A3), email to landlord (A4), noted ticket (A5 API error but read-back showed stage in place), P1 escalation (A6) to confirm locksmith attendance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 (emergency, ASAP tonight)"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `log_call` | {"party_name":"Jonah Okafor","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Locked out at night, key snapped i… | 2 | ✅ verified | CALL-102 found in the log_call log |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `update_ticket` | {"ref":"R-4766","note":"Escalated to emergency 10/10 21:15: tenant locked out at night, key snapped, vulnerable tenant. Reported stiff lock … | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith att… | 2 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- A5: update_ticket returned HTTP 500 but read-back showed the ticket at visit stage; the note may not have saved. Not retried per instruction; noted in escalation.
- A2 attempt 1: First log_call not applied; retried once and verified (CALL-102).
- A6 attempt 1: First escalation ESC-105 not applied; retried and verified as ESC-106.
