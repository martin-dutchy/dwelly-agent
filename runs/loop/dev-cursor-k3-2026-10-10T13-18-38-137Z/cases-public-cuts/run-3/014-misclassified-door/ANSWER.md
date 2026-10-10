# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front-door fault as an appliance job. I reclassified it to door/security, urgent, asked the tenant for details, asked the landlord to approve our contractor, and put the job on hold to 2024-06-07.

## Where the case stands
Intake stage, no contractor assigned. Reclassified to door/security (urgent). Waiting on landlord decision (APR-102) and tenant answers (REQ-101); review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor for door inspection/repair, reply by 2024-06-09 | Landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about latch/lock, glass condition, photos, access times; advise not to slam door | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord and tenant replies, review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door lock or latch properly once shut, and can it be locked securely from outside?
> - Is any glass in the door cracked or loose, and could you send a photo of the door and frame?
> - What days and times suit for a visit, and are there any entry codes or alarms we should know about?
> 
> Why: Our intake wrongly treated this as a fridge issue. It is a door fault (security and possible glass risk), so we need the right details to book a repair. Until then please avoid slamming the door, and tell us at once if glass cracks.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the front door must be slammed to close (back door too), with a warning that glass could shatter. Security/safety item, urgent. May we send our contractor to inspect and repair? Please reply yes or no by 2024-06-09.
> 
> Options: Yes, send our contractor (recommended); I will arrange my own contractor; Tenant to fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the cause or that glass is damaged
- No contractor assigned or visit booked
- Fridge reported by tenant is not established as a fault

## Remaining work
- Landlord decision
- Tenant details and access
- Assign contractor and book visit once approved
- Escalate if glass is cracked or door cannot be locked

## Missing or unavailable information
- Whether the door locks securely
- Glass condition
- Access times
- Landlord decision
- Tenant contact details not in file; used existing thread

## Conflicts between sources
- Intake classed the issue as Appliances/routine with fridge questions, but the tenant describes a door fault. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance job. It is now corrected to an urgent door/security job. Outstanding: landlord approval, tenant details, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (landlord record) and an information request to the tenant by email on the existing thread; both sent.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the contractor. Escalate if the tenant reports cracked glass or an unlockable door, or if the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to locks/door (security), urgent. Tenant reports front door… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does the front … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door m… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-102) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
