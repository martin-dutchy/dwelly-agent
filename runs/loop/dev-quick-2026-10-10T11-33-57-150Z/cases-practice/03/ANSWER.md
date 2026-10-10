# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant Jonah Okafor (vulnerable) is locked out tonight after his key snapped in the front door lock. I opened emergency job JOB-101 linked to the stiff-lock report R-4766, texted the out-of-hours locksmith, emailed the tenant and landlord, and escalated P1 (ESC-106) so someone confirms the attendance tonight. The cost is not decided: lock fault is the landlord's, key misuse the tenant's, per the locksmith's report.

## Where the case stands
Out-of-hours lockout (Sat 21:15). Tenant Jonah Okafor, P-202, outside in the cold. Front door key snapped in lock. Emergency job JOB-101 open. Locksmith texted, arrival not yet confirmed. Recharge undecided until locksmith report.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Locksmith Hackney Locks 24/7 asked to attend tonight, confirm arrival time and give a written cause report | Hackney Locks 24/7, contractor | sms | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tenant told the emergency is logged, a locksmith is being sent, how the cost will be decided, office key safe hours, and safety/helpline advice | Jonah Okafor, tenant | email | A3 ✅ |
| 3 | CHASE_LANDLORD | Landlord told of the emergency attendance and the stiff-lock report R-4766 that needs her decision | Margaret Ellison, landlord | email | A4 ✅ |
| 4 | OTHER | Internal note recording the dispatch and the SMS filed under R-4766 in error | internal | internal | A5 ✅ |
| 5 | ESCALATE_TO_HUMAN | Urgent maintenance team to phone Hackney Locks tonight to confirm attendance, and to follow up with the tenant if no arrival | Maintenance team, internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Hackney Locks 24/7 (contractor) via sms, +447700900314** (verified)

> Emergency lockout, 27 Bethnal Green Road, London E1 6LA (P-202). Tenant locked out tonight, front door key snapped in the lock, half still inside. Tenant is vulnerable and outside in the cold. Please attend tonight and confirm your arrival time to us. Please provide a written report stating the cause (broken lock mechanism or key damage/misuse), as this decides the recharge. Tenant contact: Jonah Okafor, via email jonah.ok@mailbox.example. Landlord is Margaret Ellison (emergency approved per landlord notes).

