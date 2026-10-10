# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Records show a 30/08 visit labelled Monday (actually Saturday); tenant says 8 Sept was agreed. I asked the provider to confirm, told the tenant the date is not confirmed yet, noted the conflicts and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved. Visit date disputed: record says 30/08/2025 (a Saturday, labelled "Monday"); tenant says 8 Sept 2025 was agreed. Waiting on provider to confirm; no work result yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the agreed visit date (30/08 vs 8 Sept) and whether anyone attended today | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, we are checking with provider, update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation on 2025-09-02 | Keystone Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our booking says "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday. The tenant says she agreed 8 September 2025 with you, and did not expect a visit today. Please confirm by reply (a) the date and time you agreed with the tenant and (b) whether anyone attended today. Please don't treat the 30/08 slot as the booking until you confirm. Thank you.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi Clara, thanks for letting us know and sorry for the confusion. Our record shows 30/08/2025 (a Saturday, so the wording "Monday" didn't match). You've told us you agreed 8 September 2025 with the contractor. That date isn't confirmed on our side yet, so I've asked the contractor to confirm it in writing. We'll update you as soon as they reply, and by Tuesday 2 September at the latest. Please don't worry about today's slot, we're sorting it with them.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not book or change any visit; 8 Sept is unconfirmed until the provider says so.
- Nothing here establishes the oven fault cause, cost, or that a missed visit occurred.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency)
- Visit, result, any quote to landlord, invoice, closing

## Missing or unavailable information
- Provider's confirmation of the agreed date
- Whether a visit was attempted on 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday (events 017-020)
- Tenant says 8 Sept 2025 (event 021) vs system 30/08; trusted neither until provider confirms
- Provider/tenant names inconsistent across records (Keystone/Riverside Works/Lantern Utilities; Clara/Ruben/Grace/Harriet)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned; the visit date is in conflict (30/08 Saturday in the record vs 8 Sept per tenant). Provider confirmation is outstanding, then visit, result and any quote/invoice.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm the date; email to the tenant saying it is unconfirmed; follow-up set for 2 Sept.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation that the provider can settle. Escalate only if they stay silent past the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","body":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 3, 3 Willowmere Road oven ticket","note":"Date conflict: system/emails/SMS hold 30/08/2025 \"Monday\" (a Saturday); tenant (… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Check provider confirmed oven visit date (30/08 vs 8 Sept); then set_visit and update tenant","party":"Key… | 2 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
- A4: First attempt not applied; retried once and verified as FUP-105.
