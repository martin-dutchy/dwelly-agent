# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the landlord's LG washing machine has failed and offers to buy their own, which would remain theirs. This needs landlord consent and is not a plain repair. I asked the landlord for consent, who pays removal and fitting, and what happens to the old machine. I told the tenant it is pending, and put the job on hold until 30 July.

## Where the case stands
Intake stage; on hold waiting for landlord decision, review 2025-07-30. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for consent to tenant's own machine, who pays removal/fitting, fate of old LG | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is pending with the landlord, not to dispose of the old machine, next update by 30 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until landlord replies; review 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the landlord's LG washing machine (there when they moved in) has failed with a power fault and says it can't be fixed. They offer to buy a replacement at their own cost, which would remain their property and be taken with them when they leave. Please tell us: (1) do you consent to the tenant fitting their own machine; (2) who pays to disconnect and remove the old machine and fit the new one; (3) what should happen to your existing machine (inspect, repair, dispose); (4) may the tenant's machine stay connected. Alternatively we can send our contractor to inspect/repair yours.
> 
> Options: Our contractor inspects/repairs the landlord's machine first (recommended if you wish to keep supplying one); Consent to tenant's own machine; state who pays removal/fitting and what happens to the old machine; Landlord arranges own contractor/replacement; Decline

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've put your offer to them, including that it would stay yours and go with you when you leave. We've also asked who covers removing the old machine and fitting the new one, and what happens to the old one. Please don't remove or dispose of the existing machine until we come back to you. If you can, send a photo of the machine and any error code. We'll update you once we have the landlord's answer, and by 30 July at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord does not mean consent is given
- Tenant's claim that the machine is unrepairable is unverified
- No contractor, cost or date has been agreed

## Remaining work
- Landlord decision on consent, costs, old machine (agency, review 30 July)
- Update tenant after reply

## Missing or unavailable information
- Landlord's decision
- Photo/error code of machine
- Whether the machine is on the inventory (landlord's appliance)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. The landlord's decision on the tenant's own machine, removal and fitting costs, and the old machine is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent to the landlord via the agency landlord record (A1). Tenant updated by email on the existing thread (A2). Job on hold to 30 July (A4).

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the landlord's LG washing machine (… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for let… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant's own appliance request, not a repair. Tenant's machine would stay theirs, not on th… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant's own washing m… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
