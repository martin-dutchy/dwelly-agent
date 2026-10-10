# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reported doors needing slamming to shut; intake wrongly classed it as a fridge issue. I noted the correction, asked the landlord for approval, told the tenant, and set a follow-up for 2024-06-10.

## Where the case stands
Intake stage; misclassified as Appliances, noted as a door issue (routine). Landlord approval requested (APR-101); no contractor assigned. Waiting on landlord, follow-up 2024-06-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose our contractor, their own, or tenant fix for the door | Landlord | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the fridge questions are void, door repair requested, avoid slamming, next update by 2024-06-10 | Tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord decision; chase 2024-06-10 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer reportedly warned this could shatter the glass. Shall we send our contractor to inspect and repair the door, or will you arrange your own contractor?
> 
> Options: Yes, send our contractor to inspect and repair (recommended); I will arrange my own contractor; Tenant to deal with it themselves

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001 request)** (verified)

> Hello, thanks for letting us know about the front door. Our system wrongly logged it as a fridge issue, so please ignore the fridge questions we sent. We have corrected it to a door repair and asked the landlord to approve it. Until it is looked at, please try not to slam the door, and keep clear of the glass if it feels loose. If you see cracks, let us know straight away. We will update you by 2024-06-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked
- Reclassification is a ticket note only; the category field was not changed by a tool
- Cause of door fault and glass risk unconfirmed (second-hand report from fridge engineer)
- Landlord approval does not yet exist

## Remaining work
- Landlord decision (agency)
- Assign contractor and book visit after approval
- Confirm access details and pets with tenant at booking
- Check whether the fridge engineer actually reported anything

## Missing or unavailable information
- Landlord decision
- Door/glass type and condition
- Access arrangements

## Conflicts between sources
- Intake classified the issue as Appliances/fridge, but the tenant's words describe a front door; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as Appliances. It is really a routine door repair. Landlord decision is outstanding, then contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) via the agency landlord record, and a tenant update by email on the existing thread.

**3. Does anything need a human decision, and why?**

No escalation. The landlord has to decide on approval, but this is routine and handled through the approval request and follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassify: intake labelled this Appliances (fridge questions unanswered, not relevant). Actual … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","ticket_ref":"NBL-014… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-10","party":"Landlord","purpose":"Chase landlord decision on front door repair;… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
