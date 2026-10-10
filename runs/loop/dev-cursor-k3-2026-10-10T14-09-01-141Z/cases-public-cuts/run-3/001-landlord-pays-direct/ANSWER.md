# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works are with the landlord's own contractor, and the 11 Dec call with her did not confirm completion. I recorded the own-contractor route, asked the landlord to confirm completion and direct payment, updated the tenant, and set a follow-up for 16 Dec.

## Where the case stands
Landlord's own contractor (Freya, Riverside Services) is doing the garden works; on hold waiting for provider to confirm all done. Completion is not confirmed in writing. Landlord asked to confirm completion and direct payment by 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm works complete and that he pays Freya directly, reply by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord's contractor, completion unconfirmed, next update by 16 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up 16 Dec; then close without payment if confirmed | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Rowan (landlord)** (verified)

> Please confirm in writing whether Freya (Riverside Services) has finished all the garden works (weeds, side hedge, tree trim, no-man's-land strip) and that you will pay her directly, so we can close this job. Reply by 2025-12-16.
> 
> Options: Yes - all works complete and I'll pay Freya directly; Not complete - remaining works and expected date
> 
> Update: Our call with Freya on 11 Dec touched on tree removal, invoicing and completion, but nothing was confirmed in writing. No agency spend is involved; this job is on your own-contractor route.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord is using his own contractor, who started in late November. The tree trimming was delayed, and we spoke to the contractor on 11 December. We are now asking the landlord to confirm in writing that everything is finished. We haven't had that confirmation yet, so please don't treat the job as done. If anything is still outstanding, let us know. We will update you by 16 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is finished or who pays
- The 11 Dec call summary does not establish completion
- Nothing was closed

## Remaining work
- Landlord to confirm completion and direct payment (owner: landlord, chase 16 Dec)
- Then close without payment and inform tenant (owner: agency)

## Missing or unavailable information
- Written confirmation of completion
- Scope actually done (hedge, weeds, no-man's-land strip)
- Event 004 attachments unavailable

## Conflicts between sources
- Landlord names vary across events (Rowan, Leo, Grace Nolan, Harper, Felix Kendall); treated as the same landlord/agency legacy mismatch
- Stage shows provider assigned (event 035) while holds say the landlord's own contractor is doing the work; treated as own-contractor route
- Event 036 says no tenant contact needed, but tenants were promised updates; updated the tenant

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Landlord approved quoted works with his own contractor Freya (Riverside Services). Work started around 20 Nov, tree trimming was delayed by pigeons, and a call on 11 Dec discussed completion and invoicing. Written completion confirmation and the payment route are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for written confirmation of completion and direct payment by 16 Dec (A3). Email to the tenant with a status update (A4). Follow-up on 16 Dec (A5).

**3. Does anything need a human decision?**

No. This is routine work on the landlord's own-contractor route and no agency spend is involved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Yeah, I've asked Freya to let me know when she's … | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services); landlord quoted and approved … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Rowan","ticket_ref":"NBL-001-landlord-pays-direct","decision_needed":"Please confirm in writing whether Freya (Riverside Servic… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","purpose":"Chase landlord for written confirmation of completion and dire… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
