# Case 116: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant has swapped in own machine; landlord's faulty one is in the garage. Landlord approval was re-requested with the new facts, tenant told nothing is booked, and the job is held to 26 Dec.

## Where the case stands
Landlord approval gate; no landlord reply; no contractor assigned; no visit booked. On hold until 2026-12-26.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no to send our contractor, plus what to do with his machine and whether tenant's may stay, reply by 26 Dec | Oliver, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant nothing is booked, 25 Dec is only a preference, next update by 26 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 26 Dec | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Oliver (landlord)** (verified)

> Update on washing machine at Flat 15: the tenant has already swapped in their own machine and says your broken machine (fills but won't start a wash) is in the garage. They fly out on 27 Dec for two weeks. Please reply yes or no by 26 Dec: may we send our contractor to inspect/repair your machine (cost not yet known; we'd come back to you with any quote)? Also: do you want your machine repaired, replaced or disposed of, and may the tenant's own machine stay connected?
> 
> Options: Yes, send your contractor to inspect and repair the landlord's machine (recommended); I will arrange my own contractor; Do not repair; tenant's own machine stays and landlord's machine is disposed of/stored

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. I've noted that your own machine is now connected and the landlord's broken one is in the garage. I've asked the landlord today whether we can send an engineer to look at it, and I've flagged your 27 December departure. Nothing is booked yet: tomorrow (25 December) is only your preferred day, and we can't promise it until the landlord approves and a contractor confirms. We'll update you by 26 December at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking approval does not authorise spend or a contractor
- The 25 Dec visit is a tenant proposal, not a booking
- Nothing is established about the machine's fault or who pays

## Remaining work
- Landlord decision (agency chases 26 Dec on a second channel if silent)
- If approved: assign contractor, get provider-confirmed date (Christmas Day, tenant leaves 27 Dec)
- Decide what happens to landlord's machine and tenant's own machine

## Missing or unavailable information
- Landlord decision
- Contractor availability over Christmas

## Conflicts between sources
- Dates: 27 Dec is the tenant's departure, 25 Dec the preferred visit; not a conflict, and neither is a confirmed booking.
- Original ticket said tenant wanted a swap if needed; call says swap already done by the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Waiting for landlord approval; no contractor or visit. Outstanding: landlord decision, provider-confirmed date, fate of the machines.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency record; tenant told by email on the existing thread; review 26 Dec.

**3. Does anything need a human decision, and why?**

No agency human needed now; the landlord's decision is the gate. Escalate only if the landlord is silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Oliver","ticket_ref":"NBL-116","decision_needed":"Update on washing machine at Flat 15: the tenant has already swapped in their… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","body":"Hello Rowa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-116","reason":"Waiting for Landlord","comment":"Awaiting landlord approval to send our contractor for landlord's machine;… | 1 | ✅ verified | Ticket NBL-116 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-116","note":"Tenant swapped in own machine (not on inventory, stays tenant's). Landlord's machine in garage; decision needed … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
