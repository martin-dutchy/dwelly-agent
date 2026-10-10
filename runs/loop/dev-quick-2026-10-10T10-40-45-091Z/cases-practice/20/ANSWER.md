# Case 20: ANSWER

**Outcome:** escalated · **Severity:** emergency

Active water leak from Flat 4, 12 Mare Street (P-201) into neighbour's Flat 3, dripping onto a light fitting. Logged emergency ticket JOB-101, assigned Swift Plumbing & Heating for an out-of-hours make-safe, notified the tenant and landlord by SMS, and escalated the key-holder entry and compensation questions to management (ESC-106).

## Answers
**1. Is this an emergency that justifies entering without 24h notice? What conditions apply?**

Yes, treated as an emergency: active water ingress onto electrics and an unanswered flat, with the tenant away. Entry only for make-safe (isolate the leak at the Flat 4 kitchen stopcock, make area safe), via the out-of-hours key holder, with the reason logged and the tenant told afterwards. Keys held give no right of entry by themselves; this rests on the genuine emergency. Nothing beyond make-safe without landlord approval.

**2. What do you tell the caller (not our tenant)?**

Confirmed an emergency job is logged and a plumber is sent. Told him to keep clear of the light fitting, isolate that circuit if safe, call 999 for sparks/smoke/burning, and keep photos and receipts. Did not disclose tenant details or number, did not confirm who pays, and did not promise compensation.

**3. What actions and notifications, and what must be avoided?**

Actions: ticket JOB-101 created and assigned (verified A1, A3); tenant SMS (A4); landlord SMS (A5); contractor instructed by phone (A6); caller message (A7); ESC-106 raised. Avoid: giving the tenant's number or tenancy details to the neighbour, promising the ceiling will be covered in writing, and authorising spend over the £300 limit.

**4. Was the tenant's number disclosed?**

No. The tenant's number was used only for the SMS to the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 (P-201, above Flat 3) dripping… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"PENDING","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-23:00"} | 1 | ❌ failed | Ticket PENDING not found on read-back |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-23:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","body":"Hello Amelia, this is Mare and… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","body":"Hi Ben, emergency: water leaki… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"phone_call","contact":"+447700900312","body":"Emergenc… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Olu Adeyemi","recipient_role":"neighbour","channel":"phone_call","contact":"Caller callback number not on file; reply via… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"management","reason":"Emergency water leak from P-201 (Flat 4, 12 Mare St) into Flat 3 below, active drip onto ligh… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Escalations
- **P1 → management** (verified): Emergency water leak from P-201 (Flat 4, 12 Mare St) into Flat 3 below, active drip onto light fitting. Tenant away and unreachable; out-of-hours key holder needed to enter without 24h notice. Neighbour is demanding written cover for ceiling damage.
  - Known: Ticket JOB-101 (emergency, plumbing) created and assigned to Swift Plumbing & Heating (C-12), visit window 2026-10-10 20:00-23:00 (ledger A3). SMS to tenant Amelia Clarke sent (A4, voicemail earlier). SMS to landlord Ben Hartley sent (A5). Swift instructed by phone (A6 logged as sent, not confirmed by them). Caller Olu Adeyemi (Flat 3) told to isolate light and call 999 if sparks; no personal data given. Landlord spend limit £300; make-safe only.
  - Missing: Whether key holder has been contacted and is attending; whether Swift has confirmed attendance; tenant has not replied; neighbour's claim has no evidence yet; insurer contact via landlord. Callback number for Olu not on file (message A7 was sent to a placeholder, which may not have reached him).
  - Options: Authorise key holder entry now for make-safe (recommended, genuine emergency, 24h notice waived; log reason and tell tenant after); Hold entry until tenant or landlord responds (risks further damage and electrics); Landlord to decide on ceiling claim via buildings insurer (not agency cover)
  - Recommendation: Arrange key holder entry with Swift for make-safe now; log emergency reason; landlord to handle insurance and any cost over £300; do not promise neighbour compensation.
  - Deadline: 2026-10-10 21:00

## Failed or unverified actions
- A2: Assign with ticket ref 'PENDING' not found; retried with JOB-101 and succeeded (A3).
