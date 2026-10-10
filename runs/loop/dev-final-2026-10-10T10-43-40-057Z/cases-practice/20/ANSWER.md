# Case 20: ANSWER

**Outcome:** escalated · **Severity:** emergency

Active leak from Flat 4 into Flat 3 over a light fitting is an emergency. I opened JOB-101, booked Swift Plumbing for an emergency make-safe, texted the away tenant, emailed the landlord, and escalated P1 for the emergency entry and the liability question.

## Answers
**1. Is this an emergency that justifies entering without 24h notice? Conditions?**

Yes. Active flooding with water on electrics risks people and property, and the tenant is away and unreachable. Conditions: entry only to isolate water and make safe, by the out-of-hours key holder/plumber, ideally with a witness; try the tenant first (SMS sent, voicemail) and record the attempts; document with photos; no non-emergency work or snooping; tell the tenant afterwards. Further repairs need normal 24h written notice.

**2. What do you tell the caller (not our tenant)?**

Safety first: keep away from the light fitting and wet area, don't use that light, switch off the electrics at the consumer unit if it's safe to do so, move belongings, and call 999 if there is sparking, burning smell or immediate danger. Tell her we've logged an emergency and sent a plumber to stop the water tonight. We cannot give the tenant's number or any tenant details (data protection). Say we can't promise payment or put liability in writing; it's a matter for the landlord and insurers, so she should photograph the damage and contact her own contents insurer and landlord. The call was live; I have no contact details on file for her, so no separate message was sent.

**3. What actions and notifications do you make, and what must you avoid saying?**

Actions: emergency ticket JOB-101, Swift Plumbing assigned, tenant SMS, landlord email, P1 escalation ESC-104. Avoid: admitting fault or liability, promising to cover the ceiling or putting it in writing, giving out the tenant's number, confirming that she is away or any other tenancy details, and promising times or costs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 coming through Flat 3's kitche… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-23:00 (emergency make-safe, ASAP)"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","body":"Hi Amelia, it's Mare and Co. W… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, at … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 over light fitting; tenant away/unreachable; emergency entry needed … | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Escalations
- **P1 → maintenance** (verified): Active leak into Flat 3 over light fitting; tenant away/unreachable; emergency entry needed and liability claim made
  - Known: Caller Olu Adeyemi (Flat 3) reported leak at 19:35 Sat. Tenant Amelia Clarke away 9-12 Oct (CRM note), calls to voicemail, SMS delivered. JOB-101 created, Swift Plumbing assigned, landlord Ben emailed. Key at office key safe / out-of-hours key holder.
  - Missing: Whether the tenant responds; whether entry is completed and leak isolated; cause; Flat 3 damage extent and liability; neighbour's identity not verified as Flat 3 resident.
  - Options: Out-of-hours key holder attends with Swift, enters as emergency, witnessed and documented with photos; Wait for tenant (not advised)
  - Recommendation: Authorise emergency entry now via key holder with plumber; record the entry; leave the compensation/liability question to the landlord and insurer; advise Flat 3 to contact their own contents insurer.

## Failed or unverified actions
_None._
