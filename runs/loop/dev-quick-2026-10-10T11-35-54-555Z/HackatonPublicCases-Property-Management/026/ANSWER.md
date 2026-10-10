# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the contractor visit ("Yes go ahead"), but the booking has conflicting details: the provider company, the visit day (Monday vs 30/08/2025, a Saturday), and the tenant's name and phone number. I asked Keystone Compliance to confirm, asked the tenant to confirm her name and contact details, and put the job on hold until 2025-08-28. No escalation is needed yet; this is routine.

## Where the case stands
Routine oven repair (main oven element not heating; grill works). Landlord approved on 26/08 ("Yes go ahead", event 009). Provider Keystone Compliance was assigned, but a provider call came from Riverside Works and the visit date is unconfirmed (see conflicts). Visit recorded as 30/08/2025 10:00, but the call said Monday morning. Job is on hold waiting for provider confirmation, review 2025-08-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm company, exact visit date and time, and tenant contact details; the booked date is not yet confirmed | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the booking is not yet confirmed, and ask for her full name as on the tenancy and best phone number and times | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Hold the job for provider confirmation with a review date of 2025-08-28 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 014 email)** (verified)

> Dear Keystone Compliance,
> 
> Re: Oven Repair Request, Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ.
> 
> Our records do not yet agree on a few points, so please do not treat the booking below as final until we confirm:
> 
> 1. Your company: a call on 26/08 (event 016) came from "Isaac Palmer from Riverside Works", but this job was sent to Keystone Compliance. Please confirm which company will attend.
> 2. Visit date: the call said "Monday morning between 10 and 12", but the booking shows 30/08/2025, which is a Saturday. Monday would be 1 September 2025. Please confirm the actual date and time you can attend.
> 3. Tenant details: the tenant's name and phone number differ across our records. Please use only the details we send you in writing, and do not rely on the code-style number in the last email until we confirm it.
> 
> Please reply with the confirmed date, time and company name. If the job needs a quote, please send it with photos and the estimated completion time.
> 
> Kind regards
> Northbridge Lettings

**A3 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara,
> 
> Thank you for your patience. The landlord has approved us sending a contractor to look at the main oven.
> 
> The date we have on file (Monday morning, 30/08/2025) is not yet confirmed. We have asked the contractor to confirm the company, the exact date and the time. We will be in touch as soon as they reply. Please also reply to this email with your full name as it appears on your tenancy, and the best phone number and times for the contractor to call you.
> 
> Kind regards
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord approval covers sending Keystone Compliance to look at the oven; it sets no spend cap, so any quote needs fresh landlord approval.
- Messages do not confirm the fault cause, the visit date, or the repair cost.
- The 30/08/2025 date is not confirmed by the provider; the record shows it only as a selected slot.

## Remaining work
- Keystone Compliance (or Riverside Works, if that is who attends) to confirm company, date and time. Owner: agency, review 2025-08-28.
- Tenant to confirm name and contact number. Owner: tenant.
- Resolve the contact details on the record (name Ruben Oakley and Grace Mercer vs Clara; numbers 07700 900721 vs 07700 900077). Owner: agency, internal check.
- Quote, if needed, goes to landlord for approval before any work.

## Missing or unavailable information
- Which company will attend (Keystone Compliance or Riverside Works)
- The exact visit date (Monday 1 Sept or Saturday 30 Aug)
- Tenant's full name and correct phone number
- Attachment 'attachment-25-document' sent at event 014 is unavailable; not used

## Conflicts between sources
- Provider: job assigned to Keystone Compliance (event 012-014), but the visit call came from Isaac Palmer of Riverside Works (event 016). Trusted: the agency assignment; asked the provider to confirm.
- Visit date: call says 'Monday morning' (Monday = 1 Sept 2025), but the system and confirmation say 30/08/2025, which is a Saturday (event 017, 019). Not treated as confirmed.
- Tenant name: request is from Clara; events 013, 014, 019 say Ruben Oakley; event 016 call names Grace Mercer. Asked the tenant to confirm.
- Tenant phone: event 014 says 07700 900721; event 018 says 07700 900077 'enter this code when calling'. Unclear which is right; not used beyond asking the tenant.
- Property record shows only the address; the landlord's name is 'Palmer' per event 004. No other property detail to check.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved sending a contractor (event 009). A visit is recorded as 30/08/2025 10:00, but it is not confirmed: the provider call said Monday morning, 30/08 is a Saturday, and the call came from Riverside Works while the job went to Keystone Compliance. Tenant name and phone numbers also conflict. Outstanding: provider confirmation of company, date and time; tenant confirmation of details; then the visit and result.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance (A2) to confirm company, date/time and contact details. Email the tenant Clara (A3) to say the booking is unconfirmed and ask for her name and best number. Hold the job until 2025-08-28 for review.

**3. Does anything need a human decision, and why?**

Not yet. The conflicts are factual and can be settled by asking the provider and tenant. Escalate to maintenance if the provider does not confirm by the review date, or if a quote is needed (it would need landlord approval for spend).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, landlord email, 2025-08-26 17:28 UTC (rep… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 014 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-026","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-026","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm company (call came from Rivers… | 1 | ✅ verified | Ticket NBL-026 read back after put_on_hold |

## Failed or unverified actions
_None._
