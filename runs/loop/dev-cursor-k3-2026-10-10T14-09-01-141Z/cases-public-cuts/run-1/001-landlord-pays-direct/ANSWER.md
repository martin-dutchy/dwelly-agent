# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The job is on the landlord's own-contractor route, and the works appear near completion but are unconfirmed in writing. I recorded the route, asked the landlord and Freya for confirmation by 15 Dec, updated the tenant and set a hold and follow-up. No human decision is needed.

## Where the case stands
Landlord's own contractor (Freya, Riverside Services) quoted and approved; works started ~20 Nov, tree trimming delayed by nesting pigeons. Latest call (event 042) covered tree removal, invoicing and completion but no written completion. On hold, waiting on provider/landlord, review 2025-12-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm completion and that he pays Freya directly, by 15 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | CHASE_PROVIDER | Ask Freya for written completion, finish date, photos and invoice by 15 Dec | Freya, Riverside Services, contractor | email | A5 ✅ |
| 3 | REPLY_TO_TENANT | Update Henry on status, say we will update again by 15 Dec | Henry, tenant | email | A4 ✅ |
| 4 | WAIT | Hold and follow-up to 15 Dec, then close without payment if confirmed | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, an update on the communal garden and hedge works at Flat 26, 46 Copperfield Walk. We have this down as your own contractor (Freya, Riverside Services) doing the work, on the go-ahead you gave on 5 November. Our latest call with Freya mentioned the tree work, invoicing and completion, but we haven't had written confirmation that everything is finished. Could you let us know by Monday 15 December: (1) whether all the work is complete, including the hedge, weeds and the strip of land at the side; and (2) whether you are paying Freya directly, so we can close this without an invoice on our side. We will also ask Freya for written confirmation. Thanks.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord's own contractor started in late November, and we spoke to them yesterday and today about finishing off, including some tree trimming. We are waiting for written confirmation that everything is complete, and have asked the landlord too. Please let us know if the weeds, hedge along the side path or the side strip still look unfinished. We'll update you by Monday 15 December.

**A5 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for the call. Please could you confirm in writing by Monday 15 December: that the garden, hedge and tree works at 46 Copperfield Walk are complete, the date you finished, and a few photos if you can. Please also send your invoice addressed as the landlord has agreed, so we can close our job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is complete or who pays.
- Messages do not promise any completion date.
- Nothing closed; no invoice seen.

## Remaining work
- Written completion from Freya (provider)
- Landlord confirmation of completion and direct payment
- Tenant confirmation that work is satisfactory
- Close ticket without payment after the above (owner: agency ops, 15 Dec)

## Missing or unavailable information
- Written completion confirmation
- Payment route confirmation
- Event 004 attachments unavailable
- Content of event 042 call beyond summary

## Conflicts between sources
- Event 035 'Maintenance provider assigned' and event 036 note 'external job, no tenant contact' vs landlord arranging own contractor and tenant having been promised updates; treated landlord's own-contractor route as current.
- Event 007 names different people (Grace Nolan, Harper) from the record; treated as the landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord's own contractor Freya (Riverside Services) is doing the works, approved 3 and 5 Nov. Latest call mentioned tree removal, invoicing and completion. Outstanding: written completion, payment route (likely landlord direct), tenant confirmation, then close.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord and to Freya asking for completion and payment confirmation by 15 Dec, email update to tenant Henry, hold and follow-up on 15 Dec.

**3. Does anything need a human decision, and why?**

No. It is routine confirmation work; nothing exceeds authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), quoted and approved by landlo… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","purpose":"Check Freya's written completion, landlord confirmation and pa… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Provider","comment":"Landlord's own contractor Freya: awaiting written co… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |

## Failed or unverified actions
_None._
