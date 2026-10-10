# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact to book the key replacement. I passed on the number on file, as written, and told the tenant. I asked about door security, recorded the landlord's approval, set a follow-up for 26 Nov and returned the job to auto mode.

## Where the case stands
NBL-021 at provider-assigned stage (mp_time). Landlord approved; Alder Compliance assigned and asked for the tenant's contact; visit not yet booked. Waiting on Alder to book with the tenant, and on the tenant for the best number and whether the door is secure.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told the tenant their number was passed to Alder, asked for best number and times, and asked whether the conservatory door is secure | Clara Jenkins, tenant | email | A2 ✅ |
| 2 | OTHER | Replied to Alder with the tenant contact on file exactly as written, with the code instruction, and restated the scope (lock plus 4 keys) | Alder Compliance, contractor | email | A1 ✅ |
| 3 | WAIT | Follow up on 26 Nov that Alder has booked and confirmed a visit date | Alder Compliance, contractor | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the tenant contact on file for Flat 22, 148 Lantern Quay is Clara Jenkins: 07700 900625 (enter this code when calling), exactly as in our job email of 21 Nov. We are checking whether the tenant has a better direct number and will pass it on if so. Please book the visit with the tenant and confirm the date to us. Scope: replace the lock on the conservatory back door and supply 4 new keys (2 tenants, 1 agency, 1 landlord; the agency and landlord keys come to our office). The landlord has approved this work.

**A2 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Clara, the landlord has approved the new lock and keys for the conservatory back door, and Alder Compliance will contact you to book a visit. They have asked for your contact details, so we have given them the number we hold (07700 900625). Please reply with the best number and times to reach you if that isn't right. Is the conservatory door securely locked in the meantime? If not, please tell us. We will update you once Alder confirm a date, and by 26 Nov at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed yet.
- The landlord approval has no stated cost cap; no quote has been seen.
- Sending the contact does not confirm it is the tenant's best number.

## Remaining work
- Alder to book and confirm a visit with the tenant
- Tenant to give the best number and say whether the door is secure
- Agency and landlord keys to be delivered to the office after the work
- Invoice and final checks after completion

## Missing or unavailable information
- Tenant's best direct number and times
- Whether the conservatory door can be secured now
- Attachment-85-document at event 012 was unavailable

## Conflicts between sources
- The provider asked for contact details although our job email of 21 Nov already carried them; I passed them on again and asked the tenant to confirm the best number.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved and Alder Compliance is assigned. The visit is not yet booked. Alder needed the tenant's contact, which has now been sent. Outstanding: visit booking, the tenant's best number, door security, delivery of keys to the office, and the invoice.

**2. What is the next action, who is it for, and through which channel?**

The contact was emailed to Alder Compliance and the tenant was emailed. Next, follow up with Alder on 26 Nov to confirm the visit date.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord has already approved the work.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"02… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `record_landlord_decision` | {"ticket_ref":"021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests new … | 1 | ❌ failed | Ticket 021 not found on read-back |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-26","purpose":"Check Alder Compliance has booked the visit with the tenant; chase provider and upd… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |

## Failed or unverified actions
- A3: Used the wrong ticket ref '021'. Retried with NBL-021, which verified as A4.
