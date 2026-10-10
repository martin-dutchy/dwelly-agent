# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works are being done by the landlord's own contractor (Riverside Services, Freya). A call on 11 Dec covered tree removal, invoicing and completion, but no written completion confirmation exists. I recorded the landlord's go-ahead, asked the landlord and Freya to confirm completion, updated the tenant and set a follow-up for 16 Dec.

## Where the case stands
Ticket on hold (Waiting for Provider) at an early stage. The landlord's own contractor appears to have done the work, but completion is unconfirmed and no invoice is expected if the landlord pays direct. Waiting on Freya and the landlord, review 2025-12-16.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm works complete and that they pay Riverside directly | Rowan, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Freya for written completion confirmation, date, photos and invoice routing | Freya, Riverside Services | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant that confirmation of completion is being obtained, next update by 16 Dec | Henry, tenant | email | A4 ✅ |
| 4 | WAIT | Review on 16 Dec; close without payment if completion is confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, our call with Freya at Riverside Services on 11 December covered the tree removal, invoicing and completion, but we don't yet have written confirmation that all the garden, hedge and side-path work at Flat 26, 46 Copperfield Walk is finished. Could you confirm (1) whether Riverside have finished everything, and (2) that you are paying Riverside directly, so we don't expect an invoice? Once confirmed we'll close the job. Thanks.

**A3 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking with Leo on 11 December. Could you confirm by email that all the agreed works (communal garden weeding, hedges, side path and tree removal) are complete, with the completion date and any photos? Please also confirm the invoice is going to the landlord directly. Thank you.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord's contractor, Riverside Services, started in November and we're now getting final confirmation from them that everything is finished. We'll update you by 16 December. If you think anything has been missed, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are complete or satisfactory.
- The recorded landlord decision does not establish who pays; the landlord still needs to confirm direct payment.
- The call summary at event 042 gives no details of what was agreed.

## Remaining work
- Confirm completion with Freya and the landlord, then close without payment (agency owner, due 16 Dec)
- Confirm the tenant is satisfied

## Missing or unavailable information
- Written completion confirmation
- Confirmation that the landlord pays Riverside directly
- Attachments at event 004 were unavailable and not seen

## Conflicts between sources
- Landlord emails use different names (Rowan, Felix Kendall, Leo) and event 036 says no tenant contact is needed, while the tenant was promised updates. I treated the landlord record as the contact and sent the tenant a brief update.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved Riverside Services (his own contractor) and work started around 20 Nov. A call on 11 Dec discussed completion and invoicing, but nothing in writing confirms it is done. The ticket is on hold awaiting the provider. Outstanding: completion confirmation, confirmation of direct payment, and the tenant's confirmation.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord and to Freya at Riverside asking for completion confirmation. A short update was emailed to the tenant. Follow-up set for 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and was handled with messages and a dated follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord-pa… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord and Riverside Services","purpose":"Check completion con… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
