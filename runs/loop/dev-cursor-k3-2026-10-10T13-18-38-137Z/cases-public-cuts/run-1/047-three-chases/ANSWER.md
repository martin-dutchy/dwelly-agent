# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider has ignored seven reminders, and the landlord's only reply concerned a different property so it is not approval. I asked the landlord to clarify, updated the tenant, put the job on hold to 13/03 and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (01/03) but unresponsive after 7 reminders; no visit booked. No valid landlord approval on record. On hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether our contractor may attend, reply by 13/03 | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant of the delay, that no one should be expected until a date is confirmed, next update by 13/03 | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until landlord replies, review 2024-03-13 | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet issue is resolved), may we send our contractor to assess and quote, or will you arrange your own? Please reply by 2024-03-13.
> 
> Options: Yes, send our contractor to assess and quote (recommended); I will arrange my own contractor (please send name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't arranged a visit with you, so we are looking at an alternative. We also need to confirm one point with your landlord before work is booked. Please don't expect anyone until we confirm a date with you. We'll update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders (email+SMS); recommend provider swap
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Provider assigned 01/03 (event 016); reminders 04/03, 06/03, 08/03 with no reply, no visit booked (events 020-026). Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, so no valid landlord approval on record; I have asked the landlord by 13/03. Tenant informed. No other contractor named in the case.
  - Missing: Landlord approval for this property; an alternative contractor; why the provider is silent.
  - Options: Swap provider once landlord approves; Try contacting Oscar Turner by phone; Landlord uses own contractor
  - Recommendation: Source an alternative contractor now, to be assigned once the landlord confirms approval.
  - Deadline: 2024-03-13

## What this does not establish
- No contractor was booked or approved
- The landlord's reply does not authorise work at this property
- Tenant told no date is confirmed

## Remaining work
- Landlord to confirm approval/own contractor
- Human to source replacement provider
- Visit booking once a provider confirms a date

## Missing or unavailable information
- Landlord decision for Flat 24
- Reason for provider's silence
- Any alternative contractor

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not about this job.
- Provider was assigned (event 016) with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent after repeated reminders, no visit booked, and no valid landlord approval (reply named Flat 18, 88 Alder Lane). Outstanding: landlord decision, provider swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A1), tenant update by email (A2), no fourth reminder to the provider.

**3. Does anything need a human decision, and why?**

Yes, a P3 maintenance escalation (ESC-103) to swap the unresponsive provider, as no other contractor is named in the case.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different proper… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property (Flat … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders (email+SMS); recommend provider swap",… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
