# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit date conflict between the record (30/08, a Saturday mislabelled Monday) and the tenant's 8 September. I asked the provider to confirm and told the tenant that 8 Sept isn't confirmed yet. Follow-up set for 1 Sept.

## Where the case stands
Provider (Keystone Compliance) assigned with landlord approval. Visit date disputed: record says 30/08/2025 10-12 (a Saturday, labelled Monday); tenant says 8/9/2025. Waiting on provider to confirm date and whether anyone attended today.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm which visit date is correct and whether anyone attended 30/08 | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8/9 is unconfirmed, we're checking, next update by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up with provider on 2025-09-01 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, we need to confirm the date for the oven repair at Flat 3, 3 Willowmere Road. Our record holds "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday. The tenant says she agreed 8 September 2025 with your engineer by phone. Please reply by end of Monday 1 September to say: (1) did anyone attend this morning, and (2) which date and time slot you have confirmed. We will not treat 8 September as booked until you confirm it.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hello, thanks for checking, and sorry for the mixed-up messages. Our record currently shows 30/08/2025, 10-12 (which was today), and the reminder you got said the same. You've told us you agreed 8 September with the engineer. We've asked the contractor to confirm which date is right, and 8 September isn't confirmed until they do. Please don't expect anyone on a date they haven't confirmed. We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or rebooked; 8 September is not confirmed.
- Does not establish whether the contractor attended today or the cause of the oven fault.

## Remaining work
- Provider to confirm date; then set_visit if 8 Sept confirmed, or record missed appointment if they didn't attend (agency, 1 Sept)
- Complete the repair, quote if needed, invoice and close

## Missing or unavailable information
- Provider's confirmed date
- Whether anyone attended 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday
- Record 30/08 vs tenant 8/9
- Inconsistent names for tenant and provider across events; treated as the same job

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone Compliance; visit date is in dispute (30/08 on record vs tenant's 8/9); provider confirmation outstanding, then the repair itself.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm the date and attendance; email to the tenant explaining the position; follow-up 1 Sept.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation that a provider query can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check provider has confirmed visit date (30/08 vs 08/09) and whether anyone attended 30/08; update tenant"… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 say Monday 30/08/2025 (a Saturday); tenant call event 021 says arranged 8/9/2025 (a Mo… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
