# Case 06: ANSWER

**Outcome:** action_taken · **Severity:** emergency

R-4820 (no heating or hot water, vulnerable tenant Jonah Okafor, 27 Bethnal Green Road) was assigned to HeatRight Ltd (C-11) for a same-day visit on 2026-10-10 12:00-16:00 after the first assignment attempt returned HTTP 500 and was not applied; the retry verified at stage visit. The tenant, contractor and landlord were messaged, and the ticket note was updated. The no-show step from the visit log is not actioned because it is dated 2026-10-11, after today.

## Answers
**1. 1. What happened when you assigned the contractor and how did you verify it?**

The first assign_contractor call to C-11 failed with HTTP 500 and ledger A1 showed NOT APPLIED (stage still init). I retried once, which succeeded; read-back shows R-4820 at stage visit with C-11 HeatRight Ltd, window 2026-10-10 12:00-16:00 (ledger A1 attempt 2).

**2. 2. What do you tell the tenant at each point?**

Now: by email, that the job is treated as a priority because he has no heating or hot water, that HeatRight Ltd (Gas Safe) is booked for today 10 Oct 12:00-16:00, that we will confirm if anything changes, and gas-smell safety advice with 0800 111 999. Not yet sent: after a no-show, the tenant should be told by email what happened and the next step, with no new date promised until confirmed.

**3. 3. After the no-show, what do you do?**

Not yet applicable. The visit log records a no-show on 2026-10-11, which is after today (2026-10-10), so I did not act on it. If a no-show occurs against this booking, the plan is: re-book urgently with a different contractor or the same one at the earliest slot (C-12 Swift Plumbing & Heating is the alternative on file), email the tenant with the new target, and inform the landlord. Spend above £250 needs landlord approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"C-11 HeatRight Ltd","visit_window":"2026-10-10 12:00-16:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Dear Jonah,\n\nTha… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"phone_call","contact":"+447700900311","body":"HeatRight Ltd: job … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `update_ticket` | {"ref":"R-4820","note":"Tenant is flagged vulnerable and has no heating or hot water. Per policy this is an emergency: same-day visit. HeatR… | 1 | ✅ verified | Ticket R-4820 read back at stage visit |

## Escalations
_None._

## Failed or unverified actions
- A1 attempt 1: HTTP 500, NOT APPLIED. Retried once; retry verified. No escalation needed.
