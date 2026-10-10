# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date conflicts: the record holds Monday 30/08/2025 (a Saturday), while the tenant says 8 Sept was agreed. I asked the provider to confirm and told the tenant that 8 Sept is not yet confirmed. A follow-up is set for 2 Sept.

## Where the case stands
Routine oven repair, landlord approved ("Yes go ahead"), Keystone Compliance assigned. Visit date disputed: record says Mon 30/08/2025 10-12 (30/08 is actually a Saturday); tenant says 8 Sept was agreed. Waiting on provider to confirm; follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the real visit date and whether anyone attended today | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record holds 30/08, 8 Sept is unconfirmed, provider asked, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider reply; review 2025-09-02 | Keystone Compliance | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit for Monday morning 10-12, written as 30/08/2025 (which is a Saturday). The tenant has told us she arranged 8 September 2025 with you instead. Please confirm by reply: (1) which date and time is the real booking, and (2) whether anyone attended this morning. We will not treat 8 September as booked until you confirm it. Thank you.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call; event 015 email)** (verified)

> Hello Clara, thanks for your call. Our record currently shows the oven visit as Monday morning 10-12, written as 30/08/2025, and that date was in the reminder text. I understand you agreed 8 September with the engineer. I have asked Keystone Compliance to confirm which date is correct, so 8 September is not confirmed yet. Please don't worry about this morning's slot in the meantime. We will update you once they reply, and by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked for 8 September: only the tenant stated it
- No work result recorded: not confirmed whether anyone attended today
- Nothing shows the cause of the oven fault or the cost

## Remaining work
- Provider to confirm date; then set_visit with provider confirmation or rebook (agency ops)
- Record missed appointment/no access if confirmed
- Quote loop if parts needed, landlord approval needed beyond 'Yes go ahead'

## Missing or unavailable information
- Provider's confirmed date
- Attachment at event 014 unavailable
- Whether anyone attended 30/08

## Conflicts between sources
- Visit date 30/08/2025 (events 017-020) vs 8 Sept 2025 (event 021, tenant only); 30/08/2025 is a Saturday but described as Monday
- Names inconsistent across records (Ruben Oakley/Clara/Grace Mercer/Harriet Fletcher; Keystone Compliance/Riverside Works/Lantern Utilities/Keystone Utilities); treated as record noise, flagged
- Tenant contact numbers differ between events 014, 018 and 020

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; visit date disputed (30/08 per record vs 8 Sept per tenant); provider confirmation outstanding, no result recorded.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm the date and attendance; email tenant that the date is being confirmed. Both sent.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation the provider can settle. Escalate only if the provider stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call; event 015 email)"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider to confirm oven visit date (30/08 vs 08/09… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
