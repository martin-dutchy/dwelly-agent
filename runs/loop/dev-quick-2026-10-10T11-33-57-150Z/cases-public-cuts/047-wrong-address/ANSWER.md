# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant reports a bedroom window that won't close and says the toilet is now fixed. The landlord's only reply names a different property (Flat 18, 88 Alder Lane), so it does not approve anything here. I asked the landlord to confirm the property and whether we may send our contractor to the Flat 24 window, told the tenant the request is waiting for the landlord, and put the job on hold until 2024-02-26.

## Where the case stands
Ticket NBL-047-wrong-address, stage init, no provider assigned. Landlord has not approved any work for Flat 24. The landlord's only reply (event 010) names a different property (Flat 18, 88 Alder Lane, ZZ3 5ZZ), so it is not approval. Job is on hold for the landlord with review 2024-02-26. The toilet is resolved per the tenant (event 006); the bedroom window is still open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to confirm which property the plumber visit is for, and whether we may send our contractor to inspect and quote for the Flat 24 bedroom window or whether they will use their own. | Isaac Oakley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the window request is waiting for the landlord's decision; no visit date is confirmed. | Tenant, Flat 24, 150 Copperfield Walk | email | A1 ✅ |
| 3 | WAIT | Job on hold, waiting for landlord; review 2024-02-26 and chase by phone or SMS if no reply. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant, Flat 24, 150 Copperfield Walk (tenant) via email, existing thread (event 006 email)** (verified)

> Hello,
> 
> Thank you for letting us know your mother has fixed the toilet, and we're glad it's sorted. We have noted that only the bedroom window needs attention.
> 
> We have asked your landlord whether we may send a contractor to look at the window. We are waiting for their reply, and we will be in touch once we hear back. We cannot confirm a date for the visit until the landlord has agreed.
> 
> Kind regards,
> Ashford

**A2 · send_message → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> Hi Isaac,
> 
> Thank you for your email. The plumber you mention is for a different property from the one we are dealing with. Could you please confirm which property you meant?
> 
> Our request is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. The tenant reports the bedroom window does not close properly. The toilet issue has now been resolved, so only the window needs attention. Please let us know whether we may send one of our contractors to inspect and quote for the window, or whether you would prefer to use your own contractor.
> 
> Kind regards,
> Ashford

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's email about Flat 18, 88 Alder Lane is not approval for this job, and no work is authorised for Flat 24.
- Telling the tenant the window request is waiting does not confirm a contractor, date or cost.
- The landlord's reply does not show whether their plumber is for this property; the toilet was fixed by the tenant's mother, not by a contractor.

## Remaining work
- Landlord to confirm the property and decide whether we may send our contractor to the Flat 24 window (asked 2024-02-22).
- If no reply by 2024-02-26, chase the landlord by phone or SMS and review.
- Once approved, assign a contractor for a routine window visit, obtain the visit date from the provider, and tell the tenant.

## Missing or unavailable information
- Which property the landlord's plumber visit is for.
- Landlord decision on our contractor for the Flat 24 window.

## Conflicts between sources
- Landlord email (event 010) refers to Flat 18, 88 Alder Lane, ZZ3 5ZZ; the case property is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Trusted the case record; the email is not approval.
- Landlord was asked about the toilet (event 004), but the tenant says it is fixed (event 006). Trusted the tenant's direct update.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage is provider selection with no contractor assigned. Landlord approval for Flat 24 is outstanding because the landlord's reply (event 010) is about Flat 18, 88 Alder Lane. The toilet is resolved per the tenant; the bedroom window is still open. Job is on hold for the landlord until 2024-02-26.

**2. What is the next action, who is it for, and through which channel?**

Email landlord Isaac Oakley (A2) to confirm the property and ask whether we may send our contractor to the Flat 24 window or whether they will use their own. Email the tenant (A1) that the window request is waiting on the landlord and no date is confirmed. Hold until 2024-02-26, then chase the landlord by phone or SMS if there is no reply.

**3. Does anything need a human decision, and why?**

Not yet. The job is routine and the landlord has not decided, so it is waiting rather than escalated. Escalate only if the landlord stays silent after the chase or the address mix-up cannot be settled by one question.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 24, 150 Copperfield Walk","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord email (event 010) names a different property (Flat… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-047-wrong-address","decision":"unclear","evidence_quote":"I have arranged plumber to visit Flat 18, 88 Alder Lane, Willow… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after record_landlord_decision |

## Failed or unverified actions
- first landlord email (no ledger id): Blocked by policy because it named Flat 18, 88 Alder Lane. Resent without that address as A2.
