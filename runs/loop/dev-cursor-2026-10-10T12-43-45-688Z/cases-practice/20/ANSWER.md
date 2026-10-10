# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour reported active leak onto a light fitting in Flat 3 from Flat 4; tenant away and unreachable. Opened emergency JOB-101, assigned Swift out-of-hours, notified tenant and landlord, gave the caller safety advice without disclosing tenant details or admitting liability, and escalated P1 for key-holder entry.

## Where the case stands
Emergency ticket JOB-101 at visit stage; Swift assigned 20:00-22:00; tenant unreachable (SMS sent); landlord emailed; P1 escalation ESC-104 for key-holder dispatch. Attendance not yet confirmed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover: dispatch key holder, confirm Swift attendance, make safe | internal maintenance | internal | A5 ✅ |
| 2 | ASSIGN_PROVIDER | Assign Swift Plumbing & Heating out-of-hours 20:00-22:00 | Swift Plumbing & Heating | portal | A2 ✅ |
| 3 | REPLY_TO_TENANT | SMS tenant about emergency entry | Amelia Clarke, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, it's Mare and Co. Water is leaking from your flat into the flat below. As it's an emergency we need to enter tonight, without the usual 24h notice, to turn the water off at the stopcock and make safe. A plumber and our key holder will attend. Please call us as soon as you can. We'll update you tonight.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour (Flat 3) reports water coming through her kitchen ceiling onto a light fitting. Your tenant is away and not answering. We are sending Swift Plumbing & Heating out of hours with our key holder to isolate the water and make safe (entry without notice is justified in an emergency). Make-safe is expected within your £300 limit; we'll call before anything above that. The neighbour is asking who pays for her ceiling; we have given no admission of liability and suggest you notify your buildings insurer. We'll update you after the visit.

**A6 · send_message → Olu Adeyemi (third_party) via phone_call, existing thread (inbound call 2026-10-10 19:35)** (verified)

> Mr/Ms Adeyemi, thank you for calling. Please keep clear of the dripping water and the light fitting, and if you can do so safely switch off the power to your kitchen at the fuse box. If you see sparking, burning smells or the ceiling sagging, leave and call 999. We are treating this as an emergency and have arranged for a plumber and our key holder to get into the flat above tonight to turn the water off. We can't share the tenant's contact details, but we've contacted her and the owner. Questions about who pays for damage can't be answered tonight; please photograph the damage and contact your own contents insurer, and the owner's insurer can be approached through the owner. We'll not be giving any decision on liability by phone.

## Escalation
- **P1 → maintenance** (verified): Active leak into Flat 3 onto electrics, tenant away and unreachable; need key holder entry tonight and contractor confirmation
  - Known: Call 19:35 from Olu Adeyemi, Flat 3. Tenant Amelia Clarke away 9-12 Oct, phone to voicemail, SMS delivered. Stopcock under kitchen sink. Keys: office key safe / OOH key holder. Swift Plumbing (C-12, OOH) assigned 20:00-22:00 on JOB-101. Landlord emailed. Landlord limit £300.
  - Missing: Contractor attendance confirmation; whether tenant has someone in the flat; actual cause and cost.
  - Options: Key holder meets Swift, enter under emergency, isolate water; Phone landlord for more spend if above £300
  - Recommendation: Dispatch key holder now, phone Swift to confirm attendance, enter only to make safe, document entry, call Ben if over £300. Compensation/liability question for Flat 3 is for landlord/insurer, not us.

## What this does not establish
- Assigning does not confirm Swift has attended or the leak is stopped
- No liability, compensation or insurance position was stated
- Entry is only to make safe, not a general right of access

## Remaining work
- Human/key holder to enter and isolate water, document entry
- Update landlord and tenant after visit
- Landlord to approve spend above £300 if needed
- Landlord/insurer to handle Flat 3 damage claim

## Missing or unavailable information
- Swift confirmation of attendance
- Cause and cost of leak

## Conflicts between sources
- Tenant is away 9-12 Oct per CRM note, so no one is expected to answer upstairs; tenant phone goes to voicemail though SMS delivered.

## Answers to the case questions
**1. Is this an emergency that justifies entering without 24 hours' notice? What conditions apply?**

Yes: active flooding onto electrics, tenant away and unreachable. Entry is limited to isolating water (stopcock under kitchen sink) and making safe, via key holder/contractor, documented, tenant informed immediately, and further work needs normal notice and landlord approval (limit £300).

**2. What do you tell the caller?**

Keep clear of the water and light, switch off kitchen power at the fuse box if safe, 999 if sparking/smoke/sagging ceiling; help is being arranged tonight; no tenant number shared (data protection); no liability admission or written promise; photograph damage, contact her insurer, owner's insurer via landlord.

**3. What actions and notifications, and what must you avoid saying?**

Created JOB-101, assigned Swift, SMS to tenant, email to landlord, reply to caller, P1 escalation. Avoid: giving tenant's phone/details, admitting fault or promising to pay, promising arrival times or costs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 into Flat 3 below (kitchen ceiling, … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 onto electrics, tenant away and unreachable; need key holder entry t… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A6 | `send_message` | {"recipient_name":"Olu Adeyemi","recipient_role":"third_party","channel":"phone_call","contact":"existing thread (inbound call 2026-10-10 19… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
- A1: API timed out but read-back confirmed ticket JOB-101 exists; not retried to avoid duplicate.
