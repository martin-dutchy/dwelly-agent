# Case 24: A verified tenant's repair the system dropped (AI phone line): ANSWER

**Decision:** action_taken · **Severity:** routine

The phone line verified Priya Shah, but a server restart lost the verification, so ticket creation was rejected and a P3 escalation (E-4901) was raised. I created JOB-101 by hand, assigned the usual appliance contractor within the £250 limit, and told the tenant, contractor and landlord.

## Where the case stands
JOB-101 at stage visit, assigned to East London Appliance Repairs; awaiting contractor's confirmed date with tenant. Follow-up 13 Oct. E-4901 handled by hand.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Follow up on 13 Oct that the contractor has confirmed a visit date with the tenant | East London Appliance Repairs, contractor | internal | A6 ✅ |
| 2 | REPLY_TO_TENANT | Sent reference JOB-101, 14-day target, safety note, asked if the wait is acceptable | Priya Shah, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, this is Northbridge maintenance following up on your call. Sorry, our phone system dropped your repair, so a colleague has logged it by hand. Your reference is JOB-101 (oven door hinge broken, door won't shut). We've passed it to East London Appliance Repairs, who we usually use. Our target is a visit within 14 days. They will contact you to agree a time, and we've noted you're in on weekday mornings. Nothing is confirmed until they do. Until it's fixed, please don't use the oven, and keep your cat away from the open door. Is waiting for that visit okay, or would you like us to ask for an earlier slot? We'll update you by Tuesday 13 October.

**A4 · send_message → East London Appliance Repairs (contractor) via sms, +447700900308** (verified)

> Job JOB-101, Flat 9, 3 Amhurst Road, London E8 2AU: oven door hinge snapped, door hangs open and won't shut. Please attend within 14 days; tenant Priya Shah is in weekday mornings and has a cat. Please contact her to agree a time and confirm the date to us. Landlord limit is £250 incl. VAT; send a quote first if likely above that.

**A5 · send_message → Daniel Price (landlord) via email, daniel.price@example.co.uk** (verified)

> Hi Daniel, the tenant at Flat 9, 3 Amhurst Road reports the oven door hinge has snapped and the door won't shut. We've booked it as routine job JOB-101 with East London Appliance Repairs, within your £250 limit, and asked them to quote first if it will cost more. No action needed from you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The assigned window of 13 Oct is a placeholder, not a confirmed visit; the contractor must confirm with the tenant.
- Does not establish the cost or the cause of the fault.
- Nothing here approves spend above £250.

## Remaining work
- Contractor to confirm the visit; agency to chase on 13 Oct
- Record result, quote or invoice after the visit
- Tenant to say whether the wait is acceptable

## Missing or unavailable information
_None._

## Conflicts between sources
- Caller first said 'Priya Shaw' (speech-to-text or slip) then confirmed Shah; DOB and phone match the CRM, so I treated her as verified.
- The phone line's handover said 'verified' while the system said not_verified; the cause was a server restart.

## Answers to the case questions
**1. What does the tenant need, and what did the phone line actually get done?**

She needs her oven door hinge repaired; the door hangs open and won't shut. The phone line verified her (name, DOB match CRM) but the ticket creation failed because a restart lost the verification. Nothing was logged and she was told a colleague would follow up.

**2. Why was E-4901 raised, and what do you do about it?**

The system rejected ticket creation (not_verified) after a deployment restart, not because of any identity problem. The verification is corroborated by the CRM record and the call-back to her number on file. I logged the ticket by hand as the policy requires, so the escalation needs no human decision.

**3. What actions do you take, and what do you tell the tenant?**

Created JOB-101 (routine, appliance), assigned East London Appliance Repairs, messaged the contractor and landlord, and set a follow-up for 13 Oct. I told the tenant about the system failure, gave her the JOB-101 reference and the 14-day target, said the contractor will agree a time, advised her not to use the oven and to keep the cat away, and asked whether the wait is acceptable.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"Priya Shah (T-1003)","description":"Oven door hinge snapped on the… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"East London Appliance Repairs","visit_window":"2026-10-13 08:00-12:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"East London Appliance Repairs","recipient_role":"contractor","channel":"sms","contact":"+447700900308","ticket_ref":"JOB-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Daniel Price","recipient_role":"landlord","channel":"email","contact":"daniel.price@example.co.uk","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"due_on":"2026-10-13","purpose":"Check East London Appliance Repairs has confirmed a visit date with Priya Shah for JOB-101; chase if not; … | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
