---
id: deposit-tenancy-end
title: Deposits, notice to leave, tenancy changes and a tenant's death
tags: [deposit, tenancy_lifecycle]
when_to_use: The case involves a deposit (protection, deductions, return, dispute), a tenant giving notice or leaving, a joint tenant leaving, a rent increase, a pet request, or a tenant's death.
red_flags:
  - A deposit deduction was promised, agreed or refused without evidence and a human decision.
  - A tenant was told about a fixed end date, a break fee, or Section 21.
  - A deposit share was released to one joint tenant without everyone agreeing.
  - After a death, the property was cleared, re-let or the deposit released, or rent demanded from a relative personally.
  - A rent increase was proposed by letter or email instead of the statutory notice.
---

## Procedure
1. Law as of October 2026 (Renters' Rights Act 2025, in force 1 May 2026): every assured tenancy is periodic with no fixed end date; Section 21 is abolished; possession only through Section 8 grounds and a court. A tenant leaves on 2 months' written notice (shorter only if the landlord agrees in writing). In a joint tenancy, one joint tenant's notice ends the tenancy for everyone.
2. Notice to leave: acknowledge it, state the earliest end date it gives, tell the landlord, and list the move-out steps (check-out inspection with 24 hours' notice, keys, meter readings, forwarding address). An earlier exit needs the landlord's written agreement; never charge a break fee.
3. Deposits: at most 5 weeks' rent (6 if annual rent is £50,000 or more), protected within 30 days with the prescribed information. Deductions need evidence (check-in and check-out reports, photos, invoices) and must allow for fair wear and tear. Return within 10 days of agreeing the amount. A dispute goes to the deposit scheme's free dispute service, and the disputed sum stays protected. You may explain these rules and process an agreed deduction; anything disputed goes to a human.
4. Rent increases: only through the statutory notice, at most once a year, with 2 months' notice. The landlord sets the figure and a human serves it.
5. Pet requests: log the date, acknowledge, forward to the landlord, and make sure they answer in writing within 28 days. Refusals need reasons; no pet deposits or fees.
6. A tenant's death: express condolences. The tenancy passes to a successor or to the estate; rent continues against the estate. Deal only with the executor or administrator (ask for the death certificate and their details). Do not clear belongings, change locks, re-let or release the deposit. Secure the property only with the executor's or family's agreement.

## Required actions
- `send_message`: acknowledgement and next steps to the tenant, update to the landlord.
- `request_landlord_approval`: an early end, a pet, a tenancy change, or a proposed deduction.
- `add_note`: the notice date and earliest end date, or the executor's details.
- `escalate_to_human`: disputes, deductions, deaths, and any possession request.
- `schedule_follow_up`: the end date, the check-out, or the 28-day pet deadline.

## Red flags
- A landlord wants to keep a deposit without evidence, or the deposit was never protected.
- A joint tenant leaving while others stay.
- A relative or friend calling about a tenant who has died, or is in hospital or prison (never assume abandonment).
- Rent asked more than one month in advance, or before signing.

## Escalate when
- A disputed deduction, an unprotected or late-protected deposit: P2, legal.
- A tenant's death: P2, safeguarding, with the executor's details if known.
- Any possession, notice or rent-increase decision: P2, legal.
- A joint tenant leaving: P3, management.
