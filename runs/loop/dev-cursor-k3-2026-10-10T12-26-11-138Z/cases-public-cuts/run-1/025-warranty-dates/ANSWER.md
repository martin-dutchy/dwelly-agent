# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven fault routine job; provider assigned and has spoken to the tenant but the visit date conflicts across sources, and the provider says there is no warranty. I asked the provider to confirm the date, asked the landlord for approval to diagnose and quote, updated the tenant and set a hold to 22 May.

## Where the case stands
Stage mp_time, provider (Harbour Services) assigned, visit NOT booked: call says 22 May 14:30, provider emails say "tomorrow, 21st June". Provider says the oven is out of warranty. Landlord's only reply asked for a warranty/free service, not approval of chargeable work. On hold, review 2024-05-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the correct visit date/time and send warranty evidence; no chargeable work without a quote and approval | Harbour Services, contractor | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell the landlord the provider says the oven is out of warranty and ask whether Harbour Services may diagnose and quote | Felix, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the visit is not yet confirmed and we will update by tomorrow morning | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 2024-05-22 for provider date confirmation and landlord answer | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say 'tomorrow, 21st June', but tomorrow is 22 May and your call with the tenant set 22 May at 2:30pm. Which date is correct? Please confirm date and time.
> - You say the oven is no longer under warranty. Please send the install date and warranty terms you checked.
> - Please do not carry out chargeable work without a quote and our approval; send a quote if needed.
> 
> Why: Visit date is contradictory so cannot be booked; warranty answer affects who pays.

**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet verified). Do you approve them attending to diagnose and quote, with any repair coming back to you for approval before work starts?
> 
> Options: Yes, Harbour Services to diagnose and send a quote for your approval (recommended); You arrange your own contractor; Ask us to challenge the warranty position first

**A3 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hello Leo, Harbour Services have been in touch about your oven. We understand you spoke about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June), so the visit is not confirmed yet. We are checking the date with them and will email you once it is confirmed, by tomorrow morning at the latest. Any repair cost still needs the landlord's approval first. Thanks for your patience.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; the date is unconfirmed.
- Warranty status is the provider's claim, not verified.
- No spend approved; the landlord has not authorised chargeable work.
- Nothing here establishes the cause of the fault.

## Remaining work
- Provider to confirm the date and warranty evidence (agency, review 22 May)
- Landlord to answer APR-102
- Book the visit with set_visit once the provider confirms
- Quote loop if a repair is needed

## Missing or unavailable information
- Correct visit date (22 May vs 21 June)
- Warranty terms and installation date
- Landlord decision on chargeable work
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: call (event 018) says 22 May 14:30; provider emails (019, 020) say 'tomorrow, 21st June'. Unresolved, asked provider.
- Landlord email names Keystone Works as installer, notes say Harbour Services; event 014 says replaced March 2025, which is after today's date, and the tenant says 'last year'. Warranty dates unreliable.
- Approval event 009 says confirmed, but the landlord's words (006) only asked for a free warranty service.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit unconfirmed (22 May 2:30pm by call vs 21 June by emails). Provider says out of warranty. Landlord approval for chargeable work and provider confirmation are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm the date and warranty evidence; email to landlord Felix requesting approval to diagnose and quote; email update to tenant Leo Bennett.

**3. Does anything need a human decision, and why?**

No escalation. The landlord's decision on spend is requested from the landlord, and the date conflict is a question to the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, not ye… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","body":"Hello Leo, Harbour Serv… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' confirmation of visit date (22 May vs 21 June)… | 1 | ❌ failed | Ticket NBL-025 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' confirmation of visit date (22 … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A4: Put-on-hold used a wrong ticket ref; retried with the correct ref NBL-025-warranty-dates as A5, which verified.
