# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair job stalled: provider silent after 7 reminders and the landlord's only reply concerned a different property. I asked the landlord to confirm, updated the tenant, set a follow-up and escalated P3 to swap provider.

## Where the case stands
Stage mp_time: provider assigned, no visit booked. Oscar Turner has not responded to 7 reminders. No valid landlord approval on file. Waiting on landlord (APR-101) and a human provider swap; review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether we may send our contractor or they will use their own | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, provider is being replaced/checked, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap once landlord approves | internal maintenance | internal | A5 ✅ |
| 4 | WAIT | Review landlord answer and provider swap on 2024-03-13 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk: the tenant reports a bedroom window that won't close properly (the toilet issue is sorted). May we send our contractor to assess and quote, or will you arrange your own?
> 
> Options: Yes, send our contractor to assess and quote (we will come back to you for approval of any quote); I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. Our contractor hasn't confirmed a visit with you despite several reminders, so we are looking at an alternative, and we are also checking a point with your landlord. No visit is booked yet. We will update you by 13 March at the latest.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders; no alternative contractor on file; landlord approval never validly given
  - Known: Window repair ticket NBL-047-three-chases, routine. Oscar Turner assigned 01/03, no reply to 7 email/SMS reminders (last 08/03). Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, not this property. Toilet issue resolved by tenant. Tenant told no visit booked.
  - Missing: Landlord approval/own-contractor choice for this property; an alternative contractor; whether Oscar Turner is still available.
  - Options: Swap provider once landlord approves; Contact Oscar Turner by phone; Landlord uses own contractor
  - Recommendation: Swap provider after landlord confirms approval; I have asked the landlord and updated the tenant.

## What this does not establish
- Nothing here approves a contractor or spend
- The landlord request does not confirm approval
- No visit is booked
- Tenant message promises no date

## Remaining work
- Landlord to answer approval question (agency chases)
- Human to pick replacement contractor and assign after approval
- Visit, result, invoice, closure outstanding

## Missing or unavailable information
- Valid landlord approval for this property
- Alternative contractor named in records
- Why Oscar Turner is silent

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property; not treated as approval.
- Provider assigned at event 016 with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent, no visit booked, landlord approval never validly given (reply named Flat 18, 88 Alder Lane). Toilet issue resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval question to Isaac Oakley (APR-101); tenant update by email; P3 escalation to maintenance; follow-up 13 March.

**3. Does anything need a human decision, and why?**

Yes, P3: provider swap, since three reminders went unanswered and no alternative contractor is on file; it also needs landlord approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-13","party":"Landlord / maintenance team","purpose":"Review landlord answer on Flat 2… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-047-three-chases","note":"Landlord reply event 010 names Flat 18, 88 Alder Lane (different property) so is not approval for t… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders; no alternative contractor on file; landlord approv… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
