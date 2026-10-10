# Case 01: ANSWER

**Outcome:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler, which is a suspected gas leak, and called it 'not urgent'. I told her to evacuate and call 0800 111 999, opened emergency JOB-102, assigned HeatRight Ltd, emailed the landlord and escalated P1.

## Answers
**1. 1. What severity is this and why?**

Emergency. A rotten-egg smell when a gas boiler fires means a suspected gas leak, whatever the tenant says. An 82-year-old visitor is also in the flat. The tenant's 'not urgent' doesn't change the severity.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

(1) Treat it as an emergency. (2) No switches, flames or electrics, and don't turn the boiler back on. (3) Open windows and doors and get everyone out, including the elderly visitor. (4) From outside, call 0800 111 999, or 999 if anyone feels unwell. (5) An engineer is being arranged, with a target of within 24h. (6) Reply once safe. The bin question is not relevant.

**3. 3. Which actions do you take tonight?**

I created emergency job JOB-102 and assigned HeatRight Ltd (the landlord's preferred Gas Safe contractor, out of hours) for 10 Oct 08:00-12:00. I emailed Ben, the landlord, and escalated as P1 (ESC-103) so a human can phone the tenant and get HeatRight to attend tonight if possible. Make-safe work needs no landlord approval. I will contact Ben before any spend over £300.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","tenant":"T-1001","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worc… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-10 08:00-12:00"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours, 82-year-old visitor pres… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Escalations
- **P1 → maintenance** (verified): Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours, 82-year-old visitor present
  - Known: Tenant Amelia Clarke WhatsApp 22:40 9 Oct: eggy smell when boiler fires (Worcester 30i, 2017), CO alarm in kitchen. Tenant called it 'not urgent'. Flatmate's 82-year-old mum staying. Tenant sent evacuation and 0800 111 999 advice (MSG-101). Emergency JOB-102 created and HeatRight Ltd (Gas Safe 550123, out of hours) assigned for 2026-10-10 08:00-12:00 window as target. Landlord Ben Hartley being informed.
  - Missing: Whether tenant has left and called National Gas Emergency; whether HeatRight has confirmed attendance; whether the engineer can attend earlier tonight; whether anyone has symptoms.
  - Options: Phone HeatRight out-of-hours line (+447700900311) to attend tonight; Fall back to Swift Plumbing & Heating (+447700900312); Phone tenant to confirm they are out safely
  - Recommendation: Phone tenant now to confirm evacuation, and get HeatRight to confirm attendance tonight or first thing; fall back to Swift if no answer. Make-safe needs no landlord approval.
  - Deadline: Immediately

## Failed or unverified actions
_None._
