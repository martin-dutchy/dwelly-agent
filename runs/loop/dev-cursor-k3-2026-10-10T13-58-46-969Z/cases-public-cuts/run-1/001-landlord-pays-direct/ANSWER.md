# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Job is on the landlord's own-contractor route. I recorded that decision, added a note, asked the landlord to confirm completion and direct payment, updated the tenant and set a follow-up for 16 Dec. No human decision needed.

## Where the case stands
Landlord's own contractor (Freya, Riverside Services) is doing the work, started ~20 Nov, delayed by pigeon nest. Hold "Waiting for Provider: confirm all done". Completion not yet confirmed in writing; landlord pays direct, so no invoice expected.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask landlord to confirm work complete and that he pays Freya directly, by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting for completion confirmation, next update by 17 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up 16 Dec, then close without payment if completion confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we spoke to Freya (Riverside Services) on 11 Dec about the garden and tree work at Flat 26, 46 Copperfield Walk. We have not yet had written confirmation that everything is finished. Could you please confirm by Tuesday 16 December: (1) whether all the work (weeds, hedge, tree and side strip) is complete, and (2) that you will pay Freya directly, so we need no invoice from her. We'll then close the job and let the tenants know. Thanks.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden work. The landlord's contractor started in late November; the tree trimming was held up by a nesting pigeon. We spoke to the contractor on 11 December and are now waiting for confirmation that everything is finished. We'll update you by Wednesday 17 December. If you notice anything left undone, please tell us. Thanks for your patience.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is complete
- The 11 Dec call content is only summarised; it is not proof of completion
- Nothing closed or paid

## Remaining work
- Completion confirmation from landlord/Freya (agency, due 16 Dec)
- Close without payment once confirmed and tenants told
- Check the side strip of land was included in the works

## Missing or unavailable information
- Written confirmation of completion
- Whether the 'no man's land' strip was in scope
- Attachments from event 004 unavailable

## Conflicts between sources
- Event 034/035 show 'provider assigned' and a system stage of mp_time, but the landlord's own contractor is doing the work.
- Event 036 says no tenant contact needed, but the tenant was updated earlier and asked for updates.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord's contractor Freya is doing the work, which started around 20 Nov. The 11 Dec call discussed tree removal, invoicing and completion, but nothing is confirmed in writing. Outstanding: confirmation of completion and direct payment, then close.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking him to confirm completion and direct payment by 16 Dec; email to the tenant with a status update; follow-up set for 16 Dec.

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on the landlord and contractor.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), landlord pays direct. Started… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord-pa… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord / Freya","purpose":"Chase completion confirmation and d… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
