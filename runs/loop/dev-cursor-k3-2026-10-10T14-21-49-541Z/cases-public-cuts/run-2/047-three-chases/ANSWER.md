# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The provider has ignored 7 reminders over 9 days, and the landlord's only reply named a different flat, so there is no valid approval. I asked the landlord to clarify, updated the tenant, put the ticket on hold to 13 Mar and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (Oscar Turner) but silent; no visit booked. Landlord approval not validly recorded. Ticket on hold to 13 Mar awaiting landlord; P3 escalation raised for provider swap.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and for a yes/no on our contractor | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, nothing booked, ask if window secures, next update by 13 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 recommend provider swap | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Hold to 13 Mar for landlord reply | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb named Flat 18, 88 Alder Lane, not this property (Flat 24, 150 Copperfield Walk). Please confirm: may we send our contractor to repair the bedroom window at Flat 24, yes or no? If you have sent your own contractor here, please give their name and visit date.
> 
> Options: Yes, use our contractor (recommended); No, I will use my own contractor (please give name and date)
> 
> Update: Our assigned contractor has not responded after several reminders, so we are arranging a replacement. No visit is booked yet. We will chase again on 13 March.

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we assigned has not got back to us, so we are arranging a replacement and checking a point with the landlord. No visit is booked yet and nobody should be expected until we confirm a date. Could you tell us whether the window can still be closed and locked, so the flat is secure? We will update you by 13 March at the latest.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders; swap needed, no other contractor named
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Oscar Turner assigned 1 Mar; 7 reminders (email+SMS, 4, 6, 8 Mar) with no reply. Landlord's 22 Feb reply named Flat 18, 88 Alder Lane (different property), so no valid approval is recorded. Tenant told 22 Feb and 1 Mar; toilet issue withdrawn by tenant.
  - Missing: Landlord approval for this property; alternative window contractor; whether landlord's own contractor attended; whether window secures.
  - Options: Swap provider once landlord approves; Landlord uses own contractor
  - Recommendation: Source a replacement window contractor; instruct only after landlord's clear yes for this property. Done already: landlord asked, tenant updated.
  - Deadline: 2024-03-13

## What this does not establish
- No fourth reminder sent to the provider
- Nothing here approves spend or books a visit
- Escalation does not choose the new contractor

## Remaining work
- Landlord to confirm property and approval
- Human to source a replacement contractor
- Visit to be booked once provider confirms
- Confirm window security with tenant

## Missing or unavailable information
- Landlord approval for Flat 24
- Alternative contractor
- Whether window secures
- Whether landlord's plumber visited here

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, Willowbank, not this property; treated as not about this job.
- Agency SMS sign-offs alternate between Meadow Solutions and Northbridge Lettings.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but never replied despite 7 reminders; no visit booked. Landlord approval is unclear because their reply named Flat 18, 88 Alder Lane. Toilet issue was withdrawn by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification and approval request by email (A1), tenant update by email (A2), and a P3 escalation for a provider swap (A3). No further reminders to the provider.

**3. Does anything need a human decision, and why?**

Yes, P3: choosing a replacement contractor, since none other is named in the case. The landlord's approval is also still needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb named Flat 18, 88 Alder Lane, not thi… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders; swap needed, no other contractor named","known":"W… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation of property/approval; provide… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
