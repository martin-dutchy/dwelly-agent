# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Downstairs neighbour reported water through her ceiling onto a light fitting. I raised an emergency job, assigned the out-of-hours plumber, gave the caller safety advice, and refused to give her the tenant's number or accept liability. I told the tenant and landlord, and escalated P1 for the key holder and entry.

## Where the case stands
Emergency ticket JOB-101 at visit stage; Swift assigned for a 20:00-22:00 window tonight. Tenant unreachable; landlord emailed; P1 escalation raised. Waiting on the plumber's attendance and make-safe result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating for emergency make-safe tonight | Swift Plumbing & Heating, contractor | portal | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation so the out-of-hours key holder meets the plumber and entry is logged | internal | internal | A6 ✅ |
| 3 | REPLY_TO_TENANT | SMS to tenant about the leak and emergency entry | Amelia Clarke, tenant | sms | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Olu Adeyemi (third_party) via phone_call, existing thread (inbound call 19:35 today)** (verified)

> Thank you for calling, Mr/Ms Adeyemi. Safety first: do not touch the light fitting or any switches in that area. If you can do it safely, switch off the power to your kitchen at the fuse box, and move belongings and people away from the dripping area. If water is near sparking or you feel in danger, call 999. We are sending an emergency plumber to Flat 4 now to stop the water at source. I can't share the tenant's details, but we are trying to reach her and will pass on your message. For your ceiling, please contact your own contents/buildings insurer and take photos; I can't promise cover or accept liability on the phone, and a member of our team will follow up on your claim in writing on the next working day.

**A4 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, urgent: water is leaking from your flat into the flat below. We are sending an emergency plumber and will enter using our key to stop the water, as this is an emergency. If you can, call us now or tell us if you left anything on/running. We'll update you once it's made safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour (Flat 3) reports water coming through her kitchen ceiling at 19:35 tonight. Tenant is away and unreachable. We have instructed Swift Plumbing & Heating to attend tonight, enter with our key under emergency and isolate the water/make safe. Any repair beyond make-safe will come to you for approval (your limit is £300). The neighbour has asked about damage cover; we've accepted no liability and suggested she contact her insurer. You may wish to notify your buildings insurer. We'll update you after the visit.

## Escalation
- **P1 → maintenance** (verified): Active leak into Flat 3; entry to tenanted Flat 4 without notice, tenant away and unreachable
  - Known: Call 19:35 from Olu Adeyemi (Flat 3): water through kitchen ceiling onto light fitting. Flat 4 tenant Amelia Clarke away 9-12 Oct (portal note); phone voicemail, SMS sent. Stopcock under kitchen sink. Key in office safe/OOH key holder. Ticket JOB-101; Swift Plumbing (OOH) assigned 20:00-22:00. Landlord emailed. Caller asked for liability in writing and tenant's number; both refused.
  - Missing: Confirmation that Swift has accepted and attended; OOH key holder to meet plumber; cause of leak; whether tenant left something running; liability/insurance question from Flat 3.
  - Options: Key holder meets Swift, entry as genuine emergency, isolate water, record entry and photos; Call landlord by phone if costs may exceed £300; Handle Flat 3's liability claim in writing next working day
  - Recommendation: Proceed with emergency entry and make-safe now; keep to make-safe, log entry; no liability admission; landlord to notify insurer.

## What this does not establish
- Assigning the plumber does not confirm the cause or who pays
- No liability or cover was accepted for Flat 3's ceiling
- Entry is limited to make-safe; it is not a right to enter for other reasons
- The window is not confirmed attendance by Swift

## Remaining work
- Out-of-hours key holder/human to confirm Swift attends and enters, and to record the entry
- Written follow-up to Flat 3 on the next working day, with no admission of liability
- Landlord approval for any repair over make-safe
- Tenant update once the water is isolated

## Missing or unavailable information
- Cause of leak
- Whether Swift has accepted the job
- Tenant's response

## Conflicts between sources
- The caller assumes the agency is at fault; the record shows only that the agency manages Flat 4, and cause and liability are unknown.

## Answers to the case questions
**1. Is this an emergency that justifies entering the upstairs flat without 24 hours' notice? What conditions apply?**

Yes. It is an active leak with water on electrics, and the tenant is away and unreachable (voicemail, SMS sent). Entry is justified only to isolate the water at the stopcock under the kitchen sink and make safe. It should be done by the plumber with the out-of-hours key holder, kept to the minimum, and logged with photos. The tenant and landlord are told straight away. The key gives no wider right of entry.

**2. What do you tell the caller (who is not your tenant)?**

Safety advice: keep away from the light fitting, switch off the kitchen circuit if safe, and call 999 if in danger. A plumber is being sent. I cannot share the tenant's number but will pass on her message. No liability is accepted on the call. She should contact her insurer and photograph the damage, and we will follow up in writing on the next working day.

**3. What actions and notifications do you make, and what must you avoid saying?**

I created emergency ticket JOB-101, assigned Swift Plumbing, messaged the caller, texted the tenant, emailed the landlord and raised a P1 escalation. Avoid giving the tenant's phone number or any personal data, admitting fault or promising to cover the ceiling or put it in writing, and promising dates or costs. Avoid claiming the leak is fixed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 reported by downstairs neighbour (Fl… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Olu Adeyemi","recipient_role":"third_party","channel":"phone_call","contact":"existing thread (inbound call 19:35 today)"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","body":"Hi Amelia, urgent: water is le… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, eme… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3; entry to tenanted Flat 4 without notice, tenant away and unreachabl… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
