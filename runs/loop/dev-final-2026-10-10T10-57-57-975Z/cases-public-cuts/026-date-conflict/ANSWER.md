# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reported that the visit recorded for 30 Aug conflicts with the 8 Sept date she arranged. 30 Aug is a Saturday, while the 'Monday morning' agreed matches 8 Sept. I rebooked for 8 Sept 10-12, told tenant and contractor, noted the conflict and set a follow-up.

## Where the case stands
Ticket at visit stage. Landlord approved (event 009/010), contractor assigned. Visit rebooked to Mon 8 Sept 2025 10-12 at tenant's home. Awaiting contractor confirmation of that date and of whether they attended on 30 Aug.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Rebooked visit to 8 Sept 2025 10-12 (tenant home access) and told tenant the 30 Aug date was an error | Clara, tenant | email | A3 ✅ |
| 2 | CHASE_PROVIDER | Asked contractor to confirm 8 Sept and say whether they attended on 30 Aug | Keystone Compliance, contractor | email | A4 ✅ |
| 3 | WAIT | Follow-up on 2 Sept for contractor confirmation | Keystone Compliance, contractor | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hello, thank you for letting us know, and sorry for the mix-up. The 30 August date in our earlier messages was wrong. We have now booked the oven visit for Monday 8 September, 10am-12pm, at the flat, as you arranged. We're also asking the contractor to confirm this with you directly. If that time no longer suits, please tell us and we'll rearrange it.

**A4 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Correction to our appointment email for the oven repair at Flat 3, 3 Willowmere Road: the 30/08/2025 date was recorded in error. The tenant says the visit was agreed with you for Monday 8 September 2025, 10am-12pm, and we have booked that. Please reply to confirm that date works, and tell us if you attended or tried to attend today (30 Aug), so we can keep the record accurate. Please do not treat the tenant as a no-access for today.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Rebooking does not confirm the contractor accepted 8 Sept, nor the cause of the oven fault, cost or who pays.
- No work result recorded for 30 Aug as there is no evidence of attendance or no-access.
- The 8 Sept date rests on the tenant's statement only.

## Remaining work
- Contractor to confirm 8 Sept (agency follow-up 2 Sept)
- Visit, work result, quote if needed, invoice, tenant confirmation, landlord informed, then close
- Clean up inconsistent names/providers/phone numbers on record

## Missing or unavailable information
- Contractor's confirmation of the agreed date and whether they attended 30 Aug
- Which provider/name/phone details are correct (records inconsistent)

## Conflicts between sources
- Visit date 30/08/2025 (event 017) vs tenant's 8 Sept (event 021); trusted the tenant's latest statement, supported by 30/08 being a Saturday not Monday.
- Tenant and contractor names/companies differ across events (Ruben Oakley/Clara/Grace Mercer/Harriet Fletcher; Keystone Compliance/Riverside Works/Lantern Utilities/Keystone Utilities); two phone numbers. Recorded in a note; assumed the same case.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine oven repair, landlord approved, contractor assigned, at visit stage. The visit date is disputed: the system says 30 Aug, the tenant says 8 Sept. Now rebooked for 8 Sept. Contractor confirmation is outstanding, as are the visit, result, invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Confirm 8 Sept 10-12 to the tenant (email, sent) and ask the contractor (email, sent) to confirm and report any 30 Aug attendance. Follow up 2 Sept.

**3. Does anything need a human decision, and why?**

No. This is routine, within approval, and the latest tenant statement resolves the date. A human only needs to step in if the contractor disputes 8 Sept or reports a no-access on 30 Aug.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `set_visit` | {"ticket_ref":"NBL-026-date-conflict","datetime":"2025-09-08 10:00","slot_text":"Monday 8 September 2025, 10am-12pm","access":"tenant_home"} | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after set_visit |
| A2 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: system visit date 30/08/2025 10:00 (event 017) vs tenant's call (event 021) saying … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Check contractor has confirmed 8 Sept 1… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
