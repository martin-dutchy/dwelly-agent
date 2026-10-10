# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misclassified a front door fault as a routine fridge issue. I corrected the ticket to urgent door/security, messaged the tenant with a safety note and questions, asked the landlord to choose a contractor, and put the job on hold to 2024-06-07.

## Where the case stands
Intake stage, on hold awaiting landlord decision and tenant answers; review 2024-06-07. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant of the reclassification, gave glass/slamming safety note, asked if door secures and glass is damaged, access and pets | Tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord whether to send our contractor or arrange their own, by 2024-06-07 | Landlord | portal | A3 ✅ |
| 3 | WAIT | Hold with review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 request)** (verified)

> Hello, thanks for reporting this. Sorry, our form wrongly treated it as a fridge problem; we've corrected it and logged it as a front door repair. Until it's fixed, please avoid slamming the door (the glass could break) and keep clear of the glass if it does. Two quick questions: does the front door lock and stay secured when shut, so the flat is safe now? And is the glass cracked or damaged at all? Also, are there any access details or pets we should know about for a visit? We're asking the landlord to approve the repair and will update you by 2024-06-07.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a contractor reportedly warned the glass could shatter. Security/safety item, urgent. Do you want us to send our contractor, or will you arrange your own?
> 
> Options: Send our contractor (recommended); Landlord arranges own contractor; Tenant arranges fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the cause, glass condition or who pays
- No appointment is booked or promised
- The fridge contractor's remark is hearsay

## Remaining work
- Landlord decision, then assign door contractor (ops)
- Tenant answers on security and glass
- If door cannot be secured, raise to emergency make-safe

## Missing or unavailable information
- Whether door secures
- Glass condition
- Access details
- Landlord decision

## Conflicts between sources
- Intake classified as Appliances/routine; tenant's words describe a door, so I treated the door as correct.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified; now corrected to urgent door/security. Outstanding: landlord decision, tenant answers, contractor assignment.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (portal/landlord record) and tenant email with safety note and questions, both sent.

**3. Does anything need a human decision, and why?**

Not yet; the landlord decides on the contractor. Escalate only if the door cannot be secured or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine but the fault is the front door (and back door) not… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","body":"Hello, thanks… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","decision_needed":"Tenant reports the front door (and back door) must be slammed to shut; a c… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Landlord decision on contractor; tenant answers on doo… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
