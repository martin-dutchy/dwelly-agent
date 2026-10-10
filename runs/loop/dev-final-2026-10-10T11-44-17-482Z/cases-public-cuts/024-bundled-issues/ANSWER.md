# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven ticket was closed without evidence, and the tenant was told the fence and oven were fixed. The tenant now reports a leaking conservatory roof. I logged separate roof (urgent) and fence (routine) jobs, corrected the record with a note, and told the tenant. I asked the landlord to approve a roof inspection and set a follow-up for 27 Aug.

## Where the case stands
Oven ticket NBL-024 is closed without payment, but the history has no provider result and no tenant confirmation of the oven fix. The fence request (event 015) was never logged. The conservatory roof leak (event 032) is new. Both now have their own jobs. JOB-101 (roof) is waiting on the landlord and on tenant photos. JOB-102 (fence) is logged and needs checking with the tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether we may send our contractor to inspect the conservatory roof leak | Landlord | portal | A5 ✅ |
| 2 | REPLY_TO_TENANT | Correct the earlier 'all fixed' message, log the roof and fence jobs, ask for roof photos and safety details, and ask whether the oven still fails | Imogen Clarke, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up on the landlord decision and tenant photos on 2026-08-27 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry for the confusion, and apologies: our earlier message saying the fence and oven were fixed was sent in error and we can't yet confirm either. We've now logged separate jobs for the leaking conservatory roof (JOB-101, treated as urgent) and the fence (JOB-102). For the roof, please reply with a few photos, where the water is coming in, and whether it is near any electrics or sockets. If it is near electrics, please keep clear and switch off at the fuse board if safe. We still need the landlord's go-ahead before work is booked, and we'll update you by 2026-08-27. Please also tell us if the oven is still not heating properly, so we can reopen it.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May we send our contractor to inspect, or will you arrange your own?
> 
> Options: Yes, send our contractor to inspect (recommended); I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Logging the jobs does not approve any work or spend.
- Nothing here confirms the oven or fence is fixed.
- The roof leak cause and severity are not yet known.

## Remaining work
- Landlord decision on the roof job (JOB-101).
- Tenant photos and electrics-safety answer.
- Check the fence job (JOB-102) with the tenant and landlord.
- Reopen the oven job if the tenant says it is still faulty.
- Obtain provider evidence for the oven closure.

## Missing or unavailable information
- Provider result or invoice for the oven (the invoice is only said to be in the portal).
- Tenant confirmation of the oven fix.
- Roof leak details and photos.
- Whether a fence job ever existed.

## Conflicts between sources
- Event 016 says the fence and oven are fixed, but there is no provider result, no fence job and no tenant confirmation.
- The ticket is closed, but the tenant is still writing in.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is closed without payment but without verified evidence. The fence request was never logged. The conservatory roof leak is new and now logged as JOB-101. The landlord's approval for the roof is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request for the roof inspection, sent to the landlord. The tenant has been emailed to correct the earlier message and ask for photos and safety details.

**3. Does anything need a human decision, and why?**

Not yet. The routine steps are done. If the landlord stays silent past the follow-up, or the tenant reports water near electrics, escalate then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports (event 032) … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"fence","severity":"routine","description":"Tenant asked (event 015, … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Ticket closed without payment (event 030) but no provider result or tenant confirmation of oven f… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May … | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Chase landlord decision and tenant photos for conservatory roof leak; update tenant… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
