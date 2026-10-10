# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approval recorded and the date conflict found (30/08 is a Saturday; call said Monday, tentative). Asked the provider to confirm the date, told the tenant it is unconfirmed and offered a sooner slot, updated the landlord, and set a follow-up for 27 Aug.

## Where the case stands
Ticket NBL-026 at visit stage. Landlord approved Keystone Compliance ("Yes go ahead"). Visit date is unconfirmed: system says 30/08/2025 (a Saturday) but the call said Monday 10-12 (1 Sept), tentative, tenant to confirm by text. Waiting on provider to confirm the date; follow-up 27 Aug.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the actual visit date (Saturday 30/08 vs Monday 1 Sept) and which company is attending | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit is not confirmed, correct the date error, ask whether Monday is acceptable for an unusable oven and offer a sooner slot | Clara, tenant | email | A3 ✅ |
| 3 | OTHER | Update landlord on visit status and that any quote returns for approval | Palmer, landlord | email | A4 ✅ |
| 4 | WAIT | Follow up on provider date confirmation on 27 Aug, then set_visit | Keystone Compliance, contractor | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please can you confirm the actual date and time of your oven repair visit at Flat 3, 3 Willowmere Road. Our last email said "Monday morning between 10 and 12 (30/08/2025)", but 30/08/2025 is a Saturday and Monday is 1 September. The tenant has only tentatively agreed a Monday 10-12 slot by phone and was to confirm by text. Please reply with the exact date you can attend; nobody should be expected until you do. Also note the call summary named Riverside Works, so please confirm you are the company attending. Please also use the tenant's number 07700 900721 as sent in our first email; the 07700 900077 number in the later email is being checked. If a quote is needed, send it to us for landlord approval before starting any work.

**A3 · send_message → Clara (tenant) (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, sorry for the confusion in our last email. It gave the visit as "Monday morning between 10 and 12 (30/08/2025)", but 30/08/2025 is a Saturday and Monday is 1 September. The visit is not confirmed yet: we have asked the contractor to confirm the exact date and nobody should be expected until they do. Please also text the contractor to confirm what suits you. Since the oven is out of use, is a Monday visit acceptable, or would you like us to ask for a sooner slot? The landlord has approved the contractor coming to look at it. We'll update you by Wednesday 27 August.

**A4 · send_message → Palmer (landlord) (landlord) via email, agency landlord record** (verified)

> Thanks for approving Keystone Compliance to look at the oven. Update: a visit has been tentatively arranged for a Monday morning, but our email gave a date that was a Saturday, so we are asking the contractor to confirm the exact date. If they need a quote for repairs, we will send it to you for approval before any work starts. We'll update you once the date is confirmed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms a visit date; it is not booked until the provider confirms.
- Landlord approval covers attendance only, not any repair spend or quote.
- Cause of the oven fault and who pays are not established.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant and landlord (agency ops)
- Result of visit and any quote to landlord for approval
- Verify tenant contact number and the provider identity

## Missing or unavailable information
- Provider-confirmed visit date
- Which company is attending (Keystone vs Riverside Works)
- Correct tenant contact number
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but described as Monday (1 Sept); call was tentative only
- Provider Keystone Compliance vs Riverside Works in call
- Tenant named Clara / Ruben Oakley / Grace Mercer / Harriet Fletcher
- Contact numbers 07700 900721 vs 07700 900077

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved sending Keystone Compliance. A visit appears booked but the date is contradictory and unconfirmed by the provider. Outstanding: provider-confirmed date, visit result, any quote.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance to confirm the actual date; email to tenant Clara saying it is unconfirmed; email to landlord with status. Follow-up on 27 Aug.

**3. Does anything need a human decision, and why?**

No. This is routine and handled by confirmation requests and a dated follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email, 2025-08-26 (reply to event 004 asking … | 1 | ❌ failed | Ticket 026 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Palmer (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"026","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"026","note":"Conflicts: visit stated as 30/08/2025 (Saturday) vs \"Monday\" (1 Sept); event 016 call tentative only, tenant to co… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-08-27","party":"Keystone Compliance","purpose":"Chase provider to confirm actual visit date (30/08 is a S… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email, 2025-08-26","conditions":"Covers s… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A8 | `resume_auto` | {"ticket_ref":"NBL-026"} | 1 | ✅ verified | Ticket NBL-026 read back after resume_auto |

## Failed or unverified actions
- A1: Used wrong ref '026'; retried with NBL-026 as A7, verified.
