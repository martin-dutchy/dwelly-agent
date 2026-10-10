# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Jonah asked about his boiler job and bin collection. Told him the job awaits a second quote (visit 14 Oct) and landlord decision, gave safety advice given he is vulnerable, and pointed him to the council for bins. Follow-up set for 15 Oct.

## Where the case stands
R-4799 at double_quotation: landlord asked for a second quote; Swift P&H visit recorded for 14 Oct. Waiting on provider then landlord. Tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update and council bin signpost | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up after 14 Oct second-quote visit | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example (replying to portal chat 2026-10-10 13:11)** (verified)

> Hi Jonah, sorry for the wait. Boiler job R-4799: the engineer visited and recommended replacing a part (the expansion vessel). The landlord has asked for a second quote before agreeing, and our records show a second engineer (Swift P&H) due to visit on 14 October. Once we have that quote we'll go back to the landlord for a decision. Until then please keep topping up the pressure as you have been. If you lose heating or hot water completely, or see leaks or smell gas, tell us straight away (gas emergency line 0800 111 999). We'll update you again after the 14th. On bins: we don't handle collections. Please report the missed collection to Tower Hamlets Council on their website, as they can confirm the collection day. Thanks, Property Management team.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not commit to any repair date, cost or approval of the £780 quote
- Bin advice is signposting only

## Remaining work
- Obtain Swift P&H quote after 14 Oct and send to landlord Margaret Ellison (email, overseas)
- Update tenant after the 14th

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

Stage double_quotation: £780 expansion vessel quote received, landlord requested a second quote, Swift P&H visit recorded 14 Oct. No repair yet; he keeps repressurising and should report total loss of heating/hot water. Next update after 14 Oct (follow-up 15 Oct).

**2. How do you handle the bin question?**

Not a maintenance matter; no ticket. Signposted him to Tower Hamlets Council to report the missed collection and confirm the day, without inventing a date.

**3. Do you create any new tickets?**

No. The boiler issue is already open as R-4799 and bins are a council matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example (replying to portal chat 20… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2026-10-15","purpose":"Check second quote from Swift P&H received after 14 Oct visit; send to landlord; update Jonah","ticket_ref… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
