# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The communal garden job is approved and with the landlord's contractor, who has been working on it since 20 Nov. The 11 Dec call with Freya touched on completion and invoicing but isn't written proof. I asked the landlord for written confirmation and the invoice, and set a review for 16 Dec. No human decision is needed.

## Where the case stands
Ticket at mp_time, landlord approval confirmed, contractor (Riverside Services/Freya) assigned and working. Call on 11 Dec discussed completion and invoicing, but there is no written confirmation, work result or invoice on file. Now on hold waiting for landlord, review 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm in writing the works are complete and send a copy of Freya's invoice (landlord pays direct) | Rowan, landlord | email | A1 ✅ |
| 2 | WAIT | Hold with review 16 Dec and follow-up to chase; then record result, skip invoice (landlord pays direct) and close without payment | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Rowan (landlord) via email, existing thread (event 029 email)** (verified)

> Hi Rowan, we spoke to Freya at Riverside Services on 11 Dec about the communal garden, hedge and tree works at Flat 26, 46 Copperfield Walk. Could you please confirm in writing that all the works are finished, and send us a copy of Freya's invoice for our records (we understand you are paying her directly)? Once we have that we'll close the job. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The call summary does not prove the works are finished
- Nothing here confirms who pays or the invoice amount
- The tenant has not confirmed the issues are resolved

## Remaining work
- Written completion confirmation from landlord or contractor
- Invoice copy or skip with reason (landlord pays direct)
- Tell tenant the outcome and close the ticket (agency)

## Missing or unavailable information
- Written confirmation that all works (garden, hedge, tree) are complete
- Invoice copy; the call event 042 is only a vague summary
- Attachments from event 004 unavailable

## Conflicts between sources
- Landlord name varies in records (Rowan, Harper, Felix Kendall, Leo); event 036 says the job is external to the development, while the tenant raised it as affecting their path. Treated the ticket as landlord-approved per system record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and in progress with the landlord's contractor; completion is unconfirmed in writing and no invoice is on file.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (Rowan) asking for written completion confirmation and the invoice copy; follow-up 16 Dec.

**3. Does anything need a human decision, and why?**

No. It is routine, approved, and the landlord pays direct; nothing exceeds authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Call with Freya 11 Dec discussed completion and invo… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A3 | `schedule_follow_up` | {"due_on":"2025-12-16","purpose":"Chase landlord for written completion confirmation and invoice copy; then close without payment if landlor… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
