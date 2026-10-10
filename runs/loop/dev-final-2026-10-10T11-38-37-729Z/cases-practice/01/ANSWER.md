# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant called a rotten-egg boiler smell "not urgent", but it is a suspected gas leak, so it is an emergency, with an 82-year-old in the flat. I sent evacuation and gas-line advice, raised emergency JOB-102, assigned HeatRight, told the landlord and escalated P1.

## Where the case stands
Emergency job JOB-102 at visit stage, HeatRight assigned (arrival time unconfirmed). Tenant told to evacuate and call gas line; awaiting her reply. P1 escalation ESC-103 open. Landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety instructions: leave, ventilate, no switches/flames, call 0800 111 999, 999 if unwell | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign HeatRight Ltd (Gas Safe, out of hours) for emergency make-safe | HeatRight Ltd, contractor | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 handover: phone HeatRight to confirm attendance, fall back to Swift, call tenant if no reply | internal maintenance | internal | A4 ✅ |
| 4 | OTHER | Inform landlord of emergency and make-safe instruction | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight. Please do this now: 1) Turn the boiler off and don't use any switches, flames or lighters. 2) Open the windows and doors. 3) Get everyone out of the flat, including your flatmate's mum, and wait outside. 4) Call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If anyone feels dizzy, sick or has a headache, call 999. Please don't go back in until they say it's safe. We are sending a Gas Safe engineer tonight and will update you. Please reply once you're outside.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight (9 Oct, 22:40) the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We are treating it as a suspected gas leak: she has been told to leave, ventilate and call the National Gas Emergency line. We have raised an emergency job (JOB-102) and instructed HeatRight Ltd to attend and make safe. The boiler will stay off until a Gas Safe engineer confirms it is safe. If repairs are needed we will come back to you with a quote before any work beyond making safe. We'll update you as soon as we hear from the engineer.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours
  - Known: Tenant Amelia Clarke (T-1001) WhatsApp 22:40: eggy smell when boiler fires, called it "not urgent". Elderly 82-year-old visitor present. Not flagged vulnerable on record. Boiler Worcester 30i; CO alarm in kitchen. Told to leave, ventilate, no switches/flames, call 0800 111 999 (MSG-101). Emergency job JOB-102 raised, HeatRight Ltd (Gas Safe 550123, out of hours) assigned. Landlord Ben Hartley being told.
  - Missing: Whether tenant has left and called the gas line; engineer's actual arrival time; confirmation contractor accepted out-of-hours call.
  - Options: Phone HeatRight (+447700900311) to confirm attendance tonight; If no answer, call Swift Plumbing & Heating (+447700900312); Phone tenant if no reply to WhatsApp
  - Recommendation: Phone HeatRight now to confirm attendance; fall back to Swift; call tenant if no reply. Boiler stays off until Gas Safe engineer certifies safe.
  - Deadline: Immediately

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or an arrival time
- Does not establish a leak exists or the cause
- No repair spend approved beyond make-safe; quotes go to landlord (limit £300)
- Not a promise of a specific appointment to tenant

## Remaining work
- Human: phone HeatRight now to confirm attendance; fallback Swift
- Confirm tenant is out and has called gas line
- Gas Safe engineer report; quote to landlord if repair needed
- Keep dripping tap job R-4801 (15 Oct) separate
- Check on the 82-year-old visitor's wellbeing; arrange access sensitively

## Missing or unavailable information
- Tenant confirmation she has left and called 0800 111 999
- HeatRight acceptance and ETA
- Whether any occupant has symptoms

## Conflicts between sources
- Tenant says 'not urgent' but symptom indicates gas emergency; trusted the symptom.

## Answers to the case questions
**1. 1. What severity is this and why, given the tenant says it is "not urgent"?**

Emergency. A rotten-egg smell when a gas boiler fires is a suspected gas leak. The tenant's own label doesn't change that, and an 82-year-old is also in the flat.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

Turn the boiler off and use no switches or flames; open windows and doors; get everyone out including the elderly visitor; call 0800 111 999 from outside; call 999 if anyone feels unwell; don't go back in until cleared; an engineer is being sent and we will update her; please reply when outside. Her request for a late morning visit is overridden by the emergency.

**3. 3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Created emergency job JOB-102 (separate from tap job R-4801), assigned HeatRight Ltd (landlord's preferred, Gas Safe, out of hours) for emergency make-safe, escalated P1 as ESC-103 to confirm attendance, and emailed landlord Ben Hartley.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell when boil… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency attendance (time to be conf… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours","known":"Tenant Amelia… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
