# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approval was already given; I recorded it. The provider asked for tenant contact, so I sent the number on file with its calling instruction, asked the tenant for the best number and times, set a chase for 25 Nov and returned the job to auto.

## Where the case stands
NBL-021 at mp_time: landlord approved, Alder Compliance assigned, visit not yet booked. Provider asked for tenant contact; we sent it. Waiting on provider to book with tenant; follow-up 2024-11-25.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the tenant contact on file exactly as written to Alder Compliance and asked them to book and confirm the date | Alder Compliance, contractor | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant for best phone number and times | Clara Jenkins, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for provider to confirm visit; chase 2024-11-25 | Alder Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the tenant contact on our job email (event 012) is: Clara Jenkins, 07700 900625 (enter this code when calling). We are also checking the tenant's direct number and best times, and will pass them on if different. Please book the visit with the tenant and confirm the date to us. The job is to replace the conservatory back door lock and supply 4 keys (2 tenants, 1 agency, 1 landlord; the agency and landlord keys to go to our office). Thanks.

**A3 · request_information → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> - What is the best phone number to reach you on?
> - What days and times suit you for the locksmith visit?
> 
> Why: Alder Compliance need to book the lock replacement for the conservatory back door; the landlord has approved the work. They will contact you shortly, and we will update you by 2024-11-25.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed
- Nothing established about cost; no quote yet
- Keys for agency and landlord not yet delivered to the office

## Remaining work
- Alder to book visit and confirm date (then set_visit)
- Fit lock and supply 4 keys; 2 for tenants, 2 to the office
- Invoice, tenant confirmation, landlord informed, then close

## Missing or unavailable information
- Tenant's best direct number and availability
- Attachment-85-document at event 012 was unavailable and not seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved, provider assigned, visit not booked. Outstanding: provider booking and visit, lock and 4 keys, invoice, closure.

**2. What is the next action, who is it for, and through which channel?**

Contact details sent to Alder Compliance by email (A2); tenant asked for best number and times by email (A3); chase 2024-11-25 (A4).

**3. Does anything need a human decision, and why?**

No. It is routine and approved, with no spend or safety issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests new … | 1 | ❌ failed | Ticket 021 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_information` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","questions":["Wh… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `schedule_follow_up` | {"ticket_ref":"021","due_on":"2024-11-25","party":"Alder Compliance","purpose":"Check visit date has been confirmed by provider for lock rep… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"021"} | 1 | ❌ failed | Ticket 021 not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A7 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |

## Failed or unverified actions
- A1: Used wrong ref 021; retried with NBL-021 (A6).
- A5: Same wrong ref; retried with NBL-021 (A7).
