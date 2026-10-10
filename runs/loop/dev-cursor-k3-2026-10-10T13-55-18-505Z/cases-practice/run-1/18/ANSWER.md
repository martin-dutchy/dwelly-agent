# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice on 10 Oct for 10 Nov. Under the Renters' Rights Act two months is required, so the earliest end is 10 Dec 2026. I acknowledged this to Tom, asked Ben whether he accepts 10 Nov, and started move-out steps.

## Where the case stands
Notice acknowledged. Waiting on landlord Ben Hartley for any agreement to an earlier end date (chase 16 Oct). Move-out planned against 10 Dec 2026; checkout notice follow-up set for 3 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest valid end 10 Dec 2026, explained keys, checkout and deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to 10 Nov, told him move-out steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord answer; chase 16 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Scheduled checkout inspection and key return notice task for 3 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October. We've received your notice and wish you luck with the new job in Manchester.
> 
> Under the current rules a tenant needs to give two months' written notice, so one month isn't enough. Counting from today, the earliest your tenancy can end is 10 December 2026. Rent stays due until then. You asked to leave on 10 November: we've asked your landlord whether they'd agree to that in writing. Until they say yes, please plan on 10 December. We'll let you know their answer, and we'll update you by Friday 16 October at the latest.
> 
> We're starting your move-out now:
> - Keys: please hand all keys back to us on or before the end date. We'll confirm the exact place and time with you.
> - Checkout: we'll arrange a checkout inspection around the end date and give you at least 24 hours' written notice.
> - Deposit: your £2,019 deposit is protected with mydeposits. After checkout, any deductions are agreed with you or decided by the scheme's free dispute service. It's returned within 10 days of agreement.
> 
> Please reply if you have questions.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave on 10 Nov. The earliest valid end date is 10 Dec 2026 (two months). Do you agree in writing to the earlier 10 Nov date? We've started move-out planning against 10 Dec: checkout inspection, key return, deposit via mydeposits. Please reply by 16 Oct.
> 
> Options: Keep 10 December 2026 (recommended unless you want to re-let sooner); Agree in writing to 10 November 2026; Agree another date between the two

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not shorten the tenancy; 10 Nov applies only if the landlord agrees in writing.
- No checkout inspection is booked yet; no deposit decision made.
- Exact key-return location not stated as not in the records.

## Remaining work
- Landlord reply on earlier date (agency, 16 Oct)
- Send 24h+ written checkout notice and confirm key return (agency, from 3 Dec)
- Deposit return via mydeposits after checkout

## Missing or unavailable information
- Agency key-return address/time not on record
- Landlord's decision on earlier end date

## Conflicts between sources
- Tenant says one month's notice; law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

No. One month is too short; tenants must give two months' written notice. Served 10 Oct 2026, so the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord (Ben Hartley) agrees in writing to an earlier date such as 10 Nov; asked him by 16 Oct. A new tenant or surrender agreement would also need landlord agreement.

**3. What do you reply and what do you start?**

Replied to Tom acknowledging notice, stating 10 Dec, explaining keys return, checkout with 24h notice, and deposit return via mydeposits (within 10 days of agreement). Started: landlord question, chase follow-up 16 Oct, checkout/key-return follow-up 3 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave on 10 Nov. … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-16","purpose":"Chase Ben Hartley for answer on earlier end date (10 Nov) for Tom Achterberg, P-250; update tenant","party… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-03","purpose":"Move-out P-250: send 24h+ written notice of checkout inspection and key return around 10 Dec 2026 end date… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
