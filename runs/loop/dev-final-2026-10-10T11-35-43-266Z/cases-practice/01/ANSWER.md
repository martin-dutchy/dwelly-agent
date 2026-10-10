# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler and called it not urgent; this is a suspected gas leak with an 82-year-old present. I sent evacuation and gas-line advice, opened emergency job JOB-102, assigned HeatRight, told the landlord and escalated P1.

## Where the case stands
Emergency gas job JOB-102 at visit stage, HeatRight assigned; P1 escalation ESC-103 open; waiting on tenant to confirm she is safe and on engineer attendance.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety instructions: evacuate, no switches/flames, call 0800 111 999, 999 if unwell | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign HeatRight Ltd for emergency make-safe | HeatRight Ltd, contractor | portal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to confirm evacuation and engineer attendance | internal maintenance | internal | A4 ✅ |
| 4 | OTHER | Inform landlord Ben Hartley of emergency and contractor | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can be a gas leak, so please treat it as an emergency, even though it feels minor. Please do this now: 1) Don't use the boiler, light switches, flames or anything that could spark. 2) Open doors and windows. 3) Get everyone out of the flat, including your flatmate's mum, and wait outside. 4) Call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If anyone feels unwell (headache, dizzy, sick), call 999. We are sending a Gas Safe engineer and our team has been alerted tonight. Please message us once you are outside and safe. Please don't go back in until the gas engineer says it's safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight at 22:40 your tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We are treating it as a gas emergency: she has been told to leave, avoid switches and flames, and call the National Gas Emergency line (0800 111 999). We have instructed HeatRight Ltd (your preferred boiler contractor) to attend as an emergency make-safe (job JOB-102). We will update you on the engineer's findings and on any quote over your £300 limit before further work.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours
  - Known: Tenant Amelia Clarke (T-1001) WhatsApp 22:40 9 Oct: eggy smell when boiler fires, called it 'not urgent'. Elderly (82) guest present. Tenant told to evacuate, no switches/flames, ring 0800 111 999 (MSG-101). JOB-102 emergency created; HeatRight Ltd (Gas Safe 550123, out of hours) assigned. Landlord Ben Hartley being informed.
  - Missing: Tenant has not yet confirmed she is outside/safe or called the gas line; HeatRight attendance time unconfirmed.
  - Options: Phone tenant to confirm evacuation; Phone HeatRight to confirm attendance; fall back to Swift Plumbing & Heating (C-12); Arrange emergency accommodation if the flat is capped
  - Recommendation: Call tenant and HeatRight now to confirm evacuation and engineer attendance; do not let anyone re-enter until Gas Safe clears it.
  - Deadline: Immediately

## What this does not establish
- Assigning HeatRight does not confirm the engineer's attendance time or the cause of the smell
- No spend approved beyond the £300 limit; no quote yet
- Not confirmed the tenant has left the flat

## Remaining work
- Human to phone tenant and HeatRight tonight (ESC-103)
- Engineer findings, any quote to landlord (call before over £300)
- Gas safety record/certificate to file; tenant to be updated
- Separate tap job R-4801 unchanged (15 Oct)

## Missing or unavailable information
- Whether tenant is outside and has called the gas line
- HeatRight confirmed arrival time

## Conflicts between sources
- Tenant says 'not urgent' but symptoms indicate a gas emergency; trusted the symptoms.

## Answers to the case questions
**1. 1. Severity and why?**

Emergency. A rotten-egg smell from a gas boiler is a suspected gas leak whatever the tenant says; an 82-year-old is also in the flat.

**2. 2. What do you tell the tenant, in order?**

Don't use the boiler, switches or flames; open windows; leave the flat with everyone; call 0800 111 999 from outside; 999 if anyone is unwell; engineer being sent; message when safe; don't re-enter until cleared.

**3. 3. Actions tonight?**

Created emergency job JOB-102, assigned HeatRight Ltd (preferred, Gas Safe, out of hours), P1 escalation ESC-103, emailed landlord Ben. Tap job R-4801 left alone.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from comb… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 (emergency attendance, target within … | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours","known":"Tenant Amelia… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
