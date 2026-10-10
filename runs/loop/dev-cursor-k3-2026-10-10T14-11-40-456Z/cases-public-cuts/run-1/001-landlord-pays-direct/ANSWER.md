# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden job is on the landlord's own-contractor route (Freya). The latest call was vague on completion. I recorded the route, asked the landlord to confirm completion and direct payment by 15 Dec, updated the tenant and held with a review date.

## Where the case stands
Ticket at mp_time, on hold waiting for landlord (review 15 Dec). Landlord's own contractor (Freya, Riverside Services) has done the works; completion and direct payment not yet confirmed in writing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm by 15 Dec that all works are complete and that they pay the contractor directly | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that landlord is arranging own contractor and we will update by 15 Dec | Henry, tenant | email | A5 ✅ |
| 3 | WAIT | Hold until 15 Dec for landlord reply; then close without payment if confirmed | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, an update on the communal garden and hedge works at Flat 26, 46 Copperfield Walk. Leo spoke to Freya on 11 December about the tree removal, invoicing and completion, but the call summary doesn't give a clear confirmation that everything is finished. Could you please confirm by Monday 15 December: (1) are all the works (weeds, hedge, side path, tree) complete, and (2) will you pay Freya's invoice directly? If so we'll close the job without payment through us. Thank you.

**A5 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update. The landlord is arranging the communal garden works with their own contractor, and we spoke to the contractor yesterday about progress. We're now asking the landlord to confirm the works are finished, and will update you by Monday 15 December. If anything still looks untidy, let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the route does not confirm the works are complete or who pays.
- Call 042 summary does not establish completion.
- Tenant update does not promise dates beyond our next update.

## Remaining work
- Landlord to confirm completion and direct payment; then close_ticket without_payment (agency, after 15 Dec).
- Tenant at Flat 44 also reported issues per event 023; no contact details on file, not updated in this run.

## Missing or unavailable information
- Clear confirmation of completion from the provider or landlord
- Attachments at event 004 unavailable
- Contact details for the Flat 44 tenant

## Conflicts between sources
- System lines 'Maintenance provider assigned' (event 035) vs landlord's own contractor route (events 026, 033, 036); treated landlord route as current.
- Landlord emails name different people (Rowan, Felix, Leo) and call summaries name Juniper Homes; treated as record-name mismatches.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved the works and uses their own contractor, who appears to have done most or all of them. Written confirmation of completion and of direct payment is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for completion and direct-payment confirmation by 15 Dec; tenant updated by email; held to 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), landlord pays direct (event 0… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Waiting for landlord to confirm all garden works com… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A5 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
