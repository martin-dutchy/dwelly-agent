# Case 116: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's washing machine fault awaits landlord approval; tenant has already swapped in their own machine and flies 27 Dec. Landlord approval requested including the tenant's machine question, tenant updated, job held to 26 Dec.

## Where the case stands
Landlord approval gate; ticket NBL-116 on hold awaiting landlord, review 26 Dec. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord to choose repair route and say whether tenant's own machine may stay | Oliver, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant nothing is booked, 25 Dec unconfirmed, next update by 26 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 26 Dec | Oliver, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Oliver (landlord)** (verified)

> Do you want us to send our contractor to inspect/repair your washing machine (fills with water but won't start a cycle)? Please also say whether the tenant's own machine, which they have already connected, may stay in place.
> 
> Options: Yes, send our contractor to inspect and repair (please give a spend cap); I will arrange my own contractor (please give name and date); Do not repair; tenant's own machine may stay and yours is removed or stored (tell us which)
> 
> Update: Tenant (Rowan Price) swapped in their own spare machine on 23 Dec; your machine is now in the garage. Tenant asked for a visit tomorrow 25 Dec (Christmas Day), not confirmed with any contractor; nothing is booked. Tenant is away 27 Dec for two weeks. Our earlier email of 24 Dec is unanswered.

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. We've asked the landlord to approve a repair visit for their machine and also whether your own machine can stay connected. They haven't replied yet, so nothing is booked. Tomorrow (25 Dec) is Christmas Day, so we'll ask whether a contractor can attend, but please don't expect anyone until we confirm a date with you. We know you fly on 27 Dec and will chase the landlord; you'll hear from us again by 26 Dec at the latest. Please leave the landlord's machine in the garage as it is.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval request does not authorise any spend or contractor
- Tenant's preferred 25 Dec visit is a proposal only, not booked
- Nothing decided about who pays or about the tenant's machine staying

## Remaining work
- Landlord decision (agency chases on a second channel if silent by review date)
- Assign contractor and get provider-confirmed date once approved
- Landlord decision on tenant's machine

## Missing or unavailable information
- Landlord decision
- Appliance model/age and warranty (photos of label not yet received)

## Conflicts between sources
- Event 001 says the tenant would swap machines only if needed; event 007 says the swap was already done on 23 Dec. Trusted the later call.
- Dates 25/12 (tenant visit proposal) and 27/12 (tenant departure) are not a conflict but the visit is unconfirmed.
- Call named landlord Oliver; the record names no landlord name.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

At the landlord gate: the landlord has not replied, no contractor or visit exists. Outstanding: landlord decision, provider assignment, confirmed visit, decision on tenant's own machine.

**2. What is the next action, who, which channel?**

Landlord approval request sent by email to the landlord (done); tenant updated by email; chase landlord on a second channel if silent by 26 Dec.

**3. Does anything need a human decision?**

No escalation now. The landlord's decision is the gate; escalate only if it stays silent past the chase and the tenant's departure presses.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Oliver","ticket_ref":"NBL-116","decision_needed":"Do you want us to send our contractor to inspect/repair your washing machine … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","body":"Hello Rowa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-116","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on repair route and whether tenant's own machi… | 1 | ✅ verified | Ticket NBL-116 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-116","note":"Record conflict: event 001 says tenant would swap only if needed; event 007 call says tenant already swapped in … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
