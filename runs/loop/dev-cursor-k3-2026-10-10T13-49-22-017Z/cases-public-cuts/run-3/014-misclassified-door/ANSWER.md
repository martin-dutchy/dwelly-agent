# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misfiled a door fault as a fridge issue. I corrected the ticket to door/security (urgent), asked the tenant about the doors, gave a safety note, asked the landlord for a decision and set a follow-up for 7 June.

## Where the case stands
Intake stage. Misclassified as fridge/routine; corrected to door/security-glass risk, urgent. Waiting on landlord decision (APR-102) and tenant answers (REQ-101). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose our contractor, own contractor, or tenant fix, reply by 2024-06-08 | Landlord | internal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant about door/glass/lock condition and access | Tenant | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the ticket is corrected, give safety note, say next update by 8 June | Tenant | email | A4 ✅ |
| 4 | WAIT | Follow up 2024-06-07 on landlord and tenant replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> - Does the front door close and lock securely once you slam it, or can it be left unlocked or not latching?
> - Does the door have glass in it, and is any of it cracked or loose?
> - Is the back door the same, and is the problem the door catching on the frame, the hinges or the latch?
> - When are you free for a contractor to visit, and are there any pets or access details (entry codes, alarms) we should know about?
> 
> Why: Intake logged this as a fridge issue; the real fault is the doors. We need details to book the right repair.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports front and back doors need slamming to close, with a risk of glass shattering (reported by a visiting contractor). Please confirm whether we send our contractor to inspect and repair, you'll use your own, or the tenant should arrange it. Reply by 2024-06-08.
> 
> Options: Our contractor attends (recommended); Landlord arranges their own contractor; Tenant arranges fix

**A4 · send_message → Tenant (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Our system wrongly logged it as a fridge problem; we've corrected it to a door repair and raised its priority. Until it's fixed, please don't slam the door, and keep clear of any glass if it looks cracked or loose. Make sure the door is properly locked when you leave or go to bed. We've asked the landlord to approve the repair and sent you a few questions about the doors. You'll hear from us again by 8 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked; nothing approved
- Does not establish whether the door is unsecure or glass is damaged
- No repair timescale promised as approval is pending

## Remaining work
- Landlord decision (agency)
- Tenant answers
- Assign contractor and book visit after approval
- Chase landlord on second channel if silent by 2024-06-07

## Missing or unavailable information
- Door/glass condition and whether it locks
- Access details, pets
- Landlord decision
- Tenant contact not on file; used the existing thread

## Conflicts between sources
- Intake classified Appliances/routine; tenant's words describe a door fault. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, now reclassified as an urgent door/glass-risk repair. Outstanding: landlord decision, tenant answers, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (A3) to the landlord via the agency record; tenant questions and safety reply by email on the existing thread (A2, A4).

**3. Does anything need a human decision, and why?**

No escalation now. The decision belongs to the landlord, not a human at the agency; escalate P2 if the landlord is silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but tenant reports front door (and back door) must… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Does the f… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant reports front and back doors need slamming to close, with a risk of glass shattering (repor… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"NBL-014-mi… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-07","party":"Landlord and tenant","purpose":"Check for landlord decision (APR-1… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
