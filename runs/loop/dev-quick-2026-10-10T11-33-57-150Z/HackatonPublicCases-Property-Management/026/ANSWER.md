# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the provider visit ("Yes go ahead", A1), so the job is in the visit stage. The booked date of 30/08/2025 10:00 conflicts with the provider's "Monday morning" wording, and a different company (Riverside Works) phoned the tenant, so I asked Keystone to confirm the company, date and contact in writing (A2) and told the tenant the visit is not yet confirmed (A3). The job is on hold until 2025-08-28.

## Where the case stands
Visit stage. Landlord approved the provider visit (A1). The visit date and attending company are unconfirmed: the system shows 30/08/2025 10:00 (a Saturday), the provider message says "Monday morning 10-12", and a different company (Riverside Works) phoned the tenant. Job is on hold waiting for the provider's written confirmation, review 2025-08-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm in writing the attending company, the exact date and slot, and the tenant contact to use | Keystone Compliance, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the visit is not yet confirmed, that we are checking the date and company, and ask for her best number | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Hold the job waiting for provider confirmation, review 2025-08-28 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 014 email)** (verified)

> Dear Keystone Compliance,
> 
> Re: Oven Repair Request, Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ.
> 
> Our records show a visit booked for 30/08/2025 at 10:00, but your message said "Monday morning between 10 and 12". 30/08/2025 is a Saturday. Also, a caller from Riverside Works (Isaac Palmer) rang the tenant to arrange this visit, and we have not had confirmation from you.
> 
> Please reply to confirm in writing:
> 1. Which company will attend (Keystone Compliance or Riverside Works).
> 2. The exact date and time slot of the visit.
> 3. The tenant's contact number you will use.
> 
> Until we have your confirmation, please treat the visit as not yet confirmed.
> 
> Thank you,
> Northbridge Lettings

**A3 · send_message → Clara (tenant, Flat 3, 3 Willowmere Road) (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara,
> 
> Thank you for your message. Your landlord has approved the oven repair, so we have asked the contractor to look at it.
> 
> The visit is not confirmed yet. Our records show 30/08/2025 at 10:00, but the contractor mentioned a Monday morning between 10 and 12, and we are checking the date and which company is coming with them. We will let you know once they confirm.
> 
> Could you reply with the best phone number and times to reach you? Please also let us know if you were called by Riverside Works, as well as Keystone Compliance.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's 'Yes go ahead' approves the provider visit only. No spend cap was stated, so no quote is approved.
- The 30/08/2025 system booking is not confirmed by the provider, so it is not treated as a firm appointment.
- Sending messages does not establish the cause of the fault or who pays for it.
- Tenant name and phone conflict in the records (Clara, Ruben Oakley, Grace Mercer; 07700 900721 vs 07700 900077) is not resolved.

## Remaining work
- Keystone Compliance (or Riverside Works) to confirm attending company, date and slot in writing (A2), review 2025-08-28.
- Tenant to give best contact number (A3). Confirm her identity and correct the name on the job record.
- Once the visit is confirmed, set_visit with provider's evidence, then record the result and any quote for landlord approval.

## Missing or unavailable information
- Confirmed visit date and time from the provider (30/08 is a Saturday; the provider said Monday).
- Which company is attending (Keystone Compliance or Riverside Works).
- Tenant's correct name and best phone number (records conflict).
- Attachment 'attachment-25-document' sent to the provider is unavailable, so its contents are unknown.

## Conflicts between sources
- Visit date: system 30/08/2025 10:00 (events 017, 018, 019) vs provider 'Monday morning between 10 and 12' (event 016). 30/08/2025 is a Saturday; neither trusted until the provider confirms.
- Provider: assigned Keystone Compliance (events 012-014, 018) vs caller Isaac Palmer from Riverside Works (event 016).
- Tenant name: Clara (events 001, 018) vs Ruben Oakley (events 013, 014, 019) vs Grace Mercer (event 016).
- Tenant phone: 07700 900721 (event 014) vs 07700 900077 (events 018, 019).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage: visit. Landlord approved (A1). A visit date is in the system (30/08/2025 10:00) but is not confirmed: the provider said Monday morning, 30/08 is a Saturday, and a different company phoned the tenant. Outstanding: provider confirmation of company, date and slot; tenant's correct contact; visit, result and any quote still to come.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance (A2) asking for written confirmation of company, date/slot and contact. Email to the tenant Clara (A3) saying the visit is not confirmed and asking for her best number. Job held until 2025-08-28 (A4).

**3. Does anything need a human decision, and why?**

No decision needed yet. Routine oven fault, approval given, no spend cap or quote yet. Escalate only if the provider cannot confirm a visit or the tenant's identity conflict stays unresolved after the reply.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-026","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email from landlord, 2025-08-26 17:28 UTC… | 1 | ✅ verified | Ticket NBL-026 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 014 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara (tenant, Flat 3, 3 Willowmere Road)","recipient_role":"tenant","channel":"email","contact":"existing thread (event … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-026","reason":"Waiting for Provider","comment":"Visit date/time (30/08 10:00 vs 'Monday morning') and attending company (… | 1 | ✅ verified | Ticket NBL-026 read back after put_on_hold |

## Failed or unverified actions
_None._
