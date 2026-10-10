# Case 114: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The window job has stalled for six weeks. The landlord's only reply (event 010) concerned a different property and a plumber, so there is no approval for this repair. I asked the landlord for a clear decision, told the contractor not to attend tomorrow, updated the tenant, and held the job with a review date of 12 April.

## Where the case stands
Ticket NBL-114 at visit stage, on hold waiting for landlord (review 2024-04-12). Oscar Turner assigned 1 March, never booked; on 10 April by phone he offered 11 April all day, conditional on landlord confirming. No landlord decision for this property on record.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no: our contractor Oscar Turner or own contractor, reply by 12 April | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant nobody is booked for tomorrow, 24h notice will be given, update by 12 April | Eliza Jenkins, tenant | email | A3 ✅ |
| 3 | CHASE_PROVIDER | Tell contractor not to attend 11 April until landlord and tenant confirm | Oscar Turner, contractor | email | A2 ✅ |
| 4 | WAIT | Hold for landlord reply, review 12 April | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb named Flat 18, 88 Alder Lane, so we haven't had an answer for Flat 24, 150 Copperfield Walk (bedroom window won't close properly). Please reply yes or no by 12 April: may our contractor Oscar Turner repair it, or are you using your own window contractor (if so, name and date please)? Oscar says a neighbour told him you had your own contractor on this, but nothing is confirmed.
> 
> Options: Yes, send our contractor Oscar Turner (he is available 11 April); I'll use my own contractor (please give name and date); Tenant to sort it themselves

**A2 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Hi Oscar, thanks for your time on the phone. Please don't attend Flat 24, 150 Copperfield Walk tomorrow (11 April) yet. We're still confirming with the landlord that the job is yours, and the tenant hasn't agreed a time. We'll confirm in writing once both are settled, or tell you if the landlord is using their own contractor. Next update from us by 12 April.

**A3 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Eliza, sorry for the delay on your bedroom window. We're waiting for the landlord to confirm who will do the repair (our contractor Oscar Turner or their own). Nobody is booked to visit yet, so please don't expect anyone tomorrow. We'll give you at least 24 hours' notice of any visit. We'll update you by 12 April. If the window can't be secured and you feel unsafe, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the repair or confirms Oscar as the contractor
- The 11 April date is not confirmed with the tenant or landlord; no visit was booked by me
- Does not establish whether the landlord has their own contractor (neighbour hearsay only)

## Remaining work
- Landlord decision (agency, by 12 April)
- If approved: confirm slot with Oscar and give tenant 24h written notice
- If own contractor: record it, get name and date, tell tenant
- If no landlord reply by 12 April: chase on SMS/phone

## Missing or unavailable information
- Landlord decision for Flat 24
- Whether landlord's own contractor has attended
- Tenant's availability

## Conflicts between sources
- Event 033 records the 11 April visit as booked, but the contractor made it conditional on the landlord confirming; I treated it as unconfirmed.
- Event 010 landlord reply names Flat 18, 88 Alder Lane (ZZ3 5ZZ) and a plumber, not this property; not treated as approval.
- Neighbour hearsay says the landlord has their own contractor; no landlord confirmation.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage, on hold for the landlord. Oscar Turner offered 11 April conditionally. Outstanding: landlord decision for this property (our contractor or their own), tenant agreement to a date, and 24h notice.

**2. What is the next action, who is it for, and through which channel?**

The landlord approval request (APR-101) to Isaac Oakley via the agency landlord record, with updates sent by email to the contractor and the tenant. Review 12 April.

**3. Does anything need a human decision, and why?**

No. The decision is the landlord's, and routine follow-up is in place. Escalate only if the landlord stays silent after the 12 April chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-114","decision_needed":"Your reply of 22 Feb named Flat 18, 88 Alder Lane, so we haven't had an… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-114","reason":"Waiting for Landlord","comment":"Need landlord yes/no on our contractor Oscar Turner vs own contractor for… | 1 | ✅ verified | Ticket NBL-114 read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-114","note":"Conflict: event 033 shows visit 11 Apr booked by phone, but contractor made it conditional on landlord confirmat… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
