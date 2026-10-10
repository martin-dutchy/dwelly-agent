# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The intake wrongly classed a front/back door that won't close without slamming as a fridge issue. I noted the correction, asked the landlord for a contractor decision, asked the tenant for glass condition and access, and put the job on hold to 2024-06-10.

## Where the case stands
Intake stage, on hold until 2024-06-10. Landlord approval requested (APR-102); tenant asked for door details (REQ-103). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether we send our contractor or they use their own for the door repair | Landlord | internal | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about glass condition, which doors, access, and apologise for the fridge mix-up | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-06-10 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports front and back doors must be slammed to close; a visitor warned the glass could shatter. Do you want us to send our contractor to inspect and repair the doors, or will you arrange your own?
> 
> Options: Approve our contractor to inspect and repair (recommended); Landlord arranges own contractor; Tenant not to fix; decline

**A3 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Sorry, our system wrongly logged this as a fridge issue; please ignore those questions. Is the glass in either door cracked or damaged, and can you lock the front door securely? If glass is broken please keep clear of it and tell us straight away.
> - Which doors are affected (front, back or both) and what times suit access? Any entry codes, alarms or pets we should know about?
> 
> Why: Our intake wrongly treated this as a fridge problem; we need door details to arrange the right repair.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the cause or that the glass is at risk; that comes from the tenant's report and a visitor's remark only
- No contractor assigned or visit booked
- No cost or date promised

## Remaining work
- Landlord decision (agency)
- Tenant reply on glass and access
- Assign contractor and book visit once approved
- Correct the category in the system if possible

## Missing or unavailable information
- Door glass condition
- Which doors
- Access details
- Landlord decision

## Conflicts between sources
- Intake classified as Appliances/fridge but the tenant's words describe a door fault; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and misclassified as appliances. It is really a door repair. Landlord decision, tenant details, contractor and visit are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (via the agency landlord record) and a clarifying email to the tenant; both sent. Then wait to 2024-06-10.

**3. Does anything need a human decision, and why?**

Only the landlord's decision on contractor. No human escalation needed; it's routine unless the tenant reports broken glass.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-014-misclassified-door","note":"Intake misclassified as Appliances (fridge). Real issue: front door (and back door) will not … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports front and back doors must be slammed to c… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","why":"Our intake wrongl… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on contractor; tenant asked… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
