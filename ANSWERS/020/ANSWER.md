# Kitchen socket maintenance request: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant reports a burning smell and warm kitchen socket with a child at home; nothing has been inspected, the handyman is unqualified and the landlord is silent. I treated it as an emergency, gave the tenant safety advice, requested an emergency electrician, told landlord and handyman, and escalated P1.

## Where the case stands
Ticket NBL-020 at visit stage with a generic emergency electrician requested for 17:00-21:00 (no firm named or confirmed). Tenant has safety advice. Landlord has not replied. Human to source a named electrician.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover to source and confirm a named emergency electrician tonight and phone the tenant | Maintenance team | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice (stop using socket, isolate circuit if safe, leave and call 999 if worse) and update by 18:00 | Nora Bell, tenant | email | A6 ✅ |
| 3 | OTHER | Told landlord it is an emergency, call-out proceeding, cost confirmation requested | Elliot Vane, landlord | email | A7 ✅ |
| 4 | WAIT | 18:00 check on electrician, tenant safety and landlord reply | internal | internal | A9 ✅ |

## Messages sent (verbatim)
**A6 · send_message → Nora Bell (tenant) via email, existing thread (event 025 portal)** (verified)

> Hi Nora, sorry you weren't given safety advice earlier. A warm socket with a burning smell can be a fire risk, so please: don't use that socket or anything plugged into it; if you can do so safely, switch off the kitchen circuit at the fuse box (the fridge may go off, which is safer than the risk); keep your son out of the kitchen. If you see smoke, sparks or scorch marks, or the smell gets stronger, leave at once with your son and call 999. We have requested an emergency qualified electrician for this evening (no firm confirmed yet, so no exact time) and will update you here by 18:00. Please reply to confirm you and your son are safe.

**A7 · send_message → Elliot Vane (landlord) via email, existing thread (event 024 email)** (verified)

> Elliot, this is now an emergency: the tenant, with her 10-year-old son, reports a persistent burning smell and warmth at the kitchen socket. Rowan Pike has told us he isn't equipped or qualified for fixed wiring and hasn't been able to inspect. We are requesting a qualified emergency electrician for tonight to make safe and have escalated internally; this doesn't wait for your approval. Please reply today to confirm you're content with the call-out cost. We'll report the outcome. Rowan need not attend.

**A8 · send_message → Rowan Pike (contractor) via email, existing thread (event 023 email)** (verified)

> Thanks Rowan. The tenant is now home and we are arranging a qualified electrician, so please don't attend or enter. Thanks for your help today.

## Escalation
- **P1 → maintenance** (verified): Possible overheating socket (burning smell, warmth) with a 10-year-old child present; no inspection yet; landlord silent; handyman not qualified
  - Known: Event 001/004/017/025: hot smell, warm socket, smell still present at 16:42; Nora and 10yo son at home; kettle unplugged; no breaker off. Event 011/015: Rowan Pike is a general handyman, no test equipment, no fixed wiring. Event 019/023: no entry, no inspection. Event 016/024: landlord has not approved an electrician; no reply. Event 009/025: no emergency guidance had been given before now.
  - Missing: Which electrician firm can attend tonight; whether the landlord will fund it; the circuit/consumer unit isolation status.
  - Options: Dispatch a named emergency electrician tonight and tell landlord afterwards; Advise tenant to leave and call 999 if smoke/sparks/worsening; Wait for landlord (not recommended)
  - Recommendation: Source and confirm a named emergency electrician tonight without waiting for the landlord; make-safe is within emergency policy. Phone tenant to confirm they have left or isolated the circuit.
  - Deadline: Immediately, 2025-04-12

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Nora Bell / Elliot Vane | Check electrician, tenant safety and landlord reply | 2025-04-12 | A9 ✅ verified |

## What this does not establish
- Assignment is a generic request, not a confirmed firm or arrival time
- Does not establish the cause or that the socket is safe
- Landlord has not approved cost
- Email used for tenant because the portal and WhatsApp were not available as tool channels; tenant preference is portal

## Remaining work
- Human to name and confirm the electrician tonight
- Confirm the tenant is safe and has isolated the circuit
- Landlord cost confirmation
- Electrical report and repair afterwards

## Missing or unavailable information
- Electrician firm
- Landlord reply
- Circuit isolation status

## Conflicts between sources
- Ticket ref NBL-020-01 in history vs NBL-020 in the system; used NBL-020
- Landlord wanted the handyman, who is not qualified for electrical work; safety prevails

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Unresolved emergency: burning smell and warm socket, child present, no inspection, landlord silent, handyman unqualified and did not enter. Outstanding: a qualified electrician and landlord cost confirmation.

**2. What is the next action, who is it for, and through which channel?**

Safety advice and emergency electrician update to Nora Bell by email (A6), landlord notified by email (A7), and a P1 escalation to maintenance (A2) to confirm a named electrician.

**3. Does anything need a human decision, and why?**

Yes, P1: someone must name and dispatch the electrician tonight and confirm the tenant is safe; the landlord's approval is not awaited because it is an emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"NBL-020-01","contractor":"Qualified electrician, emergency call-out (no firm named yet)","visit_window":"2025-04-12 17:00-21:… | 1 | ❌ failed | Ticket NBL-020-01 not found on read-back |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible overheating socket (burning smell, warmth) with a 10-year-old child present; no ins… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A3 | `update_ticket` | {"ref":"NBL-020-01","note":"Reclassified emergency: burning smell/warm socket, child present. Handyman unqualified; electrician required. La… | 1 | ❌ failed | Ticket NBL-020-01 not found on read-back |
| A4 | `assign_contractor` | {"ticket_ref":"NBL-020","contractor":"Qualified electrician, emergency call-out (no firm named yet)","visit_window":"2025-04-12 17:00-21:00"… | 1 | ✅ verified | Ticket NBL-020 read back at stage visit |
| A5 | `update_ticket` | {"ref":"NBL-020","note":"Reclassified emergency: burning smell/warm socket, child present. Handyman unqualified; electrician required. Landl… | 1 | ✅ verified | Ticket NBL-020 read back at stage visit |
| A6 | `send_message` | {"recipient_name":"Nora Bell","recipient_role":"tenant","channel":"email","contact":"existing thread (event 025 portal)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Elliot Vane","recipient_role":"landlord","channel":"email","contact":"existing thread (event 024 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A8 | `send_message` | {"recipient_name":"Rowan Pike","recipient_role":"contractor","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A9 | `schedule_follow_up` | {"ticket_ref":"NBL-020","due_on":"2025-04-12","purpose":"18:00 check: electrician firm confirmed, tenant safe, landlord reply","party":"Nora… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
- A1: Wrong ref NBL-020-01; retried on NBL-020 as A4
- A3: Wrong ref; retried on NBL-020 as A5
