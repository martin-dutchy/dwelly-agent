# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice by email on 10 Oct for 10 Nov. Under the Renters' Rights Act two months are needed, so the earliest end is 10 Dec 2026 unless the landlord agrees in writing to earlier. Tenant replied to, landlord asked, move-out follow-ups scheduled.

## Where the case stands
Notice acknowledged; valid end date 10 Dec 2026. Landlord asked (by 17 Oct) whether he accepts 10 Nov. Move-out started; check-out follow-up set.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether he agrees in writing to an earlier 10 Nov end date, reply by 17 Oct | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge notice, state 10 Dec earliest date, explain keys, check-out and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 3 | WAIT | Arrange check-out and key return 26 Nov; chase landlord 17 Oct | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and good luck with the new job. We've received your notice today (10 October 2026).
> 
> Since the Renters' Rights Act came in on 1 May, tenants need to give two months' written notice, so one month isn't enough. The earliest your tenancy can end is 10 December 2026. Rent stays payable up to that date.
> 
> If you'd like to leave on 10 November, that only works if your landlord agrees in writing. We're asking him now and will tell you his answer. Please don't assume an earlier date until you hear from us.
> 
> We're starting your move-out now:
> - Keys: please hand them back to us (not to the landlord or a neighbour) on or before your final day. We'll confirm exactly where and when once the end date is settled.
> - Check-out: we'll contact you to arrange a check-out inspection around your final day, with at least 24 hours' notice.
> - Deposit: your £2,019 deposit is held in the mydeposits scheme. After check-out we agree any deductions with you. If we can't agree, the scheme's free dispute service decides. Undisputed money is returned within 10 days of agreement.
> 
> We'll be in touch again by 17 October with the landlord's answer.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) gave notice today wanting to leave 10 Nov. Do you agree in writing to that earlier end date?
> 
> Options: Decline: tenancy ends on the valid date, 10 December 2026 (recommended unless you have a new tenant lined up); Agree in writing to an end date of 10 November 2026 (rent then stops from that date)
> 
> Update: Valid notice is two months, so the earliest end date is 10 Dec 2026. We have started move-out against that date without waiting: check-out inspection and key return to be arranged, and the tenant told how the deposit (mydeposits, £2,019) is returned after check-out. Please reply by 17 Oct 2026.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any earlier end date; only the landlord's written agreement can.
- Does not decide deposit deductions or release the deposit.

## Remaining work
- Landlord answer on 10 Nov (due 17 Oct; follow-up FUP-104)
- Confirm key return location/time and book check-out with 24h notice (FUP-103, 26 Nov)
- Deposit return via mydeposits after check-out

## Missing or unavailable information
- Exact key drop-off location/time not in records; to be confirmed with tenant
- Landlord's decision on earlier date

## Conflicts between sources
- Tenant says one month's notice; the law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? Earliest end date?**

Not as given: one month is too short. Two months' written notice is required, so the earliest end date is 10 December 2026 (notice received 10 Oct 2026).

**2. What options exist to end sooner?**

Only the landlord's written agreement to an earlier date (e.g. 10 Nov), which we've asked for. Otherwise the tenant could find a replacement tenant only if the landlord agrees; rent is due until the valid end date.

**3. What do you reply and what do you start?**

Replied same day with the valid end date, keys, check-out and deposit process (mydeposits, ADR if disputed, returned within 10 days of agreement). Asked the landlord about the earlier date, scheduled landlord chase (17 Oct) and check-out/key-return arrangement (26 Nov).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) gave notice today wanting to leave 10 Nov. Do you agre… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-11-26","purpose":"Arrange check-out inspection and key return with Tom Achterberg for end of tenancy 10 Dec 2026 (or earlier… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-10-17","purpose":"Chase landlord for answer on earlier end date (10 Nov) and update tenant.","party":"Ben Hartley"} | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
