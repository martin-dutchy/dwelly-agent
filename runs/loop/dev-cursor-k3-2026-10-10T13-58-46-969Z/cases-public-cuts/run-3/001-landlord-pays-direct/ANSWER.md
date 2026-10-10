# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The communal garden job is on the landlord's own-contractor route. I recorded that decision, noted the route and the conflicting 'provider assigned' system line, and asked the landlord to confirm completion and direct payment by 15 Dec. I updated the tenant and set a hold with review on 15 Dec.

## Where the case stands
Job is on the landlord's own-contractor route (Riverside Services/Freya, landlord pays direct), approved 3 Nov. Works started around 20 Nov. Completion is not confirmed in writing. On hold waiting for the landlord, review 15 Dec 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm works complete (hedge, weeds, side strip) with a date, and that they pay Riverside direct, by 15 Dec | Rowan, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: contractor attended, completion being confirmed, next update by 17 Dec | Henry, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 15 Dec for landlord confirmation | Rowan, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Rowan (landlord) (landlord) via email, agency landlord record** (verified)

> - Has Riverside Services (Freya) finished all the works, including the communal weeds, the side-path hedge and the strip of land at the side of Flat 26, and on what date?
> - Will you pay Riverside directly, so we do not chase an invoice?
> - Please reply by Monday 15 December 2025.
> 
> Why: Our call with Freya on 11 Dec discussed a tree removal and completion, but we have nothing in writing confirming the work is complete.

**A4 · send_message → Henry (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry, a quick update on the communal garden and hedge works. The landlord's own contractor, Riverside Services, started in late November and we spoke to them on 11 December about finishing off. We don't yet have written confirmation that everything is done, so we are checking with the landlord and contractor. Sorry for the lack of news. Once we have confirmation we'll let you know, and we'd welcome you telling us if anything (weeds, hedge, side strip) is still outstanding. We'll update you by Wednesday 17 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The call summary (event 42) does not establish that the works are finished or invoiced.
- Recording the own-contractor decision does not confirm scope covers the hedge, weeds or side strip.
- Nothing here closes the job or approves payment.

## Remaining work
- Landlord to confirm completion and direct payment (agency, chase 15 Dec)
- Tenant confirmation that the works are satisfactory
- Then close without payment
- The second tenant at no. 44 was named at event 23 and not updated here; the property record gives no contact

## Missing or unavailable information
- Written completion confirmation
- Scope actually covered by the quotes
- Contents of the two unavailable attachments at event 4
- Whether the 'no man's land' strip is the landlord's responsibility

## Conflicts between sources
- Event 035 'Maintenance provider assigned' vs landlord's own contractor route; treated own contractor as current.
- Event 036 says no tenant contact needed, but the tenant was promised updates (events 025, 031); updated the tenant.
- Landlord names vary across messages (Rowan/Felix/Leo); treated as the same landlord thread.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the works and uses their own contractor (Riverside/Freya), who started about 20 Nov. A call on 11 Dec discussed tree removal, invoicing and completion, but nothing in writing confirms completion. Outstanding: landlord confirmation of completion and direct payment, and tenant confirmation.

**2. What is the next action, who is it for, and through which channel?**

I emailed the landlord to ask for completion confirmation and direct payment by 15 Dec. I also emailed the tenant an update with the next update by 17 Dec. The job is on hold until 15 Dec.

**3. Does anything need a human decision, and why?**

No. This is routine and waiting on the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Felix Kendall confirms receipt of quotes from Fre… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-001-landlord-pays-direct","note":"Route: landlord's own contractor (Riverside Services, Freya), landlord pays direct. Do not … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Has Rive… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hello Henry, a q… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Landlord's own contractor; awaiting landlord's writt… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |

## Failed or unverified actions
_None._
