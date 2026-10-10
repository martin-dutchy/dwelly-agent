# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant says they fixed the washing machine by swapping in their own, but the landlord agreed to a check at 12:12 UTC, possibly without knowing about the swap. I asked the landlord whether the check is still needed and whether the tenant's machine can stay, and told the tenant no visit is booked yet. The job is on hold for the landlord until 2026-12-28.

## Where the case stands
Ticket NBL-040-tenant-resolved is at the landlord gate and on hold. Event 008: tenant Rowan says the washing machine is fixed by swapping in their own machine, and the faulty one is in the garage. Event 009: landlord Oliver agreed to someone checking the machine, sent 12:12 UTC, after the tenant's 11:47 message, so the landlord may not know about the swap. No provider assigned, no visit booked, no landlord decision recorded. Review date 2026-12-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord whether the check visit is still wanted now that the tenant has swapped the machine, and whether the tenant's own machine can stay installed. | Oliver, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the landlord has been asked, no visit is booked, and to keep the old machine stored safely and report any leak or fault. | Rowan, tenant | email | A2 ✅ |
| 3 | WAIT | Hold the job for the landlord's reply with a review date of 2026-12-28. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Oliver (landlord) via email, existing thread (event 009 email)** (verified)

> Hello Oliver,
> 
> Thank you for agreeing to a check on the washing machine at Flat 15, 55 Alder Lane.
> 
> Since your message, the tenant has told us they have fixed the problem themselves. They swapped in their own washing machine and have put the faulty one in the garage.
> 
> Before we arrange anyone to visit, could you please let us know:
> 1. Do you still want a contractor to check the old machine, or can we close this job?
> 2. Are you happy for the tenant's own washing machine to stay installed in the flat?
> 
> We will not book a visit until we hear from you.
> 
> Thank you,
> Northbridge Lettings

**A2 · send_message → Rowan (tenant) via email, existing thread (event 008 email)** (verified)

> Hello Rowan,
> 
> Thank you for letting us know that the washing machine is working again after you swapped it over.
> 
> We have passed this to your landlord. They have already agreed to a contractor checking the original machine, so we are asking them whether that visit is still needed now. No visit has been booked yet, and we will contact you once we hear back.
> 
> Please keep the old machine safely stored in the garage, and do not carry out any further work on the water pipes. If you notice any leaks or the machine stops working again, please let us know straight away.
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The tenant's claim that the fault is fixed is not verified. No engineer has looked at either machine.
- Sending the messages does not mean the landlord has agreed to anything. No landlord decision is recorded.
- The tenant's own machine being installed is not yet approved by the landlord.
- No provider was assigned and no visit was booked. No spend was approved.
- The ticket was not closed. Closing needs a landlord reply and a completed work result.

## Remaining work
- Landlord (Oliver) to say whether the check visit is still wanted and whether the tenant's machine can stay. Owner: operations, review 2026-12-28.
- If the check is wanted, record the landlord decision, assign a provider and book the visit.
- If the landlord says no, record the outcome, tell the tenant and landlord, and close without payment.
- Tidy the message log: the two messages carry the provider reference NBL-040-4451 rather than the system ticket NBL-040-tenant-resolved.

## Missing or unavailable information
- Whether the landlord still wants a check after the tenant's swap.
- Whether the landlord agrees to the tenant's own washing machine staying in the flat.
- Independent confirmation that the washing machine works (no work result yet).

## Conflicts between sources
- Tenant (event 008) says the washing machine is fixed by swapping machines; landlord (event 009) agreed to a check. I trusted the tenant's latest report for the facts but did not treat it as verified, and asked the landlord before acting.
- The case text uses NBL-040-4451 (the provider reference); the system ticket is NBL-040-tenant-resolved. The two messages were logged with the provider reference.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate and on hold. The landlord agreed to a check, but the tenant reports the fault is fixed by a swap. The landlord has not yet been told about the swap, and the tenant's machine is not approved. Outstanding: the landlord's decision on whether the check is still needed and whether the tenant's machine can stay.

**2. What is the next action, who is it for, and through which channel?**

Email landlord Oliver asking whether the check is still wanted and whether the tenant's machine can stay (A1). Email tenant Rowan to say the landlord has been asked, no visit is booked, and to keep the old machine safe (A2). Hold for the landlord until 2026-12-28 (A4).

**3. Does anything need a human decision, and why?**

Not yet. Whether a provider visit is needed is a routine landlord decision. Escalate only if the landlord's reply conflicts with the tenant's account or the self-fitted appliance raises a safety concern.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-040… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Rowan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-040-44… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-040-4451","reason":"Waiting for Landlord","comment":"Landlord (Oliver) agreed to a check visit at 12:12 UTC 24 Dec, but t… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-040-tenant-resolved","reason":"Waiting for Landlord","comment":"Landlord (Oliver) agreed to a check visit (event 009, 24 … | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after put_on_hold |

## Failed or unverified actions
- A3: put_on_hold on NBL-040-4451 failed (ticket not found). Used list_tickets to find the correct ref NBL-040-tenant-resolved and re-applied the hold (A4), verified.
