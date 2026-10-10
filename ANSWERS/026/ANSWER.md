# Moisture inspection and repair coordination: ANSWER

**Decision:** escalated · **Severity:** urgent

The 6 March damp inspection was missed (contractor breakdown); 7 March after 13:00 is offered but unconfirmed. I recorded the missed visit, asked the contractor to confirm, updated tenant and owner, and escalated the misdirected-email data breach to compliance.

## Where the case stands
Job NBL-026 (agency system ref; the case text calls it NBL-4821): inspection not done; awaiting provider confirmation of 7 March. Owner approved inspection only, repairs need separate approval. Privacy incident open with the privacy team.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Owen Pike to confirm 7 March after 13:00 | Owen Pike, contractor | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | Update Iris on the missed visit, unconfirmed new date, email handling and socket safety | Iris Bell, tenant | email | A6 ✅ |
| 3 | OTHER | Update owner on missed inspection and pending confirmation | Gareth Vale, landlord | email | A7 ✅ |
| 4 | ESCALATE_TO_HUMAN | Privacy lead to decide on the misdirected email | Elena Frost / compliance | internal | A2 ✅ |
| 5 | WAIT | Review provider confirmation on 7 March | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A5 · request_information → Owen Pike (contractor) via email, existing thread (event 019 call / event 007 email)** (verified)

> - Please confirm in writing that you can attend 18 Juniper Fold on 2025-03-07 after 13:00 (tenant is home after 13:00 on weekdays), with your arrival window.
> - Reminder: the owner has approved the non-intrusive inspection only; contact us before any opening-up or remedial work. Please also check the socket beneath the window and tell us at once of any electrical concern.
> 
> Why: The 7 March date was offered subject to confirmation, so it cannot be booked until the provider confirms it.

**A6 · send_message → Iris Bell (tenant) via email, iris.bell@example.com** (verified)

