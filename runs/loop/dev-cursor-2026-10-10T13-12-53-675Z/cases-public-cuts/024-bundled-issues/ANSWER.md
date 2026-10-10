# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant asked about a leaking conservatory roof on a closed oven ticket. The earlier 'fixed' message and closure had no evidence. I logged the roof leak and fence as separate jobs, noted the record, told the tenant, and asked the landlord for approval.

## Where the case stands
Oven ticket closed without payment but with no visit or result on record; leak and fence now logged as JOB-101 (urgent) and JOB-102 (routine). Waiting on tenant reply and landlord decision; follow-up 2026-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the wrongly sent 'fixed' message, confirm new jobs, ask for leak details and oven/fence status | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor for the roof leak and tell them the oven closure and fence issue | Landlord | email | A5 ✅ |
| 3 | WAIT | Review replies 2026-08-27 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry, our earlier message saying the oven and fence were fixed was sent in error: we have no record of anyone attending. I've now logged the leaking conservatory roof as an urgent job (JOB-101) and the fence as its own job (JOB-102). Could you tell us: where the roof is leaking and whether water is near any lights or sockets (if so, please keep away and switch that circuit off if safe)? Is the oven still not heating properly, and has the fence been fixed? We'll aim to have the roof looked at within 72 hours once the landlord has approved, and we'll update you by 2026-08-27.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof. May we send our contractor to inspect, or will you arrange your own? Also the oven job (landlord approved 5 Aug) was closed with no visit on record; we are checking with the tenant and will reopen it if still faulty. Fence repair also reported (JOB-102). Reply please by 2026-08-28.
> 
> Options: Yes, send your contractor (recommended); I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish that the oven, fence or roof is fixed or the cause
- No contractor assigned for the roof; landlord approval pending
- Oven ticket not reopened yet pending tenant answer

## Remaining work
- Roof leak inspection after landlord approval (agency)
- Verify oven; reopen with Lantern Works if still faulty (agency)
- Verify and progress fence job JOB-102 (agency)

## Missing or unavailable information
- Leak details and whether near electrics
- Whether the oven and fence are actually fixed
- Any provider visit or invoice evidence for the oven

## Conflicts between sources
- Event 016 and the closure say the oven and fence were fixed, but there is no provider result, and the tenant says the oven has not worked since move-in. The tenant's reports are treated as current.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed without payment but with no evidence of a visit. The roof leak and fence were never logged. Both are now open as new jobs, and oven status is to be verified.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant, which was sent, and a landlord approval request for the roof, which was sent. Follow-up is set for 2026-08-27.

**3. Does anything need a human decision, and why?**

No. The routine steps are done. Escalate to P2 maintenance if the tenant reports water near electrics or the landlord is silent beyond 3 days.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports a leaking co… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair requested by… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Ticket closed without payment (event 030) with no provider visit, quote or work result on record;… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof. May we send our contractor to i… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Check tenant reply on roof leak/oven/fence and landlord decision; reopen oven if st… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
