# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden works are still waiting for landlord approval, which the system record shows as required and not given. I have asked the landlord to decide between approving Harbour Compliance at a stated cap or arranging his own contractor by 20 March 2025, and I have updated the tenant on the existing thread. The job stays on hold until 20 March.

## Where the case stands
Routine garden works request, ticket NBL-019-landlord-own-contractor, stage init, on hold as Waiting for Landlord (review 2025-03-20). No landlord approval is recorded on the system record, and no contractor is assigned. The tenant chased on 13 March 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord Jenkins to confirm in writing whether to approve Harbour Compliance (our notes say £500 + VAT, unverified) or to arrange his own contractor, by 20 March 2025. | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant that the landlord is still being asked to decide, that we have asked for a reply by 20 March, and that no work date can be given yet. | Tenant, Flat 25, 185 Copperfield Walk | sms | A2 ✅ |
| 3 | WAIT | Review the job on 2025-03-20; if the landlord has not replied, escalate to management for a different route to the landlord. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord, Flat 25, 185 Copperfield Walk) (landlord)** (verified)

> Approve the garden works requested by the tenant (remove rubbish and construction waste, level the ground, lay gravel/stone covering, make the garden safe and usable). Our notes from 31 Jan 2025 record a £500 + VAT figure and Harbour Compliance, but there is no written quote or landlord approval on the system record, so please confirm. Alternatively, confirm that you will arrange the work with your own contractor. (£500)
> 
> Options: Approve Harbour Compliance to carry out the works, up to a stated cap (our notes say £500 + VAT; please confirm the figure in writing); Arrange your own contractor and tell us who and when so we can update the tenant; Decline or ask us to obtain a fresh quote

**A2 · send_message → Tenant, Flat 25, 185 Copperfield Walk (tenant) via phone_call, existing thread (event 018 tenant phone call)** (verified)

> Thank you for chasing, and sorry for the wait. We are still waiting for the landlord to confirm how the garden work should go ahead. We have asked them to reply by 20 March 2025 and will update you as soon as we hear back. We cannot give a date for the work until that decision is made. If anything changes in the garden that makes it unsafe, please tell us straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The £500 + VAT figure and Harbour Compliance come only from an internal note of 31 Jan 2025; no written quote or landlord approval is on file, so they are not confirmed.
- Sending the approval request does not mean the landlord has agreed to anything.
- No contractor has been assigned or booked and no visit date exists.
- No cost, outcome or completion date has been confirmed to the tenant.

## Remaining work
- Landlord decision on approval (approve Harbour Compliance at a stated cap, or own contractor), owned by Jenkins.
- If approved: obtain a written quote, record it, assign the contractor and book a visit with the tenant's access.
- If the landlord arranges his own contractor: record the decision, keep the tenant informed, and close without payment once the work is confirmed.
- Review on 2025-03-20.

## Missing or unavailable information
- Landlord's written approval and spend cap.
- Written quote or confirmed scope and cost from Harbour Compliance.
- Verified landlord contact channel: the phone and email attempts in events 003, 012 and 017 went unanswered.
- Pictures of the garden: the attachments are unavailable.

## Conflicts between sources
- Event 009 (31 Jan 2025 note) says the landlord approved £500 + VAT and Harbour Compliance was going ahead. The current ticket record shows landlord_approval required, and later events (010-018) show the landlord still unreached. I trusted the current system record: approval not given.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Intake is complete, but the job is stalled at landlord approval. The ticket is at stage init with landlord_approval required and is on hold, waiting for Jenkins. The 31 Jan note saying the landlord approved £500 + VAT with Harbour Compliance conflicts with the system record and is unverified. Outstanding: the landlord's decision, then a written quote, contractor assignment and visit, or the landlord's own arrangement.

**2. 2. What is the next action, who is it for, and through which channel?**

Request landlord approval from Jenkins (approve Harbour Compliance at a stated cap, or own contractor), with a reply by 20 March 2025. Updating the tenant on the existing thread that we are still waiting for the landlord and cannot give a date yet. Review the hold on 2025-03-20.

**3. 3. Does anything need a human decision, and why?**

Not yet. The decision belongs to the landlord, and it is routine, so no escalation now. If there is no reply by 20 March, escalate to management to find another route to the landlord, since the landlord has not responded to email or phone attempts since January.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins (landlord, Flat 25, 185 Copperfield Walk)","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Approve th… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 25, 185 Copperfield Walk","recipient_role":"tenant","channel":"phone_call","contact":"existing thread (event… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Landlord Jenkins must confirm approval of garden … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
