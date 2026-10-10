# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant reported that the LG washing machine supplied with the flat has a power fault and offered to replace it with their own, keeping it on move-out. The ticket is open and on hold for landlord consent. The tenant has been told that approval is pending, and the maintenance team has been asked to get the landlord's decision because no landlord contact is on file.

## Where the case stands
Intake, routine appliance request, on hold for landlord. Ticket NBL-038-tenant-own-appliance is open with no duplicate. The tenant wants to replace the LG washing machine that came with the flat with their own and take it when they leave. The landlord has not decided, and no landlord contact is on file.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the request is logged, the landlord's written agreement is needed before any replacement or removal, and to send photos of the machine and its label/error code. | Tenant, Flat 9, 59 Alder Lane | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate to maintenance for the landlord's contact and a yes/no decision on tenant-owned replacement, ownership and removal terms. | Maintenance team (internal) | internal | A2 ✅ |
| 3 | WAIT | Hold the ticket for landlord response with a review on 2025-07-29. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant, Flat 9, 59 Alder Lane (tenant) via email, existing thread (event 001, tenant's washing machine request)** (verified)

> Thank you for getting in touch about the washing machine. We have logged it.
> 
> The machine was provided with the flat, so before you replace it we need the landlord's written agreement. Replacing it with your own machine, and leaving it with you when you move out, is a decision for the landlord, and we are asking them now. We will come back to you once they have replied. Until then, please don't remove or replace the machine.
> 
> To help us, please send photos of the machine, including the make and model label and any error code on the display.
> 
> If anything about the machine becomes unsafe (for example sparking, burning smell, or water near the electrics), switch it off at the wall and contact us straight away.

## Escalation
- **P3 → maintenance** (verified): Tenant wants to replace a washing machine provided with the flat with their own LG machine and keep it on moving out. This needs landlord consent, and no landlord record is on file to ask.
  - Known: Routine, not safety-related: LG washing machine, power failure, not operational (event 001-002). Tenant is willing to pay for a replacement and take the new machine when they leave. Tenant said the existing machine was there when they moved in. No duplicate open ticket. No pets, no access issues.
  - Missing: Landlord name and contact for Flat 9, 59 Alder Lane (property record has address only). Landlord decision on: (a) tenant buying and fitting their own machine, (b) whether the existing machine is repaired or replaced by the landlord, (c) ownership and removal terms. Tenant contact details and the tenant's photos of the machine.
  - Options: Landlord approves tenant's own replacement; record ownership, removal on move-out and landlord's name, then tell tenant; Landlord declines; landlord arranges repair or replacement via own contractor; Landlord wants our contractor to diagnose first (routine visit within 14 days)
  - Recommendation: Get the landlord's contact from the agency's records, send them the tenant's report and the three options with a yes/no answer requested. Keep the ticket in hold until the decision arrives. Tell the tenant nothing is approved yet.
  - Deadline: 2025-07-29

## What this does not establish
- Nothing is approved: the tenant may not yet replace or remove the machine.
- The tenant's claim that the machine is theirs or was there on move-in is not verified and has not been checked against the inventory.
- No contractor has been assigned and no visit is booked.
- Replacement cost, fault cause and who pays are not established.

## Remaining work
- Obtain the landlord's contact and decision (owner: maintenance, ESC-102).
- Once the landlord decides, record it, tell the tenant, and proceed (own replacement, or repair via the landlord's contractor).
- Review the ticket and tenant photos on 2025-07-29.

## Missing or unavailable information
- Landlord name and contact for this property
- Landlord's decision on tenant-owned replacement and ownership terms
- Tenant's photos of the machine and model label
- Tenant's contact details on file (none in records; reply went on the existing thread)

## Conflicts between sources
- The tenant describes the machine as theirs or as a replacement, but the record says it was there on move-in. Ownership is unverified and is for the landlord to settle.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Intake, routine. The ticket is open with no duplicate and is now on hold for the landlord. Outstanding: the landlord's contact and decision on whether the tenant may replace the machine and keep it, the tenant's photos, and a diagnosis or repair route for the fault.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (A1) saying the landlord's written agreement is needed, asking for photos, and advising them not to remove the machine. Internal escalation ESC-102 (A2) asks maintenance to obtain the landlord's contact and decision. The ticket is on hold until 2025-07-29 (A3).

**3. Does anything need a human decision, and why?**

Yes. Whether the landlord agrees to a tenant-owned replacement, and who owns the machine and removes it at move-out, is the landlord's decision. We have no landlord contact on file to ask, so maintenance must find it (ESC-102). This is routine, not a safety issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 9, 59 Alder Lane","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001, tenant'… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Tenant wants to replace a washing machine provided with the flat with their own LG machine a… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Landlord consent needed for tenant's own washing mac… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
