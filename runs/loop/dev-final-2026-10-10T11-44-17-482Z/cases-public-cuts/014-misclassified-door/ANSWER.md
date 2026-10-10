# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Intake wrongly classed a door complaint as a fridge appliance issue. I corrected it by note, asked the landlord for approval, told the tenant and set a follow-up for 10 June.

## Where the case stands
Intake stage; ticket misclassified as Appliances, actually a front/back door that won't close without slamming. Waiting on landlord decision (APR-102); no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor (or arrange own) for door inspection/repair | Landlord | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the fridge classification was wrong, door repair pending landlord, advise gentle closing, next update by 10 June | Tenant | email | A3 ✅ |
| 3 | WAIT | Follow-up on landlord reply 2024-06-10 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports the front door (and back door) will not close without slamming; a visiting engineer reportedly warned the slamming could crack the glass. Please confirm whether we may send our contractor to inspect and repair, or whether you will arrange your own. No spend limit is on file, so please state any cap.
> 
> Options: Yes, send your contractor to inspect and repair (recommended), with any spend cap; I will arrange my own contractor; Tenant to fix

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> Thanks for letting us know about the front door. Our system wrongly filed it as a fridge problem, so please ignore the fridge questions; we've corrected it to a door repair. We've asked the landlord to approve the repair and will update you once we have their answer, by Monday 10 June at the latest. In the meantime, please close the door gently and avoid slamming it, to protect the glass. If the door won't lock or you feel unsafe, tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Cause of the door fault and glass risk not established (hearsay from fridge engineer)
- Does not establish who pays

## Remaining work
- Landlord decision, then assign contractor and book visit (agency)
- Chase landlord on second channel after 10 June if silent

## Missing or unavailable information
- Landlord decision and spend limit
- Tenant access details and pets (unanswered)
- Whether door still locks securely

## Conflicts between sources
- Intake classified as Appliances/fridge, but the tenant's text describes a door; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as Appliances; it is really a door repair (routine). Outstanding: landlord decision, contractor assignment, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-102) via the agency landlord record, and a tenant update by email on the existing thread; follow-up on 10 June.

**3. Does anything need a human decision, and why?**

No human escalation; the decision belongs to the landlord, which is already requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-014-misclassified-door","note":"Misclassified at intake as Appliances (fridge Q&A irrelevant). Tenant reports front door (and… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `request_landlord_approval` | {"ticket_ref":"NBL-014-misclassified-door","landlord":"Landlord, Flat 12, 52 Meadow Row","decision_needed":"Tenant reports the front door (a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"NBL-014-mi… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-10","party":"Landlord","purpose":"Chase landlord decision on door repair; chase… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
