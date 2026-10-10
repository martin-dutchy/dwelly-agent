# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed in error and the tenant was told the fence and oven were fixed with no evidence. The tenant is now asking about a leaking conservatory roof. I opened separate jobs for the roof, fence and oven, corrected the record, told the tenant, and asked the landlord for approval.

## Where the case stands
Original oven ticket is closed but wrongly: no evidence of a visit, result or tenant confirmation. Three new jobs opened (JOB-101 roof, JOB-102 fence, JOB-103 oven), all at intake. The tenant has been corrected. Landlord approval for roof/fence is requested and pending; follow-up is set for 2026-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Corrected the false 'fixed' message, confirmed the three jobs, gave safety advice and the next-update date | Imogen Clarke, tenant | email | A5 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked the landlord to approve our contractor for the roof leak and fence, and told them the oven job is being reopened | Landlord | email | A6 ✅ |
| 3 | WAIT | Wait for landlord reply; chase on 2026-08-27 | Landlord | internal | A7 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier email saying the fence and oven were fixed was sent in error, and we have no record of any repair. I've opened separate jobs for the oven, the fence and the leaking conservatory roof. The roof is being treated as urgent, and we aim to have it looked at within 72 hours, subject to landlord approval, which we're asking for now. Please keep water away from any electrics or sockets, and tell us at once if you see sparks or water near them. Could you also let us know whether the oven is still not heating properly? You'll hear from us again by 2026-08-28.

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports a leaking conservatory roof, and a fence repair is also outstanding. May we send our contractor to inspect and quote for the roof (urgent) and the fence? We also need to correct the oven job, which was closed by mistake, and reopen it with Lantern Works as already approved.
> 
> Options: Yes, send your contractor (recommended); I will arrange my own contractor; Other instruction

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The new jobs do not confirm any cause, cost or contractor visit.
- No contractor has been assigned to the roof or fence yet.
- The oven fault is not confirmed fixed or unfixed; the tenant was asked.

## Remaining work
- Landlord approval for roof (JOB-101) and fence (JOB-102); then assign a contractor.
- Oven (JOB-103): assign Lantern Works under the landlord's earlier approval (event 010) once the tenant confirms the fault persists.
- Check whether Lantern Works ever attended the oven; no provider reply is on record.

## Missing or unavailable information
- Whether the oven works now.
- Whether the invoice mentioned in events 017 and 029 relates to this property.
- Roof leak details and whether any water is near electrics.

## Conflicts between sources
- Event 016 and the closure say the oven and fence were fixed, but the history shows no provider contact, visit or tenant confirmation. I trusted the history.
- Invoice notes name 'Keystone Solutions', while the assigned provider was Lantern Works.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The ticket is closed wrongly. The oven is unverified, the fence was never logged, and the roof leak is a new urgent issue. All three now have their own jobs awaiting landlord approval or assignment.

**2. What is the next action, who is it for, and through which channel?**

Tenant email correcting the record (sent). Landlord approval request for roof and fence (sent). Chase on 2026-08-27.

**3. Does anything need a human decision, and why?**

Not now. The roof is urgent and needs landlord approval, which is requested. If the landlord stays silent past 2026-08-27 and a second-channel chase, escalate P2. The invoice link to Keystone Solutions may need an accounts check.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports leaking cons… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant asked for an updat… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Oven not heating prop… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Closed in error: event 016 told tenant fence and oven fixed, but history shows no provider contac… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","body":"Hi Imoge… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"The tenant reports a leaking conservatory roof, and a fence repair is also … | 1 | ✅ verified | APR-106 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Chase landlord approval for roof leak inspection; update tenant","party":"Landlord"… | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
