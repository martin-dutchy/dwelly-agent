# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped in a lock he reported stiff on 22/09 (R-4766, never actioned). Treated as emergency and likely landlord-responsibility; assigned Hackney Locks 24/7, informed tenant and landlord, escalated P1 to confirm locksmith ETA.

## Where the case stands
R-4766 at visit stage, Hackney Locks 24/7 assigned (window 21:30-23:59 tonight), awaiting locksmith confirmation. Human on-call confirming ETA; follow-up 11/10 for report and invoice.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Hackney Locks 24/7 assigned and briefed for tonight's emergency call-out | Hackney Locks 24/7, contractor | phone_call | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the locksmith is requested, no exact time yet, next update tomorrow | Jonah Okafor, tenant | sms | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation for on-call to confirm locksmith ETA | internal, maintenance | internal | A6 ✅ |
| 4 | WAIT | Follow-up 11/10 for locksmith report, invoice and payer decision | Hackney Locks 24/7 | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Hackney Locks 24/7 (contractor) via phone_call, +447700900314** (verified)

> Emergency out-of-hours call-out, 27 Bethnal Green Road, London E1 6LA. Tenant Jonah Okafor (+447700900102) is locked out; key snapped in the front door lock with half still inside. Please attend tonight, extract the key, get him in and make the door secure. Tenant reported the lock stiff since 22/09. Please report in writing the cause (worn/faulty lock or tenant damage) as it decides who pays, and any replacement lock needed. Landlord pre-approves emergencies; please send the invoice to us.

**A4 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about tonight. We've logged this as an emergency and asked our out-of-hours locksmith, Hackney Locks 24/7, to come tonight to get you in and make the door secure. Our target is the same day, but I can't give you an exact arrival time yet; they may phone you on this number. We have your earlier report of the stiff lock (22 Sept) on file, and you shouldn't be asked to pay for a broken lock. The locksmith's report will confirm the cause. The office key safe is only open Mon-Fri, so it can't help tonight. If you feel unsafe or too cold, please go somewhere warm nearby; call 999 if in immediate danger. We'll update you by email tomorrow.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight (Sat 10 Oct) your tenant at 27 Bethnal Green Road was locked out when his key snapped in the front door lock. He had reported the lock as stiff on 22 Sept (ticket R-4766, not yet actioned). Under your standing instruction for emergencies we have sent Hackney Locks 24/7 to extract the key, get him in and secure the door. Cause is not yet confirmed; if the lock is faulty it is your responsibility, and a replacement lock may be needed. We'll send you the locksmith's report and cost, and will come back to you before any spend above your £250 limit that isn't make-safe.

## Escalation
- **P1 → maintenance** (verified): Tenant locked out at night (vulnerable, anxiety), out of hours; confirm locksmith attendance
  - Known: Jonah Okafor (T-1002, vulnerable) locked out at 27 Bethnal Green Rd since ~21:15 Sat 10/10; key snapped in lock. Stiff-lock ticket R-4766 open since 22/09 unactioned. Landlord Ellison pre-approves emergencies. Hackney Locks 24/7 assigned (window 21:30-23:59), tenant and landlord messaged.
  - Missing: Locksmith has not confirmed arrival (message sent, no reply yet). Cause of snap (worn lock vs tenant damage) unknown; decides recharge.
  - Options: Call Hackney Locks 24/7 on +447700900314 to confirm ETA; If no confirmation, find another out-of-hours locksmith; Arrange temporary warm accommodation if no fix tonight
  - Recommendation: On-call person confirms ETA with locksmith now; landlord bears cost unless report shows tenant damage.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not confirm they are attending or the time.
- Does not decide the cause or who finally pays; the locksmith's report does.
- No lock replacement approved beyond emergency make-safe.

## Remaining work
- On-call: confirm ETA with locksmith tonight
- Obtain locksmith report and invoice; decide recharge
- Landlord to approve any replacement lock above limit
- Original stiff-lock job cleared as part of this

## Missing or unavailable information
- Locksmith confirmation of arrival time
- Cause of key snap

## Conflicts between sources
- Tenant says reported on portal 'I think'; ticket R-4766 confirms it (22/09, unactioned).

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably a landlord-responsibility lock fault: the stiff lock was reported on 22/09 (R-4766) and the key then snapped, which is not a lost or misplaced key. Uncertain: the actual cause (worn lock vs. tenant damage or force). Per policy the locksmith's report decides the recharge. The tenant's portal report is confirmed by the ticket.

**2. What options do you give the tenant tonight and who pays for each?**

Main option: emergency out-of-hours locksmith (Hackney Locks 24/7) to extract the key, gain entry and secure the door; landlord pays, as she pre-approves emergencies and a faulty lock is hers, unless the report shows tenant damage. The master key from the office safe is not available (Mon-Fri 9-17.30, £50 refundable deposit) and would not remove the snapped key anyway. Tenant was told he should not be charged for a broken lock, with the cause to be confirmed. Safety advice given if too cold, and 999 if in danger.

**3. What actions do you take?**

Linked to and noted existing ticket R-4766 as an emergency (no duplicate), assigned Hackney Locks 24/7, messaged the locksmith, tenant (SMS) and landlord (email), escalated P1 to confirm the ETA, and scheduled a follow-up for 11/10.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4766","note":"10/10 21:15 inbound call: key snapped in front door lock, half stuck in lock, tenant locked out outside at night, co… | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"phone_call","contact":"+447700900314","ticket_ref":"R-4766",… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant locked out at night (vulnerable, anxiety), out of hours; confirm locksmith attendance… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4766","due_on":"2026-10-11","purpose":"Confirm tenant is in, obtain locksmith report/invoice, decide who pays, check lock r… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
