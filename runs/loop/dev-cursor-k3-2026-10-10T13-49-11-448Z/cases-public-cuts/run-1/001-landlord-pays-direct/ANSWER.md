# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works are on the landlord's own contractor route (Riverside Services). It is unconfirmed whether they are finished. I recorded the route, added a note, updated the tenant, asked the landlord to confirm completion by 16 Dec, and set a follow-up.

## Where the case stands
Stage mp_time, on hold (Waiting for Provider). Landlord's own contractor Riverside Services started works about 20 Nov; completion not confirmed in writing. No agency visit or invoice. Waiting on landlord and tenant confirmation, review 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Asked landlord to confirm by 16 Dec that all works are done and that he pays Riverside directly | Rowan, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Updated tenant on status, asked him to confirm the work is done, next update by 16 Dec | Henry, tenant Flat 26 | email | A3 ✅ |
| 3 | WAIT | Follow-up 16 Dec to confirm completion, then close without payment | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Henry (tenant, Flat 26) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge work. The landlord is arranging this with their own contractor, Riverside Services, and work started around 20 November (delayed a little by a nesting bird in a tree). We spoke to the contractor yesterday and are waiting for written confirmation that it is all finished. Please let us know whether the weeds, the hedge by the side path and the area at the side of your flat have been done. We will update you again by 16 December. Sorry for the slow progress.

**A4 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we spoke to Freya at Riverside Services on 11 December about the garden works and invoicing. Could you confirm by 16 December whether all the work is finished (weeds, side hedge, the area beside Flat 26, and the tree), and that you will pay Riverside directly? Once we have that, and the tenant's confirmation, we can close the job without an agency invoice. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is complete
- The call summary at event 042 does not prove completion, so the ticket is not closed
- Nothing here decides who pays beyond the landlord's own contractor route

## Remaining work
- Written confirmation of completion from landlord or Riverside
- Tenant confirmation
- Then close without payment (landlord pays direct)
- Attachments at event 004 unavailable and not seen
- Tenant at flat 44 was also mentioned as a reporter; not separately contacted (no contact on file)

## Missing or unavailable information
- Whether the works are finished and cover the hedge, weeds and the side strip
- Contents of the call at event 042 (summary only)
- Attachments at event 004

## Conflicts between sources
- Event 036 says no tenant contact is needed, but the tenants were promised updates (events 025/031); I treated the promise as current.
- Stage signals say provider assigned, but the work is the landlord's own contractor; I treated it as the own-contractor route.
- Event 007 and later landlord emails name different people (Harper, Felix, Leo, Rowan); I treated them as the same landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the works through his own contractor, Riverside Services, which started around 20 Nov. A call with Freya on 11 Dec touched on invoicing and completion, but there is no written confirmation that the work is done. Outstanding: confirmation of completion and scope, tenant confirmation, then close without payment as the landlord pays direct.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking him to confirm completion by 16 Dec, and email to the tenant with an update and a request to confirm. Follow-up set for 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on confirmations; no spend, safety or legal decision is involved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya) arranged communal garden works… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Henry (tenant, Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticke… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord, Riverside Services, tenant","purpose":"Chase written c… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
