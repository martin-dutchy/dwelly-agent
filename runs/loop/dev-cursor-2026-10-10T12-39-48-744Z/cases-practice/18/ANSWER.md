# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice to leave 10 Nov. Under the Renters' Rights Act tenants need two months' written notice, so the earliest end is 10 Dec 2026 unless the landlord agrees in writing to sooner. I replied to Tom, asked Ben for a decision on an earlier date and set a follow-up.

## Where the case stands
Tenant's notice received 10 Oct 2026. Tenant told two months' notice applies; landlord asked whether he agrees in writing to an early end date. Waiting on landlord; follow-up 15 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained notice is not valid as a one-month notice, earliest end 10 Dec 2026, early end only with landlord's written agreement; keys/deposit answered without inventing dates | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Ben whether he agrees in writing to a 10 Nov end date (or another date) | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord decision; chase 15 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. 
> 
> Since 1 May 2026 a tenant needs to give two months' written notice, so one month's notice on its own doesn't end the tenancy on 10 November. Counting from your email today (10 October), the earliest end date would be 10 December 2026. Rent stays payable until the tenancy ends.
> 
> You may be able to leave sooner if your landlord agrees in writing to an earlier date. I'm asking him now whether he will agree to 10 November and will come back to you as soon as I hear, and no later than Friday 16 October. Please don't treat 10 November as agreed until you have that in writing.
> 
> On keys and your deposit: I'll confirm the key return arrangements once the end date is settled. Your deposit is protected with mydeposits and is dealt with after you move out, once the flat has been checked. I can't give you a date or amount yet.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice to leave on 10 Nov. Under current law two months' notice is needed, so the earliest end date is 10 Dec 2026 unless you agree in writing to an earlier date. Do you agree in writing to a 10 Nov end date? (Rent would stop then; re-letting could start sooner.)
> 
> Options: Hold to the legal end date of 10 December 2026 (default if you prefer not to agree); Agree in writing to an earlier end date of 10 November 2026; Agree in writing to another date between 10 Nov and 10 Dec (please state it)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replying does not accept the notice as ending on 10 Nov or agree any early date
- Nothing said about deposit amount or release; that is handled after move-out and any dispute goes through the scheme
- No key-return arrangements were confirmed

## Remaining work
- Landlord decision on early end date (Ben)
- Confirm end date in writing to tenant, then key return and check-out arrangements
- Deposit handling after move-out via mydeposits process (human/accounts)

## Missing or unavailable information
- Landlord's decision on shortening notice
- Key return location/process for the agency

## Conflicts between sources
- Tenant says one month's notice / leave 10 Nov; current law requires two months. Legal position preferred.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No, one month is too short; two months' written notice is needed. Served 10 Oct 2026, earliest end is 10 Dec 2026.

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to a shorter notice/earlier end date (e.g. 10 Nov); the tenant could also find a replacement only if landlord agrees. Otherwise rent is due until 10 Dec.

**3. What do you reply and what do you start?**

Replied to Tom explaining the two-month rule, that sooner needs landlord written agreement, and that keys/deposit will follow once the date is settled. Asked Ben for a decision (APR-102) and scheduled a chase for 15 Oct (FUP-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice to le… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-15","purpose":"Chase landlord Ben Hartley for decision on early end date for Tom Achterberg's notice; then update tenant … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
