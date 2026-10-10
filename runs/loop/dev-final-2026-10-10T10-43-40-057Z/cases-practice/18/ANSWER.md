# Case 18: ANSWER

**Outcome:** action_taken · **Severity:** routine

Tom gave one month's notice for 10 Nov, which is too short under the Renters' Rights Act. I told him the earliest end is 10 Dec 2026 unless the landlord agrees otherwise in writing. I asked Ben Hartley about an early surrender and logged a note.

## Answers
**1. Is the notice valid as given? Earliest end date?**

No. Tenants must give two months' written notice. Treating the email as written notice received 10 Oct 2026, the earliest end date is 10 Dec 2026. The 10 Nov date is not valid unless the landlord agrees in writing.

**2. What options exist to end sooner?**

The landlord can agree in writing to a shorter notice period or a surrender, for example 10 Nov or a date in between. A replacement tenant could make this more likely. The agency cannot agree it, because the decision is the landlord's.

**3. What do you reply and what do you start?**

I replied to Tom with the 10 Dec date, the early-release option, a note that keys should be held until handover is arranged, and how the deposit works (mydeposits, returned after the tenancy ends and a check, disputes go to the scheme's ADR). I requested landlord approval (APR-102) and added a record note. No repair ticket was needed. Handover details and the deposit return are to be confirmed later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice by email on 10 Oct to l… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `add_note` | {"entity":"T-1050","note":"10 Oct 2026: tenant emailed one month's notice for 10 Nov. Treated as notice given 10 Oct; earliest valid end 10 … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Escalations
_None._

## Failed or unverified actions
_None._
