# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed and the tenant told the oven and fence were fixed, with no evidence. The tenant is now chasing a conservatory roof leak that was never logged. I logged the roof (urgent) and fence as new jobs, noted the record, corrected the tenant and asked the landlord for approval.

## Where the case stands
Original oven ticket closed without payment (event 030) with no provider result or tenant confirmation. Tenant's fence request and conservatory roof leak were never logged. New jobs JOB-101 (urgent roof) and JOB-102 (fence) at init. Waiting on landlord approval and tenant info; follow-up 2026-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the mistaken 'fixed' message, confirm new jobs, ask for roof photos, electrics safety and oven status | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor for roof leak inspection | Landlord | email | A5 ✅ |
| 3 | WAIT | Follow up on landlord approval and tenant reply on 2026-08-27 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier email saying the fence and oven were fixed was sent in error, and we had no confirmation of that. I've now logged your leaking conservatory roof as an urgent job (JOB-101) and the fence as its own job (JOB-102). I'm asking the landlord for approval and will update you by 2026-08-28. To help: please send photos of the roof leak, tell us whether water is near any lights, sockets or appliances (if so, keep clear and switch off at the fuse box if safe), and tell us whether the oven is still not heating properly. If it is, we'll reopen the oven repair. Thank you for your patience.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof. May we send our contractor to inspect and quote, or will you use your own? Separately, the fence repair (JOB-102) is also awaiting your instruction, and the oven job was closed in error with no confirmed fix; we are checking with the tenant.
> 
> Options: Yes, send our contractor to inspect and quote (recommended); I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the oven, fence or roof is fixed
- No contractor assigned; no approval yet for roof or fence
- The oven ticket remains closed until the tenant says it is still faulty

## Remaining work
- Landlord decision on roof (JOB-101) and fence (JOB-102)
- Tenant to confirm oven status; reopen with Lantern Works if faulty
- Chase Lantern Works, who never replied

## Missing or unavailable information
- Oven current status
- Roof leak details and photos
- Whether water is near electrics
- Any record of the oven or fence visit

## Conflicts between sources
- Event 016 and the closure say fixed; there is no provider result or tenant confirmation, and the tenant is still chasing other issues. I treated the oven as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed without evidence of a fix. The fence and roof leak were unlogged and are now JOB-102 and JOB-101. Landlord approval, tenant details and the oven status are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant, correcting the error and asking for photos and oven status. Email to the landlord asking for roof inspection approval. Follow-up set for 2026-08-27.

**3. Does anything need a human decision, and why?**

Not yet. This is routine and urgent handling that sits within policy. If the landlord stays silent past the chase, escalate P2 maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports a leaking co… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair requested by… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Ticket closed without payment (event 030) with no provider visit, result or tenant confirmation o… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","body":"Hi Imoge… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof. May we send our contractor to i… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Chase landlord on roof leak approval and tenant on oven status/photos (JOB-101, JOB-102)","ticket_ref":"JO… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
