# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler as 'not urgent', but this is a possible gas leak with an 82-year-old present, so it is an emergency. I told her to evacuate and call the gas emergency line, created emergency job JOB-102, assigned HeatRight, informed the landlord and escalated P1.

## Where the case stands
Emergency job JOB-102 at visit stage, HeatRight assigned for out-of-hours attendance (arrival not yet confirmed by them). Tenant told to evacuate and call gas line; awaiting her confirmation. Human P1 escalation ESC-103 open. Landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant to leave, no switches/flames, call 0800 111 999, 999 if unwell | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned HeatRight Ltd (Gas Safe, out of hours) to emergency job JOB-102 | HeatRight Ltd, contractor | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to phone tenant and contractor and confirm attendance | internal maintenance | internal | A4 ✅ |
| 4 | OTHER | Informed landlord of emergency and make-safe | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight. Please do this now: 1) Get everyone out of the flat, including your flatmate's mum. 2) Don't use light switches, lighters, flames or the boiler, and don't ring doorbells inside. Leave doors/windows open if you can do so on the way out. 3) From outside, call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels dizzy, sick or has a headache, or in immediate danger, call 999. Don't go back in until they say it's safe. We're sending a Gas Safe engineer now and will update you. Please message us once you're outside and safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight at 22:40 the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We treated it as a possible gas leak: she's been told to leave the flat and call the National Gas Emergency line, and we've assigned HeatRight Ltd for emergency attendance (job JOB-102). The boiler should stay off until a Gas Safe engineer signs it off. Emergency make-safe doesn't wait for approval; we'll send you any quote for repairs over your £300 limit before work goes ahead.

## Escalation
- **P1 → maintenance** (verified): Possible gas leak at Flat 4, 12 Mare Street (P-201), out of hours; 82-year-old visitor present
  - Known: Tenant Amelia Clarke (WhatsApp 22:40, 09/10) reports rotten-egg smell when boiler fires (Worcester 30i, 2017). Called it 'not urgent'. Elderly visitor (82) staying. Kitchen CO alarm fitted 2022. Told tenant to leave, avoid switches/flames, call 0800 111 999 (MSG-101). Emergency job JOB-102 created; HeatRight Ltd (Gas Safe 550123, out of hours) assigned. Separate open job R-4801 (dripping tap, visit 15/10) unrelated.
  - Missing: Whether tenant has left and called the gas line; HeatRight's confirmed arrival time; whether the boiler is isolated.
  - Options: Phone HeatRight (+447700900311) to confirm attendance tonight; fall back to Swift Plumbing & Heating (+447700900312); Check tenant has exited and called National Gas Emergency; Phone landlord Ben Hartley
  - Recommendation: Phone tenant and HeatRight now to confirm attendance; boiler stays off until Gas Safe engineer signs it off.
  - Deadline: Immediately

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or an arrival time
- Does not establish whether there is a leak or the cause
- Does not approve any repair spend above £300

## Remaining work
- Human: phone HeatRight to confirm attendance; fall back to Swift if no answer
- Human/agent: confirm tenant is out and has called gas line
- Quote for any repairs goes to landlord (limit £300)
- Tell tenant about the 82-year-old's needs when rebooking; R-4801 tap visit 15/10 stays open

## Missing or unavailable information
- Tenant confirmation she is safe outside
- HeatRight's confirmed arrival time

## Conflicts between sources
- Tenant says 'not urgent' but described a classic gas-leak symptom; trusted the symptom.

## Answers to the case questions
**1. 1. What severity is this and why?**

Emergency. A rotten-egg smell from a gas boiler is a suspected gas leak whatever the tenant says; an 82-year-old is also in the flat.

**2. 2. What do you tell the tenant, in order?**

Leave the flat with everyone; no switches, flames or boiler; call 0800 111 999 from outside (999 if unwell or in danger); don't re-enter until cleared; message us when safe. Engineer being sent. Her request for a later, gentler time is overridden by safety.

**3. 3. Which actions tonight?**

Created emergency job JOB-102 (not a duplicate of R-4801), assigned HeatRight Ltd (landlord's preferred, Gas Safe, out of hours), emailed landlord Ben, escalated P1 (ESC-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"R-4801","body":"Hi … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from Worc… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency out-of-hours attendance"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at Flat 4, 12 Mare Street (P-201), out of hours; 82-year-old visitor prese… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
