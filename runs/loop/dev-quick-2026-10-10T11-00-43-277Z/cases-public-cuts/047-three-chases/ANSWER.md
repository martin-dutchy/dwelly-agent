# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The window repair has stalled for about three weeks: the contractor has not replied to three reminders, no visit is booked, and the landlord has not approved spend. I chased the contractor, updated the tenant, asked the landlord for approval and a spend limit, put the job on hold until 13 March, and escalated to maintenance (ESC-103).

## Where the case stands
Stage mp_time, on hold for provider. Oscar Turner (assigned 2024-03-01) has not replied to three reminders and has not booked a visit. Landlord approval and spend limit for the window work are not on record.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Oscar Turner to confirm a booked visit or decline by 2024-03-13; no chargeable work until approved | Oscar Turner, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell Eliza Jenkins the window job is being chased and the visit date will be confirmed once booked | Eliza Jenkins, tenant | sms | A2 ✅ |
| 3 | CHASE_LANDLORD | Ask Isaac Oakley to approve the window repair with a spend limit, or use his own contractor; confirm his 22 Feb email was not about Flat 24 | Isaac Oakley, landlord | email | A6 ✅ |
| 4 | WAIT | Review provider hold on 2024-03-13; reassign if no reply and landlord approves spend | internal | internal | A4 ✅ |
| 5 | ESCALATE_TO_HUMAN | Maintenance team to decide on the stalled provider and missing landlord approval | maintenance team | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Oscar Turner,
> 
> We have sent three reminders about the Window Repair Request at Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ, and have not yet had a reply.
> 
> Please reply to this email by 2024-03-13 with either:
> 1. the date and time you have booked with the tenant, Eliza Jenkins (07700 900447), or
> 2. if you cannot attend, let us know so we can arrange another contractor.
> 
> The tenant reports the bedroom window does not close properly. We are still waiting for the landlord's confirmation before any quote is approved, so please do not carry out chargeable work until we confirm.
> 
> Kind regards,
> Northbridge Lettings

**A2 · send_message → Eliza Jenkins (tenant) via sms, 07700 900447** (verified)

> Hello Eliza, this is Northbridge Lettings about the bedroom window at Flat 24, 150 Copperfield Walk. We are chasing our contractor to arrange a visit and will confirm the date and time as soon as we have it. Our target is to get this booked within the next few working days. Thank you for your patience.

**A6 · send_message → Isaac Oakley (landlord) via email, existing thread (event 004 email)** (verified)

> Hello,
> 
> Thank you for your earlier email. We need two things for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ:
> 
> 1. Please confirm you approve us arranging a contractor to inspect and repair the bedroom window, which does not close properly. Please reply with the spend limit you are happy for us to approve for this work (including VAT), or tell us if you prefer your own contractor.
> 2. Your email of 22 February mentioned a plumber visit at a different flat (not this property). Please confirm that this was not meant for Flat 24.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Window repair open since 2024-02-21 with no visit booked. Provider Oscar Turner has not replied to three reminders, and landlord approval is not on record.
  - Known: Tenant Eliza Jenkins reports the bedroom window does not close (non-urgent, no safety risk reported). Provider assigned 2024-03-01 (event 016) without a recorded landlord approval. Reminders sent 03-04, 03-06, 03-08 with no reply. Landlord's 22 Feb reply concerned Flat 18, 88 Alder Lane.
  - Missing: Provider's availability; landlord approval and spend limit for this window job; whether the landlord email referred to the wrong property.
  - Options: Keep Oscar Turner and set a firm deadline of 2024-03-13 before reassigning; Reassign to another approved contractor once landlord approves; Ask landlord to use own contractor
  - Recommendation: Give Oscar Turner until 2024-03-13 to reply. If no reply, reassign to another contractor once the landlord has approved spend.
  - Deadline: 2024-03-13

## What this does not establish
- Messages do not confirm a visit date, cost, or landlord approval.
- The 2024-03-01 assignment was made without recorded landlord approval, so it is not valid approval.
- The landlord's 22 Feb email concerned a different flat.
- No quote, invoice or work result exists yet.

## Remaining work
- Provider to confirm visit or decline (review 2024-03-13).
- Landlord approval and spend limit, or own contractor.
- Confirm the 22 Feb email was about a different flat.
- Then visit, result, invoice, tenant confirmation and close.

## Missing or unavailable information
- Oscar Turner's visit availability.
- Landlord approval and spend limit.

## Conflicts between sources
- Landlord's 22 Feb email (event 010) concerns Flat 18, 88 Alder Lane, not this flat; trusted the property record and asked the landlord to confirm.
- Oscar Turner was assigned 2024-03-01 without recorded landlord approval; treated as not approved.
- SMS sender names vary (Ashford, Meadow Solutions, Northbridge Lettings); used Northbridge Lettings.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At mp_time on hold for the provider. No visit booked; landlord approval and spend limit missing. Outstanding: provider confirmation, landlord approval, visit, result, invoice, close.

**2. What is the next action, who is it for, and through which channel?**

Email Oscar Turner to confirm a visit or decline by 2024-03-13; SMS Eliza Jenkins with a status update; email Isaac Oakley for approval and spend limit. Review 2024-03-13.

**3. Does anything need a human decision, and why?**

Yes, routine: maintenance should decide whether to keep or replace the unresponsive contractor, and landlord approval is needed before chargeable work.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"sms","contact":"07700 900447","ticket_ref":"NBL-047-three-chases","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `update_ticket` | {"ref":"NBL-047-three-chases","note":"Three provider reminders (events 020, 022, 024) unanswered. Contractor Oscar Turner asked to confirm a… | 1 | ✅ verified | Ticket NBL-047-three-chases read back at stage mp_time |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Provider","comment":"Waiting for Oscar Turner to confirm a visit date with tenant… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Window repair open since 2024-02-21 with no visit booked. Provider Oscar Turner has not repl… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A6 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
- landlord message attempt 1: Blocked by policy for naming the Flat 18 address; resent without it (MSG-104, verified).
