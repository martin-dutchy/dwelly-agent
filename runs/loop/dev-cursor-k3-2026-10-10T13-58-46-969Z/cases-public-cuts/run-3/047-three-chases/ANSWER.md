# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider never responded to four reminder rounds and the landlord's only reply concerned a different property, so no approval exists. I sent no fourth reminder, asked the landlord to clarify, updated the tenant, set a follow-up and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (1 Mar) but unresponsive after repeated reminders; no visit booked; no valid landlord approval on record (landlord's only reply named a different property). Waiting on landlord (reply by 13 Mar) and human provider-swap decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant and to approve our contractor or name his own, reply by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, apologise, next update by 13 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after landlord approval | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Follow-up 13 Mar to review landlord reply and chase on second channel | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is a different property from Flat 24, 150 Copperfield Walk (bedroom window not closing properly). Did you mean this property? Please confirm: may we use our contractor to inspect and quote for the Flat 24 window, or will you arrange your own (and if so, who and when)? Please reply by 13 March 2024.
> 
> Options: Yes, send our contractor to inspect and quote (recommended); I will arrange my own contractor (please give name and date); Tenant to deal with it themselves

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Dear Eliza, I'm sorry for the delay with your bedroom window. Our contractor has not yet got in touch with you or booked a visit, despite several reminders from us. We are also checking the landlord's approval with him, as his earlier reply was unclear. No visit is booked yet, so please don't expect anyone until we confirm a date. We are arranging a replacement contractor with our team and will update you by Wednesday 13 March. If the window is a security worry, please do your best to secure it in the meantime and let us know.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders (email+SMS, 1/4/6/8 Mar); landlord approval never validly recorded
  - Known: Bedroom window not closing, Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar (event 016) but no landlord decision on record: landlord's only reply (event 010, 22 Feb) refers to Flat 18, 88 Alder Lane, a different property, so it is not approval. Provider has not replied to 4 reminder rounds; no visit booked. Landlord silent since 22 Feb; I've emailed him asking which property he meant and for approval/own-contractor decision by 13 Mar. Tenant told no visit is booked. Toilet issue withdrawn by tenant (event 006). Ticket ref not retrievable by lookup.
  - Missing: Landlord's decision; whether his plumber visited this flat; any other approved window contractor
  - Options: Swap provider once landlord approves; Keep Oscar Turner and phone him; Landlord's own contractor
  - Recommendation: Phone Oscar Turner once; if no answer, swap provider after landlord approval.
  - Deadline: 2024-03-13

## What this does not establish
- Nothing here approves spend or authorises any contractor
- No visit is booked
- Does not establish that the landlord's plumber attended this flat

## Remaining work
- Landlord decision (agency awaiting)
- Provider swap or contact (maintenance team)
- Booking visit and quote loop
- Tenant update by 13 Mar

## Missing or unavailable information
- Landlord approval for this property
- Ticket reference not retrievable
- Provider response
- Whether another window contractor is approved

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property; treated as not approval.
- Provider assigned at event 016 without recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar, no contact or visit after 4 reminder rounds. Landlord approval was never validly given (event 010 names Flat 18, 88 Alder Lane). Outstanding: landlord decision, provider swap or contact, visit booking.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/clarification request by email (A1); tenant update by email (A2); P3 internal escalation (A3); follow-up 13 Mar (A4).

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: swapping the unresponsive provider, as three reminders are exhausted and I can't phone or reassign without approved alternative contractor.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"04… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders (email+SMS, 1/4/6/8 Mar); landlord app… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `schedule_follow_up` | {"due_on":"2024-03-13","purpose":"Review landlord reply on property/approval; chase landlord by SMS/phone if none; update tenant","party":"L… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"047","note":"Conflict: provider assigned (event 016) with no valid landlord approval; event 010 names Flat 18, 88 Alder Lane (ZZ3… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
