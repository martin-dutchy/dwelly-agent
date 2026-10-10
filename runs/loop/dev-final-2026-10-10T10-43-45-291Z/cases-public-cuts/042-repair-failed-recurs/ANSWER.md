# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The washing machine fix from 28 Feb failed and the tenant reports the fault back after 5 days. I opened linked routine job JOB-101, told the tenant, asked the landlord to approve a return visit and put the job on hold with a review date.

## Where the case stands
Original job NBL-042 closed 28 Feb. Tenant reports the fault recurred. New routine job JOB-101 opened and linked, on hold awaiting landlord approval for a return visit (review 7 Mar). No contractor assigned yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve a return visit by Lantern Services after the failed repair | Mercer, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Apologise, confirm new linked job and 14-day target, no appointment promised | Noah Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold JOB-101 pending landlord reply, review 2024-03-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Dear Noah, I'm sorry the repair didn't hold. I've opened a new job (JOB-101) for the washing machine and linked it to the earlier one. I'm letting the landlord know and will arrange for an engineer to come back. Our target for this kind of repair is within 14 days, and I'll confirm the visit time with you as soon as it's booked. If the machine leaks, smells of burning or trips the power, please stop using it and tell us straight away. Kind regards

**A3 · request_landlord_approval → Mercer (landlord)** (verified)

> The washing machine repair (heating element wiring, £75 + VAT, 28 Feb) has failed and the fault is back. Please approve a return visit by Lantern Services to re-inspect; we will ask them to cover it under their repair guarantee where possible, and will send any quote before work starts.
> 
> Options: Approve return visit by Lantern Services (recommended); Landlord arranges own contractor; Decline / consider replacing the machine

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Opening the job does not confirm the cause of the failure or who pays
- No contractor assigned or visit booked
- Asking the landlord does not mean approval has been given

## Remaining work
- Landlord decision on return visit (owner: landlord, chase 7 Mar)
- Assign Lantern Services and book visit once approved; ask about guarantee cover
- Check the earlier invoice (£75.11 vs £75 + VAT, odd due date 2026) before it is paid, since the repair failed

## Missing or unavailable information
- Property record has no landlord contact, spend limit or contractor preferences
- Whether Lantern's repair carries a guarantee

## Conflicts between sources
- The old job was closed as completed with 'need confirmation from landlord' and no tenant confirmation, but the tenant now says the fix failed. I trusted the tenant's latest report.
- Invoice of £75.11 conflicts with '£75 + VAT' in the landlord email, and its due date is in 2026.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The original job was closed as completed on 28 Feb, but the repair failed and the tenant reported it again on 4 Mar. A new linked job, JOB-101, is open and on hold waiting for landlord approval. A return visit still needs approval, a contractor assigned and a visit booked.

**2. What is the next action, who is it for, and through which channel?**

The next action is the landlord approval request for a return visit by Lantern Services, sent to Mercer by email. The tenant, Noah, has been told by email on the existing thread. The next step after approval is assigning the contractor and booking the visit.

**3. Does anything need a human decision, and why?**

No escalation is needed now. The only decision is the landlord's approval, which has been requested. A human should look at the earlier invoice, and at any warranty or recharge question, if Lantern disputes cover.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 20, 120 Alder Lane, Cedarford, ZZ9 0ZZ","category":"appliance","severity":"routine","description":"Repeat of NBL-042: wash… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JOB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Mercer","ticket_ref":"JOB-101","decision_needed":"The washing machine repair (heating element wiring, £75 + VAT, 28 Feb) has fa… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Awaiting landlord approval for return visit after failed repair","review_… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
