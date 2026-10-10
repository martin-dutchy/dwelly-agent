# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed without evidence and the tenant was wrongly told the oven and fence were fixed. I reopened the oven and logged the fence and the conservatory roof leak as separate jobs. I apologised to the tenant, asked the landlord for approval, chased Lantern Works and set a follow-up for 28 Aug.

## Where the case stands
Original oven ticket closed in error (no provider reply, visit, result or tenant confirmation). New linked jobs: JOB-101 roof (urgent), JOB-102 fence, JOB-103 oven. Waiting on tenant details, landlord approval, Lantern Works.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Apologise for the wrong 'fixed' message, explain the reopened jobs, ask roof leak details with a safety note | Imogen Clarke, tenant | email | A5 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve contractor for the roof leak and update on the oven and fence | Landlord | email | A6 ✅ |
| 3 | CHASE_PROVIDER | Ask Lantern Works whether they attended the oven job | Lantern Works, provider | email | A7 ✅ |
| 4 | WAIT | Review all three jobs on 28 Aug | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our email of 26 Aug saying the oven and fence were fixed was wrong. We have no confirmation of a repair for either, and we closed the oven job too early. I've reopened the oven and logged the fence as its own job. I've also logged your leaking conservatory roof as an urgent job, as we couldn't find an earlier record of it. Could you tell us where it leaks, how much water is coming in, and whether it is near any electrics or sockets? If water is near electrics, keep away and switch that circuit off if it's safe. The oven is with the landlord's approved contractor, and I'm chasing them. You'll hear from us again by 28 Aug. Please let us know if you still have the oven or fence problems.

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> Approve our contractor to inspect and repair the leaking conservatory roof (reported by tenant, urgent)
> 
> Options: Yes, send our contractor (recommended); Landlord arranges own contractor; Tenant not responsible; other instruction
> 
> Update: Oven: you approved a contractor on 5 Aug, but our provider Lantern Works never replied and the job was closed in error; it is reopened (JOB-103). Fence repair also reported by tenant (JOB-102); we'll send details for approval once we know the scope. Please reply by 29 Aug.

**A7 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Hello Lantern Works, we haven't heard back on the oven repair request at Flat 6, 56 Juniper Mews (sent 5 Aug). Please tell us whether you have attended. If you haven't, please confirm a visit date with the tenant, or say if you can't take it. Please reply by 28 Aug.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the oven, fence or roof is fixed.
- No contractor is assigned to the roof or fence; the landlord has not approved those jobs.
- The reopened oven job relies on the landlord's earlier approval of 5 Aug (event 010, 'Hi, yes please').

## Remaining work
- Tenant roof details (severity may rise)
- Landlord decision on roof and fence
- Lantern Works reply and oven visit
- Provider and invoice records show the 'invoice received' and 'keys returned' events with no supporting evidence; accounts should check

## Missing or unavailable information
- Whether any provider attended the oven
- Roof leak and fence details
- Whether the roof leak was reported earlier

## Conflicts between sources
- Event 016 says the oven and fence are fixed; no evidence supports it, and the tenant's earlier messages say otherwise. Treated as wrong.
- Events 017-030 show an invoice and keys return with no visit record; treated as unsupported.
- Event 032 mentions a conservatory roof leak, which is not in the history.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The ticket is closed but wrongly. No provider ever replied or visited. The oven is unresolved, the fence was never logged, and a roof leak is newly reported.

**2. What is the next action, who for, which channel?**

Email to the tenant (apology, roof details), email to the landlord (roof approval and update), email to Lantern Works (chase), all sent.

**3. Does anything need a human decision?**

No escalation now. The landlord decides on the roof and fence. A human may want to review the erroneous closure and the unsupported invoice and keys entries.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (event 032) asks for… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Oven reopened: origin… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Closed in error: no provider reply, visit, result or tenant confirmation on file; event 016 told … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Approve our contractor to inspect and repair the leaking conservatory roof … | 1 | ✅ verified | APR-106 found in the request_landlord_approval log |
| A7 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-107 found in the send_message log |
| A8 | `schedule_follow_up` | {"due_on":"2026-08-28","purpose":"Review oven (JOB-103), fence (JOB-102), roof (JOB-101): provider and landlord replies, tenant details","ti… | 1 | ✅ verified | FUP-108 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
