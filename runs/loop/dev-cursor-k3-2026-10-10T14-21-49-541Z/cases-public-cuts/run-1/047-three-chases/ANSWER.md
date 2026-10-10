# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair stalled: provider never responded to seven reminders and the landlord's only reply concerned a different property. I asked the landlord to clarify, told the tenant no visit is booked, held the ticket to 13 March and escalated P3 for a provider swap.

## Where the case stands
Ticket NBL-047-three-chases at provider-assigned stage, no visit booked. Oscar Turner silent after 7 reminders. No valid landlord approval on record. On hold until 2024-03-13 awaiting landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant and whether we send our contractor or he uses his own | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, replacement being arranged, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 13 March for landlord reply | Isaac Oakley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb named Flat 18, 88 Alder Lane, not Flat 24, 150 Copperfield Walk (the bedroom window that won't close). Which property did you mean, and for Flat 24 may we send our contractor, or will you arrange your own? If your plumber has attended or will attend Flat 24, please say so to avoid double work.
> 
> Options: Yes, send your contractor to Flat 24 to assess and quote; I will arrange my own contractor for Flat 24 (please give name and date)
> 
> Update: Our assigned contractor has not replied after several reminders, so we are arranging a replacement. The toilet issue was fixed by the tenant; only the window remains. Please reply by 2024-03-13.

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't replied to us, so no visit is booked and nobody should be expected yet. We're asking the landlord to confirm how to proceed and are arranging a replacement contractor. Meanwhile, please make sure the window is as secure as you can get it. We'll update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders (email+SMS); no other contractor on record; recommend swap
  - Known: Window repair, Flat 24 150 Copperfield Walk. Oscar Turner assigned 1 Mar; reminders 4, 6, 8 Mar by email+SMS, no reply, no visit booked. Landlord's only reply (event 010, 22 Feb) refers to Flat 18, 88 Alder Lane, so no valid approval recorded. Toilet issue withdrawn by tenant. Tenant told no visit booked. Landlord asked which property/route by 13 Mar.
  - Missing: Landlord approval for this property; alternative contractor; why Oscar Turner is silent.
  - Options: Reassign to another window contractor once landlord approves; Wait for landlord to say he uses own contractor
  - Recommendation: Source a replacement contractor now so it can be assigned as soon as landlord approval arrives.

## What this does not establish
- No contractor reassigned and nothing approved; landlord authority for this property is not established
- No visit is booked
- Provider's silence cause unknown

## Remaining work
- Landlord to confirm property and route by 13 Mar
- Human to source replacement contractor
- Assign and book visit after approval

## Missing or unavailable information
- Landlord approval for Flat 24
- Alternative contractor on record
- Property spend limit

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane ZZ3 5ZZ, not this property; treated as not approval
- Event 012 SMS signed Meadow Solutions vs Northbridge Lettings elsewhere; sender name inconsistency

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but unresponsive, no visit booked; landlord approval never validly given (reply named Flat 18, 88 Alder Lane). Outstanding: landlord clarification, replacement contractor, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification request by email (A1) and tenant update by email (A2); hold to 13 Mar.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: choose and source a replacement contractor, as the provider is unresponsive and no other contractor is on record.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22 Feb named Flat 18, 88 Alder Lane, not Flat 24, 150 Copperfield Walk (the bedr… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hello El… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"047","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane - not approval for th… | 1 | ❌ failed | Ticket 047 not found on read-back |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders (email+SMS); no other contractor on record; recomme… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane - no… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
- A3: First put_on_hold used wrong ref '047'; retried with NBL-047-three-chases and verified as A5
