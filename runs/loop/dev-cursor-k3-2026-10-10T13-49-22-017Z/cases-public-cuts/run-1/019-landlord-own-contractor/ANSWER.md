# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has been stuck at the landlord gate since January, with the landlord unreachable and records conflicting on approval versus own contractor. I asked the landlord a clear question by SMS, updated the tenant, noted the conflict, and set a hold and follow-up for 17 March.

## Where the case stands
At landlord approval gate (stage init), on hold waiting for landlord. No formal landlord decision recorded. No contractor assigned. Landlord asked by SMS; review 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | SMS the landlord asking which route (own contractor or ours), contractor name/date, and yes/no on the £500+VAT quote, reply by 2025-03-17 | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: nothing booked, landlord possibly using own contractor, unconfirmed, next update by 17 March | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold and follow-up for landlord reply, review 2025-03-17 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Jenkins (landlord) via sms, agency landlord record** (verified)

> - For the back garden at Flat 25, 185 Copperfield Walk: are you arranging your own contractor (Oakley's contractor / Harbour Compliance), or do you want us to instruct ours? If your own, please give the contractor's name and a date, and say whether they have already attended or quoted.
> - Our notes show a £500 + VAT quote; please confirm yes or no whether you approve it, so we do not act on an unconfirmed note.
> 
> Why: No landlord decision is recorded after several unanswered contacts (email 17 Jan, 8 Feb; calls). Records conflict on whether the landlord approved a quote or is using their own contractor. Please reply by 2025-03-17.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. Sorry for the wait. Our notes suggest the landlord's side may be arranging their own contractor, but we haven't had a clear confirmation from the landlord yet, so no contractor or date is booked. We've texted the landlord today asking for a clear answer by 17 March, and we'll update you by then. Please let us know if anyone has already visited the garden. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval, contractor assignment or visit is established
- The £500+VAT figure is only from an internal note, not a recorded quote or landlord approval
- Messages do not decide whether the garden work is the landlord's responsibility

## Remaining work
- Landlord decision on route and quote (Maya Palmer/agency)
- If own contractor: get name and date; if ours: record decision, then assign
- If no reply by 17 March, escalate to a human for a phone decision
- Garden photos were unavailable and not seen

## Missing or unavailable information
- Landlord's decision in their own words
- Whether Oakley's/Harbour Compliance contractor has attended or quoted
- Garden photos

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance, but no landlord words recorded and later holds show landlord still unreachable; events 015/016 suggest own contractor via Oakley. Treated as no approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine job at the landlord approval gate, on hold. No recorded landlord decision; notes conflict (quote approved vs own contractor via Oakley). Nothing booked. Outstanding: landlord's route, contractor details, quote confirmation.

**2. What is the next action, who is it for, and through which channel?**

SMS to the landlord (Jenkins) asking for route and yes/no on the quote by 17 March; email update to the tenant; follow-up on 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Escalate only if the landlord remains silent after 17 March, for a phone decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","questions":["For the back garden… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Route unclear. Event 009 says £500+VAT quote approved, Harbour Compliance going ahead, b… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's route (own contractor vs ours… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Landlord","purpose":"Check landlord reply; if none, escalate … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
