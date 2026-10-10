# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved sending Keystone Compliance for the oven fault. The 'confirmed' visit emails were premature, with a weekday/date mismatch and a provider name mismatch. I recorded the approval, asked the provider to confirm, corrected the tenant and set a follow-up for 28 Aug.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance. Visit NOT confirmed: only a tentative "Monday 10-12" from a call by Riverside Works; the system date 30/08/2025 is a Saturday. Waiting on the provider to confirm company and date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm which company is attending and the exact date/window; told them earlier 'confirmed' email was premature | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the visit is not yet confirmed, landlord has approved, next update by 28 Aug | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Follow-up 28 Aug to check provider confirmation, then set_visit | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please ignore the "confirmed" wording in our last email about the oven visit at Flat 3, 3 Willowmere Road. The only date so far is a tentative "Monday morning 10-12" agreed by phone, and the tenant was going to confirm by text. Our system shows 30/08/2025, which is a Saturday, so the day and date don't match. Also, the call on our record came from "Riverside Works" (Isaac Palmer), not Keystone Compliance. Please reply to confirm (1) which company is attending and (2) the exact date and 10-12 window you are offering once agreed with the tenant. We'll confirm the booking once you do.

**A3 · send_message → Clara (tenant) (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, a correction to our last email: the oven visit is not fully confirmed yet. The contractor suggested a Monday morning, 10-12, but the date we sent (30/08/2025) is a Saturday, so something is off. We've asked the contractor to confirm the exact day and company, and we'll then send you the confirmed details. If you've already texted them a day that suits you, that's fine, just let us know which. The landlord has approved the repair. We'll update you by Thursday 28 August at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked; set_visit was not used
- Landlord approval covers sending Keystone only, no quote or spend approved
- Cause of the oven fault is unknown

## Remaining work
- Provider to confirm company and date; then set_visit and tell the tenant
- Record result after the visit; quote loop if parts needed
- Obtain the unavailable attachment if needed

## Missing or unavailable information
- Which company is attending (Keystone vs Riverside Works)
- Exact confirmed date (Saturday 30/08 vs Monday 01/09)
- Tenant's confirmation of slot
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but messages say Monday
- Call from Riverside Works vs assigned Keystone Compliance
- Tenant named variously Clara, Ruben Oakley, Grace Mercer, Harriet Fletcher
- Contact numbers differ (07700 900721 vs 07700 900077)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and provider assigned, but the visit is unconfirmed: date/day mismatch, provider identity mismatch, tenant not confirmed.

**2. What is the next action, who is it for, and through which channel?**

Provider confirmation request by email to Keystone Compliance (sent), tenant correction by email to Clara (sent); follow-up 28 Aug.

**3. Does anything need a human decision, and why?**

No. It is routine and can be settled by asking the provider; escalate only if the provider does not answer by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025, reply to event 004 aski… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Clar… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026","due_on":"2025-08-28","party":"Keystone Compliance","purpose":"Check provider confirmed company and exact visit date… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-026","note":"Record conflicts: tenant named Clara / Ruben Oakley / Grace Mercer / Harriet Fletcher; call at event 016 from Ri… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
