# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job has been stuck awaiting the landlord for two months with conflicting notes about approval and route. I asked the landlord by email and SMS for a clear decision by 17 March, updated the tenant, noted the conflict and set a follow-up.

## Where the case stands
Stuck at landlord approval gate (stage init, on hold). No verbatim landlord decision on record. Landlord unreachable since 8 Feb. Waiting on landlord reply by 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord to confirm approval/route (own vs our contractor) and whether any contractor attended, reply by 17 March | Jenkins, landlord | email | A1 ✅ |
| 2 | CHASE_LANDLORD | SMS chase on second channel with the same question and date | Jenkins, landlord | sms | A2 ✅ |
| 3 | REPLY_TO_TENANT | Updated tenant: awaiting landlord, no visit booked, next update by 18 March | Tenant | email | A3 ✅ |
| 4 | WAIT | Follow-up on 17 March to review landlord reply | Jenkins, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes say a £500+VAT quote was agreed with Harbour Compliance and that Oakley's contractor was to quote, but we have no written confirmation from you. Please reply by 2025-03-17 by email or text: (1) is the work approved, and is it your own contractor (Oakley's) or ours? (2) Has any contractor already attended or quoted, so nothing is done twice? Please give the contractor's name and a date.
> 
> Options: Use our contractor (Harbour Compliance, £500+VAT quote noted) - please confirm in writing; You arrange your own contractor - tell us name and date; Decline the work

**A2 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya's team here re the back garden at Flat 25, 185 Copperfield Walk. We've not been able to reach you by phone. Please reply by 17 March: is the garden work approved, and is it your own contractor or ours? Has any contractor already attended or quoted? Details are in our email. Thanks.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 018 call / event 004 email)** (verified)

> Hello, thanks for calling today and sorry for the wait on the garden. We are still waiting for the landlord to confirm how the work will be arranged, including whether they use their own contractor. We've chased them again by email and text today with a reply date of 17 March. No visit is booked yet. We'll update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or the £500+VAT quote
- No contractor assigned and no visit booked
- Does not establish who Oakley is or whether a contractor has attended

## Remaining work
- Landlord to confirm route and approval (agency, by 17 March)
- If approved, record decision and assign; if own contractor, get name and date
- Funds up front for invoices (event 010) still outstanding
- Escalate P3 if still silent on 17 March

## Missing or unavailable information
- Landlord's written decision
- Who Oakley is and whether their contractor quoted or attended
- Garden photos (unavailable)
- Whether Harbour Compliance quote document exists

## Conflicts between sources
- Event 009 says landlord approved the £500+VAT quote with Harbour Compliance, but events 003-017 show no landlord reply and holds say still waiting for Jenkins. Events 015/016 suggest Oakley's own contractor. Treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval gate, on hold. Notes claim a £500+VAT quote was approved and Oakley's contractor was involved, but there is no recorded landlord words and no contact since 8 Feb. Outstanding: landlord decision and route, name/date, funds up front.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email) plus SMS chase to Jenkins, reply by 17 March; tenant updated by email; follow-up 17 March.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and the landlord has been chased on a second channel only today. If still silent after 17 March, escalate P3 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 018 call / event 004 email)","ticke… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Route unclear: event 009 says £500+VAT quote approved, Harbour Compliance next week, but… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Jenkins (landlord)","purpose":"Check reply on route/approval;… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
