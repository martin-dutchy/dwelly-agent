# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine oven fault, landlord approved. Visit date in system is inconsistent (Saturday labelled Monday) and only tentatively agreed by phone with a differently named company. I asked the provider to confirm, told the tenant it is unconfirmed, and set a follow-up for 28/08.

## Where the case stands
Landlord approved Keystone Compliance (event 009). Provider assigned; visit shown as booked 30/08/2025 10:00 but the date is contradictory and not confirmed by the provider. Waiting on Keystone to confirm date and attendee; follow-up 28/08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Keystone to confirm exact visit date (Sat 30/08 vs Mon 01/09) and who is attending (call came from Riverside Works) | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell Clara the slot is not yet confirmed, date being checked, next update by 28 Aug | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation; follow-up 28/08/2025 | Keystone Compliance | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Please confirm the exact date and time you will attend Flat 3, 3 Willowmere Road. Our email said 'Monday morning 10-12 (30/08/2025)', but 30/08/2025 is a Saturday. Is it Saturday 30/08 or Monday 01/09?
> - The call at event 016 was logged from Isaac Palmer of 'Riverside Works', not Keystone Compliance. Please confirm who is attending for this job.
> - Please note the tenant was still to confirm the slot by text, so treat it as provisional until you and the tenant both confirm.
> 
> Why: The booked date is contradictory and not confirmed by the provider; the caller's company differs from the assigned contractor.

**A2 · send_message → Clara (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Clara, a correction to our last email: the visit slot "Monday morning 10-12 (30/08/2025)" is not yet confirmed, as 30/08 is a Saturday and Monday is 1 September. We are checking the exact date with the contractor and will email you once it is confirmed. If you have a preferred day, or have already texted the contractor, please let us know. We will update you by 28 August at the latest. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit was booked via set_visit; the date remains unconfirmed.
- Does not establish the cause of the oven fault or cost; any quote needs landlord approval.
- Landlord's 'Yes go ahead' covers sending the contractor only, no spend figure.

## Remaining work
- Keystone to confirm date and attendee; agency then set_visit and tell tenant (owner: agent, 28/08)
- Visit result, any quote to landlord, invoice, closure

## Missing or unavailable information
- Provider-confirmed visit date
- Attachment at event 014 unavailable
- Which company is attending (Keystone vs Riverside Works)

## Conflicts between sources
- 30/08/2025 is a Saturday but events 018/019 say Monday; Monday would be 01/09.
- Call at event 016 was from Riverside Works (Isaac Palmer), while the assigned provider is Keystone Compliance.
- Tenant named variously Ruben Oakley, Grace Mercer, Harriet Fletcher, Clara; contact numbers differ between events 014 and 018/019.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and provider assigned; visit date unconfirmed and contradictory (30/08/2025 is a Saturday, text says Monday); caller company and tenant names differ across records.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance to confirm date and attendee (done); email Clara that it is unconfirmed (done); follow-up 28/08.

**3. Does anything need a human decision, and why?**

No. This is routine and can be settled by asking the provider. Escalate only if Keystone doesn't confirm by the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Clara, a corr… | 2 | ✅ verified | MSG-103 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-08-28","purpose":"Check Keystone has confirmed the oven visit date (Sat 30/08 vs Mon 01/09) and who is attending; then set_v… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
- A2: First attempt failed with HTTP 500; retried once and verified as MSG-103.
