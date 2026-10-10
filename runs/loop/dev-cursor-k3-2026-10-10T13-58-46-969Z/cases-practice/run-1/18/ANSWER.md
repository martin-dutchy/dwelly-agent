# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice by email on 10 Oct. This is not valid, because two months is required. I replied to him, asked the landlord about an earlier date, and scheduled the move-out steps.

## Where the case stands
Notice acknowledged; waiting on landlord's written answer on an earlier end date (follow-up 14 Oct); checkout follow-up set for 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest valid end 10 Dec 2026, explained keys, checkout and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked landlord whether he accepts 10 Nov or another earlier date in writing, by 14 Oct, and told him the steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Scheduled checkout inspection and key return against 10 Dec end date | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom, thanks for your email of 10 October, we've logged your notice. Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough. The earliest valid end date is 10 December 2026. Rent stays due until then. You asked for 10 November, so we're asking your landlord whether he'll agree to that in writing. Until he does, please plan on 10 December. We'll tell you his answer once we have it, and we'll update you by Wednesday 14 October at the latest. We're starting your move-out now. We'll arrange a checkout inspection close to your end date, and we'll write with the date. You'll hand the keys back to us at checkout, and we'll confirm exactly where and how then. Please don't post them. Your deposit (£2,019) is protected with mydeposits. It is returned after checkout once any deductions are agreed, or decided by the scheme's free dispute service if we can't agree. Any agreed amount is paid within 10 days. Good luck with the new job in Manchester! Please send us your forwarding address.

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Tom Achterberg at Flat 2, 5 Navarino Road gave notice by email on 10 October, asking to leave on 10 November (new job in Manchester). Under the Renters' Rights Act he needs to give two months' notice, so the earliest valid end date is 10 December 2026. Please tell us whether you'll accept 10 November, or another earlier date, in writing. If you don't, the tenancy ends on 10 December. We've told Tom this. We've started the move-out. We'll schedule a checkout inspection and key return near the end date, and his deposit (£2,019, mydeposits) will be handled after checkout. Please reply by Wednesday 14 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any date earlier than 10 Dec.
- No deposit decision made; deductions only after checkout.

## Remaining work
- Landlord answer on early date (agency, 14 Oct)
- Fix and notify checkout date and key handover location (agency)
- Deposit release via mydeposits after checkout
- Get tenant's forwarding address

## Missing or unavailable information
- Landlord's decision on an earlier end date
- Agency key-return location not in records; tenant told it will be confirmed

## Conflicts between sources
- Tenant says one month's notice; the law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? Earliest end date?**

No. Under the Renters' Rights Act two months' written notice is needed. Served 10 Oct 2026, the earliest end date is 10 Dec 2026.

**2. Options to end sooner?**

Only the landlord agreeing in writing to an earlier date, such as 10 Nov. Alternatively, a surrender agreed by both sides. Rent stays due until the agreed end.

**3. What do you reply and what do you start?**

Replied to Tom with the valid date, key return at checkout and the deposit process via mydeposits. Asked Ben for a written answer on 10 Nov. Scheduled a landlord chase for 14 Oct and a checkout and key return follow-up for 10 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Tom… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley for written answer on early end date (10 Nov) for Tom Achterberg, Flat 2, 5 Nav… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","purpose":"Checkout inspection and key return for Flat 2, 5 Navarino Road (valid end date 10 Dec 2026, unless landlor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
