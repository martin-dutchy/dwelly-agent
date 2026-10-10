# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This needs landlord consent, so I put the terms and cost/disposal questions to the landlord, noted the record, told the tenant, and set a 29 July follow-up.

## Where the case stands
Intake stage. Waiting on landlord (APR-101) for consent to the tenant's own machine and cost/disposal decisions. Tenant informed. Follow-up 29 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Put tenant's own-machine terms to landlord; ask who pays removal/fitting, fate of their machine, and whether tenant's may stay connected | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord consent is needed, not to dispose of old machine, send photo/error code, next update by 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord reply; chase 29 July | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the landlord's LG washing machine (there when they moved in) has a power failure and says it cannot be fixed (their own web search, not diagnosed). They offer to buy a replacement that would remain their property, not on the inventory, and be taken with them when they leave. Please tell us: (1) do you consent to the tenant fitting their own machine; (2) who pays to disconnect and remove the existing machine and fit the new one; (3) what should happen to your machine (inspect, repair or dispose); (4) may the tenant's machine stay connected. Alternatively we can send our contractor to inspect and repair or replace yours.
> 
> Options: Consent to the tenant's own machine, with you or tenant paying removal/fitting (please say which) and a decision on your machine; Our contractor inspects your machine first, to confirm whether it is repairable; You arrange your own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine. As it belongs to the landlord, we've asked them whether you can fit your own machine. We've noted that yours would stay your property, wouldn't be on the inventory, and would go with you when you leave. We've also asked who covers removing the old machine and fitting the new one. Please don't disconnect or dispose of the old machine until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the replacement, any spend or a contractor
- Does not confirm the machine is beyond repair; that is the tenant's own research
- Does not decide who pays or what happens to the landlord's machine

## Remaining work
- Landlord decision (consent, costs, disposal)
- Tenant update by 29 July
- Photo/error code from tenant

## Missing or unavailable information
- Landlord decision
- Photo/error code
- Inventory record of the machine

## Conflicts between sources
- Intake classed this as a routine repair, but it is really a tenant request to fit their own appliance needing landlord consent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake. The landlord's decision on consent, who pays for removal/fitting, and what happens to their machine is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent via the agency landlord record (A1), tenant emailed (A3), follow-up 29 July (A4).

**3. Does anything need a human decision, and why?**

No human escalation; the decision belongs to the landlord, which is already requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the landlord's LG washing machine (… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own machine. Needs landlord consent; not … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Thanks for letting us… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","party":"Landlord","purpose":"Chase landlord on tenant own-washing-machin… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
