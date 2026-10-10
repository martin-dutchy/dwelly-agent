# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven is broken and no approval for paid work exists. Felix asked for a charge-free warranty check through Keystone Works, but Harbour says the oven is out of warranty and the visit date is conflicting. I asked Felix for a decision on a capped chargeable diagnostic, asked Harbour to confirm the date, told the tenant the visit is not confirmed, and held the job for review on 2024-05-23.

## Where the case stands
Ticket NBL-025-warranty-dates. Provider (Harbour Services) assigned by the agency, but no visit is validly booked. Landlord Felix has not approved any work: his email (event 006) asks for Keystone Works to do a charge-free warranty check, and Harbour now says the oven is out of warranty (event 020). Visit date conflicts: 22 May 2024 at 2:30pm (event 018, call) vs 21 June 2024 (events 019, 020). Held for the landlord, review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix to choose: approve Harbour to attend and diagnose as a chargeable job with a spend cap he sets, or have Keystone Works contacted for the warranty check. Also ask who installed the oven and when. | Felix, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services (Clara) to confirm in writing the real visit date (22 May or 21 June), state any call-out charge, and do no chargeable work until landlord approval. | Clara, Harbour Services (contractor) | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo Bennett the visit is not yet confirmed, that we are checking the date with Harbour, and that the warranty question is with the landlord. | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold the job until the landlord replies, with a review on 2024-05-23. | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord, Flat 2, 176 Lantern Quay) (landlord)** (verified)

> Your email asked for Keystone Works to look at the oven as a charge-free warranty job. Harbour Services now reports the oven is no longer under warranty (event 020). Please tell us: (a) whether Harbour Services may attend and diagnose the oven as a chargeable job, and if so the most you will pay before we ask again; or (b) whether you want Keystone Works contacted instead. Also please confirm who installed the oven and when, as our records conflict (one note says Harbour Services, March 2025, which is not possible).
> 
> Options: Recommended: approve Harbour Services to attend and diagnose, with a spend cap you set (we will not go above it without asking you); Contact Keystone Works for the warranty check you asked for, and tell us their outcome; Arrange your own contractor (tell us the name and a date)

**A3 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello Clara,
> 
> Thank you for your email about Flat 2, 176 Lantern Quay (oven repair).
> 
> Two things first. Your emails and call notes give two visit dates: 22 May 2024 at 2:30pm (after your call with the tenant) and 21 June 2024. Please confirm in writing the exact date and time you have booked with the tenant. Please do not treat any date as booked until we confirm it.
> 
> Second, the landlord has not yet approved any paid work. We have asked him whether you may attend and diagnose the oven as a chargeable job, and what limit he will set. Please do not carry out any chargeable work or send a quote until we have his approval. Please also tell us whether a diagnostic visit has a call-out charge, and how much.
> 
> Thank you.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo,
> 
> Thank you for your call about the oven. Harbour Services has said they can attend, but the visit date is not confirmed yet. We have seen two different dates, so we are checking the correct one with them now. We will let you know as soon as it is confirmed.
> 
> The landlord is also checking whether the oven is still under warranty. Until he confirms, we cannot approve the repair itself. Please keep the oven unused if it is unsafe, and let us know straight away if you smell gas or notice anything else that worries you.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord does not approve any spend; no contractor was instructed for chargeable work.
- The 22 May and 21 June dates are unconfirmed; no visit is booked by set_visit.
- Harbour's view that the oven is out of warranty is their statement, not verified; the installer and date are unresolved (one note says Harbour in March 2025, a future date).

## Remaining work
- Landlord (Felix) to decide on Harbour as chargeable diagnostic with a cap, or Keystone Works warranty check, and confirm installer/date. Review 2024-05-23.
- Harbour to confirm visit date in writing and any call-out charge.
- Once approved, assign the contractor, book the visit, record the result and close with evidence.

## Missing or unavailable information
- Landlord's decision on who attends and any spend cap.
- Oven installer name and installation date.
- Harbour's confirmed visit date and call-out cost.
- Attachments referenced at events 003 and 013 are unavailable.

## Conflicts between sources
- Visit date: 22 May 2024 2:30pm (call, event 018) vs 21 June 2024 (events 019, 020). Events 019/020 say 'tomorrow', which matches 22 May; 21 June treated as an error pending Harbour's written confirmation.
- Installer: landlord says Keystone Works did the replacement (event 006); agency notes say Harbour Services (events 007, 014). Event 014 says March 2025, after today, so unreliable.
- Warranty: landlord believes the oven is under warranty (event 006); Harbour says it is not (event 020). Not verified; trusted the later contractor statement pending evidence.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Provider assigned but no visit validly booked. Landlord has not approved paid work. The landlord asked for a charge-free warranty check with Keystone Works; Harbour says the oven is no longer under warranty. Visit date conflicts (22 May vs 21 June). Outstanding: landlord decision, installer/date, Harbour's confirmed date and cost. Held until 2024-05-23.

**2. 2. What is the next action, who is it for, and through which channel?**

Email Felix (landlord) for a decision on Harbour as a capped chargeable diagnostic or Keystone Works warranty check (request_landlord_approval). Email Clara at Harbour Services to confirm the visit date and any call-out charge, and not to start chargeable work. Email Leo Bennett (tenant) that the visit is not yet confirmed.

**3. 3. Does anything need a human decision, and why?**

Not yet. The decision on spend and who attends belongs to the landlord, and we have asked him. Escalate only if he does not reply by 2024-05-23 or if the charge is above what he approves.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"025-warranty-dates","decision":"unclear","evidence_quote":"Felix requests that the contractor used by Keystone Works for the … | 1 | ❌ failed | Ticket 025-warranty-dates not found on read-back |
| A2 | `request_landlord_approval` | {"ticket_ref":"025-warranty-dates","landlord":"Felix (landlord, Flat 2, 176 Lantern Quay)","decision_needed":"Your email asked for Keystone … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","t… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"025-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"025-warranty-dates","reason":"Waiting for Landlord","comment":"Waiting for Felix to say whether Harbour Services may attend a… | 1 | ❌ failed | Ticket 025-warranty-dates not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"unclear","evidence_quote":"Felix requests that the contractor used by Keystone Works for … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Waiting for Felix to say whether Harbour Services may atte… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Used case id instead of ticket ref; retried with NBL-025-warranty-dates after list_tickets and verified as A6.
- A5: Same wrong-ref error; retried with NBL-025-warranty-dates and verified as A7.
