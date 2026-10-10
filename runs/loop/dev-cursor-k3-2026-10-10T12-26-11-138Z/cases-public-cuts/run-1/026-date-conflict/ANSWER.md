# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Visit date conflict: system says 30/08 (a Saturday, labelled Monday), tenant says 8 Sept. Asked contractor to confirm in writing, told tenant it is unconfirmed, and put the job on hold with a review on 2 Sept.

## Where the case stands
Stage: visit. Landlord approved ("Yes go ahead"); Keystone Compliance assigned. Visit date disputed: record says 30/08/2025 10-12 (a Saturday, labelled Monday); tenant says 8 Sept 2025 was agreed. Waiting on contractor; on hold to 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask contractor to confirm whether anyone attended 30/08 and whether 8 Sept 2025 is confirmed, and which company is attending | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, record date is being checked, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-09-02 for contractor reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit of Monday 30/08/2025, 10-12, but 30/08/2025 is a Saturday, and the tenant says she agreed 8 September 2025 with your engineer by phone. Please reply to confirm: (1) did anyone attend this morning, and (2) is the visit on 8 September 2025 confirmed, and what time slot? Until you confirm we will not treat 8 September as booked. Please also confirm which company is attending, as messages have named Keystone and Riverside Works. Thank you.

**A2 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hello Clara, thanks for calling. Our record currently shows the visit as Monday 30/08/2025, 10-12, but that date was a Saturday so it looks wrong. You've told us you agreed 8 September 2025 with the engineer. That isn't confirmed yet: we've asked the contractor to confirm it in writing and will update you. Please don't worry if nobody came this morning. We'll be back in touch by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed; 8 Sept is only the tenant's claim until the provider confirms.
- Does not establish whether the 30/08 visit happened or the cause of the oven fault.

## Remaining work
- Contractor to confirm date; then set_visit with provider confirmation (agency)
- Record work result after visit, quote/invoice, close
- Clean up tenant/contractor name inconsistencies in records

## Missing or unavailable information
- Contractor confirmation of the visit date
- Attachment at event 014 unavailable

## Conflicts between sources
- Visit date 30/08/2025 (events 017-020) vs 8 Sept 2025 (event 021); 30/08/2025 is a Saturday, not Monday.
- Names differ: Ruben Oakley / Clara / Grace Mercer / Harriet Fletcher for tenant; Keystone Compliance / Riverside Works / Lantern Utilities / Keystone Utilities for provider. Trusted the assigned provider on record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; visit date is disputed (30/08 per record vs 8 Sept per tenant). Contractor confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Contractor asked to confirm by email (done); tenant updated by email (done); review 2 Sept.

**3. Does anything need a human decision, and why?**

No. It is routine and a provider confirmation resolves it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","body":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"","reason":"Waiting for Provider","comment":"Waiting for contractor to confirm whether 30/08 visit happened and whether 8 Sep… | 1 | ❌ failed | Ticket  not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for contractor to confirm whether 30/08 visit happe… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","purpose":"Chase contractor on visit date (30/08 vs 8 Sept); update tenant","par… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- A3: First put_on_hold had a blank ticket ref; retried with NBL-026-date-conflict and verified as A4.
