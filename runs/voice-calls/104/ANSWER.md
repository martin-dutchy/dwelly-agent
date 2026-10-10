# Case 104: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord suggested a key/latch workaround and a contractor next month. The tenant says it works only sometimes and she is frail. I reclassified the job to urgent door/locks, recorded the landlord's reply as conditional, asked the landlord for approval to inspect sooner, updated the tenant and put the job on hold until 8 June.

## Where the case stands
Stage init, on hold (Waiting for Landlord) until 2024-06-08. Landlord only approved trying a workaround and a contractor next month; no instruction to assign now. Tenant's latest call says the workaround is unreliable and she struggles to open the door.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no to an earlier contractor inspection this week, reply by 2024-06-08 | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant ticket is urgent, the earlier inspection is requested but unconfirmed, next update by 8 June, 999 if unsafe | Ms Fletcher, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 2024-06-08 for landlord reply, then chase on a second channel if silent | Landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Thanks for the tip on the key/latch. We have spoken to the tenant: it worked once this morning, but she says it fails most days and she is struggling to open the door, and the door and frame wobble. Because of the risk of her being unable to open the door, may we send our contractor to inspect it this week rather than next month? Please reply yes or no by end of tomorrow, 2024-06-08.
> 
> Options: Yes - send our contractor to inspect this week (recommended); No - keep to next month, landlord arranges own contractor; Other instruction

**A4 · send_message → Ms Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ms Fletcher, I'm sorry about the trouble with your front door. We have logged it as urgent. Your landlord suggested turning the key to draw the latch back before closing the door gently, and they would like a contractor to look next month. As it is not working reliably for you, we have asked your landlord today to agree to an earlier inspection. We can't confirm a visit until they reply. We will update you by 8 June. If you ever can't get the door open and feel unsafe, call 999. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's reply as conditional does not authorise any contractor or spend.
- No visit is booked and no cause is established.
- The tenant's identity was not re-verified; she is the case's tenant and confirmed the property address.

## Remaining work
- Landlord answer on earlier inspection (agency, review 2024-06-08)
- If yes: assign a contractor and book a provider-confirmed visit; if silent beyond 3 days, chase by SMS/phone and escalate P2
- Tenant to be updated by 8 June
- Consider welfare check on the tenant (frail, per her call) if the door fails again

## Missing or unavailable information
- Landlord's decision on an earlier visit
- Spend limit and preferred contractor not on property record
- Tenant's phone number (she declined to give it)

## Conflicts between sources
- Intake classed the issue as an appliance/routine; it is a door/latch fault, so I corrected it to urgent.
- Landlord wants the contractor next month, but the tenant says the workaround fails most days; I trusted the tenant's latest report and asked the landlord again.
- Caller gave postcode PR1 9BS against the record's ZZ9 5ZZ; she confirmed the property address, so I used the record.
- Event 011 calls the tenant 'Miles' and event 012 'Fletcher'; I treated it as a name transcription error.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. The landlord has not authorised a contractor visit now, only a workaround and a look next month. The tenant reports the workaround is unreliable, so an earlier inspection needs landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request APR-101 for an earlier inspection (email, via landlord record), and a tenant update by email. Review 2024-06-08.

**3. Does anything need a human decision, and why?**

Not yet. The decision is the landlord's. If the landlord stays silent for more than 3 days after a second-channel chase, escalate P2 maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-104","note":"Reclassified from Appliances/routine to locks/door, URGENT. Front door latch/frame faulty, door wobbles; tenant (fr… | 1 | ✅ verified | Ticket NBL-104 read back at stage init |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-104","decision":"conditional","conditions":"Tenant to try key/latch workaround first; contractor to look next month. No a… | 1 | ✅ verified | Ticket NBL-104 read back after record_landlord_decision |
| A3 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-104","decision_needed":"Thanks for the tip on the key/latch. We have spoke… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Ms Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-104"} | 1 | ✅ verified | Ticket NBL-104 read back after resume_auto |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-104","reason":"Waiting for Landlord","comment":"Waiting for landlord yes/no on earlier contractor inspection (APR-101); t… | 1 | ✅ verified | Ticket NBL-104 read back after put_on_hold |

## Failed or unverified actions
_None._
