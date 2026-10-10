# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own, which stays theirs. That needs landlord consent rather than a repair job. I asked the landlord for consent, who pays for removal and fitting, and what happens to the LG. I told the tenant, added a note, and set a follow-up for 29 July.

## Where the case stands
Intake stage. Waiting on landlord consent and decisions; tenant informed; chase due 2025-07-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washing machine, who pays removal/fitting, and what happens to the LG | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is being sought, not to remove the LG yet, and when they will next hear | Tenant | email | A3 ✅ |
| 3 | WAIT | Chase landlord on 29 July if no reply | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (here when they moved in) has a power failure and, from their own web search, can't be fixed. They offer to buy a replacement at their own cost; it would remain their property, not be on the inventory, and they would take it when they leave. Please confirm: (1) do you consent to the tenant fitting their own machine; (2) who pays to disconnect and remove the existing LG and fit the new one; (3) what should happen to the existing LG (we inspect/repair, dispose, or other). Alternatively we can send our contractor to inspect it first.
> 
> Options: Consent to tenant's own machine; state who pays for removal/fitting and what happens to the LG; Send our contractor to inspect/repair the LG first; You arrange your own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Hello, thanks for your message about the washing machine. Because the current machine belongs to the landlord, fitting your own needs their consent, so we have put your offer to them, including that the new one would stay yours and go with you when you leave. We have also asked what should happen to the existing LG and who covers removal and fitting. Please don't remove or dispose of the LG until we confirm. If you can, send a photo of the machine and any error code. We will update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the replacement, spend, or contractor.
- Does not confirm the LG is beyond repair; that is the tenant's own web research.
- Does not say who owns or pays for the LG's removal.

## Remaining work
- Landlord decision (consent, cost, LG disposal) - awaited
- Chase on 2025-07-29 on a second channel if silent
- Record the decision and update the tenant; add note that tenant's machine is not on inventory

## Missing or unavailable information
- Landlord response
- Photo/error code of the machine
- Inventory entry for the LG

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no landlord decision. Outstanding: landlord consent to the tenant's own machine, who pays for removal and fitting, and what happens to the LG.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent to the landlord via the agency landlord record (A1). Tenant updated by email on the existing thread (A3). Follow-up set for 29 July (A4).

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (here when t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washing machine with their own. Not a repair: nee… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant request)","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","party":"Landlord","purpose":"Chase landlord decision on tenant's own was… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
