# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classified a front door fault as an appliance job. I reclassified it as urgent door/glass security, sent the tenant a safety note and questions, asked the landlord to choose a contractor, and put the ticket on hold with a review date.

## Where the case stands
Intake stage, ticket on hold (review 2024-06-07). Reclassified from appliance/routine to door security and glass safety, urgent. Waiting on landlord decision (APR-102) and tenant answers (MSG-101).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether our contractor or their own should repair the door, reply by 2024-06-08 | Landlord | portal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Apologise for misclassification, give no-slamming safety note, ask whether door secures, glass cracked, back door, access and pets | Tenant, Flat 12 | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Sorry, our system wrongly treated it as a fridge problem; we have corrected it and are treating it as an urgent front door repair. Until it's fixed, please don't slam the door, as the glass could break. Keep clear of the door if you see any cracks. A few quick questions: 1) Does the front door close and lock securely at the moment, so the flat is safe overnight? 2) Is there any cracked glass? 3) Does the back door have the same problem? 4) Any access details we should know (entry codes, alarm) and any pets? We aim to get an urgent repair done within 72 hours of approval; we're asking the landlord now and will update you by tomorrow.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports front door (and back door) must be slammed to shut; a contractor visiting for another job warned the glass could shatter. Do you want us to send our contractor to inspect and repair, or will you arrange your own? Reply by 2024-06-08.
> 
> Options: Our contractor attends (recommended, urgent security/glass item); You arrange your own contractor (please give name and date); Tenant fixes it
> 
> Update: No visit booked yet. We're asking the tenant whether the door secures and if glass is cracked. We'll update you when we hear.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked; no approval given
- Does not establish the cause, whether glass is damaged, or who pays
- Tenant's account of the contractor's comment is unverified hearsay

## Remaining work
- Landlord decision (agency)
- Tenant answers on security and glass
- Assign contractor and book visit once approved
- Ask the 'fridge man' contractor to confirm what he saw if useful

## Missing or unavailable information
- Whether the door secures and locks
- Glass type and condition
- Landlord's contractor choice and spend limit
- Tenant contact details not on file; used existing thread

## Conflicts between sources
- Intake classified Appliances/routine, but the tenant's words describe a door fault; trusted the tenant's words. The fridge Q&A is irrelevant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, now reclassified as an urgent front door fault. Outstanding: landlord decision, tenant answers on security and glass, then contractor assignment and a visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (portal/agency landlord record) and tenant message (email on the existing thread), both sent.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the contractor. Escalate P2 if the landlord is silent beyond 3 days, or sooner if the tenant says the door won't secure.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine but the fault is the front door (and back door) not… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports front door (and b… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice of contractor and tenant answ… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
