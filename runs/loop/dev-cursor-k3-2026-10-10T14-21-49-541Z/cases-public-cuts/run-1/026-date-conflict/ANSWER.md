# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The visit date is disputed: the system holds 30/08/2025, which is a Saturday and has passed, while the tenant says 8 September. I asked the provider to confirm, told the tenant the date is unconfirmed, and put the job on hold with a review on 1 Sept.

## Where the case stands
Stage: visit. Landlord approved sending Keystone (event 009). Visit date disputed: record says 30/08/2025 (a Saturday, now passed), tenant says 08/09/2025. Provider has not confirmed either. On hold, waiting for provider, review 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm whether anyone attended on 30/08 and the actual agreed date, by 1 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the date is unconfirmed, nobody should be expected until the provider confirms, ask if 8 Sept is acceptable given the oven is out of use, and say she'll hear from us by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting provider confirmation, review 2025-09-01 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit on Monday morning 10-12 dated 30/08/2025, but 30/08/2025 is a Saturday. The tenant has now called to say she arranged the visit for 8 September 2025 instead. Please reply by end of Monday 1 September to confirm: (1) did anyone attend this morning (30/08)? (2) what exact date and time slot have you agreed with the tenant? We will not treat a new date as booked until you confirm it. Note the earlier messages also named Riverside Works and Lantern Utilities, so please confirm which company is attending. Thank you.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling, and sorry for the confusion. Our record holds the visit as Monday morning 10-12 dated 30/08/2025, but that date is a Saturday, so something is wrong. You've told us you arranged 8 September. We haven't had that date confirmed by the contractor yet, so I can't call it booked. I've asked them to confirm the date today; please don't expect anyone until they do. As your oven is out of use, is 8 September acceptable? If not, I'll ask for a sooner slot. We'll update you by Monday 1 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or rescheduled; 8 Sept is only the tenant's proposal
- Nothing establishes whether anyone attended on 30/08 or the cause of the oven fault
- Landlord's 'Yes go ahead' covers sending the contractor, not any quote or spend

## Remaining work
- Provider to confirm the date; then set_visit if confirmed (agency)
- Record work result after visit; quote to landlord if needed
- Review 2025-09-01; offer a sooner slot if the tenant finds 8 Sept too late

## Missing or unavailable information
- Provider's confirmation of the actual visit date and whether 30/08 was attended
- Attachment at event 014 not seen

## Conflicts between sources
- 30/08/2025 is a Saturday but is described as 'Monday' (events 017-020)
- Tenant says 8 Sept (event 021) vs record 30/08
- Provider and tenant names differ (Keystone Compliance/Riverside Works/Lantern Utilities; Clara/Ruben Oakley/Grace Mercer); treated as the same job

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved sending the contractor. The visit date is in conflict (30/08 on record, which is a Saturday, vs 8 Sept per the tenant). The provider has not confirmed. Whether the 30/08 slot was attended is also unknown.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm the date and attendance, and an email to the tenant explaining the date is unconfirmed. Hold until 1 Sept.

**3. Does anything need a human decision, and why?**

No. This is routine and one provider confirmation resolves it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"026","body"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"026","note":"Date conflict: events 017-020 hold \"Monday 30/08/2025\" (a Saturday; system-selected, event 016 call only tentative… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm whether 30/08 visit happened and t… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm whether 30/08 vi… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A4: First put_on_hold used a wrong ticket ref; retried with NBL-026-date-conflict, verified as A5.
