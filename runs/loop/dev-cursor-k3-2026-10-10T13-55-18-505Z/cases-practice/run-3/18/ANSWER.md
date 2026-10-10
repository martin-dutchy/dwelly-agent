# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice to leave on 10 Nov. Under the Renters' Rights Act two months is needed, so the earliest valid end date is 10 Dec 2026. I acknowledged it to Tom, asked Ben to agree in writing to an earlier date, and started move-out follow-ups.

## Where the case stands
Notice acknowledged; valid end date 10 Dec 2026. Waiting on landlord Ben Hartley (reply requested by 14 Oct) on whether he agrees in writing to 10 Nov. Move-out follow-up scheduled.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest end 10 Dec 2026, explained keys, checkout and deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord whether he accepts an earlier end date of 10 Nov in writing, and told him the move-out steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Checkout inspection and key return follow-up set for 8 Dec | internal | internal | A3 ✅ |
| 4 | CHASE_LANDLORD | Chase follow-up on early-end-date answer on 14 Oct | Ben Hartley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. We've received your notice today (10 October 2026).
> 
> Under the current rules, tenants need to give at least two months' notice, so one month isn't enough on its own. The earliest your tenancy can end is 10 December 2026. Your rent stays payable until then. We've asked your landlord, Ben, whether he'd agree in writing to an earlier date such as 10 November. Only he can agree that, and until he confirms in writing, 10 December stands. We'll update you as soon as we hear.
> 
> Moving out: we're starting the process now. We'll arrange a checkout inspection around your end date and email you a time. Please hand all keys back at that checkout, or to us before then, and we'll confirm exactly how when we send the time. Please don't leave keys in the flat or post them without telling us.
> 
> Deposit: your £2,019 is protected with mydeposits. After checkout we'll compare the flat with the check-in condition. Any deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. The deposit is returned within 10 days of agreement.
> 
> We'll be in touch by 17 October with Ben's answer.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave on 10 Nov 2026 (new job in Manchester). Valid notice needs two months, so earliest end is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov? Steps already started: acknowledged to Tom, checkout inspection and key return being planned around the valid end date, deposit (£2,019, mydeposits) to be handled after checkout. Please reply by 14 Oct.
> 
> Options: Keep 10 December 2026 as end date (default, no action needed); Agree in writing to 10 November 2026; Agree another earlier date (please state)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any earlier end date; only the landlord can, in writing.
- No checkout time is booked yet and no deposit deductions are decided.
- Key return location not stated as it is not in the records.

## Remaining work
- Await landlord's answer on 10 Nov; chase 14 Oct and update tenant by 17 Oct
- Book checkout inspection and key return with 24h+ notice around end date (follow-up 8 Dec)
- Deposit return via mydeposits after checkout, within 10 days of agreement

## Missing or unavailable information
- Landlord's decision on an earlier end date
- Agency key-return address/arrangements not in the records

## Conflicts between sources
- Tenant says one month's notice to 10 Nov; current law requires two months, so the legal position (10 Dec) was used.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. One month is too short; tenants must give at least two months' written notice. Served 10 Oct 2026, the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord (Ben Hartley) agrees in writing to an earlier date, e.g. 10 Nov. Requested via APR-102. Tenant could also negotiate a surrender by agreement, but nothing is assumed.

**3. What do you reply and what do you start?**

Replied to Tom the same day: notice acknowledged, 10 Dec is the valid end date, landlord asked about earlier, keys returned at checkout (details to follow), deposit £2,019 returned via mydeposits after checkout, within 10 days of agreement. Started: landlord request, checkout/key return follow-up (8 Dec), landlord chase (14 Oct).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave on 1… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-12-08","party":"Tom Achterberg","purpose":"Arrange checkout inspection and key return around tenancy end 10 Dec 2026 (or ear… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-10-14","party":"Ben Hartley","purpose":"Chase landlord on whether he accepts earlier end date of 10 Nov; update tenant by 17… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
