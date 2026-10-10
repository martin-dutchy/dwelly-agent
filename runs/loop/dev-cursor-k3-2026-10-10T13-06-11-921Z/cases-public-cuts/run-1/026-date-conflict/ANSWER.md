# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Records show a Saturday 30/08 visit labelled Monday, while the tenant says 8 Sept was agreed. I asked the provider to confirm, told the tenant it is unconfirmed, noted the conflict and put the job on hold to 2 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone (event 009). Visit date disputed: record says 30/08/2025 10-12 (a Saturday, labelled Monday); tenant says 8 Sept 2025. Waiting on provider; on hold to 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm whether they attended today and whether the visit is Monday 8 Sept 2025 | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, record holds 30/08, update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until provider confirms; review 2025-09-02 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record shows a visit on 30/08/2025, 10-12, but it was written as "Monday" and 30/08 is a Saturday. The tenant says she arranged 8 September 2025 with your engineer. Please reply to confirm: (1) did anyone attend this morning, and (2) is the visit on Monday 8 September 2025, and what time slot? We will not treat 8 September as booked until you confirm.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling. Our record currently holds 30/08/2025 (10-12), which looks like a mix-up as it was described as a Monday. You told us you agreed 8 September 2025 with the engineer. We have asked the repair company to confirm that date and whether anyone came today. Until they confirm it, it isn't officially booked, so please don't worry about today's slot. We will update you by Tuesday 2 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not book 8 September; set_visit not used as only the tenant stated it
- Do not establish whether anyone attended on 30/08 or the oven fault cause/cost

## Remaining work
- Provider to confirm attendance and date; then set_visit if 8 Sept confirmed, or record no_access/missed if they did not attend
- Chase provider on 2025-09-02 if silent
- Obtain quote/invoice if needed

## Missing or unavailable information
- Provider confirmation of the visit date and whether they attended 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but described as Monday (events 018-020)
- Tenant says 8 Sept; record says 30/08; trusted record until provider confirms
- Names inconsistent: Clara/Ruben Oakley/Grace Mercer; Keystone/Riverside Works/Lantern Utilities

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved, Keystone assigned, visit date disputed (30/08 in record vs 8 Sept per tenant). Provider confirmation of attendance and date is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone Compliance by email to confirm; reply to tenant by email that 8 Sept is not yet confirmed. Both sent.

**3. Does anything need a human decision, and why?**

No. It is routine and a provider confirmation resolves it. Escalate P3 only if the provider stays silent after review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hi Clara, thanks … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm whether 30/08 visit happened an… | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A4 | `add_note` | {"entity":"R-4815","note":"Date conflict: events 017-020 say Monday 30/08/2025 (a Saturday); tenant call event 021 says 8 Sept 2025 (a Monda… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm whether 30/08 vi… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A3: First put_on_hold used a wrong ticket ref; retried with NBL-026-date-conflict as A5, which verified.
