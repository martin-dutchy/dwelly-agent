# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit date conflict (30/08 Saturday labelled Monday vs tenant's 8 Sept). I asked Keystone to confirm, told the tenant it is unconfirmed, noted the conflicts and put the job on hold to 1 Sept. No human decision needed.

## Where the case stands
Stage: visit. Landlord approved Keystone ("Yes go ahead"). Visit date disputed: record says Sat 30/08/2025 (labelled Monday), tenant says 8 Sept. Provider has not confirmed either. On hold waiting for provider, review 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm which date they hold, whether anyone attended today, and confirm 8 Sept slot if correct | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, record held 30/08, we are checking 8 Sept, update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting provider confirmation, review 2025-09-01 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello. Oven repair at Flat 3, 3 Willowmere Road. Our booking says "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday, and the tenant says she arranged Monday 8 September 2025 with your engineer. Please reply today to confirm: (1) which date you actually hold, (2) whether anyone attended this morning, and (3) if 8 September, that the 10-12 slot is confirmed. We will not tell the tenant a date is booked until you confirm. Please reply by end of Monday 1 September.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, sorry for the confusion over dates. Our record shows 30/08/2025 (this morning), which was wrong as it's a Saturday, and the reminder text you got repeated it. You've told us you arranged Monday 8 September. We are checking that with the engineers now and it is not confirmed yet, so please don't expect anyone on any date until we confirm. If someone was due this morning and didn't come, let us know. We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or rebooked; 8 Sept is only the tenant's claim.
- Landlord approval covers sending Keystone only, not any quote.
- Cause of oven fault not established.

## Remaining work
- Provider to confirm date; then set_visit if 8 Sept confirmed (agency/ops)
- Record work result after the visit
- Quote to landlord if parts needed
- Correct the weekday/date error in system messages

## Missing or unavailable information
- Provider's confirmed visit date and whether they attended 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but labelled Monday in events 018-020; tenant says 8 Sept (a Monday). Treated as unconfirmed pending provider.
- Provider named as Keystone Compliance, Riverside Works, Lantern Utilities, Keystone Utilities; tenant named Clara, Ruben, Grace, Harriet.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned with landlord approval; visit date disputed (30/08 per record vs 8 Sept per tenant); provider confirmation outstanding, then the visit, result and any quote.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance to confirm the date (done), and email to tenant Clara saying the date is unconfirmed (done); hold review 1 Sept.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation; escalate only if the provider stays silent after follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hi Clara, sorry f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 hold 30/08/2025 \"Monday\" (a Saturday); tenant call event 021 says 8 Sept 2025 (a Mon… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Waiting for Keystone to confirm visit date (30/08 vs 08/09) and whether anyon… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone to confirm visit date (30/08 vs 08/09)… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-01","party":"Keystone Compliance","purpose":"Chase provider to confirm visit date; u… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A4: First hold used wrong ref (026); retried with NBL-026-date-conflict as A5, verified.
