# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice for 10 Nov; under the Renters' Rights Act the tenancy needs two months, so earliest end is 10 Dec 2026. I replied to Tom, asked Ben about agreeing earlier, and scheduled follow-ups for the landlord chase and checkout.

## Where the case stands
Notice acknowledged; waiting on landlord's yes/no on earlier end date (review 13 Oct); checkout follow-up set for 1 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest end 10 Dec 2026, explained keys and deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to 10 Nov, reply by 13 Oct, and told him of move-out steps | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 13 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Scheduled checkout inspection and key return arrangements | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. We've received your notice today (10 October).
> 
> Under the current rules a tenant needs to give two months' written notice, so the earliest your tenancy can end is 10 December 2026, not 10 November. Rent stays payable until then. We've asked your landlord, Ben, whether he'd agree in writing to an earlier date such as 10 November. Only he can agree to that, so please don't plan on the earlier date until we confirm it. We'll update you by Tuesday 13 October.
> 
> What happens next:
> - Keys: please hand them back to us at the end of the tenancy. We'll confirm exactly where and when, and arrange a checkout inspection with you nearer the date.
> - Deposit: your £2,019 is protected with mydeposits. After checkout we'll agree any deductions with you; if we can't agree, the scheme's free dispute service decides. Undisputed money is returned within 10 days of agreement.
> 
> Please leave the flat clean and keep us updated on a forwarding address.
> 
> Kind regards
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg (Flat 2, 5 Navarino Road) gave notice by email today, 10 Oct, asking to leave on 10 November (new job in Manchester). Under the Renters' Rights Act he must give two months' notice, so the earliest valid end date is 10 December 2026. Rent remains due until then.
> 
> Question: do you agree in writing to the earlier date of 10 November? Yes or no please, by Tuesday 13 October. If you don't reply, we'll hold to 10 December.
> 
> We've already started move-out: checkout inspection and key return planned for the end date, and the deposit (£2,019, mydeposits) will be handled after checkout through the scheme. We'll update you on re-letting questions separately.
> 
> Kind regards
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledgement does not agree any earlier date; only the landlord can, in writing.
- No deposit amount decisions or deductions made; that follows checkout.
- Checkout date not yet booked or confirmed with tenant.

## Remaining work
- Landlord decision on 10 Nov (agency, chase 13 Oct)
- Book checkout and key return with 24h+ notice (agency, by 1 Dec)
- Deposit return via mydeposits after checkout
- Tell tenant outcome of landlord decision by 13 Oct

## Missing or unavailable information
- Where keys are returned (office address not in records)
- Landlord answer on earlier date

## Conflicts between sources
- Tenant says one month's notice / 10 Nov; law requires two months, so 10 Dec.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

One month is not valid for the 10 Nov date; two months' written notice is required. Notice received 10 Oct 2026, so earliest end is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord (Ben) agrees in writing to an earlier date such as 10 Nov. Tenant can't unilaterally shorten it; rent is due until the end date.

**3. What do you reply and what do you start?**

Replied to tenant with the valid date, keys and deposit process (mydeposits, return within 10 days of agreement after checkout); emailed landlord the earlier-date question and move-out steps; scheduled landlord chase (13 Oct) and checkout/key return booking (1 Dec).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-13","purpose":"Chase Ben Hartley for yes/no on earlier end date (10 Nov) for Tom Achterberg, Flat 2, 5 Navarino Road; upd… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-01","purpose":"Book checkout inspection and key return for Flat 2, 5 Navarino Road ahead of tenancy end (10 Dec 2026, or … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
