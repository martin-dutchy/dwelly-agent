# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed and the tenant told 'fence and oven fixed' with no evidence of a visit. The tenant then asked about a leaking conservatory roof, and earlier about the fence. I opened three linked jobs, corrected the record with the tenant, asked the landlord for approval and set a follow-up.

## Where the case stands
Original oven ticket closed without payment, but with no provider result or visit evidence. Three new linked jobs opened. Waiting on the tenant's details and the landlord's approval; review 2026-08-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Correct the false 'fixed' email, explain the three jobs, ask for roof leak details, electrics safety advice, and oven status | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor for roof and fence inspection | Landlord | email | A5 ✅ |
| 3 | WAIT | Review replies on 2026-08-27 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry: our earlier email saying the oven and fence were fixed was sent in error, and we have no record of a repair visit. I've reopened the oven as a new job (JOB-103), and logged the fence (JOB-102) and the leaking conservatory roof (JOB-101) as separate jobs. For the roof, please tell us where it leaks, whether water is near any lights, sockets or appliances, and when you're usually home. If water reaches electrics, switch that circuit off and call us straight away. Please also confirm whether the oven is still not heating properly. We'll update you by 2026-08-28.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof (JOB-101) and a fence repair (JOB-102). Please say whether we may send our contractor to inspect each, or whether you'll arrange your own. The oven (JOB-103) is reopened as no repair was recorded.
> 
> Options: Yes, send your contractor to inspect roof and fence; I'll arrange my own contractor; Roof only

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Opening the jobs does not approve any work or spend
- No contractor assigned, no visit booked
- The oven is not confirmed fixed or broken beyond the tenant's report

## Remaining work
- JOB-101 roof: get details, landlord approval, assign contractor (urgent)
- JOB-102 fence: details and approval
- JOB-103 oven: landlord approval was given 2026-08-05; confirm Lantern Works visit with provider
- Check the invoice flagged as visible on Keystone Solutions against the assigned provider, Lantern Works

## Missing or unavailable information
- Roof leak details and whether electrics are affected
- Fence details
- Whether any oven or fence work really happened
- Who Keystone Solutions is

## Conflicts between sources
- Event 016 says the oven and fence are fixed; the tenant at events 006 and 032 implies otherwise, and there is no provider result. I trusted the tenant and the absence of evidence.
- Invoice notes name different systems (portal vs Keystone Solutions) and the provider is Lantern Works.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The oven ticket is closed without payment but unsupported by evidence. The roof leak and fence requests were never logged. All three are now open as JOB-101, JOB-102 and JOB-103, with approvals pending.

**2. What is the next action, who for, and which channel?**

Email to the tenant correcting the earlier message and asking for details (done), and an approval request to the landlord (done). Follow-up on 2026-08-27.

**3. Does anything need a human decision?**

Not at present. If the landlord stays silent on the urgent roof leak, escalate P2. A human may want to check the 'Keystone Solutions' invoice note, which differs from the assigned provider, Lantern Works.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant asking for update on… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant asked on 2026-08-0… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Reopened oven fault: … | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","body":"Hi Imoge… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant reports a leaking conservatory roof (JOB-101) and a fence repair (JOB-102). Please say whet… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"due_on":"2026-08-27","purpose":"Review tenant reply and landlord approval for JOB-101/102/103; chase landlord if silent","ticket_ref":"JOB… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
