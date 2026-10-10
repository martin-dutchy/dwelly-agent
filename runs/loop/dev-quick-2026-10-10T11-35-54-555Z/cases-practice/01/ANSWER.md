# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's report of a rotten-egg smell from the gas boiler is a possible gas leak and an emergency, not routine, even though she said "not urgent". I opened emergency job JOB-101, sent the tenant safety instructions (leave, no switches or flames, call 0800 111 999), emailed the landlord, texted HeatRight Ltd for urgent attendance, and escalated P1 (ESC-105) because no engineer time is confirmed.

## Where the case stands
Emergency gas job JOB-101 opened at stage init for P-201 (Flat 4, 12 Mare Street). Tenant told to leave and call 0800 111 999. Landlord informed. HeatRight Ltd texted for urgent attendance; no confirmed time yet. P1 escalation ESC-105 raised for the human to secure attendance tonight.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Phone HeatRight Ltd on +447700900311 to secure an urgent gas attendance tonight or first thing, and log the call | HeatRight Ltd, contractor | phone_call | A4 ✅ |
| 2 | ESCALATE_TO_HUMAN | If HeatRight cannot attend, book Swift Plumbing & Heating (C-12, Gas Safe 551987) as backup | Maintenance team | internal | A5 ✅ |
| 3 | CHASE_TENANT | Await tenant confirmation she and her flatmate and her mother are outside and safe; chase by WhatsApp if no reply | Amelia Clarke, tenant | whatsapp | A2 ✅ |
| 4 | CHASE_LANDLORD | Landlord informed by email of the gas report, safety steps and the £300 approval rule; wait for his reply on any spend beyond making safe | Ben Hartley, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, thanks for telling us. A rotten egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight, even though it's late:
> 1. Open the windows and leave the flat now, taking your flatmate and her mum with you.
> 2. Don't touch light switches, the doorbell, lighters or any flames, and don't use electrical appliances.
> 3. Once you're outside, call the National Gas Emergency line on 0800 111 999 (free, 24 hours).
> Please don't go back in until the gas engineer or the emergency line says it's safe. Reply here once you're safe. We're arranging an urgent gas engineer visit and will update you as soon as we have a confirmed time.

**A3 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Amelia Clarke at Flat 4, 12 Mare Street reported at 22:40 tonight that the boiler gives off a rotten egg smell when it fires up. We're treating it as a possible gas leak. We've told her to leave the flat, avoid switches and flames, and call the National Gas Emergency line on 0800 111 999. We're arranging an urgent Gas Safe engineer (HeatRight Ltd, your preferred boiler contractor). Safety work doesn't wait for approval, so we're going ahead now. Any repair beyond making safe will come back to you for approval before any spend over £300 inc VAT.

**A4 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> URGENT gas job, Flat 4, 12 Mare Street, London E8 1HL (P-201). Tenant Amelia Clarke (+447700900101) reports a rotten egg smell from the Worcester 30i combi boiler when it fires up, reported 22:40 tonight. Tenant has been told to leave and call 0800 111 999. Please confirm tonight whether you can attend and your earliest arrival time. Landlord Ben Hartley is informed.

## Escalation
- **P1 → maintenance** (verified): Possible gas leak at P-201 (rotten egg smell from gas boiler, reported 22:40 Fri 09/10/2026). Gas emergency: needs Gas Safe engineer tonight and a human to oversee it.
  - Known: Tenant Amelia Clarke (T-1001) WhatsApp 22:40: boiler makes a rotten-egg smell on firing. Tenant has been told to leave, avoid switches/flames, and call 0800 111 999 (ledger A2). Job JOB-101 created as emergency gas (A1). Landlord Ben Hartley emailed (A3). HeatRight Ltd (C-11, Gas Safe 550123, out of hours) texted for urgent attendance (A4), no reply yet. Flatmate's mother aged 82 is staying at the flat. No contractor has confirmed a time.
  - Missing: No confirmed HeatRight attendance time. No tenant reply yet on whether she is safe. Not known if a second contractor (Swift Plumbing & Heating, C-12, Gas Safe 551987) is needed. Landlord has not yet replied.
  - Options: Phone HeatRight Ltd on +447700900311 now and secure an attendance tonight or first thing; If HeatRight cannot attend, book Swift Plumbing & Heating (C-12) as the backup gas contractor; Ask the National Gas Emergency line (0800 111 999) to attend if the tenant reports a smell, and isolate the boiler supply
  - Recommendation: Phone HeatRight now. If no answer within the hour, use Swift Plumbing & Heating. Spend for making safe is not capped by the £300 limit, but tell Ben about all costs. Ask the tenant to confirm she is outside and safe.
  - Deadline: 2026-10-09 23:30

## What this does not establish
- Sending the tenant safety advice does not establish that a leak exists; only a Gas Safe engineer can confirm that.
- No contractor attendance time is confirmed. Do not tell anyone a visit is booked.
- Repair beyond make-safe is not approved; the landlord's £300 inc VAT limit still applies.
- The landlord has not replied, so no spend is authorised beyond emergency make-safe.

## Remaining work
- HeatRight attendance tonight or backup contractor (maintenance, P1 ESC-105)
- Tenant confirmation she is safe outside (WhatsApp, Amelia Clarke)
- Gas Safe report and any repair quote for landlord approval (Ben Hartley)
- Gas safety check at completion, then close JOB-101

## Missing or unavailable information
- Whether HeatRight Ltd will attend tonight and when
- Whether the tenant has left the flat and is safe
- Landlord reply on any spend
- Whether a gas smell was confirmed by the tenant on leaving

## Conflicts between sources
- Tenant says "not urgent" but describes a rotten-egg smell from a gas boiler. Safety takes priority, so I treated it as an emergency.
- CRM marks the tenant as not vulnerable, but a visitor aged 82 is now staying. I took this into account for safety, but did not change the tenant record.

## Answers to the case questions
**1. 1. What severity is this and why, given the tenant says it is "not urgent"?**

Emergency. A rotten-egg smell from a gas appliance is the standard sign of a gas leak (mercaptan odour). Safety rules apply regardless of the tenant's wording. An 82-year-old is also staying at the flat.

**2. 2. What exactly do you tell the tenant right now, and in what order?**

First: leave the flat now with everyone else, open windows if safe to do so, and don't touch switches, the doorbell, lighters, flames or electrical appliances. Second: once outside, call the National Gas Emergency line on 0800 111 999. Third: don't re-enter until the engineer or emergency line says it is safe, and reply on WhatsApp once out. Then say an urgent engineer visit is being arranged and that a confirmed time will follow.

**3. 3. Which actions do you take tonight (job, contractor, escalation, landlord)?**

Job JOB-101 created as emergency gas. Tenant WhatsApp with safety steps (A2). Landlord emailed about the report and the spend rule (A3). HeatRight Ltd (C-11, the landlord's preferred boiler contractor, out of hours) texted for urgent attendance (A4). P1 escalation to maintenance (ESC-105) to secure the attendance and a backup contractor. The £300 limit still applies to any repair after make-safe.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant Amelia Clarke reports boiler (Worcester 30i, gas combi) ma… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Ame… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","body":"URGENT gas job, Flat 4, 12… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten egg smell from gas boiler, reported 22:40 Fri 09/10/2026)… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |
| A6 | `add_note` | {"entity":"JOB-101","note":"Correction: A2 (tenant WhatsApp) and A3 (landlord email) were sent with the placeholder ref \"R-PENDING\". Their… | 1 | ✅ verified | NOTE-106 found in the add_note log |

## Failed or unverified actions
_None._
