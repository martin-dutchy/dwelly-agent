# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a door complaint as a fridge appliance job. I reclassified it as a door repair (urgent, security and glass), asked the tenant the right questions, asked the landlord to choose our contractor or their own, and put the job on hold with a review date.

## Where the case stands
Intake, on hold until 2024-06-07. Reclassified to door repair, treated as urgent security/glass item. Waiting on landlord (APR-102) and tenant (REQ-101).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor or their own for the door inspection and repair | Landlord, Flat 12 | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about door security, glass condition, access and pets | Tenant, Flat 12 | email | A2 ✅ |
| 3 | WAIT | Hold to 2024-06-07 for replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door lock securely when closed, and can you lock and unlock it normally?
> - Is the glass in the door cracked or loose at all? If it is, please keep clear of it and tell us straight away.
> - Is the door dropping, sticking on the frame or are the hinges or closer loose?
> - Which days and times suit a contractor visit, and are there any access details such as entry codes or alarms?
> - Are there any pets at the property?
> 
> Why: Our intake form wrongly treated this as a fridge issue. We are logging it as a door repair and need these details to arrange a visit.

**A3 · request_landlord_approval → Landlord, Flat 12 (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to close, and a visiting engineer warned the glass could shatter. Do you want us to send our contractor to inspect and repair, or will you use your own contractor?
> 
> Options: Our contractor inspects and repairs (recommended, security/glass risk); Landlord arranges own contractor; Tenant not to fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Cause of the fault and who pays are not established
- The engineer's glass warning is the tenant's hearsay

## Remaining work
- Record landlord decision, then assign contractor and book visit
- Review tenant answers; raise to emergency if the glass is cracked or the door will not lock
- Chase on 2024-06-07

## Missing or unavailable information
- Landlord decision
- Door lock and glass condition
- Access times
- Pets

## Conflicts between sources
- Intake classed the issue as Appliances/fridge, but the tenant's words describe a front door. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance job. It is now corrected to a door repair. Landlord decision, tenant answers, contractor and visit are all outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-102) to the landlord, and an information request (REQ-101) to the tenant by email. Review on 2024-06-07.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decides on contractor choice. It escalates only if the tenant reports cracked glass or a door that will not lock.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to locks/door (front door will not close without slamming; … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does t… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12","decision_needed":"Tenant reports the front door (and back door) must be slammed to close, and a visiting en… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-102) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
