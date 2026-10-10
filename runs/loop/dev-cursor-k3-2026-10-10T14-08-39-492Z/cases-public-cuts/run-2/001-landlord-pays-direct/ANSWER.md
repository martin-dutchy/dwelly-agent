# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works are with the landlord's own contractor, Riverside Services, who started around 20 Nov. The 11 Dec call with Freya mentioned the tree, invoicing and completion but confirmed nothing clearly. I recorded the own-contractor route, asked the landlord to confirm completion and direct payment, updated the tenant and set a follow-up for 16 Dec.

## Where the case stands
Routine job on hold (Waiting for Provider). Landlord approved works and is using his own contractor, Riverside Services (Freya). Completion and payment route not confirmed in writing; waiting on the landlord's reply, review 16 Dec 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm works are complete (including the strip beside Flat 26) and that he pays Riverside direct, by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: landlord's own contractor, completion being confirmed, next update by 17 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord on 16 Dec; then close without payment if confirmed | Rowan, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> - Has Riverside Services (Freya) now finished all the garden works, including the hedge, weeds, tree trim and the strip of land beside Flat 26?
> - Will you be paying Riverside Services directly, so we need no invoice from them?
> 
> Why: Our call with Freya on 11 Dec mentioned the tree removal, invoicing and completion but gave no clear confirmation. We need this to close the job. Please reply by 16 December 2025.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord is arranging these with his own contractor, Riverside Services, who started on site in late November. We spoke to them on 11 December and are now asking the landlord to confirm that everything, including the hedge and the strip beside your flat, is finished. We will update you by 17 December. If anything still looks untidy in the meantime, please let us know. Sorry for the wait.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are finished or who pays.
- Recording own_contractor does not mean the agency has approved any spend.
- The tenant message is not a completion confirmation.

## Remaining work
- Landlord to confirm completion and direct payment (agency, review 16 Dec)
- Close without payment once confirmed
- Tell the tenant at Flat 44 the outcome if that tenant is reachable on file
- Confirm the 'no man's land' strip was covered

## Missing or unavailable information
- Clear written confirmation of completion
- Whether the landlord pays Riverside directly
- Content of the 2 attachments at event 004 (unavailable)
- Call event 042 gives only a vague summary

## Conflicts between sources
- Event 035 says 'provider assigned', but notes and landlord emails show the landlord's own contractor; I treated it as own-contractor.
- Landlord emails name different people (Rowan, Felix Kendall, Leo); treated as the same landlord thread.
- Event 036 says no tenant contact is needed, but tenants were promised updates (event 023), so I updated the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved the works and uses his own contractor, Riverside Services. Works started about 20 Nov, with a tree trim delayed by nesting pigeons. Completion is not confirmed in writing and the payment route is not confirmed. The ticket stays on hold.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord, Rowan, to confirm completion and direct payment by 16 Dec (sent). Tenant Henry was updated by email. Follow-up set for 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's own contractor is doing the work, so waiting for confirmation is enough.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya) for communal garden/hedge work… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Has Rive… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase landlord for confirmation works compl… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
