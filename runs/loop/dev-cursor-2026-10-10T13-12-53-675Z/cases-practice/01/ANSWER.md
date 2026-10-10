# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant called a rotten-egg boiler smell 'not urgent', but it is a suspected gas leak with an 82-year-old present, so I treated it as an emergency. I sent evacuation and gas-line advice, opened JOB-102, assigned HeatRight out of hours, informed the landlord and escalated P1.

## Where the case stands
Emergency JOB-102 at visit stage, HeatRight assigned for out-of-hours window; tenant told to evacuate; P1 escalation ESC-103 open; landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety message: leave, no switches/flames, ventilate, call 0800 111 999, 999 if danger | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign HeatRight Ltd for emergency gas call-out tonight | HeatRight Ltd | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation: phone HeatRight and tenant to confirm attendance and evacuation | internal | internal | A4 ✅ |
| 4 | OTHER | Inform landlord by email | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can mean a gas leak, so please treat it as urgent tonight. Please: 1) Don't use switches, flames or the boiler. 2) Open windows and doors. 3) Get everyone out of the flat, including your flatmate's mum, and wait outside. 4) Call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If anyone feels unwell or it's an immediate danger, call 999. We're sending a Gas Safe engineer and our team has been alerted. Please don't go back in until the gas engineer says it's safe. Please reply once you're out safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight at 22:40 the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We've treated it as a gas emergency: she's been told to leave, ventilate and call the Gas Emergency line, and we've booked an out-of-hours call-out with HeatRight Ltd (Gas Safe) under JOB-102. The boiler should stay off until it's been checked. We'll update you once the engineer has reported, and will call before any spend over £300.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak (rotten-egg smell at boiler), Flat 4, 12 Mare Street, out of hours; elderly visitor present
  - Known: Tenant Amelia Clarke WhatsApp 22:40 9 Oct: eggy smell when boiler fires, called it 'not urgent'. 82-year-old staying. Tenant told to leave, ventilate, call 0800 111 999 (MSG-101). Emergency JOB-102 created; HeatRight Ltd (Gas Safe 550123, out of hours) assigned.
  - Missing: Tenant has not yet confirmed she is out; HeatRight attendance not confirmed; no phone calls possible from this run.
  - Options: Phone HeatRight to confirm attendance tonight; Fallback to Swift Plumbing & Heating (Gas Safe 551987); Phone tenant to confirm evacuation
  - Recommendation: Phone HeatRight now to confirm attendance and phone tenant to confirm she is outside; fall back to Swift if no answer.
  - Deadline: Immediately

## What this does not establish
- Assignment does not confirm HeatRight has accepted or will attend.
- Does not establish a leak exists; the engineer must confirm.
- Tenant has not confirmed she has left the flat.

## Remaining work
- Human to phone HeatRight (fallback Swift) and the tenant tonight
- Engineer report, then landlord and tenant update
- Existing tap job R-4801 (15 Oct) unaffected

## Missing or unavailable information
- Tenant confirmation she is out and safe
- HeatRight confirmation of attendance

## Conflicts between sources
- Tenant says 'not urgent' but symptoms indicate a gas emergency; trusted the symptoms.

## Answers to the case questions
**1. 1. Severity and why?**

Emergency. A rotten-egg smell at a gas boiler is a suspected gas leak whatever the tenant says; an 82-year-old is also in the flat. The tenant's 'not urgent' and 'not too early' don't change that.

**2. 2. What do you tell the tenant, in order?**

Don't use switches, flames or the boiler; open windows; everyone leaves including the elderly visitor; call 0800 111 999 from outside; 999 if anyone is unwell or in danger; engineer is being sent; don't re-enter until cleared; reply when out safe.

**3. 3. Actions tonight?**

Created emergency JOB-102 (separate from tap job R-4801), assigned HeatRight Ltd (Gas Safe, out of hours, landlord's preferred) without waiting for approval, emailed landlord Ben, escalated P1 as ESC-103 for phone confirmation with fallback to Swift.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg smell from Worcester … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:30-2026-10-10 02:00 (emergency out-of-hours call-out)"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak (rotten-egg smell at boiler), Flat 4, 12 Mare Street, out of hours; elder… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
