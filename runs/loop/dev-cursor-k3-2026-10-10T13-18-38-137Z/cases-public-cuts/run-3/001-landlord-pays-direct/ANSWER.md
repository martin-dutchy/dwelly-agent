# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The communal garden works are being done by the landlord's own contractor, Riverside Services. I recorded the landlord's go-ahead as own_contractor and asked the landlord for written confirmation of completion and direct payment. I updated the tenant. A follow-up is set for 15 Dec.

## Where the case stands
Landlord's own contractor (Riverside/Freya) began works about 20 Nov. Job on hold, waiting for written confirmation of completion. The 11 Dec call mentioned invoicing and completion but gave no clear confirmation. Landlord has been asked to confirm by 15 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in writing that all works are complete and that they pay Riverside directly, by 15 Dec | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord is arranging own contractor, completion being checked, next update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up with landlord on 15 Dec; then close without payment if confirmed | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, existing thread (event 029 email)** (verified)

> Hi, a quick check on the communal garden and hedge works at Flat 26, 46 Copperfield Walk with Riverside Services (Freya). Our call with Freya on 11 Dec mentioned a tree job, invoicing and completion, but we have nothing in writing. Could you confirm by Monday 15 December: (1) are all the works finished, including the hedge, weeds and side path area? (2) Are you paying Freya directly? Once confirmed we will close our job without payment. Thank you.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, an update on the communal garden and hedge works. The landlord is arranging this with their own contractor, who started in late November. We are now checking with the landlord that everything is finished, including the hedge and side path. We will update you by Tuesday 16 December. If any part still looks untouched by then, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not confirm that the works are complete or who pays.
- Tenant update does not promise a completion date.
- Nothing is closed.

## Remaining work
- Landlord confirmation of completion and direct payment, owner: agency ops, review 15 Dec
- Close without payment once confirmed and tell tenant
- Ticket stage and hold still show provider assigned and waiting for provider

## Missing or unavailable information
- Written confirmation that works are complete
- The two attachments from event 004 were unavailable
- Content of the 11 Dec call is only summarised

## Conflicts between sources
- Event 036 says no tenant contact is needed, but the tenant reported the issue and was promised updates (event 023), so I updated them.
- Ticket stage says provider assigned, but the landlord is using their own contractor. Treated as own_contractor.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved works with their own contractor, which started about 20 Nov. The tree and pigeon delay and the 11 Dec call suggest it is near done, but completion is not confirmed in writing. Outstanding: confirmation of completion, direct payment, tenant update and closure.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for confirmation of completion and direct payment by 15 Dec (sent). Tenant update by email (sent).

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the landlord's confirmation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord","purpose":"Chase landlord for written confirmation wor… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
