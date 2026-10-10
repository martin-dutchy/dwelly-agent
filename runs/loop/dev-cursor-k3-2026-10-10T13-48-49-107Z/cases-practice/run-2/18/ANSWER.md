# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice (leave 10 Nov); under the Renters' Rights Act two months is required, so the earliest end is 10 Dec 2026. I acknowledged this to the tenant, asked the landlord about accepting 10 Nov, and started move-out with dated follow-ups.

## Where the case stands
Notice acknowledged; waiting on landlord's decision on early date (review 14 Oct); checkout and key return scheduled against 10 Dec 2026.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest end 10 Dec 2026, explained keys, checkout and deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked landlord whether he agrees in writing to 10 Nov, reply by 14 Oct; told him move-out started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord answer on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Checkout inspection and key return follow-up set for 10 Dec 2026 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October, and congratulations on the new job. We've received your notice.
> 
> Under the current rules, tenants give two months' written notice, so the earliest end date for your tenancy is 10 December 2026, not 10 November. Rent stays due until the tenancy ends. The only way to leave earlier is if your landlord agrees in writing. We're asking him now whether he'll accept 10 November and will let you know his answer. Please don't treat 10 November as agreed until you hear from us.
> 
> What happens next:
> - Keys: please hand them back to us at checkout (we'll confirm where and how). Please don't leave them with anyone else or post them without telling us.
> - Checkout: we'll arrange a checkout inspection around your end date and contact you with a date, so you can be there.
> - Deposit: your £2,019 deposit is protected with mydeposits. After checkout, any proposed deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. It is returned within 10 days of agreement.
> 
> We'll be back in touch by 14 October with the landlord's answer.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave written notice today (10 Oct), asking to leave on 10 November because of a new job. Under the Renters' Rights Act the earliest valid end date is 10 December 2026 (two months' notice).
> 
> Question: do you agree in writing to the earlier date of 10 November? Yes or no, please, by 14 October. If you say no, the tenancy ends 10 December and rent is due until then.
> 
> We've started the move-out against 10 December: checkout inspection and key return to be scheduled, and we've told Tom his deposit (£2,019, mydeposits) is returned after checkout via the scheme. We'll update you with dates.
> 
> Kind regards,
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree an earlier end date or waive rent to 10 Dec.
- No checkout appointment or key location has been confirmed to the tenant yet.
- Deposit return amount is not decided; depends on checkout.

## Remaining work
- Agency: chase landlord 14 Oct and tell tenant the answer
- Agency: book checkout inspection and confirm key handover details with tenant (rescheduling if early date agreed)
- Agency: deposit return via mydeposits after checkout

## Missing or unavailable information
- Landlord's decision on an earlier end date
- Key handover location/process details not in records

## Conflicts between sources
- Tenant says one month / 10 Nov; law requires two months so 10 Dec.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

One month is not enough: tenants must give two months' written notice. Notice received 10 Oct 2026 by email, so earliest end date is 10 Dec 2026. The notice is treated as valid notice ending 10 Dec, not 10 Nov.

**2. What options exist to end sooner?**

Only if the landlord (Ben Hartley) agrees in writing to an earlier date such as 10 Nov; the agency cannot agree this itself. Rent remains due to the agreed end date.

**3. What do you reply and what do you start?**

Replied to Tom with the 10 Dec date, keys returned at checkout, checkout inspection to be arranged, deposit returned via mydeposits after checkout. Asked landlord about 10 Nov by 14 Oct. Scheduled landlord chase (14 Oct) and checkout/key return follow-up (10 Dec).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","party":"Ben Hartley, landlord","purpose":"Chase landlord answer on early end date 10 Nov for Tom Achterberg, Flat 2,… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","party":"Tom Achterberg, tenant","purpose":"Checkout inspection and key return for P-250 against valid end date 10 De… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
