# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied about a plumber visiting a different address (Flat 18, 88 Alder Lane) and did not answer about the bedroom window. The toilet is already fixed per the tenant. I asked the landlord to confirm the address and decide on the window, updated the tenant, and put the ticket on hold with a review date.

## Where the case stands
Ticket at init, on hold waiting for landlord until 2024-02-24. No landlord decision on the bedroom window; no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked landlord to confirm the correct property and approve or decline a contractor for the bedroom window; noted the toilet is fixed | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Updated tenant: awaiting landlord, 14-day target after approval | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold until 2024-02-24, then chase the landlord | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've asked the landlord to approve a visit for the bedroom window. Their reply mentioned a different address, so we've asked them to confirm. We'll be in touch as soon as we have an answer, and will aim to get the repair done within 14 days of approval. Kind regards, Ashford

**A3 · send_message → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> Hi Isaac, thanks for your reply. The address in your email is different from our request, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Please check you have the right property. Also, the tenant has told us the toilet is now fixed, so no plumber is needed for that. The only open issue is the bedroom window, which isn't closing properly. Please let us know whether we may send one of our contractors to look at and quote for the window, or whether you'd like to arrange your own. Kind regards, Ashford

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's email is not an approval for the window repair at Flat 24
- No contractor assigned and no spend approved
- The wrong-address plumber visit is not confirmed as relevant to our property

## Remaining work
- Landlord to confirm the property and approve or decline a contractor for the window (agency chases on 2024-02-24)
- Then assign contractor, book visit, quote loop if needed
- Cancel or update the toilet part of the issue, as the tenant says it is fixed

## Missing or unavailable information
- Landlord decision on the window repair
- Confirmation the landlord has the right property
- Property record has no landlord, spend limit or contractor details

## Conflicts between sources
- Landlord's reply cites Flat 18, 88 Alder Lane, Willowbank, but the job is Flat 24, 150 Copperfield Walk. The ticket record was trusted.
- Landlord was sent the original request including the toilet issue, which the tenant later said was fixed.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Routine window repair at Flat 24 is awaiting landlord approval. The landlord's reply named a different property and a plumber, so it is not usable. The toilet issue is resolved.

**2. What is the next action, for whom, via which channel?**

Email to the landlord (Isaac Oakley) to confirm the address and approve or decline a contractor for the window; the tenant was updated by email.

**3. Does anything need a human decision?**

Not now. If the landlord stays silent or the address mix-up persists after the 2024-02-24 review, a human could look at it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply referred to Flat 18, 88 Alder Lane and a plu… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
