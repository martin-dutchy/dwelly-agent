# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The communal garden job is on the landlord's own-contractor route, approved by the landlord. I recorded that decision, added a note, and emailed the landlord and tenant. The case is on hold until 16 Dec for completion confirmation.

## Where the case stands
Landlord's own contractor (Riverside Services/Freya) is doing the communal garden works, with approval given in events 022/026. Work is under way but no written completion confirmation. On hold waiting for the landlord, review 2025-12-16.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm works complete and that they pay Riverside directly, by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord's own contractor, confirming completion, next update by 17 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Hold and follow-up until 16 Dec, then close without payment if completion is confirmed | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we're treating the communal garden and hedge works at Flat 26, 46 Copperfield Walk as your own contractor (Riverside Services) job, as you agreed. Our latest call with Freya mentioned tree removal and invoicing but we haven't had written confirmation that everything is finished. Could you please let us know by Tuesday 16 December: (1) whether all the works, including the side hedge and the cleared area beside the flat, are complete; and (2) that you will pay Riverside directly, so we can close this without an invoice. Thank you.

**A4 · send_message → Henry (tenant) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord is arranging these with their own contractor, Riverside Services, who started in late November. We're confirming with the contractor and landlord that everything is finished, including the hedge and the area beside your property. Please let us know if anything still looks outstanding. We'll update you by Wednesday 17 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the works are finished or the cause of delay
- Does not establish who pays; direct landlord payment is still to be confirmed
- Tenant message does not confirm any appointment

## Remaining work
- Landlord to confirm completion and direct payment (agency, review 16 Dec)
- Tenant confirmation, then close_ticket without_payment
- Tenant at flat 44 was also noted as a reporter (event 023); no contact details on file, not updated

## Missing or unavailable information
- Written completion confirmation from Riverside or the landlord
- Event 042 call details
- Attachments from event 004 unavailable

## Conflicts between sources
- Event 035 'Maintenance provider assigned' vs landlord's own contractor route; trusted the landlord's emails.
- Event 036 says no tenant contact needed, but the tenant was promised updates (events 023, 025); updated the tenant anyway.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved quotes and is using their own contractor, Riverside Services. The work started around 20 Nov. Completion and direct payment are not yet confirmed in writing.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for completion and direct-payment confirmation by 16 Dec. Tenant updated by email. Hold and follow-up set for 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya) for communal garden/hedge work… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Waiting for landlord to confirm works complete and t… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase completion confirmation and direct pa… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
