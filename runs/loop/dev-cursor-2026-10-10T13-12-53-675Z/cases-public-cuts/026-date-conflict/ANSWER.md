# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is approved and assigned, but the visit date is disputed. The record says 30/08 (a Saturday, labelled "Monday") and the tenant says 8 Sept. I asked the provider to confirm, told the tenant 8 Sept is not yet confirmed, and put the job on hold to 2 Sept.

## Where the case stands
Stage: visit. Landlord approved (Keystone). Record holds visit 30/08/2025 (Saturday, labelled "Monday"); tenant says she arranged 8 Sept. Waiting on provider to confirm; on hold to 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the correct visit date, whether they attended 30/08, and the window, by 2 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record holds 30/08, 8 Sept is unconfirmed, we are checking with provider, update by 2 Sept | Tenant (Clara) | email | A2 ✅ |
| 3 | WAIT | Hold awaiting provider confirmation, review 2025-09-02 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit of "Monday morning 10-12 (30/08/2025)", but 30 August is a Saturday, and the tenant now says she arranged 8 September 2025 (a Monday) with you. Please reply by 2 September to confirm: (1) which date you agreed, (2) whether anyone attended this morning, and (3) your attendance window. We will not tell the tenant a date is booked until you confirm it.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi, thanks for letting us know. Our record shows the oven visit as "Monday morning (30/08/2025)", which was today, but you've told us you arranged 8 September. That date is not confirmed yet: we've asked the engineer to confirm the correct date and will update you by 2 September. Please don't expect anyone before they confirm. If someone did turn up or call today, do let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked: 8 Sept is only the tenant's claim until the provider confirms.
- Does not establish whether the 30/08 visit happened or the cause of the oven fault or cost.

## Remaining work
- Provider to confirm date; then set_visit or record_work_result (missed/no access) as appropriate
- Quote/invoice and final checks after the visit
- Agency to review hold on 2025-09-02

## Missing or unavailable information
- Provider's confirmed date
- Whether anyone attended 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- Visit date: 30/08 (events 017-020) vs 8/09 (event 021). 30/08/2025 is a Saturday but is labelled Monday; 8/09 is a Monday. Neither is provider-confirmed.
- Names differ across the thread (Keystone Compliance / Riverside Works / Keystone Utilities / Lantern Utilities; tenant Clara / Grace / Ruben). Treated as one job at the same property.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone. The visit date is in conflict (30/08 in the record vs 8/09 per tenant). Provider confirmation and whether the 30/08 visit happened are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone to confirm the date (sent), and email the tenant that the date is unconfirmed (sent). Hold until 2 Sept.

**3. Does anything need a human decision, and why?**

No. It is routine, and the provider can settle the date by answering one question.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","body"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Waiting for Keystone to confirm which visit date is correct (30/08 vs 8/09) a… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone to confirm which visit date is correct… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A3: First put_on_hold used the wrong ref (026). Found the right ref via list_tickets and retried as A4, which verified.
