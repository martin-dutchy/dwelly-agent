# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord is using their own contractor, Riverside Services, for the communal garden works. I recorded that route, asked the landlord for written confirmation of completion and direct payment, updated the tenant, and held the ticket until 16 Dec. No human decision is needed.

## Where the case stands
Job is on the landlord's own-contractor route (Riverside Services, Freya). The works started around 20 Nov and paused for a nesting bird. A 11 Dec call with Freya covered invoicing and completion, but there is no written completion evidence. On hold waiting for the landlord, review 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm in writing that the works are complete and the date, and that they pay Riverside Services directly, by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: the landlord's own contractor is finishing the works, and we are confirming completion. Next update by 16 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 16 Dec for the landlord's confirmation, then close without payment if confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> - Have Riverside Services finished the communal garden, hedge and side-path works at Flat 26, 46 Copperfield Walk, and on what date?
> - Can you confirm you are paying Riverside Services directly, so we do not need an invoice?
> - Did the works include the strip of land beside Flat 26 and the tree trim mentioned on the call?
> 
> Why: Our records show only a phone call with Freya on 11 Dec about completion and invoicing, with nothing in writing. We need confirmation before closing. Please reply by 16 December 2025.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the garden and hedge works. The landlord is using their own contractor, Riverside Services, who started in late November. They paused once for a nesting bird in a tree. We spoke to them on 11 December about finishing off and are now asking the landlord to confirm in writing that everything is done. If anything is still outstanding, such as the side hedge or the strip beside your flat, please tell us. We will update you by 16 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not confirm the works are complete.
- Nothing here confirms the work quality, or whether the strip of land beside Flat 26 was included.
- The tenant message promises no date for the works.

## Remaining work
- Landlord to confirm completion, date and direct payment; the agency then closes the ticket without payment.
- Tenant to confirm the fix, or flag anything outstanding.
- Tenant at 44 (a second reporter, per event 023) has not been updated in this run.
- The two attachments from event 004 are unavailable and have not been seen.

## Missing or unavailable information
- Written confirmation of completion and its date
- Whether the landlord is paying direct
- Contents of attachments 44 and 17

## Conflicts between sources
- Event 035 'provider assigned' and the 'approval confirmed' line conflict with the landlord's own-contractor route; I treated the landlord's route as current.
- Event 036 says no tenant contact is needed, but event 023 promised the tenants updates.
- Landlord messages name different people (Rowan, Harper, Felix, Leo); I treated them all as the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's own contractor appears to have done the works, but there is no written confirmation. The agency needs confirmation of completion, the date, and that the landlord pays direct, and the tenant needs to confirm the fix.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord (Rowan) asking for written confirmation by 16 Dec. The tenant (Henry) has also been emailed an update.

**3. Does anything need a human decision, and why?**

No. This is routine; the hold and chase cover it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord arranging own contractor (Riverside Services, Freya); landlord pays direct.… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Have Riv… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Awaiting landlord's written confirmation that own co… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |

## Failed or unverified actions
_None._
