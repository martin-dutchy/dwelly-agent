# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

This is a communal garden job run by the landlord's own contractor. I recorded the landlord's own-contractor decision, asked the landlord to confirm completion and direct payment, updated the tenant, and set a hold and follow-up for 16 Dec. No human decision is needed.

## Where the case stands
Landlord approved the works and is using their own contractor, Riverside Services (Freya). The job is on hold waiting for the landlord's written confirmation of completion, review 2025-12-16. The 11 Dec call with Freya mentioned tree removal, invoicing and completion, but no written confirmation exists.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm in writing that the garden, hedge and tree works are complete and that they are paying Riverside directly | Rowan, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: landlord's own contractor started in late November, completion being confirmed, next update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Hold and follow-up on 16 Dec to chase the landlord, then close without payment once completion is confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> - Has Freya (Riverside Services) finished the communal garden, hedge and side-path works, including the tree trim, and can you confirm this in writing?
> - Please confirm you are paying Riverside Services directly, so we need no invoice from them.
> 
> Why: Our 11 Dec call with Freya mentioned tree removal, invoicing and completion, but we have nothing written confirming the work is done. We need that to close the job and update the tenants.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry,
> 
> A quick update on the communal garden and hedge work. The landlord is using their own contractor, Riverside Services, who started in late November. We spoke to them on 11 December and are now asking the landlord to confirm in writing that everything is finished, including the tree trimming. I'll update you by 16 December. If anything is still not done by then, let us know.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are finished.
- The recorded decision does not establish who pays; the landlord paying direct is still to be confirmed.
- The tenant update does not promise any date for the work.

## Remaining work
- Landlord to confirm completion and direct payment
- Tell the tenants of both flats (26 and 44) once complete
- Skip the invoice with a reason and close without payment
- Chase on 16 Dec if there is no reply

## Missing or unavailable information
- Written confirmation of completion
- Content of event 042 call beyond the summary
- Attachments from event 004 (unavailable)

## Conflicts between sources
- Stage says provider assigned, but history shows the landlord's own contractor is doing the work. Treated as landlord's own contractor.
- Event 036 said no tenant contact needed, but tenants were promised updates at event 023, so I updated the tenant.
- Landlord messages carry mixed names (Rowan, Leo, Felix) and event 007 is garbled. I relied on events 022 and 026 for approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the work and Riverside Services is doing it as their own contractor. It is on hold waiting for written confirmation that the work is finished, including the tree trim. The landlord is likely paying direct, but that is not yet confirmed. The invoice is to be skipped, and the tenants and landlord are to be told before closing.

**2. What is the next action, who is it for, and through which channel?**

I emailed the landlord to ask for written confirmation of completion and direct payment. I emailed the tenant, Henry, with a status update. I scheduled a chase for 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and waiting on the landlord, so there is nothing to escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Has Frey… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Waiting for landlord's written confirmation that Riv… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","purpose":"Chase landlord for completion confirmation; then tell tenant, … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Stage shows provider assigned but job is run by the landlord's own contractor (Riverside Se… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
