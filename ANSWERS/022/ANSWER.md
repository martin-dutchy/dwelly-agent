# Washer-dryer maintenance and replacement update: ANSWER

**Decision:** action_taken · **Severity:** routine

The washer-dryer has been out of use since August. The landlord says a replacement is ordered and delivery is arranged, but there is no date, and the tenant says nothing has arrived. I did not treat the tenant's "completed" as closure. I asked the tenant to clarify, asked the landlord for the date and supplier, noted the record and held the ticket to 29 Sep.

## Where the case stands
Ticket NBL-022 at init stage, on hold until 2025-09-29. The landlord is arranging the replacement themselves. No delivery date is known. The tenant's "job completed" is ambiguous.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord for delivery/install date, supplier, and whether replacement is still going ahead, reply by 29 Sep | Nessa Orin, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Clarify which job was 'completed', explain no replacement is recorded, next update by 29 Sep | Ari Dalen, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until review date 29 Sep | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ari Dalen (tenant) via email, existing thread (event 031 email)** (verified)

> Hi Ari, thanks for your reply. Sorry for the confusion. We can't see the other email you mention, and our records show no replacement has arrived yet, so we haven't treated this repair as finished. Could you tell us which job "completed" referred to, and whether the washer-dryer is working or has been replaced? The landlord says they have ordered a new machine with delivery, fitting and removal of the old one, but hasn't given us a date. We are asking them for it now and will update you by 29 September. Please don't remove the old machine yourselves.

**A3 · request_information → Nessa Orin (landlord) via email, agency landlord record** (verified)

> - What is the delivery and installation date and time window for the new washing machine, and which company is delivering it? The tenant needs at least 3 hours' notice.
> - Has the engineer's repair on 9 September been ruled out, and is the replacement still going ahead? The tenant says nothing has arrived and mentions another email about a 'washing-machine change'. Did you or the supplier send it?
> 
> Why: Tenant reports no replacement has arrived and is unsure whether it is still happening. We need the date and supplier to tell them and avoid a missed delivery. Please reply by 29 September 2025.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Nessa Orin, landlord | Delivery date and supplier | 2025-09-29 | A4 ✅ verified |

## What this does not establish
- The tenant's 'completed' does not establish the washer-dryer is fixed or replaced.
- The landlord's statement that delivery is arranged does not establish a date or supplier.
- The hold and messages do not book any visit.

## Remaining work
- Landlord to give delivery date and supplier (agency, review 29 Sep)
- Tenant to clarify the completed job and machine status
- Close without payment once the replacement is confirmed installed and the tenant confirms
- Answer the landlord's 21 Sep complaint about slow responses; a human may need to review it

## Missing or unavailable information
- Delivery/installation date and supplier
- Which follow-up the tenant meant by 'completed'
- Content of the other 'washing-machine change' email
- Outcome of the 9 Sep engineer visit

## Conflicts between sources
- Tenant event 031 says the job is completed, but event 030 says no replacement arrived. I trusted the earlier, specific statement.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

The landlord is arranging a replacement through their own route. No delivery date exists, and the tenant says nothing has arrived. The tenant's 'completed' is unclear. Outstanding: delivery date and supplier, and clarification from the tenant.

**2. What is the next action, for whom, and by which channel?**

Email to the landlord asking for the date and supplier. Email to the tenant asking which job was completed and saying when we will next update them. Ticket on hold to 29 Sep.

**3. Does anything need a human decision?**

Not now. The landlord's complaint about slow responses may warrant management review if it becomes formal.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-022","note":"Route: landlord arranging own repair/replacement via insurer and own delivery/installers (events 010, 027, 029).… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Ari Dalen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","body":"Hi Ari, than… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_information` | {"recipient_name":"Nessa Orin","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["What is the de… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-022","reason":"Waiting for Landlord","comment":"Awaiting landlord's delivery/install date and supplier, and tenant clarif… | 1 | ✅ verified | Ticket NBL-022 read back after put_on_hold |

## Failed or unverified actions
_None._
