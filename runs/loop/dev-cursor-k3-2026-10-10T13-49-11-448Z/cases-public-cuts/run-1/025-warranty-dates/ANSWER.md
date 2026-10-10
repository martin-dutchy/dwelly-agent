# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair with a disputed warranty and an ambiguous visit date. I recorded the landlord's charge-free-only authority, asked the provider to confirm the date and warranty basis, asked the landlord how to proceed, updated the tenant and put the job on hold until 23 May. No human decision is needed yet.

## Where the case stands
Provider (Harbour Services) assigned; visit NOT booked because date is ambiguous. Landlord approval was charge-free warranty work only; provider says out of warranty. On hold waiting for landlord (review 2024-05-23) and provider date confirmation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date in writing (22 May 2:30pm vs 21 June), the warranty basis, and not to do chargeable work without approval | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour should attend to diagnose/quote now the warranty is disputed, and whether Keystone or Harbour fitted the oven | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the date is unconfirmed, warranty is being checked, no cost without landlord approval, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord and provider replies | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> - Is the visit tomorrow Wednesday 22 May 2024 at 2:30pm (as discussed on the call with the tenant) or 21 June? Your two emails say 'tomorrow, 21st June'. Please confirm the exact date and time in writing.
> - On what basis is the oven out of warranty (install date and warranty term)? Our records are inconsistent on the install date.
> - Please do not carry out any chargeable work: send a quote with photos and wait for our approval first.
> 
> Why: Visit date is ambiguous so it cannot be booked; landlord only authorised charge-free warranty work.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, which we are checking). You asked for charge-free work only. Should they still attend to diagnose and quote, with any cost coming back to you for approval first? Also, our notes say Harbour Services fitted the oven but you mentioned Keystone Works: which is correct? Please reply by 2024-05-23.
> 
> Options: Harbour Services attend to diagnose and quote only; quote comes to you for approval (recommended); You arrange your own contractor; Pause until warranty is checked further

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hello Leo, Harbour Services have been in touch about your oven. You discussed a visit tomorrow (22 May) at 2:30pm, but their emails to us name 21 June, so we are asking them to confirm in writing and the time is not yet confirmed by them. Please don't rely on it until we confirm. They have also said the oven may be out of warranty; we are checking with them and the landlord, and no cost will be incurred without the landlord's approval. We will update you by 23 May. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms a visit date or that the oven is out of warranty; that is the provider's claim, being checked.
- The landlord's approval covers charge-free work only; no spend is authorised.
- Landlord's request for a warranty visit does not decide who pays if it is not covered.

## Remaining work
- Provider to confirm visit date; then set_visit if future and confirmed (agency)
- Landlord to decide on chargeable diagnosis/quote or own contractor (landlord)
- Review on 2024-05-23 (agency)
- Result, quote/invoice and close after the visit

## Missing or unavailable information
- Confirmed visit date (22 May vs 21 June)
- Who fitted the oven (Harbour vs Keystone) and the install date; 'March 2025' is in the future
- Warranty terms and evidence
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date 22/05 (call, event 018) vs 21/06 (events 019, 020): not booked, provider asked to confirm.
- Landlord names Keystone Works; notes say Harbour Services fitted the oven.
- Event 014 says oven replaced March 2025, which is after today and contradicts 'last year'.
- Landlord expects the oven to be under warranty; provider says it is not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour Services assigned, visit unbooked (22 May 2:30pm per call vs 21 June per emails). The provider says the oven is out of warranty, but the landlord only authorised charge-free work. Outstanding: date confirmation, landlord's decision, and who fitted the oven.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm the date and warranty basis; email to the landlord asking for a decision; email to the tenant with an update. All sent.

**3. Does anything need a human decision, and why?**

Not yet. The landlord must decide on chargeable work, and that is a routine ask. Escalate if they stay silent beyond the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-025","decision":"conditional","conditions":"Charge-free warranty service only. No chargeable work without further landlord … | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, which we are checking). You a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"R-025","body":"He… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-025","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable diagnosis (warranty denied by prov… | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A6 | `add_note` | {"entity":"R-025","note":"Conflicts: install date 'March 2025' (event 014) is in the future vs tenant 'last year'; landlord names Keystone W… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Charge-free warranty service only. No chargeable work without … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable diagnosis (provid… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Used a wrong ticket ref; retried with NBL-025-warranty-dates as A7, which verified.
- A5: Used a wrong ticket ref; retried with the correct ref as A8, which verified.
