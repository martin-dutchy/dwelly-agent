# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed, and the tenant told fence and oven were fixed, with no evidence. The tenant is now chasing a leaking conservatory roof that was never logged. I opened separate roof (urgent) and fence jobs, corrected the record, asked the tenant to confirm the oven, roof and fence, and asked the landlord about the roof.

## Where the case stands
Oven ticket closed without payment, but no provider visit, result or invoice is visible and the tenant never confirmed the fix. Conservatory roof leak (JOB-101) and fence (JOB-102) are new jobs at intake. Waiting on the landlord (roof) and the tenant (oven, roof details, fence).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Apologise for the premature 'fixed' email, confirm the roof and fence jobs are logged, ask about the oven, roof details and safety, and give the next update date of 28 Aug | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether we send our contractor or they use their own for the roof leak | Landlord | email | A5 ✅ |
| 3 | WAIT | Review landlord and tenant replies on 27 Aug | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry for the confusion. Our earlier email saying the oven and fence were fixed was sent without proper checking, and we apologise. We've now logged your conservatory roof leak (JOB-101) and the fence (JOB-102) as separate jobs, and are asking the landlord about the roof. Please tell us: 1) is the oven now working properly? 2) where the conservatory roof leaks, how bad it is, and whether water is near any electrics or sockets (if so, keep away and switch off at the fuse box if safe), with photos if you can; 3) whether the fence has been repaired. We'll update you by 28 August.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof (chasing an earlier report). May we send our roof contractor to inspect, or will you arrange your own? Please reply by 28 August. Also FYI: the fence repair is logged as JOB-102, and the oven job was closed prematurely and is being rechecked with the tenant.
> 
> Options: Yes, send your contractor to inspect and quote; I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the oven, fence or roof is fixed or who is liable.
- No contractor has been assigned to the roof; no visit is booked.
- Landlord approval for the roof is still pending.

## Remaining work
- Confirm the oven status with the tenant and reopen it if still faulty (owner: agency)
- Roof leak: landlord decision, contractor, visit (JOB-101)
- Fence: check status, find out whether it was ever done (JOB-102)

## Missing or unavailable information
- Evidence of any oven or fence work
- Roof leak details and any safety risk
- Landlord reply

## Conflicts between sources
- Event 016 said the oven and fence were fixed; the history has no provider result, and the tenant's earlier messages say it was still faulty. I treated it as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is closed without payment but is unevidenced and unconfirmed by the tenant. The fence and conservatory roof leak had never been logged. They are now JOB-102 and JOB-101. Outstanding: the oven check, the roof leak decision, and the fence status.

**2. What is the next action, who is it for, and through which channel?**

A tenant email (MSG-104) asking for confirmation on the oven, roof and fence, and an email to the landlord asking for approval on the roof inspection (APR-105). Review on 27 Aug.

**3. Does anything need a human decision, and why?**

No. The remaining steps are routine: landlord approval, tenant answers and follow-up. Escalate P2 if the roof is found to be a safety risk or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) chas… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Ticket closed without payment (event 030) but no provider result, visit or invoice is visible in … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof (chasing an earlier report). May… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","party":"Landlord and tenant","purpose":"Check landlord reply on roof leak and tenant answers … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A7 | `resume_auto` | {"ticket_ref":"NBL-024-bundled-issues"} | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back after resume_auto |

## Failed or unverified actions
_None._
