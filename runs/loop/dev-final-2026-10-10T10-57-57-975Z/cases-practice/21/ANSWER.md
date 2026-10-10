# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Jonah asked for a boiler update and bin collection day. Replied via his preferred email channel (vulnerable, anxiety) with status of R-4799, next step on 14 Oct, safety info, and council signposting for bins. No new tickets.

## Where the case stands
R-4799 at double_quotation: awaiting second quote (Swift P&H visit 2026-10-14), then landlord approval of £780 vs alternative. Tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent status update, bin signposting, safety/helpline info | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Wait for Swift P&H visit on 14 Oct and second quote, then seek landlord approval (quote exceeds £250 limit) | internal | internal | — |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, thanks for your message and sorry for the wait. Update on your boiler job (R-4799): the engineer has visited and found the fault, which is a part called an expansion vessel that needs replacing. The quote was £780, which is above what we can approve without your landlord, so she asked for a second quote. A second engineer (Swift P&H) is booked to visit on 14 October. Once we have that, we'll go back to your landlord for a decision and then arrange the repair. I can't promise a repair date yet, but I'll keep you posted. In the meantime, you can keep topping up the boiler pressure as before. If your heating or hot water stops working completely, or you smell gas, tell us straight away (gas emergency line: 0800 111 999). On bins: I'm afraid we don't have collection days here. Tower Hamlets Council handles collections, so please check or report a missed collection on their website. If you tell me it's a shared bin store problem at the building, I can pass it on. I haven't opened any new job, as the boiler one already covers this.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The update does not promise a repair date or approval of the £780 quote.
- Bin answer does not log any request with the council.

## Remaining work
- Ops: after 14 Oct, record second quote and request landlord approval (Margaret Ellison, overseas, email preferred).

## Missing or unavailable information
_None._

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

R-4799 is at double quotation: first quote £780 (expansion vessel) exceeded the landlord's £250 limit, landlord asked for a second quote, Swift P&H visits 14 Oct. Repair not yet scheduled; he keeps repressurising meanwhile and should report total loss of heating/hot water.

**2. How do you handle the bin question?**

Off-topic for maintenance; we hold no collection schedule. Signposted to Tower Hamlets Council for collection days and missed-collection reports, offered to pass on if it's a building shared-bin issue.

**3. Do you create any new tickets?**

No. Boiler is already covered by R-4799 and bins are a council matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
