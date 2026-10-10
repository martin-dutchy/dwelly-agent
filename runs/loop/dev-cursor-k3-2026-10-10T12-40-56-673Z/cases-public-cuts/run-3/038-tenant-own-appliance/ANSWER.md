# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the landlord's LG washing machine is dead and offers to buy their own, which would stay theirs. This is a consent request, not a repair, so I asked the landlord, told the tenant, noted the file and put the job on hold until 30 July.

## Where the case stands
Intake stage; on hold waiting for landlord decision (review 2025-07-30). Tenant told consent is pending.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washing machine, say who pays removal/fitting and what happens to the existing LG | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is needed, ask them to hold off, request photo/error code, next update by 30 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the LG washing machine (here when they moved in) has a power failure and, from their own web search, cannot be fixed. They offer to buy a replacement at their own cost; it would remain their property, not be on the inventory, and they would take it when they leave. Please tell us: (1) do you consent to the tenant fitting their own machine, (2) who pays to disconnect and remove the existing machine and fit the new one, (3) what should happen to your existing machine (inspect, repair, dispose), or would you rather we send our contractor to inspect it first?
> 
> Options: Consent to tenant's own machine; tell us who pays for removal/fitting and what to do with the existing machine; Have our contractor inspect/repair the existing machine first; Arrange your own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've passed your offer to them, including that it would stay yours and go with you when you leave. Please hold off buying or removing anything until we confirm. If you can, send a photo of the machine and any error code. We'll update you by Wednesday 30 July, or sooner if the landlord replies.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the replacement, the landlord's appliance disposal or any spend
- The fault is unverified: it is the tenant's own web search
- No contractor assigned

## Remaining work
- Landlord decision on consent, costs and the existing machine (agency, review 30 July)
- Tenant photo/error code
- Record the landlord decision and update the tenant when it arrives

## Missing or unavailable information
- Landlord's decision
- Whether the machine is on the inventory and its age
- Photo/error code

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent, who pays removal/fitting, and what happens to the existing machine.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) via the agency landlord record, plus a tenant email on the existing thread; hold until 30 July.

**3. Does anything need a human decision, and why?**

Only the landlord's decision, which is already requested. No escalation to agency staff is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the LG washing machine (here when they … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washing machine with their own. Not a repair: nee… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant's own replaceme… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
