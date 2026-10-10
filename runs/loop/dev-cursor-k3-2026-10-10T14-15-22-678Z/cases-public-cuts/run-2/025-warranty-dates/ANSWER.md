# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven repair is with Harbour Services, but the visit date is conflicting and the provider says there is no warranty. I asked the provider for the confirmed date and the warranty evidence, updated the landlord and tenant, and put the job on hold until 22 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold (review 22 May). Visit not confirmed: date conflict 22 May vs 21 June. Provider claims out of warranty, unverified. Landlord approved only a charge-free warranty service, not paid work.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Harbour Services to confirm the exact visit date, send install date and warranty terms, and do diagnosis only (no chargeable work without approval) | Harbour Services, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the visit is unconfirmed (22 May 2:30pm per call vs 21 June in emails), asked if timing acceptable, next update by 22 May | Leo Bennett, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Updated landlord, corrected the wrong install date, asked which firm fitted the oven (Keystone vs Harbour), passed on provider's warranty claim as theirs and said charges would return for approval | Felix, landlord | email | A2 ✅ |
| 4 | WAIT | Hold until 22 May for provider reply | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello Clara, thanks for your emails. Two things please, by end of day tomorrow (22 May):
> 1) Visit date: your emails say "tomorrow, 21st June", but 21 June is not tomorrow. The call with the tenant suggests 22 May at 2:30pm. Please confirm the exact date and time.
> 2) Warranty: you say the oven is out of warranty. Manufacturer warranties often run longer than 12 months, so please send the purchase/install date for the oven you fitted and the warranty terms, so the landlord can see how you reached that. Our records are inconsistent on the install date (one note says March 2025, which cannot be right), so your invoice/job record is needed.
> Please do not carry out any chargeable work or repair without a quote and our written approval from the landlord. Please attend for diagnosis only until then.

**A2 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Good afternoon Felix, an update on the oven at Flat 2, 176 Lantern Quay. Apologies: my earlier email said Harbour Services replaced the oven in March 2025. That date can't be right, as it is after today. Also, your note named Keystone Works, but our record shows Harbour Services fitted it last year. Can you confirm which firm you meant, and the purchase date if you have it?
> Harbour Services have now told us they believe the oven is no longer under warranty. That is their claim and we are checking it. Manufacturer warranties often last longer than 12 months, so we have asked them for the install date and warranty terms. Their visit date is also being confirmed (their emails conflict). They will only diagnose; any chargeable work will come back to you for approval first. We will update you by 23 May.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services have spoken to you about a visit. Their call suggests tomorrow (22 May) at 2:30pm, but their emails say "21st June", so we have asked them to confirm the exact date. Please treat it as not yet confirmed; we will tell you as soon as they do. As the oven is out of use, is that timing acceptable to you? If not, we can ask for a sooner slot. We are also checking whether the oven is still under warranty, and the landlord will be asked before any chargeable work. You will hear from us again by 22 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked; the date is unconfirmed
- Warranty status is not established; the provider's claim is unverified
- No spend approved; the landlord only asked for a charge-free warranty service

## Remaining work
- Provider to confirm the visit date, install date and warranty terms (agency, review 22 May)
- Landlord to confirm which firm fitted the oven
- If the oven is out of warranty and a quote is needed, send it to the landlord for approval
- Set the visit via set_visit once the provider confirms

## Missing or unavailable information
- Install/purchase date and warranty terms
- Confirmed visit date
- Whether Keystone Works or Harbour Services fitted the oven

## Conflicts between sources
- Visit date 22/05 (call) vs 21/06 (emails 019/020); 'tomorrow' fits 22 May
- Install date 'March 2025' in event 014 is impossible; tenant says last year
- Landlord names Keystone Works; the record says Harbour Services fitted the oven
- Provider says out of warranty, landlord says under warranty; unverified

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider is assigned and the job is on hold. Outstanding: the confirmed visit date, warranty evidence (install date and terms), and which firm fitted the oven. No paid work is approved.

**2. What is the next action, who is it for, and through which channel?**

Provider email asking for the confirmed date and warranty details (done), plus updates by email to the landlord and tenant (done). Next, review on 22 May.

**3. Does anything need a human decision, and why?**

No. Everything can be handled by asking the parties. If the oven is confirmed out of warranty, the landlord decides on any quote.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"H… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Good afternoon Felix, an … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May vs 21 June conflic… | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A5 | `add_note` | {"entity":"R-4815","note":"Conflicts: install date \"March 2025\" (event 014) impossible vs tenant \"last year\"; landlord names Keystone Wo… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May vs… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A4: First put_on_hold used a wrong ticket ref; retried with NBL-025-warranty-dates (A6) and it verified.
