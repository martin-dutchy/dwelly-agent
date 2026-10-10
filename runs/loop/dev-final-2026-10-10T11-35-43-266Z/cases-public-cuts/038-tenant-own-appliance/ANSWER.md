# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the landlord-supplied LG washer is dead and offers to replace it with their own machine. This needs landlord consent, so I requested it, told the tenant not to buy yet, and put the job on hold with a review date.

## Where the case stands
Intake stage; landlord consent requested (APR-101); ticket on hold until 2025-07-30 awaiting landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant buying own replacement washing machine (tenant-owned, removed at end), or choose repair/own contractor | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant landlord consent is needed, not to buy yet, asked for photo | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until landlord replies; review 2025-07-30 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord of Flat 9, 59 Alder Lane (landlord)** (verified)

> The tenant reports the LG washing machine supplied with the flat has a power failure and they believe it can't be repaired. They offer to buy a replacement at their own cost, which would remain their property and be removed when they leave. Do you consent to this? Alternatively, do you want to repair or replace it yourself, with our contractor or your own?
> 
> Options: Consent to tenant replacing at own cost; tenant keeps and removes it at end of tenancy (old machine removed/disposed); Landlord repairs or replaces the machine via our contractor; Landlord arranges own contractor; Decline

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine, and for offering to replace it. As the machine came with the flat, we need the landlord's consent before you replace it, and we've now asked them. Please hold off buying or removing anything until we confirm. We'll note that a machine you buy would be yours to take when you leave, and we'll ask the landlord to agree that in writing. If you can, please send a photo of the machine and any error code. We'll update you once the landlord replies.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approves the replacement or establishes ownership of the new machine
- No contractor assigned, no cost approved
- Machine fault is the tenant's own diagnosis, unverified

## Remaining work
- Landlord decision (agency owns chasing)
- Written record of ownership/removal of new machine and disposal of old one
- Chase landlord on second channel if silent after 2025-07-30

## Missing or unavailable information
- Landlord contact details not on property record; whether the old machine is the landlord's inventory item
- Photo/error code from tenant

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to tenant-owned replacement (or repair decision), ownership/removal terms, tenant photo.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request APR-101 to the landlord; email to tenant; hold until 2025-07-30.

**3. Does anything need a human decision, and why?**

Not an agency human; the decision is the landlord's, as the machine is their property and the tenant wants to substitute their own. No escalation now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG was… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent for tenant-owned replaceme… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
