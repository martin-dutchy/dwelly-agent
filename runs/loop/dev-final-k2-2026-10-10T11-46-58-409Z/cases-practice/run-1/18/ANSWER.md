# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice to leave on 10 Nov. Under the Renters' Rights Act it is not valid as a one-month notice: the earliest end is 10 Dec 2026. I told Tom, and asked landlord Ben whether he will agree in writing to 10 Nov. A follow-up is set for 14 Oct.

## Where the case stands
Tenant notice received 10 Oct. Tenant told the legal end date is 10 Dec 2026 at the earliest. Landlord asked whether he agrees in writing to 10 Nov. Waiting on the landlord; review 14 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told the tenant that two months' notice is needed (earliest end 10 Dec 2026), that an earlier date needs the landlord's written agreement, how the deposit and keys will be handled, and that he will hear from us by 14 Oct | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to an earlier end date of 10 Nov | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Follow up on 14 Oct for the landlord's answer and update the tenant | Ben Hartley / Tom Achterberg | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job.
> 
> Since 1 May 2026 the notice a tenant needs to give is two months in writing, not one. Your email of 10 October therefore ends the tenancy on 10 December 2026 at the earliest, not 10 November. Rent stays due until the tenancy ends.
> 
> A earlier date is only possible if your landlord agrees in writing. We are asking him now whether he will accept 10 November, and we can't promise the answer. Please don't treat 10 November as agreed until we confirm it in writing. We'll update you by Wednesday 14 October.
> 
> Deposit: it is held in the mydeposits scheme. It is dealt with after the tenancy ends and the property has been checked, and any deductions would be shown to you first. We can't give a return date yet.
> 
> Keys: please keep them until we confirm the handover arrangements nearer your move-out date. We'll send those details then.
> 
> Kind regards
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Your tenant Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct giving one month's notice to leave on 10 November. Under the Renters' Rights Act, tenants must give two months, so the notice runs to 10 December 2026 at the earliest. Do you agree in writing to him leaving earlier, on 10 November 2026?
> 
> Options: Keep to the legal date: tenancy ends 10 December 2026 (recommended unless you want an early re-let); Agree in writing to an earlier end date of 10 November 2026; Agree to another date of your choice (please state it)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not agree any early end date; only the landlord can do that, in writing.
- Nothing was said about deposit amounts or deductions; the deposit is not released and no key handover date is set.
- No re-let, marketing or check-out has been booked.

## Remaining work
- Landlord decision on early surrender (agency, chase 14 Oct)
- Confirm the final end date to the tenant in writing
- Arrange key handover and check-out inspection near the end date
- Deposit return via mydeposits after the tenancy ends and the check-out, with any deductions agreed or going to the scheme's dispute process

## Missing or unavailable information
- Landlord's decision on an earlier end date
- Key return address or process (not in the records)

## Conflicts between sources
- Tenant says one month's notice to 10 Nov, but current law requires two months. I followed the law.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

Not as a one-month notice. Tenants must give two months' written notice, so notice given on 10 Oct 2026 ends the tenancy on 10 Dec 2026 at the earliest.

**2. What options exist to end sooner?**

The landlord agrees in writing to a shorter notice period, for example 10 Nov, as a surrender agreed in writing. Otherwise the tenant stays liable for rent to 10 Dec. If a replacement tenant is found, the landlord may be more willing to agree.

**3. What do you reply and what do you start?**

Replied to the tenant with the correct notice period and the 10 Dec date, said an earlier date needs the landlord's written agreement, explained the deposit and keys, and gave a date for our next update. Asked the landlord about an early end, and set a follow-up for 14 Oct. No escalation is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Your tenant Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct giving one month's notic… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley on whether he agrees to early end date 10 Nov; update tenant Tom Achterberg either way. … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
