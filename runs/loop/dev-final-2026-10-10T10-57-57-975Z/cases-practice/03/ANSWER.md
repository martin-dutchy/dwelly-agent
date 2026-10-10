# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** action_taken · **Severity:** emergency

Tenant is locked out at night after his key snapped in the front door lock. He is vulnerable, and he had already reported the lock as stiff on 22 Sept (R-4766). I dispatched the out-of-hours locksmith on the existing ticket under the landlord's emergency approval. I told the tenant and landlord, and the locksmith's report will decide the recharge.

## Where the case stands
R-4766 at visit stage; Hackney Locks 24/7 assigned, target window 21:30-23:30 tonight. Waiting on locksmith report for cause, cost and recharge. Tenant and landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Dispatched Hackney Locks 24/7 as emergency lockout, existing ticket R-4766 reused | Hackney Locks 24/7, contractor | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant of locksmith, who pays, spare key option, safety advice | Jonah Okafor, tenant | sms | A3 ✅ |
| 3 | OTHER | Informed landlord by email of emergency spend and earlier stiff-lock report | Margaret Ellison, landlord | email | A4 ✅ |
| 4 | WAIT | Follow up 11 Oct for locksmith report and recharge decision | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, it's Mare and Co. We've sent Hackney Locks 24/7 to 27 Bethnal Green Road tonight (target window 9.30-11.30pm; they'll call you). Your stiff-lock report from 22 Sept (R-4766) is on file, and the locksmith's report will decide who pays, so please don't pay them tonight: the call-out is booked through us. If it turns out the lock was faulty, you won't be charged; if it was just a lost/broken key, it may be recharged. Spare keys are at our office Mon-Fri 9-17.30 (£50 refundable deposit), but that can't help tonight. If you're unsafe or too cold, call 999 or tell us and we'll help find somewhere warm.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight the tenant at 27 Bethnal Green Road snapped his key in the front door lock and is locked out. He had reported the lock as stiff on 22 Sept (R-4766, not yet actioned). Under your emergency approval instruction we've sent Hackney Locks 24/7 out of hours. Their report will decide whether the cost is yours (faulty lock) or recharged to the tenant (key misuse). We'll update you with the report and cost; a replacement lock may be needed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Dispatch does not decide who pays; the locksmith report does.
- SMS sent to the tenant does not confirm the locksmith has arrived or that he is back in.
- No payment promise or recharge decision has been made.

## Remaining work
- Obtain locksmith report and invoice; decide recharge (landlord if lock fault, tenant if key misuse); owner: maintenance team.
- Confirm the tenant is back in, and that the lock is replaced if faulty.
- Original portal report R-4766 had sat untouched since 22 Sept.

## Missing or unavailable information
- Cause of the snapped key (worn lock vs misuse), pending locksmith report.
- Locksmith's actual arrival time and cost.
- Tenant's identity was not verified by DOB on the call; he is matched to ticket R-4766 and no account details were disclosed.

## Conflicts between sources
- Tenant believes he reported the lock on the portal; ticket R-4766 confirms it (22 Sept, still at init stage).

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Unclear, but it likely leans towards a landlord lock fault. The lock was reported stiff on 22 Sept and never actioned, and a snapped key is consistent with a worn or stiff lock. Still unknown is whether the cause was a worn lock or misuse. Under policy the locksmith's report decides the recharge.

**2. What options do you give the tenant tonight and who pays for each?**

Option 1: the out-of-hours locksmith, booked by us. The landlord covers the cost if the lock was faulty; the tenant is only charged if the locksmith finds key misuse. Option 2: the spare key from the office, which is Mon-Fri 9-17.30 with a £50 refundable deposit. It isn't available tonight, and wouldn't help anyway because half the key is stuck in the lock. He was told not to pay the locksmith himself. He was also told to call 999 if unsafe.

**3. What actions do you take?**

I assigned Hackney Locks 24/7 to R-4766 for a 21:30-23:30 window and noted the ticket as an emergency lockout. I texted the tenant, emailed the landlord, and set a follow-up for 11 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:30"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `update_ticket` | {"ref":"R-4766","note":"Escalated to emergency lockout 10 Oct 21:15: key snapped in front door lock, half stuck in lock, tenant (vulnerable,… | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"R-4766","due_on":"2026-10-11","party":"Hackney Locks 24/7","purpose":"Confirm attendance, obtain locksmith report on cause an… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
