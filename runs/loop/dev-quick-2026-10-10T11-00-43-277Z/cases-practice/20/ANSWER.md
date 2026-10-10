# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour in Flat 3 reported water leaking from Flat 4 onto a light fitting. We created emergency job JOB-101, assigned Swift Plumbing & Heating for an out-of-hours make-safe, messaged the tenant and landlord, and escalated P1 (ESC-106) so an on-call human can authorise key-holder entry. The neighbour was given safety advice and told that damage claims go through the landlord and insurer; the tenant's number was not disclosed.

## Where the case stands
JOB-101 created (emergency plumbing). Swift Plumbing & Heating assigned for out-of-hours make-safe tonight. Escalated to on-call maintenance (ESC-106) to confirm key holder entry. Waiting on tenant, landlord, and contractor replies.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Send key holder with Swift Plumbing for emergency entry to isolate water and make electrics safe; confirm entry on JOB-101 | On-call maintenance team | internal | A7 ✅ |
| 2 | REPLY_TO_TENANT | Tenant told by SMS about the leak and the emergency visit; asked to call out-of-hours line | Amelia Clarke, tenant | sms | A3 ✅ |
| 3 | CHASE_LANDLORD | Landlord emailed about the emergency, make-safe within limit, and £300 approval rule | Ben Hartley, landlord | email | A4 ✅ |
| 4 | CHASE_PROVIDER | Contractor briefed on emergency job, access and stopcock location | Swift Plumbing & Heating, contractor | sms | A5 ✅ |
| 5 | OTHER | Neighbour call logged with safety advice; damage claims referred to landlord and insurer | Olu Adeyemi, neighbour | phone_call | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hello Amelia, this is Mare and Co. We've had an urgent report of water leaking from your flat into the flat below, dripping near a light fitting. We're sending an emergency plumber to stop the water and make things safe. We may need to enter your flat with our key holder. Please call us on the out-of-hours line when you can, and let us know if you have any concerns.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, there is an emergency at Flat 4, 12 Mare Street. Water is leaking from the flat ceiling into Flat 3 below, dripping onto a light fitting. The tenant is away and not answering. We have booked Swift Plumbing & Heating (out of hours) to isolate the water and make the area safe, and we will use the out-of-hours key holder for entry. Make-safe works are within your limit. Any repair beyond make-safe that goes over £300 inc VAT will come back to you for approval first. Please also let us know if you want to contact your buildings insurer about the neighbour's ceiling damage. Mare and Co

**A5 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> EMERGENCY job JOB-101, Flat 4, 12 Mare Street E8 1HL (ceiling leak into Flat 3 below, water dripping onto a light fitting). Please attend as soon as possible tonight. Stopcock is under the kitchen sink. Tenant is away and not answering; entry will be via the out-of-hours key holder, with no tenant present. Please isolate water, make electrics safe, and report back with photos and what you found. Any work beyond make-safe over £300 inc VAT needs landlord approval first.

## Escalation
- **P1 → maintenance** (verified): Active water leak into Flat 3 with dripping onto a light fitting (electrical risk). Out-of-hours entry to Flat 4 needed without tenant present; tenant away 9-12 Oct and not answering. Need on-call human to confirm key holder attendance and authorise entry.
  - Known: Leak reported 19:35 by Olu Adeyemi (Flat 3, neighbour). Tenant Amelia Clarke (T-1001) away per portal note, not answering; SMS sent (MSG-102), calls go to voicemail. Landlord Ben Hartley emailed (MSG-103), spend limit £300 inc VAT. JOB-101 created; Swift Plumbing & Heating (C-12) assigned for emergency make-safe tonight. Stopcock under kitchen sink in Flat 4. Out-of-hours key holder on call per property record.
  - Missing: Whether the key holder has been contacted and is attending; whether the contractor has confirmed attendance; the tenant's response; the landlord's response.
  - Options: Key holder attends with Swift Plumbing now and enters Flat 4 under emergency entry to isolate the water supply; If no key holder available, forced entry by contractor under emergency powers, with a police non-emergency record and a photo log; Contractor isolates the water at the external stopcock or mains if accessible without entering
  - Recommendation: Send the key holder with Swift Plumbing now for emergency entry, limited to isolating water and making electrics safe. Give the tenant written notice of the entry and what was done. Landlord to be told of any damage found.
  - Deadline: 2026-10-10 21:00

