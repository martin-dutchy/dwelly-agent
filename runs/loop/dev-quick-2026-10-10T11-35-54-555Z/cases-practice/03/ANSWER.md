# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** action_taken · **Severity:** emergency

Jonah Okafor (vulnerable) is locked out of P-202 with half a key stuck in the lock. We logged JOB-101 as an emergency, assigned Hackney Locks 24/7 for tonight, and told the landlord and tenant. Liability is undecided: the lock was reported stiff on 22 Sep (R-4766), so the locksmith's report will decide whether the landlord or the tenant pays.

## Where the case stands
Emergency out-of-hours lockout at P-202. JOB-101 assigned to Hackney Locks 24/7 (C-14), visit window 2026-10-10 21:30-23:59, awaiting attendance and a written locksmith report. Recharge is undecided until the report. Related stiff-lock report R-4766 is still in init and unassigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Locksmith dispatched tonight to remove the snapped key and gain entry, as an emergency under the landlord's standing approval. Instructions sent asking for a written cause report. | Hackney Locks 24/7, contractor | sms | A5 ✅ |
| 2 | CHASE_LANDLORD | Landlord told about the emergency dispatch and that the cost depends on the locksmith's report. | Margaret Ellison, landlord | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Tenant told the locksmith is coming, that the cost follows the report, that the spare key is only available Mon-Fri 9-17.30 with a £50 refundable deposit, and to call 999 if unsafe. | Jonah Okafor, tenant | email | A6 ✅ |
| 4 | OTHER | Stiff-lock history added to R-4766 so the lock fault is considered in the recharge decision. | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret,
> 
> Our tenant Jonah Okafor at 27 Bethnal Green Road (P-202) is locked out tonight. His front door key snapped in the lock and half is still stuck in it. He is outside and it is cold. He has a known vulnerability, so we treated this as an emergency.
> 
> Under your emergency approval note, we have sent Hackney Locks 24/7 to attend tonight to remove the key and get him in.
> 
> Whether the cost is yours or the tenant's depends on the locksmith's report. The front door lock was reported as stiff on 22 September (R-4766), so a lock fault is possible. We will confirm the outcome and the cost once the report is in.
> 
> Kind regards,
> Mare and Co

**A5 · send_message → Hackney Locks 24/7 (contractor) via phone_call, +447700900314** (verified)

> Emergency lockout, 27 Bethnal Green Road, London E1 6LA (P-202), ticket JOB-101. Front door key snapped in the lock, half still inside. Tenant Jonah Okafor is outside, vulnerable, and waiting. Please attend tonight, remove the broken key and gain entry. Please report in writing whether the lock or the key caused the failure, with the cause and any parts used, as this decides the recharge. Note: the lock was reported as stiff on 22 Sep (R-4766).

**A6 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Dear Jonah,
> 
> Thank you for calling. We are sorry you are locked out in the cold.
> 
> We have sent Hackney Locks 24/7 to 27 Bethnal Green Road tonight to remove the broken key and get you back in. Their number is +44 7700 900314 if you need to check on them. Please stay somewhere warm and safe while you wait. If you feel unsafe at any point, call 999.
> 
> About cost: the locksmith will write a report on what caused the key to break. If the lock is at fault, we will cover it. If the key was damaged by use, the cost may be passed to you under our lockout policy. We have also noted that the front door was reported as stiff on 22 September (R-4766), which the report will take into account. We will tell you the outcome in writing.
> 
> Spare key: our office key safe is only open Monday to Friday, 9am to 5.30pm. You can collect a spare key then, with a £50 deposit that is refunded when the key is returned. It is not available tonight.
> 
> Kind regards,
> Mare and Co

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Dispatching the locksmith does not decide who pays. Under policy the locksmith's report decides the recharge.
- The tenant's date of birth was not checked on this call, so no tenancy or account details were given beyond the lockout itself.
- The office key safe cannot be used until Monday 2026-10-12 at 09:00, so no spare key is available tonight.

## Remaining work
- Locksmith to attend tonight and send a written report on cause (lock or key) and parts used. Owner: Hackney Locks 24/7. Chase on 2026-10-12 if not received.
- Decide the recharge (landlord if lock fault, tenant if key damage) once the report is in. Owner: operations, with landlord if needed.
- Decide R-4766 (stiff front door lock) with the landlord, since it may be a landlord repair. Owner: operations.
- Confirm the tenant is back inside and close JOB-101. Owner: operations.

## Missing or unavailable information
- Locksmith's written report on cause (lock fault vs key damage).
- Confirmation from the tenant that he is back inside.
- Tenant's date of birth, not verified on this call.

## Conflicts between sources
- Tenant says he reported the stiff lock on the portal. The system confirms R-4766 (22 Sep, init, unassigned), so the report exists but was never actioned. Trusted the system record.
- Tenant asked about a 'master key'. The CRM mentions only the office key safe spare (Mon-Fri 9-17.30). No master key is referenced, so none was offered.

## Answers to the case questions
**1. 1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Undetermined. The key snapped in the lock, which could be tenant damage (recharge to tenant under policy) or a lock fault (landlord, since a broken lock is the landlord's responsibility). Evidence for a lock fault: the front door was reported stiff on 22 Sep (R-4766) and never assigned. Uncertain: whether the lock or the key failed, and whether the stiffness contributed. The locksmith's written report decides.

**2. 2. What options do you give the tenant tonight and who pays for each?**

Option 1 (tonight): emergency locksmith Hackney Locks 24/7 attends. Cost not yet decided: landlord if the report shows a lock fault, tenant if key damage. Option 2 (not available tonight): spare key from the office key safe, Mon-Fri 9-17.30, £50 refundable deposit, paid by tenant. The tenant was told the cost follows the report.

**3. 3. What actions do you take?**

Created JOB-101 (emergency, linked to R-4766) and assigned Hackney Locks 24/7 for 21:30-23:59 tonight. Sent the locksmith instructions (message A5). Emailed the landlord about the emergency dispatch and the pending cost decision. Emailed the tenant with the plan, the 999 advice, the spare-key terms and that the cost follows the report. Logged the call and added a note to R-4766.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"locks","severity":"emergency","description":"Out-of-hours lockout, 27 Bethnal Green Road. Front door key sna… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `log_call` | {"party_name":"Jonah Okafor","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Out-of-hours call 21:15. Front doo… | 1 | ✅ verified | CALL-102 found in the log_call log |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Hackney Locks 24/7 (C-14)","visit_window":"2026-10-10 21:30-23:59"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"phone_call","contact":"+447700900314","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"JOB-101","bo… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `add_note` | {"entity":"R-4766","note":"10 Oct 2026: tenant reports lock stiff for weeks and key snapped in lock on the night of 10 Oct. Linked to emerge… | 1 | ✅ verified | NOTE-106 found in the add_note log |

## Failed or unverified actions
_None._
