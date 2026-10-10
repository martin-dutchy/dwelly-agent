# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord is handling the communal garden works through their own contractor, Riverside Services, and paying them directly. Completion is unconfirmed. I recorded the landlord's decision, asked the landlord to confirm completion, updated the tenant, and put the job on hold with a review date of 2025-12-15.

## Where the case stands
Landlord is using their own contractor (Riverside Services) and pays direct. Works started around 20 Nov. The 11 Dec call with Freya touched on tree removal, invoicing and completion, but completion is not confirmed. The job is on hold waiting for the landlord to confirm, review 2025-12-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm that all Riverside works are complete | Rowan, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord's own contractor, completion not yet confirmed, next update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-12-15 for the landlord's completion confirmation, then close without payment | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we spoke to Freya at Riverside Services on 11 December about the communal garden and hedge works at Flat 26, 46 Copperfield Walk, including a tree removal, invoicing and completion. Our notes of the call are brief, so could you confirm one thing: are all the works now finished, including the hedge, weeds and side path? Once you confirm, we will let the tenants know and close our job. We understand you are paying Riverside directly, so we will not chase an invoice. Thank you.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord's own contractor, Riverside Services, started in late November and we spoke to them on 11 December. We are now asking the landlord to confirm everything is finished. We have not yet had that confirmation, so please do not take it as complete. We will update you by 16 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are complete.
- Recording own_contractor does not mean we assigned or instructed Riverside.
- No invoice or payment is handled by the agency.

## Remaining work
- Landlord to confirm completion; the agency then closes without_payment and tells the tenants (Flat 26 and 44).
- Review on 2025-12-15 and chase the landlord on a second channel if there is no reply.

## Missing or unavailable information
- Clear written confirmation of completion
- Event 042 call detail
- Attachments at event 004 (unavailable)

## Conflicts between sources
- The system stage says 'provider assigned', but the notes show the landlord's own contractor is doing the work.
- The event 029 emoji reply is not treated as approval; event 026 is the basis.
- The ticket stage is mp_time, but the works are in progress.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's contractor has been working since about 20 Nov, and a call on 11 Dec discussed completion, but no written confirmation of completion has been received. The job is on hold, waiting for the landlord to confirm completion.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord, Rowan, asking whether all the works are complete (done). A tenant update was also emailed to Henry. The review date is 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up, so no escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord-pa… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Waiting for landlord to confirm Riverside works are … | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Landlord uses own contractor (Riverside Services) and pays direct. Event 029 emoji reply is… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
