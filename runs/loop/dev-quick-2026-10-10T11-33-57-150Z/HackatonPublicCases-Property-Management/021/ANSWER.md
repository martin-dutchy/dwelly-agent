# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the lock replacement and four keys on 21 Nov, and the provider was assigned. The provider has asked for the tenant's contact details to book, so I sent them the contact on file, asked the tenant for her direct number and best times, and put the job on hold until 25 Nov.

## Where the case stands
Ticket NBL-021 (Flat 22, 148 Lantern Quay). Landlord approved the lock replacement and 4 keys (event 006). Provider Alder Compliance assigned (event 010) but no visit booked. Provider (event 015) asked for the tenant's contact details to book. Now on hold waiting for the tenant's direct number and best times, review 2024-11-25.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Reply to Alder Compliance with the contact on file (07700 900625, with the calling code as recorded) and ask them to book the visit with the tenant; say the tenant's direct number is being confirmed. | Alder Compliance, contractor | email | A3 ✅ |
| 2 | CHASE_TENANT | Ask Clara Jenkins for her direct phone number and best times to be called, and tell her the provider will arrange the visit. | Clara Jenkins, tenant | email | A4 ✅ |
| 3 | WAIT | Hold for tenant's reply; review 2024-11-25 and pass the number to the provider if received. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Alder Compliance (contractor) via email, existing thread (event 012 email)** (verified)

> Hello,
> 
> Thank you for your reply on Flat 22, 148 Lantern Quay, Westmarsh, ZZ4 1ZZ (Key Replacement Request).
> 
> The tenant's contact number on file is 07700 900625. Please enter the code "07700 900625" when calling, as recorded on our job email. We are confirming the tenant's direct number and best call times with them now, and will pass them on as soon as we have them.
> 
> Please contact the tenant to arrange a visit to replace the lock and provide 4 new keys (2 for the tenants, 1 for the agency, 1 for the landlord). The landlord has approved this work.
> 
> Thank you.

**A4 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Dear Clara,
> 
> Thank you for your patience. Your landlord has approved replacing the broken back door lock for the conservatory and providing new keys.
> 
> Alder Compliance, our maintenance provider, has asked for your direct phone number and your best times to call so they can arrange a visit. Could you reply with your best contact number and the times you are available? We will pass these on to them.
> 
> Once the visit is booked, we will confirm the date with you.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord approval is recorded, but no contractor visit or quote is confirmed yet.
- No provider visit date is booked; no appointment exists in the record.
- The tenant's direct number is not yet confirmed.

## Remaining work
- Tenant to give direct phone number and best call times (review 2024-11-25).
- Provider to book the visit and confirm the date; then set_visit with provider evidence.
- Provider to attend, replace lock, supply 4 keys; keys for office (agency and landlord) to be handed in.
- Record the work result, invoice and keys, then close with tenant and landlord informed.

## Missing or unavailable information
- Tenant's direct phone number and best call times.
- Provider's visit date.
- Attachment 85 from event 012 is unavailable; not needed for the approval.

## Conflicts between sources
- The task reference case-021 does not match the system ticket NBL-021; used NBL-021.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved on 21 Nov (event 006). Alder Compliance is assigned but has no visit booked and is waiting for the tenant's contact details. Outstanding: tenant's direct number and times, provider's visit booking, lock replacement and key handover.

**2. What is the next action, who is it for, and through which channel?**

Email to Alder Compliance with the contact on file and a request to book (A3). Email to Clara Jenkins asking for her direct number and best times (A4). Job held until 2024-11-25 for review.

**3. Does anything need a human decision, and why?**

No. The approval is clear and covers the requested work, and no spend cap is needed to proceed. The remaining steps are routine: the tenant's number and the provider's booking.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"case-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests… | 1 | ❌ failed | Ticket case-021 not found on read-back |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A3 | `send_message` | {"ticket_ref":"NBL-021","recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (even… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"ticket_ref":"NBL-021","recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 e… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-021","reason":"Waiting for Tenant","comment":"Waiting for tenant's direct phone number and best call times so Alder Compl… | 1 | ✅ verified | Ticket NBL-021 read back after put_on_hold |

## Failed or unverified actions
- A1: Recorded against the wrong ref (case-021). Ticket is NBL-021; retried with the correct ref and it verified as A2.
