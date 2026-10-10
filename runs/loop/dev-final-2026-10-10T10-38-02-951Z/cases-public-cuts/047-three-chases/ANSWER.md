# Case 047-three-chases: ANSWER

**Outcome:** escalated · **Severity:** routine

The routine window repair has been stalled since Oscar Turner was assigned on 1 Mar. He ignored four email and SMS chases. I phoned him, updated the tenant, and sent a P3 escalation to maintenance covering reassignment.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

This is a routine job. The toilet issue was resolved by the tenant. The window repair was assigned to Oscar Turner on 1 Mar, and the landlord never replied. The contractor hasn't confirmed a visit after 3+ reminders, and no visit is booked.

**2. What is the next action, who is it for, and through which channel?**

Done: a phone call to the contractor, and an email to the tenant asking whether he has been in touch, giving a 14-day target and asking for access times. Next: reassign if the contractor is still silent.

**3. Does anything need a human decision, and why?**

Yes, at P3. A human decides whether to reassign the job to another contractor if there is no reply. The landlord's contractor preference is unknown and the ticket system has no record.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"phone_call","body":"Oscar, we've emailed and texted you four times… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","body":"Dear Eliza, I'm sorry about the wait with your bedroom… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Contractor unresponsive after 4 chases over 9 days; may need reassignment","known":"Window r… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Escalations
- **P3 → maintenance** (verified): Contractor unresponsive after 4 chases over 9 days; may need reassignment
  - Known: Window repair (routine) at Flat 24, 150 Copperfield Walk, raised 21 Feb. Oscar Turner assigned 1 Mar. Email and SMS reminders on 4, 6 and 8 Mar got no reply. Toilet issue was resolved by the tenant. Landlord Isaac Oakley never replied about the window or contractor preference. His earlier email mentioned a plumber visiting a different address (Flat 18, 88 Alder Lane). SMS sender names are inconsistent (Meadow Solutions and Northbridge Lettings). No tickets exist in the ticket system. Today I phoned the contractor and emailed the tenant.
  - Missing: Whether the contractor has contacted the tenant. Whether the landlord has a preferred contractor. Why the ticket system holds no record.
  - Options: Wait for the contractor's reply to today's call, then reassign if there is none by 12 Mar; Reassign now to another approved contractor; Ask the landlord for a preferred contractor
  - Recommendation: Give the contractor until 12 Mar, then reassign to another approved contractor and tell the tenant and landlord. Also check the landlord's record and the ticket record.

## Failed or unverified actions
_None._
