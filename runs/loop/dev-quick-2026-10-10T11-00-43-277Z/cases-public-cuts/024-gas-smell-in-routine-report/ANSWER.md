# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's oven complaint has become a possible gas emergency because she reported an intermittent gassy smell near the oven. I sent her safety advice (leave if smelling gas, no switches or flames, call 0800 111 999) and added a ticket note. I escalated to maintenance as P1 (ESC-102) to dispatch a Gas Safe engineer today, since no engineer or landlord approval exists yet.

## Where the case stands
Ticket NBL-024 is at stage init. The oven fault has been reported since move-in and the landlord's dial suggestion (event 003) did not fix it. The tenant has now reported an intermittent gassy smell near the oven (event 006), which is treated as a gas emergency. No engineer is booked and no landlord approval or spend cap is recorded. Waiting on the tenant's reply and on a human to dispatch an engineer.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety advice sent to tenant: leave if the smell is present, avoid switches and flames, call the National Gas Emergency line 0800 111 999, do not use the oven until checked, and reply on whether gas can be smelt now. | Imogen, tenant | email | A1 ✅ |
| 2 | OTHER | Ticket note added recording the gas-smell emergency, the safety advice given and the escalation. | internal | internal | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalated as P1 to maintenance (ESC-102) to dispatch a Gas Safe engineer today, make the oven safe and inform landlord Oliver. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen,
> 
> Thank you for telling us about the smell. Because it's a gas smell, we are treating it as an emergency, even though you said it isn't urgent.
> 
> Please do these things now:
> - If you can smell gas now, open the windows and leave the flat. Don't use any switches, the cooker, lights or flames while you are in there, and don't stay inside.
> - From outside the property, or from a neighbour's, call the National Gas Emergency line on 0800 111 999. Do this straight away, even if the smell has gone.
> - Don't turn the oven on again until a gas engineer has checked it.
> 
> We are arranging for a gas engineer to inspect the oven and the smell as an emergency. We'll contact you as soon as we have a confirmed time. Please reply to this email to let us know whether you can smell gas right now.
> 
> Thanks,
> Northbridge Lettings

## Escalation
- **P1 → maintenance** (verified): Possible gas leak at Flat 6, 56 Juniper Mews. Tenant Imogen reports an intermittent gassy smell near the oven (event 006). Policy treats gas smell as an emergency. Needs a Gas Safe engineer urgently and a decision on who attends and the landlord's authority.
  - Known: Tenant reports the oven has not cooked properly since move-in (food still raw after 1.5 hours). Tenant also reports an intermittent gassy smell near the oven (event 006, 2026-08-05 01:12 UTC), which she called 'not urgent'. Landlord Oliver suggested dial and heat settings (event 003); tenant says these did not help. Safety advice sent to tenant as ledger A1: leave if smell present, no switches or flames, call 0800 111 999. Ticket NBL-024 is at stage init. Landlord approval for the repair not yet recorded.
  - Missing: Whether gas is currently detectable. No Gas Safe engineer booked. No landlord approval or spend cap recorded. No property tenancy record or preferred contractor on file. Tenant's reply to the safety message is not yet received.
  - Options: Dispatch a Gas Safe engineer as an emergency today and make the oven safe (isolate gas if a leak is confirmed); Ask the landlord to approve the emergency visit and any repair cost; Confirm the smell with tenant before deciding the visit slot
  - Recommendation: Treat as a gas emergency now. Get a Gas Safe engineer out today to test for a leak and make the oven safe. Inform landlord Oliver of the emergency visit and repair. Do not use the oven until it's checked.
  - Deadline: 2026-08-05 09:00 UTC

## What this does not establish
- Sending safety advice does not confirm a gas leak or its cause.
- No engineer has been booked or assigned, so no visit time exists.
- Landlord has not approved any repair spend.
- The oven fault itself is not diagnosed; the dial settings suggestion is unverified and the manual is unseen.

## Remaining work
- Maintenance team (ESC-102): dispatch a Gas Safe engineer today, make safe, and book the visit with the tenant.
- Maintenance team: inform landlord Oliver of the emergency and get approval for the repair cost.
- Tenant reply to the safety message is awaited; follow up if no reply.

## Missing or unavailable information
- Whether gas can be smelt now.
- Landlord approval and spend cap for the repair.
- Gas safety record and any engineer history for the property.
- Tenancy record and preferred contractor for the property.

## Conflicts between sources
- Tenant calls the smell 'not urgent' but gas smell is an emergency under policy; policy followed.
- Landlord's suggested oven settings (event 003) conflict with the tenant's report that the oven still does not work (event 006); tenant's report is more recent and taken as fact.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage init. The oven fault is unresolved and the tenant has reported a gas smell, which is an emergency. Outstanding: a Gas Safe engineer visit (none booked), landlord approval and cap, the tenant's reply on whether gas can be smelt now, and the oven diagnosis.

**2. What is the next action, who is it for, and through which channel?**

Safety message to Imogen (tenant) by email on the existing thread (done, A1). Maintenance escalation ESC-102 (done, A3) to dispatch an engineer today and inform landlord Oliver. Ticket note (done, A2).

**3. Does anything need a human decision, and why?**

Yes. Dispatching a gas engineer and deciding the landlord cost approval need maintenance staff. The gas-smell emergency is a safety matter and needs a human to act today. I could not book a contractor because no assigned contractor or landlord approval exists on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"SAFETY: Tenant (event 006, 2026-08-05 01:12 UTC) reports an intermittent gassy smell ne… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at Flat 6, 56 Juniper Mews. Tenant Imogen reports an intermittent gassy sm… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
