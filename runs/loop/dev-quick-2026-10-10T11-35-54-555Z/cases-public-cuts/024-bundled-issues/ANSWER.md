# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed as completed without payment, but no provider visit, quote, work result or tenant confirmation supports that. I reopened it, held it for Lantern Works (review 2026-08-27), and told the tenant the earlier 'oven fixed' message was unsupported. The conservatory roof leak is a separate issue, logged as JOB-101 and sent to the landlord for approval.

## Where the case stands
Oven job NBL-024-bundled-issues was closed at event 030 (completed without payment) with no provider visit, quote, work result or tenant confirmation on record. I reopened it to visit stage and put it on hold for Lantern Works, review 2026-08-27. The tenant's new message (event 032) is a separate leaking conservatory roof issue, now logged as JOB-101 (init), waiting on landlord approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the roof job is logged as JOB-101, the oven record is reopened, the earlier 'oven fixed' and fence wording was not supported by any record, and ask whether the oven works now and for her best number and times. | Imogen Clarke, tenant | email | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to approve a roofing contractor for the conservatory leak, or to arrange their own, and to confirm the oven status. | Landlord, Flat 6, 56 Juniper Mews | email | A4 ✅ |
| 3 | CHASE_PROVIDER | Ask Lantern Works for the oven visit date, outcome, any quote or invoice, and their correct company name. | Lantern Works, contractor | email | A5 ✅ |
| 4 | WAIT | Hold the oven job for provider reply, review 2026-08-27. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen,
> 
> Thank you for your message about the conservatory roof. I'm sorry for the delay.
> 
> I've logged the leaking conservatory roof as a new repair (ref JOB-101). We will ask the landlord to approve a contractor, and we'll let you know as soon as we hear back.
> 
> I also need to correct my earlier message. The oven job was closed without us having a record of a repair, so I can't confirm the oven has been fixed. I've reopened it. Could you tell us whether the oven is working properly now? The fence was a separate matter, and I'm checking it separately too.
> 
> Please also send us your best phone number and the times you're home so the contractor can arrange access. We'll only enter with proper notice.
> 
> Kind regards,
> Northbridge Lettings

**A4 · request_landlord_approval → Landlord, Flat 6, 56 Juniper Mews (landlord)** (verified)

> Approve a roofing contractor to inspect and repair the leaking conservatory roof at Flat 6, 56 Juniper Mews, and confirm a spend limit. Also confirm the oven status, as the oven job was closed without a work record.
> 
> Options: Approve a roofing contractor to inspect and repair the leaking conservatory roof, with a spend cap of your choice (recommended: we will arrange the inspection first); Arrange your own roofing contractor and tell us their name and a date; Hold until the inspection report is available

**A5 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Hello Lantern Works,
> 
> Regarding the oven repair at Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ (tenant Imogen Clarke). We have no record of a visit, quote or completion report from you. The job was closed in error and has been reopened.
> 
> Please reply with: the date of any visit and what was done, whether the oven was repaired, any quote, and any invoice. Please also confirm your correct company name, as one record shows Keystone Solutions.
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening the job and emailing the tenant do not establish that the oven is fixed.
- The fence statement in event 016 was not verified and is not part of this job. Fence job status is not established here.
- No contractor is instructed for the roof until the landlord approves.
- No invoice, quote or payment is established. Lantern Works and Keystone Solutions naming is unresolved.

## Remaining work
- Lantern Works to confirm the oven visit and outcome (review 2026-08-27). Owner: agency.
- Landlord to approve the roof contractor or arrange their own (APR-103). Owner: landlord.
- Tenant to confirm whether the oven works and give contact details. Owner: tenant.
- Check the fence job separately; event 016 wrongly told the tenant it was fixed. Owner: agency.
- Confirm the provider's legal name and invoice route (Lantern Works vs Keystone Solutions).

## Missing or unavailable information
- Any provider visit record or work result for the oven
- Whether the oven works now
- Landlord decision on the roof
- Fence job record
- Tenant's direct phone number and access times (only the provider's contact on file is 07700 900512)

## Conflicts between sources
- Event 016 told the tenant the oven and fence were fixed, but no provider record supports the oven fix, and the fence is a different job (event 015). I trusted the system record and the absence of work evidence.
- Event 029 names Keystone Solutions as the invoice portal, but events 012-013 name Lantern Works as the provider. Not resolved.
- Event 032 refers to a 'previously reported' roof issue, but no roof ticket existed in the system. I created JOB-101 and did not assume it duplicates anything.
- Event 003 says the cooker was working for the previous tenant, while event 006 says it has never worked since move-in. Not resolved.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

The oven job was wrongly closed at event 030 with no evidence of repair. It is now reopened and on hold waiting for Lantern Works. Outstanding: the oven visit outcome, the tenant's confirmation of the oven, and the landlord's roof decision (JOB-101).

**2. 2. What is the next action, who is it for, and through which channel?**

Email the tenant (A3). Request landlord approval for the roof contractor (A4). Email Lantern Works to chase the oven visit and outcome (A5). Hold the oven job with a review on 2026-08-27 (A6).

**3. 3. Does anything need a human decision, and why?**

Not yet. The roof needs the landlord's decision on who does the work and the spend cap. The fence job and the provider name conflict (Lantern Works vs Keystone Solutions) may need a human to check records if the provider does not clarify. No escalation now, as the decisions sit with the landlord and provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-024-bundled-issues","stage":"visit","note":"Reopened: closed at event 030 without any provider work result, quote, visit record … | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back at stage visit |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports a leaking co… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `request_landlord_approval` | {"ticket_ref":"JOB-101","landlord":"Landlord, Flat 6, 56 Juniper Mews","decision_needed":"Approve a roofing contractor to inspect and repair… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-024-bundled-issues","reason":"Waiting for Provider","comment":"Waiting for Lantern Works to report the oven visit, outcom… | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back after put_on_hold |

## Failed or unverified actions
_None._
