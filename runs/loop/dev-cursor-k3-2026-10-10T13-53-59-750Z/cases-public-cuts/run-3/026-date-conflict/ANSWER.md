# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant disputes the visit date: the record says Saturday 30/08, which was labelled Monday, and she says she agreed Monday 8 Sept. I asked the provider to confirm attendance and the date, told the tenant that 8 Sept is not yet confirmed, noted the conflicts and set a follow-up for 2 Sept.

## Where the case stands
Oven repair approved by landlord ("Yes go ahead") and provider assigned. Visit recorded as 30/08/2025 10-12 (a Saturday, labelled Monday). The tenant says she agreed 8 Sept 2025. The provider has not confirmed either date, and nothing shows anyone attended today. We are waiting on the provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask the provider to confirm whether they attended today and whether 8 Sept 2025 is the agreed date, and which company is attending | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the record held 30/08, that 8 Sept is not yet confirmed, and when she will next hear from us | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 2 Sept if the provider has not replied; then set_visit once the provider confirms | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record holds the visit as "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday. The tenant has called to say she agreed Monday 8 September 2025 with your engineer. Please reply today to confirm: (1) did anyone attend this morning, and (2) is the agreed date 8 September 2025, and what time window? Please do not treat 8 September as booked until you confirm it. Our messages also named your company inconsistently, so please confirm which company is attending.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling. Sorry for the confusion. Our record shows the visit as Monday 30/08/2025, 10-12, but that date is a Saturday, so it looks like our messages were wrong. You told us you agreed Monday 8 September 2025 with the engineer. We have asked the contractor to confirm that date in writing. Until they do, it is not confirmed, and please don't wait in for anyone today. We'll update you as soon as they reply, and by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here books 8 Sept; it is a tenant proposal until the provider confirms.
- No work result was recorded, because attendance is unknown.
- The messages do not establish the cause of the fault or who pays.

## Remaining work
- Provider to confirm the date and attendance (agency ops, follow-up 2025-09-02)
- Then set_visit and update the tenant
- Visit, result, invoice and closing still to do
- Landlord not yet told of the date confusion; tell them if a rebook costs anything

## Missing or unavailable information
- Provider confirmation of the visit date
- Whether anyone attended on 30/08
- Attachment from event 014 (unavailable)

## Conflicts between sources
- Visit date: 30/08/2025 (system, events 017-020) vs 8 Sept 2025 (tenant, event 021). The record is kept until the provider confirms.
- 30/08/2025 is a Saturday but is labelled Monday.
- Inconsistent tenant, provider and phone-number names across events.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is approved and assigned. The visit date is disputed (30/08 on the record, 8 Sept per the tenant). The provider has not confirmed either date or whether they attended.

**2. What is the next action, who is it for, and through which channel?**

Email the provider to confirm attendance and the date (A1), and email the tenant with the status (A2). A follow-up is set for 2 Sept (A4).

**3. Does anything need a human decision, and why?**

No. Asking the provider to confirm the date is routine. If the provider is silent after the follow-up, consider a swap or escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"02… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"ticket 026","note":"Date conflict: system record/events 017-020 say 30/08/2025 (\"Monday\", but a Saturday); tenant (event 021) s… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider to confirm visit date (30/08 vs 8 Sept) an… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
