# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit dates conflict (30/08 Saturday labelled Monday vs tenant's 8 Sept). I asked the provider to confirm the real date and whether they attended, told the tenant it is unconfirmed and asked if 8 Sept suits, and set a 2 Sept follow-up.

## Where the case stands
Provider Keystone Compliance assigned with landlord approval ("Yes go ahead"). Visit date unconfirmed: record says 30/08/2025 (a Saturday, now passed), tenant says 8 Sept. Waiting on provider to confirm; tenant told.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm whether they attended today and the actual agreed date, by 1 Sept | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, record holds 30/08, ask if 8 Sept is acceptable for an essential appliance, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up 2 Sept on provider confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit of 30/08/2025, 10-12 (described as "Monday", but 30/08 is a Saturday). The tenant says she arranged 8 September 2025 with you instead. Please reply by end of Monday 1 September to confirm: (1) did you attend today, and (2) what is the actual agreed date and time? Please don't attend any other date until you have confirmed it with us. Thank you.

**A2 · send_message → Clara (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, thanks for your call, and sorry for the mixed-up reminders. Our record shows 30/08/2025 (this morning), but that was only a tentative slot, and we haven't had the engineer confirm either that or 8 September. So we can't yet confirm 8 September as booked. We've asked Keystone Compliance to confirm the correct date and whether anyone came today, and we'll update you by Tuesday 2 September. Please don't expect anyone on a date we haven't confirmed. As the oven is out of use, is 8 September okay for you? If not, we'll ask for an earlier slot.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked; neither date is confirmed by the provider
- Does not establish whether the engineer attended today or the cause of the fault

## Remaining work
- Provider to confirm date; then set_visit and tell tenant
- Record work result after the visit; quote/invoice if needed

## Missing or unavailable information
- Actual agreed visit date
- Whether provider attended 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but described as Monday
- Tenant says 8 Sept; system says 30/08
- Provider/tenant names differ (Riverside Works, Lantern Utilities, Keystone Utilities, Grace Mercer, Ruben Oakley); treated as the same parties

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; Keystone assigned; visit date disputed (30/08 vs 8 Sept) and unconfirmed by the provider; outstanding is provider confirmation and the visit itself.

**2. What is the next action, who is it for, and through which channel?**

Provider asked to confirm date by email (A1); tenant updated by email (A2); follow-up 2 Sept (A4).

**3. Does anything need a human decision, and why?**

No; routine clarification with the provider can resolve it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"026","body… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"026","note":"Visit date conflict: 30/08/2025 (events 017-020, labelled \"Monday\" but a Saturday) vs 8 Sept 2025 (tenant call eve… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Check Keystone confirmed the actual oven visit date; if so set_visit and update tenant; otherwise chase on… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
