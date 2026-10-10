# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works are being done by the landlord's own contractor, who pays direct. The 11 Dec call with Freya did not clearly confirm completion. I recorded the route, asked the landlord to confirm completion, updated the tenant and set a follow-up for 15 Dec.

## Where the case stands
Landlord's own contractor (Freya, Riverside Services) doing communal garden/hedge/tree works, landlord pays direct. Ticket on hold waiting for provider to confirm all done. Completion not confirmed in writing. Waiting on landlord (asked by 15 Dec).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm in writing the works are complete and they pay the contractor directly, by 15 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: landlord arranging own contractor, completion being confirmed, next update by 16 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Follow-up 15 Dec to chase landlord, then close without payment once completion confirmed | Rowan, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Rowan (landlord)** (verified)

> Please confirm in writing that Freya (Riverside Services) has finished all the communal garden, hedge and tree works at Flat 26, 46 Copperfield Walk, and that you are paying her directly. Reply by 15 December 2025.
> 
> Options: Yes - all works complete and I will pay the contractor directly; Not finished - works still outstanding (please say what and the expected date)
> 
> Update: Our call with Freya on 11 Dec touched on tree removal, invoicing and completion, but did not clearly confirm everything is done. We have not assigned our own contractor. We will keep the job open until you confirm; no invoice is needed from us if you pay direct.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge work. The landlord is arranging this with their own contractor, and we spoke to the contractor on 11 December about completion. We're now asking the landlord to confirm that everything is finished. If you've seen the work done or anything still looks outstanding, please let us know. We'll update you by 16 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own-contractor route does not confirm the work is finished.
- No agency contractor assigned and no spend approved.
- Tenant update does not promise a completion date.

## Remaining work
- Landlord to confirm completion and direct payment (agency, chase 15 Dec)
- Then close_ticket without_payment with landlord informed and tenant feedback
- Second reporting tenant at flat 44 was mentioned in event 023 and not yet updated; no contact on file in this case

## Missing or unavailable information
- Clear written confirmation of completion from landlord or Freya
- Content of the event 042 call is only vaguely summarised
- Attachments at event 004 unavailable

## Conflicts between sources
- Events 034-035 say 'Maintenance provider assigned' but the job is the landlord's own contractor (events 033, 036); treated as own contractor.
- Events 007 and 022 describe landlord names differently (Rowan/Harper/Felix/Leo); treated as the same landlord thread.
- Event 036 says no tenant contact needed, but the tenant had been promised updates (event 023); sent one.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord's own contractor (Freya, Riverside Services) is doing the works, approved 5 Nov and started around 20 Nov. The job is on hold waiting for the provider to confirm all done. Written completion confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord to confirm completion and direct payment by 15 Dec (done). The tenant has been updated by email, and a follow-up is set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord is paying direct. Nothing needs human authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Freya, Riverside Services), landlord pays direct; communa… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Rowan","ticket_ref":"NBL-001-landlord-pays-direct","decision_needed":"Please confirm in writing that Freya (Riverside Services)… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-001-la… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord","purpose":"Chase landlord for written confirmation tha… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
