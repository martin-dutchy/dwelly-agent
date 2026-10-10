# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misclassified a door fault as a fridge appliance job. I reclassified it to door/locks, asked the tenant the right questions, asked the landlord to approve a contractor, and put the job on hold to 2024-06-07. No human decision needed yet.

## Where the case stands
Intake stage, reclassified to door/locks (urgent security). Waiting on landlord decision (APR-102) and tenant answers (REQ-101); review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor or their own for the door repair, reply by 2024-06-09 | Landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about lock security, glass condition, access times | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 review | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Does the front door lock securely once it is shut, and can you lock it with the key?
> - Is any glass in the front or back door cracked or loose? If so, please keep clear of it and send a photo.
> - Is the door catching on the frame or sagging, and when did it start?
> - What times could someone visit, and are there any access details or pets we should know about?
> 
> Why: The intake questions were about a fridge, but your report is about the doors, so we have logged it as a door repair and need these details.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front and back doors must be slammed to close, and a visiting engineer warned the glass could shatter. Do you want us to send our contractor to inspect and repair, or will you arrange your own? Please reply by 2024-06-09.
> 
> Options: Send our contractor (recommended); I will arrange my own contractor; Tenant to fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Cause of the fault and the glass risk are unconfirmed (hearsay from the tenant about the fridge engineer)
- Reclassification does not approve spend

## Remaining work
- Landlord decision
- Tenant answers on lock security, glass and access
- Assign contractor and book visit once approved
- Reassess severity if the door will not lock or glass is cracked

## Missing or unavailable information
- Landlord decision
- Whether door locks securely
- Glass condition
- Access details

## Conflicts between sources
- Intake classed the request as Appliances/routine, but the tenant's words describe a door fault; I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, with no contractor. Outstanding: the landlord decision, the tenant's answers, and then assigning a contractor and booking a visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, A3) and tenant questions (email, A2), both sent. The job is on hold until 2024-06-07.

**3. Does anything need a human decision, and why?**

Not yet. The landlord makes the approval decision. Escalate if the door cannot be locked or glass is cracked, or if the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to locks/door (security item, urgent). Tenant reports front… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Does the f… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front and back doors must be slammed … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-102) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
