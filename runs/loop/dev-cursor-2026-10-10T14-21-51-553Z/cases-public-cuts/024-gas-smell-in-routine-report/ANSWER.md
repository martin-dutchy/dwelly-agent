# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's 'not urgent' mention of a gassy smell near the oven turns a routine oven repair into an emergency. I sent safety advice, opened emergency job JOB-102 and assigned a Gas Safe engineer. I escalated P1, told the landlord, and returned the original ticket to auto mode.

## Where the case stands
Oven ticket at init, no provider. Tenant's reply reports a gassy smell, so emergency job JOB-102 is open with a Gas Safe engineer assigned for 5 Aug 08:00-18:00 (no firm named). Waiting on the tenant's safety confirmation and on the engineer. The original oven repair needs landlord approval later.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Send gas safety message: leave, no switches/flames, call 0800 111 999, CO symptoms question, confirm everyone is out | Imogen, tenant | email | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign Gas Safe engineer emergency make-safe on JOB-102 | Gas Safe engineer (no firm named) | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 gas escalation: confirm engineer attendance and phone the tenant | internal maintenance | internal | A4 ✅ |
| 4 | OTHER | Tell the landlord about the gas smell and make-safe | Landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for telling us. A gassy smell needs treating as an emergency, so please do this now: do not use the oven or hob, any switches or flames. Open doors and windows, and leave the flat with everyone in it. Call the National Gas Emergency line on 0800 111 999 (999 if anyone feels unwell). Is a carbon monoxide alarm sounding, and does anyone have a headache, dizziness, nausea or drowsiness? Please reply to confirm everyone is out. We are sending a Gas Safe engineer to make the appliance safe; our target is within 24 hours, and we will confirm the time once set. Please don't use the oven until it has been checked.

**A5 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> The tenant of Flat 6, 56 Juniper Mews reports the oven is not heating properly (the settings in the manual did not help) and now mentions an intermittent gassy smell near it. We are treating the smell as an emergency: the tenant has been told to leave, avoid switches and flames, and call 0800 111 999, and we have instructed a Gas Safe engineer to make safe without waiting for approval. We will update you once the engineer has attended. Any oven repair beyond that will come to you for approval first.

## Escalation
- **P1 → maintenance** (verified): Gas smell reported near oven in a routine oven-repair job
  - Known: Tenant Imogen emailed 5 Aug (event 006): oven not cooking since move-in, and 'a bit of a gassy smell near it sometimes'. Emergency job JOB-102 opened; safety message MSG-101 sent to tenant (leave, 0800 111 999, CO symptoms question). Gas Safe engineer assigned same-day window with no named firm. Landlord is being told. Original ticket NBL-024 is the oven fault.
  - Missing: Tenant reply on whether everyone is out/unwell; the engineer firm and confirmed time; landlord contact not visible in case.
  - Options: Confirm a named Gas Safe firm and time today; Phone tenant to check they are safe
  - Recommendation: Confirm the engineer attends today and phone the tenant, as no reply is expected during this run.
  - Deadline: Same day

## What this does not establish
- The assignment does not confirm an engineer firm or an actual arrival time.
- Nothing here confirms the cause of the smell or the oven fault.
- The oven repair itself is not approved; the landlord has not decided.

## Remaining work
- Human: confirm the engineer and phone the tenant (ESC-103)
- Tenant to confirm everyone is out and safe
- Landlord approval for any oven repair after the make-safe visit
- Oven fault itself on NBL-024 still to be resolved

## Missing or unavailable information
- Tenant's safety confirmation and CO symptoms
- Named Gas Safe firm and confirmed time
- Landlord's contact details and spend limit are not shown in the case

## Conflicts between sources
- Tenant calls the smell 'not urgent', but any gas smell is treated as an emergency.
- The landlord's manual was not seen (attachment unavailable).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is at intake with no provider. The tenant says the manual settings did not help and reports a gassy smell. An emergency gas job is now open. Outstanding: the tenant's safety confirmation, the engineer's attendance, and the landlord's decision on the oven repair.

**2. What is the next action, who is it for, and through which channel?**

The gas safety message went to Imogen (tenant) by email. A Gas Safe engineer was assigned to JOB-102, the landlord was emailed, and a P1 escalation was raised.

**3. Does anything need a human decision, and why?**

Yes, a P1 for the gas smell. A human should confirm the engineer attends today and phone the tenant, because nobody can reply during this run. The oven repair is routine and needs landlord approval later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports intermitte… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell reported near oven in a routine oven-repair job","known":"Tenant Imogen emailed 5 … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-102","body":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Gas smell reported 5 Aug; emergency job JOB-102 opened. Oven fault to be handled with i… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A7 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
