# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant asked for a boiler job update and bin collection date. Replied with the true status (second quote pending, Swift visit 14 Oct, no repair date promised), safety advice given the tenant is vulnerable, and pointed bins to Tower Hamlets Council. Follow-up set for 15 Oct.

## Where the case stands
R-4799 at double_quotation: £780 quote with landlord, who asked for a second quote; Swift P&H visit 14 Oct. Waiting on Swift then landlord. Follow-up 15 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update and bin signpost to tenant | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Wait for Swift P&H visit 14 Oct and second quote; review 15 Oct | Swift P&H | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example (on file; replying to portal chat 10 Oct 13:11)** (verified)

> Hi Jonah, sorry for the wait. Here's where your boiler job (R-4799) stands. The engineer visited on 30 Sept and quoted £780 to replace a part (the expansion vessel), which is likely why the pressure keeps dropping. Your landlord has asked for a second quote before deciding, and our records show a second engineer (Swift P&H) due to visit on 14 Oct. Once we have that quote, the landlord decides, and we'll then arrange the repair. I can't promise a repair date yet. Until then, keep topping up the pressure as you have been. If you lose heating or hot water completely, or see leaks or smell gas, tell us straight away (gas smell: leave the property and call 0800 111 999). We'll update you by 15 Oct at the latest.
> 
> On bins: I don't have the collection schedule, and we don't run it. Tower Hamlets Council does, so please check or report the missed collection on the council website. Leave your bins out and report it with your address. If the bins are blocked from being collected by something at the property, let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not promise a repair date or approve spend
- Bin guidance does not assert any collection date

## Remaining work
- Get Swift P&H quote after 14 Oct and send both quotes to landlord Margaret Ellison (overseas, email preferred); £780 exceeds her £250 limit so needs her approval
- Update tenant by 15 Oct

## Missing or unavailable information
- Bin collection schedule (council matter, not held)
- Whether Swift P&H visit is confirmed by the provider (only noted in history)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. 1. What is the current status of his boiler job and what does it mean for him?**

Stage double_quotation: first quote £780 (expansion vessel); landlord asked for a second quote; Swift P&H visit 14 Oct. Repair can't start until the landlord approves a quote, so no repair date yet; he keeps topping up pressure and should report total loss of heating.

**2. 2. How do you handle the bin question?**

Not a maintenance matter and we hold no schedule, so I didn't invent a date; signposted to Tower Hamlets Council to check and report the missed collection, and invited him to tell us if anything at the property is the cause.

**3. 3. Do you create any new tickets?**

No. The boiler is an existing open job and the bin issue is a council matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example (on file; replying to porta… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2026-10-15","purpose":"Check Swift P&H visit on 14 Oct happened and second quote received; send to landlord; update tenant","tick… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
