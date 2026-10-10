# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Replied to Jonah with the true status of R-4799 (second quote pending, Swift visit 14 Oct, no repair date yet) and directed the bin question to Tower Hamlets Council. No new tickets.

## Where the case stands
R-4799 at double_quotation: landlord asked for a second quote; Swift P&H visit due 2026-10-14. Waiting on that visit and quote, then landlord decision.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update on boiler job and pointed him to the council for the missed bin collection | Jonah Okafor, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your message and sorry for the wait. Boiler job R-4799: our engineer visited on 30 Sept and found a part (the expansion vessel) needs replacing. We sent the quote to your landlord, who has asked for a second quote before deciding. A second company, Swift P&H, is due to visit on 14 October to look at it. Once we have that quote, we'll go back to the landlord for a decision and let you know the next step. We can't give a repair date until that's approved. Until then, please keep topping up the pressure as you have been. If the heating or hot water stops completely, or you smell gas, tell us straight away (for gas call 0800 111 999). On bins: we don't manage collections, so I can't give you a date. Tower Hamlets Council runs them, and their website lets you check your collection day and report a missed collection. If you'd like us to log anything about bins at the property, let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply gives no repair date; work is not approved.
- No bin collection date given; not a maintenance matter and no date on record.

## Remaining work
- After 2026-10-14 visit, record second quote and send both to landlord Margaret Ellison (email, overseas) for approval; quote £780 is above £250 limit.

## Missing or unavailable information
- Bin collection dates (council data, not held)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

Stage double_quotation: £780 expansion vessel quote went to landlord, who asked for a second quote; Swift P&H visit 14 Oct. No repair until approval; he keeps topping up pressure, and was given emergency/gas advice as he is vulnerable.

**2. How do you handle the bin question?**

Not a repair; I gave no invented date and pointed him to Tower Hamlets Council to check and report the missed collection.

**3. Do you create any new tickets?**

No. The boiler job is already open and bins are a council matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
