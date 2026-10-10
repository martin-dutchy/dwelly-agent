# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date conflicts: the record says Monday 30/08 (a Saturday) and the tenant says 8 September. I asked the provider to confirm the real date, told the tenant it is unconfirmed, noted the conflict and set a follow-up for 1 September.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved ("Yes go ahead"). Visit date unconfirmed: record says Mon 30/08/2025 (actually a Saturday), tenant says 8 Sept. Waiting on provider to confirm; follow-up set for 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the actual visit date/slot and not attend until confirmed | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the 30/08 date looks wrong, 8 Sept is unconfirmed, we are confirming with provider, update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation, review 2025-09-01 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, the oven repair visit at Flat 3, 3 Willowmere Road has conflicting dates. Our record (and the tenant's reminders) says "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday. The tenant says she agreed 8 September 2025 with you. Please reply by end of Monday 1 September with the exact date and time slot you have agreed with the tenant. Please do not attend until you have confirmed this to us and to the tenant. Note: the job also references Riverside Works / Lantern Utilities in places; please confirm you are the company attending.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, thanks for letting us know, and sorry for the confusing messages. Our record shows the visit as "Monday morning 10-12 (30/08/2025)", but 30 August is a Saturday, so that looks wrong. You've told us 8 September was agreed. That date is not confirmed yet: we've asked the contractor to confirm the exact date and time with us and with you. Please don't expect anyone until they confirm. We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked; set_visit not used because only the tenant stated 8 Sept.
- Nothing established about the oven fault, cause, cost or who pays.

## Remaining work
- Keystone to confirm date; then set_visit and tell tenant
- Visit result, quote/invoice and close-out

## Missing or unavailable information
- Provider-confirmed visit date
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday
- Tenant says 8 Sept vs record 30/08; trusted neither until provider confirms
- Names/companies inconsistent (Ruben Oakley/Clara/Grace Mercer; Keystone/Riverside Works/Lantern Utilities)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone; the visit date is in conflict (30/08 Saturday vs tenant's 8 Sept) and unconfirmed by the provider.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone by email to confirm the date; reply to the tenant by email that it is unconfirmed; follow-up 1 Sept.

**3. Does anything need a human decision, and why?**

No. This is routine and one question to the provider resolves it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","body":"Hi Clar… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 say Monday 30/08/2025 (a Saturday); tenant call event 021 says 8 Sept agreed. Provider… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check Keystone has confirmed actual oven visit date (30/08 vs 08/09); then set_visit and update tenant","p… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
