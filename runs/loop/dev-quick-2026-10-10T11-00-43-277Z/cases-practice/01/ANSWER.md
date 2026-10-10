# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

The rotten-egg smell from the boiler is a possible gas leak, so it is an emergency despite the tenant calling it "not urgent". I opened emergency job JOB-101, told the tenant to leave and call 0800 111 999, assigned HeatRight Ltd for an out-of-hours visit, notified the landlord, and escalated P1 as ESC-105 for a human to confirm attendance tonight.

## Where the case stands
Emergency gas job JOB-101 is at visit stage. HeatRight Ltd (C-11) is assigned for an out-of-hours visit but has not yet confirmed attendance or an arrival time. The tenant has been told to leave and call 0800 111 999. Escalated P1 as ESC-105.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant to leave the flat, avoid switches and flames, call 0800 111 999 and 999 if unwell. | Amelia Clarke, tenant | whatsapp | A2 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned HeatRight Ltd for an emergency out-of-hours gas visit and texted the job details; asked them to confirm arrival time. | HeatRight Ltd, contractor | sms | A3 ✅ |
| 3 | CHASE_LANDLORD | Told landlord about the emergency; make-safe does not need approval, but anything over £300 inc VAT does. | Ben Hartley, landlord | email | A4 ✅ |
| 4 | ESCALATE_TO_HUMAN | Maintenance to phone HeatRight tonight to confirm attendance, use Swift Plumbing & Heating (C-12) as backup, and check the tenant has left and called the gas line. | Maintenance team (ESC-105) | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten-egg smell from the boiler can mean a gas leak, so please treat this as an emergency, even though it's late.
> 
> Please do this now:
> 1. Open the windows and leave the flat, taking everyone with you, including your flatmate's mum.
> 2. Don't use any light switches, the cooker, flames, or electrical devices inside the flat.
> 3. Once you're outside, call the National Gas Emergency line on 0800 111 999. Do this even if the smell has gone.
> 4. Don't go back in until the gas engineer says it's safe.
> 
> If anyone feels unwell, dizzy or sick, call 999.
> 
> I'm arranging an emergency gas engineer now. We'll message you as soon as we have a confirmed visit time. Reply here if you have any questions.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Amelia Clarke at Flat 4, 12 Mare Street (P-201) reported at 22:40 tonight that the boiler gives off a rotten-egg smell when it fires up. We're treating it as a possible gas leak. We've told her to leave the flat and call 0800 111 999. We've asked HeatRight Ltd (your preferred boiler contractor) to attend as an emergency. Making the boiler safe is covered without your approval, so we are not waiting on you for that. Any repair or replacement above £300 inc VAT will need your approval before we instruct it. We'll update you on the outcome.
> 
> Mare & Co Lettings

**A5 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> EMERGENCY gas call, JOB-101. Flat 4, 12 Mare Street, London E8 1HL (P-201). Tenant Amelia Clarke reports a rotten-egg smell from the Worcester 30i combi boiler (fitted 2017) when it fires up. Tenant has been told to leave and call 0800 111 999. Please attend as soon as possible and confirm your arrival time to us. Occupants include an 82-year-old guest. Landlord Ben Hartley has been told. Spend over £300 inc VAT needs landlord approval first.

## Escalation
- **P1 → maintenance** (verified): Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Emergency make-safe dispatched to HeatRight Ltd, but no confirmation from contractor yet.
  - Known: WhatsApp 09/10/2026 22:40 from tenant Amelia Clarke (T-1001): boiler smells like rotten eggs when firing, she called it "not urgent". Occupants include an 82-year-old guest. Ticket JOB-101 (emergency gas) created. Tenant told to leave, not use switches or flames, call 0800 111 999 and 999 if unwell (MSG-102). HeatRight Ltd (C-11, Gas Safe 550123) assigned and texted (MSG-103 sent to landlord; contractor SMS sent). Landlord Ben Hartley emailed (MSG-103). Landlord spend limit £300 inc VAT.
  - Missing: Contractor acknowledgement and arrival time not yet received. Whether the tenant has left and reached 0800 111 999. Whether the guest is safe. Cause unconfirmed.
  - Options: Confirm HeatRight attends tonight and isolates the boiler if a leak is found; If HeatRight cannot attend, use Swift Plumbing & Heating (C-12, Gas Safe 551987) for an emergency visit; Phone Ben Hartley tonight if a repair or replacement above £300 is needed
  - Recommendation: Ring HeatRight out of hours to confirm attendance tonight. Use Swift as backup. Ring the tenant to check she has left the flat and has called the gas line.
  - Deadline: 2026-10-10 06:00

## What this does not establish
- Sending messages and booking HeatRight does not confirm a gas leak or its cause.
- No arrival time has been confirmed, so none has been promised to the tenant.
- The tenant's safety depends on her leaving the flat and calling the National Gas Emergency line; this has not yet been verified.

## Remaining work
- HeatRight to confirm attendance and make the boiler safe (owner: maintenance, ESC-105, deadline 2026-10-10 06:00).
- Check the tenant has left and reached the gas emergency line (owner: maintenance).
- Any repair or replacement over £300 inc VAT needs Ben Hartley's approval (owner: operations).
- Update the tenant once an arrival time is confirmed.
- Close the job only after a completed work result, invoice handling and landlord confirmation.

## Missing or unavailable information
- Contractor acknowledgement and arrival time.
- Whether the tenant has left the property and contacted 0800 111 999.
- Cause of the smell and whether a repair or replacement is needed.
- Landlord response on any spend over £300.

## Conflicts between sources
- The tenant calls it "not urgent", but the symptom is a possible gas leak. I went with the symptom.
- Ticket R-4801 (dripping tap, visit 2026-10-15) is unrelated and was not merged.

## Answers to the case questions
**1. 1. What severity is this and why, given the tenant says it is "not urgent"?**

Emergency. A rotten-egg smell from a gas boiler is the standard sign of a gas leak (mercaptan odourant). The tenant's "not urgent" wording does not lower the risk, and an 82-year-old guest is in the flat.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

First: leave the flat with everyone, open windows if safe, and avoid switches, cooker, flames and electrical devices. Second: once outside, call 0800 111 999 even if the smell has gone. Third: call 999 if anyone feels unwell. Fourth: do not return until the engineer says it is safe. Last: an engineer is being arranged and we will message when a visit time is confirmed. Sent as MSG-102 (ledger A2).

**3. 3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Created emergency gas job JOB-101 (A1). Assigned HeatRight Ltd (C-11, Gas Safe 550123) for an out-of-hours visit (A3) and texted them (A5). Emailed landlord Ben Hartley that make-safe does not need his approval but anything over £300 inc VAT does (A4). Escalated P1 as ESC-105 (A6) for a human to confirm attendance and check the tenant has left.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports boiler (Worcester 30i, fitted 2017) gives off a ro… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"P-201","body":"Hi A… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd (C-11, Gas Safe 550123, +447700900311)","visit_window":"2026-10-10 00:00-23:59 (emergenc… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"JOB-101","body":"EME… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Emergency … | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
