# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved sending Keystone Compliance (event 009, "Yes go ahead", recorded as A6). The visit date conflicts: the system holds 30/08/2025 10:00, but the tenant says 8 September. I asked the provider to confirm what happened and the correct date, and told the tenant the date is not final. The job is on hold for the provider until 2025-09-01.

## Where the case stands
Ticket NBL-026-date-conflict is at visit stage. Landlord approved the provider visit (event 009, "Yes go ahead"). Keystone Compliance is assigned. The visit date is in dispute: the system holds 30/08/2025 10:00 (event 017, today), while the tenant says she arranged 8 September 2025 (event 021). Neither date is confirmed by the provider. The ticket is on hold for the provider until 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to say whether anyone attended on 30/08/2025 at 10:00, and to confirm the correct visit date directly with the tenant (30/08 or 08/09/2025). | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the visit date is not final: the record shows 30/08 10:00, she says 8 September, and we are checking with the provider. We will write once confirmed. Target is within 14 days (routine). | Clara (tenant) | email | A3 ✅ |
| 3 | OTHER | Record the name, provider and phone-number conflicts on the job. | internal | internal | A4 ✅ |
| 4 | WAIT | Hold the job for the provider's reply, review 2025-09-01. | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 014 email)** (verified)

> Hello,
> 
> Re: Oven Repair Request, Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ.
> 
> Our records show a visit on 30/08/2025 at 10:00 am (Monday morning, 10 to 12). The tenant has since told us she arranged the visit for 8 September 2025 and has asked us to confirm the correct date.
> 
> Please reply by email to confirm:
> 1. Whether anyone attended or tried to attend today, 30/08/2025, and what happened.
> 2. The correct visit date and time, agreed directly with the tenant.
> 
> Please also check the tenant's name and contact details before you attend. Our record shows Ruben Oakley, the tenant's email signs off as Clara, and the caller on 30/08 gave the name Grace Mercer. The original job email also had an attachment that we could not open, so please send any quote or notes to us directly if you have them.
> 
> Thank you.

**A3 · send_message → Clara (tenant, Flat 3, 3 Willowmere Road) (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara,
> 
> Thank you for calling and for letting us know about the date.
> 
> Our records show the oven visit as 30 August 2025, 10am to 12 noon. You have told us you arranged 8 September 2025. We have asked Keystone Compliance to confirm what happened today and which date is correct. Please treat neither date as final until we write to you again.
> 
> We will be in touch once the provider has confirmed. The target for this repair is to have it looked at within 14 days.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord approval covers sending Keystone Compliance to attend and assess. No spend cap was given and no quote has been received, so no spend is approved.
- The approval does not confirm the cause of the fault or who pays.
- No visit date is booked or confirmed. Neither 30/08 nor 08/09 has been confirmed by the provider.
- The tenant's name and contact details are inconsistent in the records; this has not been resolved.

## Remaining work
- Keystone Compliance to reply on whether they attended 30/08 and on the correct date. Owner: agency, chase on 2025-09-01.
- Confirm the visit date with the provider and update the tenant. Owner: agency.
- Resolve the tenant name conflict (Ruben Oakley / Clara / Grace Mercer) and the provider name conflict (Keystone Compliance / Riverside Works / Keystone Utilities / Lantern Utilities SMS). Owner: agency, before the visit.
- Examine the oven and issue a quote if needed; the visit result is not yet known.

## Missing or unavailable information
- Whether the provider attended on 30/08/2025 10:00.
- The correct visit date (30/08 or 08/09/2025).
- The tenant's correct name on the tenancy.
- The attachment referenced in event 014 (unavailable).
- No spend limit or quote for the repair.

## Conflicts between sources
- Visit date: the system (events 017, 018, 019, 020) says 30/08/2025 10:00; the tenant (event 021) says 8 September 2025. I trusted neither until the provider confirms.
- Tenant name: Ruben Oakley (system), Clara (email sign-off), Grace Mercer (call, event 021).
- Provider name: Keystone Compliance (events 013-019), Riverside Works / Isaac Palmer (event 016), Keystone Utilities (event 021), Lantern Utilities (SMS, event 020).
- Contact numbers: 07700 900721 (tenant contact in event 014; reschedule number in SMS event 020) versus 07700 900077 (event 018, 'enter this code when calling'). The SMS sender does not match the provider on file.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is at visit stage with Keystone Compliance assigned and landlord approval given for a visit. The visit date is unresolved: the system holds 30/08/2025 10:00 (today), and the tenant says she arranged 8 September. The provider has not confirmed either date. Outstanding: the provider's reply on attendance and date, the visit itself, the diagnosis and any quote.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance (existing thread, event 014) to confirm whether they attended on 30/08 and the correct date agreed with the tenant. Email the tenant (existing thread, event 015) to say the date is not final and the agency is checking. Review the hold on 2025-09-01.

**3. Does anything need a human decision, and why?**

No escalation now. The date conflict is routine and the provider can settle it. A human is needed only if the provider cannot confirm or the repair later needs spend above what the landlord has approved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"026-date-conflict","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email from landlord, 2025-08-26… | 1 | ❌ failed | Ticket 026-date-conflict not found on read-back |
| A2 | `send_message` | {"ticket_ref":"026-date-conflict","recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"ticket_ref":"026-date-conflict","recipient_name":"Clara (tenant, Flat 3, 3 Willowmere Road)","recipient_role":"tenant","channel":"email","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `add_note` | {"entity":"026-date-conflict","note":"Record conflicts: tenant named Ruben Oakley (system), Clara (email sign-off), Grace Mercer (call 30/08… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"026-date-conflict","reason":"Waiting for Provider","comment":"Keystone Compliance to confirm whether they attended 30/08/2025… | 1 | ❌ failed | Ticket 026-date-conflict not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-026-date-conflict","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email from landlord, 2025-0… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Keystone Compliance to confirm whether they attended 30/08/… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A1: Recording the landlord decision failed because I used the case id instead of the ticket ref. Retried with NBL-026-date-conflict and it verified as A6.
- A5: The put_on_hold call failed for the same reason. Retried with NBL-026-date-conflict and it verified as A7.
