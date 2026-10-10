# Case V025-contractor-oven-warranty-gdyhaf: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven is out of warranty by the contractor's account, and Harbour Services have quoted £150 by phone. The landlord only asked for a free warranty service, so I recorded the quote, asked him to approve the spend, told the contractor not to start paid work, updated the tenant and held the job until 6 June.

## Where the case stands
Stage: visit. Harbour Services quoted £150 (phone, 5 Jun); visit set for 6 Jun 10:00 (event 036). Landlord has not approved this spend. Held waiting for landlord, review 6 Jun.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve the £150 Harbour Services quote | Felix, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell Leo the visit is pencilled for 6 Jun about 10am, cost awaiting landlord approval, next update by 7 Jun | Leo Bennett, tenant | email | A4 ✅ |
| 3 | CHASE_PROVIDER | Tell Clara not to start paid work until approved and to confirm in writing whether the price includes VAT | Clara, Harbour Services, contractor | email | A3 ✅ |
| 4 | WAIT | Hold for landlord decision, review 2024-06-06 | Felix, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is just out of warranty. They quote £150 (VAT not stated) for new heating elements and fitting, engineer visit pencilled for 6 June 10:00. Do you approve this £150 spend? Yes or no please. (£150)
> 
> Options: Yes, approve £150 with Harbour Services; No, you will arrange your own contractor

**A3 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 022 email)** (verified)

> Hi Clara, thanks for the call today. We have noted your £150 quote and the visit for 6 June, 10:00. The landlord has not yet approved the spend, so please do not start paid work until we confirm in writing. Please also confirm in writing whether £150 includes VAT. We will update you as soon as we hear.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email)** (verified)

> Hi Leo, an update on the oven. Harbour Services say they can fix it with new heating elements and have pencilled in an engineer for tomorrow, 6 June, around 10am. Earlier emails gave different dates, so please ignore those. The repair cost needs the landlord's approval first, which we have asked for. We will confirm whether the visit is going ahead, and we will update you by Friday 7 June at the latest. Please let us know if the time doesn't suit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- The visit date is not confirmation that work can start or who pays
- The warranty is the contractor's claim that it has expired; not independently checked

## Remaining work
- Landlord decision on £150; if approved, record it and approve the quote
- If the visit cannot go ahead before approval, rebook with the provider
- Chase landlord on a second channel if no answer by review date
- Record the result, invoice and tenant confirmation, then close

## Missing or unavailable information
- Landlord approval of the spend
- Whether £150 includes VAT
- Written quote document
- Warranty and invoice details from the Keystone Works/Harbour Services oven fit (landlord named Keystone Works)

## Conflicts between sources
- Appointment dates disagree across events (22/05, 21/06, 06/06); trusted the latest provider-confirmed 06/06 10:00 (event 036).
- Landlord named Keystone Works, but records show Harbour Services fitted the oven.
- Oven fit date is given as March 2025 in agency emails, after the 2024 case dates; the warranty claim is unverified.
- Event 028 'Pets:' field holds fault text and was ignored; tenant phone numbers differ between events 013 and 028.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 6 Jun 10:00 and the £150 quote is recorded. Landlord approval of the spend is outstanding, and the VAT position is unknown.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email (APR-102). Tenant and contractor have been updated by email.

**3. Does anything need a human decision, and why?**

Not an agency human. The decision is the landlord's, and it has been requested. No escalation needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-V025-contractor-oven-warranty-gdyhaf","provider":"Harbour Services","amount_gbp":150,"vat":"none","items":["New heating e… | 1 | ✅ verified | Ticket NBL-V025-contractor-oven-warranty-gdyhaf read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-V025-contractor-oven-warranty-gdyhaf","decision_needed":"Harbour Services say the oven is just out of … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 022 email)","t… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-V025-contractor-oven-warranty-gdyhaf","reason":"Waiting for Landlord","comment":"Waiting for landlord to approve £150 Har… | 1 | ✅ verified | Ticket NBL-V025-contractor-oven-warranty-gdyhaf read back after put_on_hold |

## Failed or unverified actions
_None._
