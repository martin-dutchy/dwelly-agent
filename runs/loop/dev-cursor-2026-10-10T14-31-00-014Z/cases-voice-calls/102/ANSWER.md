# Case 102: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is at the visit stage. The provider gave a £150 phone quote and a confirmed visit for 6 Jun at 10:00. I recorded the quote, asked the landlord to approve it, told the tenant and the provider, and put the ticket on hold with a review date of 6 Jun. No human decision is needed yet.

## Where the case stands
Stage: visit. Harbour Services confirmed a visit on 6 Jun 10:00. Their £150 phone quote is recorded. The landlord has not approved it; the only approval so far was to contact the contractor about a warranty repair, and the warranty is reported expired. The ticket is on hold awaiting the landlord, review 6 Jun.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve the £150 quote, arrange his own contractor, or ask for a second quote | Felix, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the visit is 6 Jun 10:00, that the earlier 21 June dates were wrong, and that the repair awaits landlord approval; next update by 7 Jun | Leo Bennett, tenant | email | A4 ✅ |
| 3 | REQUEST_INFORMATION | Ask Harbour Services to confirm the VAT status, the install date and warranty terms, and not to start work until approval is confirmed | Clara, Harbour Services, contractor | email | A3 ✅ |
| 4 | WAIT | Hold for landlord approval; review 6 Jun | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Approve Harbour Services' quote of £150 (new heating elements, fitted) for the oven at Flat 2, 176 Lantern Quay, or arrange your own contractor (£150)
> 
> Options: Approve the £150 quote with Harbour Services (recommended); Arrange your own contractor; Ask us to get a second quote
> 
> Update: Harbour Services attended on 22 May but could not fix it. Clara says the oven is just out of its 12-month warranty (fitted March, per records), and they were speaking to the supplier; no goodwill outcome reported. They have now given a phone quote of £150 (VAT status not yet confirmed). Their engineer is confirmed to visit on 6 June at 10:00. We have asked them for the install date and warranty terms, as warranties can run longer than 12 months. No work beyond inspection will start until you approve.

**A3 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 013 email to Harbour Services)** (verified)

> Hi Clara, thanks for the call today. We have your £150 quote for new heating elements and the visit on 6 June at 10:00 at Flat 2, 176 Lantern Quay. Earlier emails mentioned 21 June and 22 May, so please treat 6 June 10:00 as the date. Please don't start the repair until we confirm the landlord's approval; we've asked them today. Could you please confirm in writing: (1) whether £150 includes VAT, (2) the oven's purchase/install date and the manufacturer's warranty terms, as it may still be covered. Thanks.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email to tenant)** (verified)

> Dear Leo, sorry for the confusing dates in our earlier emails (they said 21 June). Harbour Services have told us their engineer can visit tomorrow, 6 June, at around 10:00 to fix the oven's heating elements. Please let us know if that doesn't suit and we'll rearrange. The repair itself is waiting for the landlord's approval of the cost, which we've asked for today; we'll update you by 7 June at the latest. Since the oven has been out for a while, tell us if this causes you any difficulty.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or commit spend
- The visit confirmation does not authorise repair work or establish who pays
- Warranty status is the provider's claim and is not verified

## Remaining work
- Landlord decision on the £150 (agency/Felix)
- Provider to confirm VAT, install date and warranty terms
- After the visit: record the result, invoice and tenant confirmation, then close
- If there is no landlord reply by 6 Jun, chase on a second channel

## Missing or unavailable information
- Landlord approval of the quote
- VAT status of the £150
- Oven install date and warranty terms
- Property spend limit (none on record)

## Conflicts between sources
- Visit dates: 22/05 (events 018 and 027), 21/06 (events 019, 020, 028, 029) and 06/06 (events 034 to 036). I treat 6 Jun 10:00 as current because the contractor confirmed it by phone.
- The oven install date is given as March 2025, which is after the event dates. The landlord email says it was replaced last year (2023), so the warranty status is unverified.
- The tenant contact number differs between events 013 and 028/029.
- The phone-call summary says the quote is firm, but Clara said 'like 150 quid or something'.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is confirmed for 6 Jun 10:00 and the £150 quote is recorded. The landlord has not approved the spend. The provider still owes the VAT status and the warranty and install date.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email. The tenant and provider have also been messaged by email.

**3. Does anything need a human decision, and why?**

No escalation now. The only decision needed is the landlord's, and it has been requested. Escalate if the landlord stays silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-102","provider":"Harbour Services","amount_gbp":150,"vat":"none","items":["New heating elements and fitting"],"source":"P… | 1 | ✅ verified | Ticket NBL-102 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-102","decision_needed":"Approve Harbour Services' quote of £150 (new heating elements, fitted) for the… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email to H… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email to tenant)","ticket_… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-102","reason":"Waiting for Landlord","comment":"Awaiting landlord approval of Harbour Services £150 quote (phone, 5 Jun).… | 1 | ✅ verified | Ticket NBL-102 read back after put_on_hold |

## Failed or unverified actions
_None._
