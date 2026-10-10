# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact details to book the lock replacement. I passed on the number on file as written, with the code instruction. I asked the tenant for their best number and times, recorded the landlord's approval, and set a follow-up for 25 November.

## Where the case stands
NBL-021 at provider-assigned stage (mp_time). Landlord approved. Alder Compliance asked for the tenant's contact to book. No visit booked yet. Waiting on provider to agree a date with the tenant, and on the tenant for a best number and times.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the tenant contact on file, with the calling code instruction, to the provider and asked them to confirm the date once agreed | Alder Compliance, contractor | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked the tenant for best contact number and access times, and said no appointment is confirmed yet | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Review on 2024-11-25 whether the visit is booked | Alder Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hi, thanks for your message. The tenant contact we hold for Clara Jenkins is: 07700 900625 (enter this code when calling). Please use it to book the key replacement visit. We are checking whether the tenant has a better direct number and times and will pass that on. Please reply with the date once agreed so we can confirm it. Reminder: 4 keys are needed, 2 for the tenants and 2 to be left at our office.

**A2 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Clara, the landlord has approved the conservatory back door lock replacement and Alder Compliance will be in touch to arrange a visit. We've given them the number we hold for you. What is the best number to reach you on, and which days or times suit you for access? Please reply and we'll pass it on. No appointment is confirmed yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed
- Landlord approval covers the lock replacement and keys; no cost or cap was stated, and no quote exists
- Sending the tenant number does not confirm it is the best number

## Remaining work
- Provider books the visit and the agency confirms the date
- Pass on the tenant's preferred number and times when received
- After the visit: result, invoice, 4 keys (2 left at the office), tenant confirmation, tell the landlord, then close

## Missing or unavailable information
- Tenant's best number and access times
- Attachment-85-document at event 012 was unavailable and has not been seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved and Alder Compliance is assigned. No visit is booked yet. The provider needed the tenant's contact details to arrange one. The visit, the work, the invoice and the keys are all outstanding.

**2. What is the next action, who is it for, and through which channel?**

Reply to Alder Compliance by email with the tenant contact on file. Ask the tenant by email for their best number and times. Both are done, and a follow-up is set for 2024-11-25.

**3. Does anything need a human decision, and why?**

No. This is routine and approved, so nothing needs escalating.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-25","party":"Alder Compliance","purpose":"Check provider has booked the key replacement visit with… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |

## Failed or unverified actions
_None._
