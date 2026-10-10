# Case 21: Status enquiry plus an off-topic question: ANSWER

**Decision:** action_taken · **Severity:** routine

Replied to Jonah Okafor's boiler status question by email (ledger A1). The R-4799 job is waiting on a landlord decision after a second quote and has a Swift P&H visit recorded for 14 Oct; a follow-up is set for 15 Oct (A2). The bin collection question is outside our service, so he was pointed to Tower Hamlets Council.

## Where the case stands
Boiler job R-4799 (pressure dropping) is at double_quotation. First quote £780 for expansion vessel replacement (3 Oct). Landlord Margaret Ellison asked for a second quote (5 Oct). Swift P&H visit recorded for 14 Oct 2026. No landlord decision recorded yet; £780 is above her £250 routine limit.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to Jonah Okafor by email with the R-4799 status, what happens next, gas and no-heat safety advice, and where to check his bin collection. | Jonah Okafor, tenant | email | A1 ✅ |
| 2 | WAIT | Follow-up set for 2026-10-15 to check the landlord's decision on the quote and the 14 Oct Swift P&H visit outcome; chase landlord by SMS/phone if no reply. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah,
> 
> Thanks for getting in touch, and sorry it has felt slow.
> 
> Here is where your boiler job (ref R-4799, pressure dropping) stands:
> - A visit on 3 October found the expansion vessel needs replacing. The contractor's quote was £780.
> - Because that is above the amount your landlord has approved for routine repairs, she asked for a second quote before deciding. That is still under way.
> - Our records show a visit with Swift P&H on 14 October 2026. Please keep that free, and we will confirm the arrangements with you.
> - The work cannot go ahead until your landlord has made her decision on the quote. We will contact you as soon as we hear from her.
> 
> In the meantime, if the boiler stops working completely or you smell gas, please call the National Gas Emergency line on 0800 111 999 and tell us straight away. If you have no heating or hot water, let us know right away so we can treat it as urgent.
> 
> On your bin question: we do not arrange bin collections, so I cannot see the collection day. Tower Hamlets Council runs bin collections for your address. You can check your collection day on their website or by calling them, and they can also look into a missed collection for you.
> 
> Best wishes,
> Operations team

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the status reply does not approve the £780 quote or any second quote.
- The 14 Oct visit is taken from the system history; it is not independently confirmed by the provider in this run.
- We do not hold Tower Hamlets bin collection schedules, so the bin day was not confirmed.

## Remaining work
- Landlord Margaret Ellison to decide on the £780 quote or the second quote (not yet requested in this run; her approval is needed above £250).
- Swift P&H to attend 14 Oct 2026 and report the result.
- Follow-up FUP-102 due 2026-10-15.

## Missing or unavailable information
- Landlord decision on the £780 quote and the second quote outcome.
- Provider confirmation of the 14 Oct 2026 visit time.
- Tower Hamlets bin collection day for P-202 (not held by us).

## Conflicts between sources
- Tenant asked about 'portal chat', but the contact on file is email and he prefers email; I replied by email on the record.

## Answers to the case questions
**1. What is the current status of his boiler job and what does it mean for him?**

R-4799 is at double_quotation. The £780 expansion vessel quote is above the landlord's £250 routine limit and she asked for a second quote. A Swift P&H visit is recorded for 14 Oct 2026. Work cannot go ahead until the landlord decides, so he should keep the 14 Oct visit free and expect an update once she responds.

**2. How do you handle the bin question?**

Not a maintenance job and not something we arrange. We told him Tower Hamlets Council runs his bin collections and he can check the day on their website or by phone. We did not guess a collection day.

**3. Do you create any new tickets?**

No. The boiler issue already has an open job, R-4799, and the bin question is not a repair. No duplicate was created.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"ticket_ref":"R-4799","due_on":"2026-10-15","party":"Margaret Ellison (landlord); Swift P&H","purpose":"Check landlord decision on the £780… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
