# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works are being done by the landlord's own contractor, Freya of Riverside Services. The latest call (event 042) is vague about completion, so I recorded the own-contractor route and asked the landlord to confirm completion and direct payment. I also updated the tenant and put the ticket on hold until 16 Dec.

## Where the case stands
Ticket at mp_time, on hold (Waiting for Landlord, review 2025-12-16). Landlord's own contractor (Freya, Riverside Services) has been doing the works since 20 Nov; completion and payment route not confirmed in writing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm in writing the works are complete and that they pay the contractor directly, reply by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that landlord's own contractor is doing the works, ask if they look finished, next update by 16 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 16 Dec for landlord and tenant replies | Rowan, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Rowan (landlord)** (verified)

> Please confirm in writing (1) whether Freya's garden, hedge and tree works at Flat 26, 46 Copperfield Walk are now complete, and (2) that you will pay her invoice directly. Reply by 2025-12-16.
> 
> Options: Yes, works complete and I will pay the contractor directly; Works not complete yet - here is the expected date; Other
> 
> Update: We are treating this as your own contractor (Riverside Services). Our call with Freya on 11 Dec discussed a tree removal, invoicing and completion but we have no written confirmation. We have not assigned our own contractor.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord is arranging this with their own contractor, who started on 20 November; a nesting pigeon in the tree caused a delay. We're now confirming with the landlord and contractor that everything is finished. Could you let us know if the garden, hedge and side path look done to you? We'll update you again by 16 December. Sorry for the wait.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is complete or who pays
- No contractor assigned by us; nothing closed
- The tenant message does not establish completion

## Remaining work
- Landlord to confirm completion and direct payment (then close without_payment)
- Tenant confirmation of the result
- Review on 16 Dec

## Missing or unavailable information
- Written confirmation of completion
- Whether landlord pays directly; no invoice seen
- Event 004 attachments unavailable

## Conflicts between sources
- Event 035 'Maintenance provider assigned' vs landlord's own contractor route; trusted the landlord's emails.
- Event 036 says no tenant contact needed, but the tenant reported the issue and was told earlier, so I updated them.
- Names in summaries vary (Rowan, Leo, Felix, Harper); treated as the same landlord and agent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's own contractor started on 20 Nov, with a delay for a pigeon nest. Completion is not confirmed in writing, and there is no invoice or tenant confirmation. The hold has been repointed at the landlord.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking them to confirm completion and direct payment by 16 Dec. Email to the tenant asking them to confirm the works look finished.

**3. Does anything need a human decision, and why?**

No. This is a routine landlord-own-contractor job that is waiting on replies.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), quotes agreed by landlord dir… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Rowan","ticket_ref":"NBL-001-landlord-pays-direct","decision_needed":"Please confirm in writing (1) whether Freya's garden, hed… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Landlord's own contractor: awaiting written confirma… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |

## Failed or unverified actions
_None._
