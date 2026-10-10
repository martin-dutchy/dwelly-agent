# Case 014: Front Door Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

The intake wrongly labelled a door fault as an appliance issue. I noted the correction on the ticket, asked the tenant the door and access questions, and set a follow-up for 2024-06-10. No human decision is needed yet.

## Where the case stands
Intake stage. Misclassified as Appliances; actual issue is a front door that must be slammed to close. No landlord decision, no contractor. Waiting on the tenant for details.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant about glazing/damage, whether the door locks securely, and access times | Tenant | email | A2 ✅ |
| 2 | RECLASSIFY | Ticket note correcting category from appliance to door/locks | internal | internal | A1 ✅ |
| 3 | WAIT | Follow up with tenant 2024-06-10, then seek landlord approval | Tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Sorry, our system mistook this for a fridge problem, so please ignore the fridge questions. Is the front door glazed, and is the glass cracked or loose now?
> - Does the door still lock securely once it is shut, or can it be left unlocked or open?
> - What times and days suit a visit, and is there any access info (entry code, alarm, pets)?
> 
> Why: Intake misclassified the door issue as an appliance; need door details and access to arrange a routine repair.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked or approved; cause of the fault and who pays are not established
- The fridge man's comment is hearsay and unverified
- The reclassification is a ticket note; the category field was not changed

## Remaining work
- Get tenant's reply
- Get landlord approval or choice of contractor (no landlord contact on the property record)
- Assign contractor and book visit
- Raise severity if the door cannot lock or the glass is cracked

## Missing or unavailable information
- Landlord contact and spend limit
- Door type and condition, whether it locks
- Access details

## Conflicts between sources
- Intake classified the issue as Appliances (fridge), but the tenant text describes a door fault; the fridge man was only mentioned as a witness.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and misclassified. The real issue is a front door that has to be slammed to close. Outstanding: tenant details, landlord approval, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Tenant, by email on the existing thread: door and glass condition, whether it locks, and access times. A follow-up is set for 2024-06-10, then landlord approval.

**3. Does anything need a human decision, and why?**

Not yet. If the door cannot be secured or the glass is cracked, or the landlord cannot be contacted, escalate. The property record has no landlord details.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled this Appliances (fridge Q&A irrelevant). Real issue is front door … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Sorry, our… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-10","purpose":"Chase tenant for door details/access; then send landlord approva… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
