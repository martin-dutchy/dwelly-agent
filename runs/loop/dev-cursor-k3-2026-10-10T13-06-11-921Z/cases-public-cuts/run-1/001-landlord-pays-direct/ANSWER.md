# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden and hedge works were approved by the landlord and Riverside is doing them, paid directly by the landlord. The 11 Dec call did not give written proof of completion. I recorded the approval, asked Riverside and the landlord to confirm, updated the tenant and set a follow-up for 15 Dec.

## Where the case stands
Ticket at mp_time, on hold (Waiting for Provider). Landlord approved works (event 026) and is arranging/paying Riverside Services directly. Provider call on 11 Dec discussed tree removal, invoicing and completion, but no written completion evidence. Waiting on Riverside and the landlord; follow-up 15 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Riverside Services for written confirmation of completion, dates and photos | Freya, Riverside Services, contractor | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask landlord to confirm completion and direct payment so the ticket can close without payment | Rowan, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant on status and next contact date | Henry, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up 15 Dec on provider and landlord replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> Hi Freya, thanks for speaking with Leo today. To close the communal garden and hedge job at Flat 26, 46 Copperfield Walk, please reply in writing with: the date(s) you attended, confirmation that the weeds, side-path hedge and the tree work are all complete (or what is left), and a few photos of the finished work. If the landlord is paying you directly, just say so and we will not expect an invoice. Many thanks.

**A3 · send_message → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> Hi, we spoke to Freya at Riverside Services today about the communal garden works. We have asked her for written confirmation that everything is finished, with dates and photos. Please can you confirm (yes/no) that the work is complete and that you are paying Riverside directly, so we can close this without an invoice. We'll check back on 15 December.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, an update on the communal garden and hedge works: the landlord's contractor has been working on them and we have asked them to confirm in writing that everything is finished. Once we hear, we will let you know. If anything is still overgrown, please tell us. We'll update you by 15 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work is finished; the call summary at event 042 is vague.
- Recording approval does not set a cost or confirm who pays beyond the landlord's direct arrangement.
- Ticket not closed.

## Remaining work
- Written completion evidence from Riverside (agency, chase 15 Dec)
- Landlord confirmation of completion and direct payment
- Close without payment once confirmed, after tenant is told

## Missing or unavailable information
- Written completion confirmation, dates and photos
- Attachments at event 004 were unavailable
- Contents of the 11 Dec call are only summarised

## Conflicts between sources
- Stage is mp_time but notes say work started 20 Nov by the landlord's contractor; event 036 says no tenant contact is needed, while the tenant was told earlier. Treated the work as in progress with unconfirmed completion.
- Landlord names vary (Rowan, Leo, Felix) and event 029 is only an emoji reply; relied on the explicit 'go ahead given' at event 026.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and in the contractor's hands, with completion unconfirmed in writing. Outstanding: provider completion evidence, landlord confirmation of direct payment, tenant confirmation, then close.

**2. What is the next action, who is it for, and through which channel?**

Written completion confirmation requested from Freya at Riverside by email; landlord asked to confirm completion and direct payment by email; tenant updated by email; follow-up set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine work and the next steps are a chase and a dated wait.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"approved","evidence_quote":"Could you please advise both T's, in the meantime, that… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-001-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Riverside Services / landlord","purpose":"Check written completi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
