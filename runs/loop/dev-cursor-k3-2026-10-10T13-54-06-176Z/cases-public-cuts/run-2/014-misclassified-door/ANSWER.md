# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front-door problem as a routine appliance issue. I corrected it to an urgent door/security job, asked the tenant the right questions with a safety note, asked the landlord to choose our contractor or their own, and set a follow-up for 2024-06-07.

## Where the case stands
Intake stage; misclassified as fridge/appliance routine. Reclassified to door/security, urgent. Waiting on landlord decision (our contractor or own) and tenant answers. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to send our contractor or arrange their own, reply by 2024-06-07 | Landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant door/glass/access questions with safety note, replacing the fridge questions | Tenant | email | A2 ✅ |
| 3 | WAIT | Review 2024-06-07; chase landlord on second channel if silent | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door still lock securely when you slam it shut, and can you secure it at night?
> - Is there glass in the door or beside it, and is it cracked or loose anywhere?
> - Is the back door the same, and what is wrong with it (sticking, not latching, dropped)?
> - What days and times suit for a contractor to visit, and are there any access details or pets we should know about?
> 
> Why: Intake wrongly treated this as a fridge problem. Please ignore the earlier fridge questions. Safety note: please avoid slamming the door hard, keep people clear of the glass, and call us straight away if the glass cracks. We will update you by 2024-06-07.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant at Flat 12, 52 Meadow Row reports the front door (and back door) has to be slammed to shut, and a contractor said the glass could shatter. We treat this as an urgent security/safety repair. Shall we send our contractor to inspect, or will you arrange your own? Please reply by 2024-06-07.
> 
> Options: Yes, send our contractor to inspect and report (recommended); I will arrange my own contractor (please give name and date)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the fault, the glass risk (second-hand report from a fridge engineer) or who pays
- No contractor assigned or visit booked
- No landlord approval yet

## Remaining work
- Landlord decision (agency, by 2024-06-07)
- Tenant answers and access times
- Assign contractor and book visit once approved

## Missing or unavailable information
- Whether glass is cracked or the door can be secured
- Back door details
- Access times and pets
- Landlord decision

## Conflicts between sources
- Intake classification (Appliances, routine) contradicts the tenant's words about doors; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified. Now reclassified to urgent door/security. Outstanding: landlord decision, tenant answers, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-102) via the agency landlord record, and tenant questions with safety note (REQ-101) by email on the existing thread.

**3. Does anything need a human decision, and why?**

Not at present. The decision is the landlord's, and it is requested. Escalate P2 if the landlord stays silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but the tenant reports the front door (and back do… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does the front … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant at Flat 12, 52 Meadow Row reports the front door (and back door) has to be slammed to shut,… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"due_on":"2024-06-07","purpose":"Check landlord decision and tenant answers on door; chase landlord on second channel if silent","ticket_re… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
