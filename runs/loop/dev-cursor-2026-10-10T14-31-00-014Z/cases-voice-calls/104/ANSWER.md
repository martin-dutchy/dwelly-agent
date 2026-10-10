# Case 104: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Front door sticking and wobbling, misclassified as an appliance issue. Landlord suggested a latch workaround and a contractor next month. The tenant says it fails most days and describes herself as frail. I reclassified the job as an urgent door fault, recorded the landlord's reply as conditional, asked the landlord to approve an inspection now, updated the tenant, and put the job on hold until 10 June.

## Where the case stands
Landlord approval gate, on hold (review 2024-06-10). Landlord only approved the latch workaround with a contractor next month. Tenant now says the workaround fails most days. No contractor assigned or visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve sending our contractor to inspect the door now instead of next month, given new tenant information | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: urgent, landlord asked, nothing booked, close door gently, asked if she can get out and whether the door secures, next update 10 June | Ms Fletcher, tenant | email | A4 ✅ |
| 3 | WAIT | Hold for landlord reply, review 10 June | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Thanks for the latch tip. On a call today the tenant said it works only sometimes and most days the door will not open, and she describes herself as frail. May we send our contractor to inspect the door and frame now rather than next month?
> 
> Options: Yes, send our contractor to inspect now (recommended; quote comes back to you for any repair); Use your own contractor (please give name and date); Keep to next month as you suggested
> 
> Update: No visit booked and no contractor instructed. We are keeping the job open, treating it as urgent, and will chase on 10 June. Fridge fitter also reported the frame wobbling and warned of glass risk.

**A4 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ms Fletcher, I'm sorry about the trouble with your front door. We've treated it as urgent and asked your landlord today to let us send a contractor to inspect it now. We can't promise a date until they reply, and nothing is booked yet. Until then, please close the door gently rather than slamming it, as slamming could crack the glass. Could you tell us two things: can you always get out of and back into the flat, and does the door lock securely when closed? If you ever can't get out, or feel unsafe, call 999. We'll update you by Monday 10 June. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's email is not approval to instruct our contractor now.
- The tenant message does not book a visit or promise a date.
- Nothing here establishes the cause of the door fault or who pays.

## Remaining work
- Landlord decision (agency chases 10 June; escalate P2 maintenance if silent, tenant is frail and door may not open)
- Tenant to confirm whether she can exit and whether the door secures
- Assign contractor and book visit once approved
- Tenant identity details from the call did not match the record (postcode); not resolved, nothing disclosed

## Missing or unavailable information
- Whether the door secures and the tenant can always get out
- Landlord spend limit (not on record)
- Tenant's vulnerability details (self-described as frail)

## Conflicts between sources
- Event 012 note says the workaround worked, but the event 013 call says it fails most days. I treated the later call as current.
- Caller postcode PR1 9BS differs from the record ZZ9 5ZZ. The tenant name is Fletcher but event 011 says 'Miles'. The property address was confirmed on the call.
- Intake classed the job as an appliance and routine issue, but it is a door fault. I corrected this to urgent.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Landlord gate, with no contractor assigned. The landlord wants the workaround tried and a contractor next month. The tenant says the workaround fails most days. Outstanding: a landlord decision on an earlier inspection, and the tenant's answers on exit and security.

**2. Next action, recipient, channel?**

Landlord approval request by email (A3), tenant update by email (A4), and a hold with review on 10 June (A5).

**3. Does anything need a human decision?**

Not yet. The landlord decides on approval. If the landlord is silent or the tenant cannot get out of the flat, escalate P2 to maintenance. The caller's postcode mismatch is noted for staff awareness.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-104","note":"Reclassified: category locks/door (front door and latch/frame), not appliances. Severity raised from routine to urg… | 1 | ✅ verified | Ticket NBL-104 read back at stage init |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-104","decision":"conditional","evidence_quote":"Can they try this first then we’ll get contractor to look at it next mont… | 1 | ✅ verified | Ticket NBL-104 read back after record_landlord_decision |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-104","decision_needed":"Thanks for the latch tip. On a call today the tenant said it works only som… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-104","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on sending our contractor now vs next month, g… | 1 | ✅ verified | Ticket NBL-104 read back after put_on_hold |

## Failed or unverified actions
_None._
