# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant fixed the problem by swapping in their own machine, so the visit the landlord agreed to may not be needed. I asked the landlord what to do with their machine and whether the tenant's can stay, told the tenant, and put the ticket on hold until 29 Dec. I did not close the ticket or assign a contractor.

## Where the case stands
Ticket at init, on hold until 2026-12-29. Tenant says they swapped in their own machine and stored the landlord's faulty one in the garage. Landlord's reply (agreeing to a visit) probably predates knowing this. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Tell landlord about the swap; ask what to do with their machine and whether tenant's may stay connected; reply by 29 Dec | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge the swap, say no contractor yet, no charge, update by 29 Dec | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until landlord answers; review 29 Dec | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (Oliver) (landlord)** (verified)

> Thanks for agreeing to a visit. Since then the tenant has told us they swapped in their own washing machine and stored your faulty one in the garage, so a visit to the flat may no longer be needed. What would you like done with your machine, and may the tenant's machine stay connected?
> 
> Options: Leave our machine in the garage for now and the tenant's stays connected; no visit (recommended); We send our contractor to inspect/repair your machine in the garage, at your cost; You arrange your own contractor or disposal
> 
> Update: No contractor has been assigned and nothing has been booked. The tenant's machine is theirs, is not on the inventory, and any removal or fitting costs cannot be charged to the tenant. Please reply by 2026-12-29. We will not send anyone until we hear from you.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 008 email)** (verified)

> Hello, thanks for letting us know you've swapped the machines and stored the faulty one in the garage. Glad you're back up and running. We've asked the landlord whether they want their machine checked or removed and whether yours can stay connected, so please don't arrange anything with a contractor for now. Your machine stays yours, and you won't be charged for any of this. We'll update you by 29 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the faulty machine's cause or that it is repaired
- Landlord's agreement to a visit is not an instruction to assign now; no contractor assigned or visit booked
- Does not decide who owns or pays for the faulty machine's disposal

## Remaining work
- Landlord to decide on faulty machine and tenant's machine staying connected (owner: landlord, by 29 Dec)
- Close without payment once landlord answers (owner: agency)

## Missing or unavailable information
- Landlord's decision on the faulty machine and the tenant's machine
- Confirmation that the swap was done safely, as the tenant said there are no isolation valves

## Conflicts between sources
- Tenant says the machine was swapped, yet the landlord agrees to a visit (likely unaware); trusted the tenant's later account but have asked the landlord.
- Names differ: Rowan (tenant email) vs Oliver (landlord email); treated as the same tenant and landlord.
- Ticket ref in the description (NBL-040-4451) differs from the system ref NBL-040-tenant-resolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The tenant has swapped machines and the landlord's faulty one is in the garage. The landlord agreed to a visit without knowing this. The landlord's decision on their machine is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking what to do with their machine and whether the tenant's can stay connected, with a reply date of 29 Dec. The tenant has been told by email.

**3. Does anything need a human decision, and why?**

No. The landlord's choice is routine and is held with a review date. It would go to a human only if the landlord stays silent past the chase cadence.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (Oliver)","ticket_ref":"NBL-040-4451","decision_needed":"Thanks for agreeing to a visit. Since then the tenant has tol… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-040-4… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-040-4451","note":"Tenant (event 008) says machines swapped and landlord's faulty machine stored in garage. Landlord email (ev… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-040-4451","reason":"Waiting for Landlord","comment":"Waiting for landlord to say what to do with faulty machine in garage… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-040-tenant-resolved","reason":"Waiting for Landlord","comment":"Waiting for landlord to say what to do with faulty machin… | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after put_on_hold |

## Failed or unverified actions
- A4: First hold used the wrong ticket ref (NBL-040-4451, which appears in the description text); retried with NBL-040-tenant-resolved and verified as A5.
