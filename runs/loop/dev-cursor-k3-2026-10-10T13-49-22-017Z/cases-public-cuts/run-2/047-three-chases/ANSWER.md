# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair stalled: provider silent after 7 reminders and no valid landlord approval on record because the landlord's reply named another property. Asked landlord, updated tenant, noted record, set follow-up and escalated P3 for a provider swap.

## Where the case stands
Stage mp_time: provider assigned 1 Mar, no visit booked, 7 unanswered reminders. Landlord approval unclear (reply named another property). Waiting on landlord until 14 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant and whether our contractor or his own is to do the window, reply by 14 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, approval being checked, next update by 14 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap once landlord approves | internal maintenance | internal | A5 ✅ |
| 4 | WAIT | Review landlord answer 14 Mar | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your 22 Feb reply mentioned a plumber at a different address (Flat 18, 88 Alder Lane), not this property. For the bedroom window that won't close at Flat 24, 150 Copperfield Walk: which property did you mean, and may we use our contractor (yes/no), or will you send your own (has theirs attended or will they attend here)? Please reply by 14 March 2024.
> 
> Options: Yes, send our contractor for the window; I will arrange my own contractor (please give name and date); My earlier reply was about another property; please treat this one as still awaiting my decision

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. Our contractor hasn't confirmed a visit with you yet, so no appointment is booked and nobody should be expected. We are also checking the landlord's go-ahead, as his last reply doesn't clearly cover your flat. We have asked him to confirm and are looking at other options for the contractor. We'll update you by 14 March. If the window can't be shut securely, please let us know and tell us if it's a safety or security worry. Kind regards, Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders on both channels; landlord approval unclear
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Oscar Turner assigned 1 Mar; reminders 4, 6, 8 Mar by email and SMS, no reply, no visit booked. Landlord's only reply (event 010) refers to Flat 18, 88 Alder Lane, so no valid approval on record; no other contractor named. Tenant and landlord updated this run.
  - Missing: Which property the landlord meant; whether he uses his own contractor; any alternative approved contractor.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Landlord's own contractor
  - Recommendation: Swap provider once the landlord confirms approval; review 14 March.

## What this does not establish
- No contractor visit is booked or confirmed
- The landlord has not approved our contractor for this property
- No fourth reminder was sent to the provider

## Remaining work
- Landlord answer on property and route (owner: agency, review 14 Mar)
- Provider swap or booking once approved (maintenance)
- Visit, result, invoice, close

## Missing or unavailable information
- Which property landlord meant in event 010
- Whether landlord's plumber attended here
- Any alternative contractor

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property; treated as not about this job.
- Provider assigned at event 016 with no recorded landlord decision while hold said waiting for landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but never booked a visit despite 3+ reminders. Landlord approval is unclear as his reply named Flat 18, 88 Alder Lane. Outstanding: landlord confirmation, a responsive provider, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/clarification request by email to Isaac Oakley, plus a tenant update by email; no fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, a P3 maintenance decision on swapping the unresponsive provider, once the landlord confirms the route.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your 22 Feb reply mentioned a plumber at a different addre… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-047-three-chases","note":"Event 010 landlord reply names Flat 18, 88 Alder Lane (ZZ3 5ZZ), not this property; not treated as … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-14","party":"Landlord","purpose":"Review landlord answer on property/route; chase on … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders on both channels; landlord approval unclear","known… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
