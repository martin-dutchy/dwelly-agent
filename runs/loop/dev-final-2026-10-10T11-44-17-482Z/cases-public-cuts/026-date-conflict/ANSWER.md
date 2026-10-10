# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair approved by landlord and Keystone assigned. Booked date 30/08 is inconsistent (Saturday labelled Monday) and tenant says 8 Sept. Asked provider to confirm, told tenant it is unconfirmed, set follow-up for 2 Sept.

## Where the case stands
Ticket at visit stage. Landlord approved Keystone (event 009). Visit date disputed: record says 30/08/2025 "Monday" (a Saturday); tenant says 08/09/2025. Waiting on provider to confirm; follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the actual agreed visit date and whether anyone attended today | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 September is not yet confirmed, record holds 30/08, provider is being asked, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation; review 2025-09-02 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please can you confirm the date for the oven repair at Flat 3, 3 Willowmere Road. Our record says "Monday morning between 10 and 12 (30/08/2025)", but 30/08/2025 is a Saturday, and the tenant says she arranged 8 September 2025 with you. Did anyone attend this morning? Please reply with the date and slot you have actually agreed, and whether the tenant should expect you. Thank you.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hello, thanks for calling. Our record shows the visit as Monday morning 10-12 "30/08/2025", but that date is a Saturday, so something is wrong. Your 8 September date is not confirmed yet. We have asked Keystone to confirm which date they have agreed, and we will not treat any date as booked until they do. We will update you by the end of Tuesday 2 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked or changed; 8 September is only a tenant claim until Keystone confirms
- Does not establish the cause of the oven fault or cost
- Landlord approval covers sending Keystone only, not any quote

## Remaining work
- Provider to confirm date; then set_visit if future date confirmed by provider
- Record work result after visit; quote to landlord if needed
- Invoice and final checks

## Missing or unavailable information
- Provider's confirmed date
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday; tenant says 8 Sept; trusted neither until provider confirms
- Names differ (Ruben Oakley/Clara/Grace Mercer) and provider names differ (Keystone Compliance/Riverside Works/Lantern Utilities)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned, at visit stage; the visit date is in conflict (30/08 vs 08/09) and needs provider confirmation. Repair, any quote, invoice and closure are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone Compliance by email to confirm the date; update the tenant by email that 8 Sept is unconfirmed; follow up 2 Sept.

**3. Does anything need a human decision, and why?**

No. A provider question resolves it; no escalation needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider to confirm oven visit da… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: record 30/08/2025 \"Monday\" (a Saturday) vs tenant says 08/09/2025. Name/provider … | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
