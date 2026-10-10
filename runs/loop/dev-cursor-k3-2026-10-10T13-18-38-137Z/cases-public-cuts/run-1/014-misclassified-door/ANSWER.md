# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front door fault as an appliance job. I corrected it to a door/security item, asked the tenant the right questions, asked the landlord for approval, and put the job on hold to 7 June.

## Where the case stands
Intake stage, on hold. Reclassified to door/security. Landlord approval requested; tenant questions sent. Review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to send our contractor or use their own for the front door | Landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about door/glass condition, fault type and access | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Does the front door still lock securely once you have shut it, and is any glass in or beside the door cracked or loose?
> - Is the problem that the door sticks or catches on the frame, or that the latch or handle is not engaging?
> - What days and times suit for a visit, and are there any access details or pets we should know about?
> 
> Why: Intake treated this as a fridge issue; it is a front door fault, and we need these details to book the right trade.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door must be slammed to shut (a visitor warned the glass could break). Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Send our contractor (recommended); Landlord arranges own contractor; Tenant fixes

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Cause, cost and who pays not established
- Glass risk is second-hand from a visitor, unverified

## Remaining work
- Landlord decision, then assign contractor and book visit
- Tenant answers; escalate to emergency if glass is cracked or door will not secure

## Missing or unavailable information
- Door and glass condition
- Whether the door locks securely
- Tenant availability

## Conflicts between sources
- Intake classified as Appliances/fridge; tenant's words describe a front door fault. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as a fridge issue. It is now a door/security job awaiting landlord approval and tenant details.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, via the landlord record) and tenant questions (email), with a hold until 2024-06-07.

**3. Does anything need a human decision, and why?**

No human escalation now. The landlord decides on the contractor. Escalate if the tenant reports broken glass or the door will not secure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to Doors/locks (front door will not close without slamming;… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Does the f… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door must be slammed to shut (a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-102) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
