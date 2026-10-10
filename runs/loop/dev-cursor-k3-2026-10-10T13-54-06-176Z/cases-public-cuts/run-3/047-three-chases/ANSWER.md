# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair job stalled: provider never replied to 7 reminders and the landlord's only reply concerned a different address. I stopped reminders, told the tenant, asked the landlord to clarify, held the job to 14 Mar and escalated a P3 provider-swap recommendation.

## Where the case stands
Stage: provider assigned (mp_time), no visit booked. Oscar Turner silent after 7 reminders. Landlord's only reply names a different property, so no valid approval. On hold awaiting landlord, review 14 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether our contractor or their own, reply by 14 Mar | Isaac Oakley, landlord | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is confirmed, contractor not responding, next update by 14 Mar | Eliza Jenkins, tenant | email | A1 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Hold and follow-up until 14 Mar for landlord reply | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't confirmed a visit, so please don't expect anyone until we confirm a date with you. We're also checking a few details with the landlord and will look at changing contractor. If the window can't be closed or locked, please secure it as best you can. We'll update you by 14 March.

**A5 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your reply of 22 Feb named a different address from this job, so we can't treat it as approval. Which property did you mean, and was it about the bedroom window at Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ?
> - For this bedroom window, may we use our contractor, or will you send your own? If your own, has anyone attended or will they attend, and when? Please reply by 14 March 2024.
> 
> Why: No usable approval for this property; our assigned contractor has not booked a visit.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner has not responded to 3+ reminders (emails and SMS, 4 Mar–8 Mar); no other contractor named in case. Recommend provider swap.
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar (event 016); reminders events 020-025; no reply ever. Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, so no valid approval on file; no spend limit on file. Tenant (Eliza Jenkins) told no visit is booked. Landlord asked which property and our/own contractor, reply by 14 Mar.
  - Missing: Landlord approval for this property; an alternative contractor; whether landlord's own contractor attended.
  - Options: Swap provider once landlord approves; Keep Oscar Turner and phone him; Landlord uses own contractor
  - Recommendation: Source a replacement window contractor and assign once landlord approval for this property is recorded.
  - Deadline: 2024-03-14

## What this does not establish
- No approval is established for this property; no contractor reassigned and no visit booked.
- Cause and cost of window fault unknown.

## Remaining work
- Landlord to confirm property and route (our/own contractor) by 14 Mar
- Human to source replacement contractor once approved
- Book visit confirmed by provider

## Missing or unavailable information
- Landlord approval for this property
- Alternative contractor
- Whether landlord's contractor attended

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, Willowbank, not this property; treated as not approval. First attempt to message landlord was blocked for naming that address and was resent with the address removed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but no visit booked; provider unresponsive; no valid landlord approval (reply named another property); the toilet issue was resolved by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord email asking which property and which contractor route (A5); tenant email update (A1); hold and follow-up to 14 Mar.

**3. Does anything need a human decision, and why?**

Yes, P3: swap the unresponsive provider, as no other contractor is named in the case (ESC-102). Approval itself is the landlord's.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hello El… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane, not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner has not responded to 3+ reminders (emails and SMS, 4 Mar–8 Mar); no ot… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A4 | `schedule_follow_up` | {"due_on":"2024-03-14","purpose":"Review landlord reply on property/approval; chase on second channel if none; progress provider swap","tick… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply o… | 1 | ✅ verified | REQ-104 found in the request_information log |

## Failed or unverified actions
_None._
