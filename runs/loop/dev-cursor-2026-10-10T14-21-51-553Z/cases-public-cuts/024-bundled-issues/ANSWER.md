# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job had been closed and the tenant told it was fixed with no evidence. I reopened it, asked Lantern Works what happened, and logged the fence (JOB-102) and conservatory roof leak (JOB-101, urgent) as separate jobs. The tenant and landlord have been told, and a follow-up is set for 28 Aug.

## Where the case stands
Oven ticket was closed "without payment" with no evidence of any visit, result or invoice; reopened to visit stage. Fence and conservatory roof leak were raised by the tenant but never logged; now JOB-102 and JOB-101. Waiting on Lantern Works, the tenant and the landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Apologise for the wrong 'fixed' message, confirm the three jobs, ask roof details and whether the oven is still faulty | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | CHASE_PROVIDER | Ask Lantern Works whether they attended the oven job, with date, findings, invoice and photos by 28 Aug | Lantern Works, provider | email | A5 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to approve our contractor inspecting the conservatory roof, and update them on the oven and fence | Landlord | email | A6 ✅ |
| 4 | WAIT | Review 28 Aug for provider, landlord and tenant replies | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry – our earlier email saying the oven and fence were fixed was wrong, and we had no confirmation of that. We've reopened the oven job and are checking with the contractor, Lantern Works, what happened. We've also logged your fence repair (JOB-102) and the leaking conservatory roof (JOB-101) as separate jobs; we couldn't find the roof report on our system, so apologies. For the roof: could you tell us where it leaks, roughly how much, and whether water is near any electrics or lights? If it is, please keep clear of that area and switch off that circuit if safe. Roof leaks are urgent so we'll aim to arrange a visit within 72 hours once we have the landlord's go-ahead. We'll update you by Thursday 27 August. Could you also tell us whether the oven is still not heating properly?

**A5 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Hello Lantern Works, we have no record of a visit, quote or invoice for the oven repair at Flat 6, 56 Juniper Mews (sent 5 Aug). Please confirm by Friday 28 Aug: did you attend, on what date, what you found and did, and send the invoice and photos if so. If you haven't attended, please let us know the earliest date you can. Please don't start any chargeable work without our approval.

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> Approve our contractor to inspect the leaking conservatory roof reported by the tenant (urgent)
> 
> Options: Yes, use our contractor to inspect and quote; No, you will arrange your own contractor
> 
> Update: Also: the tenant has asked about the fence repair (JOB-102, logged now, routine). The oven job was wrongly marked complete; we've reopened it and asked Lantern Works what happened, and will update you. Please reply by 29 Aug.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening does not establish whether the oven is fixed or whether Lantern Works attended
- Roof job is not approved and no contractor is assigned
- No cause, cost or visit date is established for any issue

## Remaining work
- Oven: provider and tenant confirmation, then proper close (agency, by 28 Aug)
- JOB-101 roof: landlord approval, tenant details, contractor assignment (agency)
- JOB-102 fence: landlord approval and contractor (agency)

## Missing or unavailable information
- Whether Lantern Works ever attended
- Roof leak details and whether any earlier report exists
- Fence fault details

## Conflicts between sources
- Event 016 said the oven and fence were fixed and event 030 closed the job, but there is no provider result and the tenant said the oven never worked (event 006). I treated it as not fixed.
- Event 015 asked about a fence and event 032 about a conservatory roof, neither in the original oven request.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket was closed without evidence and has been reopened. Fence and roof leak had never been logged and now are. Outstanding: provider confirmation of the oven work, landlord approval for the roof and fence, and tenant details.

**2. What is the next action, who is it for, and through which channel?**

A correcting email to the tenant, a chase email to Lantern Works, and an approval request to the landlord for the roof inspection. All sent.

**3. Does anything need a human decision, and why?**

Not now. The landlord decides on the roof and fence. If Lantern Works doesn't reply by 28 Aug or the tenant reports water near electrics, escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (event 032, 26 Aug) … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant (event 015, 5 Aug)… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `update_ticket` | {"ref":"NBL-024-bundled-issues","stage":"visit","note":"Reopened: closed without payment (event 030) but history has no provider reply, visi… | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Approve our contractor to inspect the leaking conservatory roof reported by… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `schedule_follow_up` | {"due_on":"2026-08-28","purpose":"Check Lantern Works reply on oven, landlord reply on roof, tenant info","ticket_ref":"NBL-024-bundled-issu… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A8 | `resume_auto` | {"ticket_ref":"NBL-024-bundled-issues"} | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back after resume_auto |

## Failed or unverified actions
_None._
