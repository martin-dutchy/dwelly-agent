# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

A routine oven-not-heating job became an emergency when the tenant mentioned a gas smell. She was given gas safety advice, a P1 escalation was raised, the ticket was noted, and the landlord was informed and asked to confirm our contractor.

## Where the case stands
Ticket at init, no provider assigned. Tenant's reply (event 006) adds a gas smell, so the job is now an emergency. Tenant advised; P1 escalation raised; landlord asked to confirm contractor.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant to leave, avoid switches/flames, call 0800 111 999 (999 if in danger) | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to dispatch a Gas Safe engineer | internal maintenance | internal | A2 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Informed landlord and asked to confirm our contractor | Oliver, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. A smell of gas needs treating as an emergency, even if it only happens sometimes. Please do not use the oven, light switches, flames or anything that could spark. Open the windows, leave the flat and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels unwell or you are in immediate danger, call 999. Please don't go back in until you've been told it's safe. We are arranging an urgent gas safety check and the oven repair, and will be in touch again today.

**A4 · request_landlord_approval → Oliver (landlord)** (verified)

> Tenant reports a gas smell near the oven and the oven still not heating after your settings suggestion. We have told her to leave, call the gas emergency line and not use it. Please confirm we may send our Gas Safe contractor to inspect and make safe.
> 
> Options: Yes, send your Gas Safe contractor (recommended); I will arrange my own contractor

## Escalation
- **P1 → maintenance** (verified): Tenant reports intermittent gas smell near the oven (event 006), alongside oven not heating
  - Known: Ticket NBL-024 at init, no provider assigned. Tenant Imogen emailed 2026-08-05 01:12: oven still not cooking since move-in, "gassy smell near it sometimes". Landlord (Oliver) had suggested dial settings, which did not help. Tenant has been told by email to leave, avoid switches/flames, call 0800 111 999. Property record has no contractor or spend limit listed.
  - Missing: Whether the gas emergency service has attended; gas-safe engineer availability; landlord approval; gas safety record status.
  - Options: Dispatch Gas Safe engineer now to inspect cooker and supply, make safe; Wait for National Gas Emergency outcome then book engineer
  - Recommendation: Dispatch a Gas Safe engineer today as emergency make-safe, tell the landlord, and keep the oven isolated until cleared.

## What this does not establish
- Advice and escalation do not confirm a gas leak or the oven fault's cause
- No contractor assigned or visit booked
- No appointment date promised to the tenant

## Remaining work
- Human to dispatch Gas Safe engineer today (ESC-102)
- Landlord answer to APR-103
- Oven repair after gas check
- Confirm tenant safe and outcome of gas emergency call
- Check gas safety record

## Missing or unavailable information
- Oven manual attachment unseen
- Contractor and spend limit not on property record
- Gas safety record status

## Conflicts between sources
- Tenant calls the gas smell 'not urgent', but policy treats any gas smell as an emergency.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Ticket at init with no provider. The tenant says the oven still doesn't cook after the landlord's settings suggestion, and reports a gas smell. Outstanding: gas safety inspection and make-safe, landlord response, oven repair.

**2. What is the next action, who is it for, and through which channel?**

Gas safety advice emailed to the tenant (A1). Landlord approval request sent (A4). P1 escalation to the maintenance team (A2).

**3. Does anything need a human decision, and why?**

Yes, P1: a gas smell is an emergency, and a human must dispatch a Gas Safe engineer, as no contractor is on the property record.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports intermittent gas smell near the oven (event 006), alongside oven not heating"… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Severity raised to EMERGENCY: tenant reports gas smell near oven (event 006). Tenant gi… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A4 | `request_landlord_approval` | {"landlord":"Oliver","ticket_ref":"NBL-024-gas-smell-in-routine-report","decision_needed":"Tenant reports a gas smell near the oven and the … | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
