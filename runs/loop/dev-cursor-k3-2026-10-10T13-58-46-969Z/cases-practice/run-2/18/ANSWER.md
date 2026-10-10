# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice by email on 10 Oct, which is short under the Renters' Rights Act. I acknowledged it, gave 10 Dec 2026 as the earliest end date, asked Ben whether he accepts 10 Nov, and started the move-out follow-ups.

## Where the case stands
Notice acknowledged. Valid end date 10 Dec 2026. Landlord asked about early end 10 Nov; reply due 14 Oct. Move-out follow-ups scheduled.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, gave earliest end date 10 Dec, explained keys, checkout and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked landlord whether he agrees in writing to 10 Nov, and told him the move-out has started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord and update tenant by 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Checkout inspection and key return follow-up set for 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October, which we've received. Congratulations on the new job.
> 
> Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough. Counting from today, the earliest your tenancy can end is 10 December 2026. Rent stays payable until then.
> 
> You asked to leave on 10 November. We've asked your landlord whether they'll agree to that in writing. Only they can agree to an earlier date, so please don't treat 10 November as confirmed until we tell you. We'll update you by Wednesday 14 October.
> 
> What happens next:
> - Keys: please hand them back to our office on or before your final day. We'll confirm the address and time with you once your end date is settled.
> - Checkout: we'll arrange a checkout inspection around your end date and give you notice of the time.
> - Deposit: your £2,019 deposit is protected with mydeposits. It's returned after checkout. Any deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. Agreed money is returned within 10 days.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave notice by email on 10 October 2026. He asked for one month and wants to leave on 10 November, as he's moving to Manchester for work.
> 
> Under the Renters' Rights Act, two months' notice is required, so the earliest valid end date is 10 December 2026. He's told this.
> 
> Question: do you agree in writing to him leaving earlier, on 10 November? Please reply yes or no by Wednesday 14 October. Without a yes, the end date stays 10 December.
> 
> We've started the move-out. We're scheduling the checkout inspection and key return around the end date. The £2,019 deposit stays protected with mydeposits until checkout. We'll also talk to you about re-letting and viewings.
> 
> Kind regards,
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any earlier date.
- Nothing here releases or decides deductions from the deposit.
- No checkout time is booked yet.

## Remaining work
- Landlord to answer early-date question by 14 Oct (agency chases)
- Agency to book the checkout and give tenant 24h+ notice
- Deposit release via mydeposits after checkout
- Re-let planning with landlord

## Missing or unavailable information
- Landlord's written decision on an earlier end date
- Exact key-return address and time (not on file)

## Conflicts between sources
- Tenant says one month's notice. Current law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. The tenancy is assured periodic and needs two months' written notice. Notice given 10 Oct 2026 gives an earliest end date of 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to an earlier date, such as 10 Nov. Asked of Ben, reply due 14 Oct. Without that, the tenant stays liable for rent to 10 Dec.

**3. What do you reply and what do you start?**

Replied to Tom with the valid date, key return, checkout and deposit process (mydeposits, via ADR if disputed, returned within 10 days of agreement). Told Ben and asked about the early date. Scheduled the 14 Oct chase and the 10 Dec checkout and key return.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley for answer on early end date 10 Nov; update tenant Tom Achterberg (P-250)","party":"Ben … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","purpose":"Checkout inspection and key return for Flat 2, 5 Navarino Road (valid end date 10 Dec unless landlord agre… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
