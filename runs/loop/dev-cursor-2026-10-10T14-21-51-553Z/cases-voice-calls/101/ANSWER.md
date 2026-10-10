# Case 101: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor attended and fixed a loose connection. A missing dial needs a £95 inc VAT replacement, which the landlord has not yet approved. I recorded the quote and result, told the tenant and the provider, and put the job on hold to 10 Dec.

## Where the case stands
Visit done 2026-12-07. Provider tightened a loose heater connection and the dishwasher passed a retest. A missing dial needs a £95 inc VAT replacement. Waiting on the landlord's answer to the event 020 email. The job is on hold until 2026-12-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on £95 dial quote; chase by SMS or phone on 10 Dec if no reply | Landlord (Turner) | internal | A7 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on findings, pending approval, next update by 10 Dec | Amelia Nolan, tenant | email | A4 ✅ |
| 3 | CHASE_PROVIDER | Tell provider not to order or fit the dial until approved; ask about any charge for work done and for photos | Ashford, Oakfield Homes, provider | email | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Amelia, thanks for seeing our engineer today. They report a loose connection on the dishwasher, which they tightened, and it ran normally on test. They also found the dial is missing and needs replacing. We have asked the landlord to approve that part, so I can't give a date yet. Please let us know if the dishwasher still doesn't finish its cycle. We'll update you by Thursday 10 December.

**A6 · send_message → Ashford, Oakfield Homes (contractor) via email, existing thread (event 013 email)** (verified)

> Hi Ashford, thanks for the update. We've logged your £95 inc VAT quote for the replacement dial and sent it to the landlord. The landlord's earlier approval covered the visit only, and we can't approve spend ourselves. Please don't order or fit the dial until we confirm in writing. Please also confirm whether any charge applies to the work already done today, and send photos of the dishwasher and the missing dial. We'll update you by 10 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it.
- The landlord's 'Yes please go ahead' covered the visit only, not the £95.
- The provider's claim that the agency can approve spend under £100 is not supported by any limit on file.
- The dishwasher being fixed rests on the provider's word only; the tenant has not confirmed it.

## Remaining work
- Landlord yes/no on the £95 quote (event 020 asked; chase 10 Dec).
- Provider to confirm any charge for the unapproved work and send photos.
- Tenant to confirm the cycle now completes.
- Invoice and closing checks after the dial is fitted.

## Missing or unavailable information
- Landlord's decision on the £95 quote.
- Spend limit for the property (none on the record).
- Photos, which were unavailable.
- Provider's position on any charge for the work done beyond the inspection.

## Conflicts between sources
- Provider names differ across events: Oakfield Homes assigned; calls name Cedar/Alder Maintenance; the note is addressed to Juniper Surveying. Treated as the same provider and job.
- Call-back number 07700 900730 differs from the tenant's 07700 900529 on file.
- Provider says it was only approved for an inspection yet did the repair.
- Provider says the agency can approve spend under £100; no such limit is on record.
- The hold 'waiting for appointment' was stale because the visit had happened.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened. The dishwasher passed a retest after the connection was tightened. The £95 inc VAT dial quote is awaiting the landlord, and no spend has been approved. Still open: the provider's charge for the extra work, photos, and the tenant's confirmation.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply to the event 020 email. Chase by SMS or phone on 10 Dec. The tenant (email) and provider (email) have been updated.

**3. Does anything need a human decision, and why?**

No human is needed. The decision belongs to the landlord, and no spend limit applies. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-101","provider":"Oakfield Homes","amount_gbp":95,"vat":"included","items":["Replacement dial (missing), parts and labour"… | 1 | ✅ verified | Ticket NBL-101 read back after record_quote |
| A2 | `record_work_result` | {"ticket_ref":"NBL-101","outcome":"needs_quote","evidence":"Provider note event 019 (2026-12-07): water removed, loose heater connection tig… | 1 | ✅ verified | Ticket NBL-101 read back after record_work_result |
| A3 | `add_note` | {"entity":"NBL-101","note":"Landlord's event 009 \"Yes please go ahead\" approved a contractor visit/inspection only; no spend approved. £95… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Amelia… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-101","due_on":"2026-12-10","party":"Landlord","purpose":"Chase landlord by SMS/phone for yes/no on £95 dial quote (Oakfie… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `send_message` | {"recipient_name":"Ashford, Oakfield Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","b… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-101","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on £95 inc VAT dial quote (email event 020, 2026… | 1 | ✅ verified | Ticket NBL-101 read back after put_on_hold |

## Failed or unverified actions
_None._
