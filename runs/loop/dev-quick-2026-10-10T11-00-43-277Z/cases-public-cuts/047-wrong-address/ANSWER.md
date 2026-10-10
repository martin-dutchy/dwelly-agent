# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's bedroom window repair at Flat 24 is logged and waiting for landlord approval. The landlord's only reply concerned a different property (Flat 18, 88 Alder Lane), so I did not treat it as approval. I messaged the landlord to confirm the Flat 24 window and told the tenant the target is within 14 days; the job is on hold until 2024-02-26.

## Where the case stands
Stage init. Tenant reported a bedroom window at Flat 24, 150 Copperfield Walk that does not close properly (routine). The toilet issue is resolved by the tenant's family. The landlord's only reply (event 010) concerns a plumber at a different property, Flat 18, 88 Alder Lane, so it is not an approval for this job. The ticket is on hold waiting for the landlord, review 2024-02-26.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm, for Flat 24 only, whether we may send a contractor to inspect and quote for the bedroom window, or whether they will use their own contractor. Flag the wrong-address reply. | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the window is logged, we are waiting for landlord confirmation, and the target is a visit within 14 days (routine). | Tenant, Flat 24, 150 Copperfield Walk | email | A1 ✅ |
| 3 | WAIT | Keep the job on hold for landlord reply and review it on 2024-02-26. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant, Flat 24, 150 Copperfield Walk (tenant) via email, existing thread (event 006 email)** (verified)

> Hello,
> 
> Thank you for your message, and I'm glad the toilet is working again.
> 
> We have logged the bedroom window that does not close properly. We are waiting for the landlord to confirm that we can send a contractor to look at it. We will be in touch as soon as we hear back. Our target is to have this looked at within 14 days.
> 
> If the window becomes insecure or you are worried about it before then, please let us know straight away.
> 
> Kind regards,
> Ashford

**A3 · send_message → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> Hello Isaac,
> 
> Thank you for your reply. The plumber visit you mention appears to be for a different property from the one we are dealing with, so we have not treated it as an instruction for this job.
> 
> The property for this request is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. The tenant has reported that the bedroom window does not close properly. The toilet issue has now been resolved, so no plumber is needed for this property.
> 
> Please could you confirm:
> 1. Whether we may send one of our contractors to inspect and quote for the bedroom window at Flat 24, 150 Copperfield Walk, or whether you would prefer to use your own contractor.
> 2. If you did intend the other property, please check the address and let us know, so we can handle that separately.
> 
> Kind regards,
> Ashford

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the message does not mean the landlord approved any spend or contractor for the window.
- The landlord's reply does not approve work at Flat 24; it refers to Flat 18, 88 Alder Lane.
- No contractor has been assigned and no visit is booked.
- The cause of the window fault and who pays are not established.

## Remaining work
- Landlord to confirm contractor or own-contractor arrangement for Flat 24 bedroom window (owner: landlord, chased by agency; review 2026-02-26 per hold; note hold date is 2024-02-26).
- Once approved, assign contractor, book visit, record quote/result, close with tenant confirmation.

## Missing or unavailable information
- Landlord approval or own-contractor decision for Flat 24 window
- Confirmation from landlord whether the Alder Lane reply was a mistake or relates to a different job
- Property landlord contact details and spend limit (not in property record)

## Conflicts between sources
- Landlord reply (event 010) refers to Flat 18, 88 Alder Lane, Willowbank, but the case property is Flat 24, 150 Copperfield Walk. Trusted the case property; did not treat the reply as approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake (init), on hold for landlord. The window repair at Flat 24 has no landlord approval. The toilet is resolved. The landlord's reply is about the wrong property, so the window still needs landlord confirmation, a contractor visit, and a quote or result.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord Isaac Oakley to confirm the Flat 24 window inspection or own-contractor route and flag the wrong-address reply (sent, MSG-102). Email the tenant to confirm the window is logged and the target is within 14 days (sent, MSG-101).

**3. Does anything need a human decision, and why?**

Not yet. The landlord's approval for the routine window repair is the only decision needed, and it is theirs to give. No escalation is needed unless the landlord does not respond by the review date or the wrong-address reply suggests a wider mix-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 24, 150 Copperfield Walk","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) concerned Flat 18, 88 Alder Lane… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
- first landlord send_message attempt: Blocked by policy because the message named Flat 18, 88 Alder Lane. Resent without naming the other address (A3, MSG-102).
