# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The intake wrongly logged a door fault as a fridge/appliance issue. I corrected it to an urgent door repair, wrote to the tenant with a safety note and questions, and asked the landlord to choose our contractor or their own. The ticket is on hold until 2024-06-07.

## Where the case stands
Intake/init, now on hold. Reclassified as an urgent door repair. Waiting on the landlord's decision and the tenant's answers. Review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord: our contractor or own, for door repair | Landlord | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Apologise for misclassification, safety note, ask door/glass/access questions | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for reporting your front door. Sorry, our system wrongly logged it as a fridge issue; we've corrected it and are treating it as an urgent door repair. Please ignore the fridge questions. A few quick ones: 1) Does the door close and lock securely once slammed? 2) Is any glass in or beside the door cracked or loose? 3) Is the back door the same? 4) Any entry codes/alarms, pets, and best times for access? For now, please avoid slamming the door hard, and keep clear of any cracked glass. If you can't secure the door, tell us straight away. We're asking your landlord to approve the repair and you'll hear from us by 2024-06-07.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a contractor visiting for another matter said it could cause the glass to shatter. Do you want us to send our contractor to inspect and repair, or will you arrange your own? Please reply by 2024-06-07.
> 
> Options: Send our contractor (recommended); Landlord arranges own contractor; Tenant fixes

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; no landlord approval yet
- Cause and extent of the door and glass fault are unconfirmed
- The fridge contractor's report is the tenant's hearsay

## Remaining work
- Landlord decision (agency)
- Tenant answers on door/glass
- Assign contractor and book visit once approved

## Missing or unavailable information
- Door and glass condition
- Access details
- Whether the fridge contractor reported anything
- Landlord decision

## Conflicts between sources
- Intake classed it as Appliances/Routine, but the tenant's words describe a door fault. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at intake. The classification was wrong and is now corrected to an urgent door/security repair. The landlord decision, the tenant's answers and contractor assignment are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (A3) to the landlord via the agency record. Tenant email (A2) with questions and a safety note. Both are sent; the ticket is on hold to 2024-06-07.

**3. Does anything need a human decision, and why?**

No human escalation is needed now. The decision belongs to the landlord, and it is pending. Escalate P2 if the landlord is silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/Routine: fault is front (and back) door not closing without slammin… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-014-misclas… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) must be sl… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (our contractor vs own) on … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
