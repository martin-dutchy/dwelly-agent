# Case 104: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Front door fault was misclassified as appliances/routine. Landlord's reply only conditionally defers to next month; tenant now says the workaround mostly fails and describes herself as frail. Recorded the conditional decision, reclassified to urgent door/lock, asked landlord to approve sooner inspection, updated tenant with safety note, held to 10 June.

## Where the case stands
Ticket NBL-104 at intake stage, on hold (Waiting for Landlord, review 2024-06-10). Landlord asked for workaround first and contractor next month; tenant says workaround is unreliable. Sooner-visit approval requested (APR-101). No contractor assigned or visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve contractor inspection of front door this week instead of next month | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: workaround to continue, sooner visit requested, nothing booked, next update by 10 June, safety note | Ms Fletcher, tenant | email | A4 ✅ |
| 3 | WAIT | Hold for landlord reply; chase on second channel 10 June | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Thanks for the tip on the key/latch. The tenant says it works only sometimes (most days not), the door and frame wobble, and she says she is frail and struggling. Please can we send our contractor to inspect the front door this week rather than next month?
> 
> Options: Yes, send our contractor to inspect this week (recommended); No, wait until next month as you suggested; You'll arrange your own contractor (please give name and date)
> 
> Update: Tenant was told your workaround and tried it this morning; it worked once. No visit is booked. If the door will not secure or will not open, tell us and we'll treat it as urgent. We will chase on 10 June.

**A4 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Ms Fletcher, sorry the door is giving you so much trouble. We have asked your landlord today to approve a contractor to inspect it sooner than next month, as you say the key trick only works some days. Nothing is booked yet; we'll update you by Monday 10 June. Until then, please keep using the key to draw the latch back and close the door gently, not slamming. If you ever cannot get out, or the door will not lock and you feel unsafe, call us straight away, or 999 in an emergency. Please also let us know if anyone can help you with the door.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's conditional reply is not approval to assign a contractor now.
- Nothing is booked; the cause of the door fault is unknown.
- Tenant identity was not verified on the call; the message went on the existing case thread.

## Remaining work
- Landlord decision on earlier inspection (agency, chase 10 June)
- Assign contractor and book visit once approved
- Ask tenant whether other doors (back door) also affected; confirm access arrangements
- Clarify caller identity details (postcode PR1 9BS, DOB 1973 vs record)

## Missing or unavailable information
- Landlord's spend limit not on file
- Tenant's verified identity/age/vulnerability
- Whether the door can still be secured and opened from inside

## Conflicts between sources
- Landlord says workaround and visit next month; tenant (event 013) says it mostly fails; event 012 says it worked this morning. Trusted the latest tenant report for urgency.
- Intake classed it as appliances/routine; the fault is a door/lock.
- Caller gave postcode PR1 9BS and DOB 1973, and said 30 years' tenancy; record is ZZ9 5ZZ. Name given as Fletcher, event 011 says Miles.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord gate; landlord wants workaround first and contractor next month. Outstanding: landlord approval for an earlier inspection, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Approval request to the landlord (via landlord record/email) for a sooner inspection, and a tenant update by email; chase 10 June.

**3. Does anything need a human decision, and why?**

Not yet; the decision belongs to the landlord. Escalate P2 if the landlord stays silent past the chase, or sooner if the tenant reports being locked in or unable to secure the door.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-104","decision":"conditional","evidence_quote":"Can they try this first then we’ll get contractor to look at it next mont… | 1 | ✅ verified | Ticket NBL-104 read back after record_landlord_decision |
| A2 | `update_ticket` | {"ref":"NBL-104","note":"Reclassified: category locks/door (front door will not shut/open reliably, frame wobbles), not appliances. Security… | 1 | ✅ verified | Ticket NBL-104 read back at stage init |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-104","decision_needed":"Thanks for the tip on the key/latch. The tenant says it works only sometime… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hello Ms F… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-104","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on sooner contractor inspection of front door … | 1 | ✅ verified | Ticket NBL-104 read back after put_on_hold |

## Failed or unverified actions
_None._
