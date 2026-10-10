# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Told Jonah the boiler job is awaiting a second quote (Swift P&H visit 14 Oct) before landlord decides on the £780 repair. Pointed him to Tower Hamlets for bins. No new tickets.

## Where the case stands
R-4799 at double_quotation: £780 quote with landlord, who asked for a second quote; Swift P&H visit 14 Oct. Waiting on Swift and then landlord decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied with status, safety advice, council bin pointer and next-update date | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up 15 Oct after Swift P&H visit on 14 Oct | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your messages on the portal. Boiler job: the engineer visited on 30 Sept and found the part causing the pressure drops (an expansion vessel) needs replacing. The quote was £780, and your landlord has asked for a second quote before deciding. Swift P&H are down to visit on 14 October for that. No repair can start until the landlord has decided, so I can't give you a fix date yet. I'm sorry it's taking a while. In the meantime, if the boiler loses heating or hot water completely, or you notice a gas smell, tell us straight away. For a gas smell, leave the property and call 0800 111 999. We'll update you by email by Thursday 15 October. Bins: we don't manage collections, so I can't see the schedule. Tower Hamlets Council runs them. Their website has a collection day checker and a missed-collection report form. Please report it there.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not promise a repair date or approve the quote
- Bin collection info not held; no guarantee given

## Remaining work
- Obtain Swift P&H quote after 14 Oct and send to landlord Margaret Ellison for decision (quote over £250 limit)

## Missing or unavailable information
- Bin collection schedule (council matter)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

Stage double_quotation: £780 expansion vessel quote, landlord requested a second quote, Swift P&H visit 14 Oct. No repair until landlord decides; he still has to repressurise meanwhile. Next update by 15 Oct.

**2. How do you handle the bin question?**

Not a maintenance matter and we hold no schedule; directed him to Tower Hamlets Council's collection checker and missed-collection report. Nothing invented.

**3. Do you create any new tickets?**

No. Bins are not a property repair, and the boiler job is already open.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2026-10-15","purpose":"Check Swift P&H second quote after 14 Oct visit; update landlord and tenant","ticket_ref":"R-4799"} | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
