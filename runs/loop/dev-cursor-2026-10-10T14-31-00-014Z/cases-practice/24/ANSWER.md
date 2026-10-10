# Case 24: A verified tenant's repair the system dropped (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** routine

The phone line verified Priya, but a server restart wiped the verification and ticket creation failed; the call ended with a promised follow-up nobody owned. I logged JOB-101 by hand, assigned the usual appliance contractor within the landlord's limit, and told the tenant and landlord.

## Where the case stands
JOB-101 at visit stage, assigned to East London Appliance Repairs; 13 Oct am window requested, awaiting contractor confirmation (follow-up 12 Oct). Tenant and landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Confirm contractor accepts 13 Oct 08:00-12:00 and tell tenant | East London Appliance Repairs / Priya Shah | internal | A6 ✅ |
| 2 | REPLY_TO_TENANT | Sent ticket ref, timescale, unconfirmed window and safety note | Priya Shah, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry about the glitch on our call. Your oven repair is now logged: ref JOB-101 (door hangs open and won't shut). We've passed it to East London Appliance Repairs, our usual appliance contractor. We aim to get someone out within 14 days. We've asked for Tue 13 Oct, 8am-12pm, as you're in weekday mornings, but the contractor hasn't confirmed it yet, so please don't treat it as booked. We'll confirm or rearrange by Monday 12 Oct. Until then please don't use the oven, and keep your cat away from the open door. Reply here if mornings change.

**A4 · send_message → Daniel Price (landlord) via email, daniel.price@example.co.uk** (verified)

> Hi Daniel, the tenant at Flat 9, 3 Amhurst Road reported a snapped oven door hinge (door hangs open, won't shut). Routine repair JOB-101 is with East London Appliance Repairs, within your £250 routine limit. A visit window of 13 Oct am is requested, not yet confirmed. We'll come back to you for approval if any quote exceeds £250.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Assignment does not confirm the visit date; the contractor has not confirmed.
- No quote or cost is established; landlord limit £250.
- Identity verification was by the phone line; I relied on the CRM match.

## Remaining work
- Confirm visit with contractor by 12 Oct (agency ops)
- Chase contractor/quote against £250 limit
- E-4901 is resolved by hand; no human decision needed

## Missing or unavailable information
_None._

## Conflicts between sources
- Handover said door won't open or close; tenant corrected to hangs open and won't shut; used the corrected version.
- Transcript name 'Shaw' was speech-to-text error/clarified as Shah; CRM matches Shah and DOB.

## Answers to the case questions
**1. What does the tenant need, and what did the phone line actually get done?**

Priya needs her oven door hinge repaired (door hangs open and won't shut). The phone line verified her and took details but created no ticket.

**2. Why was E-4901 raised, and what do you do about it?**

Ticket creation was rejected as not_verified because a deployment restart lost the verification. Identity was genuinely verified (name and DOB match CRM), so I created the ticket manually and handled the escalation myself as it needs no human authority.

**3. What actions do you take, and what do you tell the tenant?**

Created JOB-101, assigned East London Appliance Repairs, set a follow-up for 12 Oct, and informed the landlord. Tenant told the ref, the 14-day target, that 13 Oct am is requested but unconfirmed, not to use the oven, and to keep the cat away.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","tenant":"T-1003","category":"appliance","severity":"routine","description":"Oven door hinge snapped on the morning of 1… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"East London Appliance Repairs","visit_window":"2026-10-13 08:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Daniel Price","recipient_role":"landlord","channel":"email","contact":"daniel.price@example.co.uk","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `update_ticket` | {"ref":"JOB-101","note":"Contractor must confirm 13 Oct 08:00-12:00 window (requested, not confirmed). Review Mon 12 Oct. Conflict: handover… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"East London Appliance Repairs","purpose":"Confirm contractor accepted 13 Oct am windo… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- phone-line create_repair_ticket: Not verified due to lost session; recreated manually as JOB-101 (A1).
