# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved the lock replacement; provider assigned but needed tenant contact. I passed on the contact on file, recorded the approval, asked the tenant for best contact and door security, set a follow-up and returned to auto.

## Where the case stands
NBL-021 at provider-assigned stage (mp_time). Landlord approved; Alder Compliance assigned but no visit booked. Provider asked for tenant contact; replied. Awaiting provider to book and tenant's reply.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the work is approved, asked best number/times and whether the conservatory door is secure | Clara Jenkins, tenant | email | A3 ✅ |
| 2 | OTHER | Passed the tenant contact on file exactly as written (with code instruction) to the provider and restated the scope | Alder Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Follow up 2024-11-25 for provider-confirmed visit date | Alder Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hi, the tenant contact on file for Flat 22, 148 Lantern Quay is Clara Jenkins, 07700 900625 (enter this code when calling). We are also checking Clara's direct number and best times and will pass them on if different. Please book the conservatory back door lock replacement with 4 new keys (2 tenant, 1 landlord, 1 agency; the landlord and agency keys to be delivered to our office), and reply with the date once confirmed. The landlord has approved the work; if you find anything needing a quote, please send it to us before proceeding.

**A3 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Dear Clara, the landlord has approved replacing the conservatory back door lock, and Alder Compliance will contact you to book a time. We have given them your number on file. Please reply with the best number and times to reach you, so they can book quickly. Is the conservatory door secure and lockable at the moment? If not, please let us know today. We will update you by 26 November if you have not heard from the contractor.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked; no date promised
- Approval covers the lock replacement and keys; no cost figure was seen or approved
- Whether the door is currently secure is unknown

## Remaining work
- Provider to book visit and confirm date (agency chases 25 Nov)
- Tenant to confirm best number and door security
- Landlord and agency keys to be delivered to office
- Result, invoice and closing checks

## Missing or unavailable information
- Tenant's best contact number/times
- Whether conservatory door is secure
- Attachment-85-document unavailable, not seen

## Conflicts between sources
- Tenant name Clara Jenkins vs request addressed 'Hi Clara' to agency staff; treated as the tenant per the record

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and provider assigned; visit not booked. Provider needed tenant contact; outstanding are booking, tenant reply, key delivery to office, invoice.

**2. What is the next action, who is it for, and through which channel?**

Contact details sent to Alder Compliance by email; tenant emailed for best number and door security; chase 25 Nov.

**3. Does anything need a human decision, and why?**

No; routine. Escalate only if the door is insecure and provider stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-25","party":"Alder Compliance","purpose":"Check visit date confirmed by provider for lock replacem… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |

## Failed or unverified actions
_None._
