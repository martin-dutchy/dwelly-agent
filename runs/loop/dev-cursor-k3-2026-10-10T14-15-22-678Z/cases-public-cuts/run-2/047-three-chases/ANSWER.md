# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair has stalled: the provider never responded to reminders and the landlord's only reply concerned a different address, so there is no valid approval. I asked the landlord and tenant, put the job on hold with a review date, and escalated P3 for a provider swap.

## Where the case stands
Stage mp_time, provider assigned but no visit booked. Provider silent after 7 reminders. No valid landlord approval on record. On hold waiting for landlord, review 13 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether to use our contractor or their own, by 14 Mar | Isaac Oakley, landlord | email | A5 ✅ |
| 2 | REQUEST_INFORMATION | Update tenant, apologise for delay, ask if contacted and whether window secures | Eliza Jenkins, tenant | email | A1 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after landlord approval | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold for landlord reply, review 13 Mar | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> - Has anyone contacted you to arrange a visit for the bedroom window?
> - Does the window still lock or shut securely enough for tonight, and are there any gaps or loose glass? Please keep it as closed as you can for now.
> 
> Why: Sorry for the delay. Our contractor has not yet confirmed a visit, and we are checking with them and your landlord. We are chasing this and will update you by 14 March.

**A5 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb refers to a different address from this job, so we have not treated it as approval. For the bedroom window at Flat 24, 150 Copperfield Walk, which will not close properly: may we use our contractor, or will you use your own? If your own, please give their name and a date, and say whether they have already attended this flat. Please reply by 14 March 2024.
> 
> Options: Yes, use our contractor (recommended); I will arrange my own contractor (name and date please)

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders; landlord approval invalid
  - Known: Window repair at Flat 24, 150 Copperfield Walk, open since 21 Feb. Oscar Turner assigned 1 Mar, no reply to 3 email+SMS reminder rounds (4, 6, 8 Mar). Landlord's only reply (event 010) names Flat 18, 88 Alder Lane, so no approval for this flat. I have asked the landlord which property they meant and for approval/own contractor by 14 Mar, asked the tenant for an update and whether the window secures, and put the job on hold to review 13 Mar.
  - Missing: Valid landlord approval; any other approved contractor; whether the landlord's plumber attended here; whether the window is secure.
  - Options: Swap provider once the landlord approves; Phone Oscar Turner to confirm instruction; Use landlord's own contractor if they choose
  - Recommendation: Swap provider after landlord approval; phone Oscar Turner meanwhile.
  - Deadline: 2024-03-13

## What this does not establish
- Nothing here approves spend or confirms a visit.
- Asking the landlord does not confirm whether their plumber attended this flat.
- No fourth reminder sent to the provider.

## Remaining work
- Landlord answer on property and contractor route (owner: agency, by 14 Mar)
- Provider swap or confirmation by a human (ESC-103)
- Tenant reply on window security and contact
- Book visit once confirmed by provider

## Missing or unavailable information
- Valid landlord approval
- Whether Oscar Turner ever contacted the tenant
- Window security status
- Any other contractor on file

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property; treated as not approval.
- Provider assigned (event 016) without a recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent after 7 reminders, no visit booked. Landlord approval is invalid (event 010 names another address). Outstanding: landlord decision, provider swap or confirmation, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval question by email (APR-104) to Isaac Oakley; tenant update and security question by email to Eliza Jenkins (REQ-101); hold to 13 Mar.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance (ESC-103): provider swap, since the provider is unresponsive and no other contractor is named; the human should act once the landlord approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Ha… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord's 22 Feb reply names Flat 18, 88 Alder Lane, not th… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-three-chases","note":"Conflict: provider assigned at event 016 with no valid landlord decision (event 010 concerns a diff… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders; landlord approval invalid","known":"Window repair … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb refers to a different address from th… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |

## Failed or unverified actions
- none: First landlord request_information was blocked by policy for naming another address; resent via request_landlord_approval without it (A5).
