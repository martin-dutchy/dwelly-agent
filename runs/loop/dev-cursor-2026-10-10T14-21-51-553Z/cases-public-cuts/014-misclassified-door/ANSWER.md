# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported front and back doors needing slamming, with a glass-shatter risk; intake wrongly filed it as a fridge issue. I reclassified it to urgent door security, gave the tenant safety advice and questions, asked the landlord to approve a contractor, and set a follow-up for 7 June.

## Where the case stands
Intake stage. Ticket misclassified as Appliances/routine; reclassified to door/security, urgent. Awaiting landlord decision (APR-102) and tenant answers; no contractor assigned or visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Corrected ticket to door/locks security, urgent | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Safety note (don't slam, glass risk) and questions on security, glass and access | Tenant, Flat 12 | email | A2 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether to send our contractor or their own, reply by 7 June | Landlord | email | A3 ✅ |
| 4 | WAIT | Follow-up 7 June to check replies and chase on a second channel | Landlord and tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Sorry, our system wrongly filed it as a fridge problem, so please ignore the fridge questions. We have corrected it to a door repair and are treating it as urgent. Until it is looked at, please don't slam the door, as the glass could break. Close it gently and keep clear of the glass. A few quick questions: 1) Does the front door lock securely when you leave or go to bed? 2) Is any glass cracked or loose? 3) Which days and times suit access, and are there any pets or alarms we should know about? We are asking the landlord to approve a contractor and will update you by tomorrow.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut, and a visiting engineer warned the glass could shatter. Please confirm: shall we send our contractor to inspect and repair, or will you arrange your own? Reply by 2024-06-07.
> 
> Options: Send our contractor to inspect and repair (recommended); Landlord arranges own contractor; Tenant not to fix
> 
> Update: Treated as an urgent security/safety item. Tenant has been told not to slam the door and asked whether it secures and whether glass is cracked. No visit booked yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Does not establish the cause, the glass condition, or who pays
- Fridge engineer's remarks are hearsay

## Remaining work
- Landlord decision (agency, by 7 June)
- Tenant answers on security and access
- Assign contractor and book visit once approved
- Check for the same fault at the back door

## Missing or unavailable information
- Whether the door secures
- Glass condition
- Access times, pets and alarms
- Landlord decision

## Conflicts between sources
- Intake classed it as Appliances/routine, but the tenant's words describe a door fault; I trusted the tenant's words

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake. It was misclassified and is now corrected to an urgent door issue. Outstanding: landlord decision, tenant answers, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, via the landlord record) and tenant safety message and questions (email on the existing thread). Follow-up on 7 June.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the contractor. Escalate P2 if the landlord is silent beyond 3 days after a chase, or if the tenant says the door won't secure or the glass is cracked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances/routine to door/locks (security), URGENT. Tenant reports front door… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-07","purpose":"Check landlord decision and tenant answers on door security; cha… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
