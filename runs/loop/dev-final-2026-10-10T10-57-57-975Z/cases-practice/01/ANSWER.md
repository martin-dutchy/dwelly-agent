# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant reported a rotten-egg smell from the gas boiler and called it 'not urgent'. I treated it as a gas emergency. I sent evacuation and 0800 111 999 advice first, opened emergency job JOB-102, assigned HeatRight Ltd, told the landlord, and raised a P1 escalation.

## Where the case stands
Emergency job JOB-102 at stage visit, HeatRight Ltd assigned for tonight. ESC-103 (P1) with maintenance. Waiting on the tenant to confirm she is outside and on HeatRight's attendance. Landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to confirm HeatRight attendance tonight and phone the tenant if she doesn't reply | internal maintenance | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant to turn off the boiler if safe, leave with everyone, ventilate, and call 0800 111 999 (999 if unwell) | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 3 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for emergency out-of-hours attendance | HeatRight Ltd, contractor | portal | A3 ✅ |
| 4 | OTHER | Informed landlord Ben of the emergency and that make-safe work is going ahead | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can be a gas leak, so please treat it as urgent tonight. Please: 1) Turn the boiler off if you can do so safely, and don't use any switches, flames or sockets near it. 2) Open windows and doors, and get everyone out of the flat, including your flatmate's mum. 3) Once outside, call the National Gas Emergency line on 0800 111 999 (free, 24 hours). If anyone feels dizzy, sick or has a headache, call 999. Please don't go back in until the gas engineer says it's safe. We're sending a Gas Safe engineer and our team is being alerted now. Please message back once you're outside and safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight at 22:40 your tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We are treating it as a suspected gas leak. She has been told to leave the flat and call the National Gas Emergency line. We have booked HeatRight Ltd for emergency out-of-hours attendance (job JOB-102). Make-safe work goes ahead without waiting for approval. We will call you before any spend over your £300 limit. We will update you tomorrow.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak (rotten-egg smell from boiler) at Flat 4, 12 Mare Street, out of hours
  - Known: Tenant Amelia Clarke (WhatsApp 22:40) reports eggy smell when the boiler fires, described as 'not urgent'. An 82-year-old guest is in the flat. CO alarm in kitchen fitted 2022. Tenant told to leave, ventilate, and call 0800 111 999. JOB-102 created as an emergency; HeatRight Ltd (Gas Safe 550123, out-of-hours) assigned. Landlord Ben Hartley, spend limit £300.
  - Missing: Whether the tenant has left and called the gas line; HeatRight's confirmation of attendance and ETA; whether the cost will exceed £300.
  - Options: Phone HeatRight on +447700900311 to confirm attendance tonight; Fall back to Swift Plumbing & Heating +447700900312; Phone the tenant on +447700900101 if no reply
  - Recommendation: Phone HeatRight now to confirm attendance, and ring the tenant if she doesn't reply. Make-safe work is an emergency and doesn't need approval. Call Ben before any spend over £300.
  - Deadline: Tonight

## What this does not establish
- Assigning HeatRight does not confirm they have accepted or will attend tonight.
- The cause of the smell is unconfirmed, and so is who pays.
- No spend is approved above the £300 limit.
- The existing dripping tap job R-4801 is untouched.

## Remaining work
- Maintenance: confirm HeatRight attendance and phone the tenant if she hasn't replied (ESC-103)
- Gas Safe engineer to make safe and report; record the result
- Call Ben before any spend over £300
- Arrange the gas safety record and copy to tenant if applicable

## Missing or unavailable information
- No confirmation that the tenant has left the flat or called the gas line
- No contractor ETA or acceptance
- The tenant has not said whether the gas supply has been isolated

## Conflicts between sources
- The tenant says 'not urgent' and asks for a visit tomorrow, but the symptoms indicate a gas emergency. I went with the symptoms.
- The tenant asked for a late visit because of the elderly guest. Safety overrides that.

## Answers to the case questions
**1. 1. What severity is this and why, given the tenant says it is 'not urgent'?**

Emergency. A rotten-egg smell from a gas boiler is a suspected gas leak, whatever the tenant calls it. An 82-year-old guest is also in the flat. Policy treats a gas smell as an emergency.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

First, turn the boiler off if safe and don't use switches or flames. Second, open windows and get everyone out. Third, call 0800 111 999 from outside, or 999 if anyone is unwell. Then don't go back in until an engineer says it's safe, and message us once she is safe. The message also says an engineer is being sent.

**3. 3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Sent the safety message (A1). Created emergency job JOB-102 (A2). Assigned HeatRight Ltd, the landlord's preferred Gas Safe contractor with out-of-hours cover (A3). Raised a P1 escalation, ESC-103 (A4). Emailed the landlord Ben (A5).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg smell from Worcester … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-02:00 emergency out-of-hours attendance"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak (rotten-egg smell from boiler) at Flat 4, 12 Mare Street, out of hours","… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
