# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's email reports a gassy smell near the oven, which is treated as a gas emergency and overrides the routine oven fault. I created emergency gas job JOB-101, emailed the tenant gas safety advice (leave, call 0800 111 999, do not use the oven), and escalated P1 (ESC-103) for an urgent Gas Safe visit. The landlord still needs telling about the smell.

## Where the case stands
Oven fault ticket NBL-024 is at provider selection with no provider. Event 006 reports a gassy smell near the oven, which is a gas emergency under policy. Emergency gas job JOB-101 is open and linked. No provider is assigned and the landlord has not been told about the smell.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Give the tenant gas safety advice: leave if smelling gas, call 0800 111 999, do not use the oven, and say an engineer is being arranged. | Imogen, tenant | email | A2 ✅ |
| 2 | OTHER | Open emergency gas job JOB-101 linked to the oven ticket NBL-024. | internal | internal | A1 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalate to maintenance (P1) to book a Gas Safe emergency visit today and decide on provider and spend. | Maintenance team | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen,
> 
> Thanks for letting us know, and sorry the oven still isn't cooking properly.
> 
> Because of the gassy smell, we are treating this as a gas safety matter, not a routine one. Please do this now:
> - If you smell gas at any time, open windows and doors, leave the flat, and do not use light switches, lighters, or any flames or electrical appliances.
> - Call the National Gas Emergency line on 0800 111 999 from outside the property, and follow their advice.
> - Do not use the oven until a Gas Safe engineer has checked it.
> 
> We have logged this as an urgent gas safety job and are arranging for a Gas Safe engineer to attend as soon as possible. We will confirm the visit time with you once it is booked. Please tell us if the smell gets stronger or you feel unwell.
> 
> Thanks,
> Northbridge Lettings

## Escalation
- **P1 → maintenance** (verified): Tenant reports an intermittent gassy smell near the oven (event 006). Gas smell is an emergency under policy. Needs a Gas Safe engineer to attend urgently and make safe. The landlord has not yet been told about the gas smell.
  - Known: Tenant Imogen, Flat 6, 56 Juniper Mews. Oven cooks far too slowly since moving in (event 001). Landlord Oliver suggested dial settings (event 003); tenant says they did not help (event 006). Tenant reports gassy smell "sometimes, not urgent" (event 006). Created JOB-101 (gas, emergency, ledger A1). Tenant told by email to leave and call 0800 111 999 if smelling gas, and not to use the oven (ledger message sent). No provider assigned yet.
  - Missing: No gas safety record or recent check on file. No Gas Safe engineer assigned. Landlord has not been told about the smell. Oven manual unseen.
  - Options: Assign a Gas Safe engineer today for an emergency visit and make safe (recommended); Ask the landlord to approve an engineer, then book; Isolate the oven supply until checked
  - Recommendation: Book a Gas Safe emergency visit for JOB-101 today, tell the landlord about the gas smell, and keep the oven off until checked.
  - Deadline: 2026-08-05 12:00 UTC

## What this does not establish
- Gas advice does not establish the cause of the smell or whether there is a leak.
- Creating JOB-101 does not assign an engineer or confirm a visit time.
- The landlord's dial-setting suggestion is not a diagnosis; the tenant says it did not help.
- No check of the oven manual, which was unavailable.

## Remaining work
- Maintenance (ESC-103): book a Gas Safe emergency visit for JOB-101 today and confirm the time with the tenant.
- Tell landlord Oliver about the gas smell and the emergency job. Not yet sent.
- Oven fault on NBL-024: assign a provider after the gas check. Landlord approval is needed for non-emergency spend.
- Obtain the gas safety record for the property if it is not on file.

## Missing or unavailable information
- Gas safety record
- Landlord approval for the engineer's spend
- Engineer visit time

## Conflicts between sources
- The tenant says the smell is 'not urgent'. Policy treats any gas smell as an emergency, so policy wins.
- The landlord says the cooker worked with the previous tenant. The tenant says it has never cooked properly since they moved in. The tenant's account is more recent and direct.

## Answers to the case questions
**1. Where does the case stand right now, and what is outstanding?**

The oven ticket NBL-024 is at provider selection with no provider. A gas smell has now been reported, so JOB-101 is open as an emergency. Outstanding: a Gas Safe visit, telling the landlord, and the oven fault after the gas check.

**2. What is the next action, who is it for, and through which channel?**

Tenant Imogen by email (A2): gas safety advice. Maintenance by internal escalation (A3): book an emergency Gas Safe visit today. Landlord Oliver should be told about the smell; that message is not yet sent.

**3. Does anything need a human decision, and why?**

Yes. Booking the gas engineer and approving spend need a maintenance human (P1) because gas is a safety matter and no provider is assigned. Booking an emergency make-safe does not need landlord approval, but the landlord must be told.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen, event 006… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"JOB-101",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports an intermittent gassy smell near the oven (event 006). Gas smell is an emerge… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
