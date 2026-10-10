# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair stalled: provider silent after three-plus reminders and the landlord's only reply concerned a different address, so there is no valid approval. I asked the landlord to confirm, updated the tenant, held the ticket to 13 Mar and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (Oscar Turner) but never confirmed a visit after 7 reminders; no valid landlord approval on file; ticket on hold to 13 Mar awaiting landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm approval for this property (his reply named Flat 18, 88 Alder Lane) or own-contractor details, by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no visit booked, landlord confirmation pending, provider may change, next update by 13 Mar | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap once landlord approves | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 13 Mar for landlord reply | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb named Flat 18, 88 Alder Lane, Willowbank, not this property (Flat 24, 150 Copperfield Walk, Kingshaven) so we cannot treat it as approval. Please confirm yes/no: may we send our contractor to fix the bedroom window at Flat 24, 150 Copperfield Walk? If you have sent your own contractor here, please tell us who and when, so work is not done twice. Reply by 13 March 2024.
> 
> Options: Yes, send our contractor (recommended); I will arrange my own contractor (name and date please)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we named has not yet confirmed a visit with you, and we have asked the landlord to confirm the go-ahead as their earlier reply referred to a different address. No visit is booked yet, so please don't expect anyone until we confirm a date. We are also looking at changing contractor. If the window cannot be shut and you feel unsafe or it is cold, tell us. You will hear from us again by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 7 reminders; no other contractor named; landlord approval invalid
  - Known: Window repair, Flat 24 Copperfield Walk. Oscar Turner assigned 1 Mar, no reply to email/SMS reminders 4, 6, 8 Mar. Landlord's only reply (event 010) is about Flat 18, 88 Alder Lane, so not approval here. Tenant and landlord have been messaged this run; ticket on hold to 13 Mar.
  - Missing: Landlord's confirmation for this property; an alternative contractor; whether landlord's own contractor attended.
  - Options: Swap provider once landlord approves; Landlord uses own contractor
  - Recommendation: Source and assign a replacement contractor once the landlord confirms approval; no fourth reminder to Oscar Turner.

## What this does not establish
- No visit is booked or confirmed
- Landlord approval is not established
- No fourth reminder sent to provider
- Cause and cost of window fault unknown

## Remaining work
- Landlord to confirm approval/own contractor (owner: landlord, due 13 Mar)
- Human to source replacement provider (maintenance)
- Book visit once provider confirms
- Quote/invoice/close

## Missing or unavailable information
- Landlord confirmation for this property
- Whether Oscar Turner is still available
- Tenant's access availability

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; not treated as approval.
- Provider assigned (event 016) with no valid recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but no visit booked; provider never responded to 7 reminders; landlord approval never validly given (reply named Flat 18, 88 Alder Lane). Outstanding: landlord confirmation, provider swap, visit, result.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/clarification request (email, Isaac Oakley); tenant update by email to Eliza Jenkins; P3 internal escalation for provider swap.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: choosing a replacement contractor, as the provider is unresponsive and no other contractor is named in the case; assignment should follow landlord approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb named Flat 18, 88 Alder Lane, Willowb… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 7 reminders; no other contractor named; landlord approval invali… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
