# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant emailed one month's notice on 10 Oct 2026 for a 10 Nov exit. That is not valid: two months' notice is required, so the earliest end date is 10 Dec 2026. I acknowledged this to the tenant, asked the landlord about an earlier date, and scheduled the move-out steps.

## Where the case stands
Notice acknowledged. Waiting on landlord's written yes/no to an early end on 10 Nov (chase 14 Oct). Checkout and key return set up against 10 Dec (follow-up 26 Nov).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Chase Ben for written yes/no on the 10 Nov early end by 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 2 | WAIT | Book checkout and key return against the end date | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. We have your notice dated 10 October 2026.
> 
> Since May this year, tenants need to give two months' written notice, not one. So the earliest your tenancy can end is 10 December 2026, and rent stays payable up to then. Your landlord can agree to an earlier date in writing. We are asking him now about 10 November and will tell you his answer. Until he agrees, please plan around 10 December.
> 
> What we are starting now:
> - Checkout inspection: we will arrange this for your final day and write to you with a date and time.
> - Keys: please bring all sets back to us at checkout, or we will confirm a drop-off arrangement with the checkout details. Please don't post them through the door.
> - Deposit: it is held in mydeposits. After checkout, any deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. It is returned within 10 days of agreement.
> 
> You will next hear from us once we have the landlord's reply, and by 14 October at the latest.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave written notice by email on 10 October 2026, saying he will leave on 10 November (new job in Manchester). Under the Renters' Rights Act tenants must give two months' notice, so the earliest valid end date is 10 December 2026.
> 
> Question: do you agree in writing to the earlier date of 10 November 2026? Yes or no please, by 14 October. Without your written agreement we are working to 10 December.
> 
> Already started: acknowledged to Tom with the valid date, checkout inspection and key return being scheduled against 10 December, and Tom told his deposit (£2,019, mydeposits) is returned through the scheme after checkout. Next we will confirm the checkout date with you both.
> 
> Kind regards,
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any date earlier than 10 Dec.
- Nothing here decides deposit deductions or the refund amount.

## Remaining work
- Landlord reply on early date (agency, 14 Oct).
- Book checkout inspection with 24h notice and arrange key return (agency, from 26 Nov).
- Deposit return via mydeposits after checkout.

## Missing or unavailable information
- Agency office address or key-return point.
- Landlord's decision on an earlier end date.

## Conflicts between sources
- Tenant says one month's notice; the law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

No. One month is too short under the Renters' Rights Act, which requires two months' written notice. Earliest end date is 10 December 2026, assuming notice was served by email on 10 Oct.

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to an earlier date, such as 10 Nov. The tenant stays liable for rent until the valid end date unless the landlord agrees. We have asked him.

**3. What do you reply and what do you start?**

Replied to Tom with the valid date, the early-date request, key return at checkout, and the deposit route (mydeposits, ADR if disputed, return within 10 days of agreement). Emailed Ben Hartley asking for a yes/no by 14 Oct. Scheduled the landlord chase and the checkout/key-return booking.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley for written yes/no on early end date 10 Nov; then update tenant Tom Achterberg … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-11-26","purpose":"Book checkout inspection and key return for Flat 2, 5 Navarino Road against end date 10 Dec 2026 (or earli… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
