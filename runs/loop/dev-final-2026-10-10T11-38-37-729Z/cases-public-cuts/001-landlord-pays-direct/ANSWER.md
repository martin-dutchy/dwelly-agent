# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord is using their own contractor for the communal garden and hedge job. I recorded that decision and asked the landlord to confirm completion and direct payment. A follow-up is set for 15 Dec. The job stays open until that confirmation arrives.

## Where the case stands
Stage mp_time, on hold "Waiting for Provider". Landlord's own contractor (Riverside Services/Freya) is doing the communal garden works. A 11 Dec call suggests the works are done, but nothing is confirmed in writing. We have asked the landlord for confirmation. Follow-up is set for 15 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm in writing that the works are complete and that they pay the contractor directly | Rowan, landlord | email | A2 ✅ |
| 2 | WAIT | Review on 15 Dec. If confirmed, tell the tenant and close without payment. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Rowan (landlord) (landlord) via email, existing thread (event 029 email)** (verified)

> - Can you confirm in writing that Freya (Riverside Services) has finished the communal garden and hedge works, including the tree trimming?
> - Please confirm you are paying Riverside Services directly, so we do not expect an invoice.
> 
> Why: Our 11 Dec call with Freya mentioned completion and invoicing, but there is nothing in writing, so we cannot close the job yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's own-contractor decision does not confirm the works are finished.
- The ask to the landlord does not mean the job is closed or that a payment route is confirmed.
- The 11 Dec call summary is too vague to treat as completion evidence.

## Remaining work
- Get written confirmation of completion and of direct payment from the landlord or Freya (agency, due 15 Dec).
- Tell the tenant the works are done once confirmed.
- Close without payment once confirmed.

## Missing or unavailable information
- Written completion confirmation
- Confirmation that the landlord pays direct
- Freya's contact details (none on file)
- The two attachments at event 004 were unavailable

## Conflicts between sources
- Event 036 says the job is external and needs no tenant contact, but the tenant was told earlier (events 025 and 031) that they would be updated. The tenant should get a short completion update.
- Event 007 and the hint's approval record name different people (Grace, Harper, Rowan, Felix, Leo) for the landlord. I treated them as the same landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's own contractor has been working since about 20 Nov. The 11 Dec call hints that the works are done and invoiced, but nothing is in writing. Outstanding: written completion, confirmation that the landlord pays direct, telling the tenant, then close.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord by email, on the existing thread, to confirm completion and direct payment. The email request logged an API timeout but read-back shows it is in place (REQ-101), so I did not retry it. A follow-up is set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine. The only caveat is that the email request showed a timeout, although read-back shows it went through. If REQ-101 turns out not to have been delivered, the 15 Dec follow-up will catch it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","questions"… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord / Riverside Services","purpose":"Chase written confirma… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
- A2: The API reported a timeout, but read-back shows REQ-101 is in place. Not retried, per instruction. Not claimed as done; the 15 Dec follow-up checks it.
