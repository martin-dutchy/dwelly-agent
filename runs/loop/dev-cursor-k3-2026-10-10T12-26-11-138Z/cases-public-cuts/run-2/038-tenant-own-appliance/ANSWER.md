# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports broken LG washing machine and offers to replace it with their own. This is a landlord consent question, not a plain repair. I asked the landlord, updated the tenant and put the job on hold to 30 July.

## Where the case stands
Intake stage; landlord approval requested (APR-101); ticket on hold until 2025-07-30. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether the machine is theirs and to choose: our contractor diagnosis, own arrangement, or consent to tenant's own appliance | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord is being asked, keep old machine, send photo/error code, update by 30 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2025-07-30 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the LG washing machine (there when they moved in) has a power failure and says it can't be repaired (their own online research, unverified). They offer to buy a replacement that would remain their property and be taken with them on leaving. Please confirm whether the machine is yours, and how you'd like to proceed.
> 
> Options: Send our contractor to diagnose the existing machine (recommended, to confirm it is beyond repair); You arrange your own contractor or replacement; Consent to the tenant fitting their own machine, which stays theirs; the old machine to be removed/stored as you direct

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine, and for offering to replace it. As the machine was in the flat when you moved in, we need to check with your landlord first, both about whether it is theirs to repair or replace, and whether they consent to you fitting your own, which would stay yours. We've asked them and will update you by 30 July. Please don't dispose of the old machine meanwhile. If you can, send a photo of it and any error code, as that will help.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the machine is landlord-owned or beyond repair
- Does not give consent for the tenant to replace it or agree any cost
- No contractor assigned or visit booked

## Remaining work
- Landlord decision (agency chases after 2025-07-30)
- Tenant photo/error code
- Then record decision and assign contractor or note tenant's own appliance consent and removal of old unit

## Missing or unavailable information
- Whether the washing machine is landlord-owned/inventory item
- Landlord's decision
- Photo/error code

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord decision on ownership, repair or replacement, and consent to the tenant's own appliance.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent (A1) to the landlord via the agency record. Tenant updated by email (A2). Hold to 2025-07-30 (A3).

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the LG washing machine (there when they… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on ownership of machine, … | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
