# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The bedroom window job has a provider assigned who has ignored seven reminders, so no further reminder was sent. The landlord's only reply named a different flat, so it is not approval; he has been asked which property he meant and whether we may use our contractor. The tenant was updated and a P3 swap recommendation escalated.

## Where the case stands
Provider assigned (Oscar Turner) but no visit booked; no reply to 4 emails and 4 SMS since 1 Mar. No valid landlord approval on record. Waiting on landlord (reply by 13 Mar) and a human decision on provider swap.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property his 22 Feb reply meant, whether we may send our contractor or he uses his own, reply by 13 March | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, provider being replaced/reviewed, keep window secure, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap after 3+ unanswered reminders | internal maintenance | internal | A3 ✅ |
| 4 | WAIT | Review landlord reply and chase by SMS if none on 13 March | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Please confirm whether we may send our contractor (Oscar Turner) to fix the bedroom window at Flat 24, 150 Copperfield Walk, or whether you will arrange your own. Reply by 13 March 2024.
> 
> Options: Yes, send our contractor to assess and quote; I will arrange my own contractor (please give name and date)
> 
> Update: Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank. That is a different property, so we have not treated it as approval for this flat. Was that meant for this job, and if your plumber has attended or will attend Flat 24 for the window, please tell us when so work is not done twice. The toilet issue was resolved by the tenant. Our contractor has not yet booked a visit despite several reminders; we are reviewing this and will update you by 13 March.

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't booked a visit, so we are looking at changing contractor, and we are also checking a point with your landlord. No visit is booked yet, so please don't expect anyone until we confirm a date. In the meantime, please keep the window as secure as you can, and tell us if it can't be locked shut. We'll update you by 13 March.

## Escalation
- **P3 → maintenance** (verified): Provider unresponsive after 7 reminders; landlord approval unclear
  - Known: Flat 24, 150 Copperfield Walk: bedroom window not closing, raised 21 Feb. Contractor Oscar Turner assigned 1 Mar; email+SMS reminders 1, 4, 6, 8 Mar, no reply, no visit booked. Landlord Isaac Oakley's only reply (event 010) names Flat 18, 88 Alder Lane, a different property, so no valid approval recorded. Toilet issue withdrawn by tenant. Landlord has been asked which property he meant, and whether his own plumber will attend.
  - Missing: Landlord decision (ours vs own contractor); no alternative contractor named in records; whether window can be secured.
  - Options: Swap provider once landlord approves; Keep Oscar Turner and phone him; Landlord uses own contractor
  - Recommendation: Source a replacement window contractor and assign it once the landlord confirms; no fourth reminder to Oscar Turner.
  - Deadline: 2024-03-13

## What this does not establish
- No landlord approval is established; the landlord's reply concerned another property
- No visit is booked and no cost or date is promised
- Escalation does not itself assign a new contractor

## Remaining work
- Landlord decision on contractor (owner: landlord)
- Provider swap and visit booking (owner: maintenance team, after approval)
- Check whether the window can be secured

## Missing or unavailable information
- Landlord approval for this property
- Name of an alternative window contractor
- Whether the landlord's plumber attended Flat 24
- Whether the window can be locked shut

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not Flat 24, 150 Copperfield Walk; treated as not about this job
- Event 016 shows a provider assigned though no landlord approval is recorded
- Reminder SMS sender names differ (Meadow Solutions vs Northbridge Lettings); treated as the same agency

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but silent despite 7 reminders; no visit booked; landlord approval never validly given (reply named Flat 18, 88 Alder Lane); toilet issue withdrawn by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/clarification request by email (A1), tenant update by email (A2), P3 escalation recommending provider swap (A3), follow-up 13 Mar (A4).

**3. Does anything need a human decision, and why?**

Yes, P3: swapping the unresponsive provider, as no alternative contractor is named and landlord authority is unclear.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Please confirm whether we may send our contractor (Oscar Turner) to fix the bedroom window at … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hello El… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider unresponsive after 7 reminders; landlord approval unclear","known":"Flat 24, 150 Co… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `schedule_follow_up` | {"due_on":"2024-03-13","purpose":"Review landlord reply on approval / own contractor and provider swap for Flat 24 window; chase landlord by… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
