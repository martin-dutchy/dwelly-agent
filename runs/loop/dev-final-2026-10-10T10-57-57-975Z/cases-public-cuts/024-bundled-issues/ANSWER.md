# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** urgent

The oven job was closed and the tenant was told the fence and oven were fixed, but no evidence supports either. The tenant's fence query was ignored and she now asks about a leaking conservatory roof. I logged the roof (urgent) and fence (routine) as new jobs, corrected the record with the tenant and escalated the closure for review.

## Where the case stands
Oven ticket NBL-024 is closed (completed without payment) with no contractor result or tenant confirmation on file. The fence request was never logged. The roof leak is new. JOB-101 (roof, urgent) and JOB-102 (fence, routine) are at init. We are waiting on the tenant's reply for details and photos.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Corrected the false 'fixed' message, confirmed the roof and fence are logged with timescales, and asked for roof details, photos, electrics risk and oven status | Imogen Clarke, tenant | email | A3 ✅ |
| 2 | SPLIT_NEW_REQUEST | Logged the conservatory roof leak as urgent JOB-101 | internal | internal | A1 ✅ |
| 3 | SPLIT_NEW_REQUEST | Logged the fence repair as routine JOB-102 | internal | internal | A2 ✅ |
| 4 | ESCALATE_TO_HUMAN | Escalated the unsupported oven closure, the invoice/contractor mismatch and the approvals needed for the new jobs | maintenance team | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry for the confusion and for the delay. Our earlier email saying the fence and oven were both fixed was sent in error, and we have no confirmation that either is done. We have now logged the leaking conservatory roof (urgent, so we aim to have it looked at within 72 hours) and the fence repair (routine, aimed within 14 days). Could you please reply with: 1) where the roof is leaking and how much water is coming in, 2) a few photos, 3) whether water is near any lights or sockets (if so, please keep away and switch that circuit off if safe), and 4) whether the oven is working properly now. If it is still not heating properly, tell us and we will reopen it. If there is any immediate danger, call 999. Thank you.

## Escalation
- **P3 → maintenance** (verified): Oven job closed without evidence of fix; tenant told fence and oven fixed in error; fence and roof requests unlogged
  - Known: Ticket NBL-024 completed without payment (events 016-030). No contractor result, visit or tenant confirmation on file for the oven; Lantern Works assigned, invoice reference points to Keystone Solutions (possible contractor mismatch). Tenant asked about fence (event 015, ignored) and now a leaking conservatory roof (event 032). Created JOB-101 (roof, urgent) and JOB-102 (fence, routine); tenant emailed with corrected status and request for details.
  - Missing: Whether oven was actually repaired; who did the work/invoice; landlord approval for roof and fence; whether the roof leak has an earlier report.
  - Options: Reopen oven job if tenant says not fixed; Keep closed if tenant confirms; Review invoice/contractor mismatch
  - Recommendation: Verify oven status with tenant, check the invoice against Lantern Works, and arrange landlord approval and contractors for JOB-101 and JOB-102.

## What this does not establish
- Creating the tickets does not approve any spend or assign a contractor
- Nothing here confirms the oven is fixed
- The tenant message does not promise appointments

## Remaining work
- Tenant to reply with roof details, photos and oven status (agency to chase)
- Landlord approval and contractor for JOB-101 and JOB-102
- Human to review the oven closure and invoice/contractor mismatch (ESC-104)

## Missing or unavailable information
- Whether the oven was actually repaired
- Roof leak details, photos and any earlier report
- Fence repair details
- Landlord details and spend limit (not in property record)

## Conflicts between sources
- Event 016 says the oven and fence are fixed, but no visit, result or tenant confirmation exists and the tenant never reported the oven fixed
- Invoice note references Keystone Solutions while Lantern Works was assigned
- Event 015 asked about the fence while the ticket covers only the oven

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed without payment but is unverified. The fence and roof issues were not tracked and are now JOB-102 and JOB-101. Landlord approval, contractors and tenant details are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to tenant Imogen Clarke (sent) correcting the earlier message and requesting roof details, photos and oven status. Then landlord approval and a contractor for the roof.

**3. Does anything need a human decision, and why?**

Yes, a P3 escalation (ESC-104): the oven closure lacks evidence, the invoice points to a different provider than the assigned one, and the incorrect 'fixed' message went to the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) asks… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant asked on 2026-08-0… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Oven job closed without evidence of fix; tenant told fence and oven fixed in error; fence an… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
