# Case 026: ANSWER

**Outcome:** action_taken · **Severity:** routine

Routine oven repair: the main oven element does not heat, the grill works, and no safety risk was reported. The landlord approved a contractor, and a visit was tentatively booked for 30/08/2025 10:00, but the records conflict on tenant name, phone, contractor and day. I asked the tenant by SMS to verify identity and confirm contact and visit day, and escalated the record conflicts to maintenance (ESC-102) before anything else is sent.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Routine oven fault reported and approved by landlord. Contractor contact occurred (call at 20:21) and a slot was selected (30/08/2025 10:00), with emails sent. Outstanding: verifying the tenant identity and contact, confirming the contractor (Keystone Compliance vs Riverside Works), confirming the visit day (30/08/2025 is a Saturday, but the contractor offered Monday), and creating a ticket record, which does not exist in the system.

**2. What is the next action, who is it for, and through which channel?**

SMS to the tenant (07700 900721, the only tenant number tied to the contractor record) asking for name and DOB verification, the best phone number, and visit-day confirmation (REQ-101). Maintenance escalation ESC-102 covers the contractor and records clean-up. No message to the contractor until the tenant confirms, to avoid disclosing details to unverified parties.

**3. Does anything need a human decision, and why?**

Yes, but not urgent. Maintenance must resolve which contractor is attending, correct the tenant record, and decide whether to keep or rebook the 30/08 slot. This is a booking and records conflict, not a safety issue, so P3 is appropriate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara (tenant, Flat 3, 3 Willowmere Road)","recipient_role":"tenant","channel":"sms","contact":"07700 900721","questions"… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Oven repair (routine, electric main oven not heating; grill works) has a booking, but the re… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P3 → maintenance** (verified): Oven repair (routine, electric main oven not heating; grill works) has a booking, but the records conflict on who the tenant is, which contractor is attending, and when. Needs someone to clean up before the visit.
  - Known: Routine appliance fault reported 26 Aug 2025 by the tenant at Flat 3, 3 Willowmere Road. Landlord (Palmer) approved the contractor at 17:28. Keystone Compliance was assigned and emailed. A call on 20:21 from Isaac Palmer of Riverside Works offered a Monday 10-12 slot. The agency then booked 30/08/2025 10:00 and emailed Keystone Compliance and the tenant. No ticket record exists in the system (list_tickets is empty), so no booking can be confirmed there.
  - Missing: 1) Tenant name: the email says Clara; the 17:35 and 20:53 emails say Ruben Oakley; the call says Grace Mercer. 2) Tenant phone: 07700 900721 (contractor email) vs 07700 900077 (labelled as a code). 3) Contractor: Keystone Compliance (assigned) vs Riverside Works (caller). 4) Date: 30/08/2025 is a Saturday, but the contractor offered Monday. 5) No ticket reference or ledger confirmation for the booking.
  - Options: Confirm the tenant identity and contact, then confirm the correct contractor and a Monday 1 Sept 10-12 or other agreed slot, and re-send one corrected email to the tenant and contractor.; Cancel the 30/08 booking and rebook through the confirmed contractor once the tenant replies.
  - Recommendation: Hold the appointment details as unconfirmed. Verify the tenant by SMS, correct the contact and name records, confirm the contractor and day, then send one corrected confirmation to the tenant and contractor. Do not send the tenant's details or access codes to anyone until the tenant is verified.

## Failed or unverified actions
_None._
