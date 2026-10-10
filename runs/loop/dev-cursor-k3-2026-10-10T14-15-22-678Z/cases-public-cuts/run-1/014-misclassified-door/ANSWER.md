# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front door fault as a routine fridge issue. I corrected the ticket note to door/security, urgent, sent the tenant a safety note and questions, requested landlord approval, and put the job on hold to 7 June.

## Where the case stands
Intake, on hold waiting for landlord decision (review 2024-06-07); tenant asked about security and access; no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or say they will use their own for the door repair | Landlord | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Corrected classification, gave safety note, asked if flat is secure and about back door/access | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for landlord reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for reporting this. Sorry, our system wrongly logged it as a fridge issue; we have corrected it to a front door fault and treat it as urgent. Until it is looked at, please don't slam the doors, and keep children and pets away from the door glass. Two quick questions: (1) Does the front door lock and stay shut securely when you leave or go to bed, so the flat is secure now? (2) Is the cracking risk on the front door glass only, or does the back door have the same problem? Also, please tell us any times that suit for access and whether there are alarms or pets. We are asking the landlord for approval and will update you by 7 June 2024.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports front door (and back door) has to be slammed to shut; a contractor visiting for another job warned the glass could shatter. Please confirm we may send our contractor to inspect and repair, or whether you will arrange your own.
> 
> Options: Use our contractor to inspect and repair (recommended); Landlord arranges own contractor; Other instruction

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the cause or that the glass is unsafe; that is the contractor's finding
- No contractor assigned or visit booked
- Landlord approval not yet given

## Remaining work
- Landlord decision (owner: landlord/agency)
- Tenant answers on security and access
- Assign door contractor and book visit after approval
- Chase landlord on a second channel if no reply by 2024-06-07

## Missing or unavailable information
- Whether the flat can be secured
- Whether back door is also affected
- Access details and pets
- Landlord decision

## Conflicts between sources
- Intake classification (Appliances, routine, fridge questions) conflicts with the tenant's words about a door; I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and misclassified. It is now corrected to an urgent door/security fault, awaiting landlord approval and tenant answers on security and access.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (via the agency landlord record) and a tenant email with safety advice and questions; both sent.

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decides on the contractor. Escalate P2 if the landlord is silent after a chase or the tenant says the flat is not secure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled \"Appliances/routine\" but fault is front door (and back door) tha… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for rep… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","decision_needed":"Tenant reports front door (and back door) has to be slammed to shut; a con… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on contractor for door repa… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
