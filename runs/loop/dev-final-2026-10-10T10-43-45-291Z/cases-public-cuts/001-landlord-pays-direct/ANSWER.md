# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job, landlord-approved and done by the landlord's contractor. The 11 Dec call confirmed completion. I recorded the result, skipped the invoice because the landlord pays direct, and told the landlord and tenant. The ticket is left open until 18 Dec for any objection.

## Where the case stands
Stage: result. Landlord approved; landlord's contractor Riverside Services did the works and confirmed completion verbally on 11 Dec. Landlord pays direct. Waiting only for any objection from landlord/tenant before closing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Recorded works as completed (verbal contractor confirmation) and skipped the invoice as the landlord pays direct | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the works are reported finished and asked them to flag anything outstanding | Henry, tenant | email | A4 ✅ |
| 3 | OTHER | Told landlord the works are confirmed complete and that Freya will invoice them directly | Rowan, landlord | email | A3 ✅ |
| 4 | WAIT | Follow up 18 Dec for objections, then close without payment | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) via email, existing thread (event 029 email)** (verified)

> Hi Rowan, we spoke to Freya at Riverside Services on 11 December and she confirmed the communal garden and hedge works, including the tree removal, are complete. She'll invoice you directly, as agreed. If you've seen anything that isn't finished, please let us know and we'll follow up. Thanks.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, the contractor has told us the communal garden and hedge works are now finished. Please let us know if anything you reported still looks unfinished and we'll follow it up. Thanks for your patience.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Completion rests on a phone call only; no photos or written confirmation.
- Does not establish the cost or that the landlord has paid.
- Does not confirm the tenant's 'no man's land' strip or side hedge were covered.

## Remaining work
- Close ticket without payment after follow-up on 18 Dec if no objections (agency)
- Landlord to pay Riverside directly

## Missing or unavailable information
- Written or photo evidence of completion
- Whether the tenant's side strip was included in scope
- Event attachments were unavailable

## Conflicts between sources
- Event 036 says no tenant contact is needed because the job is external, but the tenant raised it and was kept updated earlier, so I sent a brief update.
- The landlord is named variously (Rowan, Leo, Felix) in the records; I replied on the existing landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and the contractor says the works are complete (verbal, 11 Dec). Outstanding: no objection yet from the tenant or landlord, then close. No invoice is needed from the agency.

**2. What is the next action, who is it for, and through which channel?**

Completion updates were emailed to the landlord (Rowan) and the tenant (Henry). A follow-up is set for 18 Dec to close without payment.

**3. Does anything need a human decision, and why?**

No. It is routine, within policy, and no spend or dispute needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-001-landlord-pays-direct","outcome":"completed","evidence":"Call 2025-12-11 (event 042): Leo and Freya (landlord's contra… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_work_result |
| A2 | `skip_document` | {"ticket_ref":"NBL-001-landlord-pays-direct","kind":"invoice","reason":"Landlord instructed own contractor (Riverside Services) and pays the… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after skip_document |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-18","party":"Henry (tenant) / Rowan (landlord)","purpose":"Check for any repl… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
