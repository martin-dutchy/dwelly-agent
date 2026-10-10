# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg boiler smell as "not urgent", but this is a suspected gas leak with an 82-year-old in the flat. I sent evacuation and 0800 111 999 advice first, opened emergency JOB-102, assigned HeatRight, informed the landlord and escalated P1.

## Where the case stands
Emergency JOB-102 open, HeatRight assigned for out-of-hours make-safe, P1 escalated, landlord and tenant informed. Waiting on tenant confirmation she is out and HeatRight's arrival.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation so a human phones HeatRight (fallback Swift) to confirm attendance and checks on the tenant | internal maintenance | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Evacuation and gas emergency safety advice sent first | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 3 | ASSIGN_PROVIDER | Assign HeatRight Ltd for emergency make-safe | HeatRight Ltd | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can be a gas leak, so please treat it as urgent tonight. Please: 1) Turn the boiler off and don't use any flames or light switches near it. 2) Open the windows and doors. 3) Get everyone out of the flat, including your flatmate's mum, and wait outside. 4) Call the National Gas Emergency line on 0800 111 999 (free, 24h). If anyone feels dizzy, sick or faint, call 999. Don't go back in until they say it's safe. We're sending a Gas Safe engineer and our team has been alerted. We'll message you here shortly with an update. Please reply to confirm you're all out.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight at 22:40 the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We've treated it as a suspected gas leak: she's been told to leave the flat and call the National Gas Emergency line, and we've instructed HeatRight Ltd (your preferred boiler firm) to attend and make safe. This is emergency make-safe work, so it's going ahead without waiting for approval. If any repair costs more than your £300 limit we'll call you before anything further. We'll update you tomorrow.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours
  - Known: Tenant Amelia Clarke reported at 22:40 on WhatsApp a rotten-egg smell when boiler fires (Worcester 30i, 2017); she called it "not urgent". 82-year-old visitor staying. CO alarm in kitchen. Tenant told to evacuate, avoid switches/flames, call 0800 111 999, 999 if unwell. JOB-102 opened as emergency; HeatRight Ltd (Gas Safe 550123, out of hours) assigned. Landlord Ben Hartley to be informed.
  - Missing: Tenant confirmation she is out; whether National Gas Emergency has attended; HeatRight acceptance and arrival time.
  - Options: Phone HeatRight on +447700900311 to confirm attendance tonight; If no answer, call Swift Plumbing & Heating +447700900312 (Gas Safe 551987); Phone tenant to confirm safety
  - Recommendation: Phone HeatRight now to confirm they are attending; fall back to Swift; check on the tenant by phone if no WhatsApp reply.
  - Deadline: Tonight

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or arrived
- Does not confirm a leak exists or the cause or cost
- Landlord was informed, not asked for approval; repair costs above £300 need his call

## Remaining work
- Human to confirm HeatRight attendance tonight (fallback Swift)
- Confirm tenant and visitor are out and safe
- Record work result, quote and invoice after the visit
- Tell the tenant about the existing tap visit R-4801 on 15 Oct (unchanged)

## Missing or unavailable information
- Tenant confirmation she has evacuated
- HeatRight acceptance and arrival time
- Whether the gas emergency service has attended

## Conflicts between sources
- Tenant says 'not urgent' but the described symptom is a gas-leak indicator; treated as an emergency.

## Answers to the case questions
**1. 1. Severity and why?**

Emergency. A rotten-egg smell from a gas boiler is a suspected gas leak whatever the tenant says. An elderly visitor is in the flat and it is out of hours.

**2. 2. What do you tell the tenant, in order?**

Turn the boiler off, no flames or switches. Open windows. Everyone leaves, including the 82-year-old. Call 0800 111 999 from outside, or 999 if anyone is unwell. Don't return until cleared. Engineer sent, reply to confirm they are out.

**3. 3. Which actions tonight?**

Safety message sent. Emergency gas ticket JOB-102 created, linked to the tap job R-4801 and not a duplicate of it. HeatRight (the landlord's preferred, out-of-hours, Gas Safe) assigned for make-safe. P1 escalation ESC-103. Landlord Ben emailed. The tenant's request for a late start was not followed because this is an emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worcester combi boiler… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-02:00 emergency out-of-hours attendance (make safe)"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours","known":"Tenant Amelia C… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
