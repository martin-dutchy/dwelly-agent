# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour in Flat 3 reported water dripping onto a light fitting from Flat 4, whose tenant is away. I opened an emergency job, assigned Swift Plumbing out-of-hours, gave the caller safety advice, refused to share the tenant's number or accept liability, told the tenant and landlord, and escalated P1.

## Where the case stands
Emergency job JOB-101 at visit stage; Swift assigned 20:00-22:00 tonight; P1 escalated; landlord and tenant notified; awaiting attendance and landlord reply.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating for emergency make-safe tonight | Swift Plumbing & Heating, contractor | portal | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 handover to confirm attendance, key release and call landlord | internal | internal | A6 ✅ |
| 3 | REPLY_TO_TENANT | SMS to Amelia Clarke about the leak and emergency entry | Amelia Clarke, tenant | sms | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Olu Adeyemi (third_party) via phone_call, existing thread (inbound call 19:35 today)** (verified)

> Mr Adeyemi, thank you for calling. Safety first: if you can do so safely, switch off the power to your kitchen at the fuse box/consumer unit, and do not touch the light fitting or anything wet near it. Keep clear of the dripping area and move valuables away; put a bucket underneath. If water reaches sockets or you see sparks or smell burning, leave and call 999. We have opened an emergency job and are sending an emergency plumber to Flat 4 to find the source and stop the water. We can't share the tenant's details, but we are trying to contact her and the landlord now. On your ceiling: we can't accept liability or promise payment on this call. Please take photos, keep receipts, and contact your own home insurer; we will pass your details and claim to the landlord, whose buildings insurance may respond. We will update you if we need anything further.

**A4 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, urgent: water is coming through the ceiling of the flat below from your flat. We are sending an emergency plumber tonight to get in, find the leak and turn the water off. If you can, please turn off your stopcock (under the kitchen sink) if someone is there, and call us back. We'll update you.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour (Flat 3) reports water coming through her kitchen ceiling onto a light fitting. Your tenant is away until 12 Oct and not answering. We have instructed Swift Plumbing & Heating to attend tonight, enter using our key if needed (genuine emergency), isolate the water and make safe. We'll tell you the findings and any quote; anything over £300 inc VAT we'll call you first. The neighbour is asking who pays for her ceiling; we have admitted no liability and suggested she contact her insurer. Please notify your buildings insurer. Please call us if you can.

## Escalation
- **P1 → maintenance** (verified): Active leak near electrics, tenant away, entry without notice to make safe; liability claim from neighbour
  - Known: Flat 3 neighbour Olu Adeyemi reports water dripping onto light fitting (call 19:35 10 Oct). Flat 4 tenant Amelia Clarke away 9-12 Oct, phone to voicemail, SMS delivered. Stopcock under kitchen sink; keys in office safe/out-of-hours key holder. Swift Plumbing (out-of-hours) assigned 20:00-22:00 on JOB-101. Landlord Ben emailed. Neighbour demanded written liability and tenant's number: refused.
  - Missing: Confirmation Swift attends and key holder availability; landlord reply; leak source/cost; whether neighbour's electrics are safe.
  - Options: Key holder meets plumber, entry to make safe; Call landlord by phone; Refer liability claim to landlord/insurer
  - Recommendation: Confirm plumber attendance and key release now; try landlord by phone; liability handled by landlord/insurer, no admissions.

## What this does not establish
- Assignment does not confirm the contractor has attended or the cause
- No liability admitted or promised to the neighbour
- Entry is only to make safe, not for other work

## Remaining work
- Human/ops: confirm Swift attends and key holder gives access; entry limited to stopping the leak
- Ops: reach landlord by phone; he should notify insurer; quotes over £300 need his call first
- Ops: update tenant and Mr Adeyemi after make-safe; log entry and leave a note for the tenant

## Missing or unavailable information
- Leak source and cost
- Whether tenant or landlord has replied
- Contractor confirmation of attendance

## Conflicts between sources
- Caller says it is the agency's fault; the source in Flat 4 is unconfirmed, and no liability has been established.

## Answers to the case questions
**1. Is this an emergency that justifies entering without 24 hours' notice? What conditions apply?**

Yes. Active flooding near electrics with the tenant away and unreachable (voicemail, SMS sent). Entry is limited to finding and stopping the leak and making safe, using the office or out-of-hours key with the plumber. Keep a record of the entry and tell the tenant and landlord. Nothing beyond make-safe without the normal notice.

**2. What do you tell the caller (who is not your tenant)?**

Safety advice (isolate kitchen power at the consumer unit, don't touch the fitting, 999 if sparks), that an emergency plumber is being sent, and that we cannot share the tenant's details but are contacting her. We admit no liability, so no written promise to pay. She should photograph the damage, keep receipts and contact her insurer, and we will pass her claim to the landlord.

**3. What actions and notifications do you make, and what must you avoid saying?**

Created emergency JOB-101, assigned Swift, messaged the caller, SMS'd the tenant, emailed the landlord and escalated P1. Avoid admitting fault or liability, giving the tenant's number or any personal data, and promising payment or timings not confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak: water coming through kitchen ceiling of Flat 3 … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Olu Adeyemi","recipient_role":"third_party","channel":"phone_call","contact":"existing thread (inbound call 19:35 today)"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak near electrics, tenant away, entry without notice to make safe; liability claim … | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
