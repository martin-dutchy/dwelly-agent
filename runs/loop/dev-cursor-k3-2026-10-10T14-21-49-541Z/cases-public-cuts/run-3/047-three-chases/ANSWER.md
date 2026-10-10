# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The provider has ignored three reminders and no visit is booked. The landlord's only reply named a different property, so there is no valid approval. I asked the landlord to confirm, updated the tenant, put the job on hold to 13 Mar and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (stage mp_time) but silent; no visit booked. Landlord approval not validly recorded. Ticket on hold awaiting landlord, review 2024-03-13; P3 escalation open for provider swap.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm which property he meant, approve our contractor for Flat 24 and say whether his own contractor attended | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: provider not responding, replacement being sought, nothing booked, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap, since no other contractor is named and three reminders went unanswered | internal maintenance team | internal | A3 ✅ |
| 4 | WAIT | Hold until 13 March for landlord reply | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb named Flat 18, 88 Alder Lane, not this property, so we have not treated it as approval. Please confirm: may we use our contractor to repair the bedroom window at Flat 24, 150 Copperfield Walk (yes/no)? Has your own contractor attended or will one attend this flat?
> 
> Options: Yes, use our contractor (recommended); I will arrange my own contractor for this flat (please give name and date)
> 
> Update: Tenant reports the bedroom window will not close properly (toilet issue is resolved by the tenant). Our provider has not booked a visit despite several reminders, so we are escalating internally to swap provider. No visit is booked. Please reply by 2024-03-13.

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Eliza, sorry for the delay with your bedroom window. The contractor we asked has not booked a visit with you, so we are looking at a replacement. We are also waiting on the landlord to confirm who will do the repair. No visit is booked yet and we will let you know once it is. Meanwhile, please keep the window as secure as you can. If it cannot be secured at all, tell us. We will update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders (email+SMS 4, 6, 8 Mar); no other contractor named; landlord approval unclear
  - Known: Tenant Eliza Jenkins reported bedroom window not closing (21 Feb). Provider assigned 1 Mar, never replied; 3 reminders sent. Landlord's only reply (event 010) named Flat 18, 88 Alder Lane, a different property, so is not approval; no recorded landlord decision, no spend limit on file. Toilet issue withdrawn by tenant. Landlord asked now (reply by 13 Mar) for approval and whether his own contractor attends. Tenant told.
  - Missing: Landlord approval; whether landlord's plumber attended here; alternative contractor; whether window secures.
  - Options: Swap provider once landlord approves; Landlord uses own contractor
  - Recommendation: Source a replacement window/carpentry contractor now; assign once landlord approval is recorded. No fourth reminder sent.
  - Deadline: 2024-03-13

## What this does not establish
- No contractor reassigned and no visit booked
- Landlord approval is not established; the event 010 reply is about a different property
- Does not confirm the window fault's cause or cost or who pays

## Remaining work
- Landlord reply due by 13 Mar (agency)
- Human to source a replacement provider and assign after approval
- Chase landlord on a second channel if no reply
- Tenant update due 13 Mar

## Missing or unavailable information
- Landlord approval for this flat
- Whether the landlord's plumber attended here
- Alternative contractor
- Whether the window can be secured

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, Willowbank, not this property; treated as not about this job
- Agency SMS signed Meadow Solutions vs Northbridge Lettings: sender name inconsistent

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A provider was assigned on 1 Mar but has never replied, despite 3 reminders. No visit is booked. The landlord's approval is not valid, as his reply named Flat 18, 88 Alder Lane. The toilet issue was withdrawn by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval and clarification request by email, tenant update by email, and an internal P3 escalation for a provider swap. A hold runs to 13 Mar.

**3. Does anything need a human decision, and why?**

Yes, at P3: choosing a replacement provider, because no other contractor is named in the case and three reminders went unanswered. Assignment waits on the landlord's approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb named Flat 18, 88 Alder Lane, not thi… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders (email+SMS 4, 6, 8 Mar); no other cont… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Awaiting landlord's confirmation of approval for this proper… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
