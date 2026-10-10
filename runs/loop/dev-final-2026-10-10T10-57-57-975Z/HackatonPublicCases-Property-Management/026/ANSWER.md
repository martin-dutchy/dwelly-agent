# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is approved and assigned, but the confirmation emails (events 018 and 019) went out prematurely. They give 30/08 as a Monday when it is a Saturday, and the tenant had not agreed the slot. I told the tenant and contractor the visit is unconfirmed, asked the tenant for a day, and put the ticket on hold.

## Where the case stands
Ticket NBL-026 at visit stage. Landlord approved (event 009), Keystone Compliance assigned. Visit tentative only; the tenant has not confirmed and the date in the confirmation emails is wrong. On hold, waiting for tenant, review 2025-08-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_TENANT | Told the tenant the visit is not yet confirmed, corrected the date and asked which day suits and for a contact number | Clara, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Told the contractor to disregard the unconfirmed appointment and to confirm who is attending | Keystone Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Ticket on hold until the tenant replies, review 2025-08-28 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, sorry for the confusion with our last email. The visit isn't confirmed yet: the engineer suggested Monday morning 10-12, but the date we put in the email (30/08) is a Saturday, and Monday would be 1 September. Could you tell us which day suits you (and whether Monday 1 Sept 10-12 is OK)? Please also confirm the best phone number for the engineer. We'll then confirm with the contractor. Oven repairs are routine, so we aim to get it sorted within 14 days. Thanks, Northbridge Lettings

**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Please disregard the appointment in our last email: it is not confirmed. 30/08/2025 is a Saturday, but the slot discussed was Monday 10-12, and the tenant has not yet confirmed. Also, the call log names Riverside Works, while the job is assigned to Keystone Compliance. Please confirm who is attending. We will confirm the date once the tenant replies.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked with set_visit, so no appointment is confirmed.
- Nothing here establishes the cause of the oven fault or who pays.
- The landlord's 'Yes go ahead' covers sending the contractor; no quote or spend has been approved.

## Remaining work
- Get the tenant's confirmed slot, then book the visit (agency, 24h notice)
- Confirm which contractor is attending
- Record the work result, and any quote, invoice and landlord update, before closing

## Missing or unavailable information
- Tenant's confirmed visit day and phone number
- Which contractor is attending: Keystone Compliance or Riverside Works
- Oven model

## Conflicts between sources
- 30/08/2025 is a Saturday but the slot is described as Monday morning.
- Tenant named variously as Clara, Ruben Oakley, Grace Mercer and Harriet Fletcher.
- Contractor is Keystone Compliance in the records, but the call was from Riverside Works (Isaac Palmer).
- The tenant had not confirmed the slot (event 016 says they will reply by text), yet the confirmation emails were sent.
- The contact number in events 018 and 019 carries an odd 'enter this code' note, unlike the tenant number in event 014.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned, at the visit stage. The appointment is unconfirmed: the tenant has not agreed and the date is inconsistent. Outstanding are the tenant's confirmation, the contractor identity, the visit itself and the result.

**2. What is the next action, who is it for, and through which channel?**

Done: an email to Clara (tenant) asking her to confirm the day, and an email to Keystone Compliance (contractor) saying the appointment is not confirmed. Next, once Clara replies, book the visit with set_visit.

**3. Does anything need a human decision, and why?**

No. This is a routine scheduling clarification that I can handle. A human is only needed if the name and contractor mismatches turn out to be a records problem.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Clara, sorry … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-026","reason":"Waiting for Tenant","comment":"Tenant to confirm visit day (Monday 1 Sept 10-12 proposed); contractor iden… | 1 | ✅ verified | Ticket NBL-026 read back after put_on_hold |

## Failed or unverified actions
_None._
