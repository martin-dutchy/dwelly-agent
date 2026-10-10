# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The system record holds a visit for 30/08/2025, described as "Monday" though it is a Saturday. The tenant says she arranged 8 Sept. I asked the provider to confirm the date and attendance, told the tenant and landlord it is unconfirmed, noted the conflicts and set a follow-up for 1 Sept.

## Where the case stands
Stage: visit. The recorded visit of 30/08/2025 (a Saturday, labelled "Monday") conflicts with the tenant's 8 Sept. The provider has not confirmed either date. Waiting on the provider to confirm attendance and date; the tenant is asked whether 8 Sept is acceptable. Landlord approval ("Yes go ahead") covers our contractor attending; no quote yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance whether anyone attended on 30/08 and to confirm the real date and slot by 31/08 | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, that nobody should be expected on an unconfirmed date, ask whether 8 Sept suits and offer a sooner slot | Clara, tenant | email | A2 ✅ |
| 3 | OTHER | Update landlord that the visit date is unconfirmed | Palmer, landlord | email | A3 ✅ |
| 4 | WAIT | Follow up with provider on 1 Sept for the confirmed date | Keystone Compliance, provider | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email to contractor)** (verified)

> Hello, about the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit on "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday. The tenant has now called to say she agreed 8 September 2025 with your engineer instead. Please reply by end of tomorrow (31 August) to confirm: (1) did anyone attend this morning, and (2) the actual confirmed date and time slot. Please don't treat any date as booked until you confirm it to us. Thank you.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for calling. Sorry for the confusion. Our record shows a visit for "Monday morning (30/08/2025)", but that date is a Saturday, so it looks wrong. You've told us you arranged 8 September 2025 with the engineer. I'm asking the provider to confirm the real date today, and I'll write to you again by 1 September. Please don't expect anyone on a date they haven't confirmed. As you can't use your main oven meanwhile, is 8 September OK for you? If not, I'll ask for an earlier slot. Could you also tell us if anyone turned up this morning?

**A3 · send_message → Palmer (landlord) (landlord) via email, agency landlord record** (verified)

> Hello, an update on the oven repair at Flat 3 (Keystone Compliance, approved by you on 26 Aug). The visit date is unconfirmed: our record says 30/08/2025 (a Saturday), but the tenant says 8 September 2025 was agreed. We've asked the provider to confirm, and we'll update you once they do. No cost has been agreed yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or confirmed via set_visit
- This does not establish which date is right, whether anyone attended on 30/08, the cause of the fault or the cost

## Remaining work
- Provider to confirm attendance and date (agency, follow-up 2025-09-01)
- Record the work result once the visit happens, then quote or invoice
- Confirm the final date to the tenant and landlord

## Missing or unavailable information
- Provider-confirmed visit date
- Whether the 30/08 visit happened
- Unavailable attachment at event 014

## Conflicts between sources
- Visit date 30/08/2025 (events 017-020) vs 08/09/2025 (tenant, event 021); 30/08/2025 is a Saturday but is labelled Monday
- Provider names differ (Keystone Compliance, Keystone Utilities, Riverside Works, Lantern Utilities) and tenant names differ (Ruben Oakley, Clara, Grace Mercer, Harriet Fletcher); treated as the same job and parties

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved and the provider is assigned, but the visit date is disputed (30/08 per record vs 8 Sept per tenant) and unconfirmed by the provider. Outstanding: the provider's confirmation, the visit and its result, and any quote.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking for attendance and the confirmed date by 31/08. Emails to the tenant and landlord say the date is unconfirmed.

**3. Does anything need a human decision, and why?**

No. This is a routine date confirmation and the landlord approval is already in place.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email to contr… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Palmer (landlord)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-026… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict. Dates: 30/08/2025 (events 017-020, system; labelled \"Monday\" but is a Saturday); … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-01","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
