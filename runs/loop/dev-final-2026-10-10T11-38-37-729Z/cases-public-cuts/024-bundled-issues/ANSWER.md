# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed and the tenant told 'fence and oven fixed' with no visit or result on record. The tenant now asks about a leaking conservatory roof. I logged roof (urgent), fence and oven reopen as separate linked jobs, apologised and corrected the record with the tenant, asked the landlord for approval and set a follow-up for 27 Aug.

## Where the case stands
Original oven ticket is closed without payment, but with no provider visit or result on record. Three new linked jobs are open at intake (JOB-101 roof leak, JOB-102 fence, JOB-103 oven reopened). The landlord has been asked to approve; the tenant has been told.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the wrongly sent 'fixed' email, confirm three separate jobs, ask for roof leak and oven details with electrical safety advice | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to approve our contractor or name their own for the roof leak and fence | Landlord | email | A5 ✅ |
| 3 | WAIT | Review 2026-08-27: chase the landlord on a second channel and Lantern Works on the oven | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier email saying the fence and oven were fixed was sent in error. We have no record of a visit, so we've reopened the oven job (JOB-103) and logged your fence repair (JOB-102) and the leaking conservatory roof (JOB-101) as separate jobs. The landlord's approval is needed for these, and we'll update you as soon as we have it. Please tell us whether the oven is still not working, where the roof is leaking, and whether water is near any lights or sockets. If it is, please keep away from them and switch off at the fuse box if safe. Roof leak is being treated as urgent.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May we send our contractor to inspect, or will you arrange your own? Also needed for a fence repair (JOB-102) and the oven (JOB-103, we have your earlier yes).
> 
> Options: Yes, send your contractor to inspect the roof and fence; I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Creating the jobs does not approve spend or assign any contractor.
- Nothing confirms the oven is fixed or broken now.
- Roof cause and cost are unknown.

## Remaining work
- Landlord approval for roof leak, fence and oven contractor (agency)
- Lantern Works has never replied; chase or swap (agency)
- Tenant to supply roof leak and oven details

## Missing or unavailable information
- Any evidence of an oven visit or fix
- Earlier fence and roof reports
- Contents of the oven manual and photo attachments (unseen)

## Conflicts between sources
- Event 016 said the fence and oven were fixed, but there is no provider contact or visit, and the tenant had said the oven never worked. I trusted the lack of evidence.
- Event 015 and event 032 reference fence and roof issues that were never logged.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed without evidence of any work. The fence and roof leak were never logged. All three are now open jobs awaiting landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email for the roof and fence (A5), plus the tenant correction email (A4). Chase on 27 Aug.

**3. Does anything need a human decision, and why?**

Not at present. If the landlord stays silent on the urgent roof leak after a chase on a second channel, escalate P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports a leaking co… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Reopened oven fault: … | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May … | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Chase landlord approval for roof leak (urgent), fence; chase Lantern Works on oven JOB-103","ticket_ref":"… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
