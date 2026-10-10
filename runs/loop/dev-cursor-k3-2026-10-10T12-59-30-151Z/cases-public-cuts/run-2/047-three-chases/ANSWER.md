# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider Oscar Turner has not responded to 7 reminders. The landlord's only reply named a different property, so there is no valid approval. I asked the landlord, updated the tenant, put the job on hold and escalated a P3 provider swap.

## Where the case stands
Stage mp_time: provider assigned 1 Mar, no visit booked, provider silent after repeated reminders. No valid landlord approval on file. On hold awaiting landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether we may send our contractor | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on delay and next update date 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 recommend provider swap once landlord approves | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold for landlord reply, review 2024-03-13 | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber at Flat 18, 88 Alder Lane, which is not this property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly), may we send our contractor, or will you arrange your own?
> 
> Options: Yes, send our contractor; I will arrange my own contractor; Tenant to arrange

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't replied to us, so we are not relying on them. We are also checking with the landlord to confirm the go-ahead for this flat. We will update you by 13 March. If the window can't be closed or locked and you feel unsafe, please let us know.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner silent after 3+ reminder cycles; no other approved contractor named; recommend swap
  - Known: Window repair ticket NBL-047-three-chases, provider assigned 1 Mar; reminders by email/SMS 1,4,6,8 Mar with no reply. Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, so no valid approval on file. Landlord asked on this run to clarify. Tenant informed.
  - Missing: Landlord's approval for this property; an alternative contractor.
  - Options: Swap provider once landlord approves; Try provider by phone
  - Recommendation: Swap provider after landlord confirms approval; no fourth reminder sent.

## What this does not establish
- No fourth reminder sent to the provider
- Nothing here approves the repair or books a visit
- The window fault and its cause are unassessed

## Remaining work
- Landlord to confirm property and approval
- Human to swap provider (maintenance)
- Book visit, repair, invoice, close

## Missing or unavailable information
- Landlord approval for Flat 24
- Alternative contractor name
- Whether the provider ever contacted the tenant

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; treated as not approval.
- Provider was assigned on 1 Mar with no recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent, no visit booked, and no valid landlord approval (reply was about Flat 18, 88 Alder Lane). Outstanding: landlord approval, provider swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification and approval request by email (A1); tenant update by email (A2); hold to 13 March.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: provider swap, because the provider is unresponsive and no other contractor is named in the case (ESC-103).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber at Flat 18, 88 Al… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord's event 010 reply named a different property (Flat … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner silent after 3+ reminder cycles; no other approved contractor named; r… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
