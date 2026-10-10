# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped; he had reported a stiff lock on 22 Sept (R-4766, unactioned). I dispatched the on-call locksmith under the landlord's standing emergency approval, told tenant and landlord, and escalated P1 for human confirmation of attendance.

## Where the case stands
R-4766 at visit stage; Hackney Locks 24/7 assigned for tonight 21:30-23:30 (unconfirmed by provider). Waiting on the locksmith's attendance and report; human on-call to phone and confirm.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Hackney Locks 24/7 as emergency locksmith, window 21:30-23:30 tonight | Hackney Locks 24/7, contractor | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant locksmith is coming, no payment tonight, spare keys only in office hours, 999 if unsafe | Jonah Okafor, tenant | sms | A3 ✅ |
| 3 | OTHER | Informed landlord of emergency call-out and that the report decides cause/cost | Margaret Ellison, landlord | email | A4 ✅ |
| 4 | ESCALATE_TO_HUMAN | P1 handover to phone the locksmith and confirm attendance | internal maintenance | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, it's Mare and Co. We've sent an emergency locksmith (Hackney Locks 24/7) to 27 Bethnal Green Road; target arrival tonight between 9.30pm and 11.30pm. Please stay somewhere warm nearby and keep your phone on, they may call you. Don't pay anything tonight: the landlord's pre-approved emergency cover applies, and the locksmith's report will decide whether any cost is recharged. Your earlier stiff-lock report (R-4766) is linked to this job. Spare keys are only collectable in office hours (Mon-Fri 9-17.30, £50 refundable deposit), so the locksmith is the quickest route. If you feel unsafe, call 999. We'll update you by email tomorrow.

**A4 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight your tenant at 27 Bethnal Green Road was locked out after the key snapped in the front door lock (half still in it). He had reported the lock as stiff on 22 Sept (R-4766). As a vulnerable tenant outside at night, we've sent Hackney Locks 24/7 as an emergency under your standing instruction. Cause is unconfirmed; the locksmith's report will decide whether it's a lock fault (your cost) or tenant damage. We'll send you the report and cost once we have them.

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant locked out at night; locksmith dispatched, need confirmation of attendance
  - Known: Jonah Okafor (T-1002, vulnerable, anxiety) outside 27 Bethnal Green Road, key snapped, cold, 21:15 Sat. Stiff-lock ticket R-4766 open since 22 Sept, unactioned. Landlord pre-approves emergencies. Hackney Locks 24/7 assigned 21:30-23:30 (A1). Tenant and landlord messaged.
  - Missing: Locksmith has not confirmed attendance; no phone contact made with the locksmith by me; cause of break and recharge unknown; caller's DOB not verified on the call.
  - Options: Phone Hackney Locks to confirm ETA; If no attendance, use another out-of-hours locksmith; Arrange temporary accommodation if not resolved tonight
  - Recommendation: On-call person to phone Hackney Locks (+447700900314) now to confirm ETA and keep tenant updated; review recharge after the locksmith report.

## What this does not establish
- Assignment does not confirm the locksmith has accepted or will arrive
- Does not decide who pays; the locksmith's report decides the recharge
- Tenant identity (DOB) not verified on the call; no personal details disclosed

## Remaining work
- On-call human to confirm locksmith ETA tonight
- Obtain locksmith report and invoice, decide recharge, update landlord and tenant
- Fix underlying stiff lock under R-4766 if not replaced
- Tenant follow-up by email tomorrow

## Missing or unavailable information
- Locksmith's finding on cause (worn/faulty lock vs tenant damage)
- Locksmith confirmation of attendance

## Conflicts between sources
- Tenant said he reported the lock on the portal 'I think'; ticket R-4766 (22 Sept, stage init) confirms it. The tenant's belief that the master key is available conflicts with the policy, which allows it in office hours only.

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably not a simple lost-key lockout: a key snapped in a lock reported stiff for weeks (R-4766), which points to a lock fault, a landlord responsibility. Uncertain: whether wear or tenant misuse caused it. Policy says the locksmith's report decides the recharge.

**2. What options do you give the tenant tonight and who pays for each?**

1) Emergency locksmith tonight (dispatched): landlord covers the call-out under standing emergency approval, with any recharge to the tenant decided only after the report. 2) Spare key from office: only Mon-Fri 9-17.30 with a £50 refundable deposit, so not available tonight. The master key is not a tonight option and would not remove the snapped key anyway.

**3. What actions do you take?**

Assigned Hackney Locks 24/7 (A1), updated the ticket (A2), texted the tenant (A3), emailed the landlord (A4), and escalated P1 to confirm attendance (A5).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:30"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `update_ticket` | {"ref":"R-4766","note":"Escalated to emergency 10/10 21:15: key snapped in front door lock, tenant (vulnerable, anxiety) locked out at night… | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant locked out at night; locksmith dispatched, need confirmation of attendance… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
