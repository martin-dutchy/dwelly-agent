# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the visit was arranged for 8 Sept, but our record and notices say 30/08 (a Saturday labelled Monday). I asked the provider to confirm in writing, told the tenant 8 Sept is unconfirmed, noted the conflict and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (landlord approved, event 009). Visit recorded 30/08/2025 10-12 but tenant says 8 Sept was arranged. No provider confirmation of either date, no work result. Waiting on provider; follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to confirm the agreed date (8 Sept vs 30/08) and whether anyone attended today | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record shows 30/08, 8 Sept is not yet confirmed, we are checking with provider, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Wait for provider confirmation, review 2025-09-02 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Which date did you agree with the tenant for the oven repair at Flat 3, 3 Willowmere Road: Monday 8 September 2025 or the 30/08/2025 on our record? (30/08/2025 is a Saturday, but the slot says Monday.)
> - Did anyone attend or attempt a visit this morning (30/08/2025)?
> - Please confirm the exact date and time window in writing so we can book it.
> 
> Why: Our record holds 30/08/2025 10-12, but the tenant phoned today saying she arranged 8 September. Provider confirmation is needed before anything is booked.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call; tenant email thread event 015)** (verified)

> Hello, thanks for letting us know. Our record currently shows the oven visit as 30/08/2025, 10-12, but you've told us you arranged 8 September. We haven't confirmed 8 September yet. We've asked the repair company to confirm the correct date in writing, and we'll let you know once they do. Please don't worry about the missed morning slot; we're checking what happened. We'll update you by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked: set_visit needs provider confirmation; 8 Sept is only the tenant's claim
- Not recorded as missed appointment or no access
- Does not establish the oven fault cause or cost

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency)
- Visit, result, quote/invoice, final checks
- If provider silent by 2 Sept, chase on another channel or escalate swap

## Missing or unavailable information
- Provider's confirmed visit date
- Whether a visit was attempted on 30/08
- Attachment at event 014 unavailable, not seen

## Conflicts between sources
- 30/08/2025 (events 017-020) vs 8 Sept (event 021); 30/08 is a Saturday but described as Monday. Kept the system record as current until the provider confirms.
- Provider and tenant names vary across events (Keystone Compliance, Riverside Works, Lantern Utilities; Clara, Ruben Oakley, Grace Mercer).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and provider assigned. The visit date is disputed (30/08 on record vs 8 Sept per tenant) and unconfirmed by the provider. No result yet.

**2. What is the next action, who is it for, and through which channel?**

Ask the provider by email to confirm the date and whether they attended; reply to the tenant by email that 8 Sept is not yet confirmed. Both done.

**3. Does anything need a human decision, and why?**

No. It is routine and resolved by the provider's confirmation. Escalate only if the provider stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call; tenant email thre… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"ticket","note":"Date conflict: record/events 017-020 say 30/08/2025 (a Saturday, though described as Monday); tenant call event 0… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Check provider has confirmed visit date (30/08 vs 8 Sept); then set_visit and update tenant","party":"Keys… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
