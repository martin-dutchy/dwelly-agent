# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's new email duplicates an open job that already has a visit booked for 29/04 8-12. I replied to the tenant with the booked slot, asked the provider to confirm it, noted the record inconsistencies and returned the job to auto mode.

## Where the case stands
Stage: visit. Engineer visit booked for 29/04/2026 08:00-12:00 (system, event 017). Tenant's latest email is a duplicate chase. Awaiting the visit and the provider's confirmation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is already booked for 29/04 8-12 with Riverside Compliance; no new job opened | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Asked Riverside Compliance to confirm the 29/04 visit, given the Cedar Utilities naming discrepancy | Riverside Compliance, contractor | email | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for getting back in touch. An engineer is already booked for your dishwasher door: our records show a visit tomorrow, Wednesday 29 April 2026, between 8am and 12pm, with Riverside Compliance. You don't need to do anything else, and no new job is needed. If the time doesn't suit, please ring them on 07700 900410 to rearrange, and let us know.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please could you confirm you are attending Flat 9, 89 Juniper Mews tomorrow (Wed 29/04/2026, 8am-12pm) for the dishwasher door? The booking call on 26/04 was logged as coming from "Cedar Utilities" (Grant), so we want to be sure it is your visit. The tenant has also written today to say the door still won't close. Please reply to confirm.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replying does not confirm the provider has accepted the visit or that the fault will be fixed
- No cost, quote or landlord approval for any repair has been established

## Remaining work
- Visit on 29/04, then record the work result; if a quote is needed it goes to the landlord (agency ops)
- Provider confirmation of the visit awaited

## Missing or unavailable information
- Provider confirmation of the visit and identity (Riverside Compliance vs Cedar Utilities)

## Conflicts between sources
- Event 016 names Cedar Utilities/Grant and 'Leo Kendall' while the assigned provider is Riverside Compliance and the tenant is Leo Turner; event 020 SMS signed 'Harbour Homes'. I trusted the system visit record (event 017).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is at the visit stage. The engineer visit is booked for 29/04/2026 8am-12pm. The tenant has chased again, and the provider's confirmation and the visit result are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email confirming the existing booking (done), and ask Riverside Compliance by email to confirm the visit (done).

**3. Does anything need a human decision, and why?**

No. It is a routine duplicate chase with a visit already booked. The name discrepancies are noted and a question has gone to the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 (28/04) is a duplicate of the open job; visit 29/04/2026 08:00-12:00 alr… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","tick… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
