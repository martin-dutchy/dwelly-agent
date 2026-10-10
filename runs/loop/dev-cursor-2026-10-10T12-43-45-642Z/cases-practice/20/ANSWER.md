# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour reported water through her ceiling onto a light fitting from Flat 4; tenant away and unreachable. Opened emergency JOB-101, assigned Swift Plumbing for tonight, informed tenant and landlord, advised the neighbour on safety without disclosing tenant data or accepting liability, and escalated P1 for key holder entry.

## Where the case stands
Emergency JOB-101 at visit stage; Swift Plumbing assigned for tonight 20:00-23:00 (awaiting ETA confirmation); landlord, tenant (SMS) and neighbour informed; P1 escalation open for key holder release.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating for emergency make-safe tonight | Swift Plumbing & Heating, contractor | internal | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 handover to release key holder and oversee entry | internal maintenance | internal | A7 ✅ |
| 3 | REPLY_TO_TENANT | SMS tenant about emergency entry | Amelia Clarke, tenant | sms | A3 ✅ |
| 4 | WAIT | Follow up on make-safe result next day | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, it's Mare and Co. Water is leaking from your flat into the flat below. Because it's an emergency, a plumber will enter tonight with our out-of-hours key holder to turn off the water and stop the damage. We'll tell you what they find. If you can, please call us back or tell us if you left anything running. We'll update you tomorrow.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour (Flat 3) reports water coming through her kitchen ceiling onto a light fitting. Your tenant is away and not answering. We've opened JOB-101 and instructed Swift Plumbing & Heating (out-of-hours) to enter with our key holder as a genuine emergency and make safe (isolate water, find source). Make-safe is within your £300 limit; we'll call before anything above that. Any repair quote will come to you first. The neighbour is asking about liability for her ceiling; we have not accepted any responsibility - you may wish to notify your buildings insurer. We'll update you once the plumber reports.

**A5 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> EMERGENCY JOB-101, Flat 4, 12 Mare Street E8 1HL. Active leak into Flat 3 below, water on a light fitting. Tenant away, unreachable. Please attend tonight 20:00-23:00, meet our out-of-hours key holder for entry. Stopcock under kitchen sink. Isolate water, find source, make safe only. Send any repair quote to us before further work (landlord limit £300 inc VAT). Please confirm ETA by return.

**A8 · send_message → Olu Adeyemi (third_party) via phone_call, existing thread (inbound call 19:35 on 2026-10-10)** (verified)

> Thanks Olu. Please keep clear of the dripping water and don't touch that light. If you can safely reach your fuse box, switch off the kitchen lights/circuit; if water is near sockets or you feel unsafe, leave and call 999. Move belongings out of the way and take photos. We've treated this as an emergency: a plumber is being sent tonight and we've informed the owner of the flat above, so the water can be isolated. I can't share the tenant's details, but we've contacted her. I can't discuss or promise who pays for damage; the owner's buildings insurance is the usual route, and we've passed your report to the landlord. Please keep your photos and contact your own contents insurer too. We'll be in touch tomorrow.

## Escalation
- **P1 → maintenance** (verified): Active leak into flat below with water on electrics; entry without notice while tenant away; out-of-hours key holder needed
  - Known: Caller Olu Adeyemi, Flat 3, reports water through kitchen ceiling onto light fitting at 19:35 Sat 10 Oct. Tenant Amelia Clarke away 9-12 Oct, phone voicemail, SMS sent. JOB-101 opened, Swift Plumbing assigned 20:00-23:00, landlord emailed. Stopcock under kitchen sink. Spare keys in office key safe / OOH key holder.
  - Missing: Confirmation key holder is released and Swift's ETA; cause of leak; neighbour's identity not verified; liability/insurance claim.
  - Options: Key holder meets Swift and enters as genuine emergency, documenting entry; If Swift unavailable, call another OOH plumber / fire service if water on electrics worsens
  - Recommendation: Release keys to the key holder now, attend with Swift, record entry reason and what was done; do not admit liability, route neighbour's claim to landlord insurer; call landlord by phone.

## What this does not establish
- Assigning the plumber does not confirm cause, repair cost or who pays.
- No liability or compensation accepted or promised to the neighbour.
- Entry is justified only for make-safe, not for other inspection.

## Remaining work
- Human: release key holder and attend with Swift, document entry
- Confirm make-safe and cause; quote to landlord if above £300
- Update landlord, tenant and neighbour by 11 Oct
- Landlord to notify buildings insurer

## Missing or unavailable information
- Swift's ETA confirmation
- Cause of leak
- Neighbour's contact number/identity not verified

## Conflicts between sources
- None material; tenant calls go to voicemail but SMS delivered.

## Answers to the case questions
**1. Is this an emergency that justifies entering the upstairs flat without 24 hours' notice? What conditions apply?**

Yes: active flooding with water on electrics is a genuine emergency, so no 24h notice is needed. Conditions: entry only to make safe (isolate water, find source), via out-of-hours key holder with the contractor, tenant and landlord told straight away, entry reason and actions documented, no wider search or work beyond make-safe.

**2. What do you tell the caller (who is not your tenant)?**

Safety advice (stay clear of the light, switch off the circuit if safe, 999 if in danger), that a plumber is being sent and the flat owner informed. No tenant number or personal details, no admission of liability or written promise to pay; suggest photos, own contents insurer and that the landlord's buildings insurance is the usual route.

**3. What actions and notifications do you make, and what must you avoid saying?**

Created emergency ticket JOB-101, assigned Swift (out-of-hours), instructed them by SMS, texted tenant, emailed landlord (within £300 limit, insurer note), replied to neighbour, scheduled follow-up, P1 escalation. Avoid: tenant's number/away status, admitting fault or promising to cover the ceiling in writing, promising times or costs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 into Flat 3 below (kitchen ceiling, … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-23:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"JOB-101",… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-11","party":"Swift Plumbing & Heating","purpose":"Confirm make-safe done, cause found, update land… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into flat below with water on electrics; entry without notice while tenant away;… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |
| A8 | `send_message` | {"recipient_name":"Olu Adeyemi","recipient_role":"third_party","channel":"phone_call","contact":"existing thread (inbound call 19:35 on 2026… | 1 | ✅ verified | MSG-107 found in the send_message log |

## Failed or unverified actions
_None._
