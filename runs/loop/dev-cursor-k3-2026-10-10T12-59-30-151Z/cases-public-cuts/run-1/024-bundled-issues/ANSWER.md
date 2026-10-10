# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed in error and the tenant was wrongly told the oven and fence were fixed. I reopened the oven job, logged the roof leak (urgent) and fence (routine) as separate jobs, and told the tenant. I chased Lantern Works and asked the landlord for approval.

## Where the case stands
Oven ticket was wrongly closed without payment (events 016-030) with no provider response, visit, result or landlord confirmation; reopened to visit stage. Roof leak (JOB-101) and fence (JOB-102) newly logged. Waiting on landlord, Lantern Works and tenant; review 2026-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Apologise for erroneous 'fixed' message, explain reopened/new jobs, ask roof leak details with safety advice | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | CHASE_PROVIDER | Ask Lantern Works to confirm visit or findings on oven | Lantern Works, provider | email | A5 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor inspecting roof and fence | Landlord | email | A6 ✅ |
| 4 | WAIT | Follow up all three jobs on 2026-08-27 | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our message on 26 Aug saying the oven and fence were fixed was sent in error, and we have no confirmation of either. I've reopened the oven job and chased the contractor, and logged the fence and the leaking conservatory roof as separate jobs. For the roof, please tell us where it leaks, how much water comes in, and whether it is near any electrics or lights (if so, keep clear and switch that circuit off). A photo would help. If there's a sudden serious leak or sparking, call us straight away. We'll update you on all three by 2026-08-28.

**A5 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Hello, we have had no reply on the oven job at Flat 6, 56 Juniper Mews (tenant Imogen Clarke). Please confirm whether you have visited. If not, please give us a confirmed visit date. If you have, please send your findings and any quote.

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews, and a fence repair is also outstanding. May we send our contractor to inspect each? (The oven job was wrongly closed and is reopened; Lantern Works is chased.)
> 
> Options: Yes, send your contractor to inspect both (recommended); I will use my own contractor; Tenant to deal with it

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening does not confirm the oven fault or its cause
- Logging the roof and fence jobs does not approve any contractor or spend
- No visit has been booked

## Remaining work
- Landlord decision on roof/fence
- Lantern Works visit/quote for oven
- Tenant roof details
- Assign contractors once approved

## Missing or unavailable information
- Roof leak details and any earlier report
- Whether Lantern Works ever visited
- Oven manual and photo attachments unseen

## Conflicts between sources
- Event 016 said the fence and oven were fixed, but no provider evidence exists; I trusted the lack of evidence.
- The ticket shows completed without payment, but there is no result, and the landlord never confirmed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job was closed without evidence and is now reopened. The fence and conservatory roof leak were never logged and now are. All three are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email (sent). Chase Lantern Works by email. Ask the landlord for approval through the agency landlord record. Follow up on 2026-08-27.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decision is requested. If the roof leak proves serious, or the landlord is silent past the follow-up, escalate P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) aski… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `update_ticket` | {"ref":"NBL-024-bundled-issues","stage":"visit","note":"Reopened: closed without payment (events 016-030) with no provider reply, visit, res… | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews, and … | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Chase landlord decision, tenant roof details, Lantern Works oven visit; review all … | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
