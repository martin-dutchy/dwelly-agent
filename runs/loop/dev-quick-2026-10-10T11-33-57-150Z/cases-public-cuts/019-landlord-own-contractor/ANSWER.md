# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The job has been stuck at landlord approval since January; the landlord has never replied in the record, and the 2025-01-31 note claiming approval is unsupported. I told the tenant the decision is pending, asked the landlord for one yes-or-no decision, logged the conflict, and put the job on hold until 2025-03-17. No contractor was assigned and no visit was booked.

## Where the case stands
Landlord approval gate. No landlord decision is recorded, so no contractor can be assigned. The ticket is on hold for the landlord (Jenkins) with review date 2025-03-17. The tenant chased on 2025-03-13 and has been told the decision is pending.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the landlord's decision is still pending, no date yet, and we will update them once we hear back. | Tenant, Flat 25, 185 Copperfield Walk | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord one clear yes-or-no question: approve our contractor up to £500 + VAT, or arrange their own contractor (name and date). | Jenkins, landlord | email | A3 ✅ |
| 3 | WAIT | Hold the job for the landlord's reply, review 2025-03-17. If still silent, chase by phone (second channel) and escalate P2 to maintenance. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 25, 185 Copperfield Walk (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for your patience and for calling to chase the back garden. We passed your request to the landlord in January and are still waiting for their decision on how the work should go ahead. We have asked them again today. We cannot book a contractor until they approve, so we do not have a date yet. As soon as we hear from them, we will let you know what happens next. Thanks, Northbridge Lettings

**A3 · request_landlord_approval → Jenkins (landlord, Flat 25, 185 Copperfield Walk) - existing thread (event 012 email) (landlord)** (verified)

> Tenant request for back garden: remove rubbish and construction waste, level the ground, lay gravel/stone covering, make the garden safe and usable. Please confirm one yes or no: (a) do you approve our contractor to attend, with the earlier quote of £500 + VAT (Harbour Compliance) as the spend limit, or (b) will you arrange your own contractor (please give their name and a date)?
> 
> Options: Approve our contractor (Harbour Compliance) up to £500 + VAT, as previously quoted, and confirm in writing; Landlord arranges their own contractor and gives name and date; Decline the works

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Event 009 (landlord approved £500 + VAT, Harbour Compliance) is not verified by any landlord message, so it does not authorise spend or an assignment.
- The tenant's request is not confirmed as a repair the landlord must fund; the landlord decides between their own contractor and ours.
- Nothing was booked; no visit date exists.
- Garden works are not an emergency on the facts given.

## Remaining work
- Landlord decision (Jenkins): our contractor up to £500 + VAT, or own contractor with name and date. Owner: landlord, review 2025-03-17.
- If approved: assign contractor and book visit, then quote/result, invoice, final checks.
- Confirm correct landlord contact (Oakley vs Jenkins naming conflict) and a phone number for the second-channel chase.

## Missing or unavailable information
- Any landlord reply or approval (none in history).
- Garden photos (unavailable in event 001).
- Confirmation of the landlord's name and contact (Oakley/Jenkins).
- Whether Harbour Compliance is still available and whether the £500 + VAT quote is current.

## Conflicts between sources
- Event 009 (31 Jan note) says landlord approved £500 + VAT and Harbour Compliance would go ahead; no landlord message supports it and later events (010-017) show the landlord was still not reached. Trusted the later record: no approval.
- Landlord named as both Oakley and Jenkins across events 008-017.
- Event 016 says the tenant was asked whether Oakley's contractor could quote; no provider is recorded as assigned.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stuck at the landlord approval gate. No landlord decision is recorded. The landlord must choose between our contractor (up to £500 + VAT, as previously quoted) and their own. Outstanding: landlord decision, garden photos, correct landlord contact, and the visit if approved.

**2. What is the next action, who is it for, and through which channel?**

Tenant: email (existing thread, event 004) saying the decision is pending (A2). Landlord Jenkins: one yes-or-no approval request, email on existing thread event 012 (A3). Job held for landlord until 2025-03-17 (A4). Chase by phone if still silent.

**3. Does anything need a human decision, and why?**

Not yet. The landlord has not been chased on a second channel and the records conflict only on the approval claim, which one landlord question can settle. Escalate P2 to maintenance if the landlord is still silent after the 2025-03-17 phone chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 (2025-01-31 note) says the £500+VAT quote was approved by the… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 25, 185 Copperfield Walk","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Jenkins (landlord, Flat 25, 185 Copperfield Walk) - existing thread (event 012 email)","decision_needed":"Tenant request for ba… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord (Jenkins) to confirm in writ… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
