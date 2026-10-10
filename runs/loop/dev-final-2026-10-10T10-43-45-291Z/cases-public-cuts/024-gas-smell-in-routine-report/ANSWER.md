# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

A routine oven repair ticket now includes the tenant mentioning a gassy smell near the oven, which is treated as a gas emergency. I sent the tenant gas safety advice and a 24h target, noted the ticket and escalated P1 for a Gas Safe engineer.

## Where the case stands
Ticket at init; no provider assigned; tenant's reply says settings advice failed and mentions a gas smell. Gas emergency advice sent; P1 escalated; awaiting human dispatch of Gas Safe engineer.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Send gas safety advice (leave, no switches, call 0800 111 999, don't use the oven) and a 24h target for an engineer | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to dispatch Gas Safe engineer as emergency make-safe | internal maintenance | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Please treat the gassy smell as serious. If you can smell gas now or it comes back: leave the flat, leave doors open behind you, don't use light switches, flames or anything electrical, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If you are ever in immediate danger call 999. Please don't use the oven until it's been checked. We are arranging for an engineer to look at the oven and the smell as a priority, with the target of within 24 hours. We'll be in touch with the visit details. Thank you.

## Escalation
- **P1 → maintenance** (verified): Tenant reports gassy smell near the oven in an oven repair ticket; possible gas leak, emergency
  - Known: Ticket NBL-024 at init stage. Tenant Imogen (event 006, 2026-08-05 01:12) says oven not cooking since move-in, manual settings from landlord/agent didn't help, and 'gassy smell near it sometimes'. No provider assigned, no landlord/contractor records on property. Tenant has been sent gas emergency advice (leave, no switches, 0800 111 999).
  - Missing: Whether the smell is present now; whether the oven is gas; property gas safety record date; landlord contact and spend limit; known gas-safe contractor.
  - Options: Dispatch Gas Safe engineer as emergency make-safe today; Confirm National Grid has attended then book oven repair
  - Recommendation: Book a Gas Safe engineer today as emergency make-safe, with no approval wait; inform landlord; check gas safety record.
  - Deadline: Same day, immediately

## What this does not establish
- Advice and escalation do not confirm a gas leak or its source
- No engineer is booked yet and no appointment is promised
- Does not establish the oven fault cause or who pays

## Remaining work
- Human to dispatch a Gas Safe engineer today (maintenance)
- Inform landlord and check gas safety record
- Then repair the oven (original fault) once the gas check is done
- Confirm tenant is safe

## Missing or unavailable information
- Whether the smell is present now
- Whether the oven is gas or electric
- Landlord contact, spend limit and contractors not on the property record
- Oven manual unseen

## Conflicts between sources
- Tenant calls the smell 'not urgent' but any gas smell is treated as an emergency per policy
- Landlord/agent suggested wrong settings; tenant says the fault has existed since move-in

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Ticket is at init with no provider. The landlord's settings advice failed. The tenant has asked for a visit and reported a gas smell. Engineer attendance, landlord notification and the oven repair are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Emergency gas safety advice by email to Imogen (tenant) on the existing thread, plus a P1 escalation to maintenance to dispatch a Gas Safe engineer.

**3. Does anything need a human decision, and why?**

Yes: P1 dispatch of a gas engineer, because of possible gas leak risk and because no contractor or landlord details are on record.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports gassy smell near the oven in an oven repair ticket; possible gas leak, emerge… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Reclassified to EMERGENCY: tenant reports gas smell near oven (event 006). Safety advic… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |

## Failed or unverified actions
_None._
