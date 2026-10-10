# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** routine

Tom gave one month's notice to leave 10 Nov. Under the Renters' Rights Act tenants must give two months, so it is not valid for 10 Nov; the earliest end is 10 Dec 2026. I replied to Tom and asked the landlord whether he will agree to 10 Nov in writing, with follow-up set for 14 Oct.

## Where the case stands
Tenant told two months applies; landlord asked to agree an earlier end in writing; waiting on landlord, review 2026-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Explained two-month rule, earliest end 10 Dec 2026, early end needs landlord's written agreement; keys/deposit answered generally | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked Ben to agree in writing to an end date of 10 Nov 2026, reply by 14 Oct | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Wait for landlord decision; chase and update tenant on 14 Oct | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom, thanks for letting us know, and good luck with the new job. Since 1 May 2026 tenants need to give two months' written notice, so one month isn't enough on its own. Your notice, received 10 October, would end the tenancy on 10 December 2026 at the earliest. You can leave earlier only if your landlord agrees in writing. I'm asking him now whether he will agree to 10 November, and I'll tell you his answer by Wednesday 14 October. Please keep paying rent as normal until an end date is agreed in writing. On keys and your deposit: I'll confirm the key hand-back arrangements once the end date is settled. Your deposit is held in the mydeposits scheme and is returned after you leave, once the final check of the flat is done. I can't give a firm date or amount yet. Kind regards, Mare & Co Lettings

**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice by email on 10 Oct to leave on 10 Nov. Legally two months applies, so the earliest end is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov 2026? Reply by Wed 14 Oct please.
> 
> Options: Agree in writing to end on 10 November 2026 (we then arrange check-out, keys and deposit); Hold to two months: tenancy ends 10 December 2026; Suggest a different date between the two

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not agree an early end date; only the landlord can.
- No deposit amount or return date promised; no key drop-off location invented.
- Nothing on file confirms how the notice was served beyond the email.

## Remaining work
- Landlord decision on early end (owner: agent, review 14 Oct)
- If agreed in writing: confirm date, arrange check-out, key return and deposit release via mydeposits
- If not: tenancy ends 10 Dec 2026 at the earliest

## Missing or unavailable information
- Landlord's decision
- Key hand-back arrangements for this property

## Conflicts between sources
- Tenant says one month's notice; current law requires two months.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date?**

Not as a one-month notice. Two months' written notice is required; served 10 Oct 2026, earliest end is 10 Dec 2026.

**2. What options exist to end sooner?**

Landlord agrees in writing to a shorter date (e.g. 10 Nov), i.e. a surrender by agreement. The tenant cannot unilaterally shorten it.

**3. What do you reply and what do you start?**

Replied to Tom explaining the rule and that I am asking the landlord; asked Ben for written agreement by 14 Oct; follow-up scheduled. Deposit return via mydeposits after check-out, no date promised; keys arrangement to be confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice by email on 10 Oct to l… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley for decision on early end date for Tom Achterberg tenancy; then update tenant",… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
