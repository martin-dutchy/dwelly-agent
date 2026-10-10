# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misclassified a front door fault as a fridge issue. I noted the ticket as door/locks, urgent, sent the tenant safety advice and door questions, and asked the landlord to choose our contractor or their own. A follow-up is set for 2024-06-07.

## Where the case stands
Intake stage. Misclassified as appliance/routine; actually front door (and back door) security and glass risk, reclassified urgent in the ticket note. Waiting on landlord decision (APR-102) and tenant answers. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to use our contractor or their own for the door | Landlord | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Safety note, correct the mix-up, ask door-specific questions, give next update date | Tenant | email | A2 ✅ |
| 3 | RECLASSIFY | Ticket note correcting category to door/locks, urgent | internal | internal | A1 ✅ |
| 4 | WAIT | Follow up 2024-06-07 on landlord decision and tenant answers | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Sorry about the automated fridge questions earlier, please ignore them: we've logged this as a front door problem and treated it as urgent. Until it's looked at, please don't slam the door, and keep people and pets clear of any glass in it. Please close it gently and check it's locked when you go out and at night. If you see cracks in the glass or the door won't lock, tell us straight away. Could you tell us: 1) is the glass in the front door, the back door, or both? 2) does the door still lock properly? 3) what is the door sticking on (does it rub, or is it the latch)? A photo would help. 4) which times suit for access, and any pets or alarms we should know of? We are checking with the landlord on the repair and will update you by 2024-06-10.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) has to be slammed to shut, and a contractor visiting for the fridge said this could shatter the glass. Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Use our contractor (recommended, urgent security/glass risk); Landlord arranges own contractor (please give name and date)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked; landlord approval is pending
- Cause and extent of the door or glass fault are unconfirmed; the fridge engineer's comment is the tenant's hearsay
- The ticket severity field could not be changed with the tools, only noted

## Remaining work
- Landlord decision (agency follows up 2024-06-07)
- Tenant answers and access times
- Assign contractor and book visit once approved

## Missing or unavailable information
- Which doors have glass and their condition
- Whether the door locks
- Access times, pets, alarms
- Landlord decision

## Conflicts between sources
- Intake classification (appliances, routine) contradicts the tenant's words about doors; I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake. It was misclassified as an appliance issue and is really a door/glass security issue, now treated as urgent. The landlord decision and tenant answers are outstanding.

**2. What is the next action, who is it for, and through which channel?**

The landlord approval request (APR-102) and the tenant email (MSG-101) are sent. Next, follow up on 2024-06-07, then assign a contractor once the landlord approves.

**3. Does anything need a human decision, and why?**

No escalation yet. The landlord decides the route, and this is routine process. Escalate P2 if the landlord is silent past the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine but tenant describes front door (and back door) tha… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"NBL-014-mi… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) has to be … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-07","party":"Landlord and tenant","purpose":"Check landlord decision and tenant… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
