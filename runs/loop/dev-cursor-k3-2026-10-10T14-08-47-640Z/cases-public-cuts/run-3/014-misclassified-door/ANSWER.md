# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake logged the door complaint as a routine appliance job. I corrected it to an urgent door/security repair, gave the tenant a safety note and asked about security and glass, asked the landlord to choose a contractor, and put the job on hold with a review on 2024-06-07.

## Where the case stands
Intake stage, on hold. Misclassified as fridge/appliance; real fault is a door that needs slamming, with glass risk. Awaiting landlord decision and tenant answers; review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor or their own for the door repair, reply by 2024-06-09 | Landlord | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Apologise for misclassification, give glass/slamming safety note, ask if door secures and if glass is damaged | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting your front door. Sorry, our system wrongly logged this as a fridge issue; I've corrected it to a door repair and treated it as urgent. Until it's fixed, please try not to slam the door, as glass could break. Mind any glass if the door is slammed. Two quick questions: 1) Does the front door close and lock securely when you leave or at night? 2) Is any glass cracked or damaged, on the front or back door? Please also tell us any times that suit for access. We'll update you on the next step by tomorrow. If you ever feel unsafe, call 999.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer warned the glass could shatter. Do you want us to send our contractor to inspect and repair, or will you use your own contractor? Please reply by 2024-06-09.
> 
> Options: Use our contractor (recommended, urgent door/lock repair); Landlord arranges own contractor; Tenant fixes

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; no landlord approval yet
- Does not establish the cause of the door fault or who pays
- Fridge engineer's report not seen

## Remaining work
- Landlord decision (agency)
- Tenant answers on security and glass
- Assign contractor and book visit once approved
- Check whether the fridge engineer actually reported it

## Missing or unavailable information
- Whether the door secures
- Glass condition
- Access times
- Landlord decision
- Whether the back door is part of scope

## Conflicts between sources
- Intake classified as Appliances/routine; tenant's words describe a door fault. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as appliances/routine. Now corrected to an urgent door repair. Outstanding: landlord decision, tenant answers, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-102) sent via the agency landlord record. Tenant emailed on the existing thread (MSG-101) with safety note and questions.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decision is routine and pending. Escalate P2 if the landlord is silent after a chase, or the tenant says the door cannot be secured.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine but the fault is the front (and back) door that wil… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"NBL-014-mi… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) must be sl… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice of contractor for door repair… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
