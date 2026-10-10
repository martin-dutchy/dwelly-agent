# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misclassified a door problem as a fridge/appliance issue. I corrected the ticket to a door security and glass-safety job (urgent), asked the tenant the right questions, asked the landlord to approve a contractor, and put the job on hold until 2024-06-07.

## Where the case stands
Intake stage, on hold until 2024-06-07. Reclassified to door repair (urgent). Landlord approval requested; tenant questions sent. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether we send our contractor for the door | Landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about door condition, glass, access, pets | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold with review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001 request)** (verified)

> - Does the front door lock securely when closed, and is any glass in it cracked or loose? Please avoid slamming it for now.
> - Is the door sticking, dropping or not lining up with the frame? A photo would help.
> - Is the back door the same, and which times suit for a visit, with any access details or alarms?
> - Are there any pets at the property?
> 
> Why: Intake wrongly treated this as a fridge issue; we need the real door details to arrange the repair.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) has to be slammed to shut, and a visitor warned the glass could shatter. May we send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Yes, send our contractor (recommended); I will arrange my own contractor; Tenant to fix

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the fault or cause
- No contractor assigned or approved
- No visit booked

## Remaining work
- Landlord decision (agency, review 2024-06-07)
- Tenant reply on door details
- Assign contractor and book visit once approved

## Missing or unavailable information
- Door condition and whether it locks
- Whether glass is cracked
- Access details and pets
- Landlord decision

## Conflicts between sources
- Intake classed it as Appliances/routine with fridge questions, but the tenant describes a door; I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified. Now corrected to a door repair (urgent). Outstanding: landlord decision, tenant details, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, A3) and tenant information request (email, A2); hold until 2024-06-07.

**3. Does anything need a human decision, and why?**

No escalation now. The decision on contractor belongs to the landlord and has been requested. If they are silent past the chase window, escalate P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to doors/locks (security and glass safety), urgent. Tenant … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","questions":["Does th… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant reports the front door (and back door) has to be slammed to shut, and a visitor warned the … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Landlord decision on contractor (APR-102) and tenant d… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
