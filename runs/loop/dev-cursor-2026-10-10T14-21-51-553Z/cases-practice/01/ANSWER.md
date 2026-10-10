# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant called a rotten-egg boiler smell "not urgent", but it is a suspected gas leak with an 82-year-old in the flat, so it is an emergency. I sent safety instructions, opened emergency job JOB-102, assigned HeatRight (Gas Safe, out of hours), escalated P1 and told the landlord.

## Where the case stands
Emergency JOB-102 open, HeatRight assigned for a make-safe tonight (attendance not yet confirmed by the contractor). Tenant has been sent safety instructions and has not yet replied. P1 escalation ESC-103 is with a human. Landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation: confirm HeatRight attends tonight, phone tenant if no reply | internal maintenance | internal | A4 ✅ |
| 2 | ASSIGN_PROVIDER | Assign HeatRight Ltd for emergency make-safe tonight | HeatRight Ltd, contractor | portal | A3 ✅ |
| 3 | REPLY_TO_TENANT | Safety-first message: leave, 0800 111 999, CO/symptom questions, 82-year-old out first, confirm out | Amelia Clarke, tenant | whatsapp | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a gas boiler can be a gas leak, so please treat it as urgent tonight. Please: 1) Get everyone out of the flat now, including your flatmate's mum (82), who should go out first with help. 2) Don't use light switches, flames, or the boiler. If it's safe, open doors and windows on your way out. 3) Once outside, call the National Gas Emergency line on 0800 111 999 (free, 24h). Call 999 if anyone feels unwell. 4) Is your kitchen CO alarm sounding? Does anyone have a headache, dizziness, nausea or drowsiness? 5) Please reply to confirm everyone is out. We're sending a Gas Safe engineer out tonight to make it safe. Please don't go back in until they or the gas emergency service say it's safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight at 22:40 the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We are treating it as a suspected gas leak: she has been told to leave and call the National Gas Emergency line, and we have sent HeatRight Ltd (Gas Safe) out tonight to make safe. We'll update you with their findings and any cost for your approval beyond the make-safe.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak (rotten-egg smell from boiler), out of hours, 82-year-old occupant present
  - Known: Tenant Amelia Clarke WhatsApp 22:40 9 Oct: eggy smell when boiler fires, called it not urgent. Guest aged 82. Boiler Worcester 30i, CO alarm in kitchen. Safety message sent (MSG-101). JOB-102 emergency created; HeatRight Ltd (Gas Safe 550123, out of hours) assigned.
  - Missing: Tenant has not yet confirmed everyone is out, whether CO alarm sounding or symptoms; HeatRight attendance not confirmed.
  - Options: Confirm HeatRight attends tonight; if not, switch to Swift Plumbing & Heating (Gas Safe 551987); Phone tenant if no reply
  - Recommendation: Phone HeatRight on +447700900311 to confirm attendance tonight, and phone the tenant if no WhatsApp reply soon.

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or attended.
- Cause of the smell is not established; cost and who pays are not decided.

## Remaining work
- Human to confirm HeatRight attendance, else switch to Swift
- Await tenant reply confirming everyone is out
- Follow up on findings, any quote for landlord approval, gas safety certificate
- R-4801 tap visit on 2026-10-15 unchanged

## Missing or unavailable information
- Whether everyone is out, CO alarm status and symptoms
- Contractor confirmation of attendance

## Conflicts between sources
- Tenant says 'not urgent' but the symptom described is a gas smell; treated as an emergency.

## Answers to the case questions
**1. What severity is this and why?**

Emergency. A rotten-egg smell from a gas boiler is a suspected gas leak whatever the tenant says, and an 82-year-old is staying there.

**2. What exactly do you tell the tenant right now?**

In order: get everyone out, with the 82-year-old out first; no switches, flames or boiler, and open doors and windows if safe; call 0800 111 999 (999 if anyone is unwell); are the CO alarm or any symptoms present; reply to confirm everyone is out; an engineer is being sent tonight; don't go back in until told it is safe.

**3. Which actions do you take tonight?**

Created emergency job JOB-102 linked to R-4801. Assigned HeatRight Ltd for a same-night make-safe without waiting for landlord approval. Escalated P1 (ESC-103). Emailed landlord Ben afterwards.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg smell when boiler fires up (suspected g… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:30-2026-10-10 02:00 (emergency make-safe, same night)"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak (rotten-egg smell from boiler), out of hours, 82-year-old occupant presen… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
