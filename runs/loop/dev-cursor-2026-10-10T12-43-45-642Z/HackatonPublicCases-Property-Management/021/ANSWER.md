# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider asked for the tenant's contact details to book the key replacement. I passed on the number and calling code on file, asked the tenant for her best number and times, recorded the landlord's approval, returned the job to auto mode and set a follow-up for 26 Nov.

## Where the case stands
NBL-021 at provider stage (mp_time): landlord approved, Alder Compliance assigned, visit not yet booked. Provider asked for tenant contact; supplied. Waiting on provider to book and tenant to give best number/times.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed the tenant contact on file, with the calling code, to Alder Compliance and asked them to book and confirm the date | Alder Compliance, provider | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked tenant for best number and times, and told her when she will next hear from us | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Follow-up on 2024-11-26 to check the visit is booked | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the tenant contact on file for Clara Jenkins is: 07700 900625 (enter this code when calling). We are checking whether the tenant has a better direct number and will ask her for best times; we will pass on anything new. Please book the visit with her and confirm the date to us. Reminder: 4 keys are needed, 2 for the tenants and 1 each for the landlord and the agency, the last two to be dropped at our office.

**A2 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Clara, Alder Compliance would like to book your conservatory back door lock and key replacement and have asked for your contact details. We have given them the number we hold for you. Could you tell us the best phone number and times for them to reach you? We will pass it on and update you by Tuesday 26 November if the visit is not yet booked.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or confirmed yet
- Landlord approval covers the work, not any cost; no quote or spend has been seen
- The attachment at event 012 was unavailable and has not been seen

## Remaining work
- Provider to book the visit with the tenant and confirm the date
- Pass on any better tenant number
- Keys: 2 for the tenants, 1 each for the landlord and the agency, delivered to the office
- Work result, invoice and landlord update, then close

## Missing or unavailable information
- Tenant's best direct number and times
- Visit date
- Contents of the unavailable attachment

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved and Alder Compliance is assigned. The visit is not booked. Outstanding: the booking, the keys delivered to the office, the work result, the invoice and closing.

**2. What is the next action, who is it for, and through which channel?**

Reply to Alder Compliance by email with the tenant contact on file and ask for the visit date. Ask Clara Jenkins by email for her best number and times. Both are done (A1, A2). The follow-up is set for 26 Nov (A7).

**3. Does anything need a human decision, and why?**

No. This is routine and nothing needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","body":"H… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","body":"Hi Clara… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `record_landlord_decision` | {"ticket_ref":"021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests new … | 1 | ❌ failed | Ticket 021 not found on read-back |
| A4 | `resume_auto` | {"ticket_ref":"021"} | 1 | ❌ failed | Ticket 021 not found on read-back |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A6 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-26","purpose":"Check Alder Compliance has booked the visit with the tenant; chase provider/tenant … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- A3: Used the wrong ref '021'; retried with NBL-021 and it verified as A5.
- A4: Used the wrong ref '021'; retried with NBL-021 and it verified as A6.
