# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** urgent

The oven job was closed with no evidence of a repair. The tenant was wrongly told the fence and oven were fixed. The tenant is now chasing a leaking conservatory roof. I logged separate roof (urgent) and fence (routine) jobs, corrected the record with the tenant, and escalated for contractor assignment and an audit.

## Where the case stands
Oven ticket NBL-024 shows completed without payment, but with no evidence of repair or tenant confirmation. Fence and conservatory roof leak were never ticketed. New tickets JOB-101 (roof, urgent) and JOB-102 (fence, routine) are at init. The tenant has been emailed. Escalated as ESC-104.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SPLIT_NEW_REQUEST | Created JOB-101 (urgent roof leak) and JOB-102 (routine fence) linked to the oven ticket | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Corrected the wrongly sent 'all fixed' email, gave 72h/14-day targets, asked for photos, electrical safety info and oven confirmation | Imogen Clarke, tenant | email | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalated the erroneous closure and the need for roof contractor and landlord approval | internal maintenance | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Imogen Clarke (tenant) via email, existing thread (event 032 email)** (verified)

> Hi Imogen, sorry for the confusion. Our earlier email saying the fence and oven were fixed was sent in error, and we can't confirm either is done. We have now logged your leaking conservatory roof as urgent (ref JOB-101); our target is to get someone to look at it within 72 hours. The fence repair is logged separately (ref JOB-102) as routine, with a target of within 14 days. Could you please: 1) send a photo of the roof leak and the fence, 2) tell us if water is near any lights, sockets or appliances (if so, keep clear and switch that circuit off if safe), and 3) tell us whether the oven is now working properly. Thanks, Northbridge Lettings

## Escalation
- **P2 → maintenance** (verified): Oven ticket closed without evidence; fence and conservatory roof issues never ticketed; tenant told wrongly that all was fixed
  - Known: Oven ticket NBL-024 completed without payment (event 030); no repair/visit result, quote or tenant confirmation in history. Event 016 told tenant fence and oven fixed, though no fence ticket existed. Tenant asked about fence (015) and conservatory roof leak (032). Created JOB-101 (roof, urgent) and JOB-102 (fence, routine). Tenant emailed to correct and request photos. Property record has no landlord contact or spend limit.
  - Missing: Whether the oven was actually repaired; who the invoice (Keystone Solutions vs Lantern Works) was from; landlord approval and contractor for roof/fence; landlord contact details.
  - Options: Reopen oven ticket if tenant says not fixed; Approve contractor for roof now; Review the erroneous closure
  - Recommendation: Assign a roofer for JOB-101 within 72h, get landlord approval, and audit the oven closure.

## What this does not establish
- Creating tickets does not approve spend or assign a contractor
- The tenant message does not confirm any appointment
- Oven repair is not established as done

## Remaining work
- Maintenance: assign roofer and get landlord approval for JOB-101 within 72h
- Fence JOB-102 within 14 days
- Confirm oven status with tenant and reopen if still faulty
- Audit the invoice and closure

## Missing or unavailable information
- Landlord contact and spend limit not on property record
- Oven repair evidence and invoice details
- Photos of roof and fence

## Conflicts between sources
- Event 016 said fence and oven fixed, but no fence ticket or oven result exists
- Invoice notes cite both the portal and Keystone Solutions, while the provider assigned was Lantern Works
- Event 015 asked about the fence but event 032 asks about the roof, so these are separate issues from the oven

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven ticket is marked completed without payment, but there is no evidence of a visit, repair or tenant confirmation. The fence and conservatory roof leak were raised by the tenant but never ticketed. Outstanding: roof (urgent), fence, and oven verification.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant, Imogen Clarke, correcting the earlier message and confirming the new jobs, targets and requests for photos. Internal escalation to maintenance.

**3. Does anything need a human decision, and why?**

Yes. A human needs to approve or assign the roof contractor and landlord spend, and review the closure and invoice discrepancy. Landlord details and limits are not on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant reports leaking cons… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"other","severity":"routine","description":"Fence repair: tenant aske… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"JO… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Oven ticket closed without evidence; fence and conservatory roof issues never ticketed; tena… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
