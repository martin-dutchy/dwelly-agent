# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord has not approved any work or spend. His reply asks about a warranty service through a different contractor, and Harbour Services now says the oven is out of warranty and gives a visit date that conflicts with its own emails. I messaged the landlord, Harbour Services and the tenant (verified A1-A3), and the ticket is on hold for the landlord until 2024-05-23.

## Where the case stands
Ticket NBL-025-warranty-dates, routine oven repair. Harbour Services is assigned but the visit is unconfirmed, and no spend is approved. The landlord's reply (event 006) asks for a charge-free warranty service via "the contractor used by Keystone Works", which is not approval of Harbour Services or any spend. Harbour Services (event 020) now says the oven is out of warranty. Ticket is on hold for the landlord, review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord Felix whether Harbour Services should attend at his cost, who installed the oven, and any spend cap, or whether he will use his own contractor. | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services (Clara) to confirm in writing the visit date (22/05/2024 2:30pm per call vs 21 June per emails) and give the out-of-warranty reason. No repair work to be booked until the landlord decides. | Clara, Harbour Services | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is not yet confirmed, we are checking with the provider, and the landlord's decision is pending. | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold ticket while waiting for the landlord reply, review 2024-05-23. | Felix, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Felix (landlord) via email, existing thread (event 006 email)** (verified)

> Dear Felix,
> 
> Thank you for your message about the oven at Flat 2, 176 Lantern Quay.
> 
> Harbour Services, who we have assigned to look at it, say the oven is no longer under warranty. Our records also show Harbour Services as the company that fitted the oven, while your message named Keystone Works. Please could you confirm which company installed it.
> 
> Please reply with one answer: do you want us to instruct Harbour Services to attend and find the fault, with any repair cost to be agreed with you before work starts? Or would you rather arrange your own contractor? If you approve Harbour Services, please also tell us the most you want spent before we check with you again.
> 
> Kind regards

**A2 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 019 email)** (verified)

> Dear Clara,
> 
> Thank you for taking on the oven repair at Flat 2, 176 Lantern Quay, Westmarsh, ZZ8 5ZZ (tenant Leo Bennett).
> 
> Your messages give two different dates. Your call to the tenant (21/05/2024) was for 22/05/2024 at 2:30pm, but your emails of 21/05/2024 say 21st June. Please confirm the correct date and time with us in writing.
> 
> Please also tell us the reason you believe the oven is out of warranty, such as the install date or the warranty terms, so the landlord can decide. We are waiting for the landlord's decision on whether you can attend and what spend is approved, so please do not book any repair work until we confirm.
> 
> Kind regards

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo,
> 
> Thank you for reporting the oven. Harbour Services have spoken to you about a visit, but the date is not confirmed yet. Our records and their emails show different dates, so we are checking the correct one with them and will let you know as soon as we have it.
> 
> The oven may be outside its warranty, so we are also waiting for the landlord to decide how the repair should go ahead. We will contact you once we hear back.
> 
> Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Harbour Services' out-of-warranty statement is their claim; no warranty document is on file.
- Sending these messages does not approve any spend or book any visit.
- The installer and install date are unverified because the sources conflict.

## Remaining work
- Landlord decision: Harbour Services at his cost (with cap), or his own contractor. Owner: Felix, review 2024-05-23.
- Written confirmation of the visit date. Owner: Clara, Harbour Services.
- Warranty evidence (installer, install date, terms) if a warranty claim is pursued. Owner: Harbour Services or landlord.

## Missing or unavailable information
- Landlord's decision on whether Harbour Services attends and at what cost.
- Confirmed visit date and time from Harbour Services.
- Installer and install date: Harbour Services in our records, Keystone Works in the landlord's message; event 014 gives March 2025, which is after today.
- Attachments referenced at events 003 and 013 are unavailable.

## Conflicts between sources
- Installer: events 007 and 014 say Harbour Services; landlord's event 006 says Keystone Works. Treated our records as the working position and asked the landlord to confirm.
- Install date: event 014 says March 2025, which is after today (2024-05-21). Treated as an error.
- Visit date: event 018 call says 22/05/2024 2:30pm; events 019 and 020 say 'tomorrow, 21st June'. Unresolved; provider asked to confirm.
- Warranty: landlord expects cover; provider (event 020) says it has expired. Unverified; provider asked for the reason.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour Services is assigned, but no spend is approved. The visit date is unconfirmed (22/05/2024 2:30pm per the call; 21 June per emails). The landlord must decide whether Harbour Services attends at his cost or he uses his own contractor. The ticket is on hold until 2024-05-23.

**2. What is the next action, who is it for, and through which channel?**

Email Felix (landlord, A1) asking whether Harbour Services should attend at his cost, who installed the oven, and any cap, or whether he will use his own contractor. Email Clara at Harbour Services (A2) to confirm the visit date in writing and give the out-of-warranty reason. Email tenant Leo Bennett (A3) that the date is not yet confirmed and the landlord's decision is pending.

**3. Does anything need a human decision, and why?**

Not yet. The decision belongs to the landlord (whether to spend and with whom). The fault is routine, not an emergency, and the landlord was asked today. Escalate if he stays silent past the chase rule.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"025-warr… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","t… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"025-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"025-warranty-dates","reason":"Waiting for Landlord","comment":"Waiting for Felix to say whether Harbour Services should atten… | 1 | ❌ failed | Ticket 025-warranty-dates not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Waiting for Felix to say whether Harbour Services should a… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A4: First hold call used the case label instead of the ticket ref. Listed tickets, found NBL-025-warranty-dates, and reapplied the hold (A5, verified).
