# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a front door that must be slammed to close, with a glass-shatter risk. Intake wrongly classed it as a fridge/appliance routine job. I reclassified it as an urgent door issue, sent the tenant safety advice and questions, asked the landlord to approve, and put the job on hold to 2024-06-07.

## Where the case stands
Intake stage, on hold awaiting landlord decision and tenant answers; review 2024-06-07. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Corrected ticket from Appliances/routine to door/locks, urgent | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Safety note, apology for misclassification, asked about door security, glass, access | Tenant | email | A2 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Asked landlord to choose our contractor or own, reply by 2024-06-09 | Landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Sorry, our system logged it as a fridge issue by mistake. We have corrected it to a front door problem and are treating it as urgent. Until it is looked at, please try not to slam the door, especially if it has glass, and keep children and pets away from it. A few quick questions: 1) Does the front door lock and stay secure when closed, so the property is safe tonight? 2) Is the glass in the door cracked or loose, and is the back door also affected? 3) What days and times suit for access, and are there any alarms, pets or entry codes we should know about? We are asking the landlord to approve a repair and will update you by tomorrow.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) will not close without slamming, with a risk of the glass shattering. Do you want us to send our contractor, or will you arrange your own?
> 
> Options: Send our contractor to inspect and repair (recommended); Landlord arranges own contractor; Tenant not to fix
> 
> Update: Job is classed as urgent (security and glass safety). We have asked the tenant whether the door is secure now and for access times. No visit booked yet. Please reply by 2024-06-09.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the cause, glass condition or who pays
- No contractor assigned or visit booked
- Fridge engineer's comment is hearsay, no report seen

## Remaining work
- Landlord decision (agency owner)
- Tenant answers on security and access
- Assign contractor and book visit after approval

## Missing or unavailable information
- Whether the door is secure
- Glass condition
- Access times
- Landlord decision

## Conflicts between sources
- Intake classified as Appliances/fridge; the tenant's words describe a door fault. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance job. Now corrected to an urgent door job. Outstanding: landlord decision, tenant answers on security and access, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, via the landlord record) and tenant questions and safety note (email on the existing thread); the hold is reviewed 2024-06-07.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on our contractor versus their own. I would escalate P2 if the tenant says the door cannot be secured or the glass is damaged, or if the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but the fault is the front door (and back door) no… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"NBL-014-mi… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) will not c… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (our contractor vs own) and… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
