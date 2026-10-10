# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly logged a door fault as a fridge/appliance job. I reclassified it as an urgent door/security item, asked the tenant the right questions, asked the landlord to choose contractor, and set a follow-up for 7 June.

## Where the case stands
Intake stage, no provider assigned. Waiting on landlord decision (APR-102) and tenant answers (REQ-101). Follow-up 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor or their own for the door repair | Landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about door locking, glass condition and access times | Tenant, Flat 12 | email | A2 ✅ |
| 3 | RECLASSIFY | Corrected category from appliances/routine to door/security, urgent | internal | internal | A1 ✅ |
| 4 | WAIT | Review 2024-06-07 and chase landlord on second channel if silent | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door still lock securely once you have shut it?
> - Is any glass in the door or frame cracked, loose or damaged?
> - Is the back door also affected, and does it lock properly?
> - What days and times suit for a visit, and are there any access details or pets we should know about?
> 
> Why: Our intake logged this as a fridge issue, which was wrong. It is a door problem and we need these details to arrange the repair.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a contractor visiting said it could cause the glass to shatter. Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Our contractor inspects and repairs (recommended); Landlord arranges own contractor; Tenant arranges fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the cause, or that the glass is cracked
- No contractor assigned and no visit booked; no landlord approval yet
- The fridge contractor's comment is the tenant's hearsay

## Remaining work
- Landlord decision (agency awaiting)
- Tenant answers on lock security and glass
- Assign contractor and book visit after approval
- Tenant timescale not yet given as approval is pending

## Missing or unavailable information
- Whether the door still locks securely
- Glass condition
- Tenant access times
- Landlord decision

## Conflicts between sources
- Intake classified the request as Appliances/fridge; the tenant's words describe a door. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance. Now reclassified as an urgent door fault. Outstanding: landlord decision, tenant answers, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, via agency landlord record) and tenant information request (email on existing thread); follow-up 2024-06-07.

**3. Does anything need a human decision, and why?**

No human escalation now. The decision belongs to the landlord. Escalate P2 if the landlord is silent after a chase and the door proves insecure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/Routine: fault is the front (and back) door not closing without sla… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does t… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","decision_needed":"Tenant reports the front door (and back door) must be slammed to shut; a c… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"due_on":"2024-06-07","purpose":"Check for landlord decision and tenant answers on door repair; chase landlord on second channel if none","… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
