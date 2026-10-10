# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job running on the landlord's own contractor (Freya, Riverside Services). The latest call mentioned tree removal, invoicing and completion, but nothing is confirmed in writing. I recorded the own-contractor route, asked the landlord to confirm completion and direct payment, updated the tenant, and set a follow-up for 15 Dec.

## Where the case stands
Ticket at mp_time, on hold waiting for provider. Landlord's own contractor (Freya, Riverside Services) is doing the works. Completion is not confirmed in writing. Waiting on landlord, follow-up 2025-12-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm yes/no that all works are finished and that they pay Freya directly, by 15 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that the landlord's own contractor is doing the works and we are confirming completion; next update by 15 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up with landlord on 15 Dec; if completion is confirmed and they pay direct, close without payment | Rowan, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Rowan (landlord)** (verified)

> Please confirm (yes/no) that Freya at Riverside Services has finished all the communal garden, hedge and tree works, and that you are paying her directly.
> 
> Options: Yes, all done and I pay Riverside Services directly; Not finished - remaining works and expected date; Finished but please invoice via agency
> 
> Update: We understand Freya is your own contractor and we have not assigned anyone else. Our call with her on 11 Dec was about a tree removal, invoicing and completion, but we have no written confirmation that it is finished. Please reply by 2025-12-15. If you have the completion date or her invoice, please send it.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord is arranging this with their own contractor, who started in late November; a nesting pigeon delayed the tree trimming. We're waiting for written confirmation that everything is finished and have asked the landlord for it. Sorry if earlier messages were unclear. We'll update you by 15 December. If anything still looks unfinished, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is done or who pays
- The tenant update does not promise a completion date
- The unavailable attachments at event 004 were not seen

## Remaining work
- Landlord to confirm completion and direct payment (agency, by 15 Dec)
- Close without payment once confirmed
- Update the tenant at Flat 44, who reported the same issue; no contact details are on file, so ask the records colleague for them

## Missing or unavailable information
- Written completion confirmation
- Outcome of the 11 Dec call with Freya (no readable detail)
- Contact details for the Flat 44 tenant

## Conflicts between sources
- Event 035 'provider assigned' vs landlord using own contractor: treated the landlord route as current.
- Event 036 'no tenant contact needed' vs earlier promises to update tenants: tenant updated anyway.
- Landlord names vary across emails (Rowan, Felix, Leo, Harper): treated as the same landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved and Freya (the landlord's own contractor) started on 20 Nov. The tree trim was delayed by a pigeon nest. The 11 Dec call covered invoicing and completion, but no written confirmation of completion exists. The ticket is on hold as 'waiting for provider'. Outstanding: confirmation the work is done and that the landlord pays direct.

**2. What is the next action, who is it for, and through which channel?**

Email to Rowan, the landlord, asking for yes/no confirmation of completion and direct payment by 15 Dec. Email to Henry, the tenant, with a status update. Follow-up is set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine. Once completion is confirmed, the ticket can be closed without payment.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), landlord arranging/paying dir… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Rowan","ticket_ref":"NBL-001-landlord-pays-direct","decision_needed":"Please confirm (yes/no) that Freya at Riverside Services … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord","purpose":"Chase landlord for completion confirmation … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
