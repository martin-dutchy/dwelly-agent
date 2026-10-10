# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant disputes the 30 Aug visit date and says 8 Sept was arranged. The record's "Monday 30/08" is a Saturday and the provider never confirmed a date. I asked the provider to confirm, told the tenant it is unconfirmed and asked if 8 Sept is acceptable, noted the conflicts, and set a hold and follow-up for 1 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance (event 009). Visit date unconfirmed: record says 30/08 "Monday" (a Saturday); tenant says 8 Sept. On hold waiting for the provider, review 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the actual visit date and whether anyone attended today, by 1 Sept | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, ask if 8 Sept is acceptable, and say she'll hear by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for provider reply, review 1 Sept | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record shows "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday, and the tenant says she arranged 8 September 2025 with you. Please reply by end of Monday 1 September with: (1) the date and slot you actually confirmed with the tenant, and (2) whether anyone attended today. Please don't treat any date as booked until you confirm it. If an earlier slot is possible, tell us. We'll then update the tenant.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 015 email)** (verified)

> Hi Clara, thanks for calling, and sorry for the muddle. Our record holds 30 August (10-12), but that was written as "Monday" and 30 August is a Saturday, so it looks wrong. You've told us 8 September. We have asked the repair company to confirm the actual date and whether anyone came today. Until they confirm, please treat 8 September as not yet confirmed by them. Since the oven is out of use, is 8 September acceptable to you? We can ask for an earlier slot if not. We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or confirmed; set_visit was not used because only the tenant stated 8 Sept.
- Messages do not establish whether anyone attended today or the cause of the fault or cost.

## Remaining work
- Provider to confirm date; then set_visit and update tenant and landlord (owner: agency ops, 1 Sept)
- Record work result after visit; quote/invoice handling if needed

## Missing or unavailable information
- Provider's confirmed date
- Whether a visit happened on 30/08
- Attachment from event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled 'Monday' but is a Saturday
- Tenant says 8 Sept vs record 30 Aug
- Provider and tenant names vary across events (Keystone Compliance/Riverside Works/Lantern Utilities; Clara/Grace Mercer/Ruben Oakley); treated as the same provider and tenant

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; provider assigned; visit date disputed (30/08 per record vs 8/9 per tenant) and unconfirmed by the provider; unknown if anyone attended today.

**2. What is the next action, who is it for, and through which channel?**

Provider asked to confirm the date by email (A1); tenant updated by email (A2); hold and follow-up for 1 Sept.

**3. Does anything need a human decision, and why?**

No. This is routine and one provider confirmation resolves it. Escalate only if the provider stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 015 email)","ticket… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Awaiting provider confirmation of true visit date (record 30/08 Saturday labe… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A4 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 say 30/08/2025 \"Monday\" (a Saturday); event 016 call only tentative; event 021 tenan… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-01","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date; then set_visit a… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Awaiting provider confirmation of true visit date (record 3… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A3: put_on_hold used the wrong ref (026); retried with NBL-026-date-conflict as A6, which verified.
