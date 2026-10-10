# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider Oscar Turner never responded to reminders, and the landlord's only reply concerned a different property. I asked the landlord to confirm, updated the tenant, escalated P3 for a provider swap and put the job on hold to 13 March.

## Where the case stands
Provider assigned (mp_time), no visit booked. Provider silent after 7 reminders. Landlord approval for this property not established. On hold until 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm our contractor or own for Flat 24, noting his reply named another property | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit booked, provider unresponsive, update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Hold awaiting landlord, review 13 March | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For the bedroom window that won't close at Flat 24, 150 Copperfield Walk, may we use our contractor to inspect and quote, or will you arrange your own? The toilet issue is resolved by the tenant.
> 
> Options: Yes, send our contractor to inspect and quote (recommended); I will arrange my own contractor

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. The contractor we asked to contact you hasn't replied to us, so we're looking at an alternative and have asked the landlord to confirm the next step. No visit is booked yet. If you've heard from the contractor, please tell us the date. We'll update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner silent after 3+ reminders (4 emails + SMS, 1-8 Mar); no alternative contractor named in records; landlord approval unclear
  - Known: Window won't close, Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar, never replied to 7 reminders. Landlord's only reply (event 010) concerned Flat 18, 88 Alder Lane, so is not approval for this property; no spend limit on file. Tenant told no visit booked; landlord asked which property/our contractor or own.
  - Missing: Alternative approved contractor; landlord's decision.
  - Options: Swap provider once landlord approves; Wait for landlord to arrange own contractor
  - Recommendation: Swap provider after landlord approval; chase landlord on second channel in 3 days.

## What this does not establish
- No fourth reminder sent to provider
- Landlord reply of 22/02 is not approval for this property
- No visit or appointment is confirmed
- Nothing about cost or who pays is decided

## Remaining work
- Landlord to confirm decision (agency chases on second channel after 3 days)
- Human to source/swap provider once approved
- Tenant update by 13 March

## Missing or unavailable information
- Landlord decision for Flat 24
- Alternative contractor
- Provider's reason for silence

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not approval.
- Provider was assigned (event 016) with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but silent after 7 reminders; no visit booked; landlord approval for Flat 24 never validly given (reply named Flat 18, 88 Alder Lane). Toilet issue resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord asked to confirm contractor choice (email, APR-101); tenant updated by email; P3 escalation for provider swap; hold to 13 March.

**3. Does anything need a human decision, and why?**

Yes, P3: swapping the unresponsive provider, as no other contractor is named in records and the stage cannot proceed without landlord approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"047","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"04… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner silent after 3+ reminders (4 emails + SMS, 1-8 Mar); no alternative co… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"047","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation for Flat 24 (earlier reply named a different p… | 1 | ❌ failed | Ticket 047 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation for Flat 24 (earlier reply na… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
- A4: First put_on_hold used wrong ref (047); retried with NBL-047-three-chases and verified as A5.
