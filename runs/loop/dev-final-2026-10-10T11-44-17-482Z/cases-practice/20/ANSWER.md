# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour in Flat 3 reported an active leak from Flat 4 onto her light fitting. I opened emergency job JOB-101, assigned the out-of-hours plumber, texted the away tenant, emailed the landlord and escalated P1 for key-holder entry. The neighbour was given safety advice, no liability admitted and no tenant number given.

## Where the case stands
JOB-101 at visit stage; Swift assigned for 20:00-23:00 window tonight (target, attendance not yet confirmed by contractor). Tenant SMSed, landlord emailed, P1 escalated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover: emergency entry, key holder and landlord phone call tonight | internal maintenance | internal | A6 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating out-of-hours to isolate water and make safe | Swift Plumbing & Heating, contractor | portal | A2 ✅ |
| 3 | REPLY_TO_TENANT | SMS tenant about leak and emergency entry | Amelia Clarke, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, urgent: water is leaking from your flat into the flat below. We are sending an emergency plumber tonight and, because this is an emergency, will enter with our out-of-hours key holder to turn the water off and make it safe. If you can, please call us now on the office line or tell us if you know the cause. We'll update you once it's done.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, at 19:35 tonight the downstairs neighbour (Flat 3) reported water coming through her ceiling at Flat 4, 12 Mare Street, dripping onto a light fitting. Tenant is away and not answering. We have sent Swift Plumbing & Heating to isolate the water and make safe, entering as a genuine emergency. Costs for make-safe will be kept minimal; we will call before anything over £300. The neighbour has asked about damage cover; we have not accepted liability and she may need to go through your buildings insurance, so please consider notifying your insurer. We'll update you after the visit.

## Escalation
- **P1 → maintenance** (verified): Active flood with water on electrics in Flat 3; entry to tenanted Flat 4 without notice as emergency; tenant unreachable.
  - Known: Call 19:35 10 Oct from Olu Adeyemi (Flat 3). JOB-101 created, Swift Plumbing (out of hours) assigned 20:00-23:00. Tenant Amelia Clarke away 9-12 Oct, calls to voicemail, SMS sent. Landlord Ben emailed. Stopcock under kitchen sink; spare keys in office key safe/out-of-hours key holder.
  - Missing: Contractor's confirmation of attendance/ETA; cause of leak; extent of damage; whether electrics in Flat 3 are safe; insurer details.
  - Options: Key holder meets Swift, entry as emergency, isolate water, document with photos; If Swift cannot attend, use another out-of-hours plumber; Call landlord by phone if costs may exceed £300
  - Recommendation: Proceed with emergency entry limited to making safe (isolating water), photograph, leave a note for the tenant, no non-emergency work. Phone Ben tonight. Neighbour's compensation claim goes to management/landlord insurer, no liability admitted.
  - Deadline: Tonight, 10 Oct 2026

## What this does not establish
- Assignment does not confirm the contractor has accepted or arrived
- Does not establish cause of leak or liability for Flat 3 damage
- Emergency entry covers making safe only, not wider repairs

## Remaining work
- Human/key holder to meet Swift and enter, isolate water, photograph
- Phone Ben Hartley tonight; insurer notification
- Update tenant, neighbour and landlord after visit
- Handle neighbour's claim via management/landlord insurer

## Missing or unavailable information
- Contractor ETA confirmation
- Cause and extent of leak
- Whether Flat 3 electrics are safe

## Conflicts between sources
- Tool notes say calls to tenant go to voicemail, while CRM shows tenant away 9-12 Oct; consistent, treated as unreachable.

## Answers to the case questions
**1. Is this an emergency that justifies entering the upstairs flat without 24 hours' notice? What conditions apply?**

Yes. Active flooding with water on electrics is an emergency, and the tenant is away and unreachable (voicemail, SMS sent). Conditions: entry only to isolate water (stopcock under kitchen sink) and make safe, via the out-of-hours key holder with the contractor, photograph and record it, leave a note, tell tenant and landlord promptly, no wider work or snooping.

**2. What do you tell the caller (who is not your tenant)?**

Stay clear of the dripping fitting, switch off that circuit at the consumer unit only if safe and dry, don't touch wet fittings, protect belongings, call 999 if sparking, smoke or immediate danger. A plumber is being sent. We can't give out the tenant's number or details, but we are contacting her. We can't promise to pay or put that in writing tonight; her claim will be passed to the landlord/management and she should tell her own insurer.

**3. What actions and notifications do you make, and what must you avoid saying?**

Created JOB-101 (emergency), assigned Swift Plumbing, SMSed tenant, emailed landlord Ben (insurance flag), logged the call, escalated P1. Avoid: admitting liability or promising compensation in writing, sharing the tenant's number or whereabouts (away dates), blaming the tenant or cause before known, promising arrival times or costs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 coming through kitchen ceiling… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-23:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Olu Adeyemi","party_role":"neighbour","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Neighbour… | 1 | ✅ verified | CALL-104 found in the log_call log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active flood with water on electrics in Flat 3; entry to tenanted Flat 4 without notice as e… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
