# Case 103: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine washing machine fault awaiting landlord approval. I asked the landlord for a decision on inspection and on the tenant's own-machine swap, updated the tenant, and put the job on hold until 29 Dec.

## Where the case stands
At landlord approval gate, stage init. Landlord emailed 2026-12-24 10:02, no reply yet (under 3 days). Ticket on hold until 2026-12-29. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor inspecting, and rule on tenant's own-machine swap, cost and fate of their machine, reply by 29 Dec | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, landlord decision pending, don't swap yet, next update by 29 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply; chase on second channel if silent by review date | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord, Flat 15, 55 Alder Lane (landlord)** (verified)

> Washing machine fills but won't start a cycle. Do you want us to send our contractor to inspect it (yes/no)? Separately, the tenant has their own machine and asks to swap it in if yours can't be repaired; there are no isolation valves. Please say whether that is allowed, who pays for removing yours and fitting theirs (and any valves), and what should happen to your machine. Reply by 2026-12-29.
> 
> Options: Yes, send your contractor to inspect (recommended); I'll arrange my own contractor; Tenant may fix/swap at their own arrangement; Other

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. We've noted the machine is in your garage. We're still waiting for the landlord to decide how to proceed, so no visit is booked yet and we can't promise tomorrow, especially with the holiday. We've also asked them about swapping in your own machine, as that needs their consent. Please don't disconnect or swap anything until we confirm. We'll update you by 29 December at the latest, sooner if they reply. Please note the garage is accessible for any visit, and we'll give you notice first.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves a contractor, spend or the tenant's machine swap
- No visit is booked; tenant's request for tomorrow is not confirmed
- Does not establish the fault's cause or who pays

## Remaining work
- Landlord decision (agency owns chase)
- Assign contractor and book visit once approved
- Handle swap consent and valves if needed

## Missing or unavailable information
- Landlord decision
- Whether a swap is allowed and who pays

## Conflicts between sources
- Phone call created ticket R-4902 while NBL-103 exists; treated as the same issue. Tenant gave DOB 28 Sept then 30 Sept; verification passed on the second.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate; landlord has not replied. Outstanding: landlord decision, contractor, visit, swap consent.

**2. What is the next action, who is it for, and through which channel?**

Approval request to the landlord (via agency landlord record) and an email update to the tenant, both sent; chase by 29 Dec.

**3. Does anything need a human decision, and why?**

No escalation. The decision is the landlord's and is routine. Only a note about the tenant's inconsistent DOBs on the call.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord, Flat 15, 55 Alder Lane","ticket_ref":"NBL-103","decision_needed":"Washing machine fills but won't start a cycle. Do y… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-103","reason":"Waiting for Landlord","comment":"Landlord approval route requested 2026-12-24 (inspect with our contractor… | 1 | ✅ verified | Ticket NBL-103 read back after put_on_hold |

## Failed or unverified actions
_None._
