# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a front door fault as a routine appliance job. I reclassified it as an urgent door/security job, asked the tenant door-specific questions with safety advice, requested landlord approval and set a follow-up for 7 June.

## Where the case stands
Intake stage. Ticket reclassified from appliances/routine to door/security, urgent. Waiting on landlord approval (APR-102) and tenant answers; no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or name their own for the door repair, reply by 7 June | Landlord | portal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Apologise for wrong fridge questions, give safety note, ask door-specific questions | Tenant | email | A2 ✅ |
| 3 | RECLASSIFY | Update ticket to door/security, urgent | internal | internal | A1 ✅ |
| 4 | WAIT | Follow up 7 June on landlord reply and tenant answers | Landlord and tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 request)** (verified)

> Hello, sorry, our automated questions about a fridge were wrong. We understand the problem is your front door (and back door), which only shuts if slammed, and that there is a risk the glass could break. We have logged it as an urgent door repair. Meanwhile, please avoid slamming it, keep people and pets away from the glass, and make sure the door is properly locked when you go out or at night. If glass cracks, keep clear and tell us straight away. Could you tell us: 1) is the glass cracked or loose now? 2) does the door not latch, or is it sticking or dropping? 3) what are the best times for access, and any alarm or entry codes? 4) any pets? We are asking the landlord to approve the repair and will update you by 7 June. Our target for urgent work is within 72 hours once approved.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer reportedly warned the glass could shatter. This is a security/glass safety item, urgent. Do you approve our contractor attending to inspect and repair, or will you arrange your own? Please reply by 7 June 2024.
> 
> Options: Approve our contractor to inspect and repair (recommended); Landlord arranges own contractor (please give name and date); Tenant fixes it

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked and no contractor assigned; no cause is confirmed
- The fridge engineer's comment is the tenant's hearsay
- Severity urgent is my judgement; the ticket system stage is still init

## Remaining work
- Landlord decision (agency, by 7 June)
- Tenant answers on glass condition, latch, access
- Assign contractor and book visit after approval

## Missing or unavailable information
- Landlord decision
- Glass condition and door fault detail
- Access arrangements and pets
- Tenant contact details not shown; used existing thread

## Conflicts between sources
- Intake classed it as Appliances/routine with fridge questions, but the tenant's words describe a door; the fridge engineer only appears as a visitor. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. Misclassified as appliances; now corrected to urgent door/security. Outstanding: landlord approval, tenant answers, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (portal/agency landlord record) and tenant email with safety advice and questions; follow-up on 7 June.

**3. Does anything need a human decision, and why?**

No escalation now. The decision is the landlord's; escalate P2 if they are silent beyond 3 days after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but the report is about the front door (and back d… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","ticket_ref":"NBL-014… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) must be sl… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-07","purpose":"Check landlord reply on door repair approval and tenant answers;… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
