# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact details to book the lock replacement. I passed on the number on file with its calling code and asked the tenant for their best number and times. A follow-up is set for 2024-11-25.

## Where the case stands
Landlord approved; Alder Compliance assigned, has acknowledged, but no visit booked. Provider asked for tenant contact details; we passed on the number on file. Waiting on provider to book and tenant to give best number/times.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the tenant contact on file, with the calling code, to Alder Compliance and asked them to book and confirm the date | Alder Compliance, provider | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked tenant for best phone number and visit times | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 2024-11-25 to confirm booking | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the contact on file for the tenant, Clara Jenkins, is: 07700 900625 (enter this code when calling, as per our job email). We are checking whether the tenant has a better direct number and times and will pass that on if so. Please book the visit and confirm the date to us. Landlord has approved the lock replacement with 4 new keys (2 tenants, 1 agency, 1 landlord; the last two to be dropped at our office).

**A2 · request_information → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> - What is the best phone number to reach you on?
> - What days and times suit you for the contractor to visit to replace the conservatory back door lock?
> 
> Why: Alder Compliance asked for your contact details to book the lock replacement. We have given them the number we hold; your answer helps them book faster. We will check back with you by 2024-11-25.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed
- Passing the number does not confirm it is the tenant's best direct number
- Nothing here covers cost; no quote has been received

## Remaining work
- Provider to book and confirm visit (follow-up 2024-11-25)
- Tenant to reply with best number and times
- After the work: result, invoice, delivery of 2 keys to the office, tenant confirmation, landlord informed, close

## Missing or unavailable information
- Attachment-85-document at event 012 was unavailable and not seen
- Tenant's best direct number and availability

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Landlord approved, provider assigned, no visit booked. The provider needed the tenant's contact details to book. Outstanding: booking, the work, 4 keys (2 to the office), invoice, closure.

**2. What is the next action, who is it for, and through which channel?**

Contact details sent to Alder Compliance by email (A1). Tenant asked by email for best number and times (A2). Follow-up set for 2024-11-25 (A3).

**3. Does anything need a human decision?**

No. This is routine and nothing needs escalating.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","body":"H… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","questions":["Wh… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"","due_on":"2024-11-25","purpose":"Check Alder Compliance has booked the key/lock visit; chase tenant for best number and tim… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
