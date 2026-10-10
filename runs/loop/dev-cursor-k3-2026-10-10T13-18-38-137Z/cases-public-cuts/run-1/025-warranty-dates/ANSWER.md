# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating. Landlord only wanted a free warranty service; provider says out of warranty and gave conflicting visit dates. I recorded the conditional decision, asked the landlord whether to proceed to diagnose and quote, asked the provider to confirm date and warranty evidence, told the tenant the date is unconfirmed, and held to 24 May.

## Where the case stands
Provider assigned (Harbour Services), ticket on hold until 2024-05-24. Landlord approved only a charge-free warranty service; provider says out of warranty, so landlord approval for diagnose/quote is requested (APR-101). Visit date unconfirmed (22/05 2:30pm per call vs 21/06 per provider emails); no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no on diagnose-and-quote now the oven is reported out of warranty; corrected the wrong March 2025 date | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to confirm visit date/time, install date and warranty basis, and not to do chargeable work without approval | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant visit date is not yet confirmed and when they will next hear (by 24 May) | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 24 May for landlord answer and provider confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services says the oven is no longer under warranty (their claim, not yet checked). Your approval was for a charge-free warranty service only. Do you want Harbour Services to attend to diagnose and quote, with any repair sent to you for approval before work starts? Correction to my earlier email: it said the oven was replaced in March 2025; that date can't be right, as we are in May 2024, so we are checking the real install date and warranty paperwork. Please reply yes or no by 24 May 2024.
> 
> Options: Yes: Harbour Services attends to diagnose and quote; no repair without your approval (recommended); No: you arrange your own contractor; No: ask the installer to prove the warranty position first

**A3 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Two points please. 1) Your emails say the visit is "tomorrow, 21st June", but today is 21 May and the tenant was told 22 May at 2:30pm by phone. Please confirm the exact date and time. 2) Please send the install date of the oven and the basis for saying it is out of warranty (invoice or warranty terms). The landlord only approved a charge-free warranty service, so please do not carry out chargeable work; if the visit shows a repair is needed, send a quote with photos and wait for our approval.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Dear Leo, Harbour Services told us they have arranged to visit about your oven. Our record from your call shows tomorrow (22 May) at 2:30pm, but their emails to us give a different date, so we are confirming it with them. Please don't treat it as definite until we write again. The landlord is also being asked to agree what happens if there is a repair cost. We will update you by 24 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord decision recorded is conditional (warranty-only); it does not authorise chargeable work.
- Nothing here confirms the warranty status or the visit date.
- The provider's out-of-warranty claim is unverified.

## Remaining work
- Landlord reply by 24 May (agency)
- Provider to confirm date and warranty evidence (agency chasing)
- Quote loop if repair needed
- Result, invoice and close

## Missing or unavailable information
- Actual oven install date and installer (Keystone Works vs Harbour Services)
- Warranty paperwork
- Confirmed visit date
- Landlord spend limit not on file
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date 22/05/2024 (call, event 018) vs 21/06 (emails 019, 020); trusted neither until provider confirms.
- Landlord names Keystone Works; notes say Harbour Services replaced the oven.
- Event 014 says replaced March 2025, impossible given today's date.
- Landlord expects warranty; provider says none.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but landlord approval covers only warranty-free work, which the provider says does not apply. Visit date is conflicting (22 May vs 21 June) and unconfirmed. Outstanding: landlord decision, provider confirmation of date and warranty evidence.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email; date/warranty confirmation request to Harbour Services by email; holding update to tenant Leo Bennett by email; hold until 24 May.

**3. Does anything need a human decision, and why?**

No escalation. The decision belongs to the landlord, who has been asked; it is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service by the original installer.… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services says the oven is no longer under warranty (the… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025-warranty-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on diagnose-and-quote now provide… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord says contractor was Keystone Works, notes say Harbour Services; event 014 sai… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
