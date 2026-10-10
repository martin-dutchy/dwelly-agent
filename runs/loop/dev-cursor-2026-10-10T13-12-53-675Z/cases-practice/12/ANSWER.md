# Case 12: Arrears, payment plan offer and a Breathing Space notice: ANSWER

**Decision:** escalated · **Severity:** urgent

Tenant offered £100/month toward £3,700 arrears and supplied a Breathing Space notice from 01/10/2026. I paused arrears contact, noted the record, informed tenant, adviser and landlord, and escalated to legal to cancel the scheduled chaser and Section 8 review.

## Where the case stands
Breathing Space in force; arrears contact paused; escalated to legal (ESC-102) to cancel scheduled SMS/Section 8 review and decide on plan. Waiting on legal, landlord and adviser.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Legal to cancel 12 Oct arrears SMS and 14 Oct Section 8 review and decide on plan | internal legal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledged Breathing Space, plan not accepted, referred to adviser | Daniel Reyes, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Notified adviser, asked to confirm end date | Ruth Okoye, debt adviser | email | A4 ✅ |
| 4 | OTHER | Informed landlord of Breathing Space and the pending plan | Ben Hartley, landlord | email | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Daniel Reyes (tenant) via email, d.reyes@mailbox.example** (verified)

> Hi Daniel, thank you for your email and the letter. We have it and have noted your Breathing Space, so we're pausing any contact and action about the arrears while it runs. We can't agree or decline your payment plan ourselves; we'll pass it to your landlord and speak to your adviser, Ruth Okoye, about it. Your normal rent still needs paying, and repairs carry on as usual. If you need support, your adviser is the best person to talk to. We'll be in touch through her about the arrears.

**A4 · send_message → Ruth Okoye (third_party) via email, ruth.okoye@hackneymoneyadvice.example** (verified)

> Dear Ruth, we received your client Daniel Reyes's Breathing Space notification (ref HMA-55102, start 01/10/2026) for Flat 3, 8 Kingsland Road. All arrears contact and enforcement are paused and future arrears communication will come to you. Mr Reyes has proposed £100 a month on top of rent from November; we have not accepted or declined it and are referring it for a decision. Please confirm the end date of the breathing space.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the tenant at Flat 3, 8 Kingsland Road has notified a standard Breathing Space from 1 October 2026 via Hackney Money Advice. While it runs we must pause all arrears chasing and cannot serve arrears-based notices or start enforcement. He has offered £100 a month on top of rent from November; we haven't accepted it and our team will come back to you on options. Current rent remains due. Nothing is needed from you right now.

## Escalation
- **P2 → legal** (verified): Breathing Space in force on rent arrears; scheduled arrears SMS (12 Oct) and Section 8 ground 8 draft review (14 Oct) must be stopped; payment plan offer needs human/landlord decision via adviser
  - Known: Tenant Daniel Reyes (T-1020), Flat 3, 8 Kingsland Road. Arrears £3,700 (2 months). Standard Breathing Space from 01/10/2026 per attachment; adviser Ruth Okoye, Hackney Money Advice CIC, HMA-55102. Tenant emailed 09/10 offering £100/month extra from November. CRM has scheduled arrears chaser SMS 2026-10-12 and Section 8 draft review 2026-10-14. I have added a note, replied to tenant (rent/payment-plan not accepted, no court-action promise), and written to adviser and landlord.
  - Missing: Verification of the notice with the Debt Respite Scheme/adviser; landlord's view on plan; whether I can cancel scheduled actions (no tool available to me). Note £100/month would take ~37 months to clear £3,700.
  - Options: Cancel both scheduled actions now; keep suspended until breathing space ends; Landlord considers plan via adviser; Verify notice with adviser first
  - Recommendation: Cancel the 12 Oct SMS and 14 Oct Section 8 review today; all arrears talks go through the adviser; legal to consider the plan and review at end of breathing space (typically 60 days).
  - Deadline: Before 2026-10-12 09:00

## What this does not establish
- Cannot cancel scheduled actions myself; relies on legal doing so before 12 Oct
- Did not accept or decline the plan
- Notice not independently verified with the scheme; adviser contact and attachment treated as genuine
- Replying acknowledged tenant-initiated contact only

## Remaining work
- Legal: stop 12 Oct SMS and 14 Oct S8 review (urgent)
- Legal/landlord: decide on £100/month plan via adviser
- Adviser to confirm breathing space end date; review then

## Missing or unavailable information
- Breathing space end date
- Landlord view on plan

## Conflicts between sources
- CRM scheduled arrears SMS and Section 8 review conflict with the Breathing Space; the notice takes precedence.

## Answers to the case questions
**1. 1. What legal constraint applies and what can't you do?**

A standard Breathing Space (from 01/10/2026) applies. We cannot contact the tenant about the arrears (except in reply to him, and via the adviser), take enforcement action, or serve/progress arrears-ground notices such as Section 8 ground 8. Ongoing rent and repair contact continue.

**2. 2. Can you accept the proposed payment plan?**

No. Payment plans need human/landlord authority; it has been referred to legal and the landlord, with communication via the adviser. (£100/month would take about 37 months.)

**3. 3. What actions and communications do you make, to whom?**

Note on record (A1); legal P2 escalation (A2); reply to tenant (A3); email to adviser Ruth Okoye (A4); email to landlord Ben (A5).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1020","note":"Breathing Space (standard) notified 09/10/2026 via tenant email, start 01/10/2026, adviser Hackney Money Advice C… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space in force on rent arrears; scheduled arrears SMS (12 Oct) and Section 8 ground 8 dr… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank yo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
_None._
