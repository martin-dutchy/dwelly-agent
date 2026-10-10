# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front/back door that won't close without slamming as a routine appliance job. I reclassified it to urgent door/security, asked the tenant the relevant questions with a safety note, asked the landlord to choose the contractor route, and put the job on hold to 2024-06-07.

## Where the case stands
Intake stage, on hold. Misclassified as a fridge/appliance job; reclassified as an urgent door/glass security fault. Awaiting landlord decision (APR-102) and tenant answers (REQ-101). Review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor, their own, or tenant fix | Landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Apologise for the fridge questions, give safety note, ask if the flat is secure, glass condition, back door, access times | Tenant | email | A2 ✅ |
| 3 | RECLASSIFY | Correct category to door/security and raise to urgent | internal | internal | A1 ✅ |
| 4 | WAIT | Hold until 2024-06-07 for replies | Landlord and tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Sorry, our form asked you about a fridge by mistake - please ignore those questions. Your report is about the doors, and we've logged it as an urgent door repair.
> - In the meantime, please don't slam the doors, and keep clear of any glass in them. Does the front door lock and secure properly when closed, so the flat is secure now?
> - Is the glass cracked or damaged anywhere, and is the back door affected as well as the front?
> - What days and times suit for a contractor to visit, and are there any entry codes, alarms or pets we should know about?
> 
> Why: Intake misclassified the door fault as an appliance; need security status and access to arrange the repair.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant at Flat 12, 52 Meadow Row reports the front door (and back door) must be slammed to shut; a contractor reportedly warned the glass could shatter. Do you want us to send our contractor to inspect and repair, will you use your own contractor, or should the tenant arrange it?
> 
> Options: Our contractor to inspect and repair (recommended); Landlord arranges own contractor; Tenant arranges fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; the landlord has not approved anything.
- Glass risk is only the tenant's account of what a contractor said; not verified.
- No timescale promised to the tenant while approval is pending.

## Remaining work
- Landlord decision (agency follows up 2024-06-07)
- Tenant to confirm the door secures and give access times
- Assign a contractor and book a visit once approved
- Escalate if the tenant reports the flat cannot be secured or the glass is broken

## Missing or unavailable information
- Whether the door secures
- Glass condition
- Back door status
- Access arrangements
- Landlord decision

## Conflicts between sources
- Intake classified the job as Appliances/routine, but the tenant's words describe a door fault. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, now reclassified as an urgent door/glass fault. Outstanding: landlord decision, tenant's security and access answers, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, APR-102) and a tenant information request (email, REQ-101), both sent. Follow-up on 2024-06-07.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides the contractor route. Escalate to a human only if the flat cannot be secured or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but the fault is the front door (and back door) no… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Sorry, our form… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant at Flat 12, 52 Meadow Row reports the front door (and back door) must be slammed to shut; a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice of contractor (APR-102) and t… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
