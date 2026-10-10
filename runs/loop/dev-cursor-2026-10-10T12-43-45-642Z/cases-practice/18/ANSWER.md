# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice by email on 10 Oct for 10 Nov. Under the Renters' Rights Act that is too short; earliest end is 10 Dec 2026 unless the landlord agrees in writing to earlier. Replied to tenant and asked the landlord for a decision, with follow-up set.

## Where the case stands
Tenant told the notice is short; landlord asked whether he agrees to an earlier end date; waiting on landlord, follow-up 2026-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained two months' notice is needed, earliest end 10 Dec 2026, early end only with landlord's written agreement; answered keys/deposit generally | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben to agree in writing to an earlier end (10 Nov) or keep 10 Dec | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord on 14 Oct; then update tenant | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom, thanks for letting us know, and good luck with the new job. Since the law changed on 1 May 2026, tenants need to give two months' written notice, so one month isn't enough. Counting from your email today (10 October), the earliest your tenancy can end is 10 December 2026. Your rent stays payable until then. A shorter date is only possible if your landlord agrees to it in writing. We're asking him now and will let you know his answer by Friday 16 October. Please don't treat 10 November as agreed until you have that in writing. On keys and deposit: we'll confirm the key drop-off arrangements and a check-out appointment nearer the end date. Your deposit is held with mydeposits and is returned after check-out, once any deductions are agreed. We can't give an exact date yet. Thanks, Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct giving one month's notice to leave on 10 Nov (new job in Manchester). Under the Renters' Rights Act, two months' notice is required, so the earliest end date is 10 Dec 2026 unless you agree in writing to an earlier date. Do you agree to end the tenancy on 10 November 2026 (rent paid to that date)?
> 
> Options: Keep to 10 December 2026 (the legal minimum). This is our default; Agree in writing to end on 10 November 2026; Agree to another date between 10 Nov and 10 Dec (please state it)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not agree any end date; early end needs the landlord's written agreement
- Nothing said about deposit amount or deductions; no check-out booked
- Key drop-off location not stated as not on file

## Remaining work
- Landlord decision on early end (agency, chase 14 Oct)
- Confirm outcome in writing to tenant
- Arrange check-out, key return, deposit release via mydeposits after check-out
- Advertise/relet planning once end date fixed

## Missing or unavailable information
- Landlord's decision
- Key return arrangements/location

## Conflicts between sources
- Tenant's one-month notice conflicts with the two-month legal requirement; the law was followed.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No: a tenant must give two months' written notice for an assured periodic tenancy. One month's notice does not end it on 10 Nov. Earliest end is 10 Dec 2026 (two months from 10 Oct).

**2. What options exist to end sooner?**

Landlord agrees in writing to a shorter notice/earlier date (a surrender by agreement). The tenant has no right to leave earlier, and could be liable for rent to 10 Dec if the landlord doesn't agree. Re-letting sooner doesn't by itself end his liability without landlord agreement.

**3. What do you reply and what do you start?**

Replied warmly explaining two months' notice, earliest end 10 Dec, early end only with landlord's written agreement, and that keys and deposit details follow nearer the end. Started a landlord decision request (APR-102) and a follow-up on 14 Oct (FUP-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct giving one month's notice to leave o… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley on early-end decision for Flat 2, 5 Navarino Road (Tom Achterberg notice); then tell ten… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
