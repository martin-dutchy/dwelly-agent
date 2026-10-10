# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's washing machine report is logged as routine and the tenant has been told the landlord must decide on repair or replacement. The job is on hold until 2025-08-02 and management has been asked for the landlord's contact, because none is on the property record.

## Where the case stands
Ticket NBL-038-tenant-own-appliance is at init, logged as routine. The tenant reports the landlord-supplied LG washing machine has a power failure and cannot be repaired. They offer to buy a replacement but want to know whether it would stay with the flat. The property record has no landlord contact, spend limit or preferences. The job is on hold waiting for the landlord, with a review on 2025-08-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the repair is logged, the landlord's decision is needed, and to send photos of the machine and any error code. Ask them not to buy a replacement until the landlord agrees in writing. | Tenant, Flat 9, 59 Alder Lane | email | A1 ✅ |
| 2 | WAIT | Hold the job waiting for the landlord, with a review on 2025-08-02. | internal | internal | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Ask management to add the landlord's contact and spend limit to the property record, then request the landlord's decision on repair or tenant-funded replacement, with written confirmation of ownership. | Management team | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant, Flat 9, 59 Alder Lane (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Hello,
> 
> Thank you for letting us know the washing machine at Flat 9, 59 Alder Lane has stopped working. We have logged it as a routine repair.
> 
> The machine was provided with the flat, so the decision on repairing or replacing it, and on whether a new machine would be yours to keep, needs the landlord's agreement. We are asking the landlord now and will come back to you once we hear from them. We cannot confirm an outcome or a date yet.
> 
> In the meantime, please take clear photos of the machine, including the front panel and any error code on the display, and send them to us. This will help the landlord decide quickly.
> 
> Please do not buy or install a replacement until the landlord has agreed in writing.
> 
> Kind regards,
> Lettings operations team

## Escalation
- **P3 → management** (verified): Landlord decision needed on a washing machine repair/replacement, but the property record has no landlord contact, spend limit or preferences, so the approval request cannot be sent.
  - Known: Flat 9, 59 Alder Lane, Eastmere, ZZ4 4ZZ. Tenant reports the LG washing machine (supplied with the flat when they moved in) has a power failure and cannot be repaired. Tenant offers to buy a replacement and asks whether it would stay theirs if they move out. Routine severity; no safety risk. Ticket NBL-038-tenant-own-appliance is at init and on hold until 2025-08-02.
  - Missing: Landlord name and contact; spend limit; whether the landlord will repair or replace; whether a tenant-bought replacement becomes landlord property; tenant's photos and error code.
  - Options: Landlord approves a repair by a contractor (assign once a limit is given); Landlord approves the tenant buying a replacement, with written agreement that it stays with the flat; Landlord declines and the tenant keeps the old machine or self-funds elsewhere
  - Recommendation: Add the landlord contact to the property record, then send the landlord a request for approval with the three options above. Ownership of any replacement should be confirmed in writing before the tenant buys one.
  - Deadline: 2025-08-02

## What this does not establish
- Logging and messaging do not decide whether the washing machine is repairable or who pays for it.
- No contractor has been assigned and no spend has been approved.
- Ownership of a tenant-bought replacement has not been agreed; the tenant has been told not to buy one until the landlord confirms in writing.
- The power-failure diagnosis is the tenant's own online research and has not been confirmed by a contractor.

## Remaining work
- Management to supply the landlord's contact and spend limit (ESC-102).
- Landlord to decide: repair, tenant-funded replacement, or decline, and whether a replacement stays with the flat.
- Tenant to send photos and error code.
- Review on 2025-08-02 if no landlord reply.

## Missing or unavailable information
- Landlord name and contact details
- Landlord spend limit and preferred contractors
- Tenant's photos and error code
- Tenant name (not in the case record)

## Conflicts between sources
- The intake summary calls the machine 'The Willow Maintenance washing machine', but the tenant's text says it is an LG and was there when they moved in. I treated it as the landlord's appliance and did not treat 'Willow Maintenance' as a contractor.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Intake only (stage init). The landlord's decision on repairing or replacing the washing machine is outstanding, along with the tenant's photos and the question of who owns a replacement. Landlord contact is missing from the record.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (existing thread, event 001) to confirm the repair is logged, explain the landlord must decide, request photos, and ask them not to buy a replacement yet. Then an internal escalation to management (ESC-102) to supply the landlord's contact so the approval can be requested.

**3. Does anything need a human decision, and why?**

Yes. The landlord must decide whether to repair or replace and whether a tenant-bought machine stays with the flat. The agency cannot make this decision and has no landlord contact or spend limit to act on. Management must provide that contact.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 9, 59 Alder Lane","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Landlord decision needed: approve repair or replacem… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |
| A3 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord decision needed on a washing machine repair/replacement, but the property record has… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
