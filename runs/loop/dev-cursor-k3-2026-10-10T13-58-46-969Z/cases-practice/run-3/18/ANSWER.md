# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice by email on 10 Oct for 10 Nov. That is invalid under the Renters' Rights Act, which requires two months. Earliest end is 10 Dec 2026. I replied to Tom, asked the landlord about an early date, and scheduled the move-out steps.

## Where the case stands
Notice acknowledged. Waiting on landlord for early-date agreement (chase 14 Oct). Checkout and key return follow-up set for 1 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest end 10 Dec, explained keys, checkout and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked landlord whether they accept 10 Nov in writing and told them of the move-out steps | Ben Hartley, landlord | email | A2 ✅ |
| 3 | CHASE_LANDLORD | Follow-up to chase landlord by 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | WAIT | Checkout inspection and key return arrangement follow-up 1 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October; we've received your notice. Since the law changed in May, tenants need to give two months' written notice, so one month isn't enough. Counting from today, the earliest your tenancy can end is 10 December 2026. Rent stays due until then.
> 
> You asked to leave on 10 November. We've asked your landlord whether they'll agree to that earlier date in writing. Only they can agree, and until they do, please plan for 10 December. We'll tell you their answer as soon as we have it.
> 
> We're starting your move-out now. We'll contact you in early December to arrange the checkout inspection and key handover. We'll confirm where and how to return the keys then. Please don't post them or leave them anywhere before that.
> 
> Your deposit (£2,019) is held in the mydeposits scheme. It's returned after checkout. Any deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. It's paid back within 10 days of agreement.
> 
> Good luck with the new job in Manchester!

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave notice by email on 10 October 2026. He asked to leave on 10 November because of a new job. Under the Renters' Rights Act, two months' notice is needed, so the earliest valid end date is 10 December 2026.
> 
> Question for you: do you agree in writing to the earlier date of 10 November? A yes or no is fine, ideally by Wednesday 14 October. Without your agreement, the tenancy ends 10 December.
> 
> We've started the move-out: a checkout inspection and key return are being scheduled for around 10 December, and we've explained to Tom how the deposit is returned through mydeposits after checkout. We'll update you on dates.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree an earlier end date; only the landlord can, in writing.
- No checkout date is booked yet and no key-drop location was given.
- Nothing here decides deposit deductions.

## Remaining work
- Landlord answer on 10 Nov (agency, 14 Oct)
- Arrange checkout inspection with 24h notice and key return details (agency, from 1 Dec)
- Deposit return via mydeposits after checkout

## Missing or unavailable information
- Landlord's decision on an earlier end date
- Agency key-return location and checkout slot

## Conflicts between sources
- Tenant says one month's notice; current law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

No. Two months' written notice is required; one month is not valid. Served 10 Oct 2026, the earliest end is 10 Dec 2026. The notice is treated as valid notice for that date.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to an earlier date, such as 10 Nov. The tenant could also ask for a mutually agreed surrender. I have asked the landlord.

**3. What do you reply and what do you start?**

I replied with the valid end date, the early-date request, key return to be confirmed at checkout, and how the deposit is returned via mydeposits after checkout. I told the landlord and scheduled the chase (14 Oct) and the checkout/key return arrangements (1 Dec).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley for answer on early end date 10 Nov; then tell tenant Tom Achterberg (P-250)","… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-01","purpose":"Arrange checkout inspection and key return for P-250 against valid end date 10 Dec 2026; give tenant 24h+ … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
