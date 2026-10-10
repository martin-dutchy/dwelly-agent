# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant disputes the visit date: the record says 30/08 and she says 8 September. I asked the provider to confirm attendance and the true date, told the tenant that 8 September is unconfirmed, noted the conflict and set a follow-up for 1 Sept.

## Where the case stands
Landlord approved our contractor (Keystone Compliance assigned). Visit date disputed: record holds 30/08/2025 10:00 (a Saturday, mislabelled Monday); tenant says 08/09/2025. Provider has not confirmed either. Waiting on provider; follow-up 1 Sept.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm whether anyone attended on 30/08 and the actual visit date (08/09 is tenant-stated only) | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record date, that 08/09 is unconfirmed, and that we will update her by 1 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider's confirmation on 1 Sept | Keystone Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, oven repair at Flat 3, 3 Willowmere Road. Our record shows a visit of 30/08/2025 10-12, but the tenant has called to say she agreed 8 September 2025 with your engineer. Our messages also called 30/08 a "Monday", but it is a Saturday. Please reply by Monday 1 September to confirm: (1) did anyone attend this morning, and (2) the actual visit date and time. We will not treat 8 September as booked until you confirm it.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hello Clara, thanks for calling, and sorry for the mixed-up dates. Our record holds Saturday 30/08/2025, 10-12 (our earlier messages wrongly said Monday). You've told us you agreed 8 September, but the engineer hasn't confirmed that yet, so we've asked them to confirm the date in writing. Please don't expect anyone on a date until they confirm. We'll update you by Monday 1 September. If the engineer did turn up this morning, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked for 8 September: only the tenant stated it
- Nothing establishes whether anyone attended on 30/08
- The oven fault cause and cost are unknown

## Remaining work
- Provider to confirm date; then set_visit and tell tenant
- Record work result after the visit
- Quote/invoice handling if needed
- Possibly tell landlord of the outcome

## Missing or unavailable information
- Provider's confirmed visit date and whether they attended 30/08
- Attachment from event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but messages say Monday
- Record 30/08 vs tenant 08/09
- Provider named as Keystone Compliance, Riverside Works, Lantern Utilities; tenant as Clara, Grace Mercer, Ruben Oakley: treated as the same parties
- Event 013 says Keystone, but the 26/08 call involved Riverside Works

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved our contractor and a provider is assigned. The visit date is in conflict (30/08 record vs 08/09 tenant) and the provider has not confirmed either. No work result exists.

**2. What is the next action, who is it for, and through which channel?**

Email to the provider asking them to confirm attendance and the actual date, and email to the tenant saying 8 September is not yet confirmed. Follow-up set for 1 Sept.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation that a message to the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","body":"Hello Cl… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 3, 3 Willowmere Road oven job","note":"Date conflict. Dates: 26/08 call (ev 016) tentative \"Monday 10-12\", tenant to confi… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Check provider's confirmation of oven visit date (30/08 vs 08/09) and whether anyone attended; then set_vi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
