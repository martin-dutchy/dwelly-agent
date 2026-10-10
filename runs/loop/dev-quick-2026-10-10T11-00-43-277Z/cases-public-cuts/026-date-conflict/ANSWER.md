# Case 026: Oven Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The oven repair is approved and assigned, but the visit date is disputed: the system shows 30 Aug 2025 10:00-12:00, and the tenant says she agreed 8 Sept with the contractor. I asked the contractor to confirm the diary and whether anyone attended, told the tenant the date is being checked (target within 14 days), put the ticket on hold until 1 Sept, and escalated the record conflicts (names and phone numbers) to maintenance (ESC-103).

## Where the case stands
Routine oven repair (main element not heating, grill works). Landlord approved and Keystone Compliance assigned. A visit was booked for 30 Aug 2025 10:00-12:00, but the tenant says she agreed 8 Sept 2025 with the contractor. Ticket is on hold (Waiting for Provider) pending the contractor's confirmation of the correct date and whether anyone attended.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the diary date (30 Aug vs 8 Sept), whether anyone attended 30 Aug, and the correct tenant contact and attending company. | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the visit date is being confirmed with the contractor and that the target is within 14 days; no new appointment promised. | Clara (tenant), Flat 3 | email | A2 ✅ |
| 3 | WAIT | Hold the ticket until 1 Sept 2025 for the contractor reply; escalated for record clean-up and identity check. | internal | internal | A3 ✅ |
| 4 | ESCALATE_TO_HUMAN | Maintenance team to verify tenant identity and correct the tenant, contractor and phone records, then confirm the visit date. | maintenance team, internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (scheduling) (contractor) via email, existing thread (event 018 email)** (verified)

> Hello,
> 
> We have a conflict on the oven repair at Flat 3, 3 Willowmere Road, Alderwick, ZZ9 6ZZ. Our records show a visit booked for this morning, Saturday 30 August 2025, 10:00-12:00. The tenant has since told us she arranged the visit for 8 September 2025 with your team.
> 
> Please reply on this thread to confirm:
> 1. Which date your engineer has in their diary, 30 August or 8 September 2025.
> 2. Whether anyone attended this morning, and if not, whether a missed-appointment has been logged.
> 3. The correct contact number for the tenant and the name of the company that is attending.
> 
> We will not treat the visit as confirmed until we hear back from you. Thank you.

**A2 · send_message → Clara (tenant, Flat 3) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara,
> 
> Thank you for calling to check the date. We have asked Keystone Compliance to confirm their diary today, and whether a visit was made this morning. Our records still show 30 August, 10:00-12:00, so we are not treating that as settled.
> 
> We will confirm the correct date with you as soon as the contractor replies. Our target is to get the oven looked at within 14 days. If you have any questions in the meantime, please reply to this message.
> 
> Kind regards
> Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Oven repair visit date and contractor record conflict; needs a human to confirm the correct booking and clean up contact records.
  - Known: Fan oven main element not heating; grill works; routine severity. Landlord approved (event 009). Keystone Compliance assigned (events 012-014). System visit 30 Aug 2025 10:00-12:00 (events 017-019). Tenant called 30 Aug 14:02 saying she arranged 8 Sept 2025 (event 021). Messages sent to contractor and tenant (A1, A2); ticket on hold to review 2025-09-01 (A3).
  - Missing: Contractor's diary and whether anyone attended 30 Aug. Tenant's name is recorded as Ruben Oakley (events 013-014, 019), Clara (email, event 018) and Grace Mercer (event 016, 021). Contractor is named Keystone Compliance, Riverside Works, Keystone Utilities and Lantern Utilities. Phone numbers 07700 900721 and 07700 900077 are used for different purposes. Identity must be verified before any write.
  - Options: Confirm the correct visit date with Keystone Compliance and rebook via set_visit once confirmed; Verify the tenant's identity and correct the tenant and contractor records; Confirm whether the 30 Aug visit was missed and log the outcome
  - Recommendation: Hold the booking until Keystone confirms the date. Verify the tenant's identity and correct the contact records before any further messages or bookings.
  - Deadline: 2025-09-01

## What this does not establish
- Sending messages does not confirm the visit date, that the 30 Aug visit happened or was missed, or the fault cause.
- No new visit has been booked; the 8 Sept date is only the tenant's account and is unverified.
- Identity of the tenant is not verified; the records name her as Ruben Oakley, Clara and Grace Mercer.
- No quote, cost or landlord spend is established.

## Remaining work
- Contractor to confirm the correct date and whether 30 Aug was attended or missed (Keystone Compliance, by 1 Sept 2025).
- Maintenance team to verify tenant identity and correct the contact and contractor records (ESC-103).
- Once confirmed, book the visit with set_visit and record the outcome; then quote, repair and close as needed.

## Missing or unavailable information
- Correct visit date (30 Aug 2025 or 8 Sept 2025).
- Whether an engineer attended on 30 Aug 2025.
- Verified tenant identity and correct phone number.
- Correct contractor company name (Keystone Compliance, Riverside Works, Keystone Utilities or Lantern Utilities).

## Conflicts between sources
- Tenant name: Ruben Oakley (events 013, 014, 019), Clara (events 018, 001 signature), Grace Mercer (events 016, 021). Trusted: the tenant's own messages signed Clara; identity not verified.
- Visit date: system shows 30 Aug 2025 10:00-12:00 (events 017-019), tenant says 8 Sept 2025 agreed with contractor (event 021). Not resolved; contractor to confirm.
- Contractor name: Keystone Compliance (events 013-019), Riverside Works (event 016), Keystone Utilities (event 021), Lantern Utilities (event 020). Trusted: Keystone Compliance, as assigned.
- Phone numbers: 07700 900721 is listed as tenant contact (event 014) and as reschedule line (event 020); 07700 900077 is the contractor code (event 018). Not resolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Keystone Compliance, with a visit date in dispute (30 Aug 10:00-12:00 in the system vs 8 Sept per the tenant). Outstanding: the contractor's confirmation of the date and attendance, verification of the tenant's identity and records, then a booked visit, the repair and closure.

**2. What is the next action, who is it for, and through which channel?**

Email Keystone Compliance (existing thread) to confirm the date and attendance (A1). Email the tenant (existing thread, event 021 call) that the date is being checked, with a 14-day target (A2). Maintenance team to verify identity and records (A4, ESC-103).

**3. Does anything need a human decision, and why?**

Yes, at P3. The tenant identity and contractor and phone records conflict across the file, so a human must verify who the tenant is before any further writes or bookings. The date conflict is held until the contractor replies. No spend or safety decision is needed; the fault is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance (scheduling)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 e… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant, Flat 3)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Conflicting visit dates: system shows 30 Aug 2025 10:00-12:… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Oven repair visit date and contractor record conflict; needs a human to confirm the correct … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
