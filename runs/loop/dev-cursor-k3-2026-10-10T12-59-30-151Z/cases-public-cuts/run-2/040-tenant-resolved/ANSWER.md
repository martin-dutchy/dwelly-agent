# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant swapped in their own machine before the landlord's approval to send someone arrived. I recorded the approval and the tenant's fix, assigned no contractor, and asked the landlord what to do with their machine. I updated the tenant and put the job on hold to 29 Dec.

## Where the case stands
Ticket at result stage, on hold until 2026-12-29 waiting for landlord. Tenant has swapped in own machine; landlord's faulty machine is in the garage. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Tell landlord the tenant swapped machines; ask whether the tenant's machine may stay connected and what to do with the faulty one (inspect/repair/dispose) | Landlord | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge the swap, say no visit is booked, next update by 29 Dec | Tenant | email | A6 ✅ |
| 3 | WAIT | Hold until 29 Dec for landlord answer | Landlord | internal | A7 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Landlord (landlord) via email, existing thread (event 009 email)** (verified)

> Hello, thank you for your reply about Flat 15, 55 Alder Lane. Just before it arrived, the tenant told us they have swapped in their own washing machine, so laundry is working again. Your original machine (which fills but won't start a wash) is being stored in the garage. We have not sent a contractor. Two quick questions: 1) Are you happy for the tenant's machine to stay connected? 2) Would you like us to arrange a contractor to inspect or repair your machine, or would you prefer it disposed of / dealt with another way? The tenant's machine remains theirs and is not on the inventory. We will hold the job open and check back with you on 29 December.

**A6 · send_message → Tenant (tenant) via email, existing thread (event 008 email)** (verified)

> Hello, thanks for letting us know you've swapped the machines and stored the old one in the garage. Glad you're sorted. We've told the landlord and asked what they'd like to do with their machine and whether yours can stay connected. No contractor visit is booked for now. Please leave the old machine as it is. We'll update you by 29 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's approval does not mean a contractor was assigned or a visit booked
- The work result records the tenant's workaround; the faulty machine is not repaired and its cause is unknown
- Nothing is decided on whether the tenant's machine may stay or who pays for disposal or repair

## Remaining work
- Landlord to decide on the faulty machine and the tenant's machine staying connected (agency, review 29 Dec)
- Close without payment once the landlord answers

## Missing or unavailable information
- Landlord's decision on the faulty machine and the tenant's machine
- Landlord email names Oliver, tenant names Rowan; unclear whether this is the same person

## Conflicts between sources
- Landlord approved a check visit (event 009) but the tenant had already swapped machines (event 008); I treated the swap as current and did not assign a contractor.
- Landlord email says Oliver, tenant email says Rowan.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The working issue is resolved by the tenant's swap. Outstanding: the landlord's decision on the faulty machine and on the tenant's machine staying connected, then closing without payment.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord with those two questions (sent), and an email update to the tenant (sent). The job is on hold to 29 Dec.

**3. Does anything need a human decision, and why?**

No. The landlord's choice about their appliance is routine and has been asked directly, so no escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-040-4451","decision":"approved","evidence_quote":"Oliver agrees to have someone go to the flat to check the washing machi… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A2 | `record_work_result` | {"ticket_ref":"NBL-040-4451","outcome":"completed","evidence":"Tenant email 24/12 (event 008): issue resolved by swapping in the tenant's ow… | 1 | ❌ failed | Ticket NBL-040-4451 not found on read-back |
| A3 | `record_landlord_decision` | {"ticket_ref":"NBL-040-tenant-resolved","decision":"approved","evidence_quote":"Oliver agrees to have someone go to the flat to check the wa… | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after record_landlord_decision |
| A4 | `record_work_result` | {"ticket_ref":"NBL-040-tenant-resolved","outcome":"completed","evidence":"Tenant email 24/12 (event 008): issue resolved by swapping in the … | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after record_work_result |
| A5 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-040-t… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-040-tenant-resolved","reason":"Waiting for Landlord","comment":"Tenant swapped in own machine; waiting for landlord decis… | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after put_on_hold |
| A8 | `add_note` | {"entity":"NBL-040-tenant-resolved","note":"Landlord email (ev 009) approved a check visit but tenant (ev 008) had already swapped machines;… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
- A1: Used the wrong ticket ref (NBL-040-4451). Found the real ref NBL-040-tenant-resolved via list_tickets and repeated the action as A3.
- A2: Same wrong ref. Repeated as A4.
