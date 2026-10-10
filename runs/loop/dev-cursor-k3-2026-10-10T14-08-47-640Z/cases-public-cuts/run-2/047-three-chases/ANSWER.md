# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair stalled: provider never replied to reminders and the landlord's only reply concerned a different property. I asked the landlord to clarify, updated the tenant and asked about security, escalated P3 for a provider swap, and held to 14 Mar.

## Where the case stands
Provider assigned (Oscar Turner) but no visit booked; no reply to 7 reminders. No valid landlord approval on record. On hold until 14 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant, whether own contractor attended here, and our contractor vs own; reply by 14 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, ask whether window keeps flat secure, next update 14 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap once landlord approves | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Hold until 14 Mar for landlord reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your email of 22 Feb mentioned a plumber for Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly): may we send our contractor, or will you arrange your own? If you sent your own contractor here, has or will they attend? Please reply by 14 March.
> 
> Options: Yes, send our contractor; I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't confirmed a visit despite our reminders, and we are still waiting for the landlord to confirm how the repair should be arranged. We are asking the landlord again today and a colleague is looking at the contractor. We'll update you by 14 March. One question: does the window lock or close enough to keep the flat secure at the moment? If not, please tell us and let us know any safe way you can keep it shut meanwhile.

## Escalation
- **P3 → maintenance** (verified): Provider silent after 7 reminders (email+SMS); no other approved contractor; landlord approval not valid
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Oscar Turner assigned 1 Mar (event 016), never replied to reminders 20-25. Landlord reply (event 010) concerns Flat 18, 88 Alder Lane, a plumber, not this job; no valid approval recorded. No contractors or spend limit on property record.
  - Missing: Landlord decision for this property; whether provider is reachable by phone; alternative contractor.
  - Options: Phone Oscar Turner; Swap provider once landlord approves; Landlord uses own contractor
  - Recommendation: Swap provider after landlord confirms approval. Already done: landlord asked which property/route by 14 Mar; tenant updated and asked about security.

## What this does not establish
- No fourth reminder sent to provider
- Nothing here approves a contractor, spend or a visit date
- Window security not yet known

## Remaining work
- Landlord decision (agency awaits)
- Provider swap or phone contact (maintenance team)
- Tenant reply on security
- Visit to be booked once provider confirms

## Missing or unavailable information
- Valid landlord approval for this property
- Whether Oscar Turner is reachable
- Whether the window is secure

## Conflicts between sources
- Landlord email (event 010) names Flat 18, 88 Alder Lane, not this property; not treated as approval.
- Provider assigned at event 016 with no valid landlord approval on record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but no visit booked after 7 reminders; landlord approval invalid (event 010 refers to Flat 18, 88 Alder Lane, a plumber); toilet issue withdrawn by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification request by email (A1); tenant update by email (A2); no fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: provider swap/phone contact as the provider is unresponsive and no alternative contractor is on record (ESC-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your email of 22 Feb mentioned a plumber for Flat 18, 88 A… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider silent after 7 reminders (email+SMS); no other approved contractor; landlord approv… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord to confirm approval for this property (event 010 na… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
