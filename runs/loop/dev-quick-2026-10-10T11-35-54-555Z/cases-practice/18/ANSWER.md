# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** n/a

Tom's one-month notice is not valid as given: since 1 May 2026 a tenant must give two months' written notice, so the earliest end date is 10 Dec 2026. I told Tom this and asked landlord Ben Hartley to decide whether to agree in writing to an earlier 10 Nov end; that decision is pending, with review on 17 Oct.

## Where the case stands
Tenant Tom Achterberg (T-1050) gave notice by email on Sat 10 Oct 2026 to leave Flat 2, 5 Navarino Road (P-250) on 10 Nov 2026. Tenancy is assured periodic (converted 1 May 2026). Waiting on landlord Ben Hartley's decision on whether to accept a shorter notice period (request APR-102, review 17 Oct 2026, follow-up FUP-103).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell tenant the earliest lawful end date is 10 Dec 2026, that only the landlord can agree a shorter period in writing, that rent continues, and that deposit and key details will follow. | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord Ben Hartley to decide in writing whether to accept 10 Nov 2026 as the end date, or hold to 10 Dec 2026. | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for the landlord's decision; review on 17 Oct 2026. If no answer, chase by phone and update the tenant. Then confirm the end date, key return and deposit process with Tom. | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email, and congratulations on the new job in Manchester.
> 
> Your tenancy at Flat 2, 5 Navarino Road is now an assured periodic tenancy under the Renters' Rights Act 2025, which has applied since 1 May 2026. Under that Act a tenant must give at least two months' written notice. Your notice was received on 10 October 2026, so the earliest date your tenancy can end is 10 December 2026.
> 
> You asked to leave on 10 November. Only our landlord, Ben Hartley, can agree to a shorter period, and he must do so in writing. I have asked him now and will let you know his answer as soon as I have it. Until then, please keep paying your rent as normal.
> 
> Your deposit of £2,019 is protected with mydeposits. It is normally returned after the check-out inspection, less any deductions that are allowed under the tenancy and the law. I will confirm the details with you before your move-out date.
> 
> I will also confirm where to return the keys once the end date is agreed.
> 
> Kind regards,
> Lettings team, Mare & Co

**A2 · request_landlord_approval → Ben Hartley (Ben) (landlord)** (verified)

> Tenant Tom Achterberg (T-1050, Flat 2, 5 Navarino Road, P-250) has given notice by email on 10 Oct 2026 to leave on 10 Nov 2026. Under the Renters' Rights Act 2025 a tenant needs two months' written notice, so the earliest lawful end date is 10 Dec 2026. Do you agree in writing to end the tenancy earlier, on 10 Nov 2026?
> 
> Options: Recommended: hold the tenancy to the statutory end date of 10 Dec 2026 (two months from 10 Oct), no written agreement to a shorter period; Agree in writing to end the tenancy on 10 Nov 2026 (tenant's requested date), which we would record as a written agreement to the shorter notice

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The notice is not accepted as a 10 Nov end date; this needs the landlord's written agreement.
- No deposit release or deduction has been decided; deposit is only returned after check-out under the scheme rules.
- No key drop-off location was given in the records, so none has been promised.
- No tenancy end date has been changed or recorded as agreed.

## Remaining work
- Landlord (Ben Hartley) to decide on shorter notice (APR-102), review 17 Oct 2026 (FUP-103).
- Agree end date with tenant, arrange key return and check-out inspection, and confirm deposit process with mydeposits before move-out.

## Missing or unavailable information
- Landlord's written decision on a shorter notice period (pending).
- Agency key drop-off arrangements and check-out inspection date.
- Deposit return details from mydeposits, to be confirmed closer to move-out.

## Conflicts between sources
- Tenant asked for end date 10 Nov; the law requires two months, giving 10 Dec. Followed the law; the landlord decides any shorter period.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

Not valid as given for 10 Nov. Under the Renters' Rights Act 2025 (in force 1 May 2026) a tenant must give two months' written notice. Notice received 10 Oct 2026 gives an earliest end date of 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to a shorter notice period (e.g. 10 Nov 2026). A mutual written surrender agreed by the landlord is also possible. Landlord decision requested via APR-102.

**3. What do you reply and what do you start?**

Replied to Tom (A1) explaining the two-month rule, the 10 Dec earliest date, that rent continues, and that deposit and key details will follow. Requested the landlord's decision (A2) and set a review on 17 Oct (A3). No key location promised; no deposit decision made.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley (Ben)","decision_needed":"Tenant Tom Achterberg (T-1050, Flat 2, 5 Navarino Road, P-250) has given notice by email … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-17","purpose":"Check whether landlord Ben Hartley has decided on the 10 Nov early end date (APR-102). If no answer, chase… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
