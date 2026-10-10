# Case 03: Locked out: snapped key in the lock: ANSWER

**Decision:** escalated · **Severity:** emergency

Vulnerable tenant locked out at night after key snapped; an earlier stiff-lock ticket (R-4766) had been left at intake. I linked to it, assigned the out-of-hours locksmith as an emergency under the landlord's emergency approval, informed tenant, landlord and contractor, and escalated P1.

## Where the case stands
R-4766 at visit stage, Hackney Locks 24/7 assigned as emergency call-out; waiting on locksmith attendance and written cause report. P1 escalated to a human to confirm attendance tonight.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Hackney Locks 24/7 as emergency locksmith on R-4766 | Hackney Locks 24/7, contractor | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant locksmith is sent, no upfront payment, recharge depends on report, spare keys not available tonight | Jonah Okafor, tenant | sms | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to confirm locksmith attendance and fallback | internal maintenance | internal | A7 ✅ |
| 4 | WAIT | Follow up on locksmith report and invoice by 12 Oct | Hackney Locks 24/7 | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Hackney Locks 24/7 (contractor) via phone_call, +447700900314** (verified)

> Emergency out-of-hours call-out, 27 Bethnal Green Road, London E1 6LA. Tenant Jonah Okafor (+447700900102) is locked out, key snapped in the front door lock with half stuck in. Please attend ASAP tonight, extract the key, get him in and make the door secure. Lock was reported stiff since 22/09 (ref R-4766). Please report in writing the cause (worn/faulty lock vs key misuse) and the cost; the report decides who pays. Call-out is authorised as an emergency by the agency; please send the quote/invoice to us, not the tenant.

**A4 · send_message → Jonah Okafor (tenant) via sms, +447700900102** (verified)

> Hi Jonah, sorry about this. We've sent an emergency locksmith (Hackney Locks 24/7) to you now; they'll call or come as soon as they can tonight. You don't need to pay them upfront. Your lock was reported stiff on 22 Sept, so we'll treat it as a possible lock fault: the locksmith's report decides who pays, and if the lock was faulty it's the landlord's cost, not yours. Please don't pay anyone else. If you're too cold or feel unsafe, go somewhere warm nearby and tell us. Spare keys are only collectable Mon-Fri 9-17.30 (£50 refundable deposit), so can't help tonight. In immediate danger call 999.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, tonight (10 Oct) your tenant at 27 Bethnal Green Road was locked out when his key snapped in the front door lock. The lock had been reported stiff on 22 Sept (R-4766). As an emergency we've sent Hackney Locks 24/7 under your emergency-approval instruction. We've asked for a written report on the cause and cost; if it's a faulty lock, it's your cost, otherwise it may be recharged to the tenant. We'll send you the figures when we have them.

## Escalation
- **P1 → maintenance** (verified): Out-of-hours lockout, vulnerable tenant (anxiety) outside in the cold at night
  - Known: Jonah Okafor (T-1002), 27 Bethnal Green Road, key snapped in front door lock 21:15 Sat 10/10. Open ticket R-4766 (stiff lock, 22/09, never actioned). Landlord note: approve emergencies without asking. I assigned Hackney Locks 24/7 (A2), messaged contractor, tenant and landlord. Spare keys only collectable Mon-Fri.
  - Missing: Locksmith confirmation/ETA (none yet); cause of failure (wear vs misuse); recharge decision.
  - Options: Confirm Hackney Locks 24/7 is attending tonight and phone tenant with ETA; If locksmith unreachable, arrange alternative emergency locksmith or warm accommodation for tenant; After report, decide recharge (landlord if lock fault)
  - Recommendation: Phone the locksmith to confirm attendance now; treat as landlord cost unless report shows misuse, given the stiff-lock report of 22/09.
  - Deadline: Tonight

## What this does not establish
- Assignment does not confirm the locksmith has accepted or an ETA
- Does not decide who pays; the locksmith's report decides the recharge
- Tenant not yet told he is definitely not liable

## Remaining work
- Human: confirm locksmith attendance tonight, fallback if not
- Locksmith report, invoice, recharge decision, tell landlord and tenant outcome
- Close R-4766 once lock fixed and tenant confirms

## Missing or unavailable information
- Cause of key snap (wear vs misuse)
- Locksmith ETA/confirmation
- Whether the portal report was the R-4766 ticket (appears so)

## Conflicts between sources
- Caller said he reported the stiff lock 'on the portal I think'; confirmed by ticket R-4766 (22/09), which was left unassigned at intake.

## Answers to the case questions
**1. Is this a tenant-responsibility lockout or a landlord-responsibility lock fault? What is still uncertain?**

Probably a landlord-responsibility lock fault: the lock was reported stiff on 22/09 (R-4766, never actioned), which makes a worn lock the likely cause. Not a lost key. Uncertain: whether the snap was wear or misuse; per policy the locksmith's report decides the recharge.

**2. What options do you give the tenant tonight and who pays for each?**

1) Emergency locksmith Hackney Locks 24/7, already sent, no upfront payment; the agency authorised it as an emergency, and the cost is landlord's if lock fault, tenant's only if the report shows misuse. 2) Spare key from office: not available tonight (Mon-Fri 9-17.30, £50 refundable deposit) and wouldn't help with a snapped key stuck in the lock. Told him to go somewhere warm if needed, and 999 if in danger.

**3. What actions do you take?**

Updated R-4766 note, assigned Hackney Locks 24/7, messaged contractor, tenant and landlord, scheduled follow-up for 12/10, escalated P1 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4766","note":"10/10 21:15 out-of-hours call: key snapped in front door lock, tenant (vulnerable, anxiety) locked out outside in th… | 1 | ✅ verified | Ticket R-4766 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 emergency call-out, ASAP"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Hackney Locks 24/7","recipient_role":"contractor","channel":"phone_call","contact":"+447700900314","ticket_ref":"R-4766",… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4766","due_on":"2026-10-12","purpose":"Obtain locksmith report and invoice, decide recharge, confirm lock replaced/working … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Out-of-hours lockout, vulnerable tenant (anxiety) outside in the cold at night","known":"Jon… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
