# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant's door complaint was misclassified as a routine appliance issue. I corrected the ticket to doors/security (urgent), asked the tenant for details, asked the landlord to choose a contractor, and put the job on hold with review on 2024-06-07.

## Where the case stands
Intake stage, no provider assigned. Reclassified to door/security, urgent. Waiting on landlord decision (APR-102) and tenant reply (REQ-101); review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor or their own for the door | Landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant for door details, photo, glass condition and access | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until landlord and tenant reply; review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001)** (verified)

> - Sorry, our system wrongly treated this as a fridge issue; please ignore the fridge questions. It's your front door (and back door) we're looking at.
> - Does the front door lock securely when it shuts, and is any glass cracked or loose? If glass is cracked, please keep clear of it.
> - Is it the door sticking, dropping or not latching? A photo would help.
> - What days and times suit for access, and are there any pets or alarms we should know about?
> 
> Why: Intake misclassified the report; we need door details and access to arrange the repair.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports front and back doors must be slammed to shut, and a visiting engineer warned the glass could shatter. Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Use our contractor to inspect and repair (recommended); Landlord arranges own contractor; Tenant to fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Cause and who pays are not established
- Fridge man's claim is hearsay

## Remaining work
- Landlord decision
- Tenant details and access
- Assign contractor and book visit once approved

## Missing or unavailable information
- Door/glass condition, access times
- Landlord decision
- No contractor named in records

## Conflicts between sources
- Intake classed this as Appliances/fridge, but the tenant's words describe a door. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand?**

At intake, with no provider assigned. The ticket was misclassified as appliances/routine and is now corrected to door/security, urgent. Landlord decision and tenant details are outstanding.

**2. Next action?**

Email the tenant for door details and access (REQ-101). Send the landlord the contractor approval request (APR-102). Hold until 2024-06-07.

**3. Human decision needed?**

No. The landlord gate is routine and is handled by the approval request. Escalate only if the tenant reports broken glass or an insecure door, or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine: tenant reports front door (and back door) must be slammed … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Sorry,… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","decision_needed":"Tenant reports front and back doors must be slammed to shut, and a visitin… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Landlord decision on contractor (APR-102) and tenant d… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
