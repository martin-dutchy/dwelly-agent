# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

A routine bedroom window repair has had no visit booked since the contractor was assigned on 1 March, despite three reminders. I asked the tenant whether he has been in touch and for her availability, put the job on hold until 12 March, and escalated the contractor non-response and the approval gap to maintenance.

## Where the case stands
Ticket at mp_time, on hold awaiting tenant reply (review 12 Mar). Contractor assigned 1 Mar, no visit booked after 3 reminders. No valid landlord approval on record for this property.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_TENANT | Ask tenant whether contractor has contacted her and for availability; gave 14-day routine target | Eliza Jenkins, tenant | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Hand over unresponsive contractor and unclear landlord approval | internal maintenance | internal | A3 ✅ |
| 3 | WAIT | Hold until 12 Mar for tenant reply | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Eliza, sorry for the wait with your bedroom window. We asked our contractor, Oscar Turner, to contact you on 1 March and he has not yet confirmed a visit, so we are following this up with our team today. Has he been in touch with you? If so, please tell us the date. If not, please let us know which days and times suit you for a visit (we'll give 24 hours' notice). Our target for routine repairs is within 14 days, and we will confirm a date once we have one. Thank you for your patience.

## Escalation
- **P3 → maintenance** (verified): Contractor Oscar Turner has not booked a visit after assignment (1 Mar) and 3 reminders; landlord approval unclear.
  - Known: Routine window repair, Flat 24 150 Copperfield Walk. Provider assigned 1 Mar; reminders by email+SMS 4, 6, 8 Mar, no reply. Landlord's only reply (event 010, 22 Feb) refers to Flat 18, 88 Alder Lane, a different property, and the toilet issue; no recorded landlord decision on the window. Tenant asked today (MSG-101) whether contractor has been in touch.
  - Missing: Whether the contractor has contacted the tenant; valid landlord approval/spend limit for this property (property record has none); contractor phone not on file.
  - Options: Phone Oscar Turner and confirm he is still attending; Reassign to another contractor; Re-confirm landlord approval for this property first
  - Recommendation: Confirm landlord approval for Flat 24 (his reply named another property), then phone the contractor; reassign if no answer by 12 March.

## What this does not establish
- Messaging the tenant does not book a visit or confirm the contractor is attending
- Escalation does not approve spend or reassign the contractor

## Remaining work
- Maintenance team: confirm landlord approval, phone or reassign contractor
- Book visit once the tenant gives availability

## Missing or unavailable information
- Whether contractor contacted tenant
- Landlord approval for this property and spend limit
- Contractor phone number

## Conflicts between sources
- Landlord reply (event 010) refers to Flat 18, 88 Alder Lane, not Flat 24 150 Copperfield Walk; not treated as approval for this job.
- Event 004 landlord email included a toilet issue that the tenant had already resolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair; Oscar Turner assigned 1 Mar but has not booked a visit despite 3 email+SMS reminders. No visit, quote or valid landlord approval recorded for this property.

**2. What is the next action, who is it for, and through which channel?**

Email to tenant Eliza Jenkins asking whether the contractor has been in touch and for her availability (sent); internal escalation to maintenance to phone or reassign the contractor.

**3. Does anything need a human decision, and why?**

Yes, a low-priority one. Maintenance needs to decide whether to reassign the contractor and to re-confirm landlord approval, because the landlord's only reply named a different property (Flat 18, 88 Alder Lane).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Tenant","comment":"Contractor unresponsive after 3 reminders; asked tenant if con… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Contractor Oscar Turner has not booked a visit after assignment (1 Mar) and 3 reminders; lan… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
