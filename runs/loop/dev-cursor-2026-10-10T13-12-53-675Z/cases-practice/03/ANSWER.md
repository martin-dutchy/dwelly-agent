# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped in a lock he reported stiff on 22 Sep. I opened emergency job JOB-101, assigned the out-of-hours locksmith, informed tenant and landlord, and escalated P1 for attendance confirmation.

## Where the case stands
Emergency JOB-101 at visit stage, Hackney Locks 24/7 assigned for tonight 21:30-23:30 (not yet confirmed by contractor). P1 escalated to confirm attendance. Landlord informed; cause report and recharge outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Hackney Locks 24/7 for emergency tonight window | Hackney Locks 24/7, contractor | sms | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 handover to phone the locksmith and tenant to confirm attendance | internal | internal | A7 ✅ |
| 3 | REPLY_TO_TENANT | Told tenant locksmith is booked, no charge tonight, spare keys only Mon-Fri | Jonah Okafor, tenant | sms | A4 ✅ |
| 4 | WAIT | Follow up 11 Oct on attendance, report, invoice | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about tonight. We've booked Hackney Locks 24/7 (emergency locksmith) to come tonight, target window 9:30-11:30pm; they'll confirm with you directly. We know you reported the stiff lock on 22 Sep, so we are treating this as a lock fault: you won't be asked to pay tonight, and the locksmith's report on the cause settles any charge afterwards. Spare keys are only collectable Mon-Fri 9-17.30 (£50 refundable deposit), so the locksmith is the way in tonight. If you're too cold, please go somewhere warm nearby; if you feel unsafe call 999. We'll update you by email tomorrow.

**A5 · send_message → Hackney Locks 24/7 (contractor) via sms, +447700900314** (verified)

> Emergency call-out, Mare and Co: 27 Bethnal Green Road, London E1 6LA. Tenant Jonah Okafor (+447700900102) locked out, key snapped in front door lock, half in barrel. Please attend tonight 21:30-23:30, extract key, get tenant in, leave door secure. Lock reported stiff since 22 Sep. Please send a written report on cause (worn/faulty lock vs misuse) and a quote for any replacement before fitting beyond making safe. Landlord approves emergency make-safe.

**A6 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, your tenant at 27 Bethnal Green Road is locked out tonight (key snapped in the front door lock). The lock had been reported stiff on 22 Sep. Under your standing emergency instruction we've sent Hackney Locks 24/7 to get him in and make the door secure. Their report on the cause will decide whether any cost is recharged; a replacement lock beyond make-safe will come to you for approval if over £250. We'll update you once the report is in.

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant locked out at night; confirm locksmith attends
  - Known: Jonah Okafor (T-1002, anxiety disclosed) locked out 21:15 Sat, key snapped in front door. Stiff-lock ticket R-4766 open since 22 Sep unactioned. Emergency JOB-101 opened, Hackney Locks 24/7 assigned 21:30-23:30. Tenant, landlord messaged by SMS/email. Landlord pre-approves emergencies.
  - Missing: Contractor has not confirmed attendance (I can't phone from this run). Cause of failure and recharge unknown until locksmith report.
  - Options: Phone Hackney Locks 24/7 to confirm ETA; If no confirmation by ~22:15, use another emergency locksmith; Offer tenant emergency accommodation if door cannot be secured
  - Recommendation: Phone contractor and tenant now to confirm attendance; treat as landlord-side fault unless the report shows misuse.
  - Deadline: Tonight 22:15

## What this does not establish
- Assigning the locksmith does not decide who ultimately pays; the locksmith report decides recharge.
- Contractor attendance is not confirmed.
- Landlord has been informed, not asked for approval, since emergency make-safe is pre-approved.

## Remaining work
- Human to confirm locksmith attendance tonight (P1)
- Obtain cause report and invoice; decide recharge; replacement lock quote to landlord if over £250
- Existing R-4766 to be linked/closed once lock fixed
- Email tenant update tomorrow (prefers email)

## Missing or unavailable information
- Cause of key snap (worn lock vs misuse)
- Whether tenant's portal report was the R-4766 ticket (appears so)
- Contractor confirmation of ETA

## Conflicts between sources
- Tenant says he reported on the portal 'I think': tickets confirm R-4766 (22 Sep), so treated as true.
- Policy extract says out-of-hours locksmith at tenant's cost for lost keys, but this is a lock fault, so landlord-side pending report.

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Likely landlord-responsibility: it is not lost keys, and the lock was reported stiff on 22 Sep (R-4766) and never actioned. Uncertain: whether the snap was wear or misuse; per policy the locksmith's report decides recharge.

**2. What options do you give the tenant tonight and who pays for each?**

Option 1: emergency locksmith tonight, arranged by us under the landlord's standing emergency approval, no charge to tenant tonight; any recharge decided after the report. Option 2: spare/master key from office Mon-Fri 9-17.30 with £50 refundable deposit, not available tonight and not suitable as half the key is stuck in the lock. Also advised to go somewhere warm if needed, 999 if unsafe.

**3. What actions do you take?**

Created emergency JOB-101 linked to R-4766, assigned Hackney Locks 24/7, messaged tenant, contractor and landlord, noted R-4766, escalated P1, scheduled follow-up 11 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-202","tenant":"T-1002","category":"locks","severity":"emergency","description":"Tenant locked out at night (Sat 10 Oct 21:15)… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:30"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `update_ticket` | {"ref":"R-4766","note":"Tenant reported this lock stiff on 22 Sep; never progressed. Lock has now failed (key snapped) - see emergency JOB-1… | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"JOB-101","body":"Hi Jonah… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"sms","contact":"+447700900314","ticket_ref":"JOB-101","body"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant locked out at night; confirm locksmith attends","known":"Jonah Okafor (T-1… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-11","purpose":"Check locksmith attended, get cause report and invoice, decide recharge, update ten… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
