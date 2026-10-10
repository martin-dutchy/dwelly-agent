# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice by email; under the Renters' Rights Act two months are required, so the earliest end is 10 Dec 2026. I replied to the tenant, asked the landlord about accepting 10 Nov, and scheduled the move-out follow-ups.

## Where the case stands
Notice acknowledged; earliest valid end 10 Dec 2026. Waiting on landlord's answer on earlier 10 Nov date (review 14 Oct). Checkout/key return follow-up set for 1 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged notice, stated earliest end 10 Dec, explained keys, checkout and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord whether he agrees in writing to an earlier 10 Nov end; told him move-out steps started | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 14 Oct if no answer | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | WAIT | Arrange checkout inspection and key return by 1 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. We've received your notice today (10 October).
> 
> Under the current rules, a tenant needs to give two months' written notice, so one month isn't enough on its own. The earliest your tenancy can end is 10 December 2026. Rent stays due up to then. If you'd like to leave on 10 November, we've asked your landlord whether he'll agree to that in writing. It's his decision, so please keep to 10 December unless we confirm otherwise in writing.
> 
> Keys: please don't post them or leave them anywhere. We'll arrange a checkout inspection close to your end date and you hand the keys back then. We'll email you the time and place, and will contact you again by 1 December at the latest.
> 
> Deposit: your £2,019 is protected with mydeposits. After checkout we compare the flat with the start of the tenancy. Any deductions are agreed with you, or decided by the scheme's free dispute service if we can't agree. Money is returned within 10 days of agreement.
> 
> Please send us your forwarding address when you have it.
> 
> Kind regards
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave notice by email today (10 Oct), saying he wants to leave on 10 November for a job in Manchester. Under the Renters' Rights Act a tenant must give two months' notice, so the earliest valid end date is 10 December 2026. We've told him this.
> 
> Question: do you agree in writing to him leaving earlier, on 10 November? Please reply yes or no by Wednesday 14 October. Without your agreement we'll stay with 10 December.
> 
> We've started the move-out: checkout inspection and key return will be arranged for around the end date, and the deposit (£2,019, mydeposits) is handled through the scheme after checkout. We'll update you with dates.
> 
> Kind regards
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree an earlier end date; only the landlord can, in writing.
- No checkout appointment is booked yet and no deposit deductions are decided.

## Remaining work
- Landlord reply on 10 Nov (agency, chase 14 Oct)
- Book checkout and key return (agency, by 1 Dec)
- Deposit return via mydeposits after checkout

## Missing or unavailable information
- Key return location/process not on file, so tenant told details will follow
- Tenant forwarding address

## Conflicts between sources
- Tenant said one month's notice; law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. One month is too short; two months' written notice is required. Earliest end is 10 December 2026 (notice received 10 Oct).

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to an earlier date (e.g. 10 Nov). Asked Ben; the tenant has been told to keep to 10 Dec unless confirmed in writing.

**3. What do you reply and what do you start?**

Replied acknowledging notice, giving 10 Dec, explaining keys are returned at a checkout we arrange, and deposit return via mydeposits after checkout. Started the move-out: landlord question and follow-ups for checkout/key return (1 Dec) and landlord chase (14 Oct).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley for answer on whether he accepts earlier end date of 10 Nov for T-1050 Flat 2, 5 Navarin… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-01","purpose":"Arrange checkout inspection and key return for Flat 2, 5 Navarino Road before end of tenancy (10 Dec 2026 … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
