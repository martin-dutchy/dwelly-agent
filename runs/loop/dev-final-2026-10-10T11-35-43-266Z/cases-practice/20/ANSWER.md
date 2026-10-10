# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Neighbour in Flat 3 reported water dripping onto a light fitting from Flat 4, whose tenant is away and unreachable. Logged emergency JOB-101, assigned out-of-hours plumber, notified tenant and landlord, escalated P1.

## Where the case stands
JOB-101 at visit stage; Swift Plumbing assigned for an emergency make-safe tonight (window 20:00-22:00 is a target, not confirmed by contractor). Tenant and landlord informed; P1 escalation open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover: confirm Swift attends, key release, phone landlord | internal maintenance | internal | A5 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating (out of hours) for emergency make-safe | Swift Plumbing & Heating, contractor | internal | A2 ✅ |
| 3 | OTHER | Emailed landlord Ben about the leak, emergency entry and no admission of liability | Ben Hartley, landlord | email | A4 ✅ |
| 4 | REPLY_TO_TENANT | SMS to Amelia (voicemail on calls) about emergency entry and asking her to call | Amelia Clarke, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, urgent: water is leaking from your flat into the flat below. We can't reach you, so because it's an emergency we're sending a plumber tonight with our out-of-hours key to turn the water off and make it safe. Please call us as soon as you see this. Mare and Co

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, at 19:35 tonight the neighbour in Flat 3 reported water coming through her kitchen ceiling from Flat 4 (near a light fitting). Amelia is away until 12 Oct and not answering. As an emergency we are sending Swift Plumbing & Heating tonight, entering with our key to isolate the water and make safe (job JOB-101). Make-safe only; we'll get a quote to you before any repair above £300. The Flat 3 resident wants cover for her ceiling; we have admitted no liability and suggested she contact her own insurer; you may wish to notify your buildings insurer. Mare and Co

## Escalation
- **P1 → maintenance** (verified): Active leak near electrics, tenant away/unreachable, entry without notice needed out of hours
  - Known: Caller Olu Adeyemi (Flat 3, not our tenant, unverified) reports water dripping through kitchen ceiling onto light fitting, 19:35 Sat 10 Oct. Flat 4 tenant Amelia Clarke away 9-12 Oct; phone to voicemail, SMS sent. Stopcock under kitchen sink. Key safe/out-of-hours key holder available. JOB-101 created; Swift Plumbing (out of hours) assigned 20:00-22:00 window; landlord emailed. Caller asked for written liability cover and tenant's number: neither given.
  - Missing: Contractor confirmation of arrival; who holds the key tonight; cause of leak; whether Flat 3 electrics were isolated; landlord response; liability/insurance claim.
  - Options: Confirm Swift attends and enters under emergency; Phone Swift and key holder directly; Phone landlord Ben to inform
  - Recommendation: Human confirms Swift attendance and key release now, phones Ben, and handles any liability/insurance query from Flat 3 via the landlord's insurer.
  - Deadline: Tonight

## What this does not establish
- Assignment does not confirm the contractor has accepted or arrived; cause of leak unknown.
- Nothing here admits liability or agrees to pay for Flat 3's ceiling.
- Entry is for make-safe only, not repairs or general access.

## Remaining work
- Human/contractor: confirm attendance, enter with key-holder, isolate water at stopcock under kitchen sink, record what was done.
- Quote to landlord before any repair over £300 inc VAT.
- Landlord/insurer to deal with Flat 3's damage claim.
- Tenant to be updated when she responds; follow up after her return 12 Oct.

## Missing or unavailable information
- Contractor confirmation of attendance
- Cause of leak
- Whether the caller has isolated her electrics

## Conflicts between sources
- Tenant is away 9-12 Oct per portal note, yet caller says nobody answers: consistent, not a conflict. Caller's identity and flat are unverified, so treated as a report only.

## Answers to the case questions
**1. Is this an emergency that justifies entering without 24 hours' notice? What conditions?**

Yes. Active flooding near electrics, with the occupant away and unreachable, is a genuine emergency, so entry without 24h notice is justified. Conditions: make-safe only (isolate water at the stopcock under the kitchen sink, make safe), using the office key safe or out-of-hours key holder with the contractor, record the entry and reason, and tell the tenant and landlord straight away. Holding keys alone gives no right of entry; the emergency does.

**2. What do you tell the caller (who is not your tenant)?**

Safety first: keep away from the dripping light and don't touch switches or the fitting; if safe to do so, turn off the kitchen lights/power at the consumer unit; move belongings away, put a bucket under the drip; call 999 if there is any sparking, burning smell or immediate danger. Tell her we've logged it as an emergency and are sending a plumber tonight to stop the water, and that we have tried to reach the tenant. Decline to give the tenant's number (personal data); we will pass on her details if needed. Say we can't confirm who is responsible or give written cover now: liability is for the landlord and insurers to look at, she should keep photos and contact her own contents/home insurer, and we've informed the landlord.

**3. What actions and notifications do you make, and what must you avoid saying?**

Done: created emergency JOB-101 (A1), assigned Swift Plumbing out-of-hours (A2), SMS to tenant (A3), email to landlord Ben (A4), P1 escalation (A5). Avoid: admitting liability or promising to pay or put cover in writing; sharing the tenant's phone, name details or her absence; promising arrival times or costs; telling the caller to stay near the leak or touch electrics; naming the cause as fact.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 into Flat 3 below (reported by Olu A… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak near electrics, tenant away/unreachable, entry without notice needed out of hour… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
