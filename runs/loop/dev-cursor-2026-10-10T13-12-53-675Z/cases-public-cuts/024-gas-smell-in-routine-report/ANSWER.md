# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

A routine oven report contained a gassy smell, which I treated as an emergency. I opened JOB-101, gave the tenant gas safety advice, informed the landlord, assigned an emergency Gas Safe window and escalated P1. The oven repair waits for landlord approval.

## Where the case stands
Original oven job at intake with no provider; landlord approval requested. New emergency gas job JOB-101 opened, engineer window assigned, P1 escalated. Tenant given safety advice.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant to leave, avoid switches/flames, call 0800 111 999, engineer being arranged today | Imogen, tenant | email | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to source/confirm a Gas Safe engineer today | internal maintenance | internal | A5 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Informed landlord of gas report and asked approval for oven repair with our contractor | Oliver, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Please treat the gas smell as serious, even if it only happens sometimes. Please don't use the oven or hob, and don't touch light switches or use any flame. Open the windows, leave the flat, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If you ever feel unwell or are in immediate danger, call 999. We are arranging a Gas Safe registered engineer as an emergency and will update you today. We'll also look into the oven not heating properly once the gas check is done. Please don't go back in until you've been told it's safe.

**A3 · request_landlord_approval → Oliver (landlord)** (verified)

> FYI: tenant reports a gassy smell near the oven. We are treating it as a gas emergency and arranging a Gas Safe engineer now; no approval needed for make-safe. Oven not heating also needs inspection; please confirm we may send our contractor for it.
> 
> Options: Yes, send your contractor for the oven repair; I will arrange my own contractor

## Escalation
- **P1 → maintenance** (verified): Possible gas leak reported near oven in a routine oven-repair job
  - Known: Tenant Imogen emailed (event 006) of a gassy smell near the oven sometimes, plus oven not heating since move-in. Landlord Oliver suggested settings (event 003); no effect. Emergency ticket JOB-101 opened, tenant told to leave, avoid switches/flames and call 0800 111 999. Landlord informed.
  - Missing: No named Gas Safe firm in records; whether tenant has left/called the gas line; whether the smell is at the appliance or supply.
  - Options: Confirm a Gas Safe engineer attends today; Check tenant has called the gas emergency line
  - Recommendation: Source a Gas Safe engineer for same-day attendance and confirm with the tenant; oven fault is handled afterwards on the original ticket.
  - Deadline: Today, ASAP

## What this does not establish
- Nothing confirms a gas leak or its cause; the engineer must establish that
- Emergency window is a target; no named firm or confirmed appointment
- Oven repair not approved or assigned
- Manual attachment unseen

## Remaining work
- Human to confirm Gas Safe engineer attendance today
- Landlord decision on oven repair
- Oven fault assessed after gas check
- Confirm with tenant they have left and called the gas line

## Missing or unavailable information
- Named Gas Safe firm
- Landlord decision
- Manual contents

## Conflicts between sources
- Tenant calls the smell 'not urgent', but any gas smell is treated as an emergency under policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven job is at intake awaiting landlord approval. The tenant's reply also reports a gas smell, so emergency job JOB-101 was opened. Outstanding: engineer attendance, landlord decision, oven repair.

**2. What is the next action, who is it for, and through which channel?**

Safety email to Imogen (tenant) with 0800 111 999 advice, sent; P1 escalation to maintenance; landlord Oliver informed and asked about the oven repair.

**3. Does anything need a human decision, and why?**

Yes, P1: a human should source and confirm a named Gas Safe engineer today because the gas smell is possible danger and no firm is in the records.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports a… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Oliver","decision_needed":"FYI: tenant reports a gassy smell near the oven. We are treating it as a gas emergency and arranging… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported near oven in a routine oven-repair job","known":"Tenant Imogen em… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
