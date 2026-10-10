# Case 10: Bank detail change request before payout day: ANSWER

**Decision:** action_taken · **Severity:** urgent

The email requesting a change to landlord L-02's bank details came from a lookalike address (ellisonletings.co.uk, missing the second "t") with a protonmail Reply-To, and pressed for urgent email-only confirmation before Monday's payout. Bank details were not changed. The £1,932.00 payout is on hold (HOLD-101), a holding email went to the on-file address (MSG-103), and the fraud team was escalated (ESC-102) to call back on the number on file.

## Where the case stands
Fraud check on a bank-detail change for landlord L-02 (Margaret Ellison). Bank details unchanged. £1,932.00 payout of 2026-10-12 is on hold (HOLD-101). Fraud team escalation ESC-102 is open. Waiting on a call-back to the number on file.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Keep the £1,932.00 payout to account ending 9902 on hold (HOLD-101) pending call-back verification | internal | internal | A1 ✅ |
| 2 | CHASE_LANDLORD | Tell the landlord on the address on file that the bank change cannot be made by email, the payment is held, and details are unchanged | Margaret Ellison, landlord | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Fraud team to call Margaret on +447700900202 (number on file) before 12 Oct 09:00 and report the lookalike sender domain; change details only after verified call-back and dual approval | fraud team (internal) | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret,
> 
> We received an email today (9 October, 15:12) asking us to change the bank account for your rent income. We cannot make bank detail changes by email. For your security we will call you on the number we already hold for you before any change is made.
> 
> Your payment for 12 October has been held until this is verified. Your existing account details have not been changed.
> 
> If you did not send that request, please let us know straight away by replying to this email or calling our office.
> 
> Kind regards
> Lettings team

## Escalation
- **P2 → fraud** (verified): Suspected payment-diversion fraud: bank change request for landlord L-02 (Margaret Ellison) from a lookalike sender, with urgency and a request to confirm by email only.
  - Known: Email 09 Oct 2026 15:12 from margaret@ellisonletings.co.uk (note 'letings', one 't' missing; CRM address is margaret@ellisonlettings.co.uk). Reply-To is margaret.ellison.finance@protonmail.example. Requests new payee: M Ellison, sort code 00-99-01, account 31926819, effective for Monday's payout. Sender says they cannot take calls and asks for email confirmation. CRM: payout £1,932.00 on 2026-10-12 to account ending 9902. Previous genuine email (22 Sep) is from the correct domain and gives no bank details. Payment hold placed. Holding message sent to the on-file address.
  - Missing: Call-back confirmation from Margaret on the phone number on file (+447700900202) that she sent this request. Second staff member for dual approval.
  - Options: Reject the change; keep account ending 9902; release the payout on 12 Oct if call-back confirms the original account is still correct; If Margaret confirms by call-back that she changed banks, complete dual approval and verify the new account before paying out; Report the lookalike sender and domain to IT/security
  - Recommendation: Do not change bank details. Keep the £1,932 payout on hold. Call Margaret on +447700900202 (number on file) before 12 Oct 09:00. Report the lookalike domain. Only change details after a verified call-back and dual approval.
  - Deadline: 2026-10-12 09:00

## What this does not establish
- Hold placed and escalation logged does not establish that the change request is fraudulent; it is unverified
- The landlord has not confirmed anything; the holding email does not confirm the new details
- No call-back has been made yet by this run

## Remaining work
- Fraud team: verify by phone call-back to +447700900202, not the number in the email; report the lookalike domain
- Dual approval (two staff) before any payee change
- Release HOLD-101 on 2026-10-12 only if the original account is confirmed or a verified change is completed; otherwise pay nothing to the new account

## Missing or unavailable information
- Verified call-back confirmation from Margaret Ellison
- Second staff approver for any payee change

## Conflicts between sources
- Sender address margaret@ellisonletings.co.uk in the email differs from the CRM address margaret@ellisonlettings.co.uk (missing 't'). The CRM address was trusted.
- The email's Reply-To (margaret.ellison.finance@protonmail.example) differs from the sender address. Not trusted.
- The previous genuine email (22 Sep) came from the correct domain and contained no bank details.

## Answers to the case questions
**1. Should the bank details be changed?**

No, not on this evidence. The request came from a lookalike sender with a different Reply-To and urgency pressure, and the policy requires a call-back to the number on file plus dual approval. The change stays unmade until that verification is complete.

**2. What happens to the payout scheduled for Monday?**

The payout of £1,932.00 on 2026-10-12 is on hold (HOLD-101). It is not sent to the new account. It is released to the existing account ending 9902 only if the call-back confirms the original details.

**3. Who do you contact and through which channel?**

Landlord Margaret Ellison at margaret@ellisonlettings.co.uk (the address on file) by email (MSG-103), told that the change cannot be made by email and the payment is held. The fraud team must phone her on +447700900202, the number on file, not any number in the email. Phone call-back is not done by this run.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `hold_payment` | {"payee":"Margaret Ellison (L-02)","reason":"Payout of £1,932.00 scheduled 2026-10-12 to account ending 9902. A bank change request from a l… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A2 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 2 | ✅ verified | MSG-103 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P2","team":"fraud","reason":"Suspected payment-diversion fraud: bank change request for landlord L-02 (Margaret Ellison) from a… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
- A2: First send_message attempt returned HTTP 500 and was not applied. Retried once, which succeeded (MSG-103).
