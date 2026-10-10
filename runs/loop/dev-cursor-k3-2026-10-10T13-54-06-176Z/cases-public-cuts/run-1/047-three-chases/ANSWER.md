# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair job stalled: provider ignored 7 reminders and the landlord's only reply named a different flat, so there is no valid approval. I asked the landlord to clarify, updated the tenant, put the job on hold to 14 Mar and escalated P3 recommending a provider swap.

## Where the case stands
Stage mp_time, provider Oscar Turner assigned 1 Mar but never replied; no visit booked. On hold waiting for landlord (review 14 Mar). Landlord approval not valid for this flat.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant, whether own contractor attends Flat 24, and for approval to use ours, reply by 14 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, approval and provider being checked, next update by 14 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 maintenance: recommend provider swap once landlord approves | internal | internal | A4 ✅ |
| 4 | WAIT | Hold until 14 Mar for landlord reply | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your 22 Feb reply mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different property from Flat 24, 150 Copperfield Walk (bedroom window not closing properly). Please confirm which property you meant, and whether your own contractor has attended or will attend Flat 24 for the window. Also, may we send our contractor to assess and quote for the window? Our contractor has not yet booked a visit. Please reply by 14 March 2024.
> 
> Options: Yes, send your contractor to Flat 24 for the window; I will arrange my own contractor for Flat 24 (please give name and date); My earlier message was about another property; please confirm Flat 24 decision

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. The contractor we asked to contact you hasn't replied to us, so no visit is booked and nobody should be expected yet. We are also checking the landlord's approval, as their last reply named a different address. We are asking the landlord now and looking at other options for the contractor. If you've already heard from the contractor, please tell us the date. We will update you by 14 March.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders (email and SMS); no alternative contractor named in case; landlord approval unclear
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Oscar Turner assigned 2024-03-01; reminders 4, 6, 8 March by email and SMS, no reply ever. Landlord's only reply (event 010, 22 Feb) refers to Flat 18, 88 Alder Lane, so is not approval for this flat. Tenant told no visit is booked. Landlord asked (review 14 March).
  - Missing: Landlord approval/route for Flat 24; any alternative approved contractor; whether Oscar Turner is reachable by phone.
  - Options: Phone Oscar Turner; Swap provider once landlord approves; Landlord uses own contractor
  - Recommendation: Swap provider (phone Oscar Turner first) and assign a new window contractor once landlord approval is confirmed.
  - Deadline: 2024-03-14

## What this does not establish
- No contractor reassigned and no visit booked
- Landlord approval for Flat 24 is not established
- Nothing is known about the provider's reasons for silence

## Remaining work
- Landlord to confirm property and route (owner: landlord, by 14 Mar)
- Human to phone/swap provider (maintenance)
- Book visit once confirmed, then result

## Missing or unavailable information
- Which property the landlord meant
- Any alternative approved contractor
- Provider's availability

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ vs case property Flat 24, 150 Copperfield Walk; treated as not about this job
- Provider assigned 1 Mar although landlord hold was never cleared

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent, no visit booked; landlord approval invalid (wrong address); toilet issue resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord email asking for property clarification and approval; tenant email update; no fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: provider swap, since the provider is unresponsive and no alternative contractor is named.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your 22 Feb reply mentioned a plumber visiting Flat 18, 88… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders (email and SMS); no alternative contractor named in… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
