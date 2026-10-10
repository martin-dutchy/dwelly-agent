# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped; he had reported a stiff lock on 22 Sept (R-4766, unactioned). Treated as emergency: assigned Hackney Locks 24/7 under landlord's standing emergency approval, informed tenant and landlord, escalated P1 to confirm attendance.

## Where the case stands
R-4766 at visit stage; Hackney Locks 24/7 assigned for tonight's emergency callout (arrival unconfirmed). Waiting on the locksmith's attendance and report; P1 escalation open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assign Hackney Locks 24/7 to R-4766 as an emergency make-safe callout tonight | Hackney Locks 24/7, contractor | internal | A1 ✅ |
| 2 | CHASE_PROVIDER | SMS the locksmith with job details, evidence request and ask for ETA | Hackney Locks 24/7, contractor | sms | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant a locksmith is being sent, no charge expected for now, don't pay anyone, spare keys not available out of hours | Jonah Okafor, tenant | sms | A4 ✅ |
| 4 | OTHER | Inform landlord by email of lockout and emergency callout | Margaret Ellison, landlord | email | A5 ✅ |
| 5 | ESCALATE_TO_HUMAN | P1 escalation to confirm locksmith ETA and handle the recharge decision | internal maintenance | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Hackney Locks 24/7 (contractor) via sms, +447700900314** (verified)

> Emergency out-of-hours callout, ref R-4766: 27 Bethnal Green Road, London E1 6LA. Tenant Jonah Okafor (+447700900102) is locked out, key snapped in front door lock. Please attend tonight, gain entry and make the door secure. Tenant reported the lock stiff since 22/09, so please photograph the lock and keep the broken key part, and state in your report whether this is lock failure or key damage. Please confirm your arrival time to us and the tenant. Landlord pre-approves emergency make-safe; please quote before any replacement beyond that.

**A4 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about tonight. We've logged this as an emergency and sent the job to Hackney Locks 24/7 (our out-of-hours locksmith) to get you in and make the door secure. Target is tonight; we'll ask them to confirm an arrival time with you. Yes, I can see your 22 Sept report of the stiff lock. Because of that, we're treating this as a lock fault for now, so you shouldn't be charged for tonight. The locksmith's report will confirm the cause. Please don't pay anyone yourself. Spare keys are only collectable from the office Mon-Fri, so a locksmith is the quickest route tonight. If you're too cold, please go somewhere warm nearby while you wait. Call 999 if you're ever in danger.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight your tenant at 27 Bethnal Green Road was locked out when the key snapped in the front door lock. He had reported the lock as stiff on 22 Sept (R-4766, not yet actioned). Under your standing emergency approval we have sent Hackney Locks 24/7 to get him in and make the door secure. The locksmith's report will decide cause and any recharge; if the lock needs replacing we'll send you the quote if over your £250 limit. Regards, Mare and Co

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant locked out at night (snapped key); out of hours
  - Known: Jonah Okafor (T-1002, vulnerable, anxiety, prefers email) locked out outside 27 Bethnal Green Road at 21:15 Sat 10/10, cold. Key snapped in lock. Open ticket R-4766 (22/09) reported stiff lock, never actioned. Landlord note: approve emergencies without asking. Hackney Locks 24/7 assigned (A1) and SMSed; tenant and landlord informed.
  - Missing: Locksmith has not confirmed arrival. Cause (worn lock vs key damage) unknown until locksmith report; recharge undecided.
  - Options: Confirm locksmith attendance tonight by phone; If no response, try another out-of-hours locksmith; Decide recharge after report
  - Recommendation: Phone Hackney Locks to confirm ETA; no tenant charge unless report shows tenant damage; handle 3-week delay on R-4766.
  - Deadline: Tonight

## What this does not establish
- Assigning the locksmith does not confirm an arrival time or that he will attend
- Does not decide who finally pays; the locksmith's report decides the recharge
- Telling the tenant no charge expected is provisional, not a final waiver
- No quote approved; any lock replacement needs a quote

## Remaining work
- Maintenance team: confirm locksmith ETA tonight, fall back to another locksmith if needed
- Locksmith report on cause, then decide recharge
- Quote to landlord if replacement exceeds £250
- Review why R-4766 sat at intake since 22/09
- Follow up on the tenant's lock after entry

## Missing or unavailable information
- Cause of lock failure (worn lock vs damaged key)
- Locksmith ETA and cost
- Tenant's portal report: only R-4766 found, matches stiff lock

## Conflicts between sources
- Tenant is unsure he reported on the portal; the record shows R-4766 (22/09) for a stiff lock, which I trusted.
- Tenant prefers email (vulnerability note) but was reached by SMS because he is locked out and may only have his phone.

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably a landlord-responsibility lock fault: the lock was reported stiff on 22/09 (R-4766) and never actioned, and the key snapped in it. It is not a lost-key case. Uncertain: whether the key was already damaged or the lock failed; the locksmith's report decides the recharge per policy.

**2. What options do you give the tenant tonight and who pays for each?**

Option 1 (used): emergency locksmith Hackney Locks 24/7 tonight; provisionally agency/landlord pays as an emergency make-safe, with no tenant charge unless the report shows tenant damage. Option 2: master key from the office Mon-Fri 9-17.30 with £50 refundable deposit, not available tonight and unsuitable since the key is snapped in the lock. Tenant told not to pay anyone himself.

**3. What actions do you take?**

Assigned the locksmith to R-4766, noted the ticket, SMSed the locksmith, messaged the tenant and landlord, and escalated P1 for ETA confirmation. No duplicate ticket created.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `update_ticket` | {"ref":"R-4766","note":"Escalated to emergency 10/10 21:15: key snapped in front door, tenant (vulnerable, anxiety) locked out at night. Pri… | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"sms","contact":"+447700900314","ticket_ref":"R-4766","body":… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant locked out at night (snapped key); out of hours","known":"Jonah Okafor (T-… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
