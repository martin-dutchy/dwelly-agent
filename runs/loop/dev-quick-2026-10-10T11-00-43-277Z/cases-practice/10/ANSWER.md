# Case 10: Bank detail change request before payout day: ANSWER

**Decision:** escalated · **Severity:** urgent

Margaret Ellison's email asking to change her payout account is unverified and shows fraud red flags: a lookalike sender domain, a protonmail Reply-To, urgency, and a no-call instruction. I did not change any bank details, held payments to the new account (HOLD-101), told the landlord on the email on file that nothing has changed (MSG-103), and escalated to the fraud team (ESC-102) to phone-verify before the 12 Oct payout.

## Where the case stands
Bank change request for L-02 Margaret Ellison is unverified and suspected fraud. No bank details changed. Payment to the new details is held (HOLD-101). Landlord informed by email on file (MSG-103). Fraud team escalation ESC-102 raised, deadline before the 12 Oct 09:00 payout.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Hold payments to the new bank details pending verification (HOLD-101) | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell landlord by email to the address on file that a change was received, nothing changed, and call-back to follow (MSG-103) | Margaret Ellison, landlord | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Fraud team to phone-verify on +447700900202 with dual approval before 12 Oct 09:00 (ESC-102) | Fraud team | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret,
> 
> We received an email today (9 October, 15:12) asking us to change the bank account for your rent income. For your security we have not made any change. We need to verify it by phone first.
> 
> We will call you on the number we hold on file. If you did not send this request, please contact us straight away on the number you normally use.
> 
> Your payout scheduled for 12 October will continue to go to your existing account unless and until the change is verified.
> 
> Kind regards,
> Lettings team

## Escalation
- **P2 → fraud** (verified): Suspected payment diversion fraud on landlord L-02 (Margaret Ellison). Email asks to redirect rent payouts to a new account before the 12 Oct payout run, with urgency and a no-call instruction.
  - Known: Email dated Fri 9 Oct 2026 15:12 from margaret@ellisonletings.co.uk (on file is margaret@ellisonlettings.co.uk; sender domain differs). Reply-To is a protonmail address. New details: sort code 00-99-01, account 31926819, name "M Ellison". Current account on file ends 9902. Payout of £1,932.00 scheduled 2026-10-12 09:00 to account ending 9902. Fraud policy: change only after phone call-back to number on file (+447700900202), dual approval, hold payments to changed details. Previous email 22 Sep 2026 confirms landlord is abroad (Lisbon until Dec) and prefers email, which explains but does not verify the request.
  - Missing: Verified call-back confirmation from landlord on the number on file. Second staff member for dual approval. Confirmation of which domain is genuine.
  - Options: Verify by phone call-back to +447700900202 and, if confirmed, complete dual-approved change before 12 Oct; If not confirmed, keep payout on account ending 9902, report the email to IT/security and consider the domain spoof; Pay Monday to account on file only and handle the closing of the old account with the landlord once verified
  - Recommendation: Do not change details on the email alone. Make a phone call-back to +447700900202 before Monday 12 Oct 09:00. Keep payout to account ending 9902 unless verified. Do not use the number or address in the request.
  - Deadline: 2026-10-12 08:30

## What this does not establish
- The email does not verify the change; it is a suspected diversion request.
- Hold on new details does not confirm the account on file is correct.
- No phone call was made by this agent; no call-back has been verified.

## Remaining work
- Phone call-back to +447700900202 by fraud team, with dual approval, before the 12 Oct payout run. Owner: fraud team (ESC-102).
- If not verified, report the sender domain mismatch and protonmail Reply-To to security. Owner: fraud team.

## Missing or unavailable information
- Verbal confirmation from Margaret Ellison on the number on file
- Second approver for dual approval

## Conflicts between sources
- Email domain ellisonletings.co.uk (request) vs ellisonlettings.co.uk (CRM and prior email). Trusted the CRM and prior signed-off email.
- Request asks for the new account; CRM and payout schedule still show ending 9902. Trusted the CRM until verified.

## Answers to the case questions
**1. 1. Should the bank details be changed?**

No, not on this email. It fails the fraud policy: the sender domain (ellisonletings.co.uk) differs from the address on file (ellisonlettings.co.uk), the Reply-To is a protonmail address, and the request is urgent and asks us not to call. Change only after a phone call-back to the number on file and dual approval. Evidence: inputs/email_bankchange.eml, inputs/crm.json, inputs/previous_email.eml, inputs/fraud_policy.md.

**2. 2. What happens to the payout scheduled for Monday?**

The payout of £1,932.00 on 12 Oct stays on the account on file (ending 9902). Payments to the new details (sort code 00-99-01, account 31926819) are held (HOLD-101) until verified. Fraud team must confirm before the 09:00 run.

**3. 3. Who do you contact and through which channel?**

Landlord: email to margaret@ellisonlettings.co.uk (the address on file), sent as MSG-103, to say nothing has changed. Verification: phone call-back to +447700900202, the number on file, by the fraud team (ESC-102). Not the number or address in the request.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `hold_payment` | {"payee":"Margaret Ellison (L-02)","reason":"Bank detail change request received by email from a non-matching address (margaret@ellisonletin… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A2 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 2 | ✅ verified | MSG-103 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P2","team":"fraud","reason":"Suspected payment diversion fraud on landlord L-02 (Margaret Ellison). Email asks to redirect rent… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
- A2: First send_message attempt failed with HTTP 500 and was not applied. Retried once; the retry verified as MSG-103.
