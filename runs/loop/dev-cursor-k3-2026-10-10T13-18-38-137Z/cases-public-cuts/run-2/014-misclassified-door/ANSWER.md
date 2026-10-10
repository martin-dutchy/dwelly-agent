# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front door fault as a routine fridge appliance issue. I corrected the ticket to door/locks as an urgent security item. I asked the tenant the right questions and asked the landlord to choose between our contractor and their own, then put the job on hold to 2024-06-07.

## Where the case stands
Intake stage, on hold until 2024-06-07. Reclassified to door/locks, urgent. Waiting on landlord (APR-102) and tenant answers (REQ-101). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether our contractor attends or they arrange their own for the front door | Landlord | portal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant to confirm the door fault, glass condition, access details and times | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold with review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Sorry, our automatic questions about a fridge were wrong. Is it the front door that won't close properly, and does it still lock securely once shut?
> - Is the glass in the door cracked or loose at all? If it is cracked, please keep clear of it.
> - Are there any access details we should know about (entry codes, alarms), and any pets at the flat?
> - What times suit you for a contractor visit?
> 
> Why: Intake was misclassified as an appliance issue; we need the real door facts to book the right trade. Target is a visit within 72 hours once approved.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the front door has to be slammed to close, and a contractor said it could shatter the glass. Do you want us to send our contractor to inspect and repair the door, or will you arrange your own?
> 
> Options: Our contractor attends (recommended, urgent security item); You arrange your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked or assigned; no approval yet
- Cause and glass condition are unconfirmed (hearsay from the fridge engineer via tenant)

## Remaining work
- Landlord decision, then assign door/locksmith contractor and book visit (agency, review 2024-06-07)
- Tenant answers on door and glass

## Missing or unavailable information
- Tenant's reply on door/glass condition, access, pets
- Landlord decision

## Conflicts between sources
- Intake classed the issue as Appliances/routine, but the tenant's words describe a front door. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance issue. It is now corrected to a door fault (urgent). Outstanding: landlord decision, tenant details, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-102) to the landlord and clarifying questions (REQ-101) to the tenant by email. Review on 2024-06-07.

**3. Does anything need a human decision, and why?**

No human escalation. The landlord's contractor choice is a routine gate. It escalates only if the landlord stays silent past the chase cadence.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to locks/door (front door will not close without slamming, … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Sorry, our… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door h… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice of contractor and tenant's do… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
