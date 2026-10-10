# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; Harbour Services assigned, visit date conflicts, and they claim no warranty against the landlord's expectation. I recorded the landlord's conditional (charge-free) decision, asked the provider for the date and warranty evidence, updated landlord and tenant, and held until 23 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold waiting for provider. Visit date unconfirmed (22 May 2:30pm by call vs "21 June" in emails). Provider says out of warranty; landlord expects warranty cover and charge-free service.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm the actual visit date, and send the install date and warranty terms before out-of-warranty is accepted; no chargeable work without approval | Clara, Harbour Services, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is not yet confirmed, warranty is being checked, ask about install date, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 3 | OTHER | Update landlord: provider's no-warranty claim is being checked, date and firm-name conflicts, any charge comes to them first | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 23 May for the provider's reply | Harbour Services | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> Hi Clara, thanks for your emails. Two things please, by end of tomorrow (22 May):
> 1) Visit date: your call with the tenant set the visit for tomorrow 22 May at 2:30pm, but your emails say "tomorrow, 21st June". Please confirm the actual date and time.
> 2) Warranty: you say the oven is no longer under warranty. Manufacturer warranties often run longer than 12 months, and our landlord expects it to be covered. Please send the purchase/install date of the oven and the warranty terms you checked. Our records are inconsistent on the install date (the tenant says last year; one note says March 2025, which cannot be right), so please confirm.
> The landlord has asked for a charge-free service. Please do not carry out any chargeable work without a quote and our approval first.

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Hi Felix, an update on the oven. Harbour Services (who our notes show replaced the oven; your message mentioned Keystone Works, so please tell us if you meant a different firm) say it is no longer under warranty. That is their claim and we are checking it: warranties often run longer than 12 months, so we have asked them for the install date and warranty terms. Our own notes also give an install date (March 2025) that cannot be right, which we are clarifying. They have agreed a visit with the tenant, but the date is unclear (22 May 2:30pm by phone, "21 June" in their emails) so we have asked them to confirm. No chargeable work will go ahead without your approval first. We will update you by 23 May.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Leo, Harbour Services spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June), so we have asked them to confirm. Please treat the visit as not yet confirmed until we write again. We are also checking whether the oven is still under warranty. Since you can't use the oven, if the date ends up being later than suits you, let us know and we will ask for an earlier slot. Could you also tell us roughly when the oven was fitted? You will hear from us by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked with set_visit: the date is unconfirmed.
- The out-of-warranty claim is the provider's and is not verified.
- Landlord's approval is conditional on no charge; no spend approved.
- Nothing here decides who pays.

## Remaining work
- Harbour Services to confirm the date, install date and warranty terms (agency ops, review 23 May).
- If a charge arises, get the quote to the landlord for approval.
- After the visit: record the result, handle the invoice, confirm with the tenant and close.

## Missing or unavailable information
- Actual visit date
- Oven install date and warranty terms
- Whether the landlord's Keystone Works is Harbour Services
- Attachments at events 003 and 013 not seen

## Conflicts between sources
- Visit date: 22/05/2024 2:30pm (call, event 018) vs 21/06 'tomorrow' (emails 019/020).
- Install date: tenant 'last year' vs agency note March 2025 (future, impossible).
- Installer: landlord says Keystone Works vs notes say Harbour Services.
- Warranty: landlord says covered, provider says not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold. Outstanding: confirmed visit date, install date and warranty terms, and a charge-free outcome or a landlord-approved quote.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services asking for the date confirmation and warranty evidence, with updates to the tenant and landlord by email; all sent.

**3. Does anything need a human decision, and why?**

No. This is routine and a dated hold is in place. It goes to a human only if the provider's reply leaves the warranty or cost dispute unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Contact the oven-replacement contractor for a charge-free warr… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-025-warranty-da… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Waiting for Harbour Services to confirm visit date (22 May… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
