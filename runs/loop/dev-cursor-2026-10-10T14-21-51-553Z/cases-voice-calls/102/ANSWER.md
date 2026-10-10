# Case 102: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Harbour Services gave a £150 firm quote and offered a 6 June 10am visit by phone. The landlord's earlier reply only covered a warranty approach, so I recorded the quote and asked Felix to approve it. I told the provider not to start before approval, and told the tenant the visit is provisional. A follow-up is set for 6 June.

## Where the case stands
Stage: visit (provider-confirmed 6 June 10:00 by phone, event 036). Harbour Services quoted £150. Landlord approval of the spend is requested and pending. Ticket is on hold awaiting the provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve the £150 quote by 9am 6 June | Felix, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Tell Harbour Services not to start work until approved; ask for VAT status, warranty/install date and date confirmation | Clara, Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the 6 June 10am visit is provisional pending landlord approval and that they will hear again by 6 June | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up on landlord approval and visit on 6 June | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Approve Harbour Services' quote of £150 (new heating elements and fitting) for the oven at Flat 2, 176 Lantern Quay. VAT was not stated on the call; we are checking. (£150)
> 
> Options: Approve £150 with Harbour Services (recommended); Arrange your own contractor; Ask for a second quote
> 
> Update: Harbour Services say the warranty has just expired (oven fitted March 2025 per our notes), so no free repair. Their engineer has offered tomorrow 6 June about 10am; we will ask them not to start work until you approve. Tenant is being updated. Please reply by 9am 6 June, otherwise we will rearrange the visit.

**A3 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 034 call / event 022 email)** (verified)

> Hi Clara, thanks for the call. We've noted your £150 quote for new heating elements at Flat 2, 176 Lantern Quay and the visit for 6 June, around 10am. The landlord hasn't approved the spend yet, so please don't start the repair until we confirm in writing. Please also confirm in writing whether £150 includes VAT, and the oven's purchase/install date and warranty terms. Earlier emails gave 21 June, so please confirm 6 June is the date you're attending.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email)** (verified)

> Dear Leo, sorry for the confusion over dates earlier. Harbour Services have told us they can fix the oven and offered to visit tomorrow, 6 June, around 10am. We're getting the landlord's approval for the cost first, so please treat this as provisional until we confirm. We'll update you by the end of today or first thing tomorrow. If 10am doesn't suit, let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it.
- The visit is not confirmed to the tenant as going ahead until the landlord approves.
- VAT, warranty status and install date remain unverified.

## Remaining work
- Landlord decision on £150 (agency waiting on Felix)
- Provider to confirm VAT, install date and warranty terms, and the date
- After the visit: record the result, invoice, tenant confirmation, then close

## Missing or unavailable information
- Whether £150 includes VAT
- Actual oven install date and warranty terms
- Landlord's spend limit not on file

## Conflicts between sources
- Visit dates: 22/05, 21/06 and 06/06; treated 06/06 (provider-confirmed by phone) as current but provisional.
- Oven fitted 'March 2025' is later than the 2024 case dates, so the warranty claim is unreliable.
- The provider said on the call 'today is October 10th' and then retracted it.
- Tenant contact numbers differ between events 013 and 028.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A £150 quote and a 6 June 10am visit are provider-confirmed. Landlord approval of the spend is outstanding, as are VAT and warranty details.

**2. What is the next action, who is it for, and through which channel?**

Request landlord approval from Felix by email (done). Also email the provider to hold the work and email the tenant to say the visit is provisional (both done).

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, which is routine approval. Escalate P2 only if the landlord stays silent past the 6 June follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-102","provider":"Harbour Services","amount_gbp":150,"vat":"none","items":["New heating elements and fitting"],"source":"P… | 1 | ✅ verified | Ticket NBL-102 read back after record_quote |
| A2 | `request_landlord_approval` | {"ticket_ref":"NBL-102","landlord":"Felix","decision_needed":"Approve Harbour Services' quote of £150 (new heating elements and fitting) for… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 034 call / eve… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-102","due_on":"2024-06-06","party":"Felix, landlord","purpose":"Chase landlord approval of £150 quote; confirm or rearran… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"NBL-102","note":"Route: our contractor Harbour Services; landlord's event 006 only authorised a warranty approach, not spend. £15… | 1 | ✅ verified | NOTE-106 found in the add_note log |

## Failed or unverified actions
_None._
