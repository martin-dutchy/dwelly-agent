# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant's reply to a routine oven report mentioned a gassy smell, which I treated as an emergency. I opened JOB-101, assigned a Gas Safe engineer slot, gave the tenant gas safety advice, told the landlord and escalated P1. The oven repair awaits landlord approval.

## Where the case stands
Oven job at landlord-approval stage, on hold to 2026-08-07. Tenant's reply revealed a gas smell, so emergency job JOB-101 is open with a generic Gas Safe engineer assigned for 2026-08-05 and escalated P1.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice (leave, no switches/flames, 0800 111 999, 999), don't use oven, emergency engineer target within 24h | Imogen, tenant | email | A3 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to name and dispatch a Gas Safe engineer | internal maintenance | internal | A5 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor for the oven repair | Landlord | email | A6 ✅ |
| 4 | WAIT | Oven ticket on hold until 2026-08-07 for landlord decision | Landlord | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because of the gassy smell, please treat this as urgent for safety. If you smell gas now: leave the flat, don't use light switches, naked flames or the oven, open doors/windows if you can on the way out, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). In immediate danger, call 999. Please don't use the oven until it has been checked. We've opened an emergency job for a Gas Safe engineer to attend; our target is within 24 hours. No firm is named yet, so we'll confirm the time as soon as we have it. The oven not heating is being looked at too. You'll hear from us again today.

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, the tenant of Flat 6, 56 Juniper Mews says the oven still isn't cooking properly after trying the suggested settings, and also reports an occasional gassy smell near it. We've treated the smell as an emergency: we've told her to leave and call 0800 111 999 if she smells gas, not to use the oven, and have raised an emergency job for a Gas Safe engineer to attend within 24 hours. The oven repair itself (NBL-024) remains pending; please tell us whether we may use our contractor for it.

**A6 · request_landlord_approval → Landlord (landlord)** (verified)

> Oven not heating (tenant says settings tried, no change): may we send our contractor to inspect/repair, or will you arrange your own?
> 
> Options: Use our contractor (recommended); Landlord arranges own contractor

## Escalation
- **P1 → maintenance** (verified): Possible gas leak reported by tenant near oven
  - Known: Event 006: tenant Imogen reports occasional gassy smell near oven, oven not cooking since move-in. Emergency job JOB-101 opened, generic Gas Safe engineer assigned for 2026-08-05 (no firm named). Tenant given gas safety advice and 0800 111 999; landlord informed. Event 003 landlord-side advice to adjust dial was sent before this.
  - Missing: Named Gas Safe firm and confirmed arrival time; whether the smell is present now; tenant's access times.
  - Options: Dispatch a named Gas Safe engineer now; Phone tenant to confirm safety
  - Recommendation: Dispatch a named Gas Safe engineer today and phone the tenant to check she is out of the flat if smell persists.
  - Deadline: Same day

## What this does not establish
- Assigning a generic engineer does not confirm a firm or an arrival time
- Nothing establishes the cause of the smell or the oven fault
- Oven repair spend not approved

## Remaining work
- Maintenance: name and dispatch Gas Safe engineer today (ESC-104)
- Landlord decision on oven repair by 2026-08-07
- Confirm visit time with tenant
- Gas safety record copy to tenant if issued

## Missing or unavailable information
- Landlord decision
- Named gas engineer and time
- Oven manual attachment unseen

## Conflicts between sources
- Tenant says 'not urgent' about the gas smell; treated as an emergency per safety policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven job is at intake with landlord approval requested and on hold to 2026-08-07. Emergency gas job JOB-101 is assigned (generic engineer, 5 Aug window) and needs a named firm and confirmed time.

**2. What is the next action, who is it for, and through which channel?**

Safety advice by email to the tenant (done), P1 escalation internally to dispatch a named Gas Safe engineer, and an approval request to the landlord by email for the oven repair.

**3. Does anything need a human decision, and why?**

Yes: P1 for the possible gas leak, to name and dispatch the engineer and check the tenant is safe. The oven repair needs the landlord's decision, not a human at the agency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports a gassy sm… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"JOB-101",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-101","body":… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported by tenant near oven","known":"Event 006: tenant Imogen reports oc… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-024-gas-smell-in-routine-report","decision_needed":"Oven not heating (tenant says settings tried, n… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on oven repair; ga… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold |

## Failed or unverified actions
_None._
