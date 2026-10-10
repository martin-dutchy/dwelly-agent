# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice for 10 Nov, which is invalid under the Renters' Rights Act (two months needed). Replied to Tom with the 10 Dec earliest date, key and deposit info; asked landlord about agreeing 10 Nov in writing; scheduled follow-ups for chase and checkout.

## Where the case stands
Notice acknowledged; waiting on landlord for written agreement to earlier date (review 16 Oct). Move-out steps scheduled against 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest valid end 10 Dec 2026, explained keys and deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked landlord whether he agrees in writing to 10 Nov, reply by 16 Oct; told him steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on earlier date 16 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | BOOK_OR_CONFIRM_APPOINTMENT | Follow-up to book checkout inspection and key return against 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October. We've received your notice and are sorry to see you go; congratulations on the new job.
> 
> Since May 2026 tenants need to give two months' written notice, so one month isn't enough. The earliest valid end date is 10 December 2026. You can leave on 10 November only if your landlord agrees in writing. We've asked him today and will tell you his answer. Until the tenancy ends, rent stays due as normal.
> 
> Keys: please hand them back at the checkout appointment, or to our office on or before the last day. We'll confirm the exact arrangements and book your checkout inspection nearer the time (we'll give you at least 24 hours' notice of the visit).
> 
> Deposit: your deposit is protected with mydeposits. After checkout we compare the flat with the check-in record. Any deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. The deposit is returned within 10 days of agreement.
> 
> We'll update you by Friday 16 October, or sooner if the landlord replies.
> 
> Kind regards
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 October giving one month's notice, wanting to leave on 10 November (new job in Manchester). Under the Renters' Rights Act two months' notice is required, so the earliest valid end date is 10 December 2026. We've told Tom this.
> 
> Question: do you agree in writing to him leaving earlier, on 10 November? A yes/no reply by Friday 16 October would help. If you don't agree, 10 December stands.
> 
> Steps started now: checkout inspection and key return being scheduled against 10 December; Tom told how the deposit (£2,019, mydeposits) is handled after checkout. Rent remains due until the tenancy ends. We'll also look at re-letting options with you once the end date is settled.
> 
> Kind regards
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree an earlier end date; only the landlord can, in writing.
- No checkout appointment is booked yet; only a follow-up to arrange it.
- Nothing decided on deposit deductions.

## Remaining work
- Landlord answer on 10 Nov (owner: agency, chase 16 Oct)
- Book checkout with 24h written notice and confirm key return (follow-up 26 Nov)
- Deposit return via mydeposits after checkout

## Missing or unavailable information
- Landlord's decision on earlier end date
- Exact key return location/arrangements not in records

## Conflicts between sources
- Tenant says one month's notice; current law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? Earliest end date?**

No. Periodic assured tenancy needs two months' written notice; given 10 Oct 2026, earliest end is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to an earlier date (e.g. 10 Nov); otherwise 10 Dec. Tenant remains liable for rent meanwhile.

**3. What do you reply and what do you start?**

Replied to Tom (A1) with valid date, keys at checkout, deposit via mydeposits after checkout; emailed landlord (A2) to ask about 10 Nov; scheduled landlord chase (A3) and checkout/key return booking (A4).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-16","purpose":"Chase Ben Hartley on whether he agrees in writing to earlier end date 10 Nov; update tenant Tom Achterberg… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-11-26","purpose":"Book checkout inspection and key return for P-250 against end date 10 Dec 2026 (or earlier date if landlor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
