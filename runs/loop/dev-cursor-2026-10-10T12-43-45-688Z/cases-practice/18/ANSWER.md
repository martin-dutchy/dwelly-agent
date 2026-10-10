# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice, which is too short under the Renters' Rights Act. I told him the earliest end date is 10 Dec 2026 and asked the landlord whether he will agree in writing to an earlier date. I added a note on the property and set a follow-up for 14 Oct.

## Where the case stands
Tenant told notice is two months, earliest end 10 Dec 2026. Waiting on landlord Ben Hartley to decide on written agreement to an earlier end; follow-up 14 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben whether he agrees in writing to an earlier end date (10 Nov or other) | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Explain two-month notice, earliest 10 Dec, early end only with landlord's written agreement; keys and deposit steps to follow | Tom Achterberg, tenant | email | A1 ✅ |
| 3 | WAIT | Wait for landlord decision; review 14 Oct | Ben Hartley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and good luck with the new job.
> 
> Since 1 May 2026 a tenant needs to give two months' written notice, so one month isn't enough. Your email of 10 October means the earliest your tenancy can end is 10 December 2026, and you remain responsible for rent until then.
> 
> You can leave sooner only if your landlord agrees in writing. I'm asking him now whether he'd agree to 10 November, or another date. I can't promise he will, and until he does, 10 December stands. Please don't hand back keys or treat 10 November as agreed yet.
> 
> Keys: we'll confirm where and when to return them once the end date is settled. Please keep them until then.
> 
> Deposit: your £2,019 is held in the mydeposits scheme. It's returned after the tenancy ends and we've done a check-out and agreed any deductions. I can't give a date yet, but we'll explain the steps once your end date is confirmed.
> 
> You'll hear from us again by Wednesday 14 October.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave 10 Nov. Valid notice is two months, so the earliest end date is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov?
> 
> Options: Keep to 10 Dec 2026 (no agreement needed; we start marketing and arrange check-out) - recommended default; Agree in writing to end on 10 Nov 2026 (rent due to that date only); Agree to another date of your choosing, e.g. if a replacement tenant is found sooner

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Telling the tenant the earliest date does not agree any earlier end date
- No key-return arrangement or deposit date has been promised
- Deposit release is not decided; it follows check-out and agreed deductions

## Remaining work
- Landlord decision on early end (owner: agency, chase 14 Oct)
- Confirm end date in writing to tenant, then arrange check-out, key return, deposit return via mydeposits
- Landlord to decide on marketing the flat / replacement tenant

## Missing or unavailable information
- Landlord's decision on early surrender
- Whether the tenant's 10 Nov date is flexible if landlord declines

## Conflicts between sources
- Tenant says one month's notice; the law requires two months, so the legal rule was applied.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. One month is too short; two months' written notice is needed. Notice was given 10 Oct 2026, so the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

The landlord agrees in writing to a shorter notice period or a surrender by agreement, for example 10 Nov, or a date when a replacement tenant is found. It is the landlord's decision and the tenant has no right to it.

**3. What do you reply and what do you start?**

I replied to the tenant explaining the two-month rule, that 10 Dec stands unless the landlord agrees otherwise, and that keys and deposit details will follow once the end date is confirmed. I asked the landlord for a decision, added a record note and scheduled a follow-up for 14 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave notice on 10 Oct 2026 asking to leave 10 N… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `add_note` | {"entity":"P-250","note":"10 Oct 2026: Tenant T-1050 gave one month's notice by email (move out 10 Nov). Invalid as short; two months applie… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on early end date decision; update tenant Tom Achterberg; plan check-out, key r… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
