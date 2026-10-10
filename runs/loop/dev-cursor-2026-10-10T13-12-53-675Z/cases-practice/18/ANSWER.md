# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice for 10 Nov, which is not valid under the Renters' Rights Act. Two months is required, so the earliest end is 10 Dec 2026. I told Tom, and asked Ben whether he will agree in writing to an earlier date.

## Where the case stands
Tenant told notice is short; landlord asked whether he will agree a shorter end date; waiting on Ben Hartley, review 14 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained two months' notice is needed, earliest end 10 Dec 2026, early end only with landlord's written agreement; keys and deposit answered | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to a 10 Nov end, reply by 13 Oct | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Follow up with landlord and update tenant on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom, thanks for letting us know, and congratulations on the new job. Since 1 May 2026 the notice a tenant needs to give is two months, so one month's notice unfortunately doesn't end the tenancy on 10 November. Counting from today (10 October), the earliest end date is 10 December 2026, and rent stays payable until then. You can finish sooner only if your landlord agrees in writing. I'm asking him now whether he will accept 10 November, and I'll update you by Wednesday 14 October. Please don't treat 10 November as agreed until you have that in writing. Keys: please don't send or drop them yet. We'll confirm the handover place and time once the end date is settled. Deposit: it's protected with mydeposits. After the tenancy ends and the flat is checked, we'll agree any deductions with you and the landlord, and return the rest; we can't give a date until the end date is settled. If you'd rather confirm the 10 December end date, just reply and say so.

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct 2026 to leave on 10 Nov. That is not valid; two months is required, so the tenancy ends 10 Dec 2026 at the earliest. Do you agree in writing to a shorter end date of 10 Nov? Please reply by Tuesday 13 October.
> 
> Options: Keep the legal end date of 10 December 2026 (recommended unless you have a new tenant ready); Agree in writing to end on 10 November 2026 (rent stops then; you may lose a month's rent if not re-let); Agree to another date in between

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing agreed on an early end date; the tenancy has not ended
- No deposit release or key handover arranged
- No view given on deductions or rent owed

## Remaining work
- Landlord decision on early end date (Ben)
- If agreed, get it in writing, set the end date, arrange keys, check-out and deposit return via mydeposits
- Otherwise tenancy ends 10 Dec at the earliest

## Missing or unavailable information
- Landlord's decision on shorter notice

## Conflicts between sources
- Tenant says one month's notice; the law requires two months. I followed the law.

## Answers to the case questions
**1. Is the notice valid as given? Earliest end date?**

No. A tenant must give two months' written notice. Given 10 Oct 2026, the earliest end is 10 Dec 2026.

**2. Options to end sooner?**

Only with the landlord's written agreement to a shorter notice or a mutually agreed surrender. Possibly the landlord re-letting the flat sooner, but the tenant stays liable for rent until the end date.

**3. What do you reply and what do you start?**

Replied to Tom with the correct position, held keys and deposit until the end date is settled, and promised an update by 14 Oct. Asked Ben for a decision by 13 Oct and set a follow-up for 14 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct 2026 to leave… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley for decision on early end date for T-1050; update tenant either way","party":"Ben Hartle… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
