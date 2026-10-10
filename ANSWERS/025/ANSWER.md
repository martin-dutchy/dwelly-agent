# Kitchen tap maintenance request: ANSWER

**Decision:** action_taken · **Severity:** routine

The plumber invoiced for a new tap, but no visit, quote or amount is recorded. I asked the plumber for the details, asked the tenant to confirm the fix, updated the landlord, logged the drawer as a separate job and put the ticket on hold until 18 Sept.

## Where the case stands
NBL-025 held (review 18 Sept). Corrected invoice received for a new mono tap, but no visit date, completion report, amount, quote or tenant confirmation on record. Waiting on provider, tenant and landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the plumber for visit date, invoice total, photos and confirmation that the boiler matter is unrelated | Ivo Fenlock, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant whether a new tap was fitted and whether the drip and cloudy water persist; tell her the drawer is logged separately | Nia Calder, tenant | email | A3 ✅ |
| 3 | OTHER | Update landlord on the invoice and ask whether he accepts the replacement tap | Orin Bell, landlord | email | A4 ✅ |
| 4 | WAIT | Hold until 18 Sept for replies | internal | internal | A5 ✅ |
| 5 | SPLIT_NEW_REQUEST | Log loose kitchen drawer as its own job JOB-101 | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Ivo Fenlock (contractor) via email, existing thread (event 022 document)** (verified)

> - What date did you attend 18 Thistlewick Row, and was the dripping tap and cloudy water checked?
> - What is the invoice total (the corrected invoice of 15 Sept shows no amount) and was a replacement quoted or approved beforehand?
> - Please send photos of the old and new tap and any findings on the cloudy water.
> - Please confirm the 'boiler matter' mentioned on the call is unrelated to this job and which engineer is involved, if any.
> 
> Why: Invoice received but no visit, quote or amount is recorded; replacement tap was not quoted or separately approved. Needed before payment or closing.

**A3 · send_message → Nia Calder (tenant) via email, existing thread (event 015 email)** (verified)

> Hi Nia, sorry for the delay on the tap. The plumber has invoiced for fitting a new kitchen tap, but we have no confirmed visit date or completion report yet, so we're checking with him. Has a new tap been fitted at your home, and is it still dripping? Is the water still cloudy? Please reply either way. I've also logged your loose top drawer as a separate job; it needs the landlord's go-ahead and we'll update you. You'll hear from us by 18 September.

**A4 · send_message → Orin Bell (landlord) via email, agency landlord record** (verified)

> Dear Orin, update on the kitchen tap at 18 Thistlewick Row. Bracken & Vale Plumbing have sent an invoice (corrected 15 Sept) for supplying and fitting a new mono kitchen tap. No quote or visit date was recorded beforehand and the invoice shows no amount, so we're asking the plumber for the date, total and photos before anything is paid. Your 5 Aug approval was for the maintenance works without a replacement tap or figure; please tell us if you're happy with a replacement tap. Separately, the tenant reports a loose top kitchen drawer with snapped brackets; we've logged it and will send you a quote for approval. We'll update you by 18 September.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Provider/tenant/landlord | Review replies on invoice, visit and approval | 2025-09-18 | A5 ✅ verified |

## What this does not establish
- Nothing here confirms the tap was fitted, the work was done well, the cause of the cloudy water, or that the invoice is payable.
- Invoice not recorded or paid: no amount was shown.
- Landlord's approval did not cover a replacement tap or a figure.

## Remaining work
- Provider reply: visit date, total, photos (agency)
- Tenant confirmation the tap works
- Landlord view on replacement tap and invoice approval
- Drawer job JOB-101 needs landlord approval and a contractor
- Check the boiler remark on the call is unrelated

## Missing or unavailable information
- Invoice amount
- Actual visit date
- Landlord approval of replacement tap
- Cause of cloudy water

## Conflicts between sources
- Appointment dates: 11/13/14 Aug offered (event 007), 10 Sept confirmed by agency (events 015-016); no record that any visit happened, yet an invoice exists.
- Invoice postcode differed from the record; corrected in event 022.
- The boiler matter on the call is not part of this job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A corrected invoice (postcode fixed) for a new mono tap has arrived. There is no recorded visit date, completion evidence, amount, quote or tenant confirmation, and the landlord's approval did not cover a replacement. The drawer issue was unlogged and is now JOB-101.

**2. What is the next action, who is it for, and through which channel?**

Email the plumber (Ivo Fenlock) for the visit date, total and photos. Email the tenant to confirm the fix. Email the landlord with the position. All sent.

**3. Does anything need a human decision, and why?**

Not yet. If the plumber's answer shows an unapproved or mismatched charge, escalate to accounts. The landlord decides on the replacement tap.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"18 Thistlewick Row, Fenmere, ZZ1 1ZZ","category":"carpentry","severity":"routine","description":"Top kitchen drawer loose, meta… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_information` | {"recipient_name":"Ivo Fenlock","recipient_role":"contractor","channel":"email","contact":"existing thread (event 022 document)","questions"… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Nia Calder","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Orin Bell","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-025","body"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025","reason":"Waiting for Provider","comment":"Awaiting visit date, invoice total, photos from Bracken & Vale; tenant co… | 1 | ✅ verified | Ticket NBL-025 read back after put_on_hold |

## Failed or unverified actions
_None._
