# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The communal garden and hedge job is still open. The landlord approved it and Riverside Services is doing it, but completion is unconfirmed and tree removal has been raised as extra work. I asked the contractor for written completion and scope, asked the landlord to decide on the tree removal, updated the tenant, and escalated the landlord contact and agent name conflicts. The job stays on hold until 18 Dec.

## Where the case stands
Ticket NBL-001 (Flat 26, 46 Copperfield Walk) is at mp_time and on hold, waiting for the provider. Landlord approved the works on 3 Nov 2025 (event 022). Riverside Services (Freya) is doing the works, and the landlord pays the contractor directly. Completion is not confirmed. On 11 Dec a call (event 042) raised tree removal, which is outside the approved garden, weeds and hedge scope.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Riverside Services (Freya) in writing to confirm whether the garden, weeding and hedge work is complete, with date and photos; and to say whether tree removal is included, with a quote and a nesting-bird check. | Freya, Riverside Services, contractor | phone_call | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to approve or decline the tree removal, and to confirm the correct landlord contact. | Rowan, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the works are with Riverside, that we are checking completion and any extra tree work, and that no completion date is confirmed yet. | Henry, tenant | email | A3 ✅ |
| 4 | WAIT | Keep the job on hold until 2025-12-18, then review it. | internal | internal | A4 ✅ |
| 5 | ESCALATE_TO_HUMAN | Human to confirm the landlord contact and agent name, and decide on the tree removal scope. | management team | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Freya, Riverside Services (contractor) via phone_call, existing thread (event 042 call, 2025-12-11)** (verified)

> - Has the communal garden, weeding and hedge work at Flat 26, 46 Copperfield Walk been completed? If so, please send written confirmation with the completion date and photos.
> - Is tree removal now part of the job? If so, please confirm the tree, the quote amount and whether nesting birds (the pigeon noted on 30 Nov) have been checked.
> - Who will invoice the landlord, and please send the invoice details to the landlord directly, not via any new bank details.
> 
> Why: The job is on hold waiting for the provider to confirm completion. The 11 Dec call mentioned tree removal and invoicing, but neither completion nor scope was confirmed.

**A2 · request_landlord_approval → Rowan (landlord per agency emails, events 004 and 009; event 022 names Felix Kendall, please confirm) (landlord)** (verified)

> Approve or decline the added tree removal work (not in the approved garden, weeds and hedge scope), and confirm who is the landlord contact on this property. Riverside Services quote for the tree is not yet received.
> 
> Options: Approve tree removal once Riverside Services sends a written quote and nesting birds are confirmed clear; Decline tree removal and keep to the approved hedge and weed scope

**A3 · send_message → Henry (tenant) via email, existing thread (event 025 email)** (verified)

> Hello Henry,
> 
> Thank you for your patience with the communal garden and hedge works at Flat 26, 46 Copperfield Walk. Riverside Services is the contractor for this work. We are checking with them now on whether the work is finished and whether any extra tree work is needed. We will let you know as soon as we have an update. We don't have a confirmed completion date yet.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
- **P3 → management** (verified): Scope has moved from garden/hedge clearance to tree removal, and the landlord contact and agent names conflict across records. A human should confirm the landlord contact and who is managing the job.
  - Known: Ticket NBL-001 is on hold (Waiting for Provider). Landlord approved the works on 3 Nov (event 022). Riverside Services (Freya) is doing the works, and the landlord pays the contractor directly. On 11 Dec, Leo and Freya discussed tree removal, invoicing and completion (event 042), but no completion was confirmed.
  - Missing: Whether the tree removal is approved and quoted. Whether the work is complete. The correct landlord name (Rowan in events 004 and 009; Felix Kendall in event 022). The agency name (Northbridge Lettings vs Juniper Homes in event 039).
  - Options: Confirm landlord contact and approve or decline the tree removal (APR-102); Close the job once Riverside confirms completion and the landlord has been told
  - Recommendation: Keep the job on hold. Chase Riverside for written completion. Only approve tree removal with a written quote and a nesting-bird check.

## What this does not establish
- Sending the messages and requests does not confirm that the garden work is complete.
- Nothing here approves the tree removal or any spend.
- The invoice and who pays are not confirmed; the ticket name indicates the landlord pays the contractor directly, but no invoice has been recorded.
- Calling and messaging the contractor is not a confirmation that the contractor will reply.

## Remaining work
- Riverside Services to confirm in writing whether the work is complete (owner: Riverside Services, chase via the agency).
- Landlord to decide on tree removal (APR-102), and the landlord contact to be confirmed (owner: landlord and management).
- Tenant to receive the outcome once the work is confirmed (owner: agency).
- Close the ticket once completion is confirmed and the landlord is told (owner: agency).

## Missing or unavailable information
- Written confirmation that the garden, weeding and hedge work is finished.
- Whether tree removal is in scope, its quote, and the nesting-bird check.
- Correct landlord name (Rowan or Felix Kendall) and the agency name (Northbridge Lettings or Juniper Homes).
- The invoice, if any.

## Conflicts between sources
- Landlord name: Rowan (events 004, 009) vs Felix Kendall (event 022). Ledger does not resolve this; flagged to management.
- Agency name: Northbridge Lettings (most emails) vs Juniper Homes (event 039). Flagged to management.
- Event 036 says no tenant contact is needed because the job is external, but the tenant reported it and was told about the works in event 025. I followed the tenant-facing record and sent an update.
- Event 042 mentions tree removal, while the original request and approval covered weeds and hedges only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

On hold for the provider (Riverside Services). The garden, weeding and hedge works were approved on 3 Nov and started around 20 Nov, but no completion is confirmed. Outstanding: written completion, a decision on the tree removal, and confirmation of the landlord contact.

**2. What is the next action, who is it for, and through which channel?**

Phone Freya at Riverside Services (existing contact from event 042) for completion and tree scope. Ask the landlord Rowan by approval request (APR-102) to approve or decline tree removal. Email the tenant Henry on the existing thread with an update and no promised date. Review on 18 Dec.

**3. Does anything need a human decision, and why?**

Yes. Management must confirm the landlord contact (Rowan or Felix Kendall) and the agent name (Northbridge Lettings or Juniper Homes), because the records conflict (ESC-104). The landlord must decide on tree removal, which is outside the approved scope and has no quote yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Freya, Riverside Services","recipient_role":"contractor","channel":"phone_call","contact":"existing thread (event 042 cal… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Rowan (landlord per agency emails, events 004 and 009; event 022 names Felix Kendall, please confirm)","decision_needed":"Appro… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Henry","recipient_role":"tenant","channel":"email","contact":"existing thread (event 025 email)","body":"Hello Henry,\n\n… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Provider","comment":"Waiting for Riverside Services (Freya) to confirm in… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |
| A5 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Scope has moved from garden/hedge clearance to tree removal, and the landlord contact and age… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
