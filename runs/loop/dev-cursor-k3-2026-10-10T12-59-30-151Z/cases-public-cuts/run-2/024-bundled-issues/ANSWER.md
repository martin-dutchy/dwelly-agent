# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was wrongly closed and the tenant wrongly told it was fixed. I reopened it, chased the provider, logged separate roof (urgent) and fence (routine) jobs, asked the landlord for approval on both, and corrected the record with the tenant.

## Where the case stands
Original oven ticket had been closed without payment with no visit, result or provider reply, and the tenant was wrongly told oven and fence were fixed. It is now reopened at mp_time. Tenant has raised a conservatory roof leak and an unlogged fence repair. Both are now new jobs awaiting landlord approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Apologise for the wrong 'fixed' message, explain the reopened oven job and new fence and roof jobs, give electrical safety advice and ask for leak details; next update by 2026-08-28 | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or use their own for the urgent conservatory roof leak | Landlord | email | A5 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Ask landlord about the fence repair | Landlord | email | A6 ✅ |
| 4 | CHASE_PROVIDER | Chase Lantern Works to book the oven visit | Lantern Works, provider | email | A7 ✅ |
| 5 | WAIT | Follow up on landlord reply and provider on 2026-08-27 | Landlord | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier email saying the oven and fence were fixed was wrong, and we had no confirmation of that. I've reopened the oven job and chased the contractor. I've also opened separate jobs for the fence and the leaking conservatory roof. The roof is marked urgent and we're asking the landlord for approval now. If water is getting near any electrics or lights, please keep clear and switch that circuit off if it's safe to do so. Could you tell us roughly where it leaks and send a photo if you can? We'll update you by 2026-08-28.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof. May we send our contractor to inspect and quote, or will you arrange your own?
> 
> Options: Yes, send our contractor to inspect and quote; I'll arrange my own contractor

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant has asked about a fence repair. May we send our contractor to inspect and quote, or will you arrange your own?
> 
> Options: Yes, send our contractor to inspect and quote; I'll arrange my own contractor

**A7 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Hello, we haven't heard from you on the oven repair at Flat 6, 56 Juniper Mews (sent 5 Aug). The job is open and the tenant says the oven still doesn't work. Please contact the tenant to book a visit and confirm the date to us, or send a quote if one is needed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening does not confirm the oven fault, its cause or who pays
- New jobs are not approved and no contractor is assigned for roof or fence
- Nothing here confirms any visit date

## Remaining work
- Landlord decisions on roof and fence (agency)
- Lantern Works to book oven visit and confirm date
- Check whether the earlier roof report exists
- Review who closed the oven job without evidence

## Missing or unavailable information
- Evidence of any oven or fence work
- Earlier roof leak report
- Photos and location of the leak
- Oven manual and photo attachments unavailable

## Conflicts between sources
- Event 016 said oven and fence were fixed, but the history shows no visit, result or provider reply. The tenant's own messages say otherwise, so I trusted the tenant.
- Event 030 says completed without payment, but there is no evidence of work.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is reopened because it was closed without any visit or evidence. The roof leak (JOB-101) and fence (JOB-102) are new jobs awaiting landlord approval. The provider has not replied since 5 Aug.

**2. What is the next action, who is it for, and through which channel?**

Tenant correction by email, landlord approval requests by email, and a provider chase by email. All are sent. Follow-up is set for 2026-08-27.

**3. Does anything need a human decision, and why?**

Not at this point. The routine steps are done. A human could review how the job was closed without evidence. If the landlord stays silent on the urgent roof leak past the chase, escalate P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) asks… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `update_ticket` | {"ref":"NBL-024-bundled-issues","stage":"mp_time","note":"Reopened: closed without evidence. No visit, result or provider reply on file; eve… | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back at stage mp_time |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof. May we send our contractor to i… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-102","decision_needed":"Tenant has asked about a fence repair. May we send our contractor to inspec… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-106 found in the send_message log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Chase landlord on roof leak approval; update tenant; oven provider reply due","part… | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
