# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant resolved the issue by swapping in their own machine, while the landlord later agreed to a check. I did not assign a contractor; I asked the landlord how to handle their stored machine, updated the tenant, noted the record and set a follow-up for 29 Dec.

## Where the case stands
Ticket at init/landlord gate. Tenant has swapped in their own machine (event 008); landlord's later email (event 009) agrees to a check, probably unaware. No contractor assigned. Waiting on landlord about the faulty machine and the tenant's machine staying connected; follow-up 2026-12-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Tell landlord of the tenant's swap and ask what to do with the faulty machine and whether the tenant's can stay connected | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge swap, paused visit, ask for leak check, next update 29 Dec | Tenant | email | A2 ✅ |
| 3 | WAIT | Chase landlord by 29 Dec, then close without payment | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (Oliver per event 009) (landlord)** (verified)

> Thanks for agreeing to a check. Since then the tenant has told us they have swapped in their own washing machine and stored your faulty one in the garage, so no visit is booked and we have not sent anyone. How would you like to handle your machine, and is the tenant's machine allowed to stay connected?
> 
> Options: Leave it stored for now and we close the repair; you decide on the machine later (recommended if you are away); We send our contractor to inspect or repair your machine in the garage (you approve any cost first); Dispose of your machine, at your cost; Your own contractor deals with it (please give name and date)
> 
> Update: Tenant's email today says they did the swap themselves. The flat has no isolation valves, so we will ask the tenant to confirm the connection is leak-free. The tenant's machine stays theirs and is not on the inventory. Nothing has been spent. We will chase for your answer by 2026-12-29.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 008 email)** (verified)

> Hello, thanks for letting us know you've swapped the machines. We've paused the engineer visit and are asking the landlord what they'd like done with their machine in the garage and whether yours can stay connected. Please check there are no leaks around the hoses and taps, as there are no isolation valves, and let us know if there are any. Your machine remains yours and you won't be charged for anything here. We'll update you by 29 December. Happy Christmas.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the faulty machine's fault or who owns the repair cost
- Landlord's agreement to a check is not an instruction to book now; no contractor assigned
- Ticket not closed; the landlord has not yet decided about their machine

## Remaining work
- Landlord decision on faulty machine and tenant's machine
- Tenant leak-check confirmation
- Close without payment after that (agency)

## Missing or unavailable information
- Whether landlord knew of the swap
- Landlord's wishes for the faulty machine

## Conflicts between sources
- Tenant (event 008, 11:47) says swap done; landlord (event 009, 12:12) agrees to a check. Treated the tenant's fix as current fact and asked the landlord.
- Names Rowan/Oliver differ from the record; assumed tenant and landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Tenant has swapped machines themselves; landlord approved a check not knowing this. Outstanding: landlord decision on the faulty machine and the tenant's machine staying, leak check, then close without payment.

**2. What is the next action, who is it for, and through which channel?**

Landlord emailed (APR-101) with options; tenant emailed (MSG-102); follow-up 29 Dec.

**3. Does anything need a human decision, and why?**

No human escalation; the decision on the landlord's own appliance is the landlord's, already requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (Oliver per event 009)","ticket_ref":"NBL-040-4451","decision_needed":"Thanks for agreeing to a check. Since then the … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-040-4… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-040-4451","note":"Event 008: tenant swapped in own machine, landlord's faulty one stored in garage. Event 009 (later): landlo… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-040-4451","due_on":"2026-12-29","purpose":"Chase landlord on what to do with faulty machine; then close without payment",… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-040-4451"} | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A6 | `resume_auto` | {"ticket_ref":"NBL-040-tenant-resolved"} | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after resume_auto |

## Failed or unverified actions
- A5: resume_auto used wrong ref NBL-040-4451 (that is in the description); retried with the real ref NBL-040-tenant-resolved, verified as A6.
