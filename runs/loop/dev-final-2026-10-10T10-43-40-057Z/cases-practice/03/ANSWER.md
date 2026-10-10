# Case 03: ANSWER

**Outcome:** action_taken · **Severity:** urgent

Tenant locked out after key snapped in front door lock; an open ticket from 22 Sep reports the lock stiff, so a lock fault is likely. I linked to the existing ticket R-4766 (no duplicate), dispatched Hackney Locks 24/7 out of hours, and told the tenant, locksmith and landlord. Recharge is deferred to the locksmith's report.

## Answers
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably a landlord-responsibility lock fault: the lock was reported stiff on 22 Sep (R-4766, never actioned), and a snapped key is consistent with a worn lock. It is not a lost-key case. Uncertain: whether wear or tenant misuse snapped the key, and whether the tenant's 'portal report' is the same as R-4766 (it appears to be). Per policy the locksmith's report decides the recharge. Caller's DOB was not verified on the call; he gave name and address only, and the number called matches the CRM record.

**2. What options do you give the tenant tonight and who pays for each?**

Option 1 (recommended): emergency locksmith Hackney Locks 24/7 tonight; no charge to the tenant tonight, landlord covers it if the report shows a lock fault, tenant recharged only if the report shows misuse or damage. Option 2: the spare key from the office key safe, Mon-Fri 9-17.30 only, £50 refundable deposit, so not available tonight; the master key route is for lost keys. Option 3: stay with friends or family meanwhile; 999 if unsafe. The landlord approves emergencies without asking, so the call-out sits within her authority; anything over £250 needs checking with her first.

**3. What actions do you take?**

Assigned Hackney Locks 24/7 to R-4766 (stage now visit) and added a note; messaged the contractor, tenant (SMS, with email follow-up planned per his preference) and landlord (email, as she is overseas). No duplicate ticket created. No escalation needed: recharge is decided later by the locksmith's report.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 (emergency out-of-hours attendance, target w… | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `update_ticket` | {"ref":"R-4766","note":"10 Oct 21:15 out-of-hours call: key snapped in front door lock, half stuck in barrel; tenant locked out. Ticket from… | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"sms","contact":"+447700900314","body":"Mare and Co emergency… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","body":"Hi Jonah, Mare and Co here. We'… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
