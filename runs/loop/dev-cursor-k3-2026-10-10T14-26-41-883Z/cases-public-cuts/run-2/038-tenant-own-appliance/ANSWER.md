# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant asked to replace the landlord's broken washer with their own. This is an alteration needing landlord consent, not a repair. Asked the landlord, told the tenant to wait, noted the record and set a follow-up.

## Where the case stands
Intake. Tenant wants to replace the landlord's LG washer with their own. Landlord consent requested (APR-101); no contractor or visit. Waiting on landlord, review 2025-07-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to the tenant's own machine and say how to handle the old one at landlord cost | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is needed, hold off buying, photo requested, update by 29 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (provided with the flat) has a power failure and says it can't be fixed (their own online research, not a diagnosis). They offer to buy a replacement at their own cost; it would remain their property and they would take it when they leave. Do you consent? If so, how do you want the existing machine handled (disconnect, remove, store or dispose, at your cost, not the tenant's)?
> 
> Options: Consent to the tenant's own machine; we arrange removal/disposal of the old one at your cost (recommended); Consent, and the old machine is stored/kept for you; Decline and have our contractor inspect and repair or replace the landlord's machine; Arrange your own contractor
> 
> Update: No contractor assigned and no visit booked. Nothing is committed until you reply. The tenant's machine would not be on the inventory. Please reply within 3 days.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Because the current machine belongs to the landlord, buying your own needs the landlord's consent, so please hold off buying or connecting one for now. We've asked them, including what should happen to the old machine (that wouldn't be at your cost). We'll note that a machine you buy stays yours and goes with you when you leave. Meanwhile, a photo of the machine and any error code would help. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the machine is beyond repair (tenant's own view)
- No consent or approval given yet
- No contractor assigned or spend committed

## Remaining work
- Landlord decision on consent and old machine
- Record decision when received
- Tenant update by 29 July

## Missing or unavailable information
- Landlord consent
- Photos/error code
- Machine age/warranty unknown

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake. Landlord consent and the handling of the old machine are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord consent request (landlord record) and a tenant reply by email; both sent.

**3. Does anything need a human decision, and why?**

Only the landlord's decision, which is theirs to make. No escalation to staff is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (provided wi… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own; not a repair request. Tenant's machi… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","purpose":"Chase landlord on consent to tenant's own washing machine and … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
