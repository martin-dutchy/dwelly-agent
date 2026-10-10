# Case 102: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Harbour Services gave a firm £150 phone quote to fit new heating elements, with a visit pencilled for 6 June 10:00. No landlord approval of spend exists, so I recorded the quote, asked the landlord to approve, told the contractor to hold off and told the tenant the visit is provisional.

## Where the case stands
NBL-102 at visit stage. Harbour Services quoted £150 by phone (warranty expired). Visit 6 Jun 10:00 confirmed by contractor but work not approved. Waiting on landlord for spend approval; on hold, review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve the £150 quote by 7 June | Felix, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit is provisional pending approval; next update by 7 June | Leo Bennett, tenant | email | A4 ✅ |
| 3 | CHASE_PROVIDER | Tell Harbour not to start until approved; confirm VAT and the tenant-agreed date | Clara, Harbour Services | email | A3 ✅ |
| 4 | WAIT | Wait for landlord decision; review 2024-06-07 | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services (fitted the oven March 2025, now just out of its 12-month warranty) quoted £150 by phone to fit new heating elements (VAT status not stated). Do you approve this spend? Please reply yes or no by 2024-06-07. Their engineer is pencilled for 6 June 10:00 and we have asked them not to start until you approve. (£150)
> 
> Options: Approve £150 with Harbour Services (recommended); Arrange your own contractor; Ask Harbour to try the supplier for a goodwill repair first

**A3 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 013 email)** (verified)

> Hi Clara, thanks for the call. We have noted your £150 quote and the visit for 6 June, 10:00. Please do not start work until we confirm the landlord has approved the quote; we have asked him and will tell you as soon as we hear. Please confirm by email whether £150 includes VAT. Please also confirm the tenant has agreed 6 June, 10:00 (earlier emails carried conflicting dates).

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email)** (verified)

> Dear Leo, an update on your oven. Harbour Services say they can fix it with new heating elements and have pencilled in a visit on 6 June at around 10:00. We are waiting for the landlord to approve the cost, so please treat the visit as provisional until we confirm. Earlier emails showed a wrong date (21 June), please ignore it. We will update you by 7 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or commit spend.
- The visit date is contractor-confirmed only; the tenant has not confirmed it and work must not start before approval.
- The landlord's earlier request for a free warranty service is not approval of £150.

## Remaining work
- Landlord decision on £150 (agency, by 7 June)
- Confirm the visit with tenant and provider, or rebook
- Invoice, tenant confirmation and close after the work

## Missing or unavailable information
- Whether £150 includes VAT
- Tenant's agreement to 6 June 10:00
- Landlord spend limit (none on file)
- Quote was verbal only; no written quote

## Conflicts between sources
- Visit dates conflict: 22/05, 21/06 (wrongly worded as 'tomorrow') and 06/06. I trust the latest contractor-confirmed date, 6 June 10:00, but treat it as provisional.
- Event 014 says the oven was fitted March 2025, which postdates the 2024 events. I used the contractor's statement that it is just out of warranty.
- Tenant contact number differs between events 013 and 028/029.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote received (£150), visit booked by the contractor for 6 Jun 10:00; landlord approval of the spend is outstanding, as are VAT and tenant confirmation of the date.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email (done), with tenant and contractor updates by email, and a chase on 7 June.

**3. Does anything need a human decision, and why?**

No human escalation. The decision is the landlord's, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"Case 102","provider":"Harbour Services","amount_gbp":150,"vat":"none","items":["New heating elements and fitting for oven"],"… | 1 | ❌ failed | Ticket Case 102 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"Case 102","decision_needed":"Harbour Services (fitted the oven March 2025, now just out of its 12-month wa… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"due_on":"2024-06-07","purpose":"Chase landlord for decision on £150 Harbour Services oven quote; confirm visit with tenant and provider","… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `record_quote` | {"ticket_ref":"NBL-102","provider":"Harbour Services","amount_gbp":150,"vat":"none","items":["New heating elements and fitting for oven"],"s… | 1 | ✅ verified | Ticket NBL-102 read back after record_quote |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-102","reason":"Waiting for Landlord","comment":"Awaiting landlord approval of £150 Harbour Services quote (APR-101); visi… | 1 | ✅ verified | Ticket NBL-102 read back after put_on_hold |

## Failed or unverified actions
- A1: First record_quote used the wrong ticket ref; retried with NBL-102 and it verified (A6).
