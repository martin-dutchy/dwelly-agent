# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden job has landlord approval and is being done by the landlord's own contractor. The latest call with Freya covered completion and invoicing but is not written proof. I recorded the landlord decision, asked the landlord to confirm completion and direct payment, and set a follow-up for 15 Dec.

## Where the case stands
Landlord approved the works and is using his own contractor (Freya, Riverside Services). Ticket is on hold, waiting for the provider to confirm all done. The 11 Dec call gives no written completion evidence. Tenant last updated 6 Nov.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in writing that works are complete and that he pays Freya directly | Rowan, landlord | email | A2 ✅ |
| 2 | WAIT | Follow up 15 Dec for confirmation, then update tenant and close without payment | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, our call with Freya (Riverside Services) on 11 December touched on the tree removal, invoicing and completion, but we have nothing in writing yet confirming the communal garden and hedge works at Flat 26, 46 Copperfield Walk are finished. Could you confirm (1) whether the works are fully complete, including the side-path hedge and the tree, and (2) that you are paying Freya directly, so we don't expect an invoice? Once confirmed we'll let the tenant know and close the job. We'll check back on 15 December. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own-contractor does not confirm the work is complete or who pays.
- The call summary does not establish completion.
- Nothing was sent to the tenant yet.

## Remaining work
- Written confirmation of completion from landlord or Freya
- Tell tenant (Flat 26 and 44) outcome
- Close without_payment if landlord pays direct
- Agency owns follow-up on 15 Dec

## Missing or unavailable information
- Written completion confirmation
- Confirmation landlord pays direct
- Attachments from event 4 unavailable

## Conflicts between sources
- Landlord names vary (Rowan, Leo, Felix Kendall, Harper) and messages are garbled summaries; treated as the same landlord thread.
- Events 033 and 036 say the job is by the landlord's contractor, but the system shows 'Maintenance provider assigned'. I treated it as the landlord's own contractor.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works approved by landlord and carried out by his contractor Freya; completion not confirmed in writing; ticket on hold waiting for provider. Outstanding: completion confirmation, payment route, tenant update, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking to confirm completion and direct payment (A2); follow-up on 15 Dec (A3).

**3. Does anything need a human decision, and why?**

No. This is routine chasing; closure without payment follows once confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Felix Kendall confirms receipt of quotes from Fre… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord-pa… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord / Freya","purpose":"Chase written confirmation that gar… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
