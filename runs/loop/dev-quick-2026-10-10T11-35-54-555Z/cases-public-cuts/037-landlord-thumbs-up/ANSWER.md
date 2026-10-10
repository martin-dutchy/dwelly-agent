# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord replied only with a 👍 to the question on who should do the shower cable repair. That is not a usable decision, so it was recorded as unclear and the landlord was asked a yes-or-no question. The tenant was updated and asked again for photos, and the job is on hold until 2024-03-28.

## Where the case stands
Intake/landlord gate. The landlord was asked on 2024-03-27 whether the repair is arranged by us or by them. Their only reply is a 👍 (event 007), which is not a usable decision. No provider is assigned and no visit is booked. The tenant has not sent the photos requested in event 004. The job is on hold for the landlord with a review date of 2024-03-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord a yes-or-no question: use our contractor, or arrange their own. The 👍 was recorded as unclear and no contractor is instructed. | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the landlord is being asked to confirm, and ask again for photos of the damaged cable and the leak. | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold the job for the landlord's answer, with a review on 2024-03-28. Chase by phone or SMS if still no clear answer. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya (landlord) via email, existing thread (event 003 email)** (verified)

> Hi Freya,
> 
> Thank you for your reply. We received a thumbs-up emoji, but we need a clear answer before we instruct anyone.
> 
> The shower cable at Flat 14, 44 Lantern Quay is damaged and leaking. Please reply with one of the following:
> 
> 1. YES, arrange the repair through our contractor, or
> 2. NO, I will arrange my own contractor.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza,
> 
> Thank you for reporting the leaking shower at Flat 14, 44 Lantern Quay. We have asked the landlord to confirm how the repair should go ahead. We will update you as soon as we hear back.
> 
> If you can, please send a few photos of the damaged shower cable and where the leak is coming from. This will help the contractor when they attend.
> 
> If the leak gets worse, or water gets near any electrics, please turn off the water supply and the electrics in the bathroom and let us know straight away.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not authorise any repair, contractor or spend.
- No contractor has been assigned and no visit is booked.
- The cause, cost and who pays are not established.
- Nothing has been sent to any provider.

## Remaining work
- Landlord to give a clear yes or no: our contractor, or their own. Owner: landlord (chase 2024-03-28).
- Once approved, assign a contractor and book a visit with the tenant. Owner: agency.
- Tenant photos still outstanding (not blocking the decision). Owner: tenant.

## Missing or unavailable information
- Landlord's clear decision on who does the repair; no spend limit on file for this property.
- Tenant photos of the cable and leak.
- No provider or contractor named for this property.

## Conflicts between sources
- The landlord's 👍 may look like approval, but it does not say what was approved. Treated as unclear.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord gate. The landlord has not given a usable decision: the 👍 at event 007 is recorded as unclear. No provider is assigned and no visit is booked. The tenant's photos are outstanding. The job is on hold for the landlord until 2024-03-28.

**2. What is the next action, who is it for, and through which channel?**

Email Freya (landlord) on the existing thread asking her to confirm YES for our contractor or NO for her own. Email Eliza (tenant) to say the landlord is being asked and to request photos. Review the hold on 2024-03-28 and chase if still unanswered.

**3. Does anything need a human decision, and why?**

Not yet. The landlord must answer a yes-or-no question first. Escalate only if there is still no clear answer after the chase, or if the leak becomes urgent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email from Landlord to Northbridg… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 003 email)","body":"Hi Freya,\n\nT… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza,\n\nTha… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied 👍 only (event 007), which is not a u… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A5 | `resume_auto` | {"ticket_ref":"NBL-037-landlord-thumbs-up"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after resume_auto |

## Failed or unverified actions
_None._
