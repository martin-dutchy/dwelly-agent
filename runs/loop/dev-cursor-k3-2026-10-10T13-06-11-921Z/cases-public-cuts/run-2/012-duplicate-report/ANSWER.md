# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's repeat request is a duplicate of the open job, which already has a visit booked for 29/04 8-12. I replied to the tenant, asked the provider to confirm attendance and company, noted the record inconsistencies, and set a follow-up for 29/04.

## Where the case stands
Stage: visit booked for 29/04/2026 8am-12pm. The tenant's latest email (event 021) duplicates the open job. Waiting on the provider's confirmation and the visit result. Any quote would go to the landlord for approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the visit is already booked for tomorrow 8-12 and that no second job was opened | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask the provider to confirm attendance tomorrow and which company is attending | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Follow up on 29/04 for the visit result | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked to look at the dishwasher door tomorrow, Wednesday 29 April, between 8am and 12pm, so we haven't opened a second job. If that time no longer works, please call the provider on 07700 900410 to change it. We are also confirming the booking with the provider today. If you haven't heard anything or nobody arrives, let us know and we'll chase straight away.

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm you are attending Flat 9, 89 Juniper Mews tomorrow, Wednesday 29/04/2026, 8am-12pm, for the dishwasher door that won't close (tenant says it still won't shut after basic checks). Our call log shows "Grant from Cedar Utilities" arranging the slot, so please confirm which company is attending. If a quote is needed, send it with photos and don't start work until we approve.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the provider has accepted the slot or the cause of the fault.
- No cost or landlord approval has been established.
- No duplicate job was created.

## Remaining work
- Confirm provider attendance and record the visit result on 29/04 (agency ops)
- If a quote is needed, send it to the landlord for approval

## Missing or unavailable information
- Which company is actually attending (Riverside Compliance, Cedar Utilities or Harbour Homes)
- Tenant's surname (Turner or Kendall)

## Conflicts between sources
- Provider named as Riverside Compliance, Cedar Utilities and Harbour Homes. I trusted the system assignment, Riverside Compliance, and asked it to confirm.
- Tenant named Leo Turner and Leo Kendall. I used Turner, from the system emails.
- Tenant contact numbers differ between events 015, 019 and 020.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 8am-12pm. The tenant's new email duplicates the open job. Outstanding: the provider's confirmation, the visit result and any quote.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email that the visit is already booked (A1). Ask Riverside Compliance by email to confirm attendance and company (A2). Follow up on 29/04 (A4).

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate. The provider-name and tenant-name mismatches are being settled by asking the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","body":"Hi Leo, tha… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Event 021 tenant chase is a duplicate of the open job; visit 29/04 8-12 already booked. Record … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-29","purpose":"Visit due 29/04 8-12: confirm provider attended and record result/… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
