# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front door fault as an appliance/routine job. I reclassified it as an urgent door/security issue, gave the tenant a safety note and questions, asked the landlord for approval, and put the job on hold with a review date.

## Where the case stands
Intake stage, on hold waiting for landlord decision (our contractor or own), review 2024-06-07. Tenant asked for door details.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose our contractor or their own for the urgent door repair, reply by 2024-06-08 | Landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Tell tenant of the correction, give safety note, ask door fault details, photos, access | Tenant | email | A2 ✅ |
| 3 | RECLASSIFY | Corrected category from Appliances to door/locks and raised to urgent | internal | internal | A1 ✅ |
| 4 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about your front door. Sorry, our system first logged this as a fridge problem; we have corrected it to a door repair and treat it as urgent. Until it is looked at, please try not to slam the door, as the glass could break. If the door won't close and lock, please make sure it is secured as best you can, and keep children and pets away from it. If glass cracks, keep clear and tell us straight away. To arrange the repair, could you tell us: 1) Is it the door catch/latch, the hinges, or does the door drop or stick on the frame? 2) Is the door glass cracked or damaged now? 3) Can you still lock it? 4) Best times for access, any entry codes or alarms, and any pets? Photos would help. We are asking your landlord to approve the repair and will update you by 2024-06-07.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant at Flat 12, 52 Meadow Row reports the front door (and back door) must be slammed to shut. A contractor who attended for another job reportedly warned the glass could shatter. Urgent security/safety repair. Do you want us to send our contractor, or will you arrange your own? Please reply by 2024-06-08.
> 
> Options: Approve our contractor to inspect and repair (recommended); Landlord arranges own contractor (please give name and date)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; no landlord approval yet
- Does not establish the exact fault or whether the glass is damaged
- The fridge contractor's comment is the tenant's report, unverified

## Remaining work
- Landlord decision (agency/landlord)
- Tenant answers on fault, glass, access
- Assign contractor and book visit once approved, target within 72h
- Chase landlord on second channel if silent by 2024-06-07 review

## Missing or unavailable information
- Exact door fault and glass condition
- Access details and pets
- Landlord decision

## Conflicts between sources
- Intake classed as Appliances/routine with fridge questions, but the tenant describes a door fault; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance job. Now corrected to urgent door repair and on hold awaiting the landlord's decision; tenant details outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email via landlord record) and tenant information request with safety advice (email on existing thread).

**3. Does anything need a human decision, and why?**

No escalation now. The landlord's decision is theirs and is requested. Escalate P2 if the landlord is silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake category \"Appliances\" is wrong. Fault is front (and back) door not closin… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for let… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant at Flat 12, 52 Meadow Ro… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice: our contractor or own. Tenan… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
