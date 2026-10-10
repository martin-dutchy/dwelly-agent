# Case 103: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reported a washing machine that fills but won't cycle. Landlord was emailed earlier today with no reply yet, within the 3-day window. I sent the landlord a fuller approval request that includes the own-machine swap, told the tenant no visit is booked, and put the ticket on hold until 29 Dec.

## Where the case stands
Intake/landlord approval gate. Landlord emailed 24 Dec 10:02, no reply yet. No contractor assigned, no visit booked. Ticket on hold, review 29 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose: our contractor inspects, their own contractor, or tenant's own machine swap (with handling of existing machine and valve fitting) | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked (not tomorrow), landlord decision pending, next update 29 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 29 Dec | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Washing machine fills but won't start a wash. Please say whether we may send our contractor to inspect it, and whether the tenant may swap in their own machine.
> 
> Options: Yes, send our contractor to inspect first (recommended); You arrange your own contractor; Allow the tenant to install their own machine; tell us how to treat your existing one (inspect, repair, store or dispose) at your cost. The tenant's machine stays theirs and not on the inventory
> 
> Update: Follows our email of 24 Dec. No visit is booked yet. The tenant has no isolation valves on the water pipes, so any swap would need a plumber to fit them (cost to be approved by you). The tenant would like a visit as soon as possible. Please reply by 29 Dec. We will chase then.

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. Your repair is logged and with your landlord for a decision. We have asked them whether we can send our contractor, and whether your own machine can be swapped in (that needs their consent, and fitting would need isolation valves). No visit is booked yet, so please don't expect anyone tomorrow. We can't promise a date until the landlord replies. If the machine is still full of water, please switch it off at the socket. We will chase the landlord on 29 Dec and update you then, or sooner if they reply.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend, a contractor or the tenant's own machine swap
- No visit is booked and the fault cause is unknown

## Remaining work
- Landlord decision (owner: landlord)
- Chase on 29 Dec on a second channel if no reply
- Then assign contractor and book visit

## Missing or unavailable information
- Landlord decision
- Machine location: garage per call, versus unclear in the written report

## Conflicts between sources
- Phone call created ref R-4902, while the system holds NBL-103 for the same fault (treated as a duplicate)
- Tenant gave two different dates of birth on the call (28 and 30 Sept); the tenant is identified by the case history, so I carried on
- Tenant asked for a visit 'tomorrow' (25 Dec, a bank holiday); the record shows nothing booked

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Awaiting the landlord's decision at the approval gate. Contractor, visit and the own-machine swap consent are all outstanding.

**2. What is the next action, for whom, through which channel?**

Landlord approval request by email (done). The tenant was updated by email. Chase the landlord on 29 Dec by SMS or phone.

**3. Does anything need a human decision?**

No escalation. The landlord's decision is the gate. The case is routine and nothing is time-critical.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-103","decision_needed":"Washing machine fills but won't start a wash. Please say whether we may sen… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","body":"Hello Rowa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-103","reason":"Waiting for Landlord","comment":"Awaiting landlord choice: our contractor / own contractor / tenant's own … | 1 | ✅ verified | Ticket NBL-103 read back after put_on_hold |

## Failed or unverified actions
_None._
