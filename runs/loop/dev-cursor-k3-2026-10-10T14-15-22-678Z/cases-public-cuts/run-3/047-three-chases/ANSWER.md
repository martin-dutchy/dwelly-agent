# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The provider never booked a visit despite 7 reminders, and the landlord's only reply named a different property, so there is no valid approval. I asked the landlord to clarify, updated the tenant, held the ticket to 13 Mar and escalated P3 recommending a provider swap.

## Where the case stands
Ticket at provider-assigned stage; no visit booked; provider silent after 7 reminders; no valid landlord approval on file; landlord asked to clarify by 2024-03-13; on hold to that date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property their 22 Feb reply meant, whether own contractor attends, and whether we may send ours; reply by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, we are checking with landlord, update by 13 Mar; ask if window can be secured | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after landlord confirms | internal maintenance | internal | A5 ✅ |
| 4 | WAIT | Hold and follow-up until 13 Mar | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank. Our job is the bedroom window that won't close at Flat 24, 150 Copperfield Walk, Kingshaven. Did you mean this property, and has or will your own contractor attend here? If not, may we send our contractor to assess and quote for the window? Please reply by 2024-03-13.
> 
> Options: Yes, send our contractor to Flat 24 (please state any spend limit); I will use my own contractor for Flat 24 (please give name and date); My earlier message was about a different property; please advise on Flat 24

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. Our contractor has not yet booked a visit with you, so no one should be expected yet. We are also checking with your landlord, as their earlier reply seems to refer to a different property. We have asked them to confirm by 13 March and will update you by then. Meanwhile, can you tell us whether the window can be shut and locked so the flat is secure? Thank you.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 7 reminders; recommend provider swap once landlord authority is clear
  - Known: Window won't close, Flat 24, 150 Copperfield Walk. Provider assigned 2024-03-01, reminders on 4, 6, 8 Mar by email and SMS, never replied. Landlord's only reply (event 010) names Flat 18, 88 Alder Lane, so no valid approval on file. Tenant and landlord messaged today.
  - Missing: Landlord approval/own-contractor decision for this property; another approved window contractor; whether window can be secured.
  - Options: Swap provider after landlord approves; Phone Oscar Turner; Move to double_quotation to source another contractor
  - Recommendation: Swap provider once landlord confirms; review 2024-03-13.

## What this does not establish
- No fourth reminder sent to the provider
- Nothing here approves spend or confirms a visit
- Landlord message about Flat 18 is not treated as approval for this property
- Does not establish the window is secure

## Remaining work
- Landlord answer (agency, by 13 Mar)
- Provider swap or reassign once authority is clear (human, P3)
- Visit to be booked and confirmed by provider
- Tenant update by 13 Mar

## Missing or unavailable information
- Landlord decision for this property
- Whether the window can be secured
- Any other approved contractor

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not about this job.
- Provider assigned at event 016 with no recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but silent after 7 reminders, with no visit booked. No valid landlord approval is on file because the 22 Feb reply names Flat 18, 88 Alder Lane. The toilet issue is withdrawn.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord to clarify the property and approve by 13 Mar (email); update the tenant (email); escalate P3 internally for a provider swap.

**3. Does anything need a human decision, and why?**

Only a P3 decision to swap the unresponsive provider, once landlord authority is clear. No other contractor is named in the case.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-047-three-chases","note":"7 reminders to Oscar Turner (events 020-025), no reply; stop reminding. Landlord reply event 010 na… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation of property/approval; provide… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 7 reminders; recommend provider swap once landlord … | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-13","purpose":"Check landlord reply on property/approval; chase on second channel (SM… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
