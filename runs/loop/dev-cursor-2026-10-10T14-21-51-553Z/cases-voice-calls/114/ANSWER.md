# Case 114: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The bedroom window job has been stalled since 1 March. Oscar Turner was assigned but never booked it, after seven reminders. He now offers Thursday 11 April, but only if the landlord confirms the job is his. The landlord has never approved this job: his only reply named a different property. I asked the landlord to confirm, told the tenant and contractor the visit is not confirmed, and set a follow-up.

## Where the case stands
Stage: visit, on hold waiting for the landlord. The contractor's conditional date of 11/04 is recorded in the system. No landlord authority is on record for this property. Outstanding: the landlord's answer (own contractor or ours), time slot and tenant access.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm own contractor or ours for Flat 24 by 11 April 12:00 | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit is unconfirmed and ask for best contact details | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | CHASE_PROVIDER | Tell contractor not to attend until landlord confirms | Oscar Turner, contractor | email | A3 ✅ |
| 4 | WAIT | Follow up with landlord on 11 April, chasing by SMS/phone if there is no reply | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Bedroom window at Flat 24, 150 Copperfield Walk won't close properly. Please confirm: has your own window contractor attended or will they attend THIS flat, or may we use our assigned contractor, Oscar Turner?
> 
> Options: Yes, use our contractor Oscar Turner (he has offered to attend Thursday 11 April, time to be confirmed); No, I'm arranging my own contractor for Flat 24 - please give name and date; Tenant to arrange
> 
> Update: Your email of 22 Feb named a different property (Flat 18, 88 Alder Lane) for a plumber, so we haven't treated it as a decision on this flat. The toilet issue was fixed by the tenant. Our contractor heard second-hand from a neighbour that your own window contractor is doing the job; nothing is confirmed. Nothing is booked until you reply; please answer by 12:00 on 11 April, or we will chase by phone/SMS.

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the long delay on your bedroom window. Our contractor, Oscar Turner, has said he could come on Thursday 11 April, but this is NOT confirmed yet: we are checking with the landlord whether he or his own contractor is doing the job. Please don't expect anyone until we confirm a time with you. Could you also tell us the best number and times to reach you, as Oscar couldn't get through? We'll update you by end of Friday 12 April at the latest. In the meantime, please keep the window as secure as you can.

**A3 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Hi Oscar, thanks for speaking today. We've noted you're free all day Thursday 11 April for the bedroom window at Flat 24, 150 Copperfield Walk. Please do not attend yet: we've asked the landlord to confirm the job is still yours and have not yet heard back. We'll email or ring you with a time slot once confirmed, or tell you if it is cancelled. The tenant's number on file is 07700 900447.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked with set_visit, and the contractor was not authorised to attend.
- Nothing confirms who is doing the repair, who pays, or the cause of the fault.
- The toilet issue is treated as resolved by the tenant.

## Remaining work
- Landlord reply, needed by 11/04 12:00 (owner: landlord, then agency chase by SMS/phone)
- Then either confirm Oscar Turner with a slot and access, or record own_contractor and get the contractor's name and date
- Update the tenant by 12 April
- Check what 'Dawson' in the hold comments refers to

## Missing or unavailable information
- Landlord's decision for Flat 24
- Whether the landlord's own contractor has attended
- Tenant's best contact number and times

## Conflicts between sources
- Landlord's reply (event 010) names Flat 18, 88 Alder Lane, not this property: treated as not about this job.
- Contractor says a neighbour told him the landlord's own contractor is doing the job; no landlord confirmation.
- Event 033 records the visit as 'confirmed by contractor', but the contractor made it conditional on landlord confirmation.
- Hold comments mention 'Dawson', which is unexplained, and the hold reason changed between provider and landlord.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Routine window repair for Flat 24, stalled. Contractor Oscar Turner offered 11 April all day, conditional on landlord confirmation. Landlord approval is missing, and the route is unclear because the contractor heard second-hand that the landlord's own contractor is doing it. The tenant is unconfirmed on any visit.

**2. What is the next action, for whom, via which channel?**

Ask the landlord (Isaac Oakley) by email to confirm whether his own contractor is attending Flat 24 or whether ours may proceed (APR-101). Tenant (email) and contractor (email) are told the visit is unconfirmed. Chase the landlord by SMS/phone on 11 April if there is no reply (FUP-104).

**3. Does anything need a human decision?**

No. This is a routine landlord question and a dated follow-up. Escalate to P2/P3 maintenance only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-114","decision_needed":"Bedroom window at Flat 24, 150 Copperfield Walk won't close properly. P… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-114","due_on":"2024-04-11","party":"Landlord","purpose":"If no landlord reply by midday, chase by SMS/phone; then confirm… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-114","note":"Route unclear. Landlord's only reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ - different property, not… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
