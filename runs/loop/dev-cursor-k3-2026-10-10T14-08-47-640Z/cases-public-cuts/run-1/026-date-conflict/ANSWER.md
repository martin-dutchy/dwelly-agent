# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant says her visit was for 8 Sept, but our records and messages say 30/08, which was mislabelled as a Monday when it is a Saturday. I asked the provider to confirm the real date and whether anyone attended. I told the tenant the 8 Sept date is unconfirmed and that nobody should be expected until the provider confirms it. The job is on hold with a review date of 2 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone Compliance (event 009). Visit date disputed: record says 30/08/2025 (labelled Monday, actually Saturday); tenant says 8 Sept. Provider has not confirmed either. On hold waiting for the provider, review 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the actual visit date and whether anyone attended on 30/08 | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, 8 Sept is unconfirmed, we are checking with the provider, and she will hear by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold waiting for provider, review 2025-09-02 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email to contractor)** (verified)

> - What date and time have you actually confirmed with the tenant for the oven repair at Flat 3, 3 Willowmere Road: 30/08/2025 (a Saturday, though our emails said Monday) or Monday 8 September 2025?
> - Did anyone attend today, 30/08/2025? If so, please send the findings; if not, please confirm the visit is not going ahead that day.
> 
> Why: Our records say 30/08/2025 (labelled 'Monday', but it is a Saturday); the tenant phoned today saying she arranged 8 September. A date only the tenant gave is not a booking, so we need your confirmation. Please reply by end of Monday 1 September.

**A2 · send_message → Clara (tenant) via email, existing thread (event 015 email / event 021 call)** (verified)

> Hi Clara, thanks for calling. Sorry for the mix-up. Our record holds 30/08/2025 for the oven repair, but our messages called that a Monday when it is a Saturday, so that date looks wrong. You have said you arranged 8 September. We have not had that confirmed by the engineers yet, so we have asked them to confirm the real date today. Please don't expect anyone until they confirm it. We will update you by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here books or confirms 8 September; only the provider can confirm a date.
- No visit or result is recorded for 30/08; we do not know whether anyone attended.
- The oven fault and cost are unchanged; no quote exists.

## Remaining work
- Provider to confirm the date and any attendance; then set_visit or record the result (owner: agency ops).
- If no reply by 2 Sept, chase on another channel.
- Landlord update once the visit is confirmed.

## Missing or unavailable information
- The provider's confirmed visit date
- Whether anyone attended on 30/08
- The unavailable attachment at event 014

## Conflicts between sources
- Visit date: 30/08/2025 (events 017-020) vs 8 Sept (tenant, event 021); 30/08/2025 is a Saturday but is labelled Monday.
- Provider named as Keystone Compliance, Riverside Works and Lantern Utilities; tenant named as Clara, Ruben Oakley, Grace Mercer and Harriet Fletcher. Treated as the same job and property.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is at the visit stage with the landlord's approval in place. The visit date is unconfirmed (30/08 on the record vs 8 Sept from the tenant), and the provider has not said whether anyone attended today.

**2. What is the next action, who is it for, and through which channel?**

Provider confirmation request to Keystone Compliance by email (done). Tenant reply by email (done). Hold with review on 2 Sept.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation that one question to the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email to contr… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 email / event 021 call)","body":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"ticket","note":"Date conflict: record/system (events 017-020) say 30/08/2025 labelled 'Monday' (actually Saturday); tenant call e… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"026","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm the actual visit date (30/08 vs 08… | 1 | ❌ failed | Ticket 026 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm the actual visit… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |

## Failed or unverified actions
- A4: put_on_hold failed because I used the wrong ticket ref (026). I retried with NBL-026-date-conflict and it verified as A5.
