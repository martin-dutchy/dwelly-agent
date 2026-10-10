# Case 001: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord has approved the communal garden and hedge works, which their own contractor Riverside Services (Freya) is carrying out, so the agency is not assigning a provider. I recorded the landlord decision as own_contractor, messaged the landlord to confirm the tree removal scope, the completion date and direct invoicing, and told the tenant the date is not yet confirmed. The ticket is on hold until 2025-12-15.

## Where the case stands
Ticket NBL-001-landlord-pays-direct, stage mp_time. Landlord approval is recorded and the works are being done by the landlord's own contractor (Riverside Services / Freya), not by an agency-assigned provider. Nothing is confirmed on a start date, completion, or whether the tree removal is included. The ticket is on hold 'Waiting for Landlord' until 2025-12-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm whether the tree removal is approved extra work (and any spend limit), the start or completion date, and that Riverside Services invoices them directly. | Rowan (Landlord) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the works are with the landlord's contractor, the date is not yet confirmed, and we will update once the landlord replies. | Henry (Tenant, Flat 26) | email | A3 ✅ |
| 3 | WAIT | Hold the ticket until the landlord replies, with a review on 2025-12-15. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Rowan (Landlord) (landlord) via email, existing thread (event 026 email)** (verified)

> Hello,
> 
> Thank you for your update on the communal garden and hedge works at Flat 26, 46 Copperfield Walk, Kingshaven, ZZ5 7ZZ.
> 
> We have recorded that Freya at Riverside Services is carrying out the works through your own contractor arrangement. Could you please confirm:
> 
> 1. Whether the tree removal discussed with Freya is included in the approved works. If it is extra work, please confirm whether you approve it and any spend limit.
> 2. The start date, or the date the works were completed, once Freya confirms it.
> 3. That Riverside Services will invoice you directly, as we understand.
> 
> We will keep the tenants updated once we hear from you.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Henry (Tenant, Flat 26) (tenant) via email, existing thread (event 031 email)** (verified)

> Hello Henry,
> 
> Thank you for your patience with the communal garden and hedge works at Flat 26, 46 Copperfield Walk.
> 
> The landlord has arranged for their contractor, Riverside Services, to carry out the works. We are still waiting for the landlord to confirm the start or completion date, and for confirmation of whether the tree work is included. We will write to you as soon as we hear back.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not confirm the works' start, scope, quality or completion.
- The landlord's approval gave no spend cap, and no quote amount is on file; the attachments referenced at event 004 are unavailable.
- The tree removal discussed on 2025-12-11 (event 042) has not been approved by the landlord; it is not authorised work.
- Messages A2 and A3 were sent with the case ID rather than the ticket reference on the thread, but they were delivered and read back.

## Remaining work
- Landlord (Rowan) to confirm the tree removal scope and any spend limit, the start or completion date, and direct invoicing. Owner: landlord; chase on 2025-12-15.
- Once completion is confirmed by the landlord or Freya, close as without_payment (landlord pays direct), tell the tenant, and confirm with the landlord.
- Clean up the record: the 'Maintenance provider assigned' line (event 035) and the 'Juniper Homes' reference (event 039) conflict with Northbridge Lettings and the landlord's arrangement.

## Missing or unavailable information
- Start or completion date for the works.
- Whether the tree removal is included, and whether it is approved.
- Quote amount and the two attachments referenced at event 004 (unavailable).
- Who the landlord is: the history names Rowan, Felix Kendall, Grace Nolan and Leo Ashford.

## Conflicts between sources
- Landlord names differ across the history: Rowan (event 004 greeting), Felix Kendall (event 022), Grace Nolan (event 007), and Leo Ashford (signs event 026). I used the email thread on file and did not resolve the identity.
- The agency entry 'Maintenance provider assigned' (event 035) conflicts with the landlord's own-contractor arrangement (events 026, 033). I trusted the landlord's own words and did not assign a provider.
- Event 039 calls the agent 'Leo from Juniper Homes', but the agency is Northbridge Lettings. Unresolved.
- Event 007 reads as an agency note about a site meeting rather than a landlord message. I treated the approval as coming from event 022 and event 026.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

The landlord approved the works (event 026, 2025-11-05) and arranged their own contractor, Riverside Services (Freya). No start date, completion or invoice is confirmed. On 2025-12-11 Leo and Freya discussed tree removal (event 042), which the landlord has not approved. Outstanding: landlord confirmation of scope, spend and completion date; the provider's completion confirmation; and final close.

**2. 2. What is the next action, who is it for, and through which channel?**

Email to the landlord (Rowan) asking about the tree removal, the date and direct invoicing (A2). Email to the tenant (Henry) saying the date is unconfirmed and that we will update (A3). Hold until 2025-12-15 for the landlord's reply.

**3. 3. Does anything need a human decision, and why?**

No escalation now. The tree removal and any spend are the landlord's decision, and the landlord is being asked. Not an emergency. Escalate only if the landlord does not reply by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Yeah, I've asked Freya to let me know when she's star… | 1 | ❌ failed | Ticket 001-landlord-pays-direct not found on read-back |
| A2 | `send_message` | {"recipient_name":"Rowan (Landlord)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 026 email)","ticket_ref… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Henry (Tenant, Flat 26)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 031 email)","ticke… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Landlord's own contractor (Riverside Services / Freya) i… | 1 | ❌ failed | Ticket 001-landlord-pays-direct not found on read-back |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"Yeah, I've asked Freya to let me know when she's … | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-001-landlord-pays-direct","reason":"Waiting for Landlord","comment":"Landlord's own contractor (Riverside Services / Frey… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after put_on_hold |

## Failed or unverified actions
- A1: record_landlord_decision failed (wrong ticket ref, case ID used). Found the real ref NBL-001-landlord-pays-direct via list_tickets and re-ran it; verified as A5.
- A4: put_on_hold failed for the same reason. Re-ran with the correct ref; verified as A6.
