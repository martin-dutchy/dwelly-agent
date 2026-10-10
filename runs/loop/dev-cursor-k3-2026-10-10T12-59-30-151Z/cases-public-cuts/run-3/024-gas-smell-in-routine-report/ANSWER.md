# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant asked for an oven visit and mentioned a gassy smell as 'not urgent'. Treated as an emergency: opened JOB-101, sent gas safety advice, informed landlord and escalated P1.

## Where the case stands
Oven ticket at intake, no provider. Tenant's reply reveals a gas smell: new emergency job JOB-101 opened, tenant given gas safety advice, P1 escalated, landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to dispatch Gas Safe engineer and phone tenant | internal maintenance | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant to leave if smell present, avoid switches/flames, call 0800 111 999, not use oven | Imogen, tenant | email | A2 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Informed landlord of gas report and asked for contractor decision for oven repair | Landlord | portal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thank you for telling us. Please don't use the oven, and please treat the gas smell as urgent. If you can smell gas now, leave the flat, don't use light switches, naked flames or anything electrical, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). Call 999 if anyone is in immediate danger. Please don't go back in until you've been told it's safe. We are arranging a gas engineer as an emergency and have passed this to our team. The oven not heating properly is logged as part of the same visit. We will update you again today.

**A4 · request_landlord_approval → Landlord (landlord)** (verified)

> FYI and decision: tenant reports a gassy smell near the oven at Flat 6, 56 Juniper Mews. We are treating it as an emergency and arranging a Gas Safe engineer to make safe. Please confirm we may use our contractor for the oven repair afterwards.
> 
> Options: Our contractor attends (recommended); Landlord arranges own contractor

## Escalation
- **P1 → maintenance** (verified): Possible gas leak reported inside a routine oven repair ticket
  - Known: Tenant Imogen emailed 05/08 (event 006): oven still not cooking, since move-in, and 'a bit of a gassy smell near it sometimes'. Original oven ticket NBL-024 at init, no provider assigned, no contractor named in records. Agency had suggested settings (event 003). Tenant told to leave, avoid switches/flames, call 0800 111 999. Emergency gas ticket opened linked to NBL-024.
  - Missing: No Gas Safe contractor named in records; landlord contact not visible; whether smell is present now; gas safety record status.
  - Options: Dispatch Gas Safe engineer same day to check and make safe the cooker/supply; Phone tenant to confirm safety now
  - Recommendation: Dispatch a Gas Safe engineer immediately, phone the tenant, and inform the landlord. Oven repair to follow after gas is declared safe.
  - Deadline: Immediately

## What this does not establish
- No engineer is assigned or booked yet
- Does not establish a gas leak exists or the oven cause
- Oven repair not approved

## Remaining work
- Human to dispatch Gas Safe engineer same day (maintenance)
- Oven fault repair after gas cleared
- Landlord decision pending (APR-104)

## Missing or unavailable information
- No Gas Safe contractor named in records
- Whether smell is present now

## Conflicts between sources
- Tenant calls the smell 'not urgent' but gas smell is an emergency by policy; policy followed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven ticket at intake with no provider; tenant says suggested settings failed and reports a gas smell. Outstanding: gas emergency check by Gas Safe engineer, then oven repair and landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Safety advice emailed to tenant (done); P1 escalation to maintenance to dispatch a Gas Safe engineer; landlord informed via agency record.

**3. Does anything need a human decision, and why?**

Yes, P1: possible gas leak needs same-day engineer dispatch; no Gas Safe contractor is named in records and I cannot phone.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports a gassy sm… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported inside a routine oven repair ticket","known":"Tenant Imogen email… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"JOB-101","decision_needed":"FYI and decision: tenant reports a gassy smell near the oven at Flat 6, 56 … | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |

## Failed or unverified actions
_None._
