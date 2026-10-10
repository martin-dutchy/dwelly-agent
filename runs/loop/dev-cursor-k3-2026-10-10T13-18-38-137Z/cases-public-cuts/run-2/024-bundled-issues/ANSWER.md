# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed with no evidence of a visit, and the tenant was wrongly told the oven and fence were fixed. I reopened the oven job, logged separate jobs for the roof leak and fence, corrected the record with the tenant, asked the landlord for approval and chased the provider.

## Where the case stands
Oven job reopened at visit stage; provider Lantern Works has not responded since 5 Aug. New jobs JOB-101 (roof leak, urgent) and JOB-102 (fence, routine) opened; landlord approval requested.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the false 'fixed' email, explain reopened and new jobs, ask roof details and access | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve contractor for roof leak and fence | Landlord | email | A5 ✅ |
| 3 | CHASE_PROVIDER | Chase Lantern Works to book the oven visit | Lantern Works, contractor | email | A7 ✅ |
| 4 | WAIT | Review on 28 Aug | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier email saying the oven and fence were fixed was wrong. We have no record of any repair, so we've reopened the oven job and are chasing the contractor, Lantern Works, to book a visit. We've also opened separate jobs for the fence and for the leaking conservatory roof, which we have no earlier record of. For the roof, please tell us where it leaks, how bad it is, and whether water is near any lights or sockets. If it is, keep away from them and switch off at the fuse box if safe. Please also send times you're home for access. We'll update you by 28 August.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May we send our roofing contractor to inspect and quote? Also, the tenant is asking about a fence repair (JOB-102): may we send a contractor to inspect that too? Please reply by 29 August.
> 
> Options: Yes, send your contractor (recommended); I'll arrange my own contractor; Other instruction

**A7 · send_message → Lantern Works (contractor) via email, existing thread (event 013 email)** (verified)

> Hello Lantern Works, we have no reply to our 5 Aug request about the oven at Flat 6, 56 Juniper Mews (heats very slowly). Please confirm a visit date with the tenant and tell us by 28 August. If a quote is needed, send it to us and do not start work until approved.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening does not confirm the oven fault or cause
- Roof and fence jobs are not approved or booked
- No appointment is confirmed
- Oven manual and photo attachments were unseen

## Remaining work
- Lantern Works to visit oven
- Landlord decision on roof and fence
- Tenant details on roof leak
- Review 28 Aug (agency)

## Missing or unavailable information
- Roof leak details and severity
- Any provider result for the oven
- Whether a fence repair was ever approved

## Conflicts between sources
- Event 016 said oven and fence fixed; no visit, result or provider message exists, and tenant says the oven never worked. Trusted the record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job was wrongly closed and is now reopened. Nothing is confirmed fixed. The roof leak and fence are new jobs (JOB-101, JOB-102) awaiting landlord approval, and the provider has not responded.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant correcting the record (done), landlord approval request for roof and fence, and an email chase to Lantern Works.

**3. Does anything need a human decision, and why?**

No. The routine steps are covered. If the landlord stays silent on the roof leak, escalate P2 after 3 days.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports a leaking co… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant asked on 5 Aug (ev… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `update_ticket` | {"ref":"NBL-024-bundled-issues","stage":"visit","note":"Reopened: closed without evidence. No provider visit, result or quote in history; te… | 1 | ✅ verified | Ticket NBL-024-bundled-issues read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May … | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-024-bundled-issues","due_on":"2026-08-28","party":"Lantern Works / tenant","purpose":"Confirm Lantern Works has booked ov… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `send_message` | {"recipient_name":"Lantern Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref"… | 1 | ✅ verified | MSG-106 found in the send_message log |

## Failed or unverified actions
_None._
