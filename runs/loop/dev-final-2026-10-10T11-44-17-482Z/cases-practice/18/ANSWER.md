# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom emailed one month's notice to leave 10 Nov. This is not valid under the Renters' Rights Act, which requires two months, so the earliest end is 10 Dec 2026. I replied to Tom and asked Ben whether he will agree in writing to an earlier date.

## Where the case stands
Tenant told notice is two months (earliest 10 Dec 2026). Landlord asked on 10 Oct whether he will agree in writing to an earlier date. Waiting on the landlord, review 14 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained notice needs two months, earliest end 10 Dec, shorter only with landlord's written agreement; keys and deposit answered without promising dates | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to an earlier end date (10 Nov or other) | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord decision; chase and update tenant on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. Under the current rules a tenant needs to give two months' written notice, so one month isn't enough to end the tenancy on 10 November. Your notice dated 10 October would run to 10 December 2026, and rent stays payable until then.
> 
> A shorter date is only possible if your landlord agrees in writing. We're asking him now and will email you by Wednesday 14 October with his answer. Please don't treat 10 November as agreed until you have that in writing. If you'd like to suggest an alternative date, or have someone who could take over the flat, tell us.
> 
> Keys: please don't drop them anywhere yet. We'll confirm the handover date, place and a check-out appointment once your end date is settled.
> 
> Deposit: it's protected with mydeposits. After you move out and we've checked the flat, we'll let you know about any proposed deductions and return the rest. We can't give a date until the end date is fixed.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct 2026 to leave on 10 Nov. This is not valid under the Renters' Rights Act (two months needed), so the earliest date is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov 2026? Rent would stop then and we would start re-letting and check-out arrangements.
> 
> Options: Hold to 10 December 2026 (the legal minimum) - recommended if you want rent cover; Agree in writing to 10 November 2026; Agree another date between 10 Nov and 10 Dec

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing agreed on an earlier end date; no end date is recorded as changed
- No promise on deposit return date or amount
- Did not arrange check-out, key handover or re-letting yet

## Remaining work
- Ben's decision on an earlier date (owner: landlord, chase 14 Oct)
- Confirm end date in writing to tenant, then arrange check-out, key return, and deposit return via mydeposits
- Start re-letting once the end date is settled

## Missing or unavailable information
- Landlord's decision on shortening the notice

## Conflicts between sources
- Tenant says one month's notice; the law requires two months. Followed the law.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. One month is too short; tenants need to give two months' written notice. Given 10 Oct 2026, the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord (Ben Hartley) agrees in writing to a shorter notice or a surrender by agreement, for example 10 Nov. A replacement tenant could help persuade him, but it is his decision. The tenant cannot unilaterally shorten it.

**3. What do you reply and what do you start?**

Replied to Tom (MSG-101) with the two-month rule, 10 Dec earliest, no keys drop yet, deposit protected with mydeposits and returned after move-out and check, with no date promised. Started a landlord approval request (APR-102) for an earlier end date and a follow-up for 14 Oct (FUP-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct 2026 to leave on 10 … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley for decision on earlier end date for T-1050; then update tenant","party":"Ben Hartley"} | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
