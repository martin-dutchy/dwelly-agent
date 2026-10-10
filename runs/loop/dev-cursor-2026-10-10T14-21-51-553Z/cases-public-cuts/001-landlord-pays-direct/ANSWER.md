# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's own contractor Riverside Services has been on the communal garden works since 20 Nov, with the tree trimming delayed by a pigeon nest. Completion is unconfirmed in writing. I recorded the own-contractor route, asked the landlord to confirm completion and direct payment, updated the tenant, and set a 16 Dec follow-up.

## Where the case stands
Job on hold (Waiting for Provider) at mp_time. Landlord's own contractor, Riverside Services (Freya), is doing the works and the landlord pays direct. Completion is not confirmed in writing. Agency is waiting on the landlord's reply and Freya's confirmation, review 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm works complete and that they pay Riverside directly, by 16 Dec | Rowan, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord's contractor, awaiting completion confirmation, next update by 17 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on 16 Dec for completion confirmation, then close without payment | Landlord / Riverside Services | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Rowan (landlord) (landlord)** (verified)

> Please confirm whether Freya (Riverside Services) has finished the communal garden, hedge and tree works, and that you will pay her invoice directly.
> 
> Options: Yes, all complete and I will pay Riverside Services directly; Not complete yet - please tell us the expected finish date
> 
> Update: Your own contractor is on this job, so we have not assigned ours. Leo spoke to Freya on 11 Dec about the tree removal, invoicing and completion, but we have no written confirmation that all work is done. Please reply by 16 Dec.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge work. The landlord is arranging this with their own contractor, Riverside Services, and the work started in late November. The tree work was delayed because of a pigeon nest. We are now waiting for written confirmation that everything is finished, and we will let you know. We will update you again by 17 December. If anything still looks untidy then, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is done
- The 11 Dec call summary does not establish completion or invoice details
- No payment or closure decided

## Remaining work
- Written confirmation of completion from landlord or Freya (agency ops, 16 Dec)
- Then close the ticket without payment
- Update the tenant at Flat 44 (not on file, so no contact details to hand)

## Missing or unavailable information
- Written completion confirmation
- Contents of the two unavailable attachments at event 004
- Contact details for the Flat 44 tenant

## Conflicts between sources
- Event 036 says no tenant contact is needed, but the tenant was told earlier and asked for updates; I treated an update as appropriate.
- Stage hint says provider assigned, but the history shows landlord's own contractor; own-contractor route treated as current.
- Event 007 and 022 summaries name different people (Grace Nolan, Harper, Felix) than the landlord Rowan/Leo; treated as summary name mismatches.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's own contractor is doing the works and the landlord pays direct. The ticket is on hold waiting for the provider to confirm all is done. Written completion confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord email asking for completion and direct-payment confirmation by 16 Dec, a tenant update by email, and a follow-up on 16 Dec. After that, close without payment.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on replies.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Rowan (landlord)","ticket_ref":"NBL-001-landlord-pays-direct","decision_needed":"Please confirm whether Freya (Riverside Servic… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord / Riverside Services","purpose":"Chase written confirma… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services/Freya), landlord pays direct. Do not a… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
