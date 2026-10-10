# Case 18: ANSWER

**Outcome:** action_taken · **Severity:** n/a

Tenant Tom Achterberg (P-250) gave one month's notice for a 10 Nov 2026 move-out. Under the Renters' Rights Act 2025 he needs two months' written notice, so the earliest valid end date is 10 Dec 2026 unless the landlord agrees in writing to a shorter period. I told the tenant this, asked the landlord (Ben Hartley) to decide on an earlier date, and recorded a note.

## Answers
**1. Is the notice valid as given?**

No. One month is not enough for an assured periodic tenancy under the RRA 2025 (in force 1 May 2026), which requires two months' written notice. The notice is treated as given on 10 Oct 2026 and is not valid for 10 Nov 2026.

**2. What is the earliest end date under current law?**

10 December 2026 (two months from 10 Oct 2026).

**3. What options exist to end sooner?**

Only if the landlord agrees in writing to a shorter notice period (e.g. 10 Nov 2026) or another earlier date. This is the landlord's decision and was sent to Ben Hartley for approval (APR-102). Otherwise the tenant can stay until 10 Dec 2026.

**4. What do you reply and what do you start?**

Replied to the tenant (MSG-101) explaining the two-month rule, 10 Dec 2026 as the earliest end date, that the landlord is considering an earlier date, and general answers on keys and deposit (protected, returned after check-out). Requested landlord approval (APR-102) and added a file note (NOTE-103). No tenancy or deposit figures were disclosed, as identity is not yet verified.

**5. Where do keys go and when is the deposit returned?**

Key return arrangements will be confirmed nearer the final move-out date. The deposit is returned after the tenancy ends and check-out is complete, under the scheme's rules. No amounts or account details were given.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Benjamin Hartley (Ben), L-01","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road, P-250) has given one month's n… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `add_note` | {"entity":"T-1050 Tom Achterberg (P-250)","note":"10 Oct 2026: Tenant emailed one month's notice, intended move-out 10 Nov 2026. Not valid u… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Escalations
_None._

## Failed or unverified actions
_None._