## What this does not establish
- Assigning the contractor does not confirm they have attended or found the cause.
- No liability for the neighbour's ceiling damage has been accepted; this is for the landlord and insurer.
- Tenant's phone number and whereabouts were not disclosed to the neighbour.
- Entry to Flat 4 has not yet been authorised by a human; it is pending ESC-106.

## Remaining work
- On-call maintenance (ESC-106): confirm key holder attendance and emergency entry, now.
- Swift Plumbing: attend, isolate water, report with photos (JOB-101).
- Landlord Ben Hartley: reply on insurance and any repair beyond make-safe (>£300 needs approval).
- Tenant Amelia Clarke: confirm the situation on return; written notice of entry and works.
- Neighbour Olu Adeyemi: follow up on damage claim via landlord/insurer.

## Missing or unavailable information
- Key holder name and availability tonight
- Tenant response
- Landlord response
- Contractor arrival time
- Neighbour's callback number (not in transcript)

## Conflicts between sources
- Tenant's CRM note says away 9-12 Oct but tenant is 'active' and the note is from the portal; no conflict with the emergency, but it means she may not get messages promptly.

## Answers to the case questions
**1. Is this an emergency that justifies entering the upstairs flat without 24 hours' notice? What conditions apply?**

Yes. Active water ingress onto an electrical fitting is an emergency under our safety standard, and it is a genuine emergency, so entry without 24h written notice is allowed. Conditions: entry is limited to making safe (isolate water at the kitchen-sink stopcock, make electrics safe, locate the leak); use the out-of-hours key holder with the contractor; the tenant is informed in writing with what was done; no works beyond make-safe without landlord approval (over £300 inc VAT); keep a photo log. Holding keys does not itself give a right of entry, so a human must authorise it (ESC-106).

**2. What do you tell the caller (who is not your tenant)?**

Keep clear of the water and the light fitting, do not touch the fitting, switch off power at the consumer unit if it is safe, call 999 if sparking or burning, and move belongings. An emergency plumber has been booked and the landlord will be informed. Damage claims go to the landlord and their insurer. Do not give the tenant's number or whereabouts, and do not accept liability or promise to pay.

**3. What actions and notifications do you make, and what must you avoid saying?**

Actions: JOB-101 created (emergency); Swift Plumbing & Heating assigned (C-12); tenant texted (MSG-102); landlord emailed (MSG-103); contractor texted (MSG-104); neighbour call logged (CALL-105); escalated P1 to maintenance (ESC-106). Avoid: admitting fault ('this is your fault' is not accepted); promising to cover the ceiling; giving the tenant's phone number, email, or that she is away; promising a visit time or outcome not confirmed; using legal jargon.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201 (Flat 4, 12 Mare Street, E8 1HL)","category":"plumbing","severity":"emergency","description":"EMERGENCY, reported 2026-10… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating (C-12, +447700900312, out-of-hours)","visit_window":"2026-10-10 20:30-23:30 (… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","body":"Hello Amelia, this is Mare and… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","body":"EMERGENCY job J… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `log_call` | {"party_name":"Olu Adeyemi","party_role":"neighbour","direction":"inbound","outcome":"connected","summary":"Neighbour (Flat 3) reported wate… | 1 | ✅ verified | CALL-105 found in the log_call log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active water leak into Flat 3 with dripping onto a light fitting (electrical risk). Out-of-h… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
_None._
