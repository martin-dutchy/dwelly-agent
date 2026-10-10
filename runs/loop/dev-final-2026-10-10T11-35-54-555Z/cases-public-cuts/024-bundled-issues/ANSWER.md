# Case 024: Oven repair request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The oven job was closed with no evidence of a fix, and the tenant was wrongly told the fence and oven were fixed. The tenant now asks about a leaking conservatory roof. I opened separate jobs for the roof, fence and oven, corrected the record with the tenant, and asked the landlord for approval.

## Where the case stands
Original oven ticket is closed (without payment) with no provider result or tenant confirmation. Three new linked jobs open at intake: JOB-101 roof leak (urgent), JOB-102 fence, JOB-103 oven. Waiting on landlord approval and tenant details.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Corrected the wrong 'fixed' message, confirmed the three new jobs, asked for leak details and gave electrical safety advice | Imogen Clarke, tenant | email | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord to approve our contractor inspecting the roof, and flagged the oven and fence | Landlord | email | A5 ✅ |
| 3 | WAIT | Follow up on the next working day for the landlord's reply and the tenant's leak details | Landlord and tenant | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, I'm sorry – our message on 26 Aug saying the fence and oven were fixed was sent in error; we have no record of that. I've now opened separate jobs for each: the oven (JOB-103), the fence (JOB-102) and the leaking conservatory roof (JOB-101). The roof is being treated as urgent, with a target of within 72 hours once we have the details. Could you tell us where the water is coming in, whether it is near any lights or sockets, and send a photo if you can? If water is near electrics, please keep away and switch off that circuit at the fuse box if it's safe to do so. We'll update you on the oven and fence once the landlord has been asked and a contractor is lined up.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May we send our roofing contractor to inspect? Also: the oven (JOB-103) is still not working and the fence repair (JOB-102) is outstanding; the earlier oven job was closed in error.
> 
> Options: Yes, send your contractor to inspect the roof (recommended); I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor has been assigned or booked for any of the new jobs
- The oven is not confirmed fixed or unfixed by a provider
- Landlord's 'yes please' on 5 Aug covered only the oven inspection, not the roof or the fence

## Remaining work
- Landlord decision on roof, oven and fence
- Tenant leak details and photos
- Assign contractors once authorised
- Confirm what Lantern Works actually did on the oven and why the invoice was recorded

## Missing or unavailable information
- Provider visit result for the oven
- Earlier report of the roof leak (none found)
- Fence details
- Unseen oven manual and photo attachments

## Conflicts between sources
- Event 016 says the fence and oven were fixed, but no provider result exists and the tenant had reported the oven still broken; I trusted the lack of evidence.
- Event 030 closed the job without payment although the invoice was received (events 017 and 020) and no completed work was recorded.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The original job is closed without evidence. The oven is likely still unfixed, the fence was never logged, and the conservatory roof leak is new. Jobs JOB-103, JOB-102 and JOB-101 are open at intake, waiting on landlord approval and tenant details.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant to correct the earlier message and ask for leak details (sent), and email the landlord for roof approval (sent). Follow-up is set for 2026-08-27.

**3. Does anything need a human decision, and why?**

Not at the moment. The landlord decision is routine and has been requested. A human should escalate if the landlord stays silent or the leak turns out to be serious. A human may also want to review the premature closure and the incorrect tenant message.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) aski… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Tenant asked (event 015, … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"appliance","severity":"routine","description":"Oven still not cookin… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"Tenant reports a leaking conservatory roof at Flat 6, 56 Juniper Mews. May … | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `add_note` | {"entity":"NBL-024-bundled-issues","note":"Closed without payment on 26 Aug with no provider result or tenant confirmation; event 016 'fixed… | 1 | ✅ verified | NOTE-106 found in the add_note log |
| A7 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-27","purpose":"Chase landlord for roof approval and tenant for leak details/photos (urgent)","part… | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
