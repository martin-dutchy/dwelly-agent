# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's latest email reports the oven is still not cooking properly and a sometimes-gassy smell near it. Because of the smell, I sent gas safety advice to the tenant (A1) and escalated to maintenance as P1 for an emergency Gas Safe visit (A2, ESC-102). No contractor was assigned and no visit is booked.

## Where the case stands
Oven repair job at Flat 6, 56 Juniper Mews. Provider not yet assigned; landlord has not approved a contractor. Event 006 adds a gassy smell near the oven, which is a gas safety emergency under policy even though the tenant called it not urgent. The job is now with a human maintenance escalation (ESC-102) for an urgent gas check.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Send the tenant gas safety advice (leave the property, no switches or flames, call 0800 111 999, 999 if in danger) and say the smell report is being passed to maintenance as a priority. | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate to maintenance as P1 for an emergency Gas Safe visit and the smell report, and ask them to book it and inform the landlord. | internal maintenance team | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen,
> 
> Thank you for letting us know about the oven, and for mentioning the gassy smell.
> 
> Because of the smell, please treat this as a safety matter now:
> - If you smell gas at any time, open the windows and doors if it is safe, and leave the property.
> - Do not use any light switches, electrical appliances, lighters or flames while you can smell it.
> - Once you are outside, call the National Gas Emergency line on 0800 111 999, even if the smell has gone.
> - If you are in immediate danger, call 999.
> 
> We are passing the smell report to our maintenance team as a priority, and the oven visit will be arranged alongside it. We will confirm the visit details with you once they are booked. Please let us know straight away if the smell gets stronger or you feel unwell.
> 
> Thanks,
> Northbridge Lettings

## Escalation
- **P1 → maintenance** (verified): Tenant reports an intermittent gassy smell near the oven at Flat 6, 56 Juniper Mews (event 006). Gas smell is an emergency under policy, even though the tenant called it not urgent. Needs a gas engineer to attend and a Gas Safety check before the oven is used further.
  - Known: Event 001/002: oven not cooking properly (food takes over double time), request logged, provider selection pending. Event 003: landlord Oliver suggested oven dial settings (manual unseen). Event 006 (2026-08-05 01:12 UTC): tenant says settings did not help, problem since they moved in, and a gassy smell near the oven sometimes. Tenant sent safety advice (leave, no switches or flames, call 0800 111 999) by email on the existing thread.
  - Missing: No gas engineer assigned. No provider selected. Landlord has not approved a contractor. Manual attachment unseen. Unknown whether the smell is current or if a gas safety record exists for the property.
  - Options: Dispatch a Gas Safe engineer as an emergency visit now and tell the landlord; Ask the landlord to approve a Gas Safe contractor by name, if their approval is needed for the gas check; Ask the tenant to stop using the oven until it has been checked
  - Recommendation: Treat as gas emergency: send a Gas Safe engineer as soon as possible, confirm the visit with the tenant, and inform the landlord. Keep the oven off until checked.
  - Deadline: 2026-08-05 12:00 UTC

## What this does not establish
- The safety message does not confirm the cause of the smell or the oven fault.
- No contractor has been assigned or booked, and no visit date exists.
- The landlord's dial-setting suggestion is not a repair result and the manual was not seen.
- No landlord approval for spend has been recorded.

## Remaining work
- Maintenance: book a Gas Safe engineer to attend the gas smell and oven, and confirm the visit with the tenant (ESC-102).
- Landlord (Oliver): inform of the gas smell report and ask for approval or a preferred Gas Safe contractor if their approval is needed. No landlord message was sent in this run.
- Tenant: confirm the visit once booked; no date has been promised.

## Missing or unavailable information
- Whether a current Gas Safety Record exists for the property.
- Whether the landlord wants to use a particular contractor.
- Contents of the oven manual attachment (unseen).

## Conflicts between sources
- Tenant calls the smell 'not urgent', but policy treats any gas smell as an emergency. Policy was followed.
- Landlord's event 003 suggests the oven worked under the previous tenant, while the tenant says it has never cooked properly since move-in. Not resolved; the engineer should check.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider selection is still open and no contractor is assigned. The tenant reported on 2026-08-05 (event 006) that the landlord's dial settings did not help and that there is an intermittent gassy smell. That smell is now a P1 gas safety matter, awaiting a Gas Safe visit (ESC-102). The landlord has not been told about the smell and has not approved a contractor.

**2. What is the next action, who is it for, and through which channel?**

Tenant Imogen by email on the existing thread: gas safety advice (A1). Maintenance team by internal escalation: book an emergency Gas Safe visit (A2). Landlord Oliver should be told of the smell report, but that message was not sent in this run.

**3. Does anything need a human decision, and why?**

Yes. The gas smell needs a maintenance human to dispatch a Gas Safe engineer now, because gas smell is an emergency under policy even though the tenant called it not urgent. The landlord's approval for the spend is also still needed if they must approve it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"Case 024"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports an intermittent gassy smell near the oven at Flat 6, 56 Juniper Mews (event 0… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
