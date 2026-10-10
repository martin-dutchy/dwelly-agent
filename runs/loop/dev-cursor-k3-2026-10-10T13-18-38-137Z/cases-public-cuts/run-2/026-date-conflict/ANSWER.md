# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit date conflict: record says Sat 30/08 (labelled Monday), tenant says 8 Sept. I asked the provider to confirm, told the tenant the new date is unconfirmed, added a note and set a 2 Sept follow-up.

## Where the case stands
Stage: visit. Landlord approved Keystone. Record holds visit 30/08/2025 10:00 (already passed today); tenant says 8 Sept was agreed. Waiting on provider to confirm the date and whether the 30/08 visit happened.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Keystone Compliance to confirm which date is agreed and whether anyone attended 30/08, by 1 Sept | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the record holds 30/08, 8 Sept is unconfirmed, and she will hear by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow-up on 2 Sept to chase provider and then book the confirmed date | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit on 30/08/2025, 10-12, but the tenant says she arranged 8 September 2025 with you instead (note 30/08 is a Saturday, and our messages also said "Monday"). Please reply by end of Monday 1 September to confirm: (1) did anyone attend today, and (2) which date and time slot you have actually agreed with the tenant. We will not treat a new date as booked until you confirm it.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 019 email)** (verified)

> Hello, thanks for letting us know about the date. Our record currently shows 30/08/2025, 10-12, but you've told us you agreed 8 September with the engineer. We've asked Keystone Compliance to confirm which date is right, and until they do, the 8 September isn't confirmed on our side. We'll update you by Tuesday 2 September. If anyone turned up or contacted you today, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked: 8 Sept is only the tenant's statement.
- Does not establish whether the 30/08 visit happened or the oven cause/cost.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant
- If 30/08 was missed, record result as missed appointment
- Oven diagnosis and any quote to landlord
- Follow-up 2025-09-02 owned by agency

## Missing or unavailable information
- Provider's confirmed date
- Whether anyone attended 30/08
- Attachment from event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but is labelled Monday; trusted the system record until the provider confirms.
- Tenant says 8 Sept; system says 30/08.
- Provider and tenant names vary across events (Keystone/Riverside/Lantern; Clara/Ruben/Grace).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; provider assigned; visit date disputed (30/08 on record vs 8 Sept per tenant). Provider confirmation and the repair itself are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask Keystone Compliance by email to confirm the date and whether they attended (sent); reply to the tenant by email (sent).

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation that the provider can settle.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-026-date-conflict","note":"Date conflict: record/events 017-020 say 30/08/2025 10:00 (called \"Monday\", but 30/08 is a Satur… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
