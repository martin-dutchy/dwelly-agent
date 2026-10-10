# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant asked for an oven repair and mentioned a gassy smell near the oven. I treated this as a gas emergency. I emailed the tenant to leave and call 0800 111 999, noted the ticket, and escalated P1.

## Where the case stands
Ticket at init. Tenant replied that the landlord's settings advice failed and mentioned a gassy smell near the oven. Treated as a gas emergency. Tenant has been given safety advice and a P1 escalation is open. No contractor assigned. Landlord and spend details are not on the property record.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant to leave, avoid switches and flames, call 0800 111 999 (999 if in danger), and not use the oven. Gave a same-day / 24h target. | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation for an emergency gas engineer and a phone check with the tenant | internal maintenance | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because you've noticed a gassy smell, please treat this as a possible gas leak. Please don't use the oven or hob, and don't use any light switches, flames or electrical appliances near it. Open the windows if you can, leave the flat now, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels unwell or you are in immediate danger, call 999. Please don't go back in until the gas engineer says it's safe. We are arranging an urgent gas safety check and will treat the oven repair as part of it. Our target is same day / within 24 hours. We'll be in touch shortly.

## Escalation
- **P1 → maintenance** (verified): Tenant reports gassy smell near the oven (event 006) on a ticket logged as routine oven repair. Possible gas leak = emergency.
  - Known: Ticket NBL-024 at init stage. Oven undercooking since move-in; landlord's agent Oliver suggested settings (event 003), tenant says no change. Tenant Imogen emailed 2026-08-05 01:12 mentioning a gassy smell near the oven 'sometimes'. Advised her by email to leave, avoid switches/flames, and call 0800 111 999. No landlord, spend limit or contractor on the property record.
  - Missing: Whether she has left and called the gas line; landlord contact and gas safety record status; gas contractor; whether the smell is the oven or supply.
  - Options: Dispatch emergency gas engineer now to make safe and inspect the oven and supply; Phone tenant to confirm she is out and has called the gas line
  - Recommendation: Phone the tenant now, send an emergency gas engineer same day, and keep the oven off until it is certified safe. Then do the oven repair.
  - Deadline: Immediately

## What this does not establish
- The message does not confirm a leak, its source, or that the oven is the cause.
- No engineer is booked yet and no appointment has been promised.
- The oven fault is not diagnosed, and nobody has decided who pays.

## Remaining work
- Maintenance team: phone the tenant and book an emergency gas engineer.
- Check the gas safety record and landlord details, then inform the landlord.
- After the gas check, repair or replace the oven.
- Confirm the tenant is safe and the smell is resolved before closing.

## Missing or unavailable information
- Landlord contact and spend limit are not on the property record.
- The oven manual attachment was unavailable.
- Whether the tenant has left and called the gas line.

## Conflicts between sources
- Tenant calls the gas smell 'not urgent', but policy treats any gas smell as an emergency. I followed policy.
- The landlord's agent suggested user error, but the tenant says the problem has been there since move-in.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The ticket is at init and the landlord's settings advice has failed. The tenant has now reported a gassy smell, so this is a gas emergency. Outstanding: an emergency gas check and make-safe, then the oven repair, and informing the landlord.

**2. What is the next action, who is it for, and through which channel?**

Gas safety advice by email to the tenant Imogen (sent), plus a P1 escalation to the maintenance team for an emergency engineer and a phone check.

**3. Does anything need a human decision, and why?**

Yes. A human needs to authorise and dispatch the emergency gas engineer. Gas is a safety emergency, no contractor or landlord details are on record, and the policy requires a P1 escalation for gas.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports gassy smell near the oven (event 006) on a ticket logged as routine oven repa… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Severity raised to EMERGENCY: tenant reports gassy smell near the oven (event 006). Ten… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |

## Failed or unverified actions
_None._
