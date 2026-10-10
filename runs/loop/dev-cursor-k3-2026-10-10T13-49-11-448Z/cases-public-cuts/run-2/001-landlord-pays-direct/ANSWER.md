# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works are on the landlord's own-contractor route, with go-ahead on 5 Nov. I recorded that decision and a note, asked the landlord to confirm completion and the payment route by 16 Dec, updated the tenant and scheduled a follow-up. No human decision is needed.

## Where the case stands
Landlord's own contractor (Riverside Services) is doing the works, with go-ahead given on 5 Nov. The ticket is on hold, waiting for the provider to confirm completion. Latest call (event 042) mentioned tree removal, invoicing and completion, but no clear confirmation of completion is on record. Landlord asked to confirm by 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm the works are complete and that they pay Riverside directly, by 16 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: landlord is arranging their own contractor, awaiting completion confirmation, next update by 16 Dec | Henry, tenant (Flat 26) | email | A4 ✅ |
| 3 | WAIT | Review on 16 Dec; close without payment if complete and landlord pays direct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, thanks for the go-ahead on the communal garden and hedge works at Flat 26, 46 Copperfield Walk. We spoke to Freya at Riverside Services on 11 December about the tree work, invoicing and completion, but we don't yet have a clear confirmation that everything is finished. Could you please let us know by Tuesday 16 December: (1) are all the works complete (weeds, side hedge, tree, and the strip of land beside Flat 26)? (2) will you pay Riverside directly? Once we have this we can update the tenants and close the job. We are not instructing our own contractor, to avoid the work being done twice.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord is arranging this with their own contractor, Riverside Services, who started in November. A pigeon nest in a tree delayed the trimming. We are now waiting for the landlord to confirm the work is finished, and will update you by Tuesday 16 December. If anything still looks untidy after that, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not confirm the work is complete or that the landlord pays.
- No contractor was assigned or visit booked by us.
- Not closed: no completion confirmation or tenant confirmation.

## Remaining work
- Landlord to confirm completion and payment route by 16 Dec (agency follow-up FUP-104).
- Tell the other reporting tenant (flat 44) – no contact details on file in this case.
- Close without payment once confirmed.

## Missing or unavailable information
- Written completion confirmation from landlord or Riverside
- Who pays Riverside
- Details of the call at event 042
- Attachments from event 004 (unavailable)
- Contact details for the flat 44 tenant

## Conflicts between sources
- System line 'Maintenance provider assigned' (event 035) vs notes that the landlord's own contractor is doing the job; treated as own-contractor route.
- Landlord names vary (Rowan, Felix Kendall, Leo) in legacy records; treated as one landlord contact.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's contractor Riverside is doing the works, which began around 20 Nov and were delayed by a pigeon nest. Completion is not confirmed in writing, and the payment route and tenant confirmation are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for completion confirmation and the payment route by 16 Dec (sent), plus an email update to the tenant (sent). Follow-up on 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine own-contractor tracking, with no spend, safety or legal issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"works have been quoted & go ahead given","source"… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Landlord's own contractor route (Riverside Services, Freya). Landlord gave go-ahead event 0… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","party":"Landlord","purpose":"Chase landlord for confirmation works compl… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
