# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misclassified a door fault as a fridge/appliance routine job. I corrected the ticket to door/security, urgent, asked the tenant door-specific questions with a safety note, asked the landlord to choose our contractor or their own, and put the job on hold with a review date.

## Where the case stands
Intake, on hold. Reclassified from appliance/routine to door/security urgent. Landlord approval (APR-102) and tenant details (REQ-101) pending; no contractor assigned. Review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether our contractor or their own should repair the doors | Landlord | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant of reclassification, safety note, and next update date | Tenant | email | A4 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-06-07 | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Does the front door still lock securely when you slam it shut, and can you secure it at night?
> - Is there any cracked or loose glass in or around the front or back door? Photos would help.
> - What days and times suit for a contractor to visit, and are there any alarms or entry codes, or pets we should know about?
> - When did it start, and does the door catch on the frame, drop, or not latch?
> 
> Why: Intake wrongly treated this as a fridge issue; we need door-specific details to arrange the repair.

**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the front and back doors need slamming to shut, and a contractor said this could shatter the glass. Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Our contractor attends (recommended, urgent door/security job); You arrange your own contractor (please give name and date)

**A4 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for reporting the doors. Our system wrongly logged this as a fridge issue; we've corrected it to a door repair and marked it urgent. Until it's looked at, please try not to slam the doors, as the glass could break. Close them gently and make sure the front door is locked when you're in and out. If any glass cracks, keep clear of it and let us know straight away. We've asked the landlord to approve the repair and will update you by 2024-06-09. Please also reply to the questions we've just sent so we can book a visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Does not establish the cause or condition of the doors or glass
- Does not confirm who pays

## Remaining work
- Landlord decision (ops, after 2024-06-07)
- Tenant answers on door/glass/access
- Assign contractor and book visit once approved

## Missing or unavailable information
- Tenant's answers on lock security, glass condition, access
- Landlord decision
- Whether the fridge engineer actually reported anything

## Conflicts between sources
- Intake classified as Appliances/routine but tenant text describes doors; trusted tenant's words.

## Answers to the case questions
**1. Where does this case stand?**

At intake, misclassified; now corrected to urgent door/security job, awaiting landlord decision and tenant details.

**2. What is the next action, who, channel?**

Landlord approval request (email via landlord record) and tenant questions and safety note (email on existing thread); review 2024-06-07.

**3. Does anything need a human decision?**

No. The landlord's choice is routine and requested; escalate P2 if the landlord is silent past the chase window.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but tenant reports front and back doors must be sl… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Does the front … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","decision_needed":"Tenant reports the front and back doors need slamming to shut, and a cont… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for rep… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice (our contractor vs own) APR-1… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
