# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant's follow-up about the oven mentioned a gassy smell, which makes this an emergency. I gave her gas safety advice, opened emergency job JOB-102, assigned a Gas Safe engineer call-out, told the landlord and escalated P1.

## Where the case stands
Original oven job at intake; tenant's reply revealed a gas smell. Emergency job JOB-102 opened, generic Gas Safe engineer assigned for a same-day window, P1 escalated (ESC-104). Landlord informed, no reply yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice (leave, no switches/flames, call 0800 111 999, 999 if in danger), emergency engineer within 24h target | Imogen, tenant | email | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign Gas Safe engineer emergency call-out to JOB-102 (no firm named yet) | Gas Safe engineer | internal | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to name a firm and confirm the visit | internal maintenance | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Please treat the gas smell as serious, even if it's only occasional. Please don't use the oven, hob, light switches or any flame or electrical item near it. Open windows and doors, leave the flat, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels unwell or you are in immediate danger, call 999. We are arranging for a gas engineer to attend as an emergency, with a target of within 24 hours, and will update you once we have a visit confirmed. We are also letting the landlord know. We'll be in touch again today.

**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> The tenant at Flat 6, 56 Juniper Mews reports the oven isn't heating properly (settings suggested didn't help) and an occasional gassy smell near it. We've told her to leave, avoid switches/flames and call the Gas Emergency line, and are arranging an emergency Gas Safe engineer call-out. The oven should not be used until checked.

## Escalation
- **P1 → maintenance** (verified): Gas smell reported by tenant inside a routine oven job
  - Known: Tenant Imogen emailed 2026-08-05 (event 006): oven still not cooking, occasional gassy smell near it. Told to leave, avoid switches/flames, call 0800 111 999. Emergency job JOB-102 created, landlord told, generic Gas Safe engineer assigned for same day; no firm named.
  - Missing: Named Gas Safe firm and confirmed time; whether tenant has called the gas line; landlord not yet replied.
  - Options: Confirm a named Gas Safe engineer today; Check the gas network has attended
  - Recommendation: Secure a named Gas Safe engineer today, confirm access with tenant, keep oven out of use.

## What this does not establish
- Assigning an engineer does not confirm a named firm, arrival time or the cause of the smell
- The oven performance fault is not diagnosed; the manual attachment was never seen
- Landlord informed, not approval of any spend

## Remaining work
- Human to name Gas Safe firm and confirm visit today
- Oven fault to be checked on the same visit
- Update tenant once visit confirmed
- Landlord reply awaited

## Missing or unavailable information
- Named gas engineer firm and confirmed time
- Whether tenant has called the gas emergency line
- Oven manual contents (unavailable)

## Conflicts between sources
- Tenant says 'not urgent' for the gas smell; treated as an emergency per policy

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The routine oven job was still at intake, with the landlord's agent's settings advice tried and failed. A gas smell was disclosed, so an emergency job JOB-102 now exists. A named engineer and confirmed visit are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Safety advice and emergency timescale to Imogen by email (sent); landlord emailed; engineer assigned to JOB-102 for a same-day window.

**3. Does anything need a human decision, and why?**

Yes, P1 (ESC-104): gas smell needs a named Gas Safe firm and confirmed visit, since none is named in the records.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant Imogen reports an … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-024-gas-smel… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell reported by tenant inside a routine oven job","known":"Tenant Imogen emailed 2026-… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
