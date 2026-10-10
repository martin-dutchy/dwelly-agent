# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Provider never responded to seven reminders and the landlord's only reply concerned another address, so there is no valid approval. I asked the landlord to clarify, updated the tenant, escalated P3 for a provider swap, and set a 13 Mar follow-up.

## Where the case stands
Provider assigned (Oscar Turner) but silent after 3+ reminders; no visit booked; no valid landlord approval for Flat 24 (landlord reply named a different property). Waiting on landlord (reply by 13 Mar); provider swap escalated P3.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether our contractor or theirs should do the Flat 24 window, reply by 13 Mar | Isaac Oakley, landlord | sms | A5 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, what is pending, and next update by 13 Mar | Eliza Jenkins, tenant | email | A1 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalate P3 provider swap recommendation | internal maintenance | internal | A2 ✅ |
| 4 | WAIT | Follow-up on landlord reply 13 Mar | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Dear Eliza, sorry for the wait on your bedroom window. The contractor we contacted has not yet replied to us, so no visit is booked and nobody should be expected. We are asking your landlord to confirm how the repair should go ahead (their reply so far named a different property), and our team is looking at changing the contractor. We will update you by 13 March. If the window can't be closed or locked, please tell us so we can treat it as a security issue. Kind regards, Northbridge Lettings

**A5 · request_information → Isaac Oakley (landlord) via sms, agency landlord record** (verified)

> - Your 22 Feb reply referred to a different address from this job. Did you mean Flat 24, 150 Copperfield Walk (bedroom window)?
> - For Flat 24: may we send our contractor to assess and quote (yes/no), or will you use your own? If your own, has anyone attended or when will they?
> - Please reply by 13 March 2024.
> 
> Why: We hold no valid approval for this property and our appointed contractor has not responded.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner silent after 3+ reminders (email+SMS, 4, 6, 8 Mar); no other contractor named; landlord approval for Flat 24 never validly given
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar (event 016) but landlord's only reply (event 010) concerned Flat 18, 88 Alder Lane, so not approval for this job. Hold "waiting for LL" since 22 Feb. Tenant Eliza Jenkins last wrote 22 Feb. No visit booked. Property record lists no contractors or spend limit.
  - Missing: Landlord decision (our contractor / own / which property meant); alternative contractor; whether window is secure.
  - Options: Swap provider once landlord approves; Landlord uses own contractor; Keep Oscar Turner and chase by other route
  - Recommendation: Swap provider after landlord approval; I have asked the landlord by SMS (reply by 13 Mar) and told the tenant.

## What this does not establish
- No approval for Flat 24 is established; no contractor was reassigned; no visit is booked; cause and cost unknown.

## Remaining work
- Landlord decision (owner: landlord, chase 13 Mar)
- Provider swap after approval (owner: maintenance human)
- Book visit once provider confirms
- Check window security with tenant

## Missing or unavailable information
- Landlord approval for Flat 24
- Alternative contractor named
- Ticket reference not available in system lookup

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not this property; not treated as approval.
- Provider assigned (event 016) despite hold waiting on landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive, no visit booked, landlord approval for this property absent (reply named a different address, event 010). Outstanding: landlord decision, provider swap, visit.

**2. What is the next action, who is it for, and through which channel?**

SMS to the landlord asking which property they meant and whether our or their contractor should attend, reply by 13 Mar; email to tenant with status; no fourth provider reminder.

**3. Does anything need a human decision, and why?**

Yes, P3 maintenance: swap the unresponsive provider, as no other contractor is named and approval is not yet given (ESC-102).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","body":"Dear Eli… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner silent after 3+ reminders (email+SMS, 4, 6, 8 Mar); no other contracto… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `schedule_follow_up` | {"due_on":"2024-03-13","purpose":"Review landlord reply on Flat 24 window approval; if none, chase by another channel; update tenant; progre… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"Flat 24, 150 Copperfield Walk window repair","note":"Conflict: provider assigned 1 Mar without valid landlord approval; landlord'… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","questions":["Your 22 Feb re… | 1 | ✅ verified | REQ-105 found in the request_information log |

## Failed or unverified actions
_None._
