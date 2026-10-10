# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Jonah asked for an update on his boiler job R-4799 and about bin collection. He was told the job is waiting for a second quote from the landlord, with a Swift P&H visit recorded for 14 October, and that no work is approved yet. He was told bin collection is a council matter (Tower Hamlets), and no new ticket was raised.

## Where the case stands
Boiler job R-4799 (pressure dropping, routine heating) is at double_quotation. A first quote of £780 (expansion vessel) exists; the landlord asked for a second quote. Swift P&H visit is recorded for 2026-10-14. No work is approved. Landlord spend limit is £250, so anything above needs her approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to Jonah Okafor on the boiler status and bin question (sent by email, his preferred channel, as the portal reply route is not available to me) | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | OTHER | Added note to R-4799 recording the enquiry and the reply | internal | internal | A2 ✅ |
| 3 | WAIT | Follow-up set for 2026-10-15 to confirm the Swift P&H visit outcome and obtain the second quote for landlord approval | Swift P&H, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah,
> 
> Thanks for getting in touch, and sorry it has felt slow.
> 
> Boiler job (ref R-4799): the boiler is losing pressure, so it needs topping up each week. A contractor looked at it on 30 September and quoted £780 to replace the expansion vessel. The landlord has asked for a second quote before deciding, so that is the stage it is at now. Our records show a second contractor, Swift P&H, booked to visit on Wednesday 14 October. We will confirm the details with them and let you know. Until the landlord decides, no repair work has been approved.
> 
> What this means for you: nothing needs to change in the meantime. Please keep topping up the pressure as you have been. If the boiler stops working altogether, or you smell gas, please tell us straight away. If you smell gas, leave the property and call the National Gas Emergency line on 0800 111 999.
> 
> Bin collection: we do not manage bin collections, so we cannot see the schedule. Please check the collection days with London Borough of Tower Hamlets, or contact them about the missed collection. We have not logged this as a repair.
> 
> Best wishes,
> Property management team

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The Swift P&H visit date comes from the ticket history only; it is not a provider confirmation in this run, so it is not treated as a confirmed booking.
- No repair is approved; the £780 quote is above the £250 landlord limit and has not been put to the landlord for a decision.
- No bin collection information is held by the agency; the council decides collection times.

## Remaining work
- Confirm the 14 Oct Swift P&H visit with the provider (owner: operations, by 2026-10-15 follow-up).
- Obtain the second quote and send both quotes to landlord Margaret Ellison for a decision (owner: operations).
- Tenant to contact Tower Hamlets Council about the missed bin collection (owner: tenant).

## Missing or unavailable information
- Whether Swift P&H has confirmed the 14 Oct visit
- The second quote amount
- The landlord's decision on the quotes

## Conflicts between sources
- The portal chat is the channel he used, but no portal send tool exists, so the reply went by email to his on-file address (he prefers email).

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

R-4799 is at double_quotation. The £780 expansion vessel quote is with the landlord, who asked for a second quote. Swift P&H is recorded to visit on 2026-10-14. Nothing is approved yet, so no repair work is booked as confirmed. He should keep topping up the pressure and report a total loss of heating or any gas smell at once.

**2. How do you handle the bin question?**

It is not a repair and the agency does not manage bin collections. He was told to check the schedule with London Borough of Tower Hamlets. It was not logged as a ticket.

**3. Do you create any new tickets?**

No. The boiler issue already has an open job (R-4799), and the bin question is a council matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"R-4799","note":"Tenant Jonah Okafor asked for a status update via portal chat on 2026-10-10. Told him: landlord asked for a secon… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"R-4799","due_on":"2026-10-15","party":"Swift P&H","purpose":"Check the 2026-10-14 visit happened and get the second quote; th… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
