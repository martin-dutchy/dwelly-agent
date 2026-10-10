# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the key and lock replacement with four keys on 2024-11-21 and Alder Compliance was assigned. On 2024-11-22 the provider asked for the tenant's contact details to book the visit; I sent the contact on file with its calling code to the provider, asked the tenant for her best number and times, returned the job to auto, and set a review for 2024-11-25.

## Where the case stands
Ticket NBL-021 (mp_time). Landlord Quinn approved the lock replacement and four new keys on 2024-11-21 (event 006). Provider Alder Compliance was assigned (event 010, 2024-11-21). No visit date is booked. On 2024-11-22 the provider asked for the resident's contact details to book the visit (event 015). Outstanding: tenant's direct number and availability; provider visit booking; lock replacement and four keys (two tenant, one office, one landlord).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Reply to Alder Compliance with the contact on file exactly as written (07700 900625, enter this code when calling) and say we are confirming the tenant's best number and times and that the work is approved. | Alder Compliance, contractor | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant Clara Jenkins for her best contact number and available times for the lock replacement visit, and say Alder Compliance will contact her. | Clara Jenkins, tenant | email | A2 ✅ |
| 3 | OTHER | Return the job to auto mode after handling the provider message. | internal | internal | A3 ✅ |
| 4 | WAIT | Review on 2024-11-25 whether the provider has booked a visit and the tenant has replied; chase the provider if no date is set. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 012 email)** (verified)

> Dear Alder Compliance,
> 
> Thank you for your message about Flat 22, 148 Lantern Quay, Westmarsh, ZZ4 1ZZ (Key Replacement Request, tenant Clara Jenkins).
> 
> The contact on file for the tenant is: 07700 900625 (enter this code when calling)
> 
> We are also confirming the tenant's direct number and best times with the tenant, and will pass these on to you once we have them. Please arrange the visit with the tenant as soon as possible. The landlord has approved the lock replacement and four new keys.
> 
> Kind regards,
> Northbridge Lettings

**A2 · send_message → Clara Jenkins (tenant) via email, existing thread (event 011 email)** (verified)

> Dear Clara,
> 
> Thank you for letting us know about the broken key for the conservatory back door. The landlord has approved replacing the lock and providing four new keys.
> 
> Our maintenance provider, Alder Compliance, will contact you to arrange a visit. So they can reach you easily, could you please reply with the best phone number to call and the times that suit you best?
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the contact on file does not confirm a visit date or any completed work.
- The tenant's direct number has not been verified.
- No cost or quote exists, so the cost of the lock and keys is not yet known.
- Key handover to the office and the landlord has not happened and is not established.

## Remaining work
- Tenant to reply with best number and times (agency owns the chase).
- Alder Compliance to contact tenant, book the visit and report the result; quote if the work needs one.
- Keys: confirm the two office/landlord keys reach the office.
- Invoice and final checks, then close with tenant confirmation and landlord informed.

## Missing or unavailable information
- Tenant's direct phone number and availability.
- Provider visit date.
- Lock/key cost (no quote yet; the approval gave no cap).
- Attachment-85-document referenced at event 012 is unavailable and was not seen.

## Conflicts between sources
- The job description says the contact should be the tenant's, but the provider's contact line gives a number with a calling code; I passed it on exactly as written and did not treat it as verified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Alder Compliance, but no visit is booked. The provider needs the tenant's contact and availability. Outstanding: the visit, the lock replacement, the four keys (two tenant, one office, one landlord), the invoice and final checks.

**2. What is the next action, who is it for, and through which channel?**

Email to Alder Compliance with the contact on file (A1); email to tenant Clara Jenkins asking for her best number and times (A2); resume auto (A3); review on 2024-11-25 (A4).

**3. Does anything need a human decision, and why?**

No. The landlord's approval covers the work with no spend cap, and the steps are routine. Escalation is only needed if the cost later exceeds what the landlord agreed or the visit fails.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 012 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-021","due_on":"2024-11-25","party":"Alder Compliance","purpose":"Check Alder Compliance has contacted the tenant and a vi… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
