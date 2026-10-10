# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider has ignored seven reminders and the landlord's only reply concerned a different flat, so there is no valid approval. I asked the landlord to clarify, told the tenant, held the ticket to 13 Mar and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (stage mp_time) but never confirmed a visit; no valid landlord approval on record; on hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant and whether to use our contractor or his own, reply by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked and she will hear by 13 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after landlord confirms | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 13 Mar for landlord reply | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different property from Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet is already fixed). Which property did you mean? For Flat 24, may we use our contractor for the window, or will you send your own (and if so, has anyone attended or will they, and when)? Please reply by 13 March 2024.
> 
> Options: Yes, use your contractor for the window at Flat 24; I will arrange my own contractor for Flat 24 (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. Our contractor has not yet confirmed a visit with you, so no appointment is booked. We are checking the landlord's approval and the contractor arrangement and will update you by 13 March. Please nobody expect a visit until we confirm a date. If the window can't be closed and the flat feels insecure, let us know.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders (email+SMS 1, 4, 6, 8 Mar); no other contractor named in case.
  - Known: Window not closing at Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar (event 016); never replied. Landlord reply event 010 concerned a different address (Flat 18, 88 Alder Lane), so no valid approval recorded. Landlord asked today to clarify and choose our/own contractor by 13 Mar; tenant informed; ticket on hold.
  - Missing: Valid landlord approval; whether landlord's plumber attended here; an alternative contractor.
  - Options: Swap provider once landlord approves; Try Oscar Turner by phone
  - Recommendation: Swap provider after landlord confirms the route.

## What this does not establish
- No visit is booked or confirmed
- Landlord approval is not established
- No fourth reminder sent to provider
- Nothing decides cause or cost

## Remaining work
- Landlord to clarify property and route (agency chases after 13 Mar)
- Swap provider and book visit once approved (maintenance team)
- Window repair itself

## Missing or unavailable information
- Landlord clarification of address and contractor route
- Any alternative contractor
- Provider response

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane (ZZ3 5ZZ), not Flat 24, 150 Copperfield Walk (ZZ3 7ZZ); treated as not about this job.
- Provider assigned at event 016 though no valid landlord approval is recorded.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Window repair, provider assigned 1 Mar but silent after 3+ reminders; no visit booked; landlord reply was about Flat 18, 88 Alder Lane so not approval; toilet issue resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification request (email, Isaac Oakley), tenant update (email, Eliza Jenkins), hold to 13 Mar, P3 escalation for provider swap.

**3. Does anything need a human decision, and why?**

Only a provider swap (P3), since the provider is unresponsive and no other contractor is named; it depends on landlord confirmation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders (email+SMS 1, 4, 6, 8 Mar); no other c… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
