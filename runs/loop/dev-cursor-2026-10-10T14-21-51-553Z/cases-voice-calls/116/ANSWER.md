# Case 116: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's washing machine fault is awaiting landlord approval. The tenant has already installed their own machine and the landlord's is in the garage. I sent the landlord a request including the 27 Dec travel deadline, updated the tenant, and put the job on hold with a review on 26 Dec.

## Where the case stands
Intake/landlord gate. Landlord asked at event 004 with no reply. No contractor assigned, no visit booked. Ticket on hold, review 26 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord to approve our contractor or name their own, and decide what happens to their machine and whether the tenant's can stay connected; reply wanted by 24 Dec | Oliver, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant nothing is booked, 25 Dec is unconfirmed, and when they will next hear from us | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 26 Dec | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Oliver (landlord)** (verified)

> The tenant reports your washing machine fills but won't start a wash. They have already swapped in their own machine and your machine is now in the garage. Do you want us to send our contractor to inspect/repair it (yes/no), or will you arrange your own? Also, may the tenant's machine stay connected, and what should happen to yours if it can't be repaired (repair, dispose, store)?
> 
> Options: Yes, send our contractor to inspect your machine (recommended); You arrange your own contractor (please send name and date); Leave your machine as is; tenant's machine stays connected
> 
> Update: Nothing is booked. The tenant flies out on 27 December for two weeks and asked for a visit on 25 December (Christmas Day), which no contractor has confirmed. Please reply by end of today, 24 December, so we can try to arrange it. Visit status: not booked.

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. We've noted your own machine is now installed and the landlord's machine is in the garage. We've asked the landlord today to approve an engineer looking at it, and also what they want done with it if it can't be repaired. Nothing is booked yet, and tomorrow (25 December) is a proposed time only: no contractor has confirmed it, so please don't count on someone coming. We know you fly on the 27th, and we've asked the landlord for an answer today. We'll update you by end of day on 26 December at the latest, or sooner if we hear back.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval, contractor assignment or visit booking has happened
- The 25 Dec visit is only the tenant's proposed date, on Christmas Day
- Nothing is established about the machine's fault or who pays

## Remaining work
- Landlord decision outstanding (agency)
- Contractor assignment and confirmed date once approved
- Landlord to say what happens to their machine and whether the tenant's stays connected
- Chase landlord on a second channel if no reply

## Missing or unavailable information
- Landlord decision
- Contractor availability over Christmas

## Conflicts between sources
- The tenant's call says the landlord's machine is in the garage and the tenant's own is installed, while the original request said the swap was still to be done. I trust the later call.
- Dates 25/12 and 27/12 are the tenant's visit proposal and travel date, not provider-confirmed.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

It is at the landlord approval gate. The landlord has not replied, no contractor is assigned and no visit is booked.

**2. What is the next action, for whom, and by which channel?**

Landlord approval request to Oliver by email, plus a tenant update to Rowan by email. Wait with a review on 26 Dec.

**3. Does anything need a human decision?**

Only the landlord's decision, which is not a human-team escalation. Escalate to maintenance P3 if the landlord is still silent by the 26 Dec review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Oliver","ticket_ref":"NBL-116","decision_needed":"The tenant reports your washing machine fills but won't start a wash. They ha… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-116","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on our contractor vs own, and what to do with … | 1 | ✅ verified | Ticket NBL-116 read back after put_on_hold |

## Failed or unverified actions
_None._
