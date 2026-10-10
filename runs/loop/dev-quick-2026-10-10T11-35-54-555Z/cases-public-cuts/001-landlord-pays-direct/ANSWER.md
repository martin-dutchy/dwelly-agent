# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the garden works and is using their own contractor, Freya at Riverside Services, who is paid directly by the landlord. The job is waiting for confirmation that the work is complete. The tenant, the contractor and the landlord have each been messaged, the job is on hold with a review date of 2025-12-15, and it will close without payment once completion is confirmed.

## Where the case stands
Ticket NBL-001-landlord-pays-direct is at the provider stage and on hold (Waiting for Provider, review 2025-12-15). The landlord approved the garden works (event 026) and is using their own contractor, Freya at Riverside Services, who is paid directly by the landlord. The last provider note (event 040) says the job is waiting for confirmation that all work is done. No completion confirmation, invoice or visit record is on file.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Recorded the landlord's decision as own_contractor, quoting their 5 Nov email ('works have been quoted & go ahead given'). | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant the works are being done by the landlord's own contractor and paid directly by the landlord, that completion is not yet confirmed, and that we will update them. | Henry, tenant | email | A2 ✅ |
| 3 | CHASE_PROVIDER | Asked Freya to confirm in writing the completion date, whether the tree work is included and finished, and who the invoice is addressed to. | Freya, Riverside Services (contractor) | email | A3 ✅ |
| 4 | CHASE_LANDLORD | Asked the landlord to confirm completion and whether the tree removal is part of the job and approved. | Leo Ashford, landlord | email | A4 ✅ |
| 5 | WAIT | Put the job on hold until 2025-12-15 and set a follow-up to chase Freya and the landlord, or close if confirmed. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Henry (tenant, Flat 26) (tenant) via email, existing thread (event 002 tenant request)** (verified)

> Hello Henry,
> 
> Thank you for your patience with the communal garden and hedge works at Flat 26, 46 Copperfield Walk.
> 
> Your landlord has arranged for their own contractor to carry out these works, and they are paid by the landlord directly. The contractor has been in touch with us recently about the work, and we are now asking them to confirm when it is finished. We do not yet have a confirmed completion date, so we cannot tell you whether the work is complete.
> 
> We will let you know once we hear back from the contractor and the landlord.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Freya, Riverside Services (contractor) via email, existing thread (event 039 call to Freya, 2025-12-10)** (verified)

> Hello Freya,
> 
> Following our call on 11 December about the communal garden and hedge works at Flat 26, 46 Copperfield Walk, Kingshaven, ZZ5 7ZZ, please could you confirm in writing:
> 
> 1. Whether the garden, hedge and weed clearance is now complete, and the date it was finished.
> 2. Whether the tree work discussed on the call is part of this job, and whether it is finished.
> 3. That your invoice will be sent directly to the landlord, and to whom it should be addressed.
> 
> Thank you.
> 
> Northbridge Lettings

**A4 · send_message → Leo Ashford / Landlord (landlord) via email, existing thread (event 026 landlord email)** (verified)

> Hello Leo,
> 
> Thank you. We have recorded that you are arranging the communal garden and hedge works through your own contractor, Freya at Riverside Services, and that the works are paid by you directly.
> 
> Please could you confirm:
> 1. Whether the works are complete, and the date they were finished.
> 2. Whether the tree removal discussed with Freya on 11 December is part of this job. If so, please confirm you have approved it.
> 
> We have asked Freya to confirm completion in writing. We will let the tenant know once we have your confirmation.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the own-contractor choice does not confirm the works are finished or what they cost.
- Booking or start dates in the emails are not confirmed by the provider and are not treated as visit bookings.

## Remaining work
- Freya to confirm completion in writing (Riverside Services). Due 2025-12-15.
- Landlord to confirm completion and tree-work approval (Leo Ashford). Due 2025-12-15.
- Once confirmed: tell the tenant, then close without payment (landlord pays direct), with the landlord informed via A4.

## Missing or unavailable information
- Completion date and evidence of the works.
- Whether the tree removal is in scope and approved.
- Invoice addressee and amount. The landlord pays direct, so none is expected on our file.
- Freya's and the landlord's direct contact details are not on the case file, so the existing email threads were used.

## Conflicts between sources
- The landlord is named Rowan (event 004), Felix Kendall (event 022), Grace Nolan (event 007) and Leo Ashford (event 026). I addressed the most recent landlord message's name, Leo Ashford.
- The call at event 039 says 'Leo from Juniper Homes', but the agency is Northbridge Lettings. Not resolved; needs checking.
- Event 033 says 'job starting today by landlord contractor', while event 035 says 'Maintenance provider assigned'. I treated Freya as the landlord's own contractor and did not assign our own contractor.
- Event 036 says 'external job ... not for the tenants so no contact needed', but the tenant raised this issue and was kept informed in earlier events.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Provider stage: the landlord's own contractor (Freya, Riverside Services) is doing the works. The landlord approved them on 5 Nov (event 026). The last provider note says the job is waiting for confirmation that all the work is done (events 038-040). Outstanding: Freya's written completion confirmation, the landlord's confirmation that the tree work is in scope and approved, and the tenant update.

**2. 2. What is the next action, who is it for, and through which channel?**

Email Freya (contractor) asking for completion date, tree-work status and invoice addressee (A3). Email the landlord, Leo Ashford, asking for completion confirmation and tree-work approval (A4). Email the tenant, Henry, with a status update (A2). Hold until 2025-12-15 and chase then (A6).

**3. 3. Does anything need a human decision, and why?**

No escalation now. The landlord is using their own contractor and pays direct, so the agency is not approving spend. Approval of the tree work belongs to the landlord, who has been asked. Escalate only if neither Freya nor the landlord replies by 2025-12-15, or the tree work is disputed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Yeah, I've asked Freya to let me know when she's … | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Henry (tenant, Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 002 tenant request… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 039 call to … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Ashford / Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 026 landlord emai… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Provider","comment":"Landlord's own contractor (Freya, Riverside Services… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","purpose":"Chase Freya and landlord for written completion confirmation a… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
