# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider never booked the window repair despite repeated reminders, and the landlord's only reply concerned a different property so is not approval. I re-asked the landlord, updated the tenant, set a follow-up and escalated P3 for a provider swap.

## Where the case stands
Provider assigned (Oscar Turner) but no visit booked after 7 reminders; no valid landlord approval for this property. Waiting on landlord (asked, reply by 2024-03-13) and a provider swap.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm which property and approve our contractor or name their own, by 13 March | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant of delay, no visit confirmed, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 recommending provider swap after approval | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Review landlord reply 2024-03-13 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, Willowbank, which is a different property from this one. Please confirm for Flat 24, 150 Copperfield Walk, Kingshaven (bedroom window not closing properly; the tenant has fixed the toilet): may we send our contractor to assess and quote, or will you arrange your own? Please reply by 2024-03-13.
> 
> Options: Yes, send your contractor (recommended); I will arrange my own contractor; Tenant to arrange

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't booked a visit, and we also still need the landlord to confirm approval for this flat, which we've asked for again. Please don't expect anyone until we confirm a date. We'll update you by 13 March 2024.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner ignored 3+ reminders (email+SMS); no valid landlord approval on file
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Provider assigned 2024-03-01 (event 016); 7 reminders (events 020-025), no reply, no visit. Landlord's only reply (event 010) refers to Flat 18, 88 Alder Lane, so it is not approval for this property. Landlord and tenant told; landlord re-asked by 13 March.
  - Missing: Landlord decision for this property; no alternative contractor named in the case.
  - Options: Swap provider once landlord approves; Landlord uses own contractor
  - Recommendation: Swap provider after landlord approval; no fourth reminder to Oscar Turner.

## What this does not establish
- Messages do not book a visit or approve spend
- No fourth reminder sent to the provider
- Does not establish the cause or who pays

## Remaining work
- Landlord decision on Flat 24
- Reassign to another contractor once approved (human/ops)
- Book visit once provider confirms

## Missing or unavailable information
- Landlord approval for this property
- Alternative contractor name
- Ticket reference not retrievable

## Conflicts between sources
- Landlord reply at event 010 names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not applicable

## Answers to the case questions
**1. Where does this case stand?**

Provider assigned 1 March, silent after 7 reminders, no visit booked. Landlord approval never validly given (reply named Flat 18, 88 Alder Lane). Toilet issue withdrawn by tenant.

**2. Next action?**

Landlord approval request by email (A1), tenant update by email (A2), follow-up 13 March (A3).

**3. Human decision needed?**

Yes, P3 maintenance: provider swap once landlord approves (A4).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, Willowbank, which is a diff… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hello El… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2024-03-13","purpose":"Review landlord reply on Flat 24 window approval (property mix-up); if approved, reassign contractor given… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner ignored 3+ reminders (email+SMS); no valid landlord approval on file",… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
