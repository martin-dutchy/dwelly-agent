# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This is a consent request, not a repair. I asked the landlord for consent, payment for removal/fitting and the LG's fate, told the tenant to wait, noted the record and set a chase for 29 July.

## Where the case stands
Intake stage. Landlord consent requested (APR-101); tenant informed; waiting on landlord, follow-up 2025-07-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washing machine, who pays removal/fitting, and what happens to the LG | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord consent is needed, not to swap anything yet, update by 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord; chase 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (here when they moved in) has a power failure and, per their own web search, can't be fixed. They offer to buy a replacement at their own cost, which would remain their property and be taken with them when they leave. This needs your consent. Please tell us: (1) do you agree to the tenant fitting their own machine; (2) who pays to disconnect and remove the existing LG and fit the new one; (3) what should happen to the LG (inspect, repair, dispose, keep); (4) or would you prefer we send our contractor to inspect/repair it first? Please reply by 2025-07-29.
> 
> Options: Agree to tenant's own machine; state who pays for removal/fitting and what happens to the LG; Our contractor inspects the LG first; Landlord arranges own contractor/replacement; Decline

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hi, thanks for letting us know about the washing machine. Because the LG belongs to the landlord, fitting your own needs their agreement, so we've asked them. We've also asked who covers removing the old machine and fitting the new one, and what happens to the LG. Please don't remove or replace anything until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve the tenant's replacement or any spend
- Does not establish the LG is beyond repair (tenant's own web search)
- No contractor assigned

## Remaining work
- Landlord decision on consent, cost of removal/fitting and fate of LG (owner: landlord, chase 29 July)
- Then update tenant and, if chosen, arrange inspection

## Missing or unavailable information
- Landlord decision
- Photo/error code of machine
- Landlord contact details not shown in case

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent and decisions on cost and the LG's disposal.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency record; tenant update by email; follow-up 29 July.

**3. Does anything need a human decision, and why?**

No escalation; the decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (here when t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own machine. Not a repair: needs landlord… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hi, thanks for lettin… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","purpose":"Chase landlord for decision on tenant's own washing machine","… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
