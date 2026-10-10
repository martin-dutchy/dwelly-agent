# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden, hedge and tree works are with the landlord's own contractor, Freya. After the 11 Dec call there is no written confirmation that they are done. I recorded the landlord's go-ahead as own_contractor, asked the landlord for written completion and direct-payment confirmation, updated the tenant, and set a follow-up for 15 Dec.

## Where the case stands
Landlord's own contractor (Freya, Riverside Services) is doing the works. Landlord go-ahead is recorded and the job is on hold, waiting for written confirmation that the works are done. The 11 Dec call with Freya discussed tree removal, invoicing and completion, but its summary does not say the works are finished. Ticket stage is mp_time.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm in writing that the works are complete and that he pays Freya's invoice directly | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update Henry that written completion confirmation is awaited, with the next update by 15 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Chase on 15 Dec; if complete is confirmed, close without payment | Landlord / Freya | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, existing thread (event 029 email)** (verified)

> Hi, following our call with Freya on 11 Dec about the garden, hedge and tree works at Flat 26, 46 Copperfield Walk, we don't yet have written confirmation that everything is finished. Could you or Freya confirm by email that all the works are complete, and that you are settling Freya's invoice directly? Once we have that we can close the job. We will check back on 15 December.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord's contractor has been working on them and we spoke to them on 11 December. We are waiting for written confirmation that everything is finished. If anything still looks untidy, please let us know. We will update you by 15 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are finished.
- Recording own_contractor does not establish who pays; that is to be confirmed by the landlord.
- No work result was recorded and the ticket was not closed.

## Remaining work
- Written completion confirmation from the landlord or Freya (agency, 15 Dec follow-up)
- Confirm the landlord pays direct, then close without payment
- Tenant check that the work is satisfactory

## Missing or unavailable information
- Written completion confirmation
- The two attachments at event 004 are unavailable
- The call 042 content is only summarised

## Conflicts between sources
- The history says 'Maintenance provider assigned' (event 035), but the landlord's own contractor is doing the job. I treated it as the landlord's contractor.
- Event 036 says no tenant contact is needed, but the tenant was earlier promised updates. I sent a brief update.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved and his contractor Freya is doing the works. The latest call (11 Dec) discussed completion and invoicing, but no written confirmation of completion has arrived. Outstanding: written completion confirmation, confirmation that the landlord pays direct, and the tenant's check.

**2. What is the next action, who is it for, and through which channel?**

An email to the landlord asking for written confirmation that the works are complete and that he pays direct (A2). The tenant has also been updated by email (A3), and a follow-up is set for 15 Dec (A4).

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on confirmation from the landlord or contractor.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord / Freya (Riverside Services)","purpose":"Chase written … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
