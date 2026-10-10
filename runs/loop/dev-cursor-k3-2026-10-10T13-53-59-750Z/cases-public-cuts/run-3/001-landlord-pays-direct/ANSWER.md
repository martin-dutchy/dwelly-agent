# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The communal garden job is on the landlord's own-contractor route, and the landlord has agreed to the works. I recorded that decision and asked the contractor and the landlord to confirm completion. The tenant has been updated and a follow-up is set for 16 Dec. No human decision is needed yet.

## Where the case stands
Landlord's own contractor (Riverside Services) is doing the communal garden works, landlord paying direct. Work started around 20 Nov; a tree job was discussed by phone on 11 Dec. No written completion confirmation yet. Ticket on hold (waiting for provider); follow-up set for 16 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Freya for written confirmation of completion, date, photos and invoice route by 16 Dec | Freya, Riverside Services, contractor | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask landlord yes/no whether works are finished and that he pays the contractor directly | Rowan, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Update Henry that works are with the landlord's contractor, awaiting written completion, next update 17 Dec | Henry, tenant Flat 26 | email | A4 ✅ |
| 4 | WAIT | Review on 16 Dec; close without payment if completion and direct payment are confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking with Leo today. Please could you confirm in writing that the communal garden, hedge and side-path works at Copperfield Walk are complete (including the tree work), with the completion date and a few photos if you have them. Please also say whether the invoice goes to the landlord directly. We'd be grateful for a reply by 16 December.

**A3 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi Rowan, we spoke to Freya today about the communal garden works and have asked her to confirm completion in writing. We're treating this as your own contractor, with you paying her directly. Could you please confirm yes or no: are the works finished and will you pay Riverside Services directly? A reply by 16 December would be great so we can close the job.

**A4 · send_message → Henry (Flat 26) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden works. The landlord's contractor started in late November and we've spoken to them today. We're waiting for written confirmation that everything is finished. We'll update you by 17 December. If you notice anything still not done, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor route does not confirm the work is complete.
- The call summary at event 042 gives no detail, so completion and invoicing are not established.
- Nothing has been paid or approved by the agency.

## Remaining work
- Provider written completion confirmation (owner: Riverside Services)
- Landlord confirmation of completion and direct payment (owner: landlord)
- The other reporting tenant (flat 44) should also be updated; no contact on file
- Close without payment once confirmed (agency)

## Missing or unavailable information
- Written completion confirmation
- Content of the 11 Dec call
- The two attachments from event 004 (unavailable)

## Conflicts between sources
- Ticket stage shows provider assigned/mp_time, but history shows the landlord's own contractor is doing the work. I treated it as the own-contractor route.
- Event 036 says no tenant contact is needed, but the tenants had earlier been promised updates, so I updated Henry.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's own contractor has been doing the works since about 20 Nov. Completion has not been confirmed in writing, and neither has the invoice route (the landlord is expected to pay direct).

**2. What is the next action, who is it for, and through which channel?**

Written completion confirmation was requested from Freya (email), and a yes/no confirmation from the landlord (email). Henry, the tenant, was updated by email. Review on 16 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine chasing. Closing without payment follows once completion is confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry (Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-16","purpose":"Check for provider written completion confirmation and landlor… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
