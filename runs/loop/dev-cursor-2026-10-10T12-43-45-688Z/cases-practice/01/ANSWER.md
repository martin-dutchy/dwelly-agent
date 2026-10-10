# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler and called it not urgent. This is a possible gas leak, so I treated it as an emergency. I sent evacuation and gas-line advice, opened JOB-102, assigned HeatRight Ltd, emailed the landlord and escalated P1.

## Where the case stands
Emergency JOB-102 at visit stage, HeatRight assigned (attendance not yet confirmed), P1 escalation ESC-104 open, landlord informed. Waiting on tenant to confirm she has evacuated and on HeatRight to confirm arrival.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant to leave, avoid switches/flames, call 0800 111 999 (999 if unwell), not re-enter | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for emergency attendance | HeatRight Ltd, contractor | portal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation so a human phones HeatRight and confirms the tenant is out | internal maintenance | internal | A5 ✅ |
| 4 | OTHER | Informed landlord Ben by email | Ben Hartley, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency, even though it feels minor. Please do this now: 1) Everyone leaves the flat now, including your flatmate and her mum. 2) Don't use light switches, flames, lighters or anything electrical on your way out, and leave the door open if it's safe. 3) Once outside, call the National Gas Emergency line on 0800 111 999 (free, 24h). If anyone feels dizzy, sick or has a headache, call 999. 4) Please don't go back in until the gas engineer says it's safe. We're arranging a Gas Safe engineer tonight and our team has been alerted. Please message me once you're out and tell me where you are.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight your tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We're treating it as a possible gas leak: she has been told to leave the flat and call the National Gas Emergency line, and we've assigned HeatRight Ltd for an emergency attendance. Safety work comes first; we'll call you before any spend over £300. We'll update you tomorrow.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak at Flat 4, 12 Mare Street (out of hours)
  - Known: Tenant Amelia Clarke (T-1001) WhatsApp 22:40 9 Oct: rotten-egg smell when boiler fires; said not urgent. Worcester 30i combi, CO alarm in kitchen. 82-year-old visitor present. She was told to evacuate, avoid switches/flames, call 0800 111 999. JOB-102 created as emergency; HeatRight Ltd (Gas Safe 550123, out of hours) assigned; landlord emailed. Unrelated open job R-4801 (tap) on 15 Oct.
  - Missing: Whether tenant has left and called the gas line; HeatRight's confirmed arrival time; any gas isolation outcome.
  - Options: Phone HeatRight (+447700900311) to confirm tonight's attendance; If no answer, phone Swift Plumbing & Heating (+447700900312); Check tenant has evacuated and called 0800 111 999
  - Recommendation: Phone HeatRight now to confirm attendance, fall back to Swift, and confirm with tenant she is outside and has called the gas line.
  - Deadline: Tonight

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or an arrival time
- Cause of the smell is not established; it may or may not be a gas leak
- No spend approved beyond the £300 limit

## Remaining work
- Human on call: phone HeatRight, fall back to Swift (ESC-104)
- Confirm tenant is outside and has called the gas line
- Update landlord tomorrow; Gas Safe engineer to give the all-clear before re-entry
- Tap job R-4801 on 15 Oct is separate; the visit needs the tenant's re-entry to be safe

## Missing or unavailable information
- Tenant's confirmation of evacuation
- HeatRight's confirmed arrival time

## Conflicts between sources
- Tenant says not urgent, but the symptom is a gas-leak sign; I trusted the symptom

## Answers to the case questions
**1. 1. Severity and why**

Emergency. A rotten-egg smell from a gas boiler is a suspected gas leak, whatever the tenant says. An 82-year-old is also in the flat.

**2. 2. What to tell the tenant, in order**

Leave now with everyone, including the elderly visitor. Use no switches, flames or electrics. Call 0800 111 999 from outside, or 999 if anyone is unwell. Don't go back until an engineer says it's safe. We are arranging a Gas Safe engineer, and she should message when she is out.

**3. 3. Actions tonight**

Created emergency job JOB-102 (A2). Assigned HeatRight Ltd, the landlord's preferred Gas Safe contractor (A3). Emailed landlord Ben (A4). Escalated P1 (A5).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg smell from Worcester … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 12:00 emergency attendance (target within 2… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (out of hours)","known":"Tenant Amelia Clarke (… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
