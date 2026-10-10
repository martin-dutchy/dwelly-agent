# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The recorded visit date (30/08, called "Monday") is a Saturday, and the tenant says it was arranged for 8 Sept. Only the tenant has stated 8 Sept, so I asked the provider to confirm. I told the tenant the date is unconfirmed, logged the conflict and set a follow-up for 2 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance. The recorded visit is 30/08/2025 10-12, labelled "Monday" but it is a Saturday. The tenant says the visit is 8 Sept. The provider has not confirmed either date. Waiting on the provider to confirm.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the visit date (30/08 vs 08/09), say whether anyone attended today, and not to attend until confirmed | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the record holds 30/08, that 8 Sept is unconfirmed and being checked with the provider, and that we will update her by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up with provider on 2025-09-02; then set_visit once the provider confirms the date | Keystone Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, the oven repair at Flat 3, 3 Willowmere Road has a date conflict. Our record says "Monday morning between 10 and 12 (30/08/2025)", but 30/08/2025 is a Saturday. The tenant says she arranged the visit with you for Monday 8 September 2025. Please confirm by reply which date and time you have agreed, and whether anyone attended today. Please do not attend until the date is confirmed. Thank you.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hello Clara, thanks for calling. Our record holds Monday 30/08/2025, 10-12, but that date was a Saturday, so it looks like an error. You mentioned 8 September, but that is not confirmed yet. We have asked Keystone Compliance to confirm the date, and please don't expect anyone until they have. If someone did call today, please let us know. We will update you by Tuesday 2 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed; 8 Sept is not confirmed
- Does not establish the oven fault's cause or cost
- Does not establish whether anyone attended today

## Remaining work
- Provider to confirm the date; then set_visit and update the tenant (agency, review 2 Sept)
- After the visit: record the result, any quote goes to the landlord, then invoice and close

## Missing or unavailable information
- Provider-confirmed visit date
- Whether anyone attended on 30/08
- Event 014 attachment unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday is a Saturday
- Record 30/08 vs tenant 8 Sept
- Provider and tenant names vary across events (Keystone / Riverside Works / Lantern Utilities; Clara / Ruben / Grace)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved the contractor and the visit stage is open. The visit date is disputed (30/08 on the record vs 8 Sept per the tenant). The provider has not confirmed either date, and it is unknown whether anyone attended today.

**2. What is the next action, who is it for, and through which channel?**

Provider date-confirmation request by email to Keystone Compliance (done), and a status reply by email to the tenant (done). Follow-up on 2 Sept.

**3. Does anything need a human decision, and why?**

No. This is routine and one question to the provider resolves it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NBL-026-dat… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: events 017-020 record 30/08/2025 \"Monday\" (a Saturday); tenant (event 021) says v… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider to confirm visit date (3… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
