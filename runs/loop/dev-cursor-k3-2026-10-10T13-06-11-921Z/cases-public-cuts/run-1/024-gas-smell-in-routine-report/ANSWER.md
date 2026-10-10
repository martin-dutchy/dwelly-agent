# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant's reply said the oven still fails and mentioned an occasional gas smell. I treated the smell as an emergency: opened JOB-101, advised the tenant, assigned a Gas Safe engineer, informed the landlord and escalated P1. The oven repair waits on the landlord.

## Where the case stands
Oven job at intake awaiting landlord decision (on hold to 2026-08-07). Emergency gas job JOB-101 opened and Gas Safe engineer assigned for 2026-08-05 08:00-18:00; escalated P1.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice, 0800 111 999, emergency engineer target within 24h | Imogen, tenant | email | A2 ✅ |
| 2 | ASSIGN_PROVIDER | Assign Gas Safe emergency engineer to JOB-101 (no firm named yet) | Gas Safe engineer | internal | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 handover for gas smell: confirm named firm and tenant safety | internal maintenance | internal | A5 ✅ |
| 4 | REQUEST_LANDLORD_APPROVAL | Inform landlord of gas report and ask whether our contractor may repair the oven | Landlord | email | A3 ✅ |
| 5 | WAIT | Hold oven job pending landlord, review 2026-08-07 | Landlord | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. A gassy smell is treated as an emergency, even if it's only occasional. Please don't use the oven or hob, and don't use any switches, flames or lighters near it. Open windows, and if you smell gas again leave the flat and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). Call 999 if anyone is in immediate danger. We are arranging a Gas Safe registered engineer as an emergency, with a target of within 24 hours. No firm is confirmed yet and we will confirm the visit with you as soon as we have it. The oven not heating will be looked at at the same time. We will update you today.

**A3 · request_landlord_approval → Landlord (agency record) (landlord)** (verified)

> FYI: tenant reports an intermittent gas smell near the oven (plus oven not heating). We are sending a Gas Safe engineer as an emergency make-safe without waiting for approval. Please confirm whether our contractor may also repair the oven.
> 
> Options: Our contractor repairs the oven after the gas check (recommended); Landlord arranges own contractor

## Escalation
- **P1 → maintenance** (verified): Possible gas leak reported at Flat 6, 56 Juniper Mews inside a routine oven job
  - Known: Tenant Imogen emailed (event 006) of an occasional gassy smell near the oven; oven also not heating since move-in. Emergency job JOB-101 opened, tenant given gas safety advice and 0800 111 999, landlord informed, Gas Safe engineer assigned for same-day window (no firm named).
  - Missing: Named Gas Safe firm and confirmed attendance time; tenant's current safety; landlord response.
  - Options: Confirm a named Gas Safe firm and time today; Phone tenant to check she is safe
  - Recommendation: Confirm engineer attendance today and phone tenant; oven repair to follow after gas check.

## What this does not establish
- Assigning the engineer does not confirm a named firm, an arrival time or the cause of the smell
- Nothing decides who pays or approves any oven repair
- The tenant's own safety is not confirmed

## Remaining work
- Human to confirm named Gas Safe firm and attendance today
- Landlord decision on oven repair
- Oven repair visit after gas check
- Update tenant when engineer confirmed

## Missing or unavailable information
- Named Gas Safe firm
- Landlord decision
- Oven manual attachment unseen

## Conflicts between sources
- Tenant says 'not urgent' about the gas smell; treated as an emergency per policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven fault is unresolved at intake and on hold for the landlord decision. A gas smell was reported, so an emergency job JOB-101 is open with an engineer assigned for today. Outstanding: engineer confirmation, landlord decision, oven repair.

**2. What is the next action, who is it for, and through which channel?**

Safety email to Imogen (tenant) with gas advice; Gas Safe emergency engineer assigned; landlord informed and asked about the oven repair.

**3. Does anything need a human decision, and why?**

Yes, a P1 escalation (ESC-104) because of the possible gas leak: a human should confirm a named Gas Safe firm and attendance and check the tenant is safe. The oven repair itself needs only the landlord's routine decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports intermitte… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency record)","ticket_ref":"NBL-024-gas-smell-in-routine-report","decision_needed":"FYI: tenant reports an intermit… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported at Flat 6, 56 Juniper Mews inside a routine oven job","known":"Te… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Tenant reports manual settings did not help and a gassy smell near oven. Gas hazard han… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on oven repair aft… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold |

## Failed or unverified actions
_None._
