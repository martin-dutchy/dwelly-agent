# Case 021: Key Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the lock replacement and the contractor was assigned. The contractor asked for the tenant's contact details, so I replied with them on the same thread and returned the ticket to auto mode. A follow-up is set for 2024-11-25.

## Where the case stands
NBL-021 at mp_time stage. Landlord approval confirmed, Alder Compliance assigned and acknowledged. The contractor asked for the tenant's contact details to book the visit. No visit is booked yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Replied to the contractor with the tenant's name and phone number, the job scope (lock plus 4 keys, 2 to the office) and the quote-first rule. | Alder Compliance, contractor | email | A1 ✅ |
| 2 | WAIT | Wait for the contractor to book the visit. Follow-up set for 2024-11-25 to chase if no booking. | Alder Compliance, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Alder Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, thanks for your message. The tenant is Clara Jenkins at Flat 22, 148 Lantern Quay, Westmarsh, ZZ4 1ZZ, phone 07700 900625 (as in our original email). Please call to agree a time that suits her. Job: replace the lock on the conservatory back door and supply 4 new keys: 2 for the tenants, and 1 each for the agency and landlord, which should be delivered to our office. The landlord has approved this work. If the cost would need a quote, please send it to us first and do not proceed until we approve. Please let us know the agreed visit time. Thank you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the contact details does not book a visit or confirm the cost.
- No quote has been received or approved. Any spend beyond the landlord's approval needs further approval.
- Key handover to the office is not yet confirmed.

## Remaining work
- Alder Compliance to contact the tenant and book the visit (contractor)
- Record the visit and work result afterwards (agency)
- Collect the office and landlord keys and arrange the landlord's key (agency)
- Invoice and close-out (agency)

## Missing or unavailable information
- The property record has no spend limit or landlord details.

## Conflicts between sources
- The ticket text is addressed to 'Clara' but reads as agency-to-agency. The tenant is recorded as Clara Jenkins, so I used that name.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Alder Compliance assigned. The contractor now has the tenant's contact details. The visit is still to be booked, then the work, the delivery of 4 keys and the invoice.

**2. What is the next action, who is it for, and through which channel?**

Reply to Alder Compliance (contractor) by email with the tenant's phone number and the job scope. This is done (MSG-101). Chase on 2024-11-25 if no visit is booked.

**3. Does anything need a human decision, and why?**

No. The work is routine, the landlord has approved it and the contractor is assigned.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `resume_auto` | {"ticket_ref":"NBL-021"} | 1 | ✅ verified | Ticket NBL-021 read back after resume_auto |
| A3 | `schedule_follow_up` | {"due_on":"2024-11-25","purpose":"Check Alder Compliance has booked a visit with the tenant for the conservatory lock and keys; chase if not… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
