# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant wants to replace the landlord's broken LG washing machine with their own. This is an alteration needing landlord consent, not a plain repair. I asked the landlord, told the tenant not to buy or connect anything yet, and put the ticket on hold until 30 July.

## Where the case stands
Intake stage, on hold waiting for the landlord's decision (review 2025-07-30). No contractor assigned and no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent (or not) to the tenant's own machine, say what to do with the existing one, or choose an inspection by our contractor | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord consent is needed, not to buy or connect yet, and that they won't pay for removal; ask for a photo and error code | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-07-30 for the landlord's reply | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the landlord's LG washing machine has a power failure and says it cannot be fixed (their own online research, not confirmed by an engineer). They offer to buy a replacement at their own cost, which would remain their property and leave with them. Do you consent? If so, how should the existing machine be disconnected, removed or stored (at your cost, not the tenant's)? Or would you prefer we send our contractor to inspect/repair or replace it yourself?
> 
> Options: Send our contractor to inspect the existing machine first (recommended: confirms whether it is repairable, and it may still be under warranty); Consent to tenant's own machine; tell us what to do with the existing one; Arrange your own contractor or replacement; Decline the tenant's own machine
> 
> Update: No visit booked and no contractor assigned. Nothing is committed until you reply. Please reply by 2025-07-30.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine, and for offering to replace it. Because the machine belongs to the landlord, and a replacement would be a change to the property, we need the landlord's consent first. We've asked them, including what should happen to the current machine. Please don't buy or connect a new one until we confirm. You wouldn't be asked to pay for removing the old machine. If you can, please send a photo of the machine and any error code. We'll update you by 30 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the machine is beyond repair; that is the tenant's own research
- Asking the landlord does not mean consent is given
- Warranty status not checked
- No timescale promised for any work

## Remaining work
- Landlord decision on consent and the old machine (agency, review 30 July)
- Then inspect/repair or arrange the replacement per that decision
- Tenant photo and error code awaited

## Missing or unavailable information
- Landlord decision
- Machine age and warranty
- Photo and error code

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and on hold. Outstanding: landlord consent, what to do with the existing machine, and confirmation of the fault and warranty.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent through the agency landlord record (APR-101). The tenant was updated by email (MSG-102). Review on 30 July.

**3. Does anything need a human decision, and why?**

The landlord's decision is needed, because consent to the tenant's own appliance is theirs to give. No agency human escalation is needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the landlord's LG washing machine h… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant's own replaceme… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washer with their own; it would remain theirs, no… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
