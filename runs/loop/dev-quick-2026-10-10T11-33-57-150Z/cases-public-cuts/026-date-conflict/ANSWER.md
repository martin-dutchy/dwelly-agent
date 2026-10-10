# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is approved by the landlord and with Keystone Compliance, but the visit date conflicts: the system says 30/08/2025 10:00-12:00 and the tenant says 8 September 2025. I asked the provider to confirm the date in writing, told the tenant it is not yet confirmed, and put the job on hold until 2 September 2025.

## Where the case stands
Stage: visit. Oven repair (main oven element not heating; grill works), routine. Landlord approved Keystone Compliance on 26 Aug ("Yes go ahead"). Provider was booked for 30/08/2025 10:00-12:00 in the system. On 30 Aug the tenant said she had arranged 8 September 2025 with the provider. The provider has not confirmed either date. Job is on hold, waiting for the provider, review 2 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm in writing the exact date and time they have booked (30/08/2025 10:00-12:00 per our record, or 8 September 2025 per the tenant), noting 30/08 is a Saturday. | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the date is not yet confirmed, that we are checking with the provider, and that we will write once they reply. | Grace Mercer, tenant | email | A3 ✅ |
| 3 | WAIT | Hold the job until the provider confirms the date, with a review on 2025-09-02. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 014 email)** (verified)

> Hello,
> 
> Re: Oven Repair Request, Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ.
> 
> Our records show a visit booked for 30/08/2025, 10:00-12:00. The tenant has since told us she arranged the visit for 8 September 2025 instead. Please confirm by reply which date and time you have actually booked with the tenant.
> 
> Also, please note the earlier notes say "Monday morning", but 30/08/2025 is a Saturday. Please confirm the exact date.
> 
> Until you confirm, please do not treat either date as final. Once we have your confirmation we will update the tenant.
> 
> Thank you.

**A3 · send_message → Grace Mercer (tenant, Flat 3) (tenant) via email, existing thread (event 015 email)** (verified)

> Hello,
> 
> Thank you for calling. Our records show the oven visit as 30/08/2025, 10:00-12:00, but you have told us you arranged 8 September 2025. We have asked Keystone Compliance to confirm the date they have booked with you. We will let you know in writing as soon as they reply. Please don't rely on either date until then.
> 
> If the oven has stopped heating up in the meantime, you can still use the grill. Please keep the hob and oven switched off when you are not using them.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the provider and tenant messages does not confirm any visit date.
- The cause of the fault is not established, and no quote or cost is approved beyond the landlord's general go-ahead.
- No visit has been set or changed in this run.

## Remaining work
- Provider to confirm the visit date (owner: Keystone Compliance). Review 2025-09-02.
- Once confirmed, update the tenant and set the visit with the provider's confirmation.
- Confirm the tenant's name and contact details, which conflict across records (owner: agency records).
- Attachment on the provider email (event 014) is unavailable; re-request if needed.
- Landlord to be updated with the visit outcome after the visit.

## Missing or unavailable information
- Provider's confirmed visit date and time.
- Correct tenant name (Ruben Oakley, Clara or Grace Mercer) and correct contact number.
- Spend cap for the repair, if any.

## Conflicts between sources
- Visit date: system 30/08/2025 10:00 (events 017-020) vs tenant 8 Sept 2025 (event 021). Trusted neither until the provider confirms. 30/08/2025 is a Saturday, but the provider said 'Monday morning'.
- Tenant name: Ruben Oakley (system), Clara (event 018 and tenant email), Grace Mercer (event 021 call).
- Provider name: Keystone Compliance (events 013-019), Riverside Works (event 016), Keystone Utilities (event 021), Lantern Utilities (SMS, event 020).
- Phone 07700 900721 is listed as tenant contact in event 014 but is the reschedule line in the SMS (event 020).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage, routine oven repair. Landlord approved Keystone Compliance on 26 Aug. The visit date is unconfirmed (30/08 in the system vs 8 Sept per the tenant). The provider's confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance (existing thread) to confirm the booked date and time. Email the tenant (existing thread) that the date is not confirmed. Job on hold, review 2 Sept 2025.

**3. Does anything need a human decision, and why?**

No. This is routine work within the approved scope. The name and contact conflicts can be settled by records checks, not a decision. Escalate only if the provider cannot confirm a date or the spend exceeds what the landlord approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-026-date-conflict","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email from landlord, 2025-0… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after record_landlord_decision |
| A2 | `send_message` | {"ticket_ref":"NBL-026-date-conflict","recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"exis… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"ticket_ref":"NBL-026-date-conflict","recipient_name":"Grace Mercer (tenant, Flat 3)","recipient_role":"tenant","channel":"email","contact"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Keystone Compliance to confirm the visit date: system shows… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Record conflicts to check: tenant named as Ruben Oakley (system), Clara (event 018 and tenant emai… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
