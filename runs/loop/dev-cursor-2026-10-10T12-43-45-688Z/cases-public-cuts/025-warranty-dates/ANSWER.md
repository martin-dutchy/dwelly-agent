# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's approval was only for a charge-free warranty service. Harbour Services now say the oven is out of warranty, and their visit date is contradictory (22 May vs 21 June). I recorded the conditional decision, asked the landlord whether Harbour may inspect and quote for a paid repair, asked Harbour to confirm the date and warranty dates, told the tenant the visit is not confirmed, and set a follow-up for 24 May.

## Where the case stands
Provider assigned, ticket on hold (waiting for provider). Visit not booked. Landlord approval covers warranty work only. Waiting on the landlord (paid repair decision) and on Harbour (date and warranty dates).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord whether Harbour may inspect and quote for a paid repair now that the warranty is disputed | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour to confirm the visit date and the warranty dates, and to quote only | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the visit is not yet confirmed and when they will next hear from us | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up with landlord and provider on 24 May | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked; our earlier note gave the replacement date as March 2025, which can't be right and we are verifying it). Your OK was for a charge-free warranty service only. May Harbour inspect and quote for a paid repair, with any quote coming back to you before work starts? Their inspection visit is not yet confirmed.
> 
> Options: Yes: Harbour inspect and send a quote for your approval (recommended); You arrange your own contractor; Do not proceed

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June' but the tenant call suggests 22 May 2024 at 2:30pm. Which date and time is correct?
> - What was the oven's installation date and warranty end date that you are relying on?
> - Please inspect and send a quote only; do not start chargeable work until we confirm landlord approval.
> 
> Why: Visit date conflicts and landlord approval covers warranty service only.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hello Leo, thanks for your patience with the oven. Harbour Services say they've arranged to visit, but their emails give two different dates (22 May and 21 June), so we're confirming the right one with them and it isn't booked from our side yet. They've also told us the oven may not be under warranty, so we're checking with your landlord how to proceed. We'll update you by Friday 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked; set_visit was not used because the provider's date is contradictory.
- Nothing here confirms the warranty status. That is Harbour's claim only.
- No spend is approved.

## Remaining work
- Landlord to decide on a paid repair, their own contractor, or no repair
- Harbour to confirm the date, and to quote if needed
- Record the visit once the provider confirms it
- Follow up on 24 May

## Missing or unavailable information
- Oven installation date and installer (conflicting records)
- The visit date confirmed by the provider
- Attachments referenced at events 003 and 013 are unavailable

## Conflicts between sources
- Visit date: 22/05/2024 (event 018 call) vs 21/06/2024 (events 019 and 020, which also say 'tomorrow'). Not treated as booked.
- Oven replacement date: March 2025 (event 014, after today) vs 'last year' (landlord, tenant). Installer: Keystone Works (event 006) vs Harbour Services (event 007).
- Landlord approval record says 'confirmed' but the landlord's words cover warranty work only. Treated as conditional.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A provider is assigned and the ticket is on hold. The landlord approved only a warranty service, and Harbour say there is no warranty. The visit date conflicts (22 May vs 21 June) and no visit is booked. The landlord's decision on a paid repair and the provider's date confirmation are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord by email for approval of a paid inspection and quote. Ask Harbour by email to confirm the date and warranty dates. Update the tenant by email. Follow up on 24 May.

**3. Does anything need a human decision, and why?**

No human is needed yet. The decision on paid work belongs to the landlord and has been requested. Escalate if the landlord stays silent after the follow-up chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service by the original installer;… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025-warranty-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-24","party":"Landlord and Harbour Services","purpose":"Chase landlord decision on p… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: event 014 says oven replaced March 2025 (after today); landlord says Keystone Works/ l… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
