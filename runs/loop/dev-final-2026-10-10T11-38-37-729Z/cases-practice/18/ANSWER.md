# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice by email on 10 Oct. Under the Renters' Rights Act that is short; two months applies, so the earliest end is 10 Dec 2026. I replied to Tom and asked Ben whether he will agree an earlier date in writing.

## Where the case stands
Notice received 10 Oct; tenant told earliest end is 10 Dec; landlord asked about agreeing an earlier date; waiting on landlord, review 2026-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant one month is not valid, earliest end 10 Dec 2026, early end needs landlord's written agreement, keys on hold, deposit after check-out | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to an earlier end of 10 Nov | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord decision; chase 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. Since 1 May 2026 tenancies like yours need two months' written notice, so one month isn't enough. Your email is dated 10 October, so the earliest end date is 10 December 2026. Rent stays due as normal until the tenancy ends.
> 
> If you'd like to leave sooner, your landlord can agree to an earlier date in writing. We're asking him today and will tell you his answer. Please don't count on 10 November until you have that in writing.
> 
> Keys and deposit: please hold on to the keys for now. We'll confirm the key return and check-out arrangements once the end date is settled. Your deposit is protected with mydeposits and is dealt with after you've left and the property has been checked. We can't give you a date for that yet.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice, wanting to leave 10 Nov. Under the Renters' Rights Act two months' notice is needed, so the earliest end is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov 2026?
> 
> Options: Keep to 10 Dec 2026 (no agreement needed; we start planning check-out and re-letting); Agree in writing to 10 Nov 2026, or another earlier date you name

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No end date has been agreed; 10 Nov is not accepted
- Nothing promised on deposit amount or return date
- No notice was drafted or served by us

## Remaining work
- Record landlord's decision and tell tenant
- If agreed, get it in writing and arrange check-out, keys, meter readings
- Deposit return via mydeposits after check-out
- Rent stays due to the agreed end date

## Missing or unavailable information
- Landlord's decision on an earlier end date

## Conflicts between sources
- Tenant says one month's notice ending 10 Nov; the CRM shows an assured periodic tenancy (converted 1 May 2026), so two months applies. Trusted the law and CRM.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. Tenants need to give 2 months' written notice. Given 10 Oct 2026, the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to a shorter period (e.g. 10 Nov). The tenant could also find a replacement only if the landlord consents; otherwise rent runs to 10 Dec.

**3. What do you reply and what do you start?**

Replied to Tom (MSG-101) with the correct date, the early-agreement route, keys on hold and deposit after check-out. Asked Ben for a decision (APR-102) and set a chase for 14 Oct (FUP-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notic… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley on early end date decision for Tom Achterberg's notice (P-250); then update tenant","par… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
