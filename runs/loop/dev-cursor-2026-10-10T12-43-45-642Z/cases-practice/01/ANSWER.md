# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler as "not urgent", but this is a suspected gas leak and so an emergency. She was told to leave, avoid switches and flames and call 0800 111 999. Emergency job JOB-102 was opened, HeatRight assigned, landlord Ben informed and a P1 escalation raised.

## Where the case stands
Emergency job JOB-102 at visit stage, HeatRight assigned (attendance time unconfirmed). P1 escalation ESC-103 with human. Awaiting tenant confirmation she is out; follow-up FUP-105 set.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to maintenance to phone tenant and HeatRight tonight | internal | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant to leave, no switches/flames, call 0800 111 999, 999 if unwell | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 3 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for emergency attendance | HeatRight Ltd | internal | A3 ✅ |
| 4 | WAIT | Follow up on 10 Oct to confirm make-safe outcome | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight. Please do this now: 1) Get everyone out of the flat, including your flatmate's mum. 2) Don't use light switches, flames, lighters or anything electrical on the way out, and leave the door open if you safely can. 3) Once outside, call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels unwell, dizzy or faint, call 999. Please don't go back in until the gas engineer says it's safe. We're arranging a Gas Safe engineer and will keep you updated. Please reply to confirm you're out safely.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight your tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We've treated it as a gas emergency: she's been told to leave the flat and call the National Gas Emergency line, and we've assigned HeatRight Ltd (job JOB-102) as emergency make-safe. We'll update you once the engineer has attended and will come back to you before any spend over your £300 limit, other than urgent make-safe.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak (rotten-egg smell from boiler) reported out of hours; tenant called it "not urgent"
  - Known: Tenant Amelia Clarke, Flat 4, 12 Mare Street (P-201), WhatsApp 22:40 on 9 Oct: eggy smell when boiler fires; 82-year-old guest staying. Boiler Worcester 30i 2017; CO alarm in kitchen. Tenant told to leave, avoid switches/flames, call 0800 111 999 (MSG-101). Ticket JOB-102 opened as emergency; HeatRight Ltd (Gas Safe 550123, out of hours) assigned. Landlord Ben Hartley, limit £300, prefers HeatRight. Separate open job R-4801 (tap) unrelated.
  - Missing: Tenant has not confirmed she is out; contractor attendance time unconfirmed; whether National Gas Emergency has attended.
  - Options: Phone HeatRight (+447700900311) to confirm tonight attendance; fall back to Swift Plumbing & Heating (+447700900312); Phone tenant to confirm she is out and has called the gas line
  - Recommendation: Phone tenant and HeatRight now; treat as gas emergency until a Gas Safe engineer clears the boiler.

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or attended tonight.
- Nothing confirms a leak exists; engineer must diagnose.
- Tenant has not yet confirmed she is out.

## Remaining work
- Human to phone tenant and HeatRight tonight (ESC-103)
- Engineer to make safe and report; any quote over £300 to Ben
- Tenant's tap job R-4801 stays separate
- Tell tenant about the 82-year-old guest being considered - already covered; avoid early visit only if non-emergency

## Missing or unavailable information
- Tenant confirmation she is out and has called the gas line
- Contractor confirmed attendance time

## Conflicts between sources
- Tenant says 'not urgent' but symptoms indicate a gas emergency; trusted the symptoms.

## Answers to the case questions
**1. 1. What severity is this and why, given the tenant says it is "not urgent"?**

Emergency. A rotten-egg smell when a gas boiler fires is a suspected gas leak, and an 82-year-old is staying. The tenant's own view of urgency does not change that.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

First leave the flat with everyone. Then no switches, flames or electrics, and leave the door open if safe. Then call 0800 111 999 from outside, or 999 if anyone is unwell. Don't re-enter until a Gas Safe engineer says it's safe. Then we are arranging an engineer, and please confirm you're out.

**3. 3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Opened emergency gas job JOB-102 and assigned HeatRight Ltd (the landlord's preferred, out-of-hours, Gas Safe). Raised P1 escalation ESC-103 for phone contact. Emailed landlord Ben. Set follow-up FUP-105.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worcester combi boiler… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:30-2026-10-10 02:00 emergency out-of-hours attendance (to… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak (rotten-egg smell from boiler) reported out of hours; tenant called it \"… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"due_on":"2026-10-10","purpose":"Confirm tenant safe, gas engineer attended and boiler made safe; update landlord and tenant","ticket_ref":… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
