# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice by email, which is short of the two months required since 1 May 2026. I told him the earliest end is about 10 Dec 2026, asked the landlord whether he will agree in writing to 10 Nov, and set a follow-up.

## Where the case stands
Notice received 10 Oct; tenant told two months applies. Waiting on landlord Ben Hartley about agreeing an earlier end date; review 2026-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told Tom one month is not valid, earliest end about 10 Dec 2026, early end needs landlord's written agreement, keys and deposit next steps | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben whether he agrees in writing to end on 10 Nov | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Follow-up on landlord decision 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for letting us know, and congratulations on the new job. Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough. Counting from your email of 10 October, the earliest your tenancy would end is around 10 December 2026. We'll confirm the exact date in writing. Rent stays payable until then.
> 
> You can leave sooner only if your landlord agrees in writing. I'm asking him now whether he will agree to 10 November. I can't promise that, so please don't plan on it yet. I'll update you as soon as I hear back.
> 
> Keys: please hold on to them for now. We'll confirm where and when to hand them back once the end date is settled, along with the check-out arrangements.
> 
> Deposit: it's protected in a deposit scheme. After the tenancy ends and the keys are back, we'll do a check-out and agree any deductions with you, then arrange the return. I can't give a date yet.
> 
> Kind regards,
> Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice, to leave 10 Nov (new job in Manchester). Under the Renters' Rights Act he must give two months, so the earliest end is about 10 Dec 2026 and rent is due until then. Do you agree in writing to an earlier end date of 10 Nov 2026?
> 
> Options: Keep to two months' notice: tenancy ends about 10 Dec 2026 (default); Agree in writing to end on 10 Nov 2026; Agree a different earlier date (please state it)

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not accept the notice as a shorter one or agree any early end date
- No promise on deposit return date or key handover
- Exact end date still to be confirmed in writing

## Remaining work
- Landlord decision on early surrender (agency, 14 Oct)
- Confirm end date in writing to tenant
- Arrange check-out, key return, deposit return via mydeposits
- Re-let or marketing plan if landlord wishes

## Missing or unavailable information
- Landlord's decision on an earlier end date
- Whether email counts as valid service of notice; exact end date to be confirmed

## Conflicts between sources
- Tenant says one month's notice; current law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. Tenants must give two months' written notice. From 10 Oct 2026 the earliest end is about 10 Dec 2026 (exact date to be confirmed).

**2. What options exist to end sooner?**

Only with the landlord's written agreement (surrender by agreement), e.g. to 10 Nov, or a date agreed otherwise; a replacement tenant doesn't by itself change this. Ben has been asked.

**3. What do you reply and what do you start?**

Replied to Tom with the two-month rule, the option of landlord agreement, and keys/deposit next steps without promises. Started the landlord request and a 14 Oct follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice, to l… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley on early end date decision (APR-102); then update Tom and plan check-out, key return and… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
