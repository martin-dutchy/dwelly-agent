# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven visit date conflicts: the record says 30/08 (a Saturday labelled Monday) and the tenant says 8 Sept. I asked the provider to confirm the date and attendance, told the tenant it is unconfirmed, recorded the landlord approval, and set a follow-up for 2 Sept.

## Where the case stands
Stage: visit. Landlord approved. Visit date unconfirmed: record says 30/08 (a Saturday, already passed), tenant says 8 Sept (a Monday). Waiting on provider to confirm the date and whether they attended today.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the actual visit date and whether anyone attended on 30/08, by 1 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, record holds 30/08, we are checking and will update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation 2 Sept, then set_visit if confirmed | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, the oven repair at Flat 3, 3 Willowmere Road has conflicting dates. Our record holds Monday 10-12 shown as 30/08/2025, but that is a Saturday. The tenant has now told us she arranged 8 September 2025 (a Monday) with your team. Please reply by end of Monday 1 September to confirm: (1) the actual agreed date and time, and (2) whether anyone attended this morning (30/08). If 8 September is right, we will update the booking once you confirm. Please do not attend on any other date without confirming with us.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling. Sorry for the confusion over dates. Our record shows a visit on 30/08/2025 (labelled Monday, but that is a Saturday), while you've told us 8 September. We have not yet confirmed 8 September with the contractor, so it isn't booked until they confirm. We've asked them to confirm the correct date and whether anyone came this morning. Please don't expect anyone on a date they haven't confirmed. We'll update you by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed; 8 Sept is only the tenant's statement.
- Does not establish whether a contractor attended today.
- Landlord approval 'Yes go ahead' covers sending the contractor, no spend figure.

## Remaining work
- Provider to confirm the date; then set_visit and tell the tenant (agency, review 2 Sept)
- Record the work result after the visit
- Quote or invoice handling if needed

## Missing or unavailable information
- Provider's confirmed visit date
- Whether anyone attended on 30/08
- Attachment from event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday; 8 Sept 2025 is a Monday.
- Tenant call says 8 Sept; the record says 30/08.
- Provider/tenant names differ across events (Keystone/Riverside/Lantern; Clara/Ruben/Grace/Harriet); treated as the same job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord has approved, provider assigned. The visit date is disputed (30/08 vs 8 Sept) and unconfirmed. Whether the contractor attended today is unknown.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance to confirm the date and attendance, and an email to the tenant explaining the date is unconfirmed. Both sent.

**3. Does anything need a human decision, and why?**

No. It is routine, and the provider's answer will settle the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NBL-026-dat… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `record_landlord_decision` | {"ticket_ref":"NBL-026-date-conflict","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08","conditions":"… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after record_landlord_decision |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Check provider confirmed visit date (30… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: 30/08/2025 (events 017-020, labelled Monday but a Saturday) vs 08/09/2025 (tenant c… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
