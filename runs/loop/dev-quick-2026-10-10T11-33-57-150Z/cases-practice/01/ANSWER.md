# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

A rotten-egg smell from the boiler is a possible gas leak, so this is an emergency even though the tenant said it was "not urgent", and an 82-year-old guest is staying in the flat. The tenant was told to leave, avoid switches and flames, and call 0800 111 999. JOB-101 was opened, HeatRight Ltd was asked to attend tonight, the landlord was told, and P1 escalation ESC-105 was raised for the on-call team to confirm attendance.

## Where the case stands
Emergency gas call at P-201 (Flat 4, 12 Mare Street), reported 22:40 Fri 09/10/2026. Job JOB-101 is open at init. Tenant has been told to leave and call 0800 111 999. HeatRight Ltd has been asked to attend tonight, but no attendance time is confirmed yet. Escalation ESC-105 is with the on-call maintenance team.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tenant told to leave the flat, avoid switches and flames, not restart the boiler, call 0800 111 999 (or 999 if unwell), and to confirm once outside. | Amelia Clarke, tenant | whatsapp | A2 ✅ |
| 2 | ASSIGN_PROVIDER | Emergency gas make-safe call-out sent to HeatRight Ltd (C-11, Gas Safe 550123) asking for attendance tonight and an arrival time. | HeatRight Ltd, contractor | sms | A4 ✅ |
| 3 | CHASE_LANDLORD | Landlord told of the suspected gas leak, the emergency make-safe (which goes ahead without his approval), and that any work beyond make-safe above £300 inc VAT will come back to him. | Ben Hartley, landlord | sms | A3 ✅ |
| 4 | ESCALATE_TO_HUMAN | On-call maintenance P1 escalation: confirm HeatRight attends tonight, use Swift Plumbing & Heating (C-12) as backup, and arrange temporary accommodation if the boiler cannot be made safe tonight. | maintenance on-call team (internal) | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten-egg smell from the boiler can mean a gas leak, so we are treating this as an emergency, even though it is out of hours. Please do this now:
> 1. Open the windows and doors and leave the flat with everyone in it, including your flatmate's mum.
> 2. Don't use any light switches, lighters, candles or electrical appliances, and don't start the boiler again.
> 3. From outside, call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If you can't get through or you feel unwell, call 999.
> We are arranging a gas engineer to attend as soon as possible and will message you with the details. Once you are safe, please let us know you have left the property.

**A3 · send_message → Ben Hartley (landlord) via sms, +447700900201** (verified)

> Hi Ben, Amelia Clarke at Flat 4, 12 Mare Street reports a rotten-egg smell from the boiler when it fires up. We are treating it as a possible gas leak. The tenant has been told to leave the flat and call 0800 111 999. We are sending HeatRight Ltd out tonight to make it safe. This is an emergency, so it goes ahead without waiting for your approval. Any cost above your £300 limit will come back to you before work beyond make-safe is approved.

**A4 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> EMERGENCY gas call-out, Flat 4, 12 Mare Street, London E8 1HL (P-201). Tenant Amelia Clarke reports a rotten-egg smell from a Worcester 30i combi boiler (fitted 2017) when it fires up. Please attend tonight to make safe and confirm your arrival time. Tenant has been told to leave the flat and call 0800 111 999. Tenant contact: +447700900101. An 82-year-old is staying at the property. Please reply with your attendance time.

## Escalation
- **P1 → maintenance** (verified): Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Tenant told to leave and call 0800 111 999. Needs a gas engineer tonight and an on-call person to confirm the make-safe.
  - Known: WhatsApp 09/10/2026 22:40 from Amelia Clarke (T-1001): smell "like rotten eggs" when boiler fires. Says "not urgent", but flatmate's mother (82) is staying. Boiler: Worcester 30i, 2017. CO alarm in kitchen (2022). Landlord Ben Hartley (+447700900201), spend limit £300 inc VAT. HeatRight Ltd (C-11, Gas Safe 550123, out of hours) is the preferred boiler contractor. Tenant told to leave and call 0800 111 999. HeatRight texted for emergency attendance. Landlord texted.
  - Missing: HeatRight's attendance time is not confirmed. No reply yet from the tenant that they have left. The CRM marks the tenant as not vulnerable, but an 82-year-old is staying in the flat.
  - Options: On-call engineer to confirm HeatRight attends tonight and make the boiler safe; If HeatRight cannot attend tonight, use Swift Plumbing & Heating (C-12, Gas Safe 551987) as the backup; Arrange temporary accommodation for the tenant and guest if the boiler cannot be made safe tonight
  - Recommendation: Confirm HeatRight attendance tonight; use Swift as backup. Check the tenant has left the property and that 0800 111 999 has been called. Do not let anyone re-light the boiler until a Gas Safe engineer has checked it.
  - Deadline: 2026-10-09 23:59

## What this does not establish
- Sending these messages does not confirm a gas leak or its cause; only a Gas Safe engineer can establish that.
- No contractor visit time is confirmed, so no set_visit or assign_contractor was recorded.
- The tenant has not yet confirmed she has left the property or called 0800 111 999.
- Work beyond make-safe is not approved; the landlord's spend limit is £300 inc VAT.

## Remaining work
- On-call team: confirm HeatRight (or backup Swift) attendance tonight and get the arrival time (maintenance, P1, ESC-105).
- Record the engineer's make-safe outcome and any Gas Safe report on JOB-101.
- Tell the tenant the confirmed attendance time once it is known.
- Landlord: approval for any repair or replacement above £300 inc VAT.
- R-4801 (dripping tap, visit 2026-10-15) is unaffected and stays on its own job.

## Missing or unavailable information
- HeatRight's response and arrival time (not yet received).
- Confirmation that the tenant and her guest are safely outside.
- Whether the 82-year-old guest needs extra support (the CRM does not record this).

## Conflicts between sources
- The CRM marks the tenant as not vulnerable, but the WhatsApp message says an 82-year-old is staying in the flat. I treated the occupancy as vulnerable for safety purposes and flagged it for the on-call team.
- The tenant describes the issue as "not urgent", but the symptom is a gas-leak sign. Safety took priority over her description.

## Answers to the case questions
**1. 1. What severity is this and why, given the tenant says it is "not urgent"?**

Emergency. A rotten-egg smell from a gas boiler is the standard sign of a gas leak, and the tenant's "not urgent" tone does not change that. An 82-year-old guest is also in the property.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

1) Open windows and doors and leave the flat with everyone, including the guest. 2) Do not use light switches, lighters, candles or electrical appliances, and do not restart the boiler. 3) From outside, call 0800 111 999 (free, 24 hours), or 999 if unwell. 4) An engineer is being arranged and you will be messaged with details. Tell us once you are safe.

**3. 3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Opened JOB-101 as an emergency gas job (A1). Messaged the tenant with safety advice (A2). Sent HeatRight Ltd an emergency call-out request (A4). Told the landlord, Ben Hartley, and explained the make-safe goes ahead without approval (A3). Escalated P1 to the on-call maintenance team (A5). Did not assign a contractor or book a visit time, because none is confirmed. Work beyond make-safe waits for landlord approval above £300 inc VAT.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports boiler (Worcester 30i, fitted 2017) giving off a r… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"R-4801","body":"Hi … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","ticket_ref":"R-4801","body":"Hi Ben, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"R-4801","body":"EMER… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Tenant tol… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
