# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine communal garden job, landlord using own contractor Riverside. A 11 Dec call discussed completion/invoicing but nothing is confirmed in writing. I recorded the landlord decision, asked the landlord to confirm completion and direct payment, updated the tenant and set a 16 Dec follow-up.

## Where the case stands
Landlord approved works with their own contractor Riverside Services (pays direct). Ticket on hold, waiting for written confirmation of completion. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask landlord to confirm works complete and that they pay Riverside directly, by 16 Dec | Landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant that landlord's own contractor is doing the works and we'll update by 16 Dec | Henry, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up with landlord on 16 Dec, then close without payment if confirmed | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, a quick one on the communal garden and hedge works at Flat 26, 46 Copperfield Walk. Our call with Freya (Riverside Services) on 11 December covered completion and invoicing, but we have nothing in writing yet confirming the work is finished. Could you please confirm (1) that Riverside have completed the works, including the tree trim, and (2) that you are paying Riverside directly, so we need no invoice? We'd be grateful for a reply by Tuesday 16 December. Once confirmed we will tell the tenants and close the job.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, an update on the communal garden and hedge works. The landlord is arranging this with their own contractor, Riverside Services, who started in late November. We spoke to them on 11 December about completion and are asking the landlord to confirm in writing that it's all finished. We'll update you again by Tuesday 16 December. If anything still looks untidy once the work is done, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the work is finished; the call summary is not written evidence
- Does not close the ticket or decide who pays; landlord-pays-direct is not yet confirmed in writing

## Remaining work
- Landlord confirmation of completion and direct payment (agency, by 16 Dec)
- Tenant confirmation after completion
- Close without payment once confirmed

## Missing or unavailable information
- Written completion confirmation from landlord or Riverside
- Event 004 attachments unavailable

## Conflicts between sources
- Landlord/contact names differ across events (Rowan, Felix Kendall, Grace Nolan, Harper, Leo); treated as the same landlord thread.
- Event 036 said no tenant contact needed, but tenants had asked for updates; updated the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved works via own contractor Riverside; work apparently done or nearly done per the 11 Dec call, but completion and direct payment are unconfirmed in writing. Ticket still on hold.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for written confirmation of completion and direct payment by 16 Dec; tenant updated by email.

**3. Does anything need a human decision, and why?**

No. It is routine and a dated follow-up is set.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"works have been quoted & go ahead given","source"… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-landlord… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase landlord for written confirmation wor… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Event 042 call with Freya is only a summary (completion/invoicing discussed); no written co… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
