# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant asked to replace the existing washing machine with their own, which needs landlord consent and agreed terms on ownership. The tenant was told in writing to wait for the landlord's decision and asked for a photo, error code and model number. The job is escalated for the missing landlord contact and held for review on 2025-07-29.

## Where the case stands
Intake, routine. Tenant reports the LG washing machine (present at move-in) has a power fault and wants to replace it with their own machine that they would own and take on move-out. No landlord decision yet, and the property record has no landlord contact. Ticket is on hold for the landlord, review 2025-07-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the landlord's decision is needed before any purchase or fitting, and ask for a photo, error code and model number | Tenant, Flat 9, 59 Alder Lane | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate to maintenance (P3) to supply the landlord contact and obtain the landlord's decision on repair versus tenant replacement with written ownership and removal terms | Maintenance team | internal | A2 ✅ |
| 3 | WAIT | Hold the job for the landlord's decision with a review date of 2025-07-29 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant, Flat 9, 59 Alder Lane (tenant) via email, existing thread (event 001 request, 2025-07-26)** (verified)

> Hello,
> 
> Thank you for reporting the washing machine at Flat 9, 59 Alder Lane. We have noted that it is not working and that you would like to replace it yourself.
> 
> Because the machine was already at the property when you moved in, we need the landlord's decision before anything is bought or fitted. We are asking them now whether they will repair or replace it, or whether they agree to you replacing it and on what terms (including ownership if you move out). Please do not buy or install a replacement until you have heard from us in writing.
> 
> To help with the diagnosis, could you send us a photo of the washing machine, including any error code shown on the display, and the make and model number from the label inside the door or on the back?
> 
> We will be in touch once the landlord has replied.
> 
> Kind regards,
> Lettings team

## Escalation
- **P3 → maintenance** (verified): Tenant wants to replace a washing machine that was at the property at move-in (LG, power fault) with their own, and keep it as their property. This is an alteration/appliance change that needs landlord consent, and no landlord contact is on the property record, so the landlord cannot be asked.
  - Known: Routine, not safety-related (event 002). Tenant reports the LG washing machine has a power failure and cannot be repaired per their online research. Tenant is willing to replace it and says it would be theirs and removable on move-out. No pets, no access issues (event 002). Property record has no landlord contact details. Tenant has been told in writing to wait for the landlord's decision.
  - Missing: Landlord contact details and decision on: (a) repair or replace the existing machine; (b) whether the tenant may replace it and on what terms; (c) whether a tenant-owned machine may be removed at tenancy end. Photo and model/error code from tenant not yet received. No diagnosis by a contractor yet.
  - Options: Obtain the landlord's contact, then ask the landlord to decide: arrange repair via our contractor, or consent to tenant replacement with written terms on ownership and removal; Landlord arranges own contractor to diagnose and repair; Refuse tenant replacement and keep the existing machine repaired
  - Recommendation: Get the landlord's contact from the records and ask them for a yes or no on a contractor diagnosis first (cheapest path), and decide tenant replacement only with written consent on ownership and removal.
  - Deadline: 2025-07-29

## What this does not establish
- Nothing has been approved: no landlord consent, no contractor assigned, no spend.
- Tenant replacement is not agreed, and ownership and removal at move-out are not agreed.
- The fault itself is not diagnosed; the tenant's claim it cannot be fixed is unverified.
- No visit is booked.

## Remaining work
- Landlord contact and decision (owner: maintenance team via ESC-102).
- Tenant's photo, error code and model number (owner: tenant).
- Once decided: assign a contractor or send written consent terms, then update the tenant (owner: operations).
- Review on 2025-07-29.

## Missing or unavailable information
- Landlord contact details on the property record
- Landlord decision on repair or tenant replacement
- Diagnosis or photo of the fault and machine make/model

## Conflicts between sources
- The tenant says the machine cannot be fixed, but no diagnosis has been done. Treated as unverified.

## Answers to the case questions
**1. Where does the case stand right now, and what is outstanding?**

Intake stage, routine. Nothing has been decided. Outstanding: landlord decision (repair versus tenant replacement with ownership and removal terms), landlord contact, tenant's photo and model/error code, and diagnosis.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email on the existing thread (A1). Escalate to maintenance for landlord contact and decision (A2). Hold for landlord with review on 2025-07-29 (A3).

**3. Does anything need a human decision, and why?**

Yes. Landlord consent for a tenant-owned replacement of an appliance that was there at move-in is an alteration decision the agency cannot make, and the landlord cannot be contacted because no contact is on the property record. Escalated at P3 (not urgent; no safety risk).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 9, 59 Alder Lane","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Tenant wants to replace a washing machine that was at the property at move-in (LG, power fau… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Landlord decision needed: repair existing LG washing… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
