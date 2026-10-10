# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant asked for a boiler update and about bin collection. Replied with true status (second quote pending, visit 14 Oct), pointed bins to the council, and no new tickets.

## Where the case stands
R-4799 at double_quotation: £780 quote with landlord, who asked for a second quote; Swift P&H visit recorded for 2026-10-14. Waiting on that quote, then landlord decision.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update, bin signposting to council, and a heating-loss warning | Jonah Okafor, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your messages on the portal chat. Boiler job (R-4799): the engineer has visited and quoted for replacing a part called an expansion vessel, which is the likely cause of the pressure drops. Your landlord has asked for a second quote before deciding, and our records show a second engineer (Swift P&H) due to visit on 14 October. Once we have that quote, we'll send both to your landlord for a decision. I can't give a repair date yet as it isn't approved. Until then, please keep topping up the pressure as you have been. If you lose heating or hot water, tell us straight away and we'll treat it as urgent. Bins: we don't handle collections. Please check or report a missed collection on the Tower Hamlets council website. I haven't got a date for you. Sorry for the wait.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply gives no repair date; work is not approved
- Did not confirm Swift visit with the provider in this run

## Remaining work
- Get Swift P&H quote after 14 Oct and send both to landlord (Margaret Ellison, email, overseas); £780 exceeds £250 limit so landlord approval needed

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Current status of the boiler job and what it means?**

Stage double_quotation: £780 expansion vessel quote, landlord asked for a second quote, Swift P&H visit on 14 Oct. No repair date until approved; he should keep repressurising and tell us if heating or hot water is lost (vulnerable tenant).

**2. How do you handle the bin question?**

Not a property repair; signposted to Tower Hamlets council, no date invented.

**3. Do you create any new tickets?**

No. The bin issue is council responsibility and the boiler already has R-4799.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
