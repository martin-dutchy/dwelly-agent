# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour reported an active leak onto a light fitting from Flat 4, whose tenant is away and unreachable. Created emergency ticket JOB-101, assigned Swift Plumbing tonight, informed tenant and landlord, and escalated P1 for key-holder entry and the neighbour's liability demand.

## Where the case stands
JOB-101 at visit stage; Swift assigned 20:00-23:00 tonight for emergency make-safe; tenant unreachable (voicemail+SMS); landlord emailed; P1 escalated (ESC-105) to confirm key-holder entry and handle the neighbour's claim.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Swift Plumbing (out of hours) for tonight's emergency make-safe | Swift Plumbing & Heating, contractor | portal | A2 ✅ |
| 2 | REPLY_TO_TENANT | SMS tenant explaining emergency entry and make-safe | Amelia Clarke, tenant | sms | A3 ✅ |
| 3 | OTHER | Emailed landlord about leak and make-safe, no liability accepted | Ben Hartley, landlord | email | A4 ✅ |
| 4 | ESCALATE_TO_HUMAN | P1 escalation for key-holder entry and neighbour claim | internal maintenance | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, water is leaking from your flat into the flat below. We can't reach you, so because it's an emergency we're sending a plumber tonight to turn the water off and make it safe, using our key. If you can, please call us. If you can turn the water off at the stopcock under the kitchen sink via someone with access, please do.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, at 19:35 tonight the downstairs neighbour reported water coming through her ceiling from Flat 4, 12 Mare Street. The tenant is away and unreachable. We are sending Swift Plumbing for emergency make-safe (isolate water) under job JOB-101. We'll update you on findings and any quote; anything over £300 we will call you first. You may wish to notify your buildings insurer. We have not accepted liability to the neighbour.

## Escalation
- **P1 → maintenance** (verified): Active leak into Flat 3; emergency entry to Flat 4 without notice while tenant away; neighbour demands written liability
  - Known: Neighbour Olu Adeyemi (Flat 3) reported leak 19:35 Sat 10 Oct, water onto light fitting. Tenant Amelia Clarke away 9-12 Oct, voicemail, SMS delivered. JOB-101 created, Swift Plumbing (out of hours) assigned 20:00-23:00. Key in office key safe / out-of-hours key holder. Landlord Ben emailed. Spend limit £300.
  - Missing: Source of leak; whether tenant has a cause (e.g. tap/washing machine left on); cost; Flat 3 occupier contact/insurance details; whether Swift confirmed attendance.
  - Options: Key holder meets plumber, enter Flat 4 as emergency with witness, isolate water, record entry and photos, secure the flat; Landlord/insurer handle neighbour's claim; Call landlord if quote above £300
  - Recommendation: Authorise key holder entry now; confirm Swift attendance by phone; refer neighbour's liability claim to landlord's insurer, no written admission from agency; advise Flat 3 to switch off power to the kitchen lights/circuit.
  - Deadline: Tonight

## What this does not establish
- Assigning the plumber does not confirm the cause of the leak or who is liable
- Nothing said to the neighbour admits liability or promises payment
- Entry is limited to make-safe; no other work or inspection of the tenant's belongings

## Remaining work
- Human/key holder to attend with Swift and enter Flat 4, record entry, isolate water
- Confirm Swift attendance and outcome; record work result
- Landlord to refer Flat 3's claim to buildings insurer
- Tenant to be updated once reachable; give her the 24h-notice-exempt entry record
- Follow-up on drying out and repairs, quote approval if over £300 (call Ben first)

## Missing or unavailable information
- Cause of the leak
- Flat 3 contact details/insurance
- Swift confirmation of attendance

## Conflicts between sources
- Tenant note says away 9-12 Oct, but the neighbour says nobody is answering; consistent, so not a conflict. Entry assumed unoccupied.

## Answers to the case questions
**1. Is this an emergency that justifies entering without 24h notice? Conditions?**

Yes. Active flooding with water on electrics, in a flat whose tenant is away and unreachable, is a genuine emergency. Conditions: entry only to isolate water and make safe (stopcock under kitchen sink), using the office/out-of-hours key with a witness, keep a record of times and photos, tell the tenant and landlord straight away, and do no more than needed.

**2. What do you tell the caller (not our tenant)?**

Tell her to keep clear of the wet area, turn off the power to her kitchen lights/circuit at the consumer unit if safe to do so, and call 999 if there is any danger, sparking or serious flooding. Tell her we are sending a plumber tonight to stop the water. Don't give out the tenant's number or any tenant details (data protection); we will pass her contact details to the tenant on request. Tell her liability is not decided, so we cannot give a written promise to pay. Suggest she tell her own contents/home insurer and note the damage with photos; the landlord's insurer will be contacted.

**3. What actions and notifications, and what must be avoided?**

Done: ticket JOB-101 (emergency), Swift assigned, tenant SMS and voicemail attempt logged, landlord emailed, P1 escalation. Avoid: admitting liability or promising to pay, giving the tenant's number or personal details, saying the tenant is away, speculating on the cause, and any commitment on dates or costs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Water leaking from Flat 4 through kitchen ceiling of Flat 3 … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-23:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Amelia Clarke","party_role":"tenant","direction":"outbound","outcome":"voicemail","summary":"Tried tenant about leak; voicema… | 1 | ✅ verified | CALL-104 found in the log_call log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3; emergency entry to Flat 4 without notice while tenant away; neighbo… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
