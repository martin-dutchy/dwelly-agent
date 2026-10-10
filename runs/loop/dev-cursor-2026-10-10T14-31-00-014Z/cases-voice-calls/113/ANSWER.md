# Case 113: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant called asking for a visit before 27 Dec. Landlord decision still pending, so I sent a consolidated approval request, updated the tenant that the 25 Dec slot is unconfirmed, and put the job on hold with a review on 26 Dec.

## Where the case stands
Landlord approval gate; landlord asked 24 Dec (event 004), no reply yet. No contractor assigned, no visit booked. Ticket on hold until 26 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose our contractor/own contractor and consent to tenant's own machine swap, reply by 26 Dec, with tenant's 27 Dec deadline | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant 25 Dec pm is unconfirmed, landlord decision pending, don't install own machine yet, next update by 26 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 26 Dec | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Do you want us to send our contractor to inspect the washing machine, or will you arrange your own? Also, may the tenant install their own machine if yours is beyond repair?
> 
> Options: Our contractor inspects (recommended); You arrange your own contractor (please give name and date); Tenant may swap in their own machine if repair is not viable; tell us what to do with yours (inspect, store or dispose)
> 
> Update: Follows our email of 24 Dec. The tenant (Rowan Price) phoned today: the machine, in the garage, still fills but will not start (also described as completely dead). They fly out on 27 Dec for two weeks and asked for a visit before then, preferring the afternoon of 25 Dec. That is only their preference: no contractor is assigned and no visit is booked. The tenant owns a replacement machine, which needs your consent as it is not on the inventory; there are no isolation valves. Please reply by 26 Dec.

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. We've noted you'd like someone to look at the washing machine in the garage before you fly on 27 December, ideally on the afternoon of 25 December. To be clear, that visit is not booked yet: we're waiting for the landlord to decide, and no engineer is assigned. We've asked them to reply by 26 December, and have also asked about swapping in your own machine, which needs their consent. Please don't install it until we confirm. If it's easy, please check whether there's a tap or valve behind the machine, and send a photo of the model label. We'll update you by 26 December at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing booked or approved; the 25 Dec afternoon is only the tenant's preference
- Does not establish fault, cost, or who pays
- Swap with tenant's machine not consented

## Remaining work
- Landlord decision; then assign contractor and get provider-confirmed visit before 27 Dec
- Chase landlord on a second channel if no reply by 26 Dec; consider P2 escalation if still silent given the tenant's departure

## Missing or unavailable information
- Landlord decision
- Model label photo
- Whether isolation valves exist

## Conflicts between sources
- Tenant described the machine as filling but not starting, and also as completely dead
- Dates 24/25/27 Dec in event 007 are the call date, the preferred visit and the departure date, not a booking

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate; the landlord has not replied. Outstanding: landlord decision, contractor assignment and a provider-confirmed visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email) sent, tenant updated by email, hold set to 26 Dec.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides. Escalate if they stay silent past 26 Dec, because the tenant leaves on 27 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-113","decision_needed":"Do you want us to send our contractor to inspect the washing machine, or wi… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","body":"Hello Rowa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-113","reason":"Waiting for Landlord","comment":"Awaiting landlord choice: our contractor / own contractor / tenant swap c… | 1 | ✅ verified | Ticket NBL-113 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-113","note":"Tenant call event 007: preferred visit 25 Dec pm is a tenant proposal only; no provider assigned. Tenant leaves … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
