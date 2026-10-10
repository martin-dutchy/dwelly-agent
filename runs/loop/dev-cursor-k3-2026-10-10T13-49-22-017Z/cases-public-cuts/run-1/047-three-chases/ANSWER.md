# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The window repair is stalled. The assigned provider never replied to 7 reminders, and the landlord's only reply named a different property, so there is no valid approval. I asked the landlord to clarify, updated the tenant, put the job on hold to 13 March and escalated P3 for a provider swap.

## Where the case stands
Stage mp_time: provider assigned, no visit booked, provider silent after 7 reminders. Landlord approval never validly recorded. On hold waiting for landlord until 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant, and whether our contractor or his own for the Flat 24 window, reply by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is confirmed, approval being checked, next update by 13 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 provider swap recommendation | internal maintenance | internal | A5 ✅ |
| 4 | WAIT | Hold until 13 Mar for landlord reply | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your 22 Feb email mentioned a plumber visiting Flat 18, 88 Alder Lane, which is not this property (Flat 24, 150 Copperfield Walk). Please confirm (1) which property you meant, and (2) for the bedroom window at Flat 24 that doesn't close properly: may we send our contractor, or will you arrange your own (and has one attended or will one attend, so work isn't done twice)? Please reply by 13 March 2024.
> 
> Options: Yes, send your contractor to Flat 24 (reply with any spend cap); I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't confirmed a visit with us, so please don't expect anyone yet. We are also checking with the landlord that the repair is approved, and we're looking at alternatives for the contractor. We'll update you by 13 March. If the window can't be closed or locked and you feel unsafe, please tell us straight away.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders on email and SMS; no other contractor named in case; landlord approval absent
  - Known: Window repair at Flat 24 since 21 Feb. Landlord reply (event 010) concerned a different address. Provider assigned 1 Mar, reminders 4, 6, 8 Mar, never replied. Tenant withdrew toilet issue. Done: landlord asked, tenant updated, note added, hold to 13 Mar.
  - Missing: Landlord decision; any alternative approved contractor; whether the landlord's own plumber visit relates to this flat.
  - Options: Swap provider once landlord approves; Keep Oscar Turner and phone him; Landlord uses own contractor
  - Recommendation: Swap provider after landlord approval is recorded.

## What this does not establish
- No fourth reminder sent to provider
- Nothing here approves the repair, a contractor or spend
- No visit is booked or confirmed
- Cause of the window fault not established

## Remaining work
- Landlord to confirm property and route (owner: landlord, by 13 Mar)
- Human to arrange a replacement provider after approval (maintenance)
- Visit to be booked once a provider confirms

## Missing or unavailable information
- Landlord's decision for Flat 24
- Whether his plumber visit relates to this flat
- Any alternative contractor

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; treated as not about this job
- Provider assigned (event 016) although the hold says waiting for landlord and no decision is recorded

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive, no visit booked, no valid landlord approval (his reply named Flat 18, 88 Alder Lane). Toilet issue was withdrawn by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord asked by email to confirm the property and the route (our contractor or his own), with a reply due by 13 Mar. Tenant updated by email. No fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: swap the unresponsive provider, once the landlord's approval is recorded (ESC-104).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your 22 Feb email mentioned a plumber visiting Flat 18, 88… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-047-three-chases","note":"Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property: not approval. No record… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation of property, approval of our … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders on email and SMS; no other contractor … | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
