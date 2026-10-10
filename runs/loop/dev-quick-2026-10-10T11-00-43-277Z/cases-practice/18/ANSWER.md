# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom Achterberg's email of 10 Oct 2026 gives one month's notice for 10 Nov 2026. Under the Renters' Rights Act 2025 a tenant needs two months' written notice, so the earliest valid end date is 10 Dec 2026, unless the landlord agrees in writing to a shorter period. The tenant has been told this, and the 10 Nov request is with landlord Ben Hartley for decision by 16 Oct 2026, with a follow-up set.

## Where the case stands
Tenant notice received by email 10 Oct 2026 for move-out 10 Nov 2026. Tenant told the valid earliest end date is 10 Dec 2026. Landlord decision on early end requested (APR-102). No maintenance ticket exists for P-250, so the hold could not be placed; a dated follow-up (FUP-103) for 16 Oct 2026 is set instead.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the earliest valid end date is 10 Dec 2026 and that the 10 Nov request has gone to the landlord; advised not to plan the move until confirmed | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord Ben Hartley to decide whether to agree in writing to an early end on 10 Nov 2026, or keep 10 Dec 2026 (decision by 16 Oct 2026) | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord for decision on 16 Oct 2026 if no reply; then confirm key return and deposit steps with tenant | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email, and congratulations on the new job in Manchester.
> 
> Your notice has been received. Since 1 May 2026, a tenant on a periodic tenancy needs to give at least two months' written notice. Based on today's date (10 October 2026), the earliest date your tenancy can end under your notice is 10 December 2026. Rent remains payable until the tenancy ends.
> 
> If you would like to leave on 10 November, you would need your landlord to agree to the shorter notice in writing. I have passed your request to your landlord, Ben Hartley, and will let you know his answer as soon as we have it. Please don't arrange your move on 10 November until you have heard from us.
> 
> Keys: we will confirm the return arrangements with you once the end date is agreed.
> 
> Deposit: your deposit of £2,019 is held in the mydeposits scheme. It is normally returned after the tenancy ends, once the check-out inspection is done and any deductions are agreed. We will confirm the details with you nearer the time.
> 
> Kind regards,
> Lettings team
> Mare & Co

**A2 · request_landlord_approval → Ben Hartley (L-01) (landlord)** (verified)

> Tenant Tom Achterberg (T-1050), Flat 2, 5 Navarino Road (P-250), has given one month's notice on 10 Oct 2026 for a move-out on 10 Nov 2026. Under the Renters' Rights Act 2025 the earliest valid end date on two months' notice is 10 Dec 2026. Decide whether you agree in writing to end the tenancy early on 10 Nov 2026 (shorter notice).
> 
> Options: Recommended: decline early end; tenancy ends 10 Dec 2026 on valid two months' notice; Agree in writing to end on 10 Nov 2026 (shorter notice, landlord consent); Agree to a different end date in writing (please state it)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the tenant reply does not agree any end date; only the landlord can agree a shorter notice period in writing.
- The deposit is not released or assessed by this step; it is handled at check-out under the mydeposits scheme.
- No key return location was confirmed in the records, so none was promised.
- The landlord request and tenant reply do not confirm the end date.

## Remaining work
- Ben Hartley to decide on early end by 16 Oct 2026 (owner: landlord; chase via FUP-103).
- Once end date is set: confirm key return arrangements, check-out and deposit steps with tenant (owner: agency).

## Missing or unavailable information
- Landlord decision on shorter notice (APR-102).
- Agency key drop-off location and check-out process not in records.

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

Not valid as given for 10 Nov. One month is shorter than the two months required of a tenant under the Renters' Rights Act 2025 (in force 1 May 2026). Served 10 Oct 2026, the earliest valid end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to a shorter notice period or a different end date (e.g. 10 Nov 2026). The tenant cannot shorten it unilaterally. The request is with the landlord (APR-102). Otherwise the tenancy runs to 10 Dec 2026.

**3. What do you reply and what do you start?**

Replied to the tenant (MSG-101) with the 10 Dec 2026 earliest valid end date, that the 10 Nov request is with the landlord, and that key and deposit details follow once the end date is set. Started a landlord decision request (APR-102, deadline 16 Oct 2026) and a dated follow-up (FUP-103). No maintenance ticket exists for P-250, so no ticket hold could be placed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley (L-01)","decision_needed":"Tenant Tom Achterberg (T-1050), Flat 2, 5 Navarino Road (P-250), has given one month's n… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `put_on_hold` | {"ticket_ref":"P-250","reason":"Waiting for Landlord","comment":"Tenant Tom Achterberg gave notice 10 Oct 2026 for 10 Nov 2026. Valid earlie… | 1 | ❌ failed | Ticket P-250 not found on read-back |
| A4 | `schedule_follow_up` | {"due_on":"2026-10-16","purpose":"Chase Ben Hartley (APR-102) for decision on early end of Tom Achterberg's tenancy (P-250, Flat 2, 5 Navari… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- A3: put_on_hold on P-250 failed: no maintenance ticket with that reference exists (a property id, not a ticket). Not retried, as no ticket exists to hold. Replaced with a dated follow-up (FUP-103) for 16 Oct 2026.
