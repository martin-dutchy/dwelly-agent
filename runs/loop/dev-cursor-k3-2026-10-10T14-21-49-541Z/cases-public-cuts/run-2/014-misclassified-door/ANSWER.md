# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake misclassified a door fault as a fridge/appliance routine job. I reclassified it as an urgent door security item, sent the tenant a safety note and questions, asked the landlord to approve, and put the job on hold with review on 2024-06-07.

## Where the case stands
Intake stage, on hold awaiting landlord decision and tenant answers; no contractor assigned, no visit booked. Review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Corrected ticket from Appliances/routine to door/security, urgent | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Apologised for misclassification, gave glass safety note, asked if door secures and glass is damaged, access and pets | Tenant, Flat 12 | email | A2 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Asked landlord to approve our contractor or arrange their own, reply by 2024-06-09 | Landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | Landlord and tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Sorry, our system wrongly logged it as a fridge issue; we have corrected it to a front door repair and treat it as urgent. Please ignore the fridge questions. For now, please close the door gently rather than slamming it, as slamming could crack the glass. If any glass is cracked, keep clear of it and tell us straight away. Two quick questions: does the front door lock and stay secure when closed, so the flat is safe tonight? And is the glass in the door cracked or damaged at all? Also, please tell us of any access details or pets we should know about. We are asking your landlord to approve the repair and will update you by tomorrow.

**A3 · request_landlord_approval → Landlord, Flat 12 (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer reportedly warned the glass could shatter. Do you approve our contractor attending to inspect and repair, or will you arrange your own?
> 
> Options: Approve our contractor to inspect and repair (recommended); Landlord arranges own contractor; Tenant not to arrange repair
> 
> Update: No visit booked yet. We have asked the tenant whether the door secures and whether the glass is damaged. Please reply by 2024-06-09. It is treated as urgent as a security and glass-safety item.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the cause or that the door is unsafe
- No contractor assigned or visit booked; no cost approved
- Tenant message sent on existing thread; no contact details on file

## Remaining work
- Landlord decision (agency ops)
- Tenant answers on security and glass
- Assign contractor and book visit once approved
- If door cannot be secured, escalate P2 and make safe

## Missing or unavailable information
- Whether door secures and glass is damaged
- Landlord decision
- Fridge man's report not seen; which door/glass type unknown

## Conflicts between sources
- Intake classified as Appliances/fridge; tenant's words describe a door fault. Trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified; now corrected to urgent door/security. Outstanding: landlord decision, tenant answers, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email via agency landlord record) and tenant email asking about door security and glass; chase on 2024-06-07.

**3. Does anything need a human decision, and why?**

Not yet. Landlord decides on the repair route. Escalate P2 if the tenant says the door cannot be secured or glass is cracked, or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine, but the fault is the front (and back) door not clo… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) m… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord approval/own-contractor decision and… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
