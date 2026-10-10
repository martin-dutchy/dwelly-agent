# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The dishwasher door fault is a routine repair. Troubleshooting is done, the landlord has agreed to an engineer, and Riverside Compliance is booked for 29 April 8am-12pm. I told the tenant the visit is booked and asked the contractor to confirm it and their company name, and I logged the record conflicts.

## Where the case stands
Ticket NBL-012-duplicate-report at visit stage. Dishwasher door not closing at Flat 9, 89 Juniper Mews. Troubleshooting completed (tenant confirmed 23 Apr, event 011). Landlord agreed to an engineer (events 008, 012). Riverside Compliance assigned 25 Apr. Visit booked Wed 29 Apr 2026 08:00-12:00 (events 017-019). Tenant reported again on 28 Apr that the door still won't close (event 021). No quote yet, no work result yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Reply to tenant confirming the 29 April 8am-12pm Riverside visit, the provider phone number, and that he should report any unsafe signs straight away. | Leo Turner, tenant | email | A1 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Ask Riverside Compliance to confirm the 29 April visit, their company name, and to send a quote before any work beyond the agreed scope. | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | OTHER | Record name and provider conflicts on the ticket for the office to clean up. | internal | internal | A3 ✅ |
| 4 | WAIT | Follow up on 30 April to confirm the visit took place and record the work result; rebook if missed. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for letting us know the dishwasher door still isn't closing. We're sorry it's taken a while.
> 
> An engineer from Riverside Compliance is booked to visit on Wednesday 29 April between 8am and 12pm to look at the door. Please contact them on 07700 900410 if you need to change the time. Please make sure someone can let them in.
> 
> If anything changes before then, or if you notice anything unsafe with the appliance (such as sparking, burning smell or leaking), please tell us straight away.
> 
> Kind regards,
> Northbridge Lettings

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Dear Riverside Compliance,
> 
> Please confirm the visit for the Dishwasher Repair Request at Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ, booked for Wednesday 29 April 2026, 8am to 12pm. Tenant: Leo Turner, 07700 900763. Tenant reports the door still will not close after the basic checks, so please bring what you need to inspect and repair it, and send a quote to us before any work beyond the agreed scope.
> 
> Note that a call on 26 April was logged under "Cedar Utilities" and a text under "Harbour Homes". Please confirm your company name on your reply.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending these messages does not confirm the engineer will attend or fix the door.
- The cause, the repair cost and who pays are not established.
- The contractor's company name is unconfirmed (records show Riverside Compliance, Cedar Utilities and Harbour Homes).

## Remaining work
- Riverside Compliance to attend 29 April and report the outcome (owner: contractor, chased by agency on 30 April).
- If a quote is needed, record it and seek landlord approval for any spend above existing approval (owner: agency).
- Close only after completed work result, invoice or skip reason, tenant confirmation and landlord notice.

## Missing or unavailable information
- Confirmation from Riverside Compliance of the 29 April visit and of their correct company name.
- Whether the visit happened and what was found.
- Any quote or cost.

## Conflicts between sources
- Event 016 names the contractor as Cedar Utilities and the tenant as Leo Kendall; current assignment says Riverside Compliance and Leo Turner. Trusted the assignment record.
- Event 020 SMS is signed Harbour Homes and gives 07700 900410 as the provider number; event 019 gives the same number for Riverside. Trusted the assignment record.
- Event 001 refers to a 16 Sept 2025 email and event 004 a sink report that may be unrelated. Not treated as open scope.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At visit stage. Visit booked with Riverside Compliance for 29 April 2026, 08:00-12:00. Tenant reports the door still won't close (28 April). Outstanding: attendance and outcome, any quote, invoice, tenant confirmation, landlord notice.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant Leo Turner to confirm the visit and provider number (A1). Email Riverside Compliance to confirm the visit and company name and to quote before extra work (A2). Follow up on 30 April (A4).

**3. Does anything need a human decision, and why?**

No. This is routine and within the landlord's agreed engineer visit. A human would only be needed if a quote above existing approval comes back, or if the company or contractor identity cannot be confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Record conflicts: event 016 call names \"Cedar Utilities\" and tenant as \"Leo Kendall\"; event… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","purpose":"Check visit on 29 April 2026 took place and record work result wit… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
