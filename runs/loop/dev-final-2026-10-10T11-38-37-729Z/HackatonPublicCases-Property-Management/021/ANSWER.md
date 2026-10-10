# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact details to book the lock replacement. I passed on the number on file with its calling code, asked the tenant for their best number and times, recorded the landlord's approval and set a follow-up for 25 November. The job is back in auto mode.

## Where the case stands
NBL-021 at provider assigned (mp_time). Landlord approved. Alder Compliance asked for the tenant's contact to book. No visit booked yet. Waiting on provider to agree a date with tenant, and tenant to give best number and times.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the tenant contact on file, exactly as written with its calling code, to the provider. Said we will check the tenant's direct number. | Alder Compliance, contractor | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked the tenant for the best phone number and times. Told them no appointment is booked yet. | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Follow-up on 2024-11-25 to check the visit date has been agreed. | Alder Compliance, contractor | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the tenant contact on file for Clara Jenkins is: 07700 900625 (enter this code when calling). This is as it appears on our record and was also in our job email. We are checking the tenant's direct number and will ask for the best times to call, and will pass on anything new. Reminder of the scope: replace the conservatory back door lock and supply 4 new keys (2 tenants, 1 agency, 1 landlord); the agency and landlord keys go to our office. Please let us know the visit date once you have agreed it with the tenant.

**A2 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Clara, our contractor Alder Compliance will be calling to arrange the conservatory back door lock replacement. To help them reach you, could you tell us the best phone number and the times that suit you? No appointment is booked yet; we will confirm once the contractor has agreed a date with you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed.
- Passing on the contact does not confirm the tenant's direct number.
- The landlord approval covers the lock replacement and keys; no spend cap or quote has been seen.
- The attachment referenced at event 012 was unavailable and has not been seen.

## Remaining work
- Provider to book the visit with the tenant, then confirm the date.
- Tenant to reply with the best number and times.
- Work, invoice and delivery of the 2 keys (agency and landlord) to the office, then close.

## Missing or unavailable information
- The tenant's best direct number and times.
- Visit date.
- The unavailable attachment from event 012.

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved and Alder Compliance is assigned. No visit is booked. Outstanding: the provider books with the tenant, the work is done, the keys are delivered to the office, then the invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Send the tenant contact to the provider by email, and ask the tenant for the best number and times by email. Both are done. Follow-up on 25 November.

**3. Does anything need a human decision, and why?**

No. This is routine and within the landlord's approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"ca… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `record_landlord_decision` | {"ticket_ref":"case-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests… | 1 | ❌ failed | Ticket case-021 not found on read-back |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-25","party":"Alder Compliance","purpose":"Check provider has agreed a visit date with tenant; chas… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |

## Failed or unverified actions
- A3: Used the wrong ticket ref (case-021). Found the correct ref NBL-021 via list_tickets and retried successfully as A4.
