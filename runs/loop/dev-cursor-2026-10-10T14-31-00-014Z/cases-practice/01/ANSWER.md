# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler and called it not urgent; this is a suspected gas leak and an emergency, with an 82-year-old present. I sent evacuation and gas-line advice first, opened emergency job JOB-102, assigned HeatRight to make safe, escalated P1 and informed the landlord.

## Where the case stands
Emergency ticket JOB-102 at visit stage, HeatRight assigned for out-of-hours make-safe; P1 escalation ESC-103 open; awaiting tenant confirmation everyone is out and engineer attendance.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety-first evacuation message with gas line number and CO/symptom questions | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign HeatRight Ltd (Gas Safe) for emergency make-safe tonight | HeatRight Ltd, contractor | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to confirm evacuation and engineer attendance | internal | internal | A4 ✅ |
| 4 | OTHER | Inform landlord of emergency and make-safe | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a boiler can be a gas leak, so please treat this as an emergency tonight. Please: 1) Get everyone out of the flat now, including your flatmate's mum (82), who should be helped out first. 2) Don't use light switches, flames, or the boiler. If it's safe, open doors and windows on your way out. 3) Once outside, call the National Gas Emergency line on 0800 111 999 (free, 24h). Call 999 if anyone feels unwell. 4) Is the CO alarm in the kitchen sounding? Does anyone have a headache, dizziness, nausea or drowsiness? Please reply to confirm everyone is out. We're sending a Gas Safe engineer to make it safe tonight and will update you. Please don't go back in until they or the gas emergency service say it's safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, at 22:40 tonight the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We're treating it as a gas emergency: the tenant has been told to leave and call the National Gas Emergency line, and we've sent HeatRight Ltd (Gas Safe) to make it safe without waiting for approval. Any repair cost above £300 would come to you first. We'll update you once the engineer reports.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours
  - Known: Tenant Amelia Clarke WhatsApp 22:40 09/10: rotten-egg smell when boiler fires; said "not urgent". 82-year-old visitor present. Worcester 30i, CO alarm in kitchen. Emergency ticket JOB-102 opened; safety advice sent (MSG-101); HeatRight Ltd (Gas Safe 550123, out of hours) assigned to make safe. Unrelated open tap job R-4801.
  - Missing: Tenant confirmation everyone is out; CO symptoms; whether gas emergency service called; HeatRight attendance confirmation.
  - Options: Confirm HeatRight attends tonight; If no confirmation quickly, switch to Swift Plumbing & Heating (C-12); Phone tenant to confirm evacuation
  - Recommendation: Phone tenant and HeatRight now to confirm evacuation and attendance; fall back to Swift if no response.
  - Deadline: Immediately

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or attended; cause of the smell is unconfirmed
- No repair cost approved; anything over £300 needs Ben's approval
- Tenant has not yet confirmed they are out

## Remaining work
- Human to confirm tenant out and HeatRight attending, fallback Swift (C-12)
- Engineer report, quote if needed, landlord approval
- Update tenant and landlord after make-safe
- Tap job R-4801 (15 Oct) unaffected; tenant to be told visit times should be gentle given elderly visitor, once safe

## Missing or unavailable information
- Tenant reply on evacuation and CO symptoms
- HeatRight confirmation of attendance

## Conflicts between sources
- Tenant says 'not urgent' but symptoms indicate gas emergency; trusted the symptoms.

## Answers to the case questions
**1. 1. What severity is this and why?**

Emergency. A rotten-egg smell when a gas boiler fires is a suspected gas leak; the tenant's 'not urgent' doesn't change that, and an 82-year-old is present (possible CO risk too).

**2. 2. What do you tell the tenant, in order?**

Leave now with everyone, helping the 82-year-old out first; no switches, flames or boiler, open doors/windows if safe; call 0800 111 999 (999 if unwell); say if CO alarm sounding or any symptoms; reply to confirm all are out; engineer being sent; don't re-enter until cleared.

**3. 3. Which actions tonight?**

Created emergency ticket JOB-102 (linked to R-4801), assigned HeatRight Ltd (preferred, Gas Safe, out-of-hours) to make safe without waiting for landlord, escalated P1 (ESC-103), emailed landlord Ben afterwards.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worcester 30i combi bo… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:30-2026-10-10 02:00 emergency make-safe"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours","known":"Tenant Amelia C… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, at … | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
