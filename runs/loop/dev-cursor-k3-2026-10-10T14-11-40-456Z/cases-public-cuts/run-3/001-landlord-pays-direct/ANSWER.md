# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's own contractor has been carrying out the communal garden works since about 20 Nov. A 11 Dec call with Freya covered tree removal, invoicing and completion, but nothing is in writing. I recorded the own-contractor route, asked the landlord to confirm completion and direct payment by 15 Dec, updated the tenant and set a follow-up.

## Where the case stands
Stage mp_time, on hold "Waiting for Provider". Landlord's own contractor (Freya, Riverside Services) is doing the communal garden/hedge/tree works. A call on 11 Dec discussed tree removal, invoicing and completion, but there is no written confirmation of completion. Waiting on the landlord's confirmation, due 15 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask landlord to confirm in writing by 15 Dec that all works are complete and that they pay Riverside directly | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on status and say they will hear again by 16 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord on 15 Dec, then close without payment once completion is confirmed | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hello Rowan, our call with Freya (Riverside Services) on 11 Dec covered the tree removal, invoicing and completion, but we have nothing in writing yet. Could you please confirm by Monday 15 December: (1) whether all the garden, hedge and tree works at Copperfield Walk are now complete, and (2) that you will pay Riverside Services directly, so we need no invoice from them. Once confirmed we will update the tenants and close the job. Thank you.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord's contractor has been working on them, and we spoke to them on 11 December about the tree removal and finishing off. We are now asking the landlord to confirm everything is complete. We'll update you by Tuesday 16 December. If you see anything still outstanding, please let us know. Sorry for the long wait.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the works are finished or who pays
- The call summary is not evidence of completion
- No closure, invoice or payment action taken

## Remaining work
- Landlord to confirm completion and direct payment (agency)
- Update the tenant at Flat 44, who also reported the issue; no contact details are on file in this case
- Close without payment after confirmation

## Missing or unavailable information
- Written confirmation of completion
- Who pays Riverside
- Contact details for the tenant at Flat 44
- The two attachments from event 004 were unavailable

## Conflicts between sources
- Event 036 says no tenant contact is needed, but event 023 promised updates to the tenants, so I updated the tenant.
- Event 035 says 'Maintenance provider assigned', but the work is by the landlord's own contractor.
- Names in the summaries differ (Rowan/Leo/Felix/Harper/Henry, Juniper Homes/Northbridge). I treated these as the same parties.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's contractor appears to have done the works, with a final tree job discussed on 11 Dec. Written confirmation of completion and of who pays is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for confirmation by 15 Dec, an email update to the tenant, and a follow-up set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), landlord instructed works (ev… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord-pa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord","purpose":"Chase landlord for written confirmation wor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
