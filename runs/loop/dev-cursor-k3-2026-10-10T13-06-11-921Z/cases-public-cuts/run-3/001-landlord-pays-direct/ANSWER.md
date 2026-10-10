# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's contractor has been doing the communal garden works since 20 Nov, but nothing in writing confirms completion. I asked the contractor and the landlord for confirmation, updated the tenant, and set a follow-up for 15 Dec. No human decision is needed yet.

## Where the case stands
Landlord approved the garden works (events 022, 026). Riverside Services, the landlord's contractor, started on 20 Nov. A call on 11 Dec discussed the tree removal, invoicing and completion, but there is no written confirmation that the work is done. The job is on hold waiting for the provider. Written completion evidence has been requested from Freya and the landlord, and a follow-up is set for 15 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Freya for written confirmation of completion, the completion date, photos and the invoicing route | Freya, Riverside Services (contractor) | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask the landlord to confirm they pay the contractor directly and that the works are finished | Rowan, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update Henry that work is in progress, we are confirming completion, and he will hear from us by 16 Dec | Henry, tenant | email | A3 ✅ |
| 4 | WAIT | Review replies on 15 Dec, then close without payment if the landlord pays direct and completion is confirmed | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Freya, Riverside Services (contractor) via email, existing thread (event 042 call)** (verified)

> - Please confirm in writing that the communal garden, side hedge and weeds work at Flat 26, 46 Copperfield Walk is complete, and the date you finished (including the tree work).
> - Please send photos of the finished work.
> - Please confirm who you are invoicing (we understand the landlord pays you directly) and send a copy of the invoice if it goes via us.
> 
> Why: Our call on 11 Dec discussed completion and invoicing, but nothing is in writing. We need written evidence before closing the job.

**A2 · request_information → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> - Can you confirm you are paying Riverside Services directly, so we do not need to chase an invoice?
> - Has Freya confirmed to you that all the garden works, including the tree trim, are finished?
> 
> Why: We spoke to Freya on 11 Dec about completion and invoicing but have no written confirmation; we need this before closing the job.

**A3 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry,
> 
> A quick update on the communal garden and hedge work. The landlord's contractor, Riverside Services, has been working on it and we are now asking them for written confirmation that it is finished. Once we have it, we will let you know. We will update you again by 16 December at the latest. If anything still looks untidy after the work, please tell us.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The requests do not confirm the work is complete.
- Nothing here establishes who pays; the landlord paying direct is assumed from the case label and still needs confirming.
- The tenant update does not promise a completion date.
- Landlord approval of the quotes was recorded in email text (events 022 and 026); no amount or cap is known.

## Remaining work
- Receive written completion confirmation and photos from Freya (agency)
- Landlord to confirm direct payment and completion
- Close the job as without_payment once confirmed, and tell the tenant and landlord
- Hold stays in place; the review date is in follow-up FUP-104 (15 Dec)

## Missing or unavailable information
- Written confirmation that the work is complete and its date
- Quote amounts (not in the case)
- Attachments from event 004 (unavailable)
- Detail of the 11 Dec call content

## Conflicts between sources
- Event 036 says no tenant contact is needed, but events 023 and 025 promised the tenant updates; I sent a brief update.
- Landlord names vary in the emails (Rowan, Felix, Leo); I treated them as one landlord thread.
- The ticket stage is mp_time, but history shows works started on 20 Nov.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The works are approved and the landlord's contractor Riverside Services has been working since 20 Nov. A 11 Dec call covered completion and invoicing. Outstanding: written completion confirmation and photos, confirmation that the landlord pays direct, and tenant and landlord notification before closing.

**2. What is the next action, who is it for, and through which channel?**

Email requests to Freya (contractor) and to the landlord for completion and payment confirmation, plus a tenant update email. Follow-up is set for 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine chasing and nothing is above authority. If no replies come by the 15 Dec review, chase again on another channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 042 call)","… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Can you … | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry,\n\n… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","purpose":"Check Freya/landlord replied with written completion confirmat… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
