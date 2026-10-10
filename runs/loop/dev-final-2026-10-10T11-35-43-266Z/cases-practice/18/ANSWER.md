# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice for 10 Nov; the Renters' Rights Act requires two months, so the earliest end is 10 Dec 2026 unless the landlord agrees in writing to shorter. I replied to the tenant, asked the landlord about an earlier date, and set a follow-up.

## Where the case stands
Tenant told notice is short; landlord asked whether he'll agree to an earlier end date; waiting on landlord, follow-up 2026-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant notice is invalid at one month, earliest end 10 Dec 2026, keys not yet, deposit via mydeposits after check-out | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord whether he agrees in writing to an earlier end date (10 Nov) | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord decision; chase 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job.
> 
> Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough. Counting from your email today (10 October), the earliest your tenancy can end is 10 December 2026. Rent stays payable until then.
> 
> You can leave earlier only if your landlord agrees in writing to a shorter notice period. I'm asking him now and will tell you his answer. Nothing is agreed yet, so please don't plan around 10 November.
> 
> Keys: please don't drop them anywhere yet. We'll confirm the handover and a check-out appointment once your end date is settled.
> 
> Deposit: it's protected with mydeposits. Once you've moved out and handed the keys back, we'll do a check-out and any deductions or return will be dealt with through the scheme. I can't give a return date yet.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice to leave on 10 Nov (new job in Manchester). Under the Renters' Rights Act two months is required, so the earliest valid end date is 10 Dec 2026. Would you agree in writing to an earlier end date of 10 Nov 2026? Either way, tell us if you'd like us to start marketing the flat.
> 
> Options: Keep the legal end date of 10 December 2026 (default); Agree in writing to an earlier end date of 10 November 2026; Agree another date in between

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing agreed on an earlier date; tenancy continues and rent is due to the end date
- No deposit return date promised; deductions decided after check-out
- Does not decide whether the landlord should accept early surrender

## Remaining work
- Landlord decision on shorter notice (agency, chase 14 Oct)
- Confirm end date in writing, arrange check-out, key handover, deposit process via mydeposits
- Send tenant 24h written notice for any viewings/inspections

## Missing or unavailable information
- Landlord's decision on earlier end date
- Key handover location/process not in records

## Conflicts between sources
- Tenant says 10 Nov end; law gives 10 Dec at the earliest

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

No: one month is too short. Two months' written notice is required; given by email on 10 Oct 2026, earliest end is 10 Dec 2026.

**2. What options exist to end sooner?**

Only the landlord's written agreement to a shorter period or a mutual surrender; the tenant can't force it. Finding a replacement tenant doesn't by itself end it earlier.

**3. What do you reply and what do you start?**

Replied explaining the two-month rule, the 10 Dec date, no keys yet, deposit via mydeposits after check-out with no date promised. Started landlord approval request for an early end date, a follow-up for 14 Oct and a property note.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice to le… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on early-end-date decision for Tom Achterberg's notice (P-250); then confirm en… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"P-250","note":"10 Oct 2026: tenant T-1050 gave notice by email stating 10 Nov. Only 1 month, invalid under RRA; earliest end 10 D… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
