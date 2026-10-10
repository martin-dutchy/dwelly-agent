# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job is on the landlord's own contractor route. Recorded that decision, noted the file, and asked Freya and the landlord to confirm completion. Updated the tenant and set a 15 Dec follow-up. No human decision is needed.

## Where the case stands
Landlord's own contractor (Riverside Services) is doing the garden/hedge/tree works, landlord pays direct. Ticket on hold waiting for provider. Completion not yet evidenced in writing. Waiting on Freya and the landlord; review 15 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Freya for written confirmation of attendance dates, completion and photos by 15 Dec | Freya, Riverside Services, contractor | email | A3 ✅ |
| 2 | CHASE_LANDLORD | Ask landlord to confirm whether the works are complete | Rowan, landlord | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant on status, next update 16 Dec | Henry, tenant | email | A5 ✅ |
| 4 | WAIT | Review on 15 Dec; close without payment once completion is confirmed | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Freya (Riverside Services) (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking to Leo. For the Copperfield Walk communal garden, hedge and tree works, please could you confirm in writing: the dates you attended, whether everything is finished (weeds, side-path hedge, tree), and any photos of the finished work. Please also let us know if anything is outstanding. We understand the landlord is paying you directly. We'd be grateful for a reply by 15 December.

**A4 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we're treating the Copperfield Walk garden works as your own contractor (Riverside Services) paid by you directly. Leo spoke to Freya on 11 Dec about the tree removal, invoicing and completion, but we have no written confirmation yet that all work is finished. We've asked Freya for this by 15 December. Please could you tell us whether the works are complete as far as you know? Once confirmed we can close the job.

**A5 · send_message → Henry (tenant, Flat 26) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update. The landlord is arranging the communal garden works with their own contractor, Riverside Services, and work has started (including a tree). We're waiting for the contractor to confirm in writing that it's all finished. We'll update you by 16 December. If you notice anything still not done, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own-contractor route does not confirm the work is complete
- Messages do not establish what was agreed on the 11 Dec call
- Nothing has been closed or paid

## Remaining work
- Freya to confirm completion in writing (owner: provider)
- Landlord to confirm completion (owner: landlord)
- Close without payment after confirmation and tenant update (owner: agency, 15 Dec review)
- Event 044 reporter flat mentioned at event 023 (tenant at 44) not separately contacted; no contact on file

## Missing or unavailable information
- Content of the 11 Dec call with Freya
- Completion dates and evidence
- Attachments from event 004 unavailable
- Contact for the second reporting tenant (no.44)

## Conflicts between sources
- Stage hint says provider assigned, but history shows landlord's own contractor; event 036 says no tenant contact needed but tenant was promised updates. Treated own-contractor route as current.
- Event 029 emoji reply is not a decision; event 026 used as authority.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved works with their own contractor, Riverside Services, paid direct. Works apparently under way or done (tree, event 042 call) but no written completion confirmation. Outstanding: completion evidence, landlord confirmation, tenant update, then close without payment.

**2. What is the next action, who is it for, and through which channel?**

Email to Freya asking for written completion confirmation by 15 Dec; email to landlord asking to confirm completion; email to tenant Henry with status; follow-up set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and waiting on the provider and landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya), landlord pays direct. Event 0… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Freya (Riverside Services)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Henry (tenant, Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticke… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Freya, Riverside Services / landlord","purpose":"Check written c… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
