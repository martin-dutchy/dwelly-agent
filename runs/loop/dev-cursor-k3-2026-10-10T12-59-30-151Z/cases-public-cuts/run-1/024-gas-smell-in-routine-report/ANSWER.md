# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant said the settings advice didn't fix the oven and mentioned a gassy smell, calling it not urgent. We treated the smell as an emergency: sent safety advice with the gas line number, opened emergency job JOB-102, told the landlord, escalated P1, and returned the ticket to auto mode.

## Where the case stands
Oven ticket at intake, no provider assigned, no landlord decision. Tenant's reply revealed a gas smell, so emergency job JOB-102 was opened and escalated P1 (ESC-103). Oven repair paused behind the gas check.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emergency gas safety advice: leave, no switches or flames, call 0800 111 999, 999 if in danger | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to dispatch a Gas Safe engineer (no gas contractor is named in the record) | internal maintenance | internal | A3 ✅ |
| 3 | OTHER | Emergency gas job JOB-102 opened, linked to the oven ticket | internal | internal | A2 ✅ |
| 4 | OTHER | Landlord informed of the gas smell and emergency job | Landlord | email | A4 ✅ |
| 5 | WAIT | Follow-up to confirm tenant safe and engineer attended, then resume oven repair | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. A gassy smell should always be treated as urgent, so please do this now: don't use the oven, any switches, lighters or flames. Open windows and doors, and leave the flat. Call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If anyone feels unwell or you are in immediate danger, call 999. We are sending a Gas Safe engineer request and have alerted our team and your landlord. Please don't go back in until the gas engineer says it is safe. We will update you as soon as we have more details.

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, the tenant at Flat 6, 56 Juniper Mews says the oven still doesn't cook properly after trying the suggested settings, and also reports an occasional gassy smell near it. We are treating the smell as an emergency: she has been told to leave, avoid switches and flames, and call the National Gas Emergency line (0800 111 999). We have opened an emergency job and asked our team to arrange a Gas Safe engineer. The oven repair is on hold until the gas check is done. We'll update you once we know more.

## Escalation
- **P1 → maintenance** (verified): Gas smell reported near cooker inside a routine oven repair
  - Known: Tenant Imogen emailed 2026-08-05 (event 006): oven still not cooking properly since move-in, and "a bit of a gassy smell near it sometimes". She called it not urgent. Landlord's earlier suggestion of dial settings didn't help. No contractor assigned; no landlord decision. Tenant has been told to leave, avoid switches and flames, and call 0800 111 999. Emergency gas ticket opened linked to the oven ticket.
  - Missing: Whether the tenant has left and called the gas emergency line; the strength and frequency of the smell; Gas Safe contractor details (none named in the record); the date of the last gas safety record.
  - Options: Dispatch a Gas Safe engineer now to check the cooker and supply; Confirm with tenant that National Gas Emergency attended
  - Recommendation: Dispatch a Gas Safe engineer today, confirm with the tenant that they are out and have called 0800 111 999, and inform the landlord. Hold the oven repair until the gas check is done.
  - Deadline: Immediately

## What this does not establish
- The messages do not confirm a gas leak or its cause; the engineer must establish that.
- No engineer has been booked or attended yet.
- The oven fault and who pays are undecided; no landlord approval has been requested for the oven repair.
- The unseen manual attachment (event 003) was not relied on.

## Remaining work
- Maintenance team to dispatch a Gas Safe engineer (ESC-103)
- Confirm the tenant is out and has called the gas line
- Landlord approval and contractor for the oven repair after the gas check
- Tenant update on the follow-up date

## Missing or unavailable information
- Gas Safe contractor details
- Smell frequency and strength
- Whether the tenant has left the flat and called the gas line
- Landlord's decision on the oven repair

## Conflicts between sources
- Tenant described the smell as 'not urgent'; policy treats any gas smell as an emergency, so policy was followed.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

The oven ticket is at intake with no provider. The tenant says the settings advice failed and reports a gas smell. Outstanding: a Gas Safe check, then landlord approval and a contractor for the oven.

**2. 2. What is the next action, who is it for, and through which channel?**

Gas safety advice to the tenant by email (sent). P1 escalation to the maintenance team to dispatch a Gas Safe engineer. The landlord was told by email.

**3. 3. Does anything need a human decision, and why?**

Yes. A human must dispatch a Gas Safe engineer now, because the gas smell is an emergency and no gas contractor is named in the record. The oven repair itself is routine and waits.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports a… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell reported near cooker inside a routine oven repair","known":"Tenant Imogen emailed … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-102","body":… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Tenant reported gas smell (event 006); emergency job JOB-102 opened, escalated ESC-103.… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-102","due_on":"2026-08-05","purpose":"Confirm tenant safe, gas engineer attended, then resume oven repair","party":"Tenan… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
