# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

A routine oven complaint now includes a gas smell, which policy treats as an emergency despite the tenant calling it not urgent. I sent the tenant gas safety advice and the national gas emergency number, put the ticket on hold, and escalated P1 for an engineer.

## Where the case stands
Ticket at init, no provider assigned, on hold (review 2026-08-05). Tenant reports oven still faulty after trying landlord's settings and an intermittent gas smell. Safety advice sent; P1 escalated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety advice: don't use the oven, no flames or switches, ventilate, call 0800 111 999 if smell present, 999 if in danger; engineer being arranged | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 handover to book a Gas Safe engineer and inform landlord | internal maintenance | internal | A3 ✅ |
| 3 | WAIT | Ticket on hold, review today | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because you've noticed a gassy smell, please treat this as urgent. Please don't use the oven or hob, and don't use any flames or light switches near it. Open the windows, and if the smell is there now, leave the flat and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). Call 999 if anyone feels unwell or you are in immediate danger. We're arranging for an engineer to look at the oven and the smell, and a member of our team will be in touch shortly. Please don't use the oven until it has been checked.

## Escalation
- **P1 → maintenance** (verified): Tenant reports intermittent gas smell near oven (raised alongside a routine oven repair request)
  - Known: Ticket NBL-024 at init, no provider assigned. Tenant Imogen (event 006, 2026-08-05) says oven still not cooking after trying landlord's suggested settings, has been so since move-in, and there is 'a bit of a gassy smell near it sometimes'. Tenant called it not urgent but policy treats a gas smell as an emergency. Safety advice and 0800 111 999 sent to tenant by email (MSG-101). Ticket put on hold, review today. No contractor assigned; no landlord decision on record.
  - Missing: Whether the smell is present now; whether the oven is gas; no gas-safe engineer on record for the property; landlord not yet told. Oven manual attachment unseen.
  - Options: Book a Gas Safe engineer as an emergency/urgent make-safe and inform landlord; Phone tenant to confirm smell status first, then book
  - Recommendation: Book a Gas Safe engineer today to check the appliance and smell, treat as emergency make-safe, phone the tenant to check they are safe, and tell the landlord.
  - Deadline: Same day

## What this does not establish
- The safety message does not confirm a gas leak or that the oven is gas
- No engineer is booked and the cause of the poor cooking is unknown
- Landlord has not yet been told or approved anything

## Remaining work
- Human books Gas Safe engineer and tells landlord (maintenance)
- Confirm tenant safe and smell status
- Then the oven repair itself, after the gas check

## Missing or unavailable information
- Whether smell is present now
- Whether the oven is gas or electric
- Oven manual attachment unseen

## Conflicts between sources
- Tenant calls the gas smell 'not urgent'; policy treats any gas smell as an emergency, so I treated it as one.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. The tenant says the landlord's settings did not help and reports a gassy smell. Outstanding: an engineer visit, informing the landlord, and confirming the tenant is safe.

**2. What is the next action, who is it for, and through which channel?**

Safety advice by email to Imogen (sent). A P1 handover to the maintenance team to book a Gas Safe engineer and tell the landlord.

**3. Does anything need a human decision, and why?**

Yes. A gas smell is a P1 safety issue and the engineer booking needs to be arranged and the landlord informed today.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Other","comment":"Gas smell reported; P1 escalated for engineer booking. Revie… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports intermittent gas smell near oven (raised alongside a routine oven repair requ… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
