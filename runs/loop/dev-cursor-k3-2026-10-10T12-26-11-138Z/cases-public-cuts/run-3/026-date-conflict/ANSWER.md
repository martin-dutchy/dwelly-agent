# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the oven visit is on 8 Sept but our records and reminders say Monday 30/08, which is a Saturday. I asked the provider to confirm the date and tell us whether anyone attended, told the tenant the new date is not confirmed yet, and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved ("Yes go ahead"). Visit date disputed: record says 30/08/2025 (a Saturday, already today), tenant says 8 Sept. Waiting on provider to confirm the date; follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the agreed date (8 Sept vs 30 Aug) and whether anyone attended today | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30 Aug, 8 Sept is not yet confirmed, and she will hear by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation; review 2 Sept | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Please confirm the date you have agreed with the tenant for the oven repair at Flat 3, 3 Willowmere Road: 8 September 2025 or 30 August 2025? Our record says 30/08/2025, which is a Saturday, but the tenant says 8 September (a Monday).
> - Did anyone attend today (30 August)? If not, please note it as no visit and confirm the new slot in writing.
> 
> Why: Tenant and system record disagree on the visit date; only the provider can confirm a booking.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for letting us know. Our record currently shows 30 August, which was a mistake in our reminders as that date is a Saturday. We have not yet had the contractor confirm 8 September, so we can't say it is booked yet. We have asked them to confirm the date in writing and will update you by Tuesday 2 September. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed; 8 September is only the tenant's proposal until the provider confirms.
- Does not establish whether a visit happened today, the cause of the fault or cost.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency)
- Record work result after visit; quote/invoice if needed
- Attachment at event 014 was unavailable and not seen

## Missing or unavailable information
- Provider's confirmed visit date
- Whether the provider attended on 30/08

## Conflicts between sources
- Visit date: 30/08/2025 (events 017-020) vs 8 Sept (tenant, event 021); 30/08 is a Saturday but is described as Monday. Neither confirmed by the provider.
- Names and provider differ across events (Keystone Compliance / Riverside Works / Keystone Utilities / Lantern Utilities; Clara / Ruben / Grace); treated as record noise, flagged for clean-up.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; visit date disputed (30/08 record vs 8/09 tenant). Provider confirmation outstanding, then visit, result, and any quote or invoice.

**2. What is the next action, who is it for, and through which channel?**

Provider date confirmation request to Keystone Compliance by email (done), and a holding update to the tenant by email (done).

**3. Does anything need a human decision, and why?**

No. This is a routine date check the provider can settle. Escalate only if no reply by 2 Sept.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hi Clara… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Chase Keystone Compliance for written confirmation of oven visit date (8 Sept vs 30 Aug); then set_visit a… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
