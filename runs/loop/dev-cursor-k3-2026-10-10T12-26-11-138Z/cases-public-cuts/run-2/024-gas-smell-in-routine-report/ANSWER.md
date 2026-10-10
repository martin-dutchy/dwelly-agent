# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

What looked like a routine oven report contains a gas smell, so I treated it as an emergency. I sent the tenant safety advice and the gas line number, opened JOB-102 and escalated P1. I also asked the landlord to decide on the oven repair and put that ticket on hold.

## Where the case stands
Oven ticket at intake with no provider. Tenant reported a gas smell, so a separate emergency ticket JOB-102 is open and escalated P1 (ESC-103). Landlord approval for the oven repair is requested (APR-104), and the oven ticket is on hold until 2026-08-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to dispatch a Gas Safe engineer for the gas smell | Maintenance team | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Gave gas safety advice (leave, no switches/flames, call 0800 111 999) and said the oven should not be used | Imogen, tenant | email | A1 ✅ |
| 3 | SPLIT_NEW_REQUEST | Opened emergency gas ticket JOB-102 linked to the oven job | internal | internal | A2 ✅ |
| 4 | REQUEST_LANDLORD_APPROVAL | Told the landlord about the gas emergency and asked whether our contractor may inspect and repair the oven | Landlord | portal | A4 ✅ |
| 5 | WAIT | Oven ticket on hold for the landlord's decision, review 2026-08-07 | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. A gassy smell needs treating as an emergency, even if it only happens sometimes. Please: don't use the oven or hob, don't use any flames or light switches near it, open the windows, and leave the flat. Then call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If you are ever in immediate danger, call 999. We are arranging an urgent gas safety check and will also look at the oven not heating properly. Please don't use the oven until it has been checked. We will update you today.

**A4 · request_landlord_approval → Landlord (landlord)** (verified)

> FYI: tenant reports a gassy smell near the oven, so we are treating it as a gas emergency (JOB-102) and sending a Gas Safe engineer. Also the oven is not heating properly despite the settings tried. Do you approve our contractor to inspect and repair the oven?
> 
> Options: Yes, send your contractor to inspect and repair the oven; I will arrange my own contractor

## Escalation
- **P1 → maintenance** (verified): Gas smell reported near oven at Flat 6, 56 Juniper Mews, in a tenant email described as "not urgent"
  - Known: Tenant Imogen emailed 2026-08-05 01:12 (event 006): oven still not cooking after landlord-suggested settings, and a gassy smell near it sometimes. Tenant has been told to leave, avoid switches/flames, call 0800 111 999 (MSG-101). Emergency ticket JOB-102 opened, linked to NBL-024. No landlord message or contractor on file.
  - Missing: Whether the tenant has called the gas line; whether a Gas Safe engineer is on file; the gas safety record status; the cause of the smell (not confirmed to be the oven).
  - Options: Dispatch a Gas Safe engineer now as emergency make-safe; Wait for National Grid attendance, then engineer
  - Recommendation: Dispatch a Gas Safe engineer today under JOB-102 (emergency make-safe needs no approval), tell the landlord, and keep the oven repair (NBL-024) paused until the gas check is done.
  - Deadline: Immediately

## What this does not establish
- No engineer is booked yet and the cause of the smell is not confirmed to be the oven.
- No landlord approval for the oven repair has been given.
- The oven manual attachment was unavailable and I have not seen it.
- Nothing yet confirms the tenant has left the flat or called the gas line.

## Remaining work
- Human to dispatch a Gas Safe engineer under JOB-102 (maintenance, P1)
- Landlord decision on the oven repair; review 2026-08-07
- Tell the tenant when the engineer is booked
- Check the gas safety record

## Missing or unavailable information
- Gas Safe contractor on file
- Landlord reply
- Gas safety record status

## Conflicts between sources
- The tenant called the smell 'not urgent', but policy treats any gas smell as an emergency, so I followed policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven is still faulty with no provider assigned. The tenant has also reported a gas smell, which is now an emergency ticket (JOB-102). Outstanding: gas engineer dispatch, landlord decision on the oven repair, and the oven repair itself.

**2. What is the next action, who is it for, and through which channel?**

The safety email to the tenant has been sent. The P1 escalation to maintenance is done, to get a Gas Safe engineer out. The landlord has been told and asked about the oven repair.

**3. Does anything need a human decision, and why?**

Yes. A human needs to dispatch the gas engineer as a P1, because there is a possible gas leak and no gas contractor is on file for me to assign.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports a… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell reported near oven at Flat 6, 56 Juniper Mews, in a tenant email described as \"no… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-024-gas-smell-in-routine-report","decision_needed":"FYI: tenant reports a gassy smell near the oven… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Waiting for Landlord","comment":"Oven repair awaits landlord choice of contrac… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold |

## Failed or unverified actions
_None._
