# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice (to leave 10 Nov); under the Renters' Rights Act two months is needed, so the earliest valid end is 10 Dec 2026. I replied to him, asked the landlord whether he will agree in writing to 10 Nov, and scheduled the move-out work against 10 Dec.

## Where the case stands
Notice acknowledged; landlord asked about earlier date (reply due 14 Oct); move-out scheduled against 10 Dec 2026.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest valid end date 10 Dec 2026, explained keys, checkout and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether he accepts earlier 10 Nov end date, and tell him move-out steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Review landlord answer 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Follow-up to arrange checkout inspection and key return before 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October. We've received your notice and I'm sorry to see you go, but congratulations on the new job.
> 
> Under the current rules a tenant needs to give two months' written notice, so one month isn't enough. Counting from today, the earliest valid end date is 10 December 2026. Rent stays payable until then. You asked to leave on 10 November: we've asked your landlord whether they'll agree to that in writing. Until they say yes, please plan on 10 December. We'll tell you their answer by Wednesday 14 October.
> 
> What happens next:
> - Checkout: we'll arrange a checkout inspection around your end date and give you at least 24 hours' notice of the time.
> - Keys: all sets should be handed back to us at the checkout visit. We'll confirm exactly where and when in that notice. Please don't post them or leave them at the flat.
> - Deposit: your £2,019 deposit is protected with mydeposits. After checkout, any proposed deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. It's returned within 10 days of agreement.
> 
> Best wishes,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) gave notice by email on 10 Oct 2026 asking to leave on 10 Nov. Two months' notice is required, so the earliest valid end date is 10 Dec 2026 (rent due to then). Do you agree in writing to the earlier 10 Nov date? We've started move-out against 10 Dec: checkout inspection and key return to be arranged, deposit (£2,019, mydeposits) returned via the scheme after checkout. Please reply by 14 Oct.
> 
> Options: Keep 10 December 2026 (recommended unless you want to release him early); Agree in writing to 10 November 2026 (you lose a month's rent unless re-let); Agree another date

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any earlier end date; only the landlord can, in writing.
- No checkout date is booked yet; the tenant will get 24h+ written notice.
- Deposit return amount is not decided; deductions are agreed or go to ADR.

## Remaining work
- Landlord decision on 10 Nov (agency, by 14 Oct)
- Arrange checkout and key return (agency, from 1 Dec)
- Deposit return via mydeposits after checkout

## Missing or unavailable information
- Landlord's answer on earlier date
- Office address for key return not on file

## Conflicts between sources
- Tenant says one month's notice; the law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. One month is too short; tenants must give 2 months' written notice. Notice received 10 Oct 2026, so earliest end is 10 Dec 2026.

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to an earlier date (e.g. 10 Nov), or a surrender agreed by both sides; also a replacement tenant if the landlord agrees. Landlord asked.

**3. What do you reply and what do you start?**

Replied acknowledging notice, giving 10 Dec as the valid date, keys handed at checkout (details to follow), deposit returned via mydeposits after checkout. Started: landlord question, follow-up on 14 Oct, checkout/key-return follow-up on 1 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) gave notice by email on 10 Oct 2026 asking to leave on… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on whether he accepts earlier end date 10 Nov; tell tenant answer","party":"Ben… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-01","purpose":"Arrange checkout inspection and key return for end of tenancy 10 Dec 2026 (or agreed earlier date); give t… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
