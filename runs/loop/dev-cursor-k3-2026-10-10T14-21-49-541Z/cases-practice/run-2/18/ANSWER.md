# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice by email for a 10 Nov exit; under the Renters' Rights Act two months is required, so the earliest end is 10 Dec 2026. I replied to the tenant, asked the landlord about the earlier date, and scheduled checkout and key return.

## Where the case stands
Notice acknowledged; waiting on landlord's written answer on earlier end date (review 14 Oct); checkout and key return scheduled against 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest valid end 10 Dec 2026, explained keys, checkout and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Ben whether he agrees in writing to 10 Nov, reply by 14 Oct, and report the move-out steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 14 Oct and update tenant | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Checkout inspection and key return follow-up set against 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October. We've logged it as your notice to leave Flat 2, 5 Navarino Road, and congratulations on the new job.
> 
> Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough on its own. With notice given on 10 October, the earliest end date is 10 December 2026. Your rent stays payable until then.
> 
> You've asked to leave on 10 November. We've asked your landlord whether they'll agree to that earlier date in writing. Please don't treat it as agreed until we confirm it. We'll update you by Wednesday 14 October.
> 
> Keys: please plan to return all sets to our office on your final day, once the date is confirmed. We'll send the address and arrange a time then. We'll also arrange a checkout inspection around your move-out date and contact you with options.
> 
> Deposit: your £2,019 is held with mydeposits. After checkout, any deductions are agreed with you or decided by the scheme's free dispute service, and the deposit is returned within 10 days of agreement.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct giving one month's notice and asking to leave on 10 November. Under the Renters' Rights Act the notice needs to be two months, so the earliest valid end date is 10 December 2026.
> 
> Please reply by Wednesday 14 October: do you agree in writing to the earlier date of 10 November? If you don't, we'll hold him to 10 December.
> 
> Steps we've started: we've told Tom the position, the key return and the deposit process (held with mydeposits, returned within 10 days of agreement after checkout). We're scheduling a checkout inspection and key return against the valid end date, and will arrange re-letting preparation and any end-of-tenancy works with you.
> 
> Kind regards,
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree an earlier end date; only the landlord can agree in writing.
- No deposit deductions or release decided; that follows checkout via mydeposits.
- Rent remains due until the valid end date.

## Remaining work
- Landlord answer on 10 Nov (agency, review 14 Oct)
- Checkout inspection with 24h notice and key return (agency)
- Deposit return via mydeposits after checkout

## Missing or unavailable information
- Landlord's decision on earlier end date
- Whether notice was in writing validly received 10 Oct (email taken as written notice)

## Conflicts between sources
- Tenant says one month's notice; current law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

Not valid for 10 November: periodic tenancies need two months' written notice. Notice given 10 Oct 2026 ends earliest 10 Dec 2026.

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to an earlier date (e.g. 10 Nov), or a mutual surrender agreed in writing; also a replacement tenant if the landlord agrees. Asked Ben to decide by 14 Oct.

**3. What do you reply and what do you start?**

Replied to Tom with the correct date, keys, checkout and deposit process (mydeposits, return within 10 days of agreement); told the landlord; scheduled landlord chase (14 Oct) and checkout/key return follow-up against 10 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","party":"Ben Hartley, landlord","purpose":"Chase landlord answer on whether earlier end date of 10 Nov is accepted; u… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","party":"Tom Achterberg, tenant","purpose":"Checkout inspection and key return for Flat 2, 5 Navarino Road, against v… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
