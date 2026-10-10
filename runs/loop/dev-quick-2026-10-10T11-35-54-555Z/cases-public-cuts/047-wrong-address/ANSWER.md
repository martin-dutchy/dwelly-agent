# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's reply (event 010) concerns Flat 18, 88 Alder Lane, a different property, so it is not approval for this window repair. I asked the landlord to confirm the property and whether we may send our contractor, and told the tenant the window is waiting on the landlord and the toilet is reported fixed. The job is on hold until 2024-02-26.

## Where the case stands
Ticket NBL-047-wrong-address (bedroom window at Flat 24, 150 Copperfield Walk) is at the landlord gate and on hold, 'Waiting for Landlord'. No landlord approval is recorded and no provider is assigned. The toilet issue is reported fixed by the tenant and is not part of this window job.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord to confirm which property their plumber email refers to, and whether we may send our contractor to inspect the bedroom window at Flat 24 or whether they will use their own. | Isaac Oakley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the window request is waiting on the landlord, no visit date is set yet, and acknowledge that the toilet is fixed. | Tenant, Flat 24 | email | A1 ✅ |
| 3 | WAIT | Hold the job until 2024-02-26; if the landlord has not answered, chase by phone or SMS. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant, Flat 24, 150 Copperfield Walk (tenant) via email, existing thread (event 006 email)** (verified)

> Hello,
> 
> Thank you for letting us know the toilet is working again. We are glad your mother was able to fix it.
> 
> For the bedroom window that will not close properly, we are waiting for the landlord to confirm whether we can send a contractor. We will be in touch as soon as we hear back. We cannot give you a visit date yet.
> 
> Kind regards,
> Ashford

**A2 · send_message → Isaac Oakley (landlord) via email, existing thread (event 004 email)** (verified)

> Hello Isaac,
> 
> Thank you for your reply. Your email refers to a plumber visit at a different property, not the one this repair concerns. Could you confirm which property you meant?
> 
> The repair we are asking about is the bedroom window at Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ, which does not close properly. Please let us know whether we may send one of our contractors to inspect and quote, or whether you would prefer your own contractor (if so, please send their name and a date).
> 
> Nothing will be booked until we hear from you.
> 
> Kind regards,
> Ashford

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the message does not establish that the landlord approved anything or who pays.
- The landlord's 'plumber' email concerns a different property and is not approval for this job.
- No visit is booked and no date has been given to the tenant.

## Remaining work
- Landlord to confirm the property and choose our contractor or their own for the window (owner: landlord, review 2024-02-26).
- Once approved, assign a contractor and book the visit, then record the result, invoice and close (owner: agency).
- Confirm with the tenant before closing that the toilet needs no further work.

## Missing or unavailable information
- Landlord confirmation of which property their plumber email refers to.
- Landlord decision on our contractor versus their own for the bedroom window.

## Conflicts between sources
- Landlord email (event 010) refers to Flat 18, 88 Alder Lane, Willowbank, ZZ3 5ZZ, but the case property is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. I trusted the case record; the landlord email is not approval.
- Event 010 mentions an appointment on 23/02/2024, but it is for the other property and is not booked for this job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Still at the landlord gate with no provider assigned. The landlord has approved nothing for this property; their only reply names a different address. Outstanding: landlord confirmation of property and contractor choice, then visit, result and close.

**2. What is the next action, who is it for, and through which channel?**

Email landlord Isaac Oakley to confirm the property and contractor choice (verified A2). Email the tenant to say the window is pending and the toilet is noted as fixed (verified A1). Hold until 2024-02-26 and chase by phone or SMS if still unanswered (verified A3).

**3. Does anything need a human decision, and why?**

No escalation now. The address mismatch is one question the landlord can answer, so it is routine. Escalate if the landlord stays silent after the chase or the address still cannot be resolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 24, 150 Copperfield Walk","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord email (event 010) names Flat 18, 88 Alder Lane, Wi… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord email refers to Flat 18, 88 Alder Lane, Willowbank, ZZ3 5ZZ, a different proper… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
- landlord send (first attempt): Blocked by policy because the message named the other address. Resent without that address; verified as A2.
- tenant send (second attempt): Rejected as a duplicate of the already verified A1; not repeated.
