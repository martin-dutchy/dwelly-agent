# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the landlord approved by phone and will order parts tomorrow, but no landlord decision is on file and the landlord's written reply to the 2024-10-09 quote request is outstanding. I told the provider not to order yet and asked which company is quoting, asked the landlord for a written yes or no, and put the job on hold until 2024-10-11.

## Where the case stands
Check-out works (carpet replacement and repaint) at Flat 21, 11 Juniper Mews. A quote totalling £605 (£220 paint, £240 carpet, £100 bathroom vinyl, £45 sink waste; VAT status not stated) was sent to the landlord on 2024-10-09 (event 013) asking for a go-ahead. No written landlord reply is on file. The ticket is on hold, waiting for the landlord, review 2024-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Tell the provider not to order carpet or parts, and ask which company is quoting (Cedar Utilities on file or Sawyer on the quote), until written landlord approval is received. | Sawyer (Cedar Utilities), contractor | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord for a written yes or no on the £605 quote, since the provider's claim of a phone approval is not a landlord decision. | Oscar (landlord; event 014 names Ruben), landlord | email | A2 ✅ |
| 3 | WAIT | Hold the ticket for the landlord's reply, review on 2024-10-11. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Sawyer (Cedar Utilities) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer,
> 
> Thanks for your message. We have not yet received written approval from the landlord for the quote, so please do not order the carpet or any parts yet. We are confirming the approval with the landlord directly and will let you know as soon as we have their decision.
> 
> Could you also confirm which company is quoting for this job? Our job was sent to Cedar Utilities, but the quote came from Sawyer.
> 
> Thanks,
> Northbridge Lettings

**A2 · send_message → Oscar (landlord; event 014 names Ruben) (landlord) via email, existing thread (event 013 email)** (verified)

> Hi,
> 
> Following on from our email about Flat 21, 11 Juniper Mews, the contractor has told us you agreed by phone for the work to go ahead. We need your written confirmation before we instruct anyone.
> 
> The quote is £605 in total (£220 paint, £240 carpet, £100 bathroom vinyl, £45 sink waste).
> 
> Are you happy for us to go ahead with this quote? Please reply yes or no.
> 
> Thanks,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's email (event 015) that the landlord said go ahead is hearsay and is not recorded as approval.
- Sending the messages does not mean the landlord has approved the quote, and no contractor has been assigned or instructed.
- No visit date exists in the record; the tenant has not been contacted about the visit.
- Sending the quote figures does not confirm they are final or include VAT.

## Remaining work
- Landlord to give a written yes or no on the £605 quote (owner: landlord; review 2024-10-11).
- Provider to confirm the company name and to book the visit once approved (owner: provider).
- Resolve the landlord name conflict (Oscar in event 013, Ruben in event 014) before any approval is recorded.
- Once approved, assign the contractor and set up the visit with the tenant, then record the result, invoice and close.

## Missing or unavailable information
- Written landlord approval of the quote; no landlord reply is on file.
- Landlord's name (Oscar or Ruben) and contact details; the property record has none.
- Which company is quoting (Cedar Utilities or Sawyer).
- Whether the £605 figures include VAT (the quote does not say).
- Visit date and tenant contact outcome; no visit is booked in the record.

## Conflicts between sources
- Event 015 (provider) says the landlord approved by phone; no landlord record of approval exists. Trusted the absence of a landlord decision and asked the landlord in writing.
- Event 013 addresses the landlord as 'Oscar'; event 014 says 'Ruben'.
- Event 013 quote is from 'Sawyer'; the assigned provider is Cedar Utilities (events 003 and 005).
- Event 012 refers to a 'studio'; the property is Flat 21 (a flat).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The quote (£605 across four items) went to the landlord on 2024-10-09 for approval. No written decision is on file. The provider's email says the landlord approved by phone, which is hearsay and not recorded. No visit is booked and the tenant has not been contacted about the visit. Outstanding: landlord's written approval, landlord name conflict, provider company conflict, VAT status, and the visit.

**2. What is the next action, who is it for, and through which channel?**

(1) Email the provider (Sawyer / Cedar Utilities) to hold off ordering and to confirm the quoting company (ledger A1). (2) Email the landlord for a written yes or no on the £605 quote (ledger A2). The job is on hold with a review on 2024-10-11 (ledger A5).

**3. Does anything need a human decision, and why?**

Not yet. The landlord decision is theirs and they have not replied; the wait is within the 3-day window, so chasing is premature. Escalate if the landlord is silent after the 2024-10-11 review, or if the provider's phone-approval claim turns out to conflict with the landlord's reply.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Sawyer (Cedar Utilities)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Oscar (landlord; event 014 names Ruben)","recipient_role":"landlord","channel":"email","contact":"existing thread (event … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Landlord has not replied in writing to the £6… | 1 | ❌ failed | Ticket 006-provider-says-landlord-approved not found on read-back |
| A4 | `add_note` | {"entity":"Flat 21, 11 Juniper Mews","note":"Record conflicts for case 006: landlord named \"Oscar\" in event 013 but \"Ruben\" in event 014… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Landlord has not replied in writing to th… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
- A3: put_on_hold was called with the wrong ticket reference (006-provider-says-landlord-approved). Found the real ref NBL-006-provider-says-landlord-approved via list_tickets and re-applied the hold, verified as A5.
