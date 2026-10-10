# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider never responded to 7 reminders, and the landlord's only reply referred to a different property. I asked the landlord to clarify, updated the tenant, scheduled a review for 13 March and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (Oscar Turner) but no visit booked; 7 reminders unanswered. No valid landlord approval for this property. Waiting on landlord reply and a human provider-swap decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Escalate P3 recommending provider swap | internal maintenance | internal | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether we use our contractor | Isaac Oakley, landlord | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant no visit is booked, alternative being sought, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 4 | WAIT | Review on 13 March | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For the bedroom window at Flat 24, 150 Copperfield Walk (not closing properly), may we use our contractor, or will you arrange your own?
> 
> Options: Yes, send our contractor to assess and quote for Flat 24; I will arrange my own contractor for Flat 24

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Dear Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you has not confirmed a visit, so we are looking at an alternative. We are also confirming the go-ahead with the landlord. No appointment is booked yet. We will update you by Wednesday 13 March. Kind regards, Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders; landlord approval never valid
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Oscar Turner assigned 01/03 (event 016); 7 email/SMS reminders (events 020-025) with no reply. Landlord reply (event 010) named Flat 18, 88 Alder Lane, so it is not approval for this property; no valid landlord decision on file. No other contractor named in records. Tenant told no visit is booked; landlord asked which option applies.
  - Missing: Landlord decision for Flat 24; alternative approved contractor; whether Oscar Turner has been in contact with tenant.
  - Options: Swap provider once landlord approves; Try Oscar Turner by phone
  - Recommendation: Swap the provider once the landlord confirms approval; phone Oscar Turner meanwhile.

## What this does not establish
- No contractor reassigned or booked; no approval is established
- Landlord message did not authorise work at Flat 24
- Nothing says the provider has or has not contacted the tenant

## Remaining work
- Landlord to confirm approval for Flat 24
- Human to decide provider swap and find alternative contractor
- Book visit once a provider confirms
- Quote/approval loop if needed

## Missing or unavailable information
- Valid landlord decision for Flat 24
- Alternative contractor
- Ticket reference not retrievable

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not approval
- Event 004 to the landlord included the toilet issue, which the tenant later withdrew

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 01/03, no visit booked, no provider reply after 7 reminders. Landlord approval is not valid (reply named Flat 18, 88 Alder Lane). Outstanding: landlord decision, provider swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification email (APR-101); tenant email update (MSG-102); P3 escalation (ESC-103) recommending provider swap; follow-up 13 March.

**3. Does anything need a human decision, and why?**

Yes, P3: provider swap, because the provider is unresponsive and no other approved contractor is named in the records.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different proper… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","body":"Dear Eli… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders; landlord approval never valid","known… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `schedule_follow_up` | {"due_on":"2024-03-13","purpose":"Review landlord reply on property/approval for window repair and provider swap; update tenant","party":"La… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
