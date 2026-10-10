# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Downstairs neighbour reported water through her ceiling onto a light fitting. Treated as an emergency flood: ticket JOB-101 opened, Swift Plumbing assigned for tonight, tenant (away) texted, landlord emailed, call logged, P1 escalation raised.

## Where the case stands
JOB-101 at visit stage; Swift Plumbing assigned 20:00-22:00 tonight for emergency make-safe with OOH key holder; landlord and tenant notified; P1 escalation ESC-105 raised for attendance oversight.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assign Swift Plumbing & Heating (out-of-hours) to isolate water and make safe tonight | Swift Plumbing & Heating, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | SMS tenant about leak and emergency entry | Amelia Clarke, tenant | sms | A3 ✅ |
| 3 | OTHER | Inform landlord, ask him to notify buildings insurer | Ben Hartley, landlord | email | A4 ✅ |
| 4 | ESCALATE_TO_HUMAN | P1 handover to confirm key holder and plumber attendance | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, this is Mare and Co. Water is leaking from your flat into the flat below. We can't reach you, so because it's an emergency we are sending a plumber with our out-of-hours key holder tonight to turn the water off and make it safe. Please call us as soon as you can. If you know of anything we should know (e.g. a washing machine or tap left running), tell us.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour (Flat 3) reports water coming through her kitchen ceiling at 19:35 tonight. Your tenant is away and not answering. We have arranged emergency entry with our out-of-hours key holder and Swift Plumbing & Heating to isolate the water and make safe (within your £300 limit; we will call before anything above). The neighbour is asking about damage to her ceiling; we have made no admission of liability. Please notify your buildings insurer (Hartley Homes block policy). We'll update you after the visit.

## Escalation
- **P1 → maintenance** (verified): Active leak into Flat 3 with electrics at risk; emergency entry to Flat 4 without notice while tenant away and unreachable
  - Known: Caller Olu Adeyemi (Flat 3) 19:35 Sat 10 Oct. Tenant Amelia Clarke away 9-12 Oct, phone voicemail, SMS delivered. Stopcock under kitchen sink. Spare keys: office key safe / OOH key holder. JOB-101 created, Swift Plumbing assigned 20:00-22:00. Landlord Ben Hartley emailed.
  - Missing: Cause of leak; whether key holder/plumber confirmed attendance; extent of damage; tenant contact; caller's claim for ceiling (liability unestablished).
  - Options: Key holder meets Swift Plumbing tonight, isolate water, document entry with photos, leave written notice for tenant; If neither can attend, escalate to on-call manager to authorise alternative
  - Recommendation: Proceed with option 1 now; confirm attendance by phone with key holder and Swift, and update landlord and tenant after the visit. Handle the neighbour's damage claim via landlord's insurer, no admission.

## What this does not establish
- Emergency entry is only to stop water and make safe, not a general inspection
- Nothing here establishes cause or liability for Flat 3's ceiling
- Visit window is a target; attendance not yet confirmed
- Neighbour was not given tenant details

## Remaining work
- Key holder and Swift confirm attendance; record work result (maintenance)
- Update landlord and tenant after visit; leave written note of entry
- Tenant to be reached on return; dried-out/repair follow-up
- Neighbour's damage claim goes to landlord's insurer; no written promise given

## Missing or unavailable information
- Cause of leak
- Tenant contact (voicemail only)
- Whether Swift/key holder can attend tonight

## Conflicts between sources
- Caller says the agency is at fault; no evidence of cause or liability, so none accepted.

## Answers to the case questions
**1. Is this an emergency that justifies entering the upstairs flat without 24 hours' notice? What conditions apply?**

Yes. Active flooding with electrics at risk is a genuine emergency, so entry without 24h notice is justified, limited to isolating the water (stopcock under kitchen sink) and making safe, using the OOH key holder with the plumber, attempting tenant contact first (done: voicemail, SMS), documenting entry, and informing tenant and landlord. Not a right to general entry.

**2. What do you tell the caller (who is not your tenant)?**

Keep clear of the wet ceiling and light; if safe and dry, switch off the power at the consumer unit and don't use that light; call 999 if sparking, smoke or heavy flooding. A plumber is being sent tonight and we are trying to reach the occupier. We cannot give out the tenant's number (data protection) but can pass on a message. Liability can't be decided on the phone and we won't give written cover; please photograph the damage and contact your own contents insurer, and the landlord's insurer will be involved via the landlord.

**3. What actions and notifications do you make, and what must you avoid saying?**

Created emergency ticket JOB-101, assigned Swift Plumbing, texted tenant, emailed landlord (asking him to notify insurer), logged call, escalated P1. Avoid: admitting fault or promising to pay, giving tenant's number or any personal details, naming the landlord, saying the cause is known, or promising times.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 into Flat 3 below (kitchen ceiling, … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Olu Adeyemi","party_role":"neighbour","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Flat 3 ne… | 1 | ✅ verified | CALL-104 found in the log_call log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 with electrics at risk; emergency entry to Flat 4 without notice whi… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
