# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant reports the dishwasher door still won't close after the checks and asks for an engineer. The system holds a visit for 29/04/2026 08:00, but the provider and company details conflict across the call log, the SMS and the provider record. The tenant has been told the slot is being confirmed, and the provider has been asked to confirm the slot and company, and to quote if needed. The job is on hold until 2026-04-29.

## Where the case stands
Visit stage. Dishwasher door not closing at Flat 9, 89 Juniper Mews. Riverside Compliance was assigned (event 013) and a visit was recorded for 29/04/2026 08:00 (event 017). The tenant wrote on 28/04 (event 021) that the door still won't close after the checks and asked for an engineer. The job is on hold, waiting for the provider to confirm the visit and the attending company. Review 2026-04-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the record shows a visit on Wed 29/04/2026 08:00-12:00, that we are confirming it with the provider, and give the provider's number for changes. | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Riverside Compliance to confirm the 29/04 08:00-12:00 visit, confirm which company is attending (Cedar Utilities vs Riverside Compliance vs Harbour Homes), and quote for the repair if needed; no work beyond diagnosis before approval. | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Hold the job until 2026-04-29 for the provider's confirmation and attendance. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for letting us know the dishwasher door still isn't closing, and sorry it's taken a while.
> 
> Our records show a visit booked for Wednesday 29 April 2026, between 8am and 12 noon, with Riverside Compliance. We are checking that slot with the provider now, and we will let you know once they have confirmed it. If you need to change the time, please contact the provider on 07700 900410.
> 
> Once the engineer has looked at the appliance, we will get in touch about next steps.
> 
> Kind regards,
> Northbridge Lettings

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Riverside Compliance,
> 
> Re: Dishwasher Repair Request, Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ (tenant Leo Turner, 07700 900763).
> 
> Please confirm the visit for Wednesday 29 April 2026, 08:00-12:00, and reply to this email.
> 
> Please also note: a call on 26 April was logged from "Cedar Utilities" and an SMS to the tenant came from "Harbour Homes". Please confirm which company is attending, so the tenant knows who to expect.
> 
> The tenant reports the door still will not close after the checks already done. Please quote for the repair if parts or further work are needed, and send photos with the estimated completion time. Do not start work beyond diagnosis until we have approved a quote.
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the messages does not confirm the visit; the provider has not yet confirmed 29/04.
- Nothing establishes the cause of the fault or who pays for the repair.
- No landlord decision on a repair quote exists yet; no spend is approved.
- This is not a duplicate: the only ticket in the system is NBL-012-duplicate-report.

## Remaining work
- Provider to confirm the 29/04 visit and attending company (agency ops, review 2026-04-29).
- After the visit, record the work result (completed, partial, or needs_quote).
- If a quote is needed, send it to the landlord for a recorded decision before instructing work.
- Correct the tenant name discrepancy in the call log ('Leo Kendall' vs Leo Turner) with an internal note.

## Missing or unavailable information
- Provider's written confirmation of the 29/04 slot.
- Which company is attending: the call log says Cedar Utilities, the SMS says Harbour Homes, and the provider on file is Riverside Compliance.
- No landlord decision recorded in the history with the landlord's own words; event 012 is an agency note, not a landlord reply.

## Conflicts between sources
- Provider name: the case assigns Riverside Compliance (events 013/015), but the 26/04 call log says Cedar Utilities (event 016).
- Tenant name: the call log says 'Leo Kendall' (event 016); the tenancy record and emails say Leo Turner.
- Contact: the SMS (event 020) is from 'Harbour Homes' and gives 07700 900410, which is the same number given to the tenant as the provider's in event 019. The SMS sender does not match the provider on file. Trusted the system record (Riverside Compliance, visit recorded in event 017) and asked the provider to confirm.
- Visit window: the system records 29/04 08:00 (event 017) and the emails say 'this Wednesday between 8 and 12' (events 018-019). The date agrees but the window differs, so the provider needs to confirm.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage. Riverside Compliance was assigned and a visit was recorded for 29/04/2026 08:00. The provider has not confirmed it in writing, and the company name conflicts. The tenant reports the fault persists. Outstanding: provider confirmation, the visit, the result, and any quote needing landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant (Leo Turner) on the existing thread with the visit status (A1). Email Riverside Compliance to confirm the slot and attending company and to quote if needed (A2). Hold until 2026-04-29 (A3).

**3. Does anything need a human decision, and why?**

No escalation now. The fault is routine, with no safety risk reported. Provider confirmation and any repair quote can be handled by routine follow-up. A landlord decision is needed only if a quote is produced.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"ticket_ref":"NBL-012-duplicate-report","recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing threa… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"ticket_ref":"NBL-012-duplicate-report","recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-012-duplicate-report","reason":"Waiting for Provider","comment":"Waiting for Riverside Compliance to confirm the 29/04/20… | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after put_on_hold |

## Failed or unverified actions
_None._
