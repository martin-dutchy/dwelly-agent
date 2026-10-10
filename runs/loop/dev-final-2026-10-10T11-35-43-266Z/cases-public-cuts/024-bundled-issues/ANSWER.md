# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed and the tenant told fence and oven were fixed, with no supporting evidence. The tenant has now asked about a leaking conservatory roof, and earlier about a fence. I logged both as separate jobs, noted the record error, corrected the message to the tenant, and asked the landlord for approval.

## Where the case stands
Oven ticket NBL-024 is closed "without payment", but nothing in the history shows the oven was fixed. Two new jobs are open: JOB-101 (roof leak, urgent) and JOB-102 (fence, routine). Both await landlord approval and tenant details.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the false 'fixed' message, confirm the new jobs, ask for photos and oven status, and give safety advice | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether we send our contractor for the roof leak and fence, or they arrange their own | Landlord | email | A5 ✅ |
| 3 | WAIT | Review on 2026-08-27, chase the landlord, check tenant photos and oven status | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry for the confusion. Our earlier email (16 August update) said the fence and oven were fixed and the job closed. We can't find evidence of that, so please ignore it. We've now logged the conservatory roof leak (JOB-101) and the fence (JOB-102) as separate jobs and are asking the landlord to approve next steps. Could you send a few photos of the roof leak and the fence, say where the water comes in, and whether it's near any electrics? If water is near lights or sockets, please keep clear and switch that circuit off. Also, is the oven still not heating properly? If so, we'll reopen it. I can't give dates until the landlord replies, but I'll update you as soon as I can.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May we send our contractor to inspect and quote, or will you arrange your own? Also the fence repair (JOB-102) is reported by the tenant: same question.
> 
> Options: Yes, send your contractor to inspect and quote; I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor has been assigned for the roof or fence and no visit has been booked.
- The oven is not confirmed fixed or confirmed broken.
- Landlord approval for the new jobs has been requested, not received.
- The closed oven job has not been reopened.

## Remaining work
- Landlord decision on JOB-101 and JOB-102 (agency chases on 2026-08-27)
- Tenant to confirm oven status and send photos; reopen the oven job if it is still faulty
- Assign a contractor and book visits once approved
- Check why the oven job was closed without a provider result or invoice

## Missing or unavailable information
- Evidence of any oven repair, visit or invoice
- Details of the roof leak and the fence fault
- Whether the roof leak was reported earlier elsewhere

## Conflicts between sources
- Event 016 says the fence and oven are fixed, but there is no provider result, visit or invoice, and the tenant is still asking about the fence and roof. I treated the claim as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is closed but unverified. The roof leak (JOB-101) and fence (JOB-102) are new and awaiting landlord approval and tenant details.

**2. What is the next action, who is it for, and through which channel?**

The tenant has been emailed a correction and a request for photos and oven status. The landlord has been asked for approval. A follow-up is set for 2026-08-27.

**3. Does anything need a human decision, and why?**

Not yet. The only decision outstanding is the landlord's. A human could review why the oven job was closed without evidence, but that is a process check rather than a decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) repo… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant (Imogen Clarke) as… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Record error: event 016 told tenant fence and oven were fixed and job closed, but there is no pro… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May … | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Chase landlord approval for roof leak JOB-101 and fence JOB-102; check tenant photos and oven status","tic… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
