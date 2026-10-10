# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant reports they fixed the washing machine themselves by swapping in their own machine, while the landlord has agreed to a check visit. I recorded the landlord's approval of a check, asked the landlord whether it is still needed and what to do with the old machine, and asked the tenant to confirm the new machine works. The job is on hold until 2026-12-27 and no contractor was booked.

## Where the case stands
Ticket NBL-040-tenant-resolved is on hold at the landlord gate. The landlord (Oliver) agreed to a check visit (event 009), but the tenant says they already fixed the fault by swapping in their own washing machine and storing the faulty one in the garage (event 008). No contractor is assigned and no visit is booked. The job is on hold until 2026-12-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord whether the check visit is still wanted now the tenant has swapped the machine, and what to do with the old machine in the garage. | Oliver, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the check is being confirmed with the landlord, and ask them to confirm the new machine works and the old one is disconnected and in the garage. | Rowan, tenant | email | A3 ✅ |
| 3 | WAIT | Hold the job until 2026-12-27 pending the landlord's reply, then chase if nothing has come back. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Oliver (landlord) via email, existing thread (event 009 email)** (verified)

> Hello Oliver,
> 
> Thank you for agreeing to a check of the washing machine at Flat 15, 55 Alder Lane.
> 
> Since our last email, the tenant has told us they have already fixed the problem themselves. They have swapped in their own washing machine and stored the faulty one in the garage, as they are going on holiday soon.
> 
> Before we book anyone, could you please let us know whether you still want the check visit, given the machine has been swapped? Please also let us know what you would like done with the old machine in the garage.
> 
> We are holding the job until we hear from you.
> 
> Thank you,
> Northbridge Lettings

**A3 · send_message → Rowan (tenant) via email, existing thread (event 008 email)** (verified)

> Hello Rowan,
> 
> Thank you for letting us know you have swapped the washing machine. I'm glad it is sorted for now.
> 
> We have checked with your landlord, who has agreed to a check of the machine. We are now confirming with them whether that is still needed, since the machine has been swapped. We will be in touch once we hear back.
> 
> Could you please confirm that the new machine is working properly? Could you also tell us whether the old machine is in the garage, and whether it has been unplugged and disconnected from the water supply?
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's words approve a check visit only. They do not approve a replacement, a swap or any spend.
- Nothing shows the landlord approved the tenant's own machine, so the swap is an unapproved alteration until consent is recorded.
- The tenant's claim that the fault is fixed is not verified. No engineer has looked at either machine.
- No contractor was assigned and no visit was booked, so no visit date exists.

## Remaining work
- Landlord to say whether the check visit is still wanted and what happens to the old machine in the garage (owner: Oliver, landlord; review 2026-12-27).
- Tenant to confirm the new machine works and the old one is disconnected (owner: Rowan, tenant).
- Record the landlord's consent or refusal for the tenant's own machine, and its removal, once the landlord replies (owner: agency).

## Missing or unavailable information
- Whether the landlord still wants a check now the machine has been swapped.
- Whether the tenant's new machine is working.
- Where the old machine is and whether it has been disconnected.
- Whether the landlord agrees to the tenant's own machine being installed.

## Conflicts between sources
- Tenant (event 008) says the fault is fixed by a self-swap; landlord (event 009) agrees to a check visit. Trusted the most recent statements and asked both parties to resolve it.
- The ticket reference NBL-040-4451 in the request text does not match the system reference NBL-040-tenant-resolved. Used the system reference.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

It is on hold at the landlord gate. The landlord agreed to a check visit, but the tenant has already swapped the machine. Outstanding: the landlord's decision on whether the check is still needed, the tenant's confirmation the new machine works, the old machine's location and disconnection, and the landlord's consent to the tenant's own machine.

**2. 2. What is the next action, who is it for, and through which channel?**

Email the landlord Oliver to ask whether the check is still wanted and what to do with the old machine (MSG-101, ledger A2). Email the tenant Rowan to say the check is being confirmed, and to ask them to confirm the new machine works and the old one is disconnected (MSG-102, ledger A3). Hold until 2026-12-27 (ledger A6).

**3. 3. Does anything need a human decision, and why?**

Not yet. Whether a check is still needed is the landlord's decision, and they can answer by reply. Escalate only if the landlord does not respond by 2026-12-27 or objects to the tenant's own machine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-040-4451","decision":"approved","evidence_quote":"Oliver agrees to have someone go to the flat to check the washing machi… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A2 | `send_message` | {"ticket_ref":"NBL-040-4451","recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 e… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"ticket_ref":"NBL-040-4451","recipient_name":"Rowan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 emai… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-040-4451","reason":"Waiting for Landlord","comment":"Landlord agreed to a check visit (event 009), but tenant says they s… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-040-tenant-resolved","decision":"approved","evidence_quote":"Oliver agrees to have someone go to the flat to check the wa… | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after record_landlord_decision |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-040-tenant-resolved","reason":"Waiting for Landlord","comment":"Landlord agreed to a check visit (event 009), but tenant … | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after put_on_hold |

## Failed or unverified actions
- A1: record_landlord_decision failed on the reference NBL-040-4451, which came from the tenant's request text. Retried on the real ticket reference NBL-040-tenant-resolved, verified as A5.
- A4: put_on_hold failed on the same wrong reference. Retried on NBL-040-tenant-resolved, verified as A6.
