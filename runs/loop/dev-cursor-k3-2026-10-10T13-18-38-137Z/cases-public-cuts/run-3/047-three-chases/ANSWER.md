# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair job: Oscar Turner was assigned on 01/03 but never replied to three rounds of reminders. The landlord's only reply named a different property, so it isn't approval. I stopped reminders, asked the landlord for clear approval, told the tenant, escalated P3 for a provider swap and set a hold to 13/03.

## Where the case stands
Stage mp_time, provider assigned but no visit booked. Provider silent after 7 reminders. No valid landlord approval on file. Ticket on hold until 2024-03-13 waiting for landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm yes/no approval for Flat 24 window (earlier reply named a different property) | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, provider unresponsive, update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Hold until 2024-03-13 for landlord reply | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. Our job is the bedroom window that will not close properly at Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ (the toilet is already sorted). Do you approve us sending our contractor for this window, yes or no, or will you arrange your own? Please reply by 13/03/2024.
> 
> Options: Yes, send your contractor (recommended); I will arrange my own contractor; No

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't replied to us, so no visit is booked and nobody should be expected yet. We are checking the landlord's go-ahead and looking at using a different contractor. We'll update you by 13 March at the latest.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ email/SMS reminders; landlord approval unclear
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Provider assigned 01/03 (event 016); reminders 04/03, 06/03, 08/03 by email and SMS, no reply, no visit booked. Landlord reply (event 010) concerned Flat 18, 88 Alder Lane, so is not approval for this property. No other contractor named in records; no spend limit on file.
  - Missing: Valid landlord approval; an alternative contractor.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Move to double_quotation to source another provider
  - Recommendation: Swap provider; I have asked the landlord to confirm approval for the correct property by 13/03 and told the tenant. No further reminders sent.
  - Deadline: 2024-03-13

## What this does not establish
- No visit is booked or confirmed
- Landlord approval for this property is not established
- No new contractor assigned; no cost agreed

## Remaining work
- Landlord to confirm approval or own contractor by 13/03
- Human to swap provider (maintenance)
- Tenant update by 13/03
- Book visit once provider confirms

## Missing or unavailable information
- Valid landlord approval for Flat 24
- Alternative contractor named in records

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property ZZ3 7ZZ; not treated as approval.
- Provider was assigned (event 016) with no valid recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent, no visit booked, landlord approval not valid (reply concerned Flat 18, 88 Alder Lane). Toilet issue was withdrawn by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A1), tenant update by email (A2), P3 maintenance escalation (A3), hold to 13/03 (A4).

**3. Does anything need a human decision, and why?**

Yes, P3: swapping the unresponsive provider, as no alternative contractor is named in the records and the landlord's approval is still needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ email/SMS reminders; landlord approval unclear",… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord to confirm approval for Flat 24 (earlier reply name… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
