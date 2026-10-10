# Case 10: ANSWER

**Outcome:** escalated · **Severity:** urgent

The emailed request to move Margaret Ellison's (L-02) rent income to a new account is treated as suspected payment fraud: the sender domain differs from the CRM, the Reply-To is a Protonmail address, and the email uses urgency and says she cannot take calls. No bank details were changed. The 12 Oct payout of £1,932 stays on the account ending 9902 pending call-back verification and dual approval, and fraud has been escalated (ESC-102).

## Answers
**1. Should the bank details be changed?**

No. Not on this email. Changes need a phone call-back to the number already on file (+447700900202) and dual staff approval. The sender domain (ellisonletings.co.uk) differs from the CRM (ellisonlettings.co.uk), the Reply-To is a Protonmail address, and the request pushes urgency and refuses calls. The only genuine signal (22 Sep email) came from the CRM domain.

**2. What happens to the payout scheduled for Monday?**

No hold was needed because no payee change was applied. The £1,932 payout on 12 Oct 09:00 stays on the existing account ending 9902. If call-back verification fails or is not completed by Monday morning, the payout should be held for fraud review (escalated to fraud, ESC-102).

**3. Who do you contact and through which channel?**

Margaret Ellison by phone call-back on the number on file (+447700900202), which I could not action with my tools, so fraud must complete it. I emailed her on the CRM address (MSG-103) to say no change has been made and that we will verify by phone. The escalation goes to the fraud team.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 2 | ✅ verified | MSG-103 found in the send_message log |
| A2 | `add_note` | {"entity":"L-02 Margaret Ellison","note":"FRAUD RISK: Email 09/10/2026 15:12 requested bank change to sort 00-99-01 / acc 31926819 (name \"M… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `escalate_to_human` | {"priority":"P2","team":"fraud","reason":"Suspected payee-detail fraud on landlord L-02 (Margaret Ellison) before Monday payout of £1,932.",… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P2 → fraud** (verified): Suspected payee-detail fraud on landlord L-02 (Margaret Ellison) before Monday payout of £1,932.
  - Known: Email dated 09/10/2026 15:12 asks to move rent income to sort code 00-99-01, account 31926819 (name "M Ellison"), urgent, "can't take calls". Sender address margaret@ellisonletings.co.uk (CRM is ellisonlettings.co.uk); Reply-To margaret.ellison.finance@protonmail.example. Previous genuine email (22/09/2026) from the CRM domain. CRM bank account ends 9902; payout 12/10 09:00 £1,932 to 9902. No bank change made.
  - Missing: Call-back verification to +447700900202 not yet completed (no phone tool available to me). Second staff approver not yet assigned.
  - Options: Call Margaret on +447700900202 to confirm whether she sent the request; if not, report to fraud and keep payout on 9902; If verified genuine by call-back and dual approval, update bank details then release payout to new account; Hold the 12/10 payout if verification is not done by Monday 09:00
  - Recommendation: Do not change bank details. Verify by phone call-back to the number on file before Monday; keep the 12/10 payout on account ending 9902 unless the call-back and dual approval confirm the change.
  - Deadline: 2026-10-12 08:30

## Failed or unverified actions
- A1 (attempt 1): send_message returned HTTP 500 and was not applied. Retried once to the CRM address and it verified as MSG-103.
