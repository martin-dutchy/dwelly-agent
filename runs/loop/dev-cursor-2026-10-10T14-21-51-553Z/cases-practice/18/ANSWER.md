# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice by email on 10 Oct 2026. Under the Renters' Rights Act the notice is two months, so the earliest end date is 10 Dec 2026. I acknowledged the notice, asked the landlord about the earlier date, and started move-out against 10 Dec.

## Where the case stands
Notice acknowledged. Landlord asked to agree or refuse 10 Nov by 14 Oct. Checkout and key return scheduled against 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he accepts an earlier end date of 10 Nov, reply by 14 Oct | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledged notice and stated the valid end date, key return and deposit process | Tom Achterberg, tenant | email | A1 ✅ |
| 3 | WAIT | Chase landlord on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Checkout inspection and key return scheduled for 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email of 10 October. We've received your notice and are sorry to see you go, but congratulations on the new job.
> 
> Since May 2026 tenancies have no fixed end date, and the notice a tenant must give is two months in writing, not one. So the earliest end date is 10 December 2026, not 10 November. Your tenancy and rent continue until then. If the landlord agrees in writing to an earlier date we can shorten it. I'm asking him now and will tell you his answer; please don't plan on 10 November until we confirm it.
> 
> We're starting your move-out now against 10 December. We'll arrange a checkout inspection around that date and contact you with a time. Please hand back all keys to us at that inspection, or tell us if you'd prefer another way and we'll arrange it.
> 
> Your deposit (£2,019) is protected with mydeposits. After checkout, any deductions are agreed with you or decided by the scheme's free dispute service. Money is returned within 10 days of agreement.
> 
> You'll next hear from us once the landlord replies, and in any case by 14 October.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave written notice by email on 10 October, asking to leave on 10 November (new job in Manchester). Under the Renters' Rights Act the notice period is two months, so the earliest valid end date is 10 December 2026.
> 
> Decision for you: do you agree in writing to the earlier date of 10 November? Yes or no please, by 14 October. If we hear nothing, we'll keep 10 December.
> 
> Steps started: we've acknowledged the notice, told Tom the valid date, and are arranging the checkout inspection and key return against 10 December. The £2,019 deposit sits with mydeposits and is returned after checkout once deductions are agreed or decided by the scheme. Rent remains due until the tenancy ends.
> 
> Kind regards,
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The earlier date is not agreed; nothing is shortened until the landlord confirms in writing.
- No checkout time is booked yet; the tenant will get at least 24h written notice.
- The deposit return amount is not decided.

## Remaining work
- Agency: act on the landlord's reply by 14 Oct and tell Tom.
- Agency: book the checkout and notify Tom in writing before 10 Dec.
- Agency: confirm the key return method and arrange the deposit return after checkout.

## Missing or unavailable information
- Landlord's decision on an earlier end date.
- Agency office address for key return was not in the records, so the tenant was told keys go back at checkout.

## Conflicts between sources
- Tenant says one month's notice, but the law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

The notice is valid as written notice, but one month is too short. Tenants must give 2 months, so the earliest end date is 10 Dec 2026, counting from receipt on 10 Oct. 10 Nov is not valid unless the landlord agrees.

**2. What options exist to end sooner?**

The landlord can agree to an earlier date in writing, for example 10 Nov. The tenant could also find a replacement tenant, but that still needs the landlord's agreement. I have asked the landlord; the tenant's rent runs until the agreed end date.

**3. What do you reply and what do you start?**

I told Tom the valid date is 10 Dec and that we are asking the landlord about 10 Nov. I told him keys come back at checkout and that the deposit (£2,019, mydeposits) is returned after checkout once deductions are agreed or decided by the scheme, within 10 days of agreement. I told the landlord the steps started. I scheduled the landlord chase for 14 Oct and the checkout inspection and key return for 10 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","party":"Ben Hartley, landlord","purpose":"Chase landlord reply on whether he accepts earlier end date 10 Nov; update… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","party":"Tom Achterberg, tenant","purpose":"Checkout inspection and key return for Flat 2, 5 Navarino Road (valid end… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
