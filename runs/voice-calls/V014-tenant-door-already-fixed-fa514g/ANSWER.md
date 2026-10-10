# Case V014-tenant-door-already-fixed-fa514g: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord proposed a latch workaround and a contractor visit next month. The tenant says it works only sometimes and she finds the door hard to open. I recorded the landlord's reply as conditional, asked them to approve an earlier inspection, updated the tenant and held the ticket to 10 June.

## Where the case stands
Intake/landlord gate. Landlord gave only a conditional answer (try latch workaround, contractor next month). Tenant says it works intermittently. Earlier inspection requested (APR-101); on hold to 2024-06-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no for earlier contractor inspection | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, give 999 safety line, say next update by 10 June | Ms Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 10 June for landlord answer | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (landlord)** (verified)

> Thanks for the tip on the latch. The tenant says it worked once this morning but most days it doesn't, and she is finding the door hard to open. Please can our contractor inspect the front door now rather than next month? Yes or no, please.
> 
> Options: Yes, send our contractor now (recommended); No, keep to next month

**A3 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ms Fletcher, sorry about the trouble with your front door. Your landlord suggested turning the key to pull the latch back before closing the door. They would like a contractor to look at it next month. As it is still not working most days, we have asked them to agree to an earlier visit. We will update you by 10 June. If you ever cannot get out of the flat, please call 999. Please let us know if you would rather we phone you, and the best times.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked
- Landlord reply does not authorise work now
- Tenant's identity was not verified on the call; nothing disclosed beyond the case thread

## Remaining work
- Landlord answer to APR-101 (review 10 June)
- Assign contractor and book visit if approved
- Confirm tenant's best contact number and times

## Missing or unavailable information
- Landlord decision on earlier inspection
- Tenant contact number and times

## Conflicts between sources
- Event 013 postcode PR1 9BS differs from the property's ZZ9 5ZZ; the tenant confirmed the property address on the call, so the record was trusted.
- Event 012 note says the workaround worked this morning, while the event 013 call says it works only sometimes; both are treated as true (intermittent).
- Intake classified the issue as Appliances, but it is a door/lock repair.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. The landlord's reply is conditional (workaround first, contractor next month), not approval to book. The tenant reports the door is still unreliable. Outstanding: landlord yes/no on an earlier inspection, then assigning a contractor and booking a visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request APR-101 by email, and a tenant update by email. Then wait for the landlord, review 10 June.

**3. Does anything need a human decision, and why?**

No. The landlord's decision is the gate, and it is requested. Escalate to a human only if the landlord stays silent past the review or the tenant reports being trapped or unsafe.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-V014-tenant-door-already-fixed-fa514g","decision":"conditional","conditions":"Tenant to try the key/latch workaround firs… | 1 | ✅ verified | Ticket NBL-V014-tenant-door-already-fixed-fa514g read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-V014-tenant-door-already-fixed-fa514g","decision_needed":"Thanks for the tip on the latch. The tena… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Dear Ms Fl… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-V014-tenant-door-already-fixed-fa514g","due_on":"2024-06-10","purpose":"Chase landlord on earlier door inspection; update… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-V014-tenant-door-already-fixed-fa514g","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no to earlier con… | 1 | ✅ verified | Ticket NBL-V014-tenant-door-already-fixed-fa514g read back after put_on_hold |

## Failed or unverified actions
_None._
