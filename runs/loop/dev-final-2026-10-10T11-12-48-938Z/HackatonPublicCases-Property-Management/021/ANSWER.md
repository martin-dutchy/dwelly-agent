# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider asked for the tenant's contact details to book the key replacement. The number was already in our original job email, so I pointed them to it. I also recorded the landlord's approval and set a follow-up for 25 Nov. No human decision needed.

## Where the case stands
Stage mp_time. Landlord approved; Alder Compliance assigned; awaiting the provider to book a visit with the tenant. No visit, quote or invoice yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to provider: tenant's contact details were already in our 21 Nov job email; use them to book the visit | Alder Compliance, contractor | email | A2 ✅ |
| 2 | WAIT | Follow-up 25 Nov to check the visit is booked | Alder Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, the tenant's contact details were in our original job email of 21 Nov (the "Contact Details" line, tenant Clara Jenkins), so please use those to book the visit. If that number doesn't work, tell us and we'll check with the tenant. Job: replace the conservatory back door lock at Flat 22, 148 Lantern Quay and supply 4 new keys (2 tenant; 1 agency and 1 landlord to be dropped at our office). The landlord has approved this work. Please reply with the visit date once agreed, or a quote before starting if one is needed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replying does not confirm a visit date, cost or completion
- No new tenant details were disclosed beyond those already in event 012
- Landlord approval covers the work, not any quote

## Remaining work
- Provider books visit with tenant
- Lock replaced, 4 keys cut; 2 landlord/agency keys delivered to office
- Invoice, tenant confirmation, landlord informed, then close

## Missing or unavailable information
- Attachment-85-document was unavailable and not seen
- Provider may not have noticed the number in the original email

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved, Alder Compliance assigned, waiting for the provider to book the visit. Outstanding: visit, lock and 4 keys, office key drop-off, invoice, closure.

**2. What is the next action, who is it for, and through which channel?**

Reply sent by email to Alder Compliance (contractor) pointing to the tenant contact already supplied; follow-up set for 25 Nov.

**3. Does anything need a human decision, and why?**

No. It is a routine job with landlord approval and no safety, spend or fraud issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-021","decision":"approved","evidence_quote":"Quinn approves the maintenance action regarding the broken key and requests … | 1 | ✅ verified | Ticket NBL-021 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-25","party":"Alder Compliance","purpose":"Check provider has booked the visit with tenant for cons… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