> Hi Iris, thank you for letting us know. Sorry about the confusion. Today's inspection did not happen: the contractor's vehicle broke down. He has offered tomorrow (Friday 7 March) after 13:00, but he has not confirmed it yet, so please don't treat it as booked. We have asked him to confirm and will tell you as soon as he does, and we will update you by tomorrow lunchtime either way. Please let us know if you can't be in.
> 
> About the email sent in error: please don't forward, copy or share it. We have passed this to our privacy lead, who will tell you whether to keep or delete it, so please leave it untouched for now. We're sorry this happened.
> 
> As a precaution, as the mark is near the socket under the window, please avoid using that socket until the inspection. If you notice any warmth, a burning smell, buzzing, sparks, a tripped breaker or water dripping, switch off that circuit at the fuse board if safe and call us straight away (999 if there's fire or danger). Please also check for any damp on the other side of that wall or in the room beyond.

**A7 · send_message → Gareth Vale (landlord) via email, agency landlord record** (verified)

> Hi Gareth, update on 18 Juniper Fold. The inspection due today did not take place as the contractor's vehicle broke down. He has offered 7 March after 13:00 but it is not yet confirmed; we are confirming with him and will update you. The tenant reports the stain looks darker today, still no dripping or electrical symptoms, though it is near a socket, so we have advised her to avoid that socket. Your approval remains limited to the non-intrusive inspection; any repair proposal will come to you separately for approval. Next update from us tomorrow.

## Escalations
### 1. Whether Iris deletes the misdirected email, whether to notify the affected tenant, ICO reporting assessment → Privacy Lead / compliance
- Escalation: A2 ✅ verified · P2 → compliance: Personal data breach: appointment email (event 013) to Iris Bell also contained another tenant's name, address, arrears amount and payment arrangement
- Known: Email sent 2025-03-05 11:22 to iris.bell@example.com only, no attachment (event 018). Iris says she did not forward it and still holds it (events 014, 015, 020). Maya asked her not to share. Elena Frost asked for preservation/facts (event 017); no assessment or notification decision recorded. The affected tenant has not been contacted. Iris on 6 March asked whether to keep or delete the email.
- Missing: Decision on whether Iris should delete the email (and confirm in writing), the risk assessment, whether to notify the affected tenant and the ICO, and who contacts the affected tenant. Identity of the affected tenant is not stated in the history.
- Options: Preserve agency copy, ask Iris to delete and confirm, notify affected tenant; Leave the email in place pending assessment
- Recommendation: Decide today: preserve agency copy, have Iris delete and confirm in writing, notify the affected tenant, assess ICO reporting.
- Deadline: 2025-03-07; ICO window ends about 2025-03-08 11:29
- Evidence: event 013; event 014; event 016; event 017; event 018; event 020
- Done before handover:
  - Asked Iris not to share (event 015) _(no ledger entry cited)_
  - Told Iris to leave it untouched pending privacy lead guidance (A6 ✅)
  - Facts supplied to the privacy lead (events 016, 018) _(no ledger entry cited)_

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Owen Pike, Brindle | Confirm 7 March inspection | 2025-03-07 | A3 ✅ verified |

## What this does not establish
- Asking for confirmation does not book the visit.
- The inspection is non-intrusive and does not establish the cause or cost of repairs.
- Owner approval covers inspection only, not remedial work.
- Escalation does not decide the breach notification.

## Remaining work
- Confirm the inspection date with the provider, then set_visit (agency)
- Quote and repair approval from Gareth after inspection (agency)
- Privacy team: breach assessment, instruction to Iris on the email, affected tenant contact (compliance)

## Missing or unavailable information
- Provider confirmation of 7 March
- Privacy team decision on the email

## Conflicts between sources
- Visit dates: 6 March (events 008, 012) vs 7 March (event 019, provider offer subject to confirmation); treated 7 March as unconfirmed proposal.
- Ticket ref NBL-4821 in the history vs NBL-026 in the system; used NBL-026.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

No inspection has happened. The 6 March slot was missed and 7 March after 13:00 is only offered, not confirmed. The stain is darker but there are no electrical symptoms, though it is near a socket. Outstanding: provider confirmation, the inspection and quote, and owner approval for any repair. Separately the privacy incident from event 013 has no assessment or notification decision.

**2. What is the next action, who is it for, and through which channel?**

Ask Owen Pike (contractor) by email to confirm 7 March (REQ-103). The tenant and owner have been updated by email. Follow-up FUP-102 is set for 7 March.

**3. Does anything need a human decision, and why?**

Yes. The privacy lead needs to decide on the misdirected email: whether Iris should delete it, whether to notify the affected tenant, and ICO reporting (72h from about 5 March 11:29). Escalated as ESC-101. The maintenance side needs no human decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-4821","outcome":"missed_appointment","evidence":"Owen Pike (Brindle) phoned Maya Chen 2025-03-06 15:12 (event 019): could… | 1 | ❌ failed | Ticket NBL-4821 not found on read-back |
| A2 | `escalate_to_human` | {"priority":"P2","team":"compliance","reason":"Personal data breach: appointment email (event 013) to Iris Bell also contained another tenan… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-4821","due_on":"2025-03-07","party":"Owen Pike, Brindle Survey & Drying","purpose":"Confirm 7 March inspection date with … | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A4 | `record_work_result` | {"ticket_ref":"NBL-026","outcome":"missed_appointment","evidence":"Owen Pike (Brindle) phoned Maya Chen 2025-03-06 15:12 (event 019): could … | 1 | ✅ verified | Ticket NBL-026 read back after record_work_result |
| A5 | `request_information` | {"recipient_name":"Owen Pike","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 call / event 007 email)"… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A6 | `send_message` | {"recipient_name":"Iris Bell","recipient_role":"tenant","channel":"email","contact":"iris.bell@example.com","ticket_ref":"NBL-026","body":"H… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Gareth Vale","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-026","bod… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
- A1: Used wrong ref NBL-4821; redone on NBL-026 as A4.
