# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact details to book the lock replacement. I passed on the number on file with its calling code, asked the tenant for her best number and times, returned the job to auto mode and set a follow-up for 26 Nov.

## Where the case stands
NBL-021 at provider stage (mp_time). Landlord approved; Alder Compliance assigned but no visit booked. Provider asked for tenant contact; we replied. Waiting on provider to book and tenant to give best number.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the contact on file to the provider; asked tenant for best number and times | Alder Compliance, contractor | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask Clara for best phone number and times; told her nothing is booked yet | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 26 Nov that the visit is booked | Alder Compliance | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the tenant contact on file for Clara Jenkins is: 07700 900625 (enter this code when calling), exactly as in our job email. As you asked even though it was in that email, we will check Clara's direct number and ask her for the best number and times, and will pass on anything new. Please book the conservatory back door lock replacement (4 new keys: 2 tenants, 1 agency, 1 landlord; the agency and landlord keys to come to our office) and confirm the date with us once agreed.

**A2 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Clara, Alder Compliance have asked for your contact details to book the lock replacement for the conservatory back door. We have passed on the number we hold. Could you reply with the best phone number and times to reach you? They should be in touch shortly to agree a visit; nothing is booked yet. We will update you by Tuesday 26 November if you haven't heard.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Passing on the contact does not book a visit
- Landlord approval covers the lock and keys; no quote or cost is agreed
- Attachment at event 012 was unavailable and not seen

## Remaining work
- Provider to book and confirm a visit date
- Tenant to give best contact number/times
- Fit lock, supply 4 keys (2 to office), then invoice, tenant confirmation and landlord update before closing

## Missing or unavailable information
- Tenant's best direct number and times
- Visit date

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; Alder Compliance assigned but no visit booked. Outstanding: visit booking, work, 4 keys (2 to office), invoice, closure.

**2. What is the next action, who is it for, and through which channel?**

Contact details sent to Alder Compliance by email (A1); tenant asked for best number/times by email (A2); follow-up 26 Nov (A5).

**3. Does anything need a human decision, and why?**

No. This is routine and approval is already in place.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"ca… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `resume_auto` | {"ticket_ref":"case-021"} | 1 | ❌ failed | Ticket case-021 not found on read-back |
| A4 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-26","purpose":"Check Alder Compliance has booked the visit and tenant replied with best contact nu… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- A3: resume_auto used the wrong ref (case-021); retried with NBL-021 and it verified as A4.
