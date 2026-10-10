# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed on 2026-08-26 and the tenant was told it was fixed, with no evidence of any repair. I reopened it, told the tenant it was not confirmed fixed, asked Lantern Works (approved by the landlord on 2026-08-05) to book a visit, and informed the landlord. The tenant's new conservatory roof leak is logged as urgent job JOB-101, and the landlord has been told.

## Where the case stands
The oven ticket NBL-024-bundled-issues was wrongly closed on 2026-08-26 (events 016-030). Nothing in the record shows a visit, quote, work result or completion. The landlord approved a contractor on 2026-08-05 ("Hi, yes please."). The ticket is now reopened at mp_time, waiting for Lantern Works to book a visit. A new urgent job, JOB-101, covers the tenant's conservatory roof leak (event 032) and is at init, waiting for a contractor and landlord decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the earlier 'fixed' message was wrong, the oven is reopened and Lantern Works will contact her, and the roof leak is logged as urgent. | Imogen Clarke, tenant | email | A3 ✅ |
| 2 | CHASE_PROVIDER | Ask Lantern Works to book the oven visit with the tenant, report back, and confirm the invoice issuer (Keystone Solutions vs Lantern Works). | Lantern Works, contractor | email | A4 ✅ |
| 3 | CHASE_LANDLORD | Tell the landlord the oven job was reopened, and that the conservatory roof leak is a new urgent job. | Oliver, landlord | email | A5 ✅ |
| 4 | WAIT | Check the oven visit and invoice issuer on 2026-08-27; phone Lantern Works if no reply. | Lantern Works, contractor | internal | A6 ✅ |
| 5 | WAIT | Check roof leak contractor assignment and landlord approval on 2026-08-27. | Oliver, landlord | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen,
> 
> Thank you for your message, and I'm sorry for the confusion. Our earlier email said the oven and fence were fixed. That was not correct. We have no confirmation that the oven has been repaired, so we have reopened the oven repair and are arranging for our appliance contractor, Lantern Works, to look at it again. They will contact you directly to arrange a visit.
> 
> Your conservatory roof leak is a separate job. We have logged it as urgent, and our team will be in touch about next steps. If water is coming near any electrical sockets or lights, please turn off the power at the consumer unit and keep clear of the area.
> 
> Best wishes,
> Northbridge Lettings

**A4 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Dear Lantern Works,
> 
> The oven repair at Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ (tenant Imogen Clarke, 07700 900512) was closed in our system in error. The job is reopened and the landlord has approved you attending.
> 
> Please contact the tenant to book a visit, and reply to us with the visit date, a short report of what you find and any quote. Please also confirm which company issued the invoice referenced in our system (it shows Keystone Solutions), as we have no invoice from you on file.
> 
> Thank you,
> Northbridge Lettings

**A5 · send_message → Oliver (landlord) via email, existing thread (event 010 email)** (verified)

> Hello, a correction on Flat 6, 56 Juniper Mews. The oven job was marked complete and the tenant was told it was fixed, but there is no evidence of a repair. We have reopened it and Lantern Works will contact the tenant to book a visit. We will confirm the outcome before anything is charged. Separately, the tenant reports a leaking conservatory roof. We have logged it as a new urgent job and will update you once we have a contractor's assessment.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The oven has not been confirmed fixed. Nobody has seen the work, so the earlier 'fixed' message is withdrawn.
- The invoice reference (Keystone Solutions) is unverified. No payment is approved or made.
- The roof leak cause, scope and cost are unknown. No contractor has been assigned.
- The fence issue mentioned at event 015 is not addressed here; no record of its status was found.

## Remaining work
- Lantern Works to book and attend the oven visit, then record the result (agency ops; FUP-105, 2026-08-27).
- Resolve the invoice issuer conflict (Keystone Solutions vs Lantern Works) before any invoice is paid (agency ops/accounts).
- Assign a contractor for the conservatory roof leak and get landlord approval for the spend (agency ops; FUP-106, 2026-08-27).
- Check the fence repair status (event 015) against the record (agency ops).

## Missing or unavailable information
- Whether the oven was ever repaired or visited (no work result, quote or provider email on file).
- Which company issued the invoice (system says Keystone Solutions; the job's contractor is Lantern Works).
- Conservatory roof leak details: when first reported, severity, photos.
- Fence repair status.

## Conflicts between sources
- Event 016 says the oven was fixed, but no visit, quote, work result or provider email exists. I trust the absence of evidence and treat the oven as unfixed.
- Events 015 and 016 mention a fence, while the job is about the oven. The fence is not on this job.
- Event 029 names Keystone Solutions as the invoice portal and issuer; the job's contractor is Lantern Works. Unresolved.
- Event 032 calls the roof leak a 'previously reported issue', but there is no earlier record of it in this case.

## Answers to the case questions
**1. Where does the case stand and what is outstanding?**

The oven job was wrongly closed and is now reopened, waiting for Lantern Works to book a visit. The roof leak is a new urgent job (JOB-101) waiting for contractor assignment and landlord approval. The fence status and invoice issuer are unresolved.

**2. What is the next action, recipient and channel?**

Email the tenant (A3) with the correction, email Lantern Works (A4) to book the visit and confirm the invoice issuer, and email the landlord (A5) about the reopen and the roof leak. Follow-ups are set for 2026-08-27 (A6, A7).

**3. Does anything need a human decision?**

Not yet. The routine work is in hand. A human should review if Lantern Works does not reply or the invoice issuer conflict is not resolved. The roof spend needs landlord approval first.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-024-bundled-issues","stage":"mp_time","note":"Reopened: job was closed on 2026-08-26 (events 019-030) and tenant told oven fixed… | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back at stage mp_time |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports a leaking co… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-024… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-024-bundled-issues","due_on":"2026-08-27","party":"Lantern Works","purpose":"Check Lantern Works has contacted the tenant… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","party":"Oliver (landlord)","purpose":"Conservatory roof leak: confirm contractor assigned and… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A8 | `resume_auto` | {"ticket_ref":"NBL-024-bundled-issues"} | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back after resume_auto |

## Failed or unverified actions
_None._
