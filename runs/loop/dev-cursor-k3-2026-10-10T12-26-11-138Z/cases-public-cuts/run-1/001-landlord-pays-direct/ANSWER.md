# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works were approved by the landlord and are with their contractor Riverside Services. A call on 11 Dec discussed completion and invoicing but nothing is confirmed in writing. I recorded the approval, asked the provider for written confirmation and set a follow-up for 15 Dec.

## Where the case stands
Stage mp_time, provider assigned (Riverside Services, landlord's contractor), on hold waiting for provider. Landlord approved works and pays direct. Completion not yet confirmed in writing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Freya for written confirmation that all works are complete and the invoice goes to the landlord | Freya, Riverside Services, contractor | email | A3 ✅ |
| 2 | WAIT | Follow up on 15 Dec; then confirm with tenant and landlord and close without payment | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Freya, Riverside Services (contractor) via email, contractor record on file for Riverside Services (follows call event 042)** (verified)

> - Please confirm in writing that all the communal garden, hedge and tree works at 46 Copperfield Walk are complete, and the completion date.
> - Please confirm the invoice is going to the landlord directly, as discussed on our call.
> 
> Why: The call on 11 Dec discussed completion and invoicing but we have no written confirmation, so we cannot close the job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The call summary (event 042) does not establish that the works are finished.
- Recording approval does not set a start date or cost.
- Nothing closed.

## Remaining work
- Provider written completion confirmation
- Tenant confirmation that the garden, hedge and side strip are done
- Tell landlord outcome, then close without payment (landlord pays direct)

## Missing or unavailable information
- Written completion confirmation from provider
- Attachments at event 004 unavailable

## Conflicts between sources
- Landlord emails name different people (Rowan, Leo, Felix, Harper); the property record and thread treat them as the one landlord.
- Hold at event 036 says no tenant contact needed, but the tenant was previously told of the works.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved, contractor working or finished, on hold awaiting the provider's written confirmation of completion. Tenant confirmation, landlord notification and closure are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Freya at Riverside Services asking for written completion confirmation (A3); follow-up on 15 Dec (A2).

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"approved","evidence_quote":"works have been quoted & go ahead given","source":"even… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Riverside Services","purpose":"Chase written confirmation of com… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A3 | `request_information` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"contractor record on file for River… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
_None._
