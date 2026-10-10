# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven fault job with Harbour Services assigned. Provider's emails give 21 June for a "tomorrow" visit, while the call said 22 May 2:30pm, and they claim no warranty without evidence. I asked the provider to confirm both, told the tenant and landlord, corrected the earlier wrong install date, and held with a review date of 22 May.

## Where the case stands
Provider (Harbour Services) assigned, landlord approval confirmed, visit NOT booked (date conflict). On hold waiting for provider, review 2024-05-22. Warranty status unverified.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date (22 May 2:30pm vs 21 June), the install date and warranty terms, and which company fitted the oven | Clara, Harbour Services (contractor) | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit is unconfirmed, we are checking warranty, ask roughly when the oven was fitted | Leo Bennett, tenant | email | A2 ✅ |
| 3 | OTHER | Update landlord, correct the wrong March 2025 date, pass on provider's no-warranty claim as theirs, charges to come to him first | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Hold awaiting provider answers, review 22 May | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Which date is the visit: tomorrow Wednesday 22 May at 2:30pm (as agreed on the call) or 21 June (as in your emails)? Please confirm the exact date and time.
> - You say the oven is no longer under warranty. Please send the install/purchase date and the warranty terms (length, what is covered) so we can check before accepting that.
> - Our records say Harbour Services fitted the oven, but the landlord refers to Keystone Works. Which company fitted it?
> - Please do not carry out any chargeable work without our approval first.
> 
> Why: Visit date conflicts and warranty status is unverified; the landlord expects a charge-free service if under warranty.

**A2 · send_message → Leo Bennett (tenant) via email, tenant email on record** (verified)

> Dear Leo, Harbour Services have told us they spoke to you about a visit tomorrow (Wednesday 22 May) at 2:30pm, but their emails to us give 21 June, so it is not confirmed yet. We are checking the exact date with them and will tell you once confirmed; please don't rely on a date until then. We are also checking whether the oven is still under warranty. Could you let us know roughly when the oven was fitted, if you know? We will update you by 23 May at the latest. Kind regards, Northbridge Lettings

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Good afternoon Felix, an update and a correction. My earlier email said Harbour Services replaced the oven in March 2025; that date was wrong (the tenant says it was last year) and I'm sorry. Harbour Services now say the oven is no longer under warranty. That is their claim; we have asked for the install date and warranty terms before accepting it, and also which company fitted it (you mentioned Keystone Works). A visit is likely tomorrow 22 May at 2:30pm but the provider's emails show a conflicting date, so it is unconfirmed. They have been told not to do chargeable work without approval, and any charge will come to you first. Next update by 23 May. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; the date is unconfirmed.
- Does not establish whether the oven is under warranty or who fitted it.
- Landlord has not approved any chargeable spend.

## Remaining work
- Provider to confirm date, install date, warranty terms, fitter (owner: provider; review 22 May)
- If out of warranty and a quote arises, record it and send to landlord for approval
- Set visit once provider confirms a future date
- Final checks, invoice and close after the work

## Missing or unavailable information
- Confirmed visit date
- Oven install/purchase date and warranty terms
- Which company fitted the oven

## Conflicts between sources
- Visit date: 22/05 2:30pm (call, event 018) vs 21 June (emails 019/020, which say 'tomorrow'); treated as unconfirmed.
- Install date: 'last year' (tenant) vs 'March 2025' (event 014, a future date, treated as an error).
- Fitter: Harbour Services (event 007) vs Keystone Works (landlord, event 006).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, landlord approval confirmed, visit unconfirmed (22 May 2:30pm per call vs 21 June per emails). Warranty claim of 'no longer under warranty' is unverified; fitter and install date unclear.

**2. What is the next action, who is it for, and through which channel?**

Ask Harbour Services by email to confirm the date, install date, warranty terms and fitter; tenant and landlord were updated by email.

**3. Does anything need a human decision, and why?**

No. Routine; it only needs provider answers. If a chargeable quote arises it goes to the landlord for approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on record","body":"Dear Leo, Harbour Ser… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Good afternoon Felix, an … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May 2:… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: visit 22/05 2:30pm (call, ev 018) vs \"tomorrow 21st June\" (ev 019/020, sent 21 May);… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
