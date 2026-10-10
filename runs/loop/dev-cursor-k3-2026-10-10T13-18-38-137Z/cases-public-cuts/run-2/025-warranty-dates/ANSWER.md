# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; warranty claim via Harbour Services came back as out of warranty and the visit date is inconsistent. I asked the provider to confirm date and warranty basis, asked the landlord for a decision on paid diagnosis, updated the tenant, and held with review on 23 May.

## Where the case stands
Provider assigned (Harbour Services), visit not booked: date conflicts (22 May 2:30pm per call vs "21 June" in two emails). Provider says oven is out of warranty. Landlord only asked for a free warranty call-out, so no approval for paid work. Ticket on hold awaiting provider, review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date/time and warranty basis, and diagnose and quote only | Clara, Harbour Services (contractor) | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell landlord warranty is denied and ask whether Harbour should diagnose and quote or he arranges his own | Felix, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit time is being confirmed and not to rely on it yet; next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold for provider confirmation and landlord decision, review 23 May | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Please confirm the exact date and time of the visit to Flat 2, 176 Lantern Quay: your emails say 'tomorrow, 21st June' but your call with the tenant booked 22 May at 2:30pm.
> - On what basis is the oven out of warranty (installation date and warranty term)? Our notes show your firm fitted it, but the landlord mentioned Keystone Works.
> - Please attend for diagnosis only and send a quote with photos before any chargeable work; do not proceed without our approval.
> 
> Why: Visit date is inconsistent across sources so cannot be booked, and warranty status changes who pays.

**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty, so a charge-free repair is not available. Do you want us to have Harbour Services diagnose and quote (no work without your approval), or will you arrange your own contractor?
> 
> Options: Harbour Services attend to diagnose and send a quote for your approval (recommended); You arrange your own contractor; Other instruction

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Leo, Harbour Services say they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date, so we are checking with them and will confirm shortly. Please don't rely on that time until we do. They'll look at the oven first and any chargeable work needs the landlord's approval. We'll update you by 24 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or set; the date is unconfirmed.
- Nothing here approves any paid repair or quote.
- Warranty status is the provider's claim, not verified.

## Remaining work
- Provider to confirm date and warranty basis (agency, review 23 May)
- Landlord to decide on paid diagnosis/quote or own contractor
- Quote loop if work needed
- Record visit once confirmed

## Missing or unavailable information
- Confirmed visit date
- Installation date and warranty terms
- Which contractor fitted the oven (Harbour vs Keystone Works)
- Referenced attachments unavailable

## Conflicts between sources
- Event 014 says oven replaced March 2025 (future) vs tenant 'last year'.
- Landlord names Keystone Works; note 007 says Harbour Services fitted it.
- Visit date 22/05 (call 018) vs 21/06 (emails 019/020); call is treated as unconfirmed pending provider answer.
- Event 009 'landlord approval confirmed' vs landlord email only authorising a warranty call-out.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit unconfirmed (22 May vs 21 June), warranty denied by provider, landlord decision on paid work outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm the date and warranty basis; email to landlord Felix asking for decision; email to tenant Leo Bennett with the update.

**3. Does anything need a human decision, and why?**

No escalation. The landlord's decision on paid work is requested directly; the date conflict is a question to the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty, so a charge-free repair is not available. … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting provider confirmation of visit date (22 May vs 21… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: event 014 says oven replaced March 2025 (future date; tenant says last year); landlord… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
