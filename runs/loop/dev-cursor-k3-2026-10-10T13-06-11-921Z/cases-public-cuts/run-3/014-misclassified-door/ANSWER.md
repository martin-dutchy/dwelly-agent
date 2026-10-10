# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake mislabelled a front-door problem as a fridge/appliance issue. I corrected it to a door security/safety job (urgent), asked the landlord for approval, asked the tenant door-specific questions, and held the ticket for review on 2024-06-07.

## Where the case stands
Intake stage, reclassified to door/security (urgent). Landlord approval requested; tenant questions sent; on hold to 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or arrange their own for the door repair | Landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant door-specific questions (glass condition, locking, access) | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door at Flat 12, 52 Meadow Row only shuts if slammed (back door too), and a contractor warned the glass could shatter. Do you approve our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Use our contractor to inspect and repair (recommended); Landlord arranges own contractor

**A3 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Sorry, we first logged this as a fridge problem; we have corrected it to your front door. Is the glass in the door cracked or chipped at all?
> - Does the front door lock securely once it's shut, and can you lock it?
> - Is the door misaligned, sticking, or is the closer/hinge broken?
> - Are there any access details, alarms or pets we should know about, and what times suit a visit?
> 
> Why: Intake wrongly treated this as a fridge issue; we need door details to arrange the right repair.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; cause and cost unknown.
- Reclassification does not confirm the glass is damaged.

## Remaining work
- Landlord decision (agency)
- Tenant answers
- Assign contractor and book visit once approved

## Missing or unavailable information
- Glass condition and whether door locks
- Access details
- Landlord decision

## Conflicts between sources
- Intake classed as Appliances/routine, but tenant's words describe a front door; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance. Now reclassified as an urgent door job. Outstanding: landlord decision, tenant answers, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email via landlord record) and tenant information request (email on existing thread); review 2024-06-07.

**3. Does anything need a human decision, and why?**

No human escalation; the only decision needed is the landlord's, which has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to Door (locks/door). Tenant reports front door (and back d… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door at Flat 12, 52 Meadow Row … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","why":"Intake wrongly treated… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-101) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
