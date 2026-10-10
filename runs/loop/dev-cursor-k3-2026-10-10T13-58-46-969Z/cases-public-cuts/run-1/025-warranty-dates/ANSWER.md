# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord only approved a charge-free warranty service; the provider now says the oven is out of warranty, and the visit date is contradictory. I recorded the conditional decision, asked the provider to confirm date and warranty facts, asked the landlord whether to proceed with a paid repair, updated the tenant and set a follow-up for 23 May.

## Where the case stands
Provider assigned (Harbour Services), on hold waiting for provider. Visit date unconfirmed (22 May 2:30pm by call vs "21 June" in emails). Provider says out of warranty; landlord approval covers charge-free warranty service only. Landlord asked (APR-102) about a paid repair.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm the exact visit date/time and warranty dates, and not to do chargeable work without approval | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether to proceed with an inspect-and-quote for a paid repair, and to clarify Keystone vs Harbour | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit time is unconfirmed, the warranty position is being checked, and when they will next hear | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up on 23 May for provider date and landlord decision | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thank you for your updates on Flat 2, 176 Lantern Quay. Two points please: (1) Your emails say the visit is "tomorrow, 21st June", but your call with the tenant arranged tomorrow, 22 May at 2:30pm. Please confirm the exact date and time. (2) You say the oven is no longer under warranty. Please send the install date and warranty end date you hold. The landlord has only approved a charge-free warranty service, so please do not carry out chargeable work. If a chargeable repair is needed, send a quote with photos and wait for our approval. Please reply by end of day tomorrow, 22 May.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (we are asking them for the dates). Your approval was for a charge-free warranty service only. Do you want us to have Harbour Services inspect and quote for a paid repair, which would come back to you for approval before any work? Also, your note names Keystone Works but our records show Harbour Services fitted the oven; can you confirm which firm and the install date/warranty paperwork you hold?
> 
> Options: Yes, Harbour Services inspect and quote (quote returned to you for approval); You arrange your own contractor; Do not proceed

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hello Leo, an update on your oven. Harbour Services say they arranged a visit with you for tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June), so we are asking them to confirm which is right. Until they do, please treat the time as not yet confirmed. They also say the oven is no longer under warranty, so we are checking with the landlord whether a paid repair can go ahead. Nothing chargeable will be done without the landlord's approval. We will update you by 23 May at the latest. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; the date is not provider-confirmed.
- The provider's no-warranty claim is not verified; no warranty paperwork seen.
- No spend approved; no quote exists.
- Attachments (events 003, 013) were unavailable and not seen.

## Remaining work
- Provider to confirm visit date and warranty dates (agency, by 22 May)
- Landlord to decide on paid repair / own contractor (by 24 May)
- Book visit via set_visit once confirmed
- Quote loop if needed

## Missing or unavailable information
- Provider-confirmed visit date
- Install date and warranty end date
- Which firm installed the oven (Keystone vs Harbour)

## Conflicts between sources
- Landlord says Keystone Works installed; notes say Harbour Services.
- Event 014 says replaced March 2025, which is in the future; tenant says last year.
- Visit 22 May 2:30pm (call, event 018) vs 21 June (emails 019/020, which also say 'tomorrow'). The date is treated as unconfirmed.
- Provider says out of warranty vs landlord says should be under warranty; no paperwork seen.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Visit date unconfirmed (22 May vs 21 June). The provider says the oven is out of warranty. The landlord approval was for warranty service only, so a paid repair needs their decision.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and warranty dates; email the landlord for a paid-repair decision; email the tenant with the status. All sent.

**3. Does anything need a human decision, and why?**

No escalation. The decision on spend belongs to the landlord, who has been asked. A human is needed only if the date or warranty conflict stays unresolved after 23 May.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty (we are asking them for the dates). Your ap… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025-warranty-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-23","party":"Harbour Services / landlord","purpose":"Check provider-confirmed visit… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord names Keystone Works as installer, notes say Harbour Services; event 014 says… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
