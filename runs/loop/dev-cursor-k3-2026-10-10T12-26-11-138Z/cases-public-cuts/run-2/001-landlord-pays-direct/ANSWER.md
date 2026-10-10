# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's own contractor has been working on the communal garden since about 20 November. I recorded the landlord's go-ahead as own_contractor and asked Freya for written confirmation of completion and invoicing. A follow-up is set for 15 December.

## Where the case stands
Landlord's own contractor (Riverside Services, Freya) is doing the communal garden works; landlord approved on 05/11. Ticket at mp_time, on hold waiting for provider. A call on 11/12 mentioned tree removal, invoicing and completion, but the summary is vague and there is no written confirmation of completion.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Freya to confirm completion in writing and whether she is invoicing the landlord directly | Freya, Riverside Services (contractor) | email | A2 ✅ |
| 2 | WAIT | Follow up on 2025-12-15 for the written confirmation, then confirm with the tenant and close without payment if the landlord pays direct | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking to Leo today. Could you please confirm in writing that the communal garden, hedge and side-path works at 46 Copperfield Walk are fully complete (including the tree trim), and whether you are invoicing the landlord directly? A short email reply is fine. Thank you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord decision does not confirm the works are complete.
- The call summary is not evidence of completion or of who pays.
- Nothing has been closed.

## Remaining work
- Written completion confirmation from Riverside Services
- Confirm who pays (landlord direct is assumed from the ticket name only)
- Tell the tenant and landlord the outcome
- Close without payment

## Missing or unavailable information
- Written completion confirmation
- Invoice arrangements
- Content of the 11/12 call and the unavailable attachments from event 004

## Conflicts between sources
- Landlord emails name different people (Rowan, Felix, Leo, Harper), which looks like legacy or anonymisation noise. I relied on the ticket's landlord_approval 'confirmed' status and the event 026 wording.
- Event 036 says no tenant contact is needed, but the tenant raised the issue and was promised updates.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The works were approved by the landlord and are done by their contractor, with completion reportedly discussed on the 11/12 call. Still needed: written confirmation of completion, who pays, telling the tenant and landlord, then closing.

**2. What is the next action, who is it for, and through which channel?**

An email to Freya at Riverside Services asking for written confirmation of completion and the invoicing route (sent, A2). Follow-up is scheduled for 15 December (A3).

**3. Does anything need a human decision, and why?**

No. This is routine work and nothing exceeds my authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Riverside Services","purpose":"Chase written completion confirma… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
