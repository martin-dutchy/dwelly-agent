# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant emailed one month's notice for 10 Nov. Under the Renters' Rights Act two months is required, so the earliest valid end is 10 Dec 2026. I acknowledged this to the tenant, asked the landlord whether he accepts 10 Nov in writing, and started move-out against 10 Dec.

## Where the case stands
Notice acknowledged; waiting on landlord (Ben Hartley) for any earlier-date agreement, chase 14 Oct; checkout/key return follow-up set for 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether he accepts early end date 10 Nov, reply by 14 Oct | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge notice, state 10 Dec earliest end, explain keys and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 3 | WAIT | Schedule checkout inspection and key return for 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October, which we have received as your written notice to leave Flat 2, 5 Navarino Road. Congratulations on the new job.
> 
> Under the current rules a tenant needs to give two months' notice, not one. Your earliest valid end date is therefore 10 December 2026, and your tenancy and rent continue until then. We cannot shorten that ourselves: it can only end sooner if your landlord agrees in writing. We are asking him today whether he will accept 10 November, and we'll let you know his answer. Please don't treat 10 November as agreed until you hear from us in writing.
> 
> Keys: we'll arrange a checkout inspection near your end date and tell you the time and exactly where and how to hand the keys back. Please don't leave them anywhere before then.
> 
> Deposit: your £2,019 is protected with mydeposits. After checkout, any proposed deductions are agreed with you, or decided by the scheme's independent dispute service if we can't agree. It is returned within 10 days of agreement.
> 
> We'll be in touch again by 17 October with the landlord's answer and checkout plans.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave on 10 Nov. Valid notice is two months, so the earliest end date is 10 Dec 2026. Do you agree in writing to the earlier date of 10 Nov? We have started move-out against 10 Dec: checkout inspection and key return are being scheduled, and the deposit (£2,019, mydeposits) will be handled after checkout. Rent continues to the end date unless you agree otherwise. Please reply by 14 Oct.
> 
> Options: Keep 10 December 2026 (recommended unless you want to re-let sooner); Agree in writing to 10 November 2026

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree 10 Nov; only the landlord can.
- Nothing here decides deposit deductions.
- No checkout time or key drop location has been fixed yet.

## Remaining work
- Landlord answer on early date (chase 14 Oct)
- Tell tenant outcome by 17 Oct
- Arrange checkout with 24h notice and key-return instructions
- Deposit return through mydeposits after checkout

## Missing or unavailable information
- Key return location/process not on file
- Landlord's decision on early end date

## Conflicts between sources
- Tenant says one month's notice; law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

Not as to the date. Written notice is accepted, but one month is too short; two months is needed. Given 10 Oct 2026, the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to an earlier date (e.g. 10 Nov); a surrender by mutual agreement. The agency cannot agree this itself. Landlord asked via APR-102.

**3. What do you reply and what do you start?**

Replied (MSG-101) giving the 10 Dec date, explaining early end needs landlord's written agreement, keys to be returned at checkout with details to follow, deposit returned via mydeposits after checkout with ADR for disputes, returned within 10 days of agreement. Started: landlord request, chase follow-up 14 Oct, and checkout/key-return follow-up 10 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave on 1… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on whether he accepts 10 Nov early end date for T-1050; update tenant by 17 Oct… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","purpose":"Checkout inspection and key return for Flat 2, 5 Navarino Road (tenant end date 10 Dec 2026 unless landlor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
