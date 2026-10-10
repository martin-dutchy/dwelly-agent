# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Told Jonah the boiler job is waiting for a second quote (Swift P&H visit 14 Oct) before the landlord decides on the £780 quote. Signposted bins to Tower Hamlets Council. No new tickets.

## Where the case stands
R-4799 at double_quotation: £780 quote awaiting second quote; Swift P&H visit 14 Oct per record. Waiting on provider/landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Status update and bin signposting sent | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up after Swift P&H visit on 14 Oct | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your messages on the portal. Boiler (R-4799): the first engineer visited and quoted for replacing a part (the expansion vessel). Because of the cost, your landlord asked for a second quote, and our records show a second engineer (Swift P&H) due to visit on 14 October. Nothing is booked for the repair until the landlord decides after that. I'm sorry it feels slow. In the meantime, keep topping up the pressure as you have been. If you lose heating or hot water, or smell gas, tell us straight away (gas smell: leave the property and call 0800 111 999). We'll update you after the 14th. Bins: we don't handle collections, so please check the Tower Hamlets Council website or call them to report a missed collection. I can't give you a collection date myself.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not confirm the Swift visit time or approve any spend
- Bin advice is signposting only

## Remaining work
- Collect second quote after 14 Oct and send both to landlord Margaret Ellison (overseas, email preferred) for decision

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

Stage double_quotation: first quote £780 for an expansion vessel; landlord asked for a second quote, Swift P&H visit 14 Oct per record. No repair until landlord decides; he keeps topping up pressure and reports loss of heating or gas smell. He is vulnerable, so I gave emergency advice.

**2. How do you handle the bin question?**

Not a maintenance matter; pointed him to Tower Hamlets Council for missed collections, gave no date.

**3. Do you create any new tickets?**

No. The boiler issue is already open and bins are council business.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Check Swift P&H second quote visit happened; update tenant and landlord","ticket_ref":"R-4799"} | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
