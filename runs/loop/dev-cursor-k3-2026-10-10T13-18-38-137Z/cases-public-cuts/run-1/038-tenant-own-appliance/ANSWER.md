# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This is a consent request, not a repair, so I put the terms and cost questions to the landlord, told the tenant not to install yet, added a note and held the ticket to 29 July.

## Where the case stands
Intake stage; ticket on hold waiting for landlord (review 2025-07-29). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washing machine, who pays removal/fitting, fate of landlord's machine, and whether tenant's may stay connected | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is requested, not to install yet, and next update by 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> The tenant at Flat 9, 59 Alder Lane reports the LG washing machine supplied with the flat has a power failure and says it can't be repaired (their own web research, not yet diagnosed). They offer to buy a replacement at their own cost, which would remain their property, not part of the flat or inventory, and be taken with them when they leave. Please tell us: (1) do you consent to the tenant fitting their own machine; (2) who pays to disconnect and remove your machine and fit the new one; (3) what should happen to your machine (inspect/repair by us, dispose, or other); (4) may the tenant's machine stay connected. Reply by 2025-07-29.
> 
> Options: Consent to tenant's own machine; tenant arranges and pays fitting; agency/landlord removes old unit; Our contractor inspects and repairs/replaces the landlord's machine instead; Landlord arranges their own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Hi, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've asked them, passing on that yours would stay your property and go with you when you leave. We've also asked who covers removing the old one and fitting the new one, so please don't buy or install anything until we confirm. If you can, a photo of the machine and any error code would help. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; landlord consent, cost split and fate of landlord's machine are undecided
- Fault is unverified (tenant's own research)
- Tenant's ownership of new machine is their claim until landlord agrees

## Remaining work
- Landlord decision on consent, costs, old machine (agency, by 29 July)
- Then update tenant and either record decision or arrange contractor

## Missing or unavailable information
- Landlord's response
- Photo/error code of machine
- Inventory status of the machine

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to the tenant's own machine, who pays removal and fitting, what happens to the landlord's machine, and whether the tenant's may stay connected.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency landlord record; tenant told by email; on hold to 2025-07-29.

**3. Does anything need a human decision, and why?**

Not an escalation. The landlord makes the decision, so no human at the agency is needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant at Flat 9, 59 Alde… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washer with their own. Needs landlord consent; no… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant request)","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent to tenant's own washing ma… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
