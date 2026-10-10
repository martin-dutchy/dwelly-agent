# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair visit date is disputed: system says Saturday 30/08 (labelled Monday), tenant says 8 Sept. I asked the provider to confirm, told the tenant it is not yet booked, noted the conflict and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (Keystone Compliance) with landlord approval ("Yes go ahead"). Visit date disputed: record says 30/08/2025 (a Saturday, labelled Monday); tenant says 8 Sept agreed. Waiting on provider to confirm date and whether they attended today. Follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Keystone Compliance to confirm whether they attended on 30/08 and which date (8 Sept?) is booked | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant record holds 30/08, 8 Sept is not yet confirmed, we are checking with provider, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation; chase 2 Sept | Keystone Compliance, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Did you attend Flat 3, 3 Willowmere Road this morning (30/08/2025)? Our record shows a slot of 'Monday morning 10-12 (30/08/2025)', but 30/08 is a Saturday.
> - The tenant says she agreed Monday 8 September 2025, 10-12, with you. Can you confirm whether 8 September is the date you hold?
> - Please confirm the date and slot in writing so we can book it.
> 
> Why: Tenant and our record disagree on the visit date; only the provider can confirm a booking.

**A2 · send_message → Clara (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, thanks for calling. Our record holds the visit as "Monday morning 10-12 (30/08/2025)", but 30/08 is a Saturday, so that looks like a mix-up on our side. You've told us you agreed Monday 8 September; we haven't had that confirmed by the contractor yet, so please treat it as not yet booked. We've asked Keystone Compliance to confirm the correct date in writing, and we'll update you as soon as they reply, and by Tuesday 2 September at the latest. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked; 8 Sept is only the tenant's proposal until the provider confirms.
- No work result recorded; we do not know if anyone attended today.
- Does not establish the cause of the oven fault or cost.

## Remaining work
- Provider to confirm date; then set_visit if future date confirmed (agency)
- Record work result after visit, then invoice and closing checks
- Tidy inconsistent provider/tenant names in records

## Missing or unavailable information
- Provider's confirmation of the visit date and whether they attended 30/08
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 (system, events 017-020) vs 08/09/2025 (tenant, event 021); 30/08 is a Saturday though described as Monday.
- Provider and tenant names vary across events (Keystone Compliance/Riverside Works/Lantern Utilities; Clara/Ruben Oakley/Grace Mercer). Treated as the same job on the same thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone Compliance; visit date unconfirmed (30/08 on record vs tenant's 8 Sept). Outstanding: provider confirmation, visit, result, invoice.

**2. What is the next action, who is it for, and through which channel?**

Provider asked by email to confirm the date and attendance; tenant told by email that 8 Sept is not yet confirmed; chase 2 Sept.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","body":"Hi Clara, thanks… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Chase Keystone Compliance for written confirmation of oven visit date (30/08 vs 08/09) and whether they at… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"ticket","note":"Date conflict: events 017-020 hold 30/08/2025 (\"Monday\", but a Saturday); tenant (event 021) says 08/09/2025 ag… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
