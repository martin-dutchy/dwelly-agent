# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's own contractor is carrying out the communal garden works and the landlord pays direct. Completion is not yet confirmed. I recorded the route, then asked the landlord to confirm completion and direct payment, updated the tenant and set a follow-up for 16 Dec.

## Where the case stands
Landlord's own contractor (Freya, Riverside Services) is doing the communal garden works, landlord paying direct. Started about 20 Nov, delayed by pigeon nesting. The 11 Dec call mentions tree removal, invoicing and completion, but completion is not confirmed in writing. The ticket is on hold, waiting for the provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm by 16 Dec that all works are complete and that they pay Freya directly | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant on status and say they will hear again by 19 Dec | Henry, tenant Flat 26 | email | A4 ✅ |
| 3 | WAIT | Follow up on 16 Dec; then close without payment once completion is confirmed and the tenant has no objection | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, following our call with Freya (Riverside Services) on 11 Dec, can you confirm by Tuesday 16 Dec: (1) have all the works finished, covering the communal garden weeding, the side-path hedge and the strip of land beside Flat 26, and the tree trim; and (2) that you are paying Freya directly, so we need no invoice from her? Once confirmed we will check with the tenants and close the job. Thanks.

**A4 · send_message → Henry (tenant, Flat 26) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the garden works. The landlord's contractor started in late November, and a nesting pigeon in the tree held part of it up. We spoke to the contractor on 11 Dec and are now asking the landlord to confirm everything is finished. We will update you by Friday 19 Dec. If you notice anything still not done, such as the hedge or the side strip, just reply and tell us. Thanks for your patience.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are finished or that every area was covered
- The landlord decision recorded covers the route (own contractor) only, with no spend approval
- The ticket is not closed

## Remaining work
- Landlord to confirm completion and direct payment (agency, by 16 Dec)
- Tenant to confirm the works are done (by 19 Dec)
- Close ticket without payment afterwards

## Missing or unavailable information
- Written confirmation of completion
- Scope actually completed
- Details of the call on 11 Dec are summarised only
- The two attachments from event 004 are unavailable

## Conflicts between sources
- Stage says 'provider assigned' but the landlord arranged their own contractor; treated as the own-contractor route
- Hold comment says no tenant contact needed, but the tenants were promised updates
- Landlord email names vary (Rowan, Felix, Leo); treated as the same landlord

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's contractor has done the works, or most of them, but nothing confirms completion. Outstanding: confirmation of completion from the landlord or Freya, confirmation that the landlord pays direct, and the tenant's view.

**2. What is the next action, who is it for, and through which channel?**

An email to the landlord (Rowan) asking for confirmation by 16 Dec. A tenant update email has also gone to Henry in Flat 26.

**3. Does anything need a human decision, and why?**

No. This is routine and is being handled by a dated follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), landlord pays direct. Works s… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry (tenant, Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticke… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase landlord for confirmation works compl… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
