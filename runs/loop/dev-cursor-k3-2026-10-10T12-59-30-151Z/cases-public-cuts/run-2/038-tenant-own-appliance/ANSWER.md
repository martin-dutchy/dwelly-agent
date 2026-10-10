# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This is a consent request, not a repair. I asked the landlord for consent and for who pays and what happens to the old machine, updated the tenant, noted the ticket and put it on hold to 30 July.

## Where the case stands
Intake stage; on hold waiting for landlord decision (review 2025-07-30). Tenant told.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washing machine and say who pays removal/fitting and what happens to the LG | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant consent is needed, not to dispose of the machine, asked for photo, next update by 30 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold waiting for landlord, review 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant says the LG washing machine supplied with the flat has a power failure and cannot be fixed. They offer to buy a replacement at their own cost; it would remain their property, not be on the inventory, and they would take it when they leave. Please decide: (a) consent to the tenant fitting their own machine, and say who pays to disconnect and remove the existing machine and fit the new one, and what should happen to your LG (inspect, repair, dispose); or (b) we send our contractor to inspect/repair; or (c) you arrange your own contractor.
> 
> Options: Consent to tenant's own machine; state who pays for removal of the old one and fitting, and what happens to the old LG; Agency contractor inspects/repairs or replaces the landlord's machine; Landlord arranges own contractor

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hi, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've put your offer to them, including that the new machine would stay yours and go with you when you leave. We've also asked who covers removing the old one and fitting the new one. Please don't remove or dispose of the current machine until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 30 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here consents to the tenant's machine or commits any spend
- Does not establish the LG is beyond repair; that is the tenant's own Google diagnosis

## Remaining work
- Landlord decision on consent, costs and the old LG (agency, review 30 July)
- Then update tenant; close or arrange contractor accordingly

## Missing or unavailable information
- Landlord's decision
- Photo/error code of machine
- Whether the LG is on the inventory

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to the tenant's own machine, who pays removal/fitting, and what happens to the existing LG.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency landlord record, and a tenant email update; hold to 30 July.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant says the LG washing machine supplied with t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own. Not a repair; needs landlord consent… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant's own washing m… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
