# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; provider says out of warranty and gave conflicting visit dates. I recorded the landlord's warranty-only instruction as conditional, asked the provider for the date and warranty evidence, updated tenant and landlord, and held to 23 May. No human decision needed yet.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold (review 23 May) waiting on provider for visit date confirmation and warranty evidence; landlord asked whether to get a paid quote if not under warranty. Visit not booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the true visit date (22 May 2:30pm vs 21 June) and send the oven install date and warranty terms; diagnose and quote only. | Clara, Harbour Services (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit date is unconfirmed and ask when oven was replaced. | Leo Bennett, tenant | email | A3 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Update landlord: provider says out of warranty (their claim, being verified); ask whether to obtain a quote for approval, reply by 24 May. | Felix, landlord | email | A4 ✅ |
| 4 | WAIT | Hold until 23 May for provider reply. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails (events 019/020) give the visit as 'tomorrow, 21st June', but your call with the tenant set it for tomorrow 22 May at 2:30 PM. Which date is correct?
> - You say the oven is out of warranty: please send the install/purchase date and the warranty terms you checked. Our records conflict (landlord says Keystone Works fitted it last year; our note says Harbour Services in March 2025, which is in the future).
> - Please attend only to diagnose and quote; do not start chargeable work without our written approval.
> 
> Why: Visit date unconfirmed, warranty claim must be verified before accepting 'out of warranty'.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services have told us they spoke to you about a visit tomorrow (22 May) at 2:30 PM, but their emails to us give a different date (21 June). We're asking them to confirm which is right, so please don't treat the visit as confirmed until we tell you. Could you also let us know roughly when the oven was replaced, if you know? We'll update you by 23 May at the latest.

**A4 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Dear Felix, an update on the oven. Harbour Services (who we've instructed, as they're the firm we have a record of fitting it) say the oven is no longer under warranty. That's their claim and we've asked for the install date and warranty terms, as you believe Keystone Works fitted it last year and our records are inconsistent. Their visit date is also being confirmed. We've not approved any paid work: any quote will come to you first. Please reply by 24 May: if the warranty can't be confirmed, should we get a diagnosis and quote from Harbour Services for your approval? We'll update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- Out-of-warranty is only the provider's claim, not verified.
- Landlord's reply authorises charge-free warranty service only; no paid work or spend is approved.
- Does not establish who fitted the oven or when.

## Remaining work
- Provider to confirm date and warranty evidence (owner: agency chase 23 May)
- Landlord decision on paid quote if out of warranty (by 24 May)
- Record visit result, quote, approval, invoice, close

## Missing or unavailable information
- Actual visit date
- Oven install date and warranty terms
- Who installed the oven (Keystone Works vs Harbour Services)
- Landlord spend limit not on file

## Conflicts between sources
- Visit date: 22 May 2:30pm (call, event 018) vs 21 June (emails 019/020, which also say 'tomorrow').
- Installer: Keystone Works (landlord, event 006) vs Harbour Services (event 007/014).
- Install date: 'last year' (tenant) vs March 2025 (event 014, after today's date).
- Warranty: landlord says should be under warranty; provider says not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit date unconfirmed (22 May 2:30pm by call vs 21 June by emails), warranty status disputed and unevidenced, landlord has not approved paid work.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm date and warranty proof; emails to tenant and landlord updating them; hold to 23 May.

**3. Does anything need a human decision, and why?**

No. The paid-work decision belongs to the landlord, who has been asked; escalate only if conflicts remain unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Dear Felix, an update on … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May 2:… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
