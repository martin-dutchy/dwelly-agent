# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden job is with the landlord's own contractor, Riverside Services, and looks nearly done but isn't confirmed. I recorded the landlord's own-contractor decision, asked the landlord to confirm completion and direct payment, updated the tenant, and set a follow-up for 16 Dec. No human decision is needed.

## Where the case stands
Landlord approved Riverside Services (landlord's own contractor, paid directly) in Nov. Works started ~20 Nov, delayed by pigeon nesting. Ticket on hold waiting for provider to confirm all done. The 11 Dec call with Freya mentions tree removal, invoicing and completion but gives no clear completion confirmation. No work result recorded.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm all works complete and that they pay Riverside directly | Rowan, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord arranging own contractor, completion being confirmed, next update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Review 16 Dec; if confirmed, record result and close without payment | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we spoke to Freya (Riverside Services) on 11 Dec about the communal garden and hedge works at Flat 26, 46 Copperfield Walk. The call notes mention a tree removal and invoicing but don't clearly confirm the work is finished. Could you confirm: (1) are all the works, including the hedge, weeds and side path area, now complete? (2) Are you paying Riverside Services directly, so we don't need their invoice? Once you confirm we'll update the tenant and close the job. We'll check back with you on 16 Dec. Thanks.

**A3 · send_message → Henry (tenant) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord is arranging these with their own contractor, Riverside Services, who started in late November. We spoke to them on 11 December and are now asking the landlord to confirm everything is finished. We'll update you again by 16 December. If you notice anything still not done, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are complete or that the landlord pays directly.
- Recording own_contractor does not authorise any agency spend.
- The ticket is not closed.

## Remaining work
- Landlord to confirm completion and direct payment; agency then records work result and closes without payment (owner: agent, review 16 Dec)
- Tenant to confirm the hedge, weeds and side area are done

## Missing or unavailable information
- Clear confirmation of completion from provider or landlord; the 11 Dec call summary is vague
- Event 004 attachments unavailable

## Conflicts between sources
- Event 036 says 'Maintenance provider assigned' but events 033/036 show it is the landlord's own contractor; I treated it as own contractor.
- Landlord emails name different people (Rowan, Leo, Felix), likely anonymisation noise.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the work and is using Riverside Services, who started around 20 Nov. Completion is unconfirmed after the 11 Dec call, and the ticket is on hold. Outstanding: completion confirmation, direct-payment confirmation, tenant confirmation, then close.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for completion and direct-payment confirmation (A2). Tenant update by email (A3). Follow-up on 16 Dec (A4).

**3. Does anything need a human decision, and why?**

No. This is routine chasing and a close-out once the landlord confirms.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Yeah, I've asked Freya to let me know when she's … | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Henry (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase landlord to confirm works complete an… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
