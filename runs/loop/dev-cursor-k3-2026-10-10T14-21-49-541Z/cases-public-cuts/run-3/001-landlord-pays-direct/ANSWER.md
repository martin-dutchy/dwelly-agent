# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden job is on the landlord's own-contractor route and probably near completion, but nothing is confirmed in writing. I recorded the route, asked the contractor and landlord for confirmation by 16 Dec, updated the tenant and set a follow-up.

## Where the case stands
Landlord's own-contractor route (Freya, Riverside Services); stage mp_time, on hold waiting for provider. Completion not yet confirmed in writing. Landlord pays direct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Freya for written completion confirmation, date and photos by 16 Dec | Freya, Riverside Services, contractor | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm works complete and that he pays Freya directly, by 16 Dec | Rowan, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant that landlord's contractor is finishing, next update by 18 Dec | Henry, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up 16 Dec; then close without payment if confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Rowan (landlord)** (verified)

> Confirm whether Freya (Riverside Services) has finished the communal garden, hedge and tree works, and that you are paying her directly
> 
> Options: Yes, all complete and I'll pay Freya directly (we'll close the job without payment); Not finished: please tell us what remains and the expected date
> 
> Update: We are treating this as your own-contractor job. Our 11 Dec call with Freya touched on a tree removal, invoicing and completion, but we have no written confirmation of completion. We are asking Freya for the date finished and photos. Please reply by 16 Dec.

**A3 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking to Leo on 11 Dec. For the communal garden, hedge and tree works at 46 Copperfield Walk, could you confirm in writing by 16 Dec: whether everything is finished, the date it was completed, and photos of the work (including the side path hedge and the tree)? If anything remains, please give the expected date. Thank you.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, an update on the communal garden works. The landlord is arranging these with his own contractor, who has been working on them (a pigeon nest in a tree delayed some of the trimming). We're waiting for the contractor to confirm everything is finished and will let you know once we hear. You'll hear from us again by 18 December. If anything still looks untidy meanwhile, tell us and we'll pass it on.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish the works are complete
- Does not approve any spend; landlord pays contractor directly
- Recording own_contractor does not mean the agency assigned anyone

## Remaining work
- Provider written completion and photos (Freya)
- Landlord confirmation of completion and direct payment
- Close without payment after that
- Possibly a second tenant (flat 44) update: only Flat 26 contact is on file

## Missing or unavailable information
- Written confirmation of completion
- Contents of the two unavailable attachments at event 004
- Contact for the tenant at flat 44

## Conflicts between sources
- Event 036 says no tenant contact needed, but events 025/031 promised tenant updates; I updated the tenant.
- 'Provider assigned' system line (event 035) vs landlord's own contractor route; I treated it as own contractor.
- Names in landlord emails (Rowan/Felix/Leo/Harper) vary; treated as the landlord.
- Event 029 emoji is not approval; event 026 words are the basis.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved works via his own contractor Freya (event 026); on hold awaiting her confirmation that all is done. Outstanding: written completion, photos, landlord confirmation, tenant update.

**2. What is the next action, who is it for, and through which channel?**

Email Freya for completion confirmation; email landlord to confirm completion and direct payment; email tenant Henry an update; follow-up 16 Dec.

**3. Does anything need a human decision, and why?**

No. It is routine; no spend or safety issue needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"ticket_ref":"NBL-001-landlord-pays-direct","landlord":"Rowan","decision_needed":"Confirm whether Freya (Riverside Services) has finished t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, an … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Freya and landlord","purpose":"Chase written completion confirma… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services/Freya), landlord pays direct (event 02… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
