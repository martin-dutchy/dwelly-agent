# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed without any recorded repair, and an unsupported email told the tenant the fence and oven were fixed. The tenant is now asking about a leaking conservatory roof. I logged the roof and fence as separate jobs, corrected the record, told the tenant, asked the landlord for approval and set a follow-up.

## Where the case stands
The oven ticket is closed without payment, but the record shows no visit, result or quote. Two unlogged issues are now open as JOB-101 (roof, urgent) and JOB-102 (fence, routine). We are waiting on the landlord for approval and on the tenant to confirm the oven status.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Corrected the false 'fixed' email, confirmed the new roof and fence jobs, asked whether the oven is still faulty, gave safety advice and a next-update date | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked the landlord to approve our contractor inspecting the roof and fence | Landlord | email | A5 ✅ |
| 3 | WAIT | Chase the landlord and check the tenant's oven reply on 2026-08-27 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry, our earlier email saying the fence and oven were fixed was sent in error. We have no record of either being repaired. We have now opened separate jobs for the leaking conservatory roof (JOB-101, treated as urgent) and the fence (JOB-102). We are asking the landlord about both and will update you by 2026-08-28. Please tell us whether the oven is still not heating properly, so we can reopen it. For the roof leak, please keep water away from any electrics and tell us at once if water reaches sockets or lights. If you ever see sparks or smoke, call 999.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports a leaking conservatory roof (JOB-101, urgent) and a broken fence (JOB-102, routine). May we send our contractor to inspect both and quote? The oven job was closed in error and may need reopening.
> 
> Options: Yes, send your contractor to inspect and quote; I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the oven, fence or roof is fixed.
- No contractor is assigned and no cost is approved.
- The oven job is not yet reopened; that depends on the tenant's answer.

## Remaining work
- Landlord decision on the roof and fence jobs (agency).
- Reopen the oven job if the tenant says it is still faulty (agency).
- Assign a contractor once approved (agency).

## Missing or unavailable information
- Whether the oven works now.
- Any earlier roof leak report; none is on record.
- The landlord's decision on the new jobs.

## Conflicts between sources
- Event 016 says the fence and oven were fixed, but there is no provider visit, result or quote, and the tenant said the oven had not worked since move-in (event 006). I trusted the evidence-based record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed with no evidence of repair. The fence and conservatory roof were never logged; they are now JOB-102 and JOB-101. Landlord approval and the tenant's oven status are outstanding.

**2. What is the next action, who is it for, and through which channel?**

A correcting email went to the tenant, and an approval request went to the landlord. We chase on 2026-08-27.

**3. Does anything need a human decision, and why?**

No. The routine steps were done. A human is needed only if the landlord stays silent on the urgent roof leak after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) asks… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant (Imogen Clarke) as… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Ticket closed without payment on 26 Aug with no provider visit, result or quote on record. The te… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"The tenant reports a leaking conservatory roof (JOB-101, urgent) and a brok… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Chase landlord on roof leak and fence approval; check tenant's oven reply","party":… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
