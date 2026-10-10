# Case 107: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair is routine and approved for Keystone Compliance. The tenant cannot do the recorded Saturday-labelled-Monday slot and says 8 Sept was agreed. I asked the provider to confirm, told the tenant it is not booked and gave Samaritans details, noted the record conflicts and set a follow-up for 2 Sept. The safeguarding concern was already escalated P1.

## Where the case stands
Provider assigned (Keystone Compliance), landlord approved sending a contractor. Recorded visit 30/08/2025 (a Saturday, labelled Monday) is disputed by the tenant, who says 8 Sept was agreed with the engineer. Waiting on the provider to confirm a date. A P1 safeguarding escalation was already raised at event 023.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the 8 Sept date and window and not to attend on 30/08 | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 30/08 is not to be expected, 8 Sept is unconfirmed, next update by 2 Sept; Samaritans 116 123 / 999 | Clara, tenant | sms | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation, then set_visit | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello. Oven repair at Flat 3, 3 Willowmere Road. Our record shows a visit on 30/08/2025 10-12, labelled "Monday", but 30/08 is a Saturday. The tenant says she cannot do that slot (works all day) and that she agreed Monday 8 September with Isaac by phone. Please confirm by reply by end of Tuesday 2 September: (1) whether you agreed 8 September and what time window, and (2) that nobody will attend on 30/08. Please do not attend until you have confirmed a date. We will only book once you confirm.

**A2 · send_message → Clara (tenant) via sms, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for your call. Please don't expect anyone on 30/08 - we're checking the 8 September date you agreed with the engineer, and we've asked the contractor to confirm it. It isn't booked until they do; we'll update you by Tuesday 2 September. Also, we're thinking of you after the call - if things ever feel too much, Samaritans are free on 116 123 any time, or call 999 if you're in immediate danger. A colleague will be in touch too.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked or rescheduled; 8 Sept is only the tenant's claim until the provider confirms.
- The messages do not resolve the safeguarding concern or confirm who attends.
- Landlord approval does not cover any quote.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency, by 2 Sept)
- Human to follow up the safeguarding escalation with the tenant (safeguarding team, P1, already raised)
- Clean up inconsistent provider and tenant names and contact numbers in records
- Quote and landlord approval if the repair needs one

## Missing or unavailable information
- Provider's confirmed date and window
- Oven make and model
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but labelled Monday
- Tenant says 8 Sept; system says 30/08
- Provider named Keystone Compliance / Riverside Works / Lantern Utilities
- Tenant names differ across records (Ruben Oakley, Grace Mercer, Clara Hughes/Hedges)
- Two different tenant/contact numbers used

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Contractor assigned and approved, but the visit date is disputed (record 30/08, tenant says 8 Sept). Provider confirmation is outstanding, and the human safeguarding follow-up.

**2. What is the next action, who is it for, and through which channel?**

Provider email asking Keystone Compliance to confirm the date (A1), and an SMS to the tenant (A2). Follow-up set for 2 Sept (A4).

**3. Does anything need a human decision, and why?**

Only the safeguarding follow-up, already escalated P1 at event 023 because of the suicidal statement, even though the tenant later said she was joking. The date conflict is routine and does not need a human.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"sms","contact":"existing thread (event 021 call)","body":"Hi Clara, thanks fo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"ticket: Flat 3, 3 Willowmere Road oven repair","note":"Conflicts: visit record 30/08/2025 (\"Monday\") is a Saturday; tenant says… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Check Keystone Compliance confirmed visit date (tenant says 8 Sept); then set_visit and update tenant; if … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
