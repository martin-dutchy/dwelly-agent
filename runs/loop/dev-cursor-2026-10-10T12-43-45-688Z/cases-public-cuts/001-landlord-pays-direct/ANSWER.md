# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job. The landlord approved it and is using his own contractor, Riverside Services. Completion is not yet confirmed in writing. I recorded the landlord decision, asked the landlord to confirm completion and direct payment, updated the tenant, and set a follow-up for 16 Dec.

## Where the case stands
Landlord approved the works (events 022, 026) and uses Riverside Services (Freya), who he pays directly. Job is on hold, waiting for the provider. The 11 Dec call (event 042) discussed invoicing and completion, but the history has no written confirmation that the work is done. Landlord asked to confirm; follow-up set for 2025-12-16.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in writing that the works are complete and that he pays Riverside directly | Landlord (Rowan) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that the landlord's contractor has been working on it, we await written completion confirmation, next update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up 16 Dec; if completion is confirmed, close without payment | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Landlord (landlord) via email, agency landlord record** (verified)

> - Can you confirm in writing that Freya at Riverside Services has finished the communal garden and hedge works (including the tree trim) at Flat 26, 46 Copperfield Walk?
> - Please confirm you are paying Riverside Services directly, so we do not need to chase an invoice.
> 
> Why: Our call with Freya on 11 Dec discussed invoicing and completion, but we have no written confirmation the work is done. We need that before closing the job.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord's contractor, Riverside Services, has been working on them, and we spoke to them on 11 December about completion. We are now waiting for written confirmation that it is all finished. We will update you by 16 December. If anything still looks untidy once it is done, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are finished or that the tenant is satisfied.
- Recording the landlord decision does not set a budget or a visit date.
- Payment: the landlord paying direct is not yet confirmed in writing.

## Remaining work
- Written completion confirmation from landlord or Riverside (owner: agency, chase 16 Dec)
- Confirm landlord pays direct, then close_ticket without_payment
- Tenant confirmation that the work is done (the tenant said the hedge and weeds were the issue)

## Missing or unavailable information
- Content of the 11 Dec call with Freya (summary says only that tree removal, invoicing and completion were discussed)
- Attachments at event 004 were unavailable
- Provider email/contact not in the file

## Conflicts between sources
- Event 036 says the job is external and tenants need no contact, but events 023-031 promised the tenant updates. I sent a brief update.
- Event 033 says the landlord's contractor started 20 Nov; event 035 'provider assigned' on 26 Nov is a system line. I treat Riverside as the landlord's own contractor paid direct.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the works and Riverside Services is doing them as his own contractor. After the 11 Dec call the agency awaits written confirmation of completion. Direct payment by the landlord and tenant confirmation are also outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking him to confirm completion and direct payment (A2). Email to the tenant with an update (A3). Follow-up on 16 Dec (A4).

**3. Does anything need a human decision, and why?**

No. This is routine and has no money or safety decision. The request_information tool timed out, but read-back showed REQ-101 was logged. A human should check it actually reached the landlord if no reply comes by 16 Dec.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Can you confirm … | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","purpose":"Chase landlord/Riverside for written confirmation works comple… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- A2: Tool reported a timeout, but read-back showed REQ-101 in the log; not retried. Check delivery at the 16 Dec follow-up.
