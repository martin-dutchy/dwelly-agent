# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved and is using own contractor Riverside Services, paying direct. The 11 Dec call hints at completion but nothing is confirmed in writing. I recorded the own-contractor route, updated tenant, asked landlord to confirm completion, and set a 16 Dec follow-up.

## Where the case stands
Landlord's own contractor (Riverside Services) is doing the communal garden works, landlord approved and pays direct. Ticket is on hold awaiting provider completion confirmation; stage mp_time. Written completion confirmation and tenant confirmation outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask landlord to confirm by 16 Dec whether all works are complete (no invoice chase, landlord pays direct) | Rowan, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord's own contractor, confirming completion, next update by 16 Dec | Henry, tenant (Flat 26) | email | A3 ✅ |
| 3 | WAIT | Follow-up on 16 Dec to chase completion then close without payment | Landlord / Riverside Services | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord is using their own contractor, Riverside Services, and the work started in late November (some tree trimming was delayed by nesting pigeons). We are now confirming with the contractor and landlord that everything is finished. Once confirmed, we'll ask you to check it looks right. We'll update you again by 16 December. Sorry for the wait.

**A4 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, our call with Freya (Riverside Services) on 11 December touched on tree removal, invoicing and completion, but we don't have written confirmation that all the garden, hedge and side-path works at Flat 26, 46 Copperfield Walk are finished. Could you or Freya confirm by 16 December whether all works are complete? As you're paying the contractor directly, we won't chase an invoice. Thank you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the works are complete
- Does not establish who pays beyond landlord's stated direct payment
- Does not close the ticket

## Remaining work
- Written completion confirmation from landlord/Freya (owner: agency chase on 16 Dec)
- Tenant confirmation, then close without payment
- Flat 44 tenant was also promised updates (event 023); no contact details on file in this run

## Missing or unavailable information
- Written confirmation of completion
- Event 042 call details are only a vague summary
- Attachments from event 004 unavailable

## Conflicts between sources
- Event 035 'Maintenance provider assigned' vs landlord's own contractor route; trusted landlord's words (event 026) and hold notes.
- Event 036 says no tenant contact needed, but tenants were promised updates (event 023/025); updated tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord-approved own-contractor route; works likely done or nearly done but unconfirmed in writing. Outstanding: completion confirmation, tenant confirmation, then close without payment.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Rowan asking for completion confirmation by 16 Dec; email update to tenant Henry; follow-up scheduled 16 Dec.

**3. Does anything need a human decision, and why?**

No. Routine; nothing needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya) arranging communal garden work… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Rowan, our call with F… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","purpose":"Chase landlord/Riverside for written completion confirmation; … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
