# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair job stalled: provider assigned 01/03 never replied to 7 reminders, and the landlord's only reply referred to a different property so it is not approval. I asked the landlord to confirm, updated the tenant, put the job on hold to 13/03 and escalated P3 recommending a provider swap.

## Where the case stands
Provider assigned (stage mp_time) but no visit booked; provider silent after 7 reminders. No valid landlord approval on record. Ticket on hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm which property he meant and approve our contractor for Flat 24 window | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: delay, no appointment booked, we are chasing | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 13/03 | internal | internal | A3 ✅ |
| 4 | ESCALATE_TO_HUMAN | P3 handover: provider unresponsive, recommend swap after landlord approval | internal maintenance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property from this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Please confirm: may we send our contractor to fix the bedroom window that won't close at Flat 24, 150 Copperfield Walk? (The toilet issue is resolved by the tenant.) Please reply yes or no, or tell us if you will use your own contractor.
> 
> Options: Yes, send your contractor to Flat 24, 150 Copperfield Walk; I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't confirmed a visit with you yet, and we also need to confirm one detail with your landlord before work goes ahead. We're chasing both now and will update you as soon as we have a confirmed date. We haven't booked an appointment yet. If the window can't be shut and you feel unsafe or it's letting in bad weather, please tell us.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner has not responded to 7 email/SMS reminders; no phone number for him on file; landlord approval not valid
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Provider assigned 01/03 (event 016) but no recorded valid landlord approval: landlord's 22/02 reply (event 010) refers to Flat 18, 88 Alder Lane. Reminders sent events 020-025, no reply ever. Landlord asked now for approval; tenant updated; ticket on hold, review 13/03.
  - Missing: Provider phone number/other channel; landlord approval for this property.
  - Options: Phone provider; Reassign to another contractor once landlord approves
  - Recommendation: Swap provider after landlord confirms approval.

## What this does not establish
- No visit is booked and no contractor approval is established
- Messages do not confirm cost, date or who pays
- Reassignment has not happened

## Remaining work
- Landlord to confirm property and approval (agency chases after 13/03 on SMS/phone)
- Human to phone or swap provider
- Book visit once provider confirms, then result, invoice, close

## Missing or unavailable information
- Landlord approval for Flat 24
- Provider contact other than email/SMS
- Landlord's contact details not on file; used existing thread

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; treated as not about this job.
- Provider was assigned (event 016) without a recorded valid landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair; provider assigned but silent, no visit booked, landlord approval not validly given (his reply named Flat 18, 88 Alder Lane). Toilet issue resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord Isaac Oakley, by email, asked to confirm property and approve our contractor; tenant updated by email; no further provider reminders.

**3. Does anything need a human decision, and why?**

A P3 maintenance handover: provider unresponsive on all channels on file, so a human should phone or swap the provider once the landlord approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property, so is… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner has not responded to 7 email/SMS reminders; no phone number for him on… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
