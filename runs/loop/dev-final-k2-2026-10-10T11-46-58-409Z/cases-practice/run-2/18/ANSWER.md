# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant gave one month's notice by email on 10 Oct for 10 Nov. Under the Renters' Rights Act it is invalid as given; two months applies, earliest end 10 Dec 2026. Replied to tenant and asked landlord whether he will agree in writing to an earlier date.

## Where the case stands
Tenant told notice is short; landlord asked about agreeing an earlier end date; waiting on landlord, review 2026-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained two months' notice applies, earliest end 10 Dec 2026, early end only with landlord's written agreement; keys held for now; deposit via mydeposits after check-out | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Ben whether he agrees in writing to an earlier end date (10 Nov) | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord decision, review 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job.
> 
> Since 1 May 2026 tenants need to give two months' written notice, so one month's notice isn't enough to end the tenancy on 10 November. Counting from your email today (10 October), the earliest end date is 10 December 2026. Rent stays payable up to the day the tenancy ends.
> 
> If you need to leave sooner, your landlord can agree to an earlier end date, but only in writing. I'm asking them now and will tell you their answer. I can't promise they'll agree. Please don't treat 10 November as agreed until you've heard from us in writing.
> 
> Keys: please hold on to them for now. We'll confirm the handover details and a check-out appointment once the end date is settled.
> 
> Deposit: it's protected with mydeposits. Once the tenancy has ended and keys are back, we'll check the property against the check-in record and deal with the deposit through the scheme. I can't give an exact date yet, as it depends on the end date and the check-out.
> 
> You'll hear from us again by Wednesday 14 October.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct to leave 10 Nov. Valid notice is two months, so the earliest end date is 10 Dec 2026. Would you agree in writing to an earlier end date of 10 Nov 2026?
> 
> Options: Hold to the legal date: tenancy ends 10 Dec 2026 (recommended unless you want an early re-let); Agree in writing to end on 10 Nov 2026 (surrender by agreement); Agree to another date between 10 Nov and 10 Dec; Start marketing the flat now for a re-let from 10 Dec

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not end the tenancy or agree any date
- Nothing promised about deposit return date or amount
- No key handover location given as none is on file

## Remaining work
- Landlord decision on early end date (agency, review 14 Oct)
- If agreed, written confirmation to tenant, then check-out, keys and deposit via mydeposits
- Re-let marketing if landlord wishes

## Missing or unavailable information
- Landlord's decision
- Key handover arrangements

## Conflicts between sources
- Tenant says one month's notice / 10 Nov; current law requires two months. Law trusted.

## Answers to the case questions
**1. Is the notice valid as given? Earliest end date?**

No. Tenants must give two months' notice; earliest end date is 10 December 2026 (counting from 10 Oct).

**2. What options exist to end sooner?**

Landlord agrees in writing to a shorter notice/surrender by agreement (e.g. 10 Nov); or a mutually agreed date, possibly helped by an early re-let. Tenant cannot unilaterally shorten it.

**3. What do you reply and what do you start?**

Replied explaining two months, 10 Dec, early end only if landlord agrees in writing, keep keys for now, deposit handled via mydeposits after check-out. Started landlord approval request APR-102 and follow-up FUP-103 for 14 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct to leave 10 N… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on early end date decision for Tom Achterberg; update tenant","party":"Ben Hart… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
