# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job handled by the landlord's own contractor, paid directly by landlord. Call notes don't clearly confirm completion, so I recorded the landlord's own-contractor decision, asked the contractor for written completion confirmation, and set a follow-up for 15 Dec.

## Where the case stands
Landlord's own contractor (Riverside Services/Freya) instructed Nov 2025 and started ~20 Nov; ticket on hold "Waiting for Provider". The 11 Dec call mentions invoicing and completion but no written confirmation of completion exists. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Freya to confirm in writing that all works are complete (with date), who the invoice is addressed to, and anything outstanding | Freya, Riverside Services, contractor | email | A2 ✅ |
| 2 | WAIT | Follow up 15 Dec; on written completion, tell tenant and landlord, then close without payment (landlord pays direct) | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (Riverside Services) (contractor) via email, existing thread (event 042 call)** (verified)

> - Please confirm in writing that all the communal garden, hedge and tree works at Flat 26, 46 Copperfield Walk are complete, with the completion date.
> - Please confirm who the invoice is addressed to (we understand the landlord pays you directly) and send a copy if possible.
> - If anything is still outstanding (e.g. the tree trim), what is left and when?
> 
> Why: Our call notes of 11 Dec do not clearly record completion; we need written confirmation before closing the job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not confirm the works are complete or what they cost.
- The request to Freya does not establish completion.
- No tenant or landlord message was sent this run; nothing yet closed.

## Remaining work
- Provider written completion confirmation (Freya) - chase 15 Dec
- Tell tenant and landlord of the outcome, then close_ticket without_payment
- Confirm whether the pigeon-delayed tree trim is done

## Missing or unavailable information
- Written confirmation of completion
- Content of event 042 call beyond a vague summary
- Two attachments at event 004 were unavailable

## Conflicts between sources
- Event 036 says no tenant contact needed, but earlier messages promised tenants updates; the tenant will be told on completion.
- Hint says provider assigned/visit not booked, but history shows landlord's contractor already working; trusted history.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works by the landlord's contractor Riverside Services are underway/possibly done; completion not confirmed in writing. Outstanding: completion confirmation, tenant/landlord notification, closing without payment.

**2. What is the next action, who is it for, and through which channel?**

Written completion request to Freya (Riverside Services) by email on the existing thread, with a follow-up on 15 Dec.

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya (Riverside Services)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)",… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Riverside Services","purpose":"Check written confirmation of com… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
