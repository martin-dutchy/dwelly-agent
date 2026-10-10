# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven ticket was closed and the tenant told 'fixed' with no evidence. The tenant is now chasing a conservatory roof leak and the earlier fence request. I logged separate jobs for the roof (urgent), fence and oven, corrected the record, told the tenant, and asked the landlord for approval. No human decision is needed yet.

## Where the case stands
Original oven ticket closed without payment, but with no provider visit, result or tenant confirmation. The tenant's roof leak and fence issues were never logged. New jobs JOB-101 (roof, urgent), JOB-102 (fence) and JOB-103 (oven) are open at intake. The landlord has been asked about the roof and fence.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Corrected the wrongly sent 'fixed' message, confirmed three separate jobs, asked for roof leak details with electrics safety advice, and gave a next-contact date of 28 Aug | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked the landlord to approve our contractor inspecting and quoting for the roof leak and fence, and told them the earlier 'fixed' note was wrong | Landlord | email | A5 ✅ |
| 3 | WAIT | Review on 27 Aug: landlord reply, tenant roof details, and assigning Lantern Works to the oven | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our email saying the fence and oven were fixed was sent in error, and we have no record that either has been done. I've opened separate jobs for the oven, the fence and the leaking conservatory roof, so each is tracked properly. For the roof, could you tell us where it leaks, roughly how much water comes in, and whether it is near any lights or sockets? If water is near electrics, please keep away from them and switch that circuit off if it is safe to do so. I'll ask the landlord about the roof and fence and get the oven job to our contractor. You'll hear from us again by 28 August.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof, and a fence repair is also outstanding. May we send our contractor to inspect and quote for each? (Also: our earlier note that the oven and fence were fixed was wrong; the oven is being rebooked with Lantern Works under your earlier yes.)
> 
> Options: Yes, send your contractor to inspect and quote (recommended); I will arrange my own contractor; Tenant to deal with it

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor has been assigned or visit booked
- The oven is not confirmed fixed
- The roof leak severity is not yet established
- The landlord has not approved the roof or fence work

## Remaining work
- Assign Lantern Works to oven JOB-103 and get the tenant's availability (agency)
- Landlord decision on roof JOB-101 and fence JOB-102
- Tenant to supply roof leak details
- Confirm whether Lantern Works ever attended on the original job

## Missing or unavailable information
- Roof leak details and whether it is near electrics
- Whether Lantern Works visited, and any invoice (the 'invoices visible in portal' note is unverified)
- Landlord approval for the roof and fence work

## Conflicts between sources
- Event 016 and the completed stage say the oven and fence are fixed, but there is no provider result, visit or tenant confirmation. I treated the job as not fixed.
- The tenant says the roof leak was reported before, but there is no record of it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is closed without payment, but nothing shows the oven was fixed. The fence and conservatory roof leak were never logged. They are now JOB-102 and JOB-101, with the oven reopened as JOB-103. Landlord approval is outstanding for the roof and fence, and Lantern Works still needs assigning to the oven.

**2. What is the next action, who is it for, and through which channel?**

The tenant has been emailed a correction and asked for roof details. The landlord has been asked to approve inspection and quotes for the roof and fence. We review on 27 Aug.

**3. Does anything need a human decision, and why?**

Not at this point. The routine work is done. A human is needed only if the roof leak turns out to involve electrics or the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) chas… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Oven heating very slo… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","body":"Hi Imoge… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof, and a fence repair is also outs… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Closed without evidence: no provider result, visit or tenant confirmation; event 016 wrongly told… | 1 | ✅ verified | NOTE-106 found in the add_note log |
| A7 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Roof leak: check landlord reply and tenant details; chase Lantern Works on oven JOB-103 (assign only once … | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
