# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant asked for an oven visit and mentioned a gassy smell as "not urgent". I treated that as a gas emergency. I opened JOB-101, sent the tenant gas safety advice, escalated P1, and paused the oven job.

## Where the case stands
Oven job at intake, no provider or landlord decision, now on hold to 2026-08-06. Emergency gas job JOB-101 opened and escalated P1 (ESC-103). Tenant given safety advice.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice: leave, no switches or flames, call 0800 111 999, 999 if in danger | Imogen, tenant | email | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to dispatch a Gas Safe engineer and inform the landlord | internal maintenance | internal | A3 ✅ |
| 3 | WAIT | Oven job on hold until gas check done; review 2026-08-06 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for telling us. Please treat the gas smell seriously. Please don't use the oven or hob, don't use any switches or flames, open the windows, and leave the property. Then call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If you are in immediate danger, call 999. We have raised this as an emergency and a person at the agency is being told now. We will also get the oven looked at, and the engineer can check both. Please don't go back in until the gas engineer says it is safe.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak reported by tenant alongside oven fault
  - Known: Tenant Imogen (event 006, 2026-08-05) reports a gassy smell near the oven sometimes, and that the oven still does not cook after following the landlord's suggested settings. Emergency ticket JOB-101 opened, linked to NBL-024. Tenant told to leave, avoid switches and flames, and call 0800 111 999. No property record details or landlord contact on file.
  - Missing: Landlord contact and spend limit, whether the gas supply is isolated, the gas safety record date, a contractor on file.
  - Options: Send a Gas Safe engineer now to make safe and check the oven and pipework; Contact the landlord and tell them
  - Recommendation: Dispatch a Gas Safe engineer today (emergency make-safe needs no approval), inform the landlord, then deal with the oven fault on the original ticket.
  - Deadline: Immediately

## What this does not establish
- No engineer is booked yet; the escalation asks for dispatch.
- The cause of the smell and the oven fault are not established.
- The landlord has not been told yet; no contact on file.
- The manual attachment was never seen.

## Remaining work
- Maintenance team: dispatch Gas Safe engineer and tell landlord (JOB-101)
- Then landlord approval and provider for oven fault
- Tenant confirmation that the property is safe

## Missing or unavailable information
- Landlord contact and spend limit
- Gas safety record status
- Contents of oven manual

## Conflicts between sources
- Tenant calls the gas smell 'not urgent', but policy treats any gas smell as an emergency; I followed policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven repair is at intake with no provider. The tenant reports the landlord's settings advice failed and mentioned a gas smell. The gas emergency, landlord decision and oven repair are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Safety advice was sent to Imogen by email, and a P1 escalation to maintenance asks for a Gas Safe engineer to be dispatched.

**3. Does anything need a human decision, and why?**

Yes. A P1 human should dispatch the engineer and contact the landlord, because the suspected gas leak is a safety emergency and no contractor or landlord contact is on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports a… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak reported by tenant alongside oven fault","known":"Tenant Imogen (event 00… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Other","comment":"Oven fault job paused until the gas safety check (JOB-101) i… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold |

## Failed or unverified actions
_None._
