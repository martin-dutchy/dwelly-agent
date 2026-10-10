# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider was assigned without valid landlord approval, because the landlord's only reply concerned a different address. I stopped the reminders, asked the landlord to confirm the property and choose a contractor, updated the tenant and put the job on hold until 13 March.

## Where the case stands
Stage mp_time, provider (Oscar Turner) assigned 1 Mar but never responded to 7 reminders; no valid landlord approval on file. Now on hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant and whether we may send our contractor or they use their own | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: nothing booked, approval being confirmed, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold waiting for landlord, review 13 March; then chase on SMS/phone and consider swapping provider | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is not this property, so we have not treated it as approval. For Flat 24, 150 Copperfield Walk, Kingshaven: the tenant reports the bedroom window is not closing properly (the toilet issue is resolved). May we send our contractor to assess and quote, or will you arrange your own?
> 
> Options: Yes, send our contractor to assess and quote (recommended); I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. Our contractor hasn't yet been in touch to book a visit, and we also need to confirm approval with your landlord, as their last reply seems to have been about a different property. We've asked them again today and will update you by 13 March. Nothing is booked yet. Thank you for your patience.

**A3 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Dear Oscar, we'll stop the automatic reminders for the Flat 24, 150 Copperfield Walk window job. Please don't start any work or book a visit until we confirm landlord approval; we'll write again once we have it. If you can't take this job, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; no visit date exists
- Asking the landlord does not establish which property they meant or who will do the work
- Pausing the provider does not remove them; reassignment is still to be decided

## Remaining work
- Landlord decision (ops, review 13 Mar)
- Provider visit to be booked once approved, or reassign if Oscar Turner stays silent
- Confirm whether landlord's plumber visit to Flat 18 relates to this tenant's toilet (appears to be another property)

## Missing or unavailable information
- Landlord's approval for this property
- Provider response/availability

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property ZZ3 7ZZ; not treated as approval.
- Landlord email (event 004) quotes a toilet issue the tenant later withdrew (event 006).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent after 7 reminders; no visit booked; landlord approval is missing since the landlord's reply named Flat 18, 88 Alder Lane.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email) to Isaac Oakley; tenant update by email; provider told to pause; hold to 13 March.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision is routine and pending. The hold review date is the checkpoint. If the provider stays silent, reassign or escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","body":"Hello El… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body":"Dear … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"047","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property so is not approval. Ask… | 1 | ❌ failed | Ticket 047 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property so is … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
- A3: Tool reported a timeout but read-back showed the provider message MSG-103 was sent; not retried. Not claimed as verified.
- A4: First hold used the wrong ref; retried with NBL-047-three-chases (A5, verified).
