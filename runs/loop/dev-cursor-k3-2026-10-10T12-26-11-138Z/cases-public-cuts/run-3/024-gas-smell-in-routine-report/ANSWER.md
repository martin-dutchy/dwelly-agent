# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

A routine oven-not-heating job: the tenant mentioned an occasional gassy smell, so I treated it as a gas emergency. I sent her gas safety advice, informed the landlord, noted the ticket and escalated P1 for an engineer.

## Where the case stands
Job at intake (init), no contractor assigned. Tenant's reply (event 006) reports oven still faulty and an occasional gassy smell; treated as a gas emergency. Safety advice sent, landlord informed, P1 escalated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent gas safety advice: leave, no switches/flames, call 0800 111 999, 999 if in danger; engineer being arranged | Imogen, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to book emergency Gas Safe engineer | internal maintenance | internal | A2 ✅ |
| 3 | OTHER | Informed landlord of the report and the safety steps | Landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because you've noticed a gassy smell, please treat it as urgent. Please don't use the oven or hob, and don't use any switches, lighters or flames. Open windows and doors, leave the flat, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels unwell or you're in immediate danger, call 999. Please don't go back in until the gas engineer says it's safe. We're arranging an engineer to look at the oven and the smell as a priority, and we'll be in touch again today. Please reply to let us know you're safe.

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Update on Flat 6, 56 Juniper Mews: the tenant says the oven still isn't cooking properly after trying the suggested settings, and has also reported an occasional gassy smell near it. We've told her to leave, avoid switches and flames and call the gas emergency line, and our team is arranging a Gas Safe engineer as a priority. We'll update you once we know more.

## Escalation
- **P1 → maintenance** (verified): Tenant reports intermittent gassy smell near gas oven, in a routine oven-repair job
  - Known: Tenant Imogen (event 006, 2026-08-05) says oven still not cooking after trying landlord's suggested settings, and there is sometimes a gassy smell near it (she called it not urgent). Job NBL-024 at init stage, no contractor assigned. Landlord agent suggestion (event 003) was settings only. Tenant has been sent gas safety advice (leave, no switches/flames, 0800 111 999).
  - Missing: Whether tenant has left and called the gas line; any spend limit/preferred gas contractor (none on property record); whether anyone is vulnerable.
  - Options: Book emergency gas engineer to attend and make safe, then diagnose oven; Confirm National Gas Emergency attendance first
  - Recommendation: Treat as emergency: book a Gas Safe engineer today for the smell and oven fault, inform landlord, and keep the oven isolated until cleared.
  - Deadline: Immediately

## What this does not establish
- Advice and escalation do not confirm a gas leak or the oven's cause
- No engineer is booked yet and no appointment has been promised
- No cost or responsibility decided

## Remaining work
- Human to book Gas Safe engineer today (maintenance, ESC-102)
- Confirm tenant is safe and has called the gas line
- Diagnose oven fault after the gas check
- Landlord approval/spend not yet sought for oven repair

## Missing or unavailable information
- Whether the tenant has left and called the gas line
- Oven manual attachment was unavailable and unseen
- No contractor or spend limit on property record

## Conflicts between sources
- Tenant describes the smell as 'not urgent'; policy treats any gas smell as an emergency, so I followed policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. The tenant says the suggested settings didn't help and reports a gassy smell. Outstanding: engineer attendance and make-safe, oven diagnosis, landlord approval for any repair.

**2. What is the next action, who is it for, and through which channel?**

Gas safety advice emailed to the tenant (done, MSG-101). The P1 escalation to the maintenance team to book an engineer is also done (ESC-102). The landlord was emailed (MSG-103).

**3. Does anything need a human decision, and why?**

Yes, P1: a possible gas leak needs an emergency engineer booked now. The tenant downplayed it, but policy treats a gas smell as an emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports intermittent gassy smell near gas oven, in a routine oven-repair job","known"… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Severity raised to emergency: tenant reports gassy smell near oven (event 006). Gas saf… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-024-gas-smel… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
