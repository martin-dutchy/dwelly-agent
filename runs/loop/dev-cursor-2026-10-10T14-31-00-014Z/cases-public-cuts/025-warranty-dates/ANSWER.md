# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; provider assigned and says no warranty, but gave no evidence and two conflicting visit dates. I asked the provider for the date, install date and terms, updated landlord and tenant, recorded the conditional landlord decision and held to 22 May.

## Where the case stands
Stage mp_time, provider (Harbour Services) assigned, visit NOT confirmed. On hold (Waiting for Provider) until 2024-05-22 for visit date, install date and warranty terms. Landlord approval is conditional: charge-free warranty service only.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the actual visit date/time, install date, warranty terms and who fitted the oven; no chargeable work without approval | Clara, Harbour Services, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit time is unconfirmed, ask if waiting is acceptable (essential appliance), warranty being checked | Leo Bennett, tenant | email | A4 ✅ |
| 3 | OTHER | Update landlord: correct the wrong March 2025 date, warranty claim unevidenced, contractor name conflict, visit unconfirmed, ask for warranty paperwork | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 22 May for provider reply | Harbour Services | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails (events 019 and 020) say the visit is 'tomorrow, 21st June', but your call with the tenant set it for tomorrow 22 May 2024 at 2:30pm. Which date is correct? Please confirm the exact date and time.
> - You say the oven is no longer under warranty. Please send the purchase/install date and the warranty terms you checked, as manufacturer warranties often run longer than 12 months.
> - Our records disagree on who fitted the oven (landlord mentions Keystone Works, our note says Harbour Services). Please confirm whether Harbour Services fitted it.
> - Please do not carry out any chargeable work without our written approval; send a quote first.
> 
> Why: Visit date conflicts and warranty status is unevidenced; landlord only authorised charge-free warranty service.

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Hello Felix, an update on the oven at Flat 2, 176 Lantern Quay. Apologies: my earlier email said the oven was replaced in March 2025, which can't be right. The tenant says it was last year and we are confirming the exact date. Harbour Services say the oven is no longer under warranty, but they haven't yet given us the install date or warranty terms. Manufacturer warranties often run longer than 12 months, so we have asked them for both and will check. You mentioned Keystone Works, but our notes say Harbour Services fitted it; we've asked them to confirm. A visit is expected tomorrow afternoon but the provider has given two different dates, so we've asked them to confirm. Nothing chargeable will go ahead without your approval first. Could you tell us if you have the original purchase or warranty paperwork? We'll update you by 22 May.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience with the oven. Harbour Services spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails to us name a different date, so we are asking them to confirm. Please treat the time as not yet confirmed until we tell you. Is waiting until then okay for you, or would you like us to ask for a sooner slot? We are also checking whether the oven is still under warranty, so any cost is sorted with the landlord and not you. We'll update you by 22 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit was booked with set_visit; the date is unconfirmed
- Provider's 'no longer under warranty' claim is unverified, not accepted
- No spend approved; landlord only asked for charge-free warranty service
- Nothing established about the cause of the fault

## Remaining work
- Harbour Services to confirm visit date, install date, warranty terms (owner: provider, review 22 May)
- If not under warranty and a charge arises, quote goes to landlord for approval
- Record work result after visit

## Missing or unavailable information
- Actual visit date (22 May vs 21 June)
- Oven install/purchase date and warranty terms
- Who fitted the oven (Harbour Services vs Keystone Works)

## Conflicts between sources
- Visit date: call event 018 says 22 May 2:30pm; emails 019/020 say 'tomorrow, 21st June'
- Install date: tenant says last year; agency email event 014 says March 2025 (future date, error)
- Installer: landlord says Keystone Works; note says Harbour Services
- Warranty: landlord believes covered; provider says not, without evidence
- Call summary says 'agent's oven' - treated as the tenant's call

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit unconfirmed (call says 22 May 2:30pm, emails say 21 June). Warranty status claimed as expired but unevidenced; install date conflicts (tenant: last year; our email: March 2025; landlord: Keystone Works vs Harbour Services).

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services asking for confirmed visit date, install date and warranty terms; updates sent by email to landlord and tenant.

**3. Does anything need a human decision, and why?**

No. Nothing needs a human yet; if the oven is out of warranty and a quote arises, it goes to the landlord for approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"025","decision":"conditional","conditions":"Charge-free warranty service only; any charge must come back to the landlord for … | 1 | ❌ failed | Ticket 025 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hello Felix, an update on… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"025","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May 2:30pm per call vs 21… | 1 | ❌ failed | Ticket 025 not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Charge-free warranty service only; any charge must come back t… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May 2:… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Wrong ticket ref '025'; retried with NBL-025-warranty-dates as A6, verified
- A5: Wrong ticket ref; retried as A7, verified
