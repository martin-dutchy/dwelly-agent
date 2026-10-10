# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

What looked like a routine oven repair now includes a gassy smell reported by the tenant, so I treated it as an emergency. I sent the tenant gas safety advice and the 0800 111 999 number, escalated P1 to maintenance, and returned the ticket to auto mode.

## Where the case stands
Ticket at intake, no provider assigned. Tenant's reply says the oven is still faulty and mentions an intermittent gas smell, which makes this an emergency. Tenant has safety advice; P1 escalated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety advice: stop using the oven, no switches or flames, leave and call 0800 111 999 if gas is smelt, and a 24h target for an engineer | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to dispatch a Gas Safe engineer and phone the tenant | internal maintenance | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because you've noticed a gassy smell, please treat it as a safety issue, even if it's only now and then. Please don't use the oven or hob, and don't use any switches, flames or sparks near it. If you smell gas now, leave the flat, leave the door open behind you, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). Call 999 if anyone is in immediate danger. We're passing this to our team now as an emergency and will arrange for a qualified engineer to check the oven and the gas supply; our target is within 24 hours. We'll be in touch with the details.

## Escalation
- **P1 → maintenance** (verified): Tenant reports intermittent gassy smell near gas oven that also is not heating properly
  - Known: Ticket NBL-024 (oven not heating, stage init, no provider assigned). Event 006 (2026-08-05 email): tenant Imogen tried landlord/agent settings, oven still faulty since move-in, and mentions gassy smell near it sometimes. Tenant called it not urgent but gas smell is an emergency per policy. Tenant advised by email to stop using the oven, avoid switches/flames, leave and call 0800 111 999 if smelling gas. Manual attachment unseen. No landlord details or contractors on property record.
  - Missing: Whether the oven is gas; whether the smell is present now; landlord contact; Gas Safe engineer on file; gas safety record status.
  - Options: Dispatch emergency Gas Safe engineer today to check supply and oven; Phone tenant to confirm current situation and that gas emergency line was called
  - Recommendation: Dispatch a Gas Safe engineer within 24h as emergency make-safe without waiting for landlord approval, phone the tenant now, and inform the landlord.
  - Deadline: Same day

## What this does not establish
- The message does not confirm an engineer or appointment
- Does not establish the cause of the smell or that the oven is gas
- Landlord not yet informed

## Remaining work
- Maintenance team: dispatch an emergency Gas Safe engineer and phone the tenant
- Inform the landlord (no contact on the property record)
- Request the oven manual again (attachment unseen)
- Follow up on the original oven fault once the gas is made safe

## Missing or unavailable information
- Landlord contact and spend limit
- Contractors on file
- Whether the smell is present now
- Oven manual attachment unseen

## Conflicts between sources
- The tenant described the gas smell as 'not urgent'; policy treats any gas smell as an emergency, so I followed policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. The oven fault is unresolved and the tenant has now reported a gas smell. Outstanding: an emergency engineer visit, landlord notification, and the oven repair.

**2. What is the next action, who is it for, and through which channel?**

Safety email to Imogen (tenant), already sent, and a P1 escalation to the maintenance team to dispatch a Gas Safe engineer.

**3. Does anything need a human decision, and why?**

Yes. Under the gas policy a P1 human escalation is required to dispatch the engineer, because there is no contractor or landlord contact on the record.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports intermittent gassy smell near gas oven that also is not heating properly","kn… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
