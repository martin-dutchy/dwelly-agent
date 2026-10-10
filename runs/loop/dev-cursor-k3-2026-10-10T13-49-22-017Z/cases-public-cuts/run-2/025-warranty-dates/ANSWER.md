# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating. The landlord only approved a charge-free warranty service, and the provider now says the oven is out of warranty. I recorded the conditional decision, asked the landlord to approve a chargeable route, asked the provider to confirm the date, updated the tenant and set a hold to 24 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket at mp_time, on hold waiting for landlord. Visit not booked: provider's date is inconsistent. Landlord approval covered only a charge-free warranty service; provider says no warranty, so no spend is authorised.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve chargeable inspection/quote, and clarify Keystone vs Harbour and replacement date, reply by 24 May | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to confirm exact visit date (22 May vs 21 June) and warranty dates, and to quote before chargeable work | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is unconfirmed and the warranty/approval is pending; next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold for landlord decision, review 24 May | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked). Do you approve them attending as a chargeable repair? They would quote first for any work. Also, your email named Keystone Works but our note says Harbour Services fitted the oven, and we have two different replacement dates (last year vs March 2025): which is right, and do you have warranty paperwork? Please reply by 2024-05-24.
> 
> Options: Yes, Harbour Services may inspect and quote; we come back to you for approval of any cost; Arrange your own contractor; Do not proceed

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say 'tomorrow, 21st June' but were sent on 21 May; the call with the tenant suggested tomorrow 22 May at 2:30pm. Which exact date and time is confirmed?
> - Please share the oven installation date and the warranty end date you checked.
> - Please do not carry out chargeable work until we confirm landlord approval; send a quote first.
> 
> Why: Visit date is inconsistent and cannot be booked until confirmed by the provider; landlord approval was for warranty work only.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file (event 012)** (verified)

> Dear Leo, an update on your oven. Harbour Services have been in touch about a visit, but the date they gave us is inconsistent (22 May at 2:30pm was mentioned, and another email said 21 June), so it is not confirmed yet. We are checking with them and please don't rely on a date until we confirm. They have also told us the oven may not be under warranty, so we are asking the landlord to approve the repair. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the conditional decision does not authorise any spend
- The tenant message does not book a visit
- Provider's no-warranty claim is unverified

## Remaining work
- Landlord decision on chargeable repair (owner: landlord, by 24 May)
- Provider to confirm the visit date, then set_visit (owner: agency)
- Verify warranty status and who fitted the oven
- Quote approval if needed

## Missing or unavailable information
- Confirmed visit date
- Oven installation and warranty dates
- Which contractor fitted the oven (Keystone Works vs Harbour Services)
- Referenced attachments unavailable

## Conflicts between sources
- Landlord names Keystone Works; the agency note says Harbour Services replaced the oven
- Replacement 'last year' (2023) vs 'March 2025' in the agency email, which is after today's date
- Visit date 22 May (call) vs 21 June (provider emails, which also say 'tomorrow')
- System says 'landlord approval confirmed' but the landlord only asked for a warranty service

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but the visit is unconfirmed (22 May per call vs 21 June per emails, both saying 'tomorrow'). The landlord approved warranty-only work, and the provider says there is no warranty. Outstanding: landlord decision on chargeable work, a confirmed date, and clarification of who fitted the oven and when.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A2), provider date and warranty confirmation by email (A3), tenant update by email (A4).

**3. Does anything need a human decision, and why?**

No human escalation. The decision is the landlord's, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-025","decision":"conditional","conditions":"Only a charge-free warranty service. No spend authorised. Provider now says the… | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"R-025","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, not yet … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 012)","ticket_ref":"R-025… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-025","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair (not under warranty per pro… | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service. No spend authorised. Prov… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair (not under… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Used the wrong ticket ref (R-025). Retried with NBL-025-warranty-dates as A6, which verified.
- A5: Same wrong ref. Retried with the correct ref as A7, which verified.
