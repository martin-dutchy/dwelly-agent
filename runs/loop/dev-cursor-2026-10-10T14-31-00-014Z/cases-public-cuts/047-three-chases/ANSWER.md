# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The bedroom window job has a provider assigned but no booking after four reminders. The landlord's only reply named a different property, so it is not approval. I asked the landlord to clarify, updated the tenant, put the job on hold to 13 Mar and escalated P3 for a provider swap.

## Where the case stands
Stage: provider assigned (Oscar Turner), no visit booked. Provider silent after four email+SMS rounds; landlord approval not validly on record. On hold until 13 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property he meant and to approve our contractor or name his own, reply by 13 Mar | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, what is pending, next update by 13 Mar, and ask if the window is secure | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 handover recommending provider swap once landlord approves | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 13 Mar for landlord reply | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different property from this job (Flat 24, 150 Copperfield Walk, bedroom window not closing). Please confirm which property you meant, and whether we may send our contractor to assess the Flat 24 window or you will use your own.
> 
> Options: Yes, send our contractor to Flat 24 to assess and quote (recommended); I will arrange my own contractor for Flat 24 (please give name and date)
> 
> Update: The tenant's toilet issue is already fixed; only the window remains. We assigned a contractor on 1 March but they have not replied to four emails/texts, so no visit is booked. We are sorting a replacement or alternative and will update you. Please reply by 13 March 2024.

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't replied to us, so no visit is booked yet and please don't expect anyone until we confirm a date. We're also waiting on the landlord to confirm approval, as their earlier reply referred to a different address. We're chasing both and will update you by Wednesday 13 March. If the window can't be closed or locked, please tell us so we can treat it as a security issue. Is the window secure at the moment?

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 3+ reminders; no alternative contractor named; landlord approval unclear
  - Known: Window repair at Flat 24, 150 Copperfield Walk. Oscar Turner assigned 1 Mar (event 016), reminders by email and SMS on 1, 4, 6, 8 Mar with no reply; no visit booked. Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, so is not approval for this job; no recorded landlord decision. Tenant told, landlord asked to clarify by 13 Mar.
  - Missing: Landlord's decision for Flat 24; whether Oscar Turner is still available; any other approved window contractor.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Landlord uses own contractor
  - Recommendation: Phone Oscar Turner and, if no answer, swap provider once the landlord approves our contractor.

## What this does not establish
- No fourth reminder sent to the provider
- No contractor assigned or visit booked
- Nothing here confirms landlord approval or cost

## Remaining work
- Landlord to confirm property and route (owner: landlord, by 13 Mar)
- Provider swap or phone chase (owner: maintenance human)
- Book visit once confirmed
- Tenant to confirm whether window is secure

## Missing or unavailable information
- Landlord decision for Flat 24
- Provider response
- Whether the window secures

## Conflicts between sources
- Landlord email (event 010) names Flat 18, 88 Alder Lane, Willowbank, not the case property; treated as not about this job
- Event 004 quoted a toilet issue the original request did not contain; tenant later said it was fixed
- Provider assigned (event 016) with no recorded landlord decision

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but silent; no visit booked. Landlord approval not validly recorded (his reply concerned Flat 18, 88 Alder Lane). Toilet issue was resolved by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord clarification/approval request by email (A1), tenant update by email (A2), hold to 13 Mar (A3).

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance (ESC-103): the provider is unresponsive and I cannot phone or swap without landlord approval; recommend phoning or swapping the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 3+ reminders; no alternative contractor named; landlord approval… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
