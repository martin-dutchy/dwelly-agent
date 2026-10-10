# Case V026-tenant-conflicting-appointment-m0r4t5: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant can't attend the recorded slot and says she agreed 8 Sept with the engineer. I asked the provider to confirm, told the tenant the date is unconfirmed (with Samaritans details), noted conflicts and put the job on hold to 2 Sept. The safeguarding escalation was already raised.

## Where the case stands
Ticket at visit stage, on hold (Waiting for Provider) until 2025-09-02. Landlord approved. Visit date disputed: record 30/08/2025 (a Saturday labelled Monday) vs tenant's claimed 8 Sept. Safeguarding P1 already escalated (event 023).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider to confirm the agreed visit date and which firm is attending | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 30/08 is not expected, 8 Sept is unconfirmed pending provider, next update by 2 Sept; Samaritans number included | Clara, tenant | sms | A2 ✅ |
| 3 | WAIT | Hold until 2025-09-02 for provider confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Please confirm the date and time you agreed with the tenant for the oven repair at Flat 3, 3 Willowmere Road. The tenant says Monday 8 September; our record says 'Monday morning' 30/08/2025, which is a Saturday.
> - Please also confirm who you (Isaac) are attending for: our records mention both Keystone Compliance and Riverside Works.
> 
> Why: The tenant cannot do the recorded slot and says a different date was agreed by phone. A date only the tenant gave is not a booking; we need the provider's confirmation. Please reply by Tuesday 2 September.

**A2 · send_message → Clara (tenant) via sms, existing thread (event 021 call / event 020 SMS)** (verified)

> Hi Clara, thanks for calling. Our record shows the oven visit as 30/08/2025, 10-12, which we know doesn't work for you. You told us you agreed Monday 8 September with the engineer. That isn't confirmed yet: we've asked the engineer to confirm it, so please don't expect anyone on the 30th. We'll update you by Tuesday 2 September. Also, if things ever feel too much, Samaritans are free on 116 123 any time, or 999 if you are in immediate danger. A colleague will also be in touch to check you're OK.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed: 8 September is only the tenant's claim.
- Messaging the tenant does not replace the human safeguarding follow-up.
- Does not resolve provider identity or tenant name discrepancies.

## Remaining work
- Provider to confirm date; then set_visit and tell tenant (agency, review 2 Sept)
- Human safeguarding colleague to contact tenant (already escalated, event 023)
- Check provider identity (Keystone vs Riverside Works vs Lantern Utilities) and tenant name records
- Landlord to be informed of outcome at close

## Missing or unavailable information
- Provider's confirmed visit date
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but described as Monday
- Tenant says 8 Sept; system says 30/08
- Provider named Keystone Compliance, Riverside Works and Lantern Utilities
- Tenant name varies (Ruben Oakley, Grace Mercer, Harriet Fletcher, Clara Hedges/Hughes)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved, provider assigned, visit recorded 30/08/2025 (a Saturday, labelled Monday) which the tenant can't attend; tenant says 8 Sept was agreed with the engineer. Provider confirmation outstanding.

**2. What is the next action, who is it for, and through which channel?**

Provider confirmation request to Keystone Compliance by email (done); tenant update by SMS (done); review 2 Sept.

**3. Does anything need a human decision, and why?**

Only the safeguarding follow-up for the tenant's suicidal statement, already escalated P1 (event 023); I did not duplicate it. The date conflict needs only the provider's answer.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","quest… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"sms","contact":"existing thread (event 021 call / event 020 SMS)","body":"Hi … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"ticket","note":"Conflicts: visit recorded 30/08/2025 'Monday' but that is a Saturday; tenant says Monday 8 Sept agreed with Isaac… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"V026-tenant-conflicting-appointment-m0r4t5","reason":"Waiting for Provider","comment":"Waiting for provider to confirm visit … | 1 | ❌ failed | Ticket V026-tenant-conflicting-appointment-m0r4t5 not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-V026-tenant-conflicting-appointment-m0r4t5","reason":"Waiting for Provider","comment":"Waiting for provider to confirm vi… | 1 | ✅ verified | Ticket NBL-V026-tenant-conflicting-appointment-m0r4t5 read back after put_on_hold |

## Failed or unverified actions
- A4: First put_on_hold used wrong ticket ref; retried with correct ref NBL-V026-... as A5, verified.
