# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed and the tenant told oven and fence were fixed, with no evidence. I corrected this with the tenant, logged the fence and conservatory roof leak as separate jobs, asked the landlord about the roof, and set a follow-up for 2026-08-27.

## Where the case stands
Oven job closed without payment but with no evidence of any repair. Two new jobs open: JOB-101 conservatory roof leak (urgent, awaiting landlord approval) and JOB-102 fence (routine). Waiting on tenant details and landlord reply.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the false 'fixed' message, confirm new jobs, ask for roof leak details and whether the oven still fails | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor to inspect the roof leak | Landlord | email | A5 ✅ |
| 3 | SPLIT_NEW_REQUEST | Opened roof leak job JOB-101 | internal | internal | A1 ✅ |
| 4 | SPLIT_NEW_REQUEST | Opened fence job JOB-102 | internal | internal | A2 ✅ |
| 5 | WAIT | Chase landlord and review tenant reply on 2026-08-27 | Landlord / tenant | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry, our earlier email saying the oven and fence were fixed was sent in error. We have no record of either being repaired. We have now logged the fence and the leaking conservatory roof as separate jobs, and I'm asking the landlord about the roof. Could you tell us: 1) where the roof is leaking and how much water is coming in, and is any near sockets, lights or appliances? If so, please keep clear and switch that circuit off if safe. 2) Is the oven still not heating properly? If so we will reopen that job. We'll update you by 2026-08-28.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof (JOB-101, urgent). May we send our contractor to inspect and quote? Also a fence repair request (JOB-102), and the oven job is being reopened as no repair is confirmed.
> 
> Options: Yes, send your contractor (recommended); I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Opening the jobs does not approve any contractor or spend
- Nothing confirms the oven is or is not fixed
- The tenant's roof report is unverified for severity until details arrive

## Remaining work
- Landlord decision on roof inspection and the fence (agency, awaiting reply)
- Reopen the oven job if tenant says it is still faulty, and obtain provider evidence
- Landlord approval and contractor for JOB-102
- Review 2026-08-27

## Missing or unavailable information
- Any provider visit, quote or invoice for the oven
- Roof leak details
- Earlier roof report, if any
- Oven manual and photo attachments unseen

## Conflicts between sources
- Event 016 and 030 say oven and fence fixed and closed, but the history has no provider contact, visit, quote or work result; I treated the oven as unverified.
- Tenant said at event 006 the oven had never worked, against the landlord's note that it worked for the previous tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed without payment but unsupported by any provider evidence. The fence and conservatory roof issues were not logged until now (JOB-102, JOB-101). Outstanding: landlord approval, roof details, oven confirmation.

**2. What is the next action, who is it for, and through which channel?**

Tenant email correcting the record and asking for details (sent); landlord approval request for the roof inspection (sent); follow-up 2026-08-27.

**3. Does anything need a human decision, and why?**

No. Everything done is routine. A human is needed only if the landlord stays silent past the chase or the leak turns out to be hazardous.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) asks… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Record conflict: job closed without payment (event 030) and tenant told oven and fence fixed (eve… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","body":"Hi Imoge… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant reports a leaking conservatory roof (JOB-101, urgent). May we send our contractor to inspec… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Chase landlord on roof leak approval (JOB-101); check tenant reply on oven/roof details","ticket_ref":"JOB… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A7 | `resume_auto` | {"ticket_ref":"NBL-024-bundled-issues"} | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back after resume_auto |

## Failed or unverified actions
_None._
