# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports the LG washing machine supplied with the flat has failed and offers to replace it at own cost as their own property. Landlord permission is needed, so I requested it, updated the tenant and put the job on hold with a review date.

## Where the case stands
Ticket at init, now on hold waiting for landlord (review 2025-07-30). Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether the machine is theirs and whether tenant may replace it with their own removable appliance | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant landlord is being asked, 14-day routine target, keep old machine, send photo | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until landlord replies; review 2025-07-30 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord of Flat 9, 59 Alder Lane (landlord)** (verified)

> The tenant reports the LG washing machine supplied with the flat has failed (power failure) and says it can't be repaired. Tenant offers to buy a replacement at their own cost, to remain their own property and be removed when they leave. Do you agree, or would you rather repair/replace it yourself? Please also confirm whether the machine is yours (part of the inventory).
> 
> Options: Agree: tenant replaces at own cost, keeps it as their property and takes it when they leave (old unit removed/disposed of); Landlord arranges repair or replacement themselves; Agency arranges a contractor to assess the machine first

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Thanks for letting us know about the washing machine, and for offering to replace it. As the machine came with the flat, we need to check with the landlord first, including that a replacement would stay your property and go with you when you leave. We've asked them and will update you as soon as we hear. This is a routine job, so our target is to get it sorted within 14 days. Please don't dispose of the old machine yet. If you can, send a photo of it and any error code on the display.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve the replacement or agree the machine becomes tenant property
- Does not establish who owns the existing machine or who pays
- No contractor assigned

## Remaining work
- Landlord decision on APR-101 (agency team to chase 2025-07-30)
- Record decision, any written agreement on tenant-owned appliance, then close without payment or arrange work

## Missing or unavailable information
- Landlord contact and spend limit not in property record
- Inventory/ownership of the washing machine
- Photo/error code from tenant

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine ticket at intake; landlord decision on ownership and tenant replacement is outstanding, plus tenant photo.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord; update email to tenant on existing thread; hold until 2025-07-30.

**3. Does anything need a human decision, and why?**

No human escalation; the decision belongs to the landlord, not agency staff. Staff only need to chase if no reply by review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG was… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant request)","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Landlord to confirm ownership of machine and whether… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
