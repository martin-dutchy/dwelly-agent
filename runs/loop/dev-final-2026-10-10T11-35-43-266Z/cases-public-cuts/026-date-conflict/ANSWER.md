# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant disputes the visit date (record 30/08 vs her 8 Sept). I asked the provider to confirm the date and attendance, told the tenant the record date and that 8 Sept is unconfirmed, and set a follow-up for 1 Sept.

## Where the case stands
Landlord approved (event 009); provider assigned; visit recorded as 30/08/2025 10-12. Tenant says 8 Sept was agreed. Waiting on provider to confirm date and whether the visit happened.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm correct visit date (30/08 vs 8 Sept) and whether anyone attended today | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record holds 30/08, 8 Sept not confirmed, provider being asked | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Review 2025-09-01 for provider reply; then set_visit or record result | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record holds the visit as Monday 30/08/2025, 10-12 (events 017/018). The tenant has called today to say she arranged 8 September 2025 with you instead. Please confirm by reply: (1) which date is correct, and (2) whether anyone attended this morning. Please do not treat 8 September as booked until you confirm it. Thank you.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call; event 015 email)** (verified)

> Hello, thanks for calling. Our record currently shows the oven visit as Monday 30/08/2025, 10-12, and that is the date in the confirmation we sent. We haven't been able to confirm 8 September yet, so please don't treat it as booked. We have asked the contractor to confirm the correct date and whether anyone came today, and we'll update you as soon as they reply. If anyone did turn up this morning, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit rebooked: 8 Sept is only a tenant statement.
- No work result recorded; not established whether the 30/08 visit happened or was missed.
- Does not establish the oven fault cause or cost.

## Remaining work
- Provider to confirm date/attendance; then set_visit or record missed appointment and rebook
- Oven repair itself outstanding

## Missing or unavailable information
- Provider's confirmed date
- Whether anyone attended on 30/08
- Event 014 attachment unavailable

## Conflicts between sources
- Visit date 30/08 (system record, events 017-020) vs 8 Sept (tenant call, event 021); trusted the record until the provider confirms.
- Tenant and provider names and company names vary across events.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned, visit recorded 30/08 10-12 (already past at the decision point); tenant says 8 Sept. Date and attendance unconfirmed; repair outstanding.

**2. What is the next action, who is it for, and through which channel?**

Provider (Keystone Compliance) asked by email to confirm date and attendance; tenant updated by email; follow-up 2025-09-01.

**3. Does anything need a human decision, and why?**

No. A provider question resolves it; escalate only if the provider stays silent after chasing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call; event 015 email)"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-01","party":"Keystone Compliance","purpose":"Chase provider to confirm oven visit date (30/08 vs 8 Sep… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: record 30/08/2025 10-12 (events 017-020); tenant says 08/09/2025 (event 021, tenant statement only). … | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
