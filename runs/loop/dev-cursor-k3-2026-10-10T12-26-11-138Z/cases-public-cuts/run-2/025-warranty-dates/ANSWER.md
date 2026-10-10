# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord only asked for a charge-free warranty visit; Harbour Services now say the oven is out of warranty. Visit date is unconfirmed (22 May vs 21 June). I asked the landlord for approval of a paid diagnosis and quote, asked the provider to confirm the date and warranty position, told the tenant, and put the job on hold to 23 May.

## Where the case stands
Provider assigned (Harbour Services), on hold awaiting landlord decision and provider date confirmation. No visit booked in the system.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve paid diagnosis and quote or use own contractor | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask provider to confirm exact visit date and warranty reason | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant visit date is unconfirmed and next update by 23 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until review 2024-05-23 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked). You only asked for a charge-free warranty visit. May Harbour Services attend, diagnose and send us a quote for your approval before any repair work, or would you prefer your own contractor?
> 
> Options: Yes, Harbour Services may attend and quote; no work until you approve the quote (recommended); You arrange your own contractor; Ask Keystone Works / Harbour Services to confirm the warranty position in writing first

**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for your updates. Your emails say the visit is "tomorrow, 21st June", but tomorrow is 22 May and the tenant call suggested 22 May at 2:30pm. Please confirm the exact date and time in writing. Also please confirm in writing why the oven is out of warranty (install date and warranty term). The landlord only asked for a charge-free warranty visit, so please attend to diagnose only and send a quote with photos; do not start any chargeable work until we confirm approval.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services say they have arranged a visit with you for tomorrow at 2:30pm, but their emails give a different date (21 June), so we are confirming the exact date with them and will tell you once it is confirmed. They have said the oven is no longer under warranty, so we are checking with the landlord about next steps. You'll hear from us by Thursday 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the tenant call date is unconfirmed by the provider in writing.
- Warranty status is the provider's claim, not verified.
- No spend is approved.

## Remaining work
- Landlord decision (agency follow-up 23 May)
- Provider written date confirmation
- Quote handling and approval if needed

## Missing or unavailable information
- Landlord spend limit not on file
- Exact visit date
- Warranty documents; attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: 22/05/2024 (event 018 call) vs 21/06/2024 (events 019, 020) while saying 'tomorrow'; treated as unconfirmed.
- Event 014 says oven replaced March 2025, later than the case date (2024) and conflicting with 'last year'; flagged, not relied on.
- Landlord asked for warranty service; provider says no warranty.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Provider assigned, but landlord approval only covers a warranty (no-charge) service. Provider says out of warranty. Outstanding: landlord decision on paid diagnosis/quote, provider written confirmation of the visit date and warranty reasoning.

**2. What is the next action, for whom, via which channel?**

Landlord approval request (email, APR-101) to Felix; date and warranty confirmation request to Harbour Services (email); holding update to Leo Bennett (email).

**3. Does anything need a human decision?**

No escalation. The decision belongs to the landlord, which I have asked for. Escalate only if there is no answer by the review date and the date conflict stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on paid diagnosis/quote now pro… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
