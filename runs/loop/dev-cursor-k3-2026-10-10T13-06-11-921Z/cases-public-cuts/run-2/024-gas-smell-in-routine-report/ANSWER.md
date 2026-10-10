# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's reply to a routine oven job mentioned a gassy smell, so I treated it as an emergency. I gave her gas safety advice, opened JOB-102 and assigned an emergency Gas Safe engineer for today. I told the landlord and escalated P1. The oven fault itself stays open.

## Where the case stands
Oven job NBL-024 at intake, no provider. Tenant's reply (event 006) reveals a possible gas smell, so it is now an emergency. Emergency job JOB-102 opened with an engineer assigned for a same-day window and a P1 escalation raised. Oven fault parked until the gas check is done.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice: stop using the oven, leave, call 0800 111 999, with emergency engineer being arranged | Imogen, tenant | email | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign emergency Gas Safe engineer (no firm named) on JOB-102, same-day window | Gas Safe engineer | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation to name the engineer and phone the tenant | internal maintenance | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Please treat the gas smell as serious. Please don't use the oven or hob, and don't use any switches, flames or sockets near it. Open windows, leave the flat, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If you are ever in immediate danger, call 999. We are arranging an emergency gas engineer and the target is the same day. We will also look at the oven itself afterwards. We'll update you again today.

**A4 · send_message → Oliver (landlord) via email, agency landlord record** (verified)

> Hello, the tenant of Flat 6, 56 Juniper Mews says the oven still isn't cooking after trying the suggested settings, and also reports an intermittent gassy smell near it. We've told her to stop using it, leave the flat and call the National Gas Emergency line (0800 111 999), and we're arranging an emergency Gas Safe engineer today (JOB-102). The oven fault stays open (NBL-024) until the gas check is done; we'll update you after.

## Escalation
- **P1 → maintenance** (verified): Possible gas leak reported inside a routine oven job
  - Known: Tenant Imogen (event 006, 05/08) reports a gassy smell near the oven, and the oven has never cooked properly. Done: tenant given gas safety advice and 0800 111 999; emergency ticket JOB-102 opened; Gas Safe engineer assigned with same-day window (no firm named); landlord informed.
  - Missing: Named Gas Safe firm and confirmed arrival time; whether the tenant has left the flat; whether the smell is current. The oven manual attachment was never seen.
  - Options: Confirm a named emergency engineer and time; Phone the tenant to check she is safe
  - Recommendation: Source a named Gas Safe engineer now, and contact the tenant by phone to confirm she has left and called the gas line.
  - Deadline: Same day

## What this does not establish
- Assigning the engineer does not confirm a firm or arrival time
- Nothing here establishes a gas leak or the cause of the oven fault
- The oven repair has no landlord approval or provider yet

## Remaining work
- Human to name the engineer and confirm attendance (maintenance)
- Landlord decision on the oven repair after the gas check
- Update the tenant later today

## Missing or unavailable information
- Oven manual attachment unseen
- Named gas firm and time
- Whether the smell is current and whether the tenant has left

## Conflicts between sources
- The tenant calls the gas smell 'not urgent', but any gas smell is treated as an emergency under policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is at intake with no provider. A possible gas leak has been reported, so there is now an emergency job (JOB-102) with an engineer assigned. The gas check and the oven repair and its landlord approval are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Gas safety advice went to the tenant by email, and the emergency engineer is assigned. The landlord was told by email. The human team now names the firm and phones the tenant.

**3. Does anything need a human decision, and why?**

Yes, P1. A possible gas leak is a safety emergency, and a human is needed to source a named engineer and confirm the tenant is safe (ESC-104).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports intermitte… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-102","body":"H… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported inside a routine oven job","known":"Tenant Imogen (event 006, 05/… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
