# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair approved by landlord and Keystone assigned. The visit date in the confirmation emails was wrong (30/08/2025 is a Saturday, not Monday) and was only tentative. I asked the provider to confirm, told the tenant it is unconfirmed, and set a follow-up for 27 Aug.

## Where the case stands
Job NBL-026 at visit stage. Landlord approved Keystone Compliance (event 009). A slot is only tentative: the tenant hasn't confirmed and the provider hasn't confirmed a valid date. The date and day conflict. We are waiting on Keystone to confirm; review 2025-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm exact visit date/time (Saturday/Monday conflict) and whether the Riverside Works call was them | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is not yet confirmed, correct the date error, next update by 27 Aug | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation, then set_visit | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please can you confirm the oven repair visit at Flat 3, 3 Willowmere Road? Our last email said "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday, so the day and date don't match. Please confirm the exact date and time you can attend. A call was also logged from "Riverside Works" tentatively offering Monday 10-12; please confirm whether that was you. The tenant is still to confirm that slot. Please also use the tenant contact number on our original job email (event 014). We'd like your reply by end of Wednesday 27/08. Thank you.

**A2 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, a quick correction on our last email. It gave the visit as "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday, so the day and date don't match. Please treat the visit as not yet confirmed, and don't expect anyone until we confirm it. We're asking the contractor to confirm the exact date and time. If Monday 10-12 suits you, please let us know. We'll update you by Wednesday 27 August.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed by these actions
- Does not establish the oven fault's cause or cost
- Landlord's 'Yes go ahead' covers sending a contractor, not any quote

## Remaining work
- Provider to confirm date; agency then set_visit and notify tenant
- Record result after visit; quote to landlord if needed; invoice and close
- Attachment from event 014 unavailable

## Missing or unavailable information
- Provider-confirmed date/time
- Whether Riverside Works is the same as Keystone Compliance
- Correct tenant name and number

## Conflicts between sources
- 30/08/2025 is a Saturday but described as Monday
- Call from Riverside Works vs assigned Keystone Compliance
- Tenant name and contact number vary across events
- Event 018/019 treat tentative slot as confirmed

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned; visit not truly confirmed (date/day mismatch, tenant yet to confirm, caller named Riverside Works). Outstanding: provider confirmation, visit, result.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance to confirm date/time, and email to tenant Clara saying it's unconfirmed; follow-up 27 Aug.

**3. Does anything need a human decision, and why?**

No. Routine; a provider confirmation resolves it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-026","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-026","note":"Conflicts: events 018/019 say Monday 30/08/2025 but that is a Saturday. Event 016 call was from \"Riverside Work… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026","due_on":"2025-08-27","party":"Keystone Compliance","purpose":"Chase provider to confirm visit date/time and identit… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
