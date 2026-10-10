# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Date conflict between record (30/08, a Saturday) and tenant (8 Sept). Asked provider to confirm, told tenant the date is unconfirmed and asked whether it's acceptable, informed landlord, noted conflict and scheduled follow-up for 2 Sept.

## Where the case stands
Provider assigned (Keystone Compliance) with landlord approval. Visit date unconfirmed: record says 30/08/2025 (a Saturday, labelled Monday), tenant says 8 Sept. Awaiting provider confirmation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the actual agreed date and whether anyone attended on 30/08 | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the 8 Sept date is unconfirmed, ask if acceptable, offer sooner slot | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up with provider on 2 Sept | Keystone Compliance | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit of 30/08/2025, 10-12 (described as "Monday", but 30/08 is a Saturday). The tenant says she arranged 8 September 2025 (a Monday) with you. Please reply by end of Monday 1 September to confirm: (1) which date you actually agreed, and (2) whether anyone attended today. Please do not attend on any date the tenant has not agreed. Also, please resend the job attachment if it was unreadable, and let us know your findings or a quote if one is needed.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi Clara, thanks for calling, and sorry for the confusing messages. Our record holds 30/08/2025, 10-12, but that date doesn't match "Monday", so we can see something is wrong. Your 8 September date is not confirmed by the contractor yet. I've asked them to confirm the real date and whether anyone came today, and nobody should be expected on a date they haven't confirmed. As the oven is out of use, is 8 September acceptable? If not, I'll ask for a sooner slot. You'll hear from us again by Tuesday 2 September.

**A3 · send_message → Palmer (landlord) via email, agency landlord record** (verified)

> Hello, update on the oven repair at Flat 3, 3 Willowmere Road: Keystone Compliance was instructed on your approval. The visit date is currently unclear (our record says 30/08, the tenant says 8 September). We've asked the contractor to confirm, and will update you once we hear, by 2 September. No action needed from you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit: neither date is provider-confirmed
- Does not establish the oven fault cause or cost
- Landlord approval 'Yes go ahead' covers sending the contractor, not a quote

## Remaining work
- Provider to confirm date and whether 30/08 was attended; agency then sets visit and updates tenant and landlord (2 Sept)
- Record work result or quote after visit

## Missing or unavailable information
- Provider's confirmed date
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday; tenant says 8 Sept (Monday)
- Provider/tenant name mismatches (Keystone Compliance/Riverside Works/Lantern Utilities; Clara/Grace Mercer/Ruben Oakley) treated as same job
- Tenant SMS contact number differs between events

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned, visit date disputed and unconfirmed by provider; outcome of 30/08 unknown.

**2. What is the next action, who is it for, and through which channel?**

Provider confirmation request by email to Keystone Compliance; tenant reply by email; landlord update by email.

**3. Does anything need a human decision, and why?**

No. Routine date confirmation with the provider can resolve it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","ticket… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Palmer","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"026","body":"Hello… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: 30/08/2025 (events 017-020, labelled \"Monday\" but is a Saturday) vs 08/09/2025 (tenant call event 0… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date and whether 30/08… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
