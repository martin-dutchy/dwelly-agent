# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** urgent

The oven ticket was closed as completed without payment, with no verified work result, while an invoice from an unclear provider sits on the record. The tenant's new roof-leak report was logged as urgent ticket JOB-101, and the tenant was texted with a 72-hour target and safety advice. Accounts was asked to verify the oven closure and invoice before any payment.

## Where the case stands
The oven job NBL-024-bundled-issues is recorded as completed and closed without payment, but the record has no verified work result. An invoice was received with no amount or issuer, and the closure notes name Keystone Solutions while Lantern Works was assigned. The tenant's new email (event 032) reports a leaking conservatory roof, a separate issue now logged as JOB-101.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Logged new urgent roof-leak repair JOB-101 for the conservatory leak. | Imogen Clarke, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Texted the tenant to confirm JOB-101 with a 72-hour contact target, gave safety advice on water near electrics, asked for photos, and said the oven job is being checked again. | Imogen Clarke, tenant | sms | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalated to accounts to verify the oven job closure, the invoice and the provider before any payment. | Accounts team | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen Clarke (tenant) via sms, 07700 900512** (verified)

> Hi Imogen, thank you for letting us know about the leak from the conservatory roof. We have logged it as a new repair (ref JOB-101) and our target is to have a contractor contact you within 72 hours. If water is coming near any light fittings or sockets, please keep well clear of them and switch off the power to that area at the consumer unit if it is safe to do so. Please also reply with a photo of the leak if you can. Separately, we are checking the oven job again and will confirm its status to you shortly. Thanks, Northbridge Lettings

## Escalation
- **P2 → accounts** (verified): Oven job NBL-024-bundled-issues was closed 'completed' and 'without payment' on 2026-08-26 00:58 UTC, but an invoice was received (event 017) and the closure notes point to Keystone Solutions, while the assigned provider was Lantern Works. No work result or completion evidence is recorded. The tenant was told 'the fence and oven have both been fixed' (event 016), but the fence is not on this ticket and the oven fix is unverified.
  - Known: Landlord approved oven repair by email 2026-08-05 03:15 UTC ('Hi, yes please.'). Lantern Works assigned 2026-08-05 03:31 UTC. Invoice received 2026-08-26 00:53 UTC (no amount, issuer or file recorded). Ticket closed without payment. Tenant reported oven not working on 2026-08-05 (event 006); no later confirmation from the tenant that it works. New roof leak reported 2026-08-26 (event 032), now logged as JOB-101.
  - Missing: Invoice amount, issuer and who pays; whether the oven was actually repaired and by whom; whether the Keystone Solutions invoice relates to this job; whether the fence work was ever on this job.
  - Options: Reopen NBL-024 and obtain Lantern Works/Keystone work result and invoice before any payment; Confirm with the tenant whether the oven works, then close with evidence; Tell the landlord the job was closed without payment and clarify who pays any invoice
  - Recommendation: Reopen NBL-024 for verification. Do not pay the invoice until the amount, issuer and work result are confirmed. Correct the tenant's understanding about the fence and oven.

## What this does not establish
- The text message does not confirm the roof cause, the repair cost or who pays.
- Logging JOB-101 does not assign a contractor or book a visit.
- The escalation does not confirm the oven is fixed or that the invoice is valid.
- The fence work is not on this oven ticket and was not verified.

## Remaining work
- Accounts/maintenance to reopen or verify NBL-024 and obtain the Lantern Works/Keystone work result and invoice before any payment (ESC-103).
- Confirm with the tenant whether the oven now works; correct the 'fence and oven fixed' message sent on 2026-08-26.
- Assign a contractor and visit for JOB-101 after the tenant replies with photos and details, within the 72-hour target.
- Tell the landlord about the roof leak and the oven closure.

## Missing or unavailable information
- Invoice amount, issuer and who pays.
- Whether the oven was repaired and by whom.
- Whether the Keystone Solutions invoice relates to this job.
- Tenant's photos and whether the leak is near electrics.
- Whether the fence work was ever on this ticket.

## Conflicts between sources
- Event 016 tells the tenant 'the fence and oven have both been fixed', but the oven ticket has no work result and the fence is not on it.
- Ticket closed 'without payment' (event 030), yet an invoice was received (event 017).
- Lantern Works was assigned (event 011), but the closure note cites Keystone Solutions (event 029).
- Ticket shows stage completed, but keys and priority validation errors repeat (events 022-028); no clean close record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The oven job is marked completed and closed without payment, but nothing verifies the repair. An invoice was received with no amount or issuer, and the provider is inconsistent (Lantern Works assigned, Keystone Solutions named). The roof leak is a new issue, now JOB-101. Outstanding: verify the oven job and invoice, confirm the oven works, assign and visit for the roof leak, and tell the landlord.

**2. What is the next action, who is it for, and through which channel?**

SMS to Imogen Clarke on 07700 900512 confirming JOB-101 and the 72-hour target, with safety advice (done). Internal escalation to accounts to verify the oven closure and invoice before any payment (done). Next: chase the tenant for photos, and message the landlord about the roof leak and the oven closure.

**3. Does anything need a human decision, and why?**

Yes. Whether to reopen the oven job and whether any invoice is payable needs accounts/maintenance, because the amount, issuer and work result are unverified and the closure conflicts with the invoice. Someone also needs to correct the 'fence and oven fixed' message sent to the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"roof","severity":"urgent","description":"Tenant (Imogen Clarke) repo… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"sms","contact":"07700 900512","ticket_ref":"JOB-101","body":"Hi Imoge… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P2","team":"accounts","reason":"Oven job NBL-024-bundled-issues was closed 'completed' and 'without payment' on 2026-08-26 00:5… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
- escalate_to_human (first attempt): Validation failed (missing options and recommendation); resent with both and succeeded as ESC-103 (A3).
