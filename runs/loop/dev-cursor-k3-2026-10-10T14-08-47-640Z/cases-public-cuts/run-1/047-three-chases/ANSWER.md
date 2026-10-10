# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair stalled: provider Oscar Turner ignored 3+ reminders and the landlord's only reply concerned a different property, so no valid approval exists. I asked the landlord to clarify, updated the tenant, held to 14 Mar and escalated P3 for a provider swap.

## Where the case stands
Stage mp_time, provider assigned but no visit booked. Provider silent after reminders. No valid landlord approval on record. On hold to 14 Mar waiting for landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant, to confirm yes/no for our contractor at Flat 24, and whether his own contractor has attended, by 14 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no appointment yet, landlord confirmation pending, ask if window secures and best contact times; next update by 14 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after landlord confirms | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 14 Mar for landlord reply | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your email of 22 Feb named Flat 18, 88 Alder Lane, Willowbank, not Flat 24, 150 Copperfield Walk (bedroom window not closing properly). Which property did you mean? For Flat 24, please confirm yes or no: may we send our contractor to assess and quote? If you sent your own contractor to Flat 24, please tell us who and when, so the work isn't done twice. Please reply by 14 March.
> 
> Options: Yes, send our contractor to Flat 24 (assess and quote first); I will arrange my own contractor for Flat 24 (please give name and date); My earlier email was about a different property only; please advise on Flat 24

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. Our contractor hasn't confirmed a visit with you, and we are still waiting for the landlord's confirmation for this repair, so no appointment is booked yet. We have asked the landlord to confirm by 14 March and are looking at other options for the contractor. One quick question: does the window still close and lock, so the flat is secure? Please also tell us the best number and times to reach you. Until it is fixed, please keep it shut as far as you can. We will update you by 14 March.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders on email and SMS; no other contractor on file; landlord approval invalid
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Provider Oscar Turner assigned 1 Mar (event 016); reminders 4, 6, 8 Mar with no reply. Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, so it is not approval for this property. Tenant last heard from us 1 Mar. Done now: asked landlord to confirm property and route by 14 Mar, updated tenant, put ticket on hold to 14 Mar.
  - Missing: Landlord's confirmation and route; whether the window secures; any alternative contractor on file.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Wait for landlord's own contractor
  - Recommendation: Swap to another window/carpentry contractor once landlord confirms; no fourth reminder.

## What this does not establish
- No contractor reassigned and no visit booked
- The landlord's 22 Feb email is not approval for Flat 24
- Nothing confirms the window is secure or the cause of the fault

## Remaining work
- Landlord to confirm property and route (by 14 Mar)
- Human to swap provider once approved
- Tenant to say whether window secures
- Visit to be booked once provider confirms

## Missing or unavailable information
- Landlord's decision for Flat 24
- Whether the window secures
- Alternative contractor

## Conflicts between sources
- Landlord email (event 010) names Flat 18, 88 Alder Lane, not Flat 24; treated as not about this job
- Provider assigned (event 016) with no valid landlord approval recorded

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but unresponsive after repeated reminders; no visit booked; landlord approval for Flat 24 never validly given (his reply named Flat 18, 88 Alder Lane). Outstanding: landlord clarification, provider swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification request (email, APR-101) and tenant update (email); no fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: swap provider, as reminders are exhausted and no other channel or approved contractor exists.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your email of 22 Feb named Flat 18, 88 Alder Lane, Willowb… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply of 22 Feb named a different property (Flat 18… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders on email and SMS; no other contractor on file; land… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `add_note` | {"entity":"NBL-047-three-chases","note":"Conflict: landlord email event 010 names Flat 18, 88 Alder Lane (plumber, 23/02) - not this propert… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
