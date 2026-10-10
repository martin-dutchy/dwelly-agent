# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair stalled: provider ignored 7 reminders and the landlord's only reply named a different property, so no approval exists. I asked the landlord to clarify, updated the tenant, put the job on hold to 13 March and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (Oscar Turner) but never replied; no visit booked. No valid landlord approval for Flat 24. On hold awaiting landlord, review 13 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant, whether his plumber will attend Flat 24, and whether we may send our contractor, by 13 March | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no visit booked, provider unresponsive, landlord re-asked; ask if window secures; next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after landlord approval | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold for landlord reply, review 13 March | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your email of 22 Feb named Flat 18, 88 Alder Lane, Willowbank, so we can't treat it as approval for the bedroom window at Flat 24, 150 Copperfield Walk. Which property did you mean? Has your plumber attended or will anyone of yours attend Flat 24? For the Flat 24 window, may we send our contractor (yes/no), or will you arrange your own? Please reply by 13 March.
> 
> Options: Yes, send our contractor to Flat 24 window; I will arrange my own contractor (please give name and date); Other / I meant a different property

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we contacted hasn't replied to book a visit, and we also still need the landlord's confirmation for this repair. We've asked him again today and are looking at other options. No visit is booked yet. Quick question: does the window still close and lock, so the flat is secure? If not, please tell us and don't leave it open when you are out. We'll update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 7 reminders; assigned without valid landlord approval
  - Known: Window repair at Flat 24 raised 21 Feb. Landlord's only reply (event 010) names Flat 18, 88 Alder Lane, so is not approval. Oscar Turner assigned 1 Mar, never replied to email/SMS reminders (events 020-025). No other contractor named on record; no spend limit on file. Landlord asked today to confirm property and route; tenant told, asked about window security.
  - Missing: Landlord decision; a replacement window contractor; whether window is secure.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Landlord uses own contractor
  - Recommendation: Swap provider after landlord approval; phone Oscar Turner meanwhile.

## What this does not establish
- No contractor is approved or booked; the existing assignment does not establish landlord approval.
- Nothing here confirms the window is secure or the cause/cost.

## Remaining work
- Landlord decision (owner: landlord/agency)
- Replace or phone provider (owner: maintenance)
- Book visit once provider confirms
- Confirm window security with tenant

## Missing or unavailable information
- Landlord's valid approval for Flat 24
- Whether Oscar Turner is still active
- Whether window secures

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not about this job.
- Event 004 to landlord also mentioned a toilet issue the tenant later said was fixed.
- Provider assigned (event 016) with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but silent after 3+ reminders; no visit booked; landlord approval never validly given (reply named Flat 18, 88 Alder Lane).

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification/approval request by email (A1); tenant update by email (A2); hold to 13 Mar.

**3. Does anything need a human decision, and why?**

Yes, P3: provider swap/phone chase, since provider is unresponsive and no other contractor is on record; the landlord's approval is also needed first.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your email of 22 Feb named Flat 18, 88 Alder Lane, Willowb… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply of 22 Feb named a different property (Flat 18… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 7 reminders; assigned without valid landlord approval","known":"… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
