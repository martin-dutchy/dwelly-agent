# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved works via own contractor Riverside Services; recorded that decision. Completion is not yet evidenced in writing, so I asked the contractor, updated the tenant and set a 16 Dec follow-up.

## Where the case stands
Landlord's own contractor (Riverside Services/Freya) doing communal garden works; ticket on hold waiting for provider. 11 Dec call discussed tree removal, invoicing and completion but no written confirmation of completion exists. Ticket stage mp_time, not closable yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Freya for written confirmation of completion and invoicing arrangement | Freya, Riverside Services, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: contractor being asked to confirm completion; next update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Follow-up 16 Dec to chase confirmation, then close without payment if landlord pays direct | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (Riverside Services) (contractor) via email, existing thread (event 042 call)** (verified)

> - Please confirm in writing that the communal garden, side hedge and tree works at Flat 26, 46 Copperfield Walk are fully complete, and the date finished.
> - Please confirm whether you are invoicing the landlord directly, and send any invoice or photos as a PDF or plain-text reply.
> 
> Why: Our call on 11 Dec was not a written confirmation of completion; needed before the job can be closed.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord's contractor has been working on them and we spoke to them on 11 December. We are now asking them to confirm in writing that everything is finished. We'll update you by 16 December. If you think anything has been missed, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish that works are complete or that the landlord pays the contractor directly
- Does not close the ticket
- Event 042 call summary is vague; its content is not treated as completion evidence

## Remaining work
- Written completion confirmation from Riverside (agency, review 16 Dec)
- Confirm landlord pays contractor directly, then skip invoice and tell landlord
- Tenant confirmation, then close without payment

## Missing or unavailable information
- Written completion confirmation
- Landlord's payment arrangement
- Attachments at event 004 unavailable (never seen)

## Conflicts between sources
- Stage hint says provider assigned/visit not booked, but history shows landlord's own contractor started work 20 Nov; trusted the history.
- Landlord emails name different people (Rowan, Felix, Harper, Leo); treated as one landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and his contractor has done or is finishing the works (tree/hedge/weeds). Outstanding: written completion confirmation, payment arrangement (landlord pays direct presumably), tenant confirmation, close.

**2. What is the next action, who is it for, and through which channel?**

Written completion request to Freya (Riverside) by email; tenant update by email; follow-up 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and handled by chasing; no authority or spend decision is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya (Riverside Services)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)",… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Riverside Services","purpose":"Chase written completion confirma… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
