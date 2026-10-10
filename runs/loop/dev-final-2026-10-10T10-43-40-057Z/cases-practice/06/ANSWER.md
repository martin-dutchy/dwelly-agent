# Case 06: ANSWER

**Outcome:** escalated · **Severity:** emergency

Assigned HeatRight (first attempt failed, retry verified), told the tenant by email. After the no-show I rebooked Swift for the same afternoon, emailed the tenant and landlord, and escalated for monitoring and the goodwill and contractor review.

## Answers
**1. 1. What happened when you assigned the contractor and how did you verify it?**

The first assignment to HeatRight returned HTTP 500 and the ledger showed NOT APPLIED (ticket still at init). I retried once and the ledger read-back verified stage visit, window 11 Oct 08:00-12:00. I told the tenant only after verification.

**2. 2. What do you tell the tenant at each point?**

After verified booking: an email with HeatRight's window and the gas helpline. After the no-show: an apology by email, the Swift Plumbing & Heating same-day window of 14:00-18:00, and a request to reply if it doesn't suit. I used email because the tenant is vulnerable and prefers it.

**3. 3. After the no-show, what do you do?**

Treated as an emergency because a vulnerable occupant has no heating and it is 3-5C overnight. Reassigned to Swift (verified), emailed the tenant (sent, MSG-102 confirmed by read-back despite an API error), emailed the landlord, and escalated P2 as ESC-104 for attendance monitoring, temporary heaters if needed, HeatRight review and any goodwill decision. I made no compensation promises.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, sorry yo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, I'm real… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Hi Mar… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Contractor no-show for vulnerable tenant with no heating; possible goodwill/compensation que… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Escalations
- **P2 → maintenance** (verified): Contractor no-show for vulnerable tenant with no heating; possible goodwill/compensation query
  - Known: R-4820: no heating/hot water since 9 Oct evening; tenant Jonah Okafor vulnerable (anxiety, email preferred); overnight lows 3-5C. HeatRight (C-11) assignment failed once then verified; no-show 11 Oct (engineer sick). Swift (C-12) booked 14:00-18:00 same day (verified). Tenant and landlord emailed.
  - Missing: Whether Swift attends; repair cost; tenant lost a morning's work (possible compensation request); HeatRight performance review.
  - Options: Monitor Swift visit, arrange temporary heaters if it slips; Review HeatRight reliability; Decide on goodwill gesture
  - Recommendation: Check Swift attendance this afternoon; provide heaters if not fixed; review HeatRight.

## Failed or unverified actions
- A1: Attempt 1 NOT APPLIED (HTTP 500); retried once, attempt 2 verified.
- A4: The API reported an error, but read-back showed MSG-102 was delivered; not retried, to avoid a duplicate.
