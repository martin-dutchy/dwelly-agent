# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a door fault as a fridge/appliance job. I corrected the ticket to a door/security issue (urgent), asked the tenant the relevant questions, asked the landlord to approve our contractor or choose their own, and put the job on hold for review on 2024-06-07.

## Where the case stands
Intake stage, misclassified as appliances; reclassified to door/security. Waiting on landlord decision and tenant answers; hold review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or arrange their own for the door | Landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant real door questions (lock, glass, photo, access) | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door still lock securely once it is shut, and is the glass in it cracked or loose at all?
> - Is the door catching on the frame, sagging, or is the closer/handle failing? A photo would help.
> - Does the back door have the same problem?
> - What times suit for access, and are there any alarms or pets we should know about?
> 
> Why: Intake wrongly treated this as a fridge issue; we need the real door facts to arrange a repair. If the glass is cracked or the door will not lock, tell us straight away. Our target for urgent work is within 72 hours once approved.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) has to be slammed to shut, and a visiting engineer warned the glass could shatter. Do you approve our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Use our contractor (recommended, door/glass security item); Landlord arranges own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; cause and cost unknown
- Tenant has not been given an appointment
- The fridge engineer's comment is unverified hearsay

## Remaining work
- Landlord decision (agency)
- Tenant answers; assign contractor once approved
- Check severity if glass is cracked or door won't lock: escalate/raise to emergency

## Missing or unavailable information
- Whether door locks securely and glass condition
- Landlord decision
- Access details

## Conflicts between sources
- Intake classification (Appliances/fridge, routine) conflicts with tenant's words about the front door; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as appliances. Now corrected to door/security, urgent. Outstanding: landlord decision, tenant answers, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (A3) to the landlord via the agency record, and information request (A2) to the tenant by email on the existing thread; hold until 2024-06-07.

**3. Does anything need a human decision, and why?**

No human escalation now. The decision needed is the landlord's, which is already requested. Escalate if the tenant reports cracked glass or a door that won't lock.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake category \"Appliances\" is wrong. Fault is front door (and back door) not c… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does the front … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) has to be … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-102) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
