# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The window repair has stalled: the contractor has ignored four chases over 9 days. I updated the tenant, set a follow-up for 12 Mar and escalated to maintenance to phone the contractor or reassign. Landlord approval for this repair is unclear.

## Where the case stands
Ticket at mp_time. Oscar Turner assigned 1 Mar, no reply to four email+SMS chases, no visit booked. Landlord approval for the window not clearly recorded. Tenant now updated; escalated to maintenance.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Update tenant on delay, ask for availability and whether the contractor has been in touch | Eliza Jenkins, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Maintenance to phone the contractor or reassign, and confirm landlord approval | internal maintenance | internal | A3 ✅ |
| 3 | WAIT | Follow-up on 12 Mar to check a visit is booked | Oscar Turner, contractor | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, an update on your bedroom window repair. We asked our contractor, Oscar Turner, to contact you to book a visit, but we haven't had confirmation from him yet, and we're sorry for the delay. Our team is now following this up directly and we will aim to get a visit arranged as soon as we can. If he has already been in touch with you, please let us know the date. Please also tell us any days and times that suit you for access. Kind regards, Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Contractor unresponsive after 4 chases (1, 4, 6, 8 Mar, email+SMS); no visit booked; landlord approval for window unclear
  - Known: Ticket NBL-047 at mp_time. Tenant Eliza Jenkins reported bedroom window not closing 21 Feb; toilet issue resolved by tenant. Oscar Turner assigned 1 Mar; no reply to reminders. Landlord Isaac Oakley's only reply (event 010) concerned a plumber at a different property (Flat 18, 88 Alder Lane), not this window; no recorded approval or spend limit for this property (record has no landlord/limit data).
  - Missing: Whether Oscar has contacted the tenant; landlord's decision on the window; spend limit; contractor alternatives.
  - Options: Phone Oscar Turner and get a visit date; Reassign to another contractor; Confirm landlord approval/preference for this property
  - Recommendation: Phone Oscar today; if no answer by 12 Mar, reassign contractor after confirming landlord approval for Flat 24.

## What this does not establish
- Updating the tenant does not book a visit or confirm a date
- Escalation does not approve spend or reassign the contractor
- Nothing confirms the cause of the window fault

## Remaining work
- Maintenance team: reach contractor by phone or reassign
- Landlord decision/approval for the window repair to be confirmed
- Visit to be booked, then work result, invoice and close

## Missing or unavailable information
- Whether the contractor has contacted the tenant
- Landlord approval and spend limit for this property (property record has no landlord data)

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane and a plumber, not this property or the window; treated as not an approval for this job.
- Agency messages are signed by Ashford, Meadow Solutions and Northbridge Lettings, so the branding is inconsistent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair, stage mp_time. Contractor Oscar Turner was assigned on 1 Mar and has not booked a visit despite chases on 4, 6 and 8 Mar. Outstanding: a visit, a clear landlord approval, and the work result, invoice and close.

**2. What is the next action, who is it for, and through which channel?**

An email update to tenant Eliza Jenkins (sent), and an internal escalation to maintenance to phone the contractor or reassign. A follow-up is set for 12 Mar.

**3. Does anything need a human decision, and why?**

Yes, a low-priority one. Further email and SMS chases have not worked, so someone needs to phone the contractor or reassign. The landlord's only reply (event 010) was about a different property and a plumber, so approval for the window is unclear.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-047-three-chases","due_on":"2024-03-12","purpose":"Check visit is booked; if not, reassign contractor","party":"Oscar Tur… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Contractor unresponsive after 4 chases (1, 4, 6, 8 Mar, email+SMS); no visit booked; landlor… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
