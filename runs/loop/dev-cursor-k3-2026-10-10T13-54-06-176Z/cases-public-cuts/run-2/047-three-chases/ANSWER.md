# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair assigned to Oscar Turner on 1 March, who has not replied to seven reminders. The landlord's only reply named a different property, so there is no valid approval. I asked the landlord to clarify, updated the tenant, held the job to 14 March and escalated P3 recommending a provider swap.

## Where the case stands
Stage mp_time: provider assigned 01/03 but no visit booked; provider silent after 7 reminders. No valid landlord approval on record. On hold until 14 March awaiting landlord; escalated P3 for provider swap.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether to use our contractor or their own, reply by 14 March | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, landlord and alternative being checked, next update by 14 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap once landlord approves | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold awaiting landlord, review 14 March | Isaac Oakley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your 22 Feb reply mentioned a plumber visiting Flat 18, 88 Alder Lane, which is not this property. For the bedroom window at Flat 24, 150 Copperfield Walk: may we use our contractor, or will you send your own? If your own, please give name and date. Please reply by 14 March 2024.
> 
> Options: Yes, send our contractor to assess and quote for the window; I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, an update on your bedroom window. The contractor we asked has not yet contacted you or confirmed a visit, so no appointment is booked and please don't expect anyone yet. We are also checking with the landlord about who will do the repair, and our team is looking at an alternative contractor. We'll update you by 14 March. Sorry for the delay.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 7 reminders; no alternative contractor on file; landlord authority unclear
  - Known: Window not closing, Flat 24, 150 Copperfield Walk. Oscar Turner assigned 01/03; reminders 04, 06, 08 Mar by email and SMS, no reply. Landlord's only reply (event 010) concerns a different address, so no valid approval on record. Toilet issue resolved by tenant. Tenant told no visit booked; landlord asked which property/route by 14/03.
  - Missing: Landlord approval/route for this property; alternative contractor; whether Oscar Turner is reachable.
  - Options: Swap provider once landlord approves; Phone Oscar Turner once more; Wait for landlord to use own contractor
  - Recommendation: Swap provider after landlord confirms our contractor is approved; no fourth reminder.
  - Deadline: 2024-03-14

## What this does not establish
- No visit is booked or confirmed
- The landlord's reply about another address is not approval
- No contractor has been approved, quoted or instructed for spend
- Escalation does not swap the provider yet

## Remaining work
- Landlord to confirm property and route (by 14 March)
- Human to decide provider swap/new assignment after approval
- Visit to be booked once a provider confirms a date

## Missing or unavailable information
- Landlord approval for this property
- Alternative contractor named
- Why Oscar Turner is not responding

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property ZZ3 7ZZ; not treated as approval.
- Provider was assigned on 1 March with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive after 7 reminders, no visit booked, landlord approval not validly on record (reply concerned Flat 18, 88 Alder Lane). Window still unrepaired; toilet issue resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification/approval request (email/agency record), tenant update by email, internal P3 escalation for provider swap; held to 14 March.

**3. Does anything need a human decision, and why?**

Yes, P3: swapping the provider, as the provider is unresponsive and no alternative contractor is named; best done once the landlord approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your 22 Feb reply mentioned a plumber visiting Flat 18, 88… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-047-three-chases","note":"Provider Oscar Turner assigned 01/03, no reply to 7 reminders (email+SMS). No recorded landlord app… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 7 reminders; no alternative contractor on file; landlord authori… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation of property and route (our co… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
