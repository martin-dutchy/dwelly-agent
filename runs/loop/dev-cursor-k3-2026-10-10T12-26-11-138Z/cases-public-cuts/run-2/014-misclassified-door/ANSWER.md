# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Intake wrongly labelled a front-door repair as a fridge/appliance issue. I reclassified it in a ticket note, asked the landlord for approval and asked the tenant for door and glass details. The ticket is on hold until 2024-06-10.

## Where the case stands
Intake stage, on hold to 2024-06-10. Misclassified as Appliances; corrected to a door repair. Landlord approval requested; tenant asked for details. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or say they will use their own | Landlord | internal | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about door security, glass condition, access times; apologise for misclassification | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-06-10 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut, and a visiting engineer warned the glass could shatter. May we instruct our contractor to inspect and repair the doors, or will you arrange your own?
> 
> Options: Yes, use our contractor to inspect and repair; I will arrange my own contractor; Tenant not to be involved in the fix

**A3 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Does the front door still lock and stay securely shut once closed?
> - Is the glass cracked or loose anywhere? If so, please keep clear of it and send a photo.
> - What times suit for a visit, and is there any access detail we should know (e.g. entry code)?
> 
> Why: Sorry, our form wrongly treated this as a fridge issue. We've logged it as a door repair and sought the landlord's go-ahead; we'll update you by 2024-06-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the cause, a contractor, a visit date or who pays
- Does not confirm the glass is damaged

## Remaining work
- Landlord decision (APR-101)
- Tenant answers (REQ-102)
- Assign contractor and book visit after approval
- Escalate to urgent if door cannot be secured or glass is cracked

## Missing or unavailable information
- Landlord decision and spend limit
- Whether door secures
- Glass condition
- Access details

## Conflicts between sources
- Intake classed the issue as Appliances, but the tenant's text describes a door. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

At intake, with no landlord decision or contractor yet. It was misclassified as an appliance issue but is a door repair. Landlord approval and tenant details are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request APR-101 (via the agency landlord record) and a tenant information request REQ-102 (email on the existing thread). Both are sent.

**3. Does anything need a human decision?**

No. The landlord's approval is routine and is already requested. I would escalate if the door cannot be secured or the glass is cracked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled this Appliances (clarifying fridge questions are irrelevant). It i… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) must be sl… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Does the f… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on APR-101 and tenant answe… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
