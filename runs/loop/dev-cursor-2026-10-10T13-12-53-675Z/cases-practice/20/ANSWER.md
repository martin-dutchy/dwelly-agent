# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour in Flat 3 reported water through her ceiling onto a light fitting from Flat 4, whose tenant is away and unreachable. Logged emergency ticket JOB-101, assigned the out-of-hours plumber, notified tenant and landlord, advised the caller on safety, and escalated P1.

## Where the case stands
JOB-101 at visit stage; Swift assigned for emergency window 20:00-22:00 tonight; tenant and landlord informed; P1 escalation open for entry/make-safe oversight.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating (out-of-hours) for same-day emergency make-safe | Swift Plumbing & Heating, contractor | internal | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation so on-call staff coordinate key holder entry, phone landlord and handle compensation claim | internal maintenance | internal | A6 ✅ |
| 3 | REPLY_TO_TENANT | SMS to Amelia Clarke about leak and emergency entry | Amelia Clarke, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, urgent: water is leaking from your flat into the flat below. We couldn't reach you by phone. Because of the risk to people and electrics, we're sending an emergency plumber tonight with our out-of-hours key holder to turn off the water and make safe. If you can, please call us now. We'll update you once it's done.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, at 19:35 tonight the downstairs neighbour (Flat 3) reported water coming through her kitchen ceiling from Flat 4, onto a light fitting. Amelia is away and not answering. As an emergency we are sending Swift Plumbing & Heating tonight, entering with our key holder only to isolate the water and make safe. Cause and cost are not yet known; we'll report back and call you before any spend over £300. The neighbour has asked about compensation; we have made no admission and told her this is a matter for your buildings insurer. You may want to notify them.

**A5 · send_message → Olu Adeyemi (third_party) via phone_call, existing thread (inbound call 19:35 transcript)** (verified)

> Mr/Ms Adeyemi, thank you for calling. Please keep away from the wet light fitting and don't touch it or the switch. If you can do so safely, turn off the power to your kitchen lights at your fuse box, and move belongings from under the drip. If you see sparks, burning smells or the ceiling sagging, leave and call 999. We've treated this as an emergency: a plumber is being sent tonight to stop the water. I can't share the tenant's details, but we are trying to reach her. I can't discuss who is responsible or promise payment on this call; I've passed your concerns to the landlord, and please also contact your own home insurer and keep photos of the damage. A colleague will follow up.

## Escalation
- **P1 → maintenance** (verified): Active escape of water onto electrics in Flat 3 from Flat 4; tenant away and unreachable; entry needed tonight
  - Known: Call 19:35 Sat 10 Oct from Olu Adeyemi (Flat 3). Tenant Amelia Clarke away 9-12 Oct (portal note), phone voicemail, SMS delivered. Stopcock under kitchen sink. Keys: office key safe / out-of-hours key holder. Swift Plumbing (out of hours) assigned on JOB-101. Landlord Ben Hartley emailed; limit £300.
  - Missing: Confirmation Swift attended; source of leak; whether landlord phoned; damage extent; neighbour's liability claim.
  - Options: Key holder meets Swift, enter for make-safe only, record entry and leave note for tenant; If plumber unavailable, key holder isolates water at stopcock/mains; Phone landlord Ben; forward neighbour's compensation claim to management/insurer
  - Recommendation: Treat as genuine emergency: enter with key holder to stop water only, minimal entry, document, no liability admission, no tenant number given to neighbour. Phone landlord tonight and confirm Swift attendance.
  - Deadline: Tonight, immediately

## What this does not establish
- Assigning Swift does not confirm they have attended or the leak's cause
- No liability, payment or compensation has been admitted or decided
- Entry is limited to making safe, not general inspection

## Remaining work
- On-call human: key holder meets plumber, document entry, phone landlord Ben tonight
- Confirm water isolated and electrics safe; record work result
- Compensation claim to management/landlord insurer
- Follow up with tenant on return

## Missing or unavailable information
- Cause of leak
- Whether the plumber confirmed attendance
- Whether the tenant has seen the SMS

## Conflicts between sources
- Tenant record says active but a portal note says she is away 9-12 Oct; treated as away, so no one can give access, which supports emergency entry.

## Answers to the case questions
**1. Is this an emergency that justifies entering without 24 hours' notice? What conditions apply?**

Yes: active leak onto electrics, tenant away and unreachable (voicemail, SMS sent). Conditions: entry only to isolate water and make safe, minimal, via out-of-hours key holder with the plumber, documented, tenant and landlord told at once. Holding keys alone gives no right; the emergency does. Any further non-urgent work needs 24h written notice.

**2. What do you tell the caller (who is not your tenant)?**

Stay clear of the light fitting, switch off the kitchen lighting circuit at the fuse box if safe, 999 if sparks, burning smell or sagging ceiling; a plumber is being sent tonight; we can't give the tenant's number or discuss responsibility; her concerns go to the landlord; contact her own insurer and photograph damage.

**3. What actions and notifications do you make, and what must you avoid saying?**

Created emergency ticket JOB-101, assigned Swift, SMS to tenant, email to landlord Ben, safety reply to caller, P1 escalation. Avoid: giving tenant's phone or personal details, admitting fault, promising to pay or put cover in writing, and promising a time for repairs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 through kitchen ceiling of Fla… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00 (emergency, same-day)"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Olu Adeyemi","recipient_role":"third_party","channel":"phone_call","contact":"existing thread (inbound call 19:35 transcr… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active escape of water onto electrics in Flat 3 from Flat 4; tenant away and unreachable; en… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
