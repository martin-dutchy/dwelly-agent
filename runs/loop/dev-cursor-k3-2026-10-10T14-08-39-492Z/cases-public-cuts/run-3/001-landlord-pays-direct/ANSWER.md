# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works are being done by the landlord's own contractor. I recorded the own-contractor route, asked the landlord to confirm completion and direct payment by 16 Dec, updated the tenant and set a follow-up. No human decision needed.

## Where the case stands
Landlord's own contractor (Riverside Services/Freya) is doing the communal garden, hedge and tree works; ticket on hold waiting for provider to confirm all done. Latest call (event 042) mentions completion and invoicing but no written confirmation. Landlord asked to confirm by 16 Dec; tenant updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm works complete (incl. side strip) and that they pay Riverside directly, reply by 16 Dec | Landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update Henry (Flat 26): landlord's own contractor, awaiting written completion confirmation, next update by 16 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up 16 Dec; then close without payment if confirmed | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Landlord (landlord) via email, agency landlord record** (verified)

> - Has Riverside Services (Freya) now finished the communal garden, side hedge and tree works at Flat 26, 46 Copperfield Walk, including the strip of land beside Flat 26?
> - Will you be paying Riverside Services directly, so we don't need to chase an invoice?
> 
> Why: Our call with Freya on 11 Dec mentioned the tree job, invoicing and completion, but we have nothing in writing confirming it is done. Please reply by 16 Dec 2025 so we can update the tenants and close the job.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, an update on the communal garden and hedge works. The landlord is arranging this with their own contractor, Riverside Services, and we understand work has started, including some tree trimming. We're waiting for written confirmation that it's all finished, and have asked the landlord to confirm, including the strip of land beside your flat. Sorry we haven't updated you since 6 November. We'll be back in touch by 16 December. If anything looks unfinished meanwhile, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the route does not confirm the works are finished or the strip beside Flat 26 was included.
- No payment or invoice approval made; landlord expected to pay direct (unconfirmed).
- Ticket not closed.

## Remaining work
- Landlord/provider written confirmation of completion (agency, by 16 Dec)
- Update Flat 44 tenant (no contact details in case file)
- Close without payment once confirmed and tenants told

## Missing or unavailable information
- Written completion confirmation
- Whether landlord pays direct
- Content of event 042 call beyond summary
- Attachments at event 004 unavailable
- Contact for Flat 44 tenant

## Conflicts between sources
- Event 036 said no tenant contact needed, but events 023/025 promised tenants updates; trusted the promise and updated the tenant.
- Stage shows provider assigned/mp_time but history shows the landlord's contractor on site from 20 Nov.
- Event 029 emoji reply is not an approval; approval taken from event 022/026 wording.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord's contractor has carried out the works (tree job discussed 11 Dec); written confirmation of completion, side strip coverage and direct payment are outstanding. Ticket on hold, provider assigned/mp_time.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for completion confirmation and payment route by 16 Dec (A3); tenant emailed an update (A4); follow-up 16 Dec (A5).

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord is paying/arranging their own contractor.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya) arranging communal garden/hedg… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Has Riverside Se… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, an … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase landlord for written confirmation wor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
