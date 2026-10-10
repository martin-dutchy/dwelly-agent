# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant asked for boiler update and a bin collection date. Replied with the true job status (second quote pending, Swift visit 14 Oct) and sent bin query to Tower Hamlets council. No new tickets.

## Where the case stands
R-4799 at double_quotation: £780 quote awaiting second quote from Swift P&H (visit 2026-10-14); landlord decision pending after that.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update on boiler job and pointed bin question to council | Jonah Okafor, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your message on the portal chat. Boiler job R-4799: the engineer visited and quoted for replacing the expansion vessel, which is the likely cause of the pressure drops. Because of the cost, your landlord asked for a second quote before approving. Swift P&H are down to visit on 14 October for that. Nothing more is needed from you right now. We'll update you once the landlord decides, and I can't promise a repair date until then. In the meantime, keep topping up the pressure as you have been. If you lose heating or hot water, or see leaks, tell us straight away and we'll treat it as urgent. On bins: we don't have collection days. Please check or report a missed collection on the Tower Hamlets council website. It isn't a repair, so I haven't opened a job for it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply promises no repair date or approval
- Bin answer is signposting only; collection days not known to us

## Remaining work
- Obtain Swift P&H second quote after 14 Oct visit and send both to landlord Margaret Ellison (over £250 limit needs approval)

## Missing or unavailable information
- Bin collection schedule (not an agency matter)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. 1. What is the current status of his boiler job and what does it mean for him?**

Stage double_quotation: £780 expansion vessel quote awaiting a second quote because the landlord asked for one; Swift P&H visit 14 Oct. No repair until the landlord approves; boiler still working with weekly repressurising. Told him this without promising dates.

**2. 2. How do you handle the bin question?**

Not a maintenance matter and we hold no schedule; signposted to Tower Hamlets council for collection days and missed-collection reporting.

**3. 3. Do you create any new tickets?**

No. The boiler job is already open and bins are a council matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
