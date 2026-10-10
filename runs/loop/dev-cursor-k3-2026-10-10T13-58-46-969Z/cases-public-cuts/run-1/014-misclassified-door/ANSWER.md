# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a front door needing slamming, with a warning that glass could shatter; intake wrongly filed it as a routine appliance job. I corrected it to an urgent door/security job, gave the tenant safety advice and door-specific questions, asked the landlord to approve a contractor, and set a follow-up for 2024-06-07.

## Where the case stands
Intake stage. Misclassified as Appliances/routine; corrected to door/security/glass, urgent. Waiting on landlord decision (APR-102) and tenant answers (REQ-101). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord to choose our contractor or their own for the urgent door repair, reply by 2024-06-09 | Landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Asked tenant door-specific questions (glass condition, locking, photos, access) | Tenant | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Apologised for misclassification, gave safety note, said next update by 2024-06-09 | Tenant | email | A4 ✅ |
| 4 | WAIT | Follow-up 2024-06-07 to chase landlord on a second channel if silent | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door glass look cracked or loose, and does the door still lock securely once shut?
> - What exactly happens: does it catch on the frame, drop, or need force to latch? Photos of the door edge, hinges and glass would help.
> - Any entry codes, alarms or pets we should know about for a visit, and which times suit you?
> 
> Why: Intake asked fridge questions by mistake; the real issue is the door. Need details to arrange the repair.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut, and a visiting engineer warned the glass could shatter. This is a security/glass item, so we've treated it as urgent. Please reply by 2024-06-09: shall we send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Yes, send your contractor (recommended); I'll arrange my own contractor (please give name and date); Tenant to fix

**A4 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, sorry: our automatic system wrongly treated your report as a fridge problem. We've corrected it to a front door repair and marked it urgent. Until it's fixed, please don't slam the door, close it firmly but gently, and make sure it is locked when you're in and out. Keep clear of the glass if it looks cracked. If glass breaks or the door won't secure, tell us straight away (999 if you are in danger). We've asked the landlord to approve the repair and will update you by 2024-06-09. Please answer the questions in our other email so we can move quickly.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the cause or that glass is damaged
- No contractor assigned and no spend approved
- No visit booked; no timescale promised to tenant

## Remaining work
- Landlord decision (agency)
- Tenant answers and photos
- Assign contractor and book visit once approved
- Chase landlord 2024-06-07

## Missing or unavailable information
- Door and glass condition
- Access details and pets
- Landlord decision
- Tenant contact details not on file; used existing thread

## Conflicts between sources
- Intake classed it Appliances/routine; tenant's words describe a door fault, so I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, with no contractor. Wrongly classified as an appliance job; now corrected to urgent door/glass. Outstanding: landlord decision, tenant details, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (our contractor or theirs) sent via the agency landlord record; tenant told and questioned by email; follow-up on 2024-06-07.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decides on the contractor. Escalate P2 if the landlord is silent after the chase, or sooner if the tenant reports broken glass or an unsecured door.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine (fridge mentioned only as the visitor). Real fault … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does the front … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-014-misclas… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-07","party":"Landlord","purpose":"Urgent door job: check for landlord decision … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
