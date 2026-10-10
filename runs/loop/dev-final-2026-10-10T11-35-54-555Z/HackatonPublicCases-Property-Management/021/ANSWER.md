# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact details to book the lock replacement. I passed on the number on file with its calling instruction, asked the tenant for a better number and times, recorded the landlord's approval, and put the job on hold to 25 Nov.

## Where the case stands
NBL-021 at provider-assigned stage (mp_time). Landlord approved. Alder Compliance assigned but no visit booked; they asked for tenant contact details. Waiting on tenant's preferred number/times and provider to book. On hold, review 2024-11-25.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the tenant contact on file, exactly as written, to the provider, and asked them to book and confirm the visit | Alder Compliance, contractor | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant for best phone number and times for the visit | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-11-25 for tenant reply and provider-confirmed visit date | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hi, thanks for your message. The tenant contact we hold for Clara Jenkins is: 07700 900625 (enter this code when calling). This is the same as in our job email. We are checking whether the tenant has a better direct number and best times, and will pass it on if so. Please book the visit with the tenant and confirm the date to us. Reminder of scope: replace the conservatory back door lock and supply 4 keys (2 tenant, 1 for us, 1 for landlord; the agency and landlord keys to be handed to our office).

**A2 · request_information → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> - What is the best phone number to reach you on for the contractor to book the lock replacement?
> - What days and times suit you for the visit?
> 
> Why: Alder Compliance need to book the visit and asked for the tenant's contact details.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed
- Landlord approval covers the lock replacement and keys; no cost or quote has been seen
- Does not confirm the provider has the 4 keys or the office hand-over arrangements

## Remaining work
- Provider to book visit with tenant and confirm date (set_visit once confirmed)
- Tenant to supply best number/times
- After work: result, invoice, hand 2 keys to office, landlord informed, then close
- Chase provider if no booking by review date

## Missing or unavailable information
- Tenant's preferred direct number and availability
- Attachment-85-document at event 012 was unavailable and not seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Alder Compliance is assigned, but no visit is booked. The provider needs to contact the tenant. The tenant's best contact details are outstanding, then the visit, the work, the invoice and the key hand-over.

**2. What is the next action, who is it for, and through which channel?**

Contact details were sent to Alder Compliance by email, and the tenant was asked by email for their best number and times. The job is on hold, with review on 2024-11-25.

**3. Does anything need a human decision, and why?**

No. This is routine work and the landlord has already approved it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","questions":["Wh… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `record_landlord_decision` | {"ticket_ref":"Case 021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests… | 1 | ❌ failed | Ticket Case 021 not found on read-back |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-021","reason":"Waiting for Tenant","comment":"Waiting for tenant's best number/times and provider to book and confirm vis… | 1 | ✅ verified | Ticket NBL-021 read back after put_on_hold |

## Failed or unverified actions
- A3: First attempt used the wrong ticket ref; retried as NBL-021 and it verified (A4).
