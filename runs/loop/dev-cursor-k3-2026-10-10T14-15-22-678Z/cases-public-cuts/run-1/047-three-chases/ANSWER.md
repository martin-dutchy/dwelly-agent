# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider ignored seven reminders and the landlord's only reply concerned another property, so no valid approval exists. I stopped reminders, asked the landlord to clarify, updated the tenant, escalated P3 for a provider swap and set a 13 Mar review.

## Where the case stands
Provider assigned 1 Mar, no visit booked, provider silent after 7 reminders. Landlord approval invalid (reply named a different property). Waiting on landlord (reply by 13 Mar); escalated P3 for provider swap.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant, whether their plumber attended here, and approve our contractor, reply by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no appointment is booked, checking with landlord, security tip, next update 13 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 recommend provider swap once landlord approves | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Review on 13 Mar | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your email of 22 Feb mentioned a plumber at Flat 18, 88 Alder Lane, which is not this property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly): did you mean this flat, and has or will your own contractor attend here? If not, may we send our contractor to assess and quote? Please reply by 2024-03-13.
> 
> Options: Yes, send your contractor to assess the window (quote to us before any work); I will arrange my own contractor (please send name and date); My earlier email was about another property; please confirm this one separately

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked has not confirmed a visit with you, and we have also found the landlord's reply did not clearly cover your flat, so we are checking that with them. We have not booked any appointment yet, so please don't expect anyone until we confirm a date. Meanwhile, please make sure the window is latched as securely as you can. If it will not lock at all, or glass is damaged, let us know and we will treat it as more urgent. We'll update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner silent after 7 reminders (email+SMS); landlord approval never validly given
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar (event 016) with no reply to reminders 4, 6, 8 Mar (events 020-025). Landlord's only reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, so is not approval for this flat; hold since 22 Feb with no further answer. Tenant told no appointment is booked. I have asked the landlord (which property, own contractor, approval) by 13 Mar.
  - Missing: Landlord approval for this property; any alternative contractor approved for windows; whether landlord's plumber attended here.
  - Options: Swap provider once landlord approves; Phone landlord and provider; Keep Oscar Turner if he responds
  - Recommendation: Swap provider after landlord confirms; phone landlord meanwhile as second-channel chase.

## What this does not establish
- Nothing here approves spend or a contractor for this flat
- No visit is booked
- Cause of the window fault unknown

## Remaining work
- Landlord answer (owner: landlord/agency)
- Provider swap or confirmation (maintenance)
- Visit, result, invoice, close

## Missing or unavailable information
- Valid landlord approval for Flat 24
- Provider response
- Ticket reference not retrievable via get_ticket

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane ZZ3 5ZZ, not this property ZZ3 7ZZ; treated as not about this job.
- Landlord email 22 Feb quoted a toilet issue the tenant later said was fixed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but no visit booked and no response; landlord approval never validly given (reply named Flat 18, 88 Alder Lane). Outstanding: landlord clarification/approval, provider swap, visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification/approval request by email (A1); tenant update by email (A2); no fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance (ESC-103): provider swap after three-plus unanswered reminders, once landlord approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your email of 22 Feb mentioned a plumber at Flat 18, 88 Alder Lane, which is not this property… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","body":"Hello El… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner silent after 7 reminders (email+SMS); landlord approval never validly … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `schedule_follow_up` | {"due_on":"2024-03-13","party":"Landlord","purpose":"Review landlord reply on Flat 24 window approval; no fourth reminder to provider; updat… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
