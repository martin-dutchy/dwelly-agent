# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's door fault was misfiled as an appliance issue. I noted the correction, asked the landlord to choose a contractor, asked the tenant for glass and access details, and put the job on hold to 2024-06-07.

## Where the case stands
Intake stage. Misclassified as Appliances; it is a front/back door fault. Landlord approval requested, tenant asked for glass condition and access, ticket on hold until 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord whether we send our contractor or they arrange their own for the door | Landlord, landlord | internal | A2 ✅ |
| 2 | REQUEST_INFORMATION | Asked tenant about glass condition, access and pets | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold to review on 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord of Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to close; a visiting engineer warned it could shatter the glass. Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Our contractor inspects and repairs (recommended); Landlord arranges own contractor; Tenant fixes it

**A3 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> - Is the glass in the door cracked or loose at all right now?
> - Are there any entry codes, alarms or pets we should know about for a visit, and what times suit you?
> 
> Why: We have logged this as a front door repair (not a fridge issue) and need access details and to check for any glass damage.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Does not establish the cause of the door fault or who pays
- The reclassification is a note only; the category field was not changed by tool

## Remaining work
- Landlord decision (APR-101)
- Tenant reply (REQ-102)
- Assign contractor and book visit once approved
- Chase landlord if silent by review date

## Missing or unavailable information
- Landlord contact and spend limit not on file
- Whether the glass is already damaged
- Access details and pets

## Conflicts between sources
- Intake classification says Appliances/fridge, but the tenant's text describes a door fault; I trusted the tenant's text.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as Appliances. It is a front/back door that won't close without slamming. Outstanding: landlord decision, tenant access details, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord, and an information request (REQ-102) to the tenant by email on the existing thread.

**3. Does anything need a human decision, and why?**

No human escalation now. The decision belongs to the landlord. Escalate only if they stay silent and the glass is found to be damaged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled this Appliances (fridge) but the fault is the front door (and back… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord of Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["I… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-101) on contractor, an… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
