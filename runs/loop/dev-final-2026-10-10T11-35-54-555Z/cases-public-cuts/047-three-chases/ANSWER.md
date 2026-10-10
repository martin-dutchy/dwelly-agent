# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair ticket stalled: contractor assigned 01/03 never replied to seven reminders, and the landlord's only reply referred to a different property so is not approval. I re-asked the landlord, updated the tenant, put the job on hold to 13/03 and escalated P3 for a provider swap.

## Where the case stands
Stage: provider assigned, no visit booked. Provider silent after 7 reminders. Landlord approval for this property not valid. On hold awaiting landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Re-ask landlord which property was meant and whether our contractor may assess/quote | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on delay and what is pending, no dates promised | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 13/03 | internal | internal | A3 ✅ |
| 4 | ESCALATE_TO_HUMAN | P3 handover recommending provider swap once landlord approves | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly), may we send our contractor to assess and quote, or will you arrange your own? Please reply yes (ours) or the name of yours.
> 
> Options: Yes, send our contractor to assess and quote (recommended); I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't come back to us, and we are still waiting for the landlord to confirm the go-ahead for this flat. We have written to the landlord again and are looking at other options for the contractor. We'll update you as soon as we have something confirmed. If the window can't be shut and the flat feels unsafe or insecure, please let us know.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner has not responded to 3+ reminders (email and SMS); no phone number on file for provider; landlord approval missing
  - Known: Ticket NBL-047-three-chases, Flat 24, 150 Copperfield Walk. Provider assigned 01/03 (event 016) with no valid recorded landlord approval: landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane. 7 reminders to provider 04-08/03, no reply. Tenant told of the delay; landlord re-asked on the existing thread.
  - Missing: Provider phone number; landlord decision for this property; no spend limit or landlord contact on file.
  - Options: Phone provider or swap to another contractor once landlord approves; Wait for landlord reply by 13/03
  - Recommendation: Swap provider after landlord confirms approval for this property.

## What this does not establish
- Does not approve any contractor or spend
- Does not book a visit
- Does not establish why provider is silent

## Remaining work
- Landlord decision for Flat 24 (agency, chase by 13/03)
- Provider swap or phone contact (human, ESC-103)
- Visit, result, invoice, close

## Missing or unavailable information
- Landlord approval for this property
- Provider phone number
- Landlord contact and spend limit not on file

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not the case property; treated as not approval.
- Provider was assigned (event 016) despite no valid recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive, no visit booked; landlord approval for Flat 24 never validly given (reply named Flat 18, 88 Alder Lane). Outstanding: landlord decision, provider contact or swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Isaac Oakley by email (A1); tenant update by email (A2); hold to 13/03 (A3).

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance (ESC-103): three reminders unanswered, no other provider channel on file, so a provider swap or phone contact is needed once the landlord approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property so is … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner has not responded to 3+ reminders (email and SMS); no phone number on … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
