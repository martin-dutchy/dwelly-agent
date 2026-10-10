# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Jonah Okafor, a vulnerable tenant, is locked out of 27 Bethnal Green Road after his key snapped in a stiff front door lock. I linked it to open ticket R-4766, messaged the tenant to verify his DOB, informed the landlord, and escalated P1 (ESC-103) so the locksmith (C-14) can be dispatched as soon as identity is verified. Cost stays with the landlord pending the locksmith report, since the stiff lock suggests a lock fault.

## Where the case stands
Out-of-hours (Sat 21:15) emergency lockout at P-202 for vulnerable tenant Jonah Okafor. Key snapped in front door lock. Locksmith not yet dispatched: identity not verified by DOB. Landlord informed by email. Escalated ESC-103 (P1). Linked to open ticket R-4766 (stiff lock, reported 22 Sept, unassigned).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tenant asked by SMS for date of birth to verify identity, with safety advice and a no-self-pay instruction; locksmith to be arranged once verified. | Jonah Okafor, tenant | sms | A2 ✅ |
| 2 | CHASE_LANDLORD | Landlord informed of the lockout, the planned emergency locksmith (Hackney Locks 24/7), and that the cost split depends on the locksmith report; invited to object. | Margaret Ellison, landlord | email | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalated P1 to maintenance for DOB-verified dispatch of C-14 tonight and the cost decision. | Maintenance team (ESC-103) | internal | A4 ✅ |
| 4 | OTHER | R-4766 annotated with tonight's lockout and the unresolved cause. | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, this is Mare and Co about your call tonight. We're sorry you're locked out. To protect your home, please reply with your date of birth so we can confirm it's you. As soon as we have that, we'll arrange a locksmith to attend tonight. If you're cold or unsafe while waiting, please go somewhere warm nearby, and call 999 if you're ever in immediate danger. Please don't pay for a locksmith yourself until we've confirmed who pays. We'll be in touch by email too.

**A3 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, our out-of-hours line took a call tonight (Sat 10 Oct, 21:15) from your tenant Jonah Okafor at 27 Bethnal Green Road, E1 6LA. He is locked out: his key snapped in the front door lock and part of it is stuck in the lock. He is outside and it is cold. He reported the stiff lock on 22 Sept (ticket R-4766), so the cause may be a lock fault. We plan to send Hackney Locks 24/7 tonight as an emergency to get him in and make the lock secure. Their report will decide whether the cost is yours or his. Please reply if you object. We will not hold the tenant up while we wait. Kind regards, Mare and Co

## Escalation
- **P1 → maintenance** (verified): Out-of-hours emergency lockout for a vulnerable tenant (Jonah Okafor, P-202) outside in the cold. Locksmith dispatch needs identity verification by DOB first, and the cost split depends on the locksmith's report.
  - Known: Key snapped in front door lock at 27 Bethnal Green Road (call 21:15 Sat). Tenant is vulnerable (anxiety, prefers email). Open ticket R-4766 for stiff lock since 22 Sept, unassigned. Locksmith C-14 Hackney Locks 24/7 (+447700900314) is out of hours. Landlord Margaret Ellison (L-02) approves emergencies without asking; spend limit £250. Office key safe closed until Mon 9:00, so no spare key tonight. Policy: broken lock is landlord's; out-of-hours lost key is tenant's; unclear cause decided by locksmith report.
  - Missing: DOB not yet confirmed by caller, so identity is unverified. Cause of snapped key not known (lock fault vs misuse). Tenant's current location and safety not yet confirmed.
  - Options: Dispatch C-14 tonight once DOB is verified, landlord to cover the emergency call-out, and recharge only if the locksmith report shows key misuse; Tenant pays the locksmith tonight and claims back if the lock is found faulty; Tenant arranges own shelter overnight and locksmith attends Monday
  - Recommendation: Verify DOB, then dispatch C-14 tonight as an emergency. Landlord bears the cost unless the locksmith report shows tenant misuse. Do not make the tenant pay upfront. Treat R-4766 as the lock fault record.
  - Deadline: 2026-10-10 23:00

## What this does not establish
- Sending the tenant and landlord messages does not confirm the locksmith is coming or who pays.
- Not confirmed: the cause of the snapped key; whether the lock is faulty or was misused.
- Office key safe (spare key) is closed until Mon 9:00 and is not an option tonight.
- No contractor has been booked or assigned.

## Remaining work
- Verify caller DOB (tenant reply to SMS) before any write (ESC-103, maintenance).
- Dispatch Hackney Locks 24/7 (C-14) tonight as emergency once verified (ESC-103 / maintenance).
- Landlord to confirm cost of emergency call-out; locksmith report decides recharge (ESC-103).
- Monday: if no tonight dispatch, lock fault still needs repair under R-4766 (maintenance).

## Missing or unavailable information
- Caller's date of birth for identity verification.
- Locksmith report on cause of snapped key (lock fault vs misuse).
- Tenant's current location and whether he has shelter tonight.

## Conflicts between sources
- Tenant says he reported the lock 'on the portal I think'; the record R-4766 (22 Sept, stiff lock) confirms a report, which supports a lock fault.
- Policy says out-of-hours lost keys are the tenant's cost; the lock-fault rule puts broken locks on the landlord. Trusted the lock-fault rule as the snapped key followed a documented stiff lock, pending the locksmith report.

## Answers to the case questions
**1. 1. Tenant-responsibility lockout or landlord lock fault?**

Provisionally a landlord lock fault: the lock was reported stiff on 22 Sept (R-4766) and the key snapped in it. Policy puts broken locks on the landlord. Not yet confirmed: the locksmith report must establish whether the snap was caused by wear or by misuse, which decides any recharge.

**2. 2. Options tonight and who pays?**

(a) Locksmith C-14 tonight as emergency, landlord pays the call-out, recharge only if report shows misuse. (b) Tenant pays now and claims back if lock is faulty: not recommended for a vulnerable tenant. (c) Shelter overnight and attend Monday: no spare key until office opens Mon 9:00, so fallback only. Recommended: (a) once DOB verified.

**3. 3. Actions taken?**

Annotated R-4766, sent SMS to tenant asking for DOB and giving safety advice, emailed landlord about the emergency, escalated P1 as ESC-103. Locksmith not yet booked because identity is unverified.

**4. Is the master key available tonight?**

No. The office key safe is only collectable Mon-Fri 9-17.30, and today is Saturday.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4766","note":"2026-10-10 21:15 out-of-hours call from Jonah Okafor (T-1002): locked out of P-202 after key snapped in front door l… | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","body":"Hi Jonah, this is Mare and Co a… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours emergency lockout for a vulnerable tenant (Jonah Okafor, P-202) outside in the … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
