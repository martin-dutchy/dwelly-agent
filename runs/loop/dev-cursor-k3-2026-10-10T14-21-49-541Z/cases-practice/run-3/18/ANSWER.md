# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice on 10 Oct 2026 to leave 10 Nov. Not valid: two months required, earliest end 10 Dec 2026. Replied to tenant, asked landlord about early date, and started move-out follow-ups.

## Where the case stands
Notice acknowledged; waiting on landlord's answer about early end date (follow-up 14 Oct). Check-out scheduled against 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord whether he agrees in writing to 10 Nov end date | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge notice, state earliest end date 10 Dec, explain keys and deposit | Tom Achterberg, tenant | email | A1 ✅ |
| 3 | WAIT | Chase landlord and update tenant on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |
| 4 | OTHER | Check-out inspection and key return follow-up set for 10 Dec | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. We have your notice dated 10 October 2026.
> 
> Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough. The earliest end date is 10 December 2026, and rent stays payable until then. You can leave sooner only if your landlord agrees in writing. We are asking him now about 10 November and will tell you his answer. Please keep planning on 10 December until you hear from us.
> 
> Keys: please return them to our office on or before your last day. We will confirm the address and a time when we arrange your check-out inspection, which we are starting to plan for the end date. Please don't post them or leave them with a neighbour.
> 
> Deposit: your £2,019 is protected with mydeposits. After check-out we agree any deductions with you. If we can't agree, the scheme's free dispute service decides. Money due back is returned within 10 days of agreement.
> 
> We will update you once the landlord has replied, by Wednesday 14 October at the latest.
> 
> Kind regards
> Mare & Co Lettings

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg at Flat 2, 5 Navarino Road gave notice by email on 10 October 2026, asking to leave on 10 November (new job in Manchester). Under the Renters' Rights Act he needs to give two months' notice, so the earliest valid end date is 10 December 2026. We have told him this.
> 
> Question: do you agree in writing to the earlier date of 10 November 2026? Yes or no please, by Wednesday 14 October. Until you say yes, we are working to 10 December.
> 
> Already started: check-out inspection and key return planned for the end date, and we have explained to Tom how his deposit (£2,019, mydeposits) is returned after check-out. We will also discuss re-letting and any pre-move-out works with you.
> 
> Kind regards
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging notice does not agree any earlier date; only the landlord can agree in writing.
- No deposit release or deductions decided; that follows check-out via mydeposits.

## Remaining work
- Landlord answer on 10 Nov (agency, 14 Oct)
- Book check-out and key return with 24h written notice (agency)
- Deposit return after check-out
- Re-let planning with landlord

## Missing or unavailable information
- Office address/time for key return to be confirmed at check-out booking
- Landlord decision on early end date

## Conflicts between sources
- Tenant says one month's notice; law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

No. Tenancy is assured periodic (since 1 May 2026), so two months' written notice is needed. Notice given 10 Oct 2026, so the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only the landlord agreeing in writing to an earlier date (e.g. 10 Nov), or a negotiated surrender agreed by both. Tenant stays liable for rent to 10 Dec otherwise. Landlord asked.

**3. What do you reply and what do you start?**

Replied to Tom with the valid date, key return and deposit process (mydeposits, ADR, 10 days after agreement). Emailed landlord Ben asking about 10 Nov. Scheduled landlord chase 14 Oct and check-out/key return for 10 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","party":"Ben Hartley, landlord","purpose":"Chase landlord answer on whether he accepts early end date 10 Nov; then up… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `schedule_follow_up` | {"due_on":"2026-12-10","party":"Tom Achterberg, tenant","purpose":"Check-out inspection and key return for Flat 2, 5 Navarino Road (valid en… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