**A3 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah,
> 
> Thanks for calling. We've logged this as an emergency and have sent a 24-hour locksmith, Hackney Locks 24/7, to 27 Bethnal Green Road. We are asking them to attend tonight and to confirm their arrival time to us. We will pass that on as soon as we have it.
> 
> On cost: the locksmith will write a report on what caused the lock to fail. If the lock itself is faulty, the landlord pays. If the key was damaged through misuse, you may be asked to pay. We will not decide that until we have the report, and we will tell you before anything is charged to you. Your earlier report about the stiff lock (R-4766) is on file and we are raising it with the landlord.
> 
> Our office is closed now, so the office key safe (for a spare key, £50 refundable deposit) is only collectable Monday to Friday 9:00 to 17:30.
> 
> While you wait, please keep yourself safe and warm. If you feel unwell or in danger, call 999. If you need someone to talk to, Samaritans is free on 116 123.
> 
> Reply to this email if anything changes.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret,
> 
> Tenant Jonah Okafor at 27 Bethnal Green Road (P-202) is locked out tonight. His front door key snapped in the lock. He reports the lock has been stiff for weeks; that report (R-4766, 22 September) has not yet been actioned.
> 
> As your notes allow emergencies without asking, we have sent Hackney Locks 24/7 tonight. Their report will show whether the lock failed (your cost) or whether the key was damaged through misuse (tenant's cost). We will confirm the outcome to you in writing.
> 
> Please also note the stiff lock report R-4766 needs a separate decision from you on repair.

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant locked out at night in cold; emergency locksmith requested but no arrival time confirmed. Need someone to confirm attendance tonight and check the tenant is safe.
  - Known: Tenant Jonah Okafor (T-1002, P-202, vulnerable: anxiety) locked out, front door key snapped in lock. Prior stiff-lock report R-4766 (22 Sept) still at init. Locksmith Hackney Locks 24/7 texted (A2). Tenant (A3) and landlord Margaret Ellison (A4, emergency pre-approved in her notes) emailed. Office key safe closed until Mon 9:00.
  - Missing: Locksmith arrival time and cause finding. Tenant identity not verified by DOB on the call (caller gave name and address matching CRM). Recharge decision pending the locksmith report.
  - Options: Confirm Hackney Locks attends tonight and gets the tenant in; If locksmith cannot attend, arrange an alternative 24h locksmith; Accommodation help only if the tenant cannot be let in tonight and is at risk
  - Recommendation: Phone Hackney Locks now to confirm attendance tonight. Once the locksmith report is in, recharge by its finding: lock fault to landlord, key misuse to tenant.
  - Deadline: 2026-10-10 23:00

## What this does not establish
- Sending the locksmith does not confirm arrival time or cause of failure
- Recharge is not decided: lock fault is landlord's cost, key misuse is tenant's cost, per the locksmith report
- The landlord has not approved a specific spend; emergency approval relies on her standing note, not a quote
- No DOB verification was done on the call; the tenant's identity matches the CRM by name and address only

## Remaining work
- Locksmith to confirm attendance tonight and send a written cause report (owner: maintenance team, via ESC-106)
- Decide recharge from the report: landlord if lock failed, tenant if key damaged through misuse (owner: maintenance/accounts)
- Stiff-lock report R-4766 (22 Sept) still at init with no contractor. Landlord to decide repair (owner: maintenance)
- Office key safe spare-key collection only Mon-Fri 9:00-17:30 with £50 deposit; master key question is answered by that policy

## Missing or unavailable information
- Locksmith arrival time tonight
- Locksmith's cause finding
- Landlord's decision on the stiff-lock repair R-4766

## Conflicts between sources
- Tenant says he reported the stiff lock on the portal; the system shows R-4766 (22 Sept, stage init, no contractor). Trusted the system record: the report exists but was never actioned.
- Tenant says 'I'm not paying for a locksmith if the lock's broken'; policy says the locksmith report decides, so no promise was given either way.
- SMS to the locksmith was filed under R-4766 instead of JOB-101; cross-referenced in note A5.

## Answers to the case questions
**1. 1. Tenant-responsibility lockout or landlord lock fault?**

Not yet determined. Policy: a lost or misplaced key is the tenant's cost out of hours, a broken lock is the landlord's, and an unclear cause is decided by the locksmith report. Evidence points both ways: a snapped key suggests key damage or misuse, but the lock has been stiff since 22 Sept (R-4766), which points to a lock fault. Treat as unclear until the report is in.

**2. 2. Options for the tenant tonight and who pays**

(a) Out-of-hours locksmith Hackney Locks 24/7 attends tonight: sent and awaiting confirmation. Cost follows the report: landlord if lock fault, tenant if key misuse. (b) Office spare key from the key safe: only Mon-Fri 9:00-17:30 with £50 refundable deposit, so not available tonight. (c) If the locksmith cannot attend, an alternative 24h locksmith, with the same report-based recharge, needs urgent confirmation by the maintenance team.

**3. 3. Actions taken**

Opened JOB-101 (emergency, linked to R-4766). Texted the locksmith to attend and report (A2). Emailed the tenant with the plan, cost rule, key safe hours and safety/helpline advice (A3). Emailed the landlord, who has emergency approval in her notes (A4). Added note (A5). Escalated P1 to maintenance (A6, ESC-106).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","category":"locks","severity":"emergency","description":"Out-of-hours lockout. Tenant Jonah Okafor (vulnerable, anxiety)… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"sms","contact":"+447700900314","body":"Emergency lockout, 27… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah,\n\nThank… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `add_note` | {"entity":"JOB-101","note":"Emergency lockout, P-202, tenant Jonah Okafor (vulnerable). Locksmith Hackney Locks 24/7 (C-14, +447700900314) t… | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant locked out at night in cold; emergency locksmith requested but no arrival … | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- escalate_to_human (first attempt): Validation error (missing parameter 'options'); re-submitted with options and it verified as A6 / ESC-106.
