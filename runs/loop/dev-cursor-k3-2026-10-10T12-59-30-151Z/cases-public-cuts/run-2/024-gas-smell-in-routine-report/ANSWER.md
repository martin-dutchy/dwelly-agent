# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's reply to the oven request mentioned a gassy smell near the cooker, which the tenant called "not urgent". I treated it as a gas emergency. I sent her safety advice with the 0800 111 999 number, opened emergency job JOB-102, asked the landlord for approval and escalated P1. I also returned the original job to auto mode.

## Where the case stands
Original oven job at intake with no provider. The tenant's reply reports a gassy smell, so a linked emergency gas job JOB-102 is open. The landlord has been asked to approve, and P1 escalation ESC-104 is raised. No contractor is assigned yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice sent: stop using the oven, no flames or switches, ventilate, leave if smell is present, call 0800 111 999 or 999. Told her an engineer is being arranged. | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to dispatch a Gas Safe engineer and phone the tenant | internal maintenance | internal | A4 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Told the landlord about the gas smell and asked to confirm our Gas Safe contractor | Landlord | email | A3 ✅ |
| 4 | WAIT | Follow-up on 2026-08-06 to check attendance and the landlord reply | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Please treat the gas smell seriously, even if it only happens sometimes. Please don't use the oven or hob, and don't use any flames or light switches near it. Open the windows, leave the flat if you can smell gas now, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels unwell or you're in immediate danger, call 999. We're arranging for a Gas Safe engineer to be sent as an emergency, and we'll be in touch about it. Please don't use the oven until it has been checked.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports a gassy smell near the oven plus the oven not heating. We have raised an emergency gas job and advised the tenant to stop using it and call the gas emergency line. Please confirm we may send our Gas Safe contractor to inspect.
> 
> Options: Yes, send your Gas Safe contractor (recommended); I will arrange my own contractor

## Escalation
- **P1 → maintenance** (verified): Gas smell reported near oven inside a routine oven-repair job
  - Known: Tenant Imogen emailed 05/08 (event 006): oven still not cooking after trying the manual settings, and "a bit of a gassy smell near it sometimes". Intake classed routine. Tenant sent gas safety advice and the 0800 111 999 number. Emergency gas ticket opened linked to NBL-024; landlord asked for approval. No Gas Safe contractor named in records.
  - Missing: Gas Safe contractor and visit time; whether the tenant has left and called the gas line; landlord reply; last gas safety record.
  - Options: Assign Gas Safe engineer for same-day attendance; Phone tenant to confirm safety
  - Recommendation: Dispatch a Gas Safe engineer today, and phone the tenant to confirm she has left or ventilated and called 0800 111 999.
  - Deadline: Same day

## What this does not establish
- No contractor has been assigned and no visit is booked.
- The cause of the smell or the oven fault is not established.
- The landlord has not approved anything yet.
- The manual attachment was unseen, so its contents are not relied on.

## Remaining work
- Human to dispatch a Gas Safe engineer today (ESC-104)
- Landlord reply to APR-103
- Original oven fault to be handled with the gas inspection
- Phone the tenant to confirm she is safe

## Missing or unavailable information
- No Gas Safe contractor named in the records
- Landlord contact and reply
- Whether the tenant has left the flat or called the gas line

## Conflicts between sources
- The tenant called the smell 'not urgent', but a gas smell is an emergency under policy, so I treated it as one.
- The landlord's earlier email suggested a settings problem, but the tenant says the oven has been faulty since she moved in.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is at intake with no provider. The tenant says the manual settings didn't help and reports an intermittent gas smell. Emergency job JOB-102 is open, the landlord has been asked to approve, and an engineer still needs dispatching.

**2. What is the next action, who is it for, and through which channel?**

Gas safety advice by email to the tenant (sent). P1 escalation to the maintenance team to dispatch a Gas Safe engineer. Approval request to the landlord.

**3. Does anything need a human decision, and why?**

Yes, P1: a gas smell needs same-day Gas Safe attendance, and no contractor is named in the records, so a human must dispatch one and phone the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi Imogen, than… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant Imogen reports an … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","decision_needed":"Tenant reports a gassy smell near the oven plus the oven not heating. We … | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell reported near oven inside a routine oven-repair job","known":"Tenant Imogen emaile… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |
| A6 | `schedule_follow_up` | {"due_on":"2026-08-06","purpose":"Check gas engineer attended JOB-102 and landlord replied","ticket_ref":"JOB-102"} | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
