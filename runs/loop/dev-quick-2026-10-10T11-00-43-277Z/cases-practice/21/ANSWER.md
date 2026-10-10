# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Jonah asked for an update on his boiler job and when bins are collected. I replied by email (ledger A1) explaining that R-4799 is awaiting a second quote because the £780 repair is above the landlord's £250 limit, with a Swift P&H visit on 14 October. I directed the bin question to Tower Hamlets Council; no new tickets were created.

## Where the case stands
R-4799 (boiler pressure, routine, heating) is at double_quotation stage. The £780 quote (expansion vessel) is above the landlord's £250 routine limit, so she asked for a second quote. Swift P&H visit booked 2026-10-14 per ticket history. Waiting on the second quote and the landlord's decision.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to Jonah Okafor by email with boiler status, what happens next, gas emergency line, and council bin guidance | Jonah Okafor, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah,
> 
> Thanks for getting in touch, and I'm sorry this has taken a while.
> 
> Your boiler job (ref R-4799) is about the boiler pressure dropping, which means you need to top it up each week. We inspected it on 30 September and the repair quoted was £780 for a new expansion vessel. That is above the spend limit your landlord has set for routine work, so she has asked us to get a second quote before going ahead. A second contractor, Swift P&H, is booked to visit on 14 October 2026. Once we have both quotes, we will send them to your landlord, Margaret Ellison, for a decision. We will let you know as soon as she replies.
> 
> Until then, your boiler is not an emergency, so there is nothing you need to do. If the boiler stops working altogether, or you notice a gas smell, please call the National Gas Emergency line on 0800 111 999 straight away and let us know.
> 
> On your bin question: bin collections are arranged by the council, not by us. Please check the Tower Hamlets Council website or call them to ask about the missed collection and when it will be emptied. We do not have their collection schedule.
> 
> Kind regards,
> Property Management Team

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 14 Oct visit date comes from the ticket history and is not independently confirmed with Swift P&H
- The second quote has not been received, so no cost is approved
- The bin collection schedule is held by Tower Hamlets Council and was not verified by us

## Remaining work
- Obtain Swift P&H second quote after the 14 Oct visit (operations)
- Send both quotes to Margaret Ellison for approval, since £780 exceeds her £250 routine limit (operations)

## Missing or unavailable information
- Confirmation that the Swift P&H visit on 2026-10-14 is booked with the contractor

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

R-4799 is at double_quotation. The £780 expansion-vessel quote is over the landlord's £250 routine limit, so a second quote was requested; Swift P&H is due 2026-10-14. For him: it is routine, not an emergency, and work waits for the second quote and the landlord's decision. He was told what to do if the boiler fails or he smells gas.

**2. How do you handle the bin question?**

It is not a repair. Bin collection is run by Tower Hamlets Council, so I directed him to the council (website or phone) and did not create a ticket. He was told we do not hold the collection schedule.

**3. Do you create any new tickets?**

No. The boiler issue is already open as R-4799, so a new ticket would be a duplicate, and the bin issue belongs to the council.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
