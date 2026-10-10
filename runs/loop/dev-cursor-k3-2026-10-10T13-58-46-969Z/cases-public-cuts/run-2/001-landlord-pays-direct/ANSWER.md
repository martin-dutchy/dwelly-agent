# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Communal garden works are being done by the landlord's own contractor, who started in late November. Completion is not confirmed in writing. I recorded the landlord's route, updated the tenant and landlord, and set a follow-up for 17 Dec.

## Where the case stands
Landlord's own contractor (Riverside Services) is doing the works; the landlord pays direct. The agency is waiting on written completion confirmation, tenant confirmation, and the landlord's reply. The hold is still in place; follow-up set for 2025-12-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm completion and direct payment by 17 Dec | Rowan, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant on status and next contact date | Henry, tenant Flat 26 | email | A3 ✅ |
| 3 | WAIT | Follow up on completion confirmation, then close without payment | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Henry (tenant, Flat 26) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, an update on the communal garden and hedge work. The landlord is arranging this with their own contractor, who started work in late November (a pigeon nest delayed some tree trimming). We are waiting for the contractor to confirm in writing that everything is finished. Once we have that, we'll ask you to check the garden, hedge and side path. If anything is still overgrown, including the strip of land beside your flat, please tell us. We will update you by 17 December. Sorry for the slow progress.

**A4 · send_message → Rowan (landlord) (landlord) via email, existing thread (event 029 email)** (verified)

> Hi Rowan, following our call with Freya on 11 December, can you confirm by 17 December that the works at Flat 26, 46 Copperfield Walk are complete: communal weeds, side-path hedge, tree and the strip of land beside the flat? Also confirm you are paying Riverside Services directly, so we need no invoice. We will then check with the tenant and close the job. We are not instructing anyone else, as you arranged this contractor.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the works are complete; the 11 Dec call is only summarised.
- Recording own_contractor does not mean the work is approved or paid by the agency.
- The 'no man's land' strip may be outside the contracted scope.

## Remaining work
- Written completion confirmation from the landlord or Riverside Services
- Tenant confirmation that the work is done
- Close without payment once the above is in
- Tenant at no. 44 was also named as a reporter and has had no update from this run

## Missing or unavailable information
- Written completion confirmation
- Whether the side strip of land is in scope
- The two attachments at event 004 were unavailable

## Conflicts between sources
- Event 035 says 'Maintenance provider assigned', but the notes show the landlord's own contractor; I treated it as the landlord's route.
- Landlord messages name different people (Rowan, Felix, Leo, Harper); I treated them as one landlord thread.
- Event 036 says no tenant contact needed, but the tenants reported the issue and were told earlier, so I updated the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's contractor has been doing the works since about 20 Nov, and a 11 Dec call discussed completion and invoicing. Written completion, tenant confirmation and closure are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord to confirm completion and direct payment by 17 Dec, and email the tenant an update. Follow-up FUP-104 is set for 17 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on confirmation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"works have been quoted & go ahead given","source"… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services) doing communal garden/hedge/tr… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Henry (tenant, Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticke… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","ticket_ref… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-17","party":"Landlord / Riverside Services","purpose":"Chase written completi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
