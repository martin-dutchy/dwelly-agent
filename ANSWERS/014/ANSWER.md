# Heating service request at 7 Mallowmere Walk: ANSWER

**Decision:** action_taken · **Severity:** urgent

Heating failed, tenant with mobility impairment at 10°C. Booked the 15 Jan 9-11am diagnostic with Brackenridge (£168) under the landlord's £250 urgent-repair authority, before the 17:30 deadline, and informed tenant, contractor and landlord. Escalated unfunded interim heating/transport as P2.

## Where the case stands
NBL-014 at visit stage: Brackenridge assigned for diagnostic 15 Jan 9-11am (£168, within £250 authority). Tenant access confirmation pending; interim heating/transport/accommodation unfunded and escalated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Brackenridge for 15 Jan 9-11am diagnostic before the 17:30 cut-off and asked the contractor to book it | Daniel Hart, contractor | email | A2 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Told tenant of slot, call/notice requirement; asked her to confirm access | Leah Venn, tenant | sms | A4 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Informed landlord of booking and asked for decision on interim heating by 9am 15 Jan | Owen Pike, landlord | email | A6 ✅ |
| 4 | ESCALATE_TO_HUMAN | P2 escalation for interim heating/transport funding for vulnerable tenant | Maintenance team / duty manager | internal | A7 ✅ |
| 5 | WAIT | Follow-up 15 Jan on access confirmation, landlord reply and visit outcome | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Daniel Hart (contractor) via email, existing thread (event 019 call / event 012 email)** (verified)

> Hi Daniel, thanks for the call. Please book the cancellation slot: 15 January, 09:00-11:00, diagnostic call-out at the fixed £168 inc VAT, at 7 Mallowmere Walk. Any parts or repair work must be quoted to us before starting. Access: the tenant, Leah Venn, needs at least 30 minutes' notice and a direct phone call before you arrive, and please call from outside rather than knocking, as she needs extra time to answer the door. We hold no key. Please don't use or advise on the plug-in heater. We are confirming access with Leah now and will tell you straight away if anything changes.

**A5 · send_message → Leah Venn (tenant) via sms, existing thread (event 018 portal / event 013 SMS)** (verified)

> Hi Leah, we've booked Brackenridge Heat Services to look at your heating tomorrow, Wed 15 Jan, 9-11am. The landlord has agreed the cost of the visit. The engineer has been asked to phone you at least 30 minutes before arriving and to call from outside. Please reply to confirm you can be in, or tell us if not. Any repair beyond the check will be quoted first. Please keep avoiding the hot plug-in heater. We haven't yet been able to arrange a heater or transport; we're still asking the landlord and suppliers, and will update you by 9am tomorrow. If you stay with your niece, please check the step-free entrance first. If you feel unwell, call 999 or NHS 111.

**A6 · send_message → Owen Pike (landlord) via email, agency landlord record** (verified)

> Hi Owen, under your standing £250 urgent-repair authority (your email of 14 Jan) we've booked Brackenridge Heat Services for a diagnostic on 15 Jan, 9-11am, fixed £168 inc VAT. The tenant has no heating, indoor temperature 10°C at 16:25, and has a mobility impairment, so we're treating it as urgent. Parts or repairs aren't included; anything beyond the remaining £82 will come to you for consent first. Temporary heaters, transport or accommodation aren't covered by that authority, so we need your decision: would you approve a heater delivery or alternative stay for Leah? Please reply by 9am on 15 Jan.

## Escalation
- **P2 → maintenance** (verified): Vulnerable tenant (mobility impairment) with no heating at 10°C; interim heating/transport/accommodation has no spending authority
  - Known: Heating off since 14 Jan (event 001), 12°C then 10°C (events 008, 018). Diagnostic booked 15 Jan 9-11am, £168 (A2, A3). £250 incident authority covers repair only (event 007, 014). Duty file records no limit for temporary equipment, transport or accommodation (event 017). Tenant's own heater unsafe, not used. Niece's step-free access unconfirmed.
  - Missing: Landlord decision on interim measures; approved supplier for heater delivery; niece's step-free access.
  - Options: Approve delivery of a safe heater via approved supplier tonight; Fund transport/accommodation if niece's home is step-free; Landlord approval first, then arrange
  - Recommendation: Authorise a safe heater delivery tonight and contact the landlord by phone; tenant was promised an update by 9am tomorrow.
  - Deadline: 2025-01-14 evening

## What this does not establish
- Booking the diagnostic does not fix the fault, approve any repair or parts, or cover temporary heating, transport or accommodation
- Tenant has not yet confirmed this specific window; she agreed in principle to 15 Jan with 30 minutes' notice and a call
- Brackenridge has not yet confirmed the booking in writing

## Remaining work
- Tenant confirmation of 15 Jan access
- Contractor confirmation of booking
- Interim heating decision (human/landlord)
- Quote for any repair, within the remaining £82 or to landlord
- Cancel 17 Jan offer if still held

## Missing or unavailable information
- Whether niece's entrance is step-free
- Landlord's view on interim arrangements
- Approved heater suppliers

## Conflicts between sources
- Appointment dates 17 Jan (event 006) vs 15 Jan (events 012, 019): treated 15 Jan as the later genuine slot; tenant cannot do 17 Jan
- Landlord's 'quote first' (event 010) vs clarification keeping £250 authority (event 014): trusted the later clarification

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Diagnostic booked for 15 Jan 9-11am (assigned this run). Outstanding: tenant's confirmation of access, contractor confirmation, interim heating/transport with no authority, any repair quote.

**2. What is the next action, who is it for, and through which channel?**

Contractor email to book the slot; SMS to Leah to confirm access; email to Owen Pike for interim decision; all done.

**3. Does anything need a human decision, and why?**

Yes: P2 escalation ESC-104, because temporary heating, transport or accommodation for a vulnerable tenant has no spending authority on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-014","decision":"conditional","cap_gbp":250,"conditions":"Urgent-repair incident limit £250 inclusive of diagnostic, labo… | 1 | ✅ verified | Ticket NBL-014 read back after record_landlord_decision |
| A2 | `assign_contractor` | {"ticket_ref":"NBL-014","contractor":"Brackenridge Heat Services","visit_window":"2025-01-15 09:00-11:00"} | 1 | ✅ verified | Ticket NBL-014 read back at stage visit |
| A3 | `set_visit` | {"ticket_ref":"NBL-014","datetime":"2025-01-15 09:00","slot_text":"Wednesday 15 January, 9-11am","access":"tenant_home","confirmed_by":"assi… | 1 | ✅ verified | Ticket NBL-014 read back after set_visit |
| A4 | `send_message` | {"recipient_name":"Daniel Hart","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 call / event 012 email… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Leah Venn","recipient_role":"tenant","channel":"sms","contact":"existing thread (event 018 portal / event 013 SMS)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Owen Pike","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-014","body"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Vulnerable tenant (mobility impairment) with no heating at 10°C; interim heating/transport/a… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |
| A8 | `schedule_follow_up` | {"ticket_ref":"NBL-014","due_on":"2025-01-15","purpose":"Confirm tenant access for 9-11am visit, landlord answer on interim heating, and vis… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
