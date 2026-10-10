# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

A routine oven report now includes a gassy smell, so it is treated as a gas emergency. The tenant got safety advice and the 0800 111 999 number, emergency job JOB-102 was opened and assigned, the landlord was told, and P1 escalated.

## Where the case stands
Original oven ticket at intake, returned to auto. Tenant says the landlord's settings advice failed and reports a gassy smell. Emergency gas job JOB-102 opened and escalated P1 (ESC-103). No named firm yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell tenant to leave, avoid switches/flames, call 0800 111 999, not use the oven | Imogen, tenant | email | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign Gas Safe emergency call-out on JOB-102, same-day window | Gas Safe engineer (no firm named) | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to confirm engineer and check tenant is safe | internal maintenance | internal | A4 ✅ |
| 4 | OTHER | Inform landlord of gas report and emergency job | Oliver, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because you've noticed a gassy smell, please treat it as serious. Please leave the flat now, don't use light switches, the oven or any flame, and open doors/windows on your way out if it's safe. Call the National Gas Emergency line on 0800 111 999 from outside (999 if anyone is in immediate danger). Please don't use the oven until it has been checked. We're arranging a Gas Safe engineer as an emergency, with a target of today / within 24 hours, and the oven fault will be looked at too. We'll update you as soon as we have a confirmed time, and in any case today.

**A5 · send_message → Oliver (landlord) via email, agency landlord record** (verified)

> Hi Oliver, the tenant says the settings didn't fix the oven, and also reports a gassy smell near it. We've advised her to leave and call the gas emergency line, and opened an emergency job for a Gas Safe engineer today. The oven fault will be checked at the same visit; we'll come back to you on any quote.

## Escalation
- **P1 → maintenance** (verified): Tenant reports gassy smell near the oven (event 006)
  - Known: Tenant Imogen, Flat 6, 56 Juniper Mews. Oven under-heating since move-in; landlord's manual suggestion didn't help. Mentions gassy smell near it sometimes. Told to leave, avoid switches/flames, call 0800 111 999. Emergency job JOB-102 opened, linked to NBL-024.
  - Missing: No named Gas Safe firm; whether tenant has left and called the gas line; landlord not yet told.
  - Options: Confirm/arrange named Gas Safe engineer today; Phone tenant to confirm safe
  - Recommendation: Confirm an engineer today and phone the tenant to check they are out and safe.
  - Deadline: Today

## What this does not establish
- Window is a target, not a confirmed appointment; no firm named
- Does not establish the smell's cause or that the oven fault is related
- No spend approved for oven repair

## Remaining work
- Human to confirm named Gas Safe engineer and tenant safety (ESC-103)
- Oven under-heating repair needs landlord approval after diagnosis
- Original ticket NBL-024 still at intake

## Missing or unavailable information
- Manual attachment unseen
- Whether tenant has left and called gas line

## Conflicts between sources
- Tenant says 'not urgent' about the smell; treated as an emergency per policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven ticket at intake; tenant's reply reports a gas smell. Emergency job JOB-102 opened with a Gas Safe call-out; the engineer firm and the oven repair are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Safety email to Imogen (tenant), emergency gas job assigned, landlord emailed, P1 escalation raised.

**3. Does anything need a human decision, and why?**

Yes, P1: gas smell needs a named engineer confirmed and the tenant's safety checked; the manager owns that (ESC-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports a gassy sm… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports gassy smell near the oven (event 006)","known":"Tenant Imogen, Flat 6, 56 Jun… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-102","body":"H… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
