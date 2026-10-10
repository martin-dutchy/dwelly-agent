# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven fault is at visit stage with Harbour Services assigned and a diagnostic visit booked for 22 May 2024 at 2:30pm, tenant at home. The tenant, landlord and contractor have been messaged. Harbour says the oven is out of warranty, but the install date conflicts across records and no evidence is on file, so the landlord's charge-free request is not yet resolved; the ticket is on hold for landlord input.

## Where the case stands
Ticket NBL-025-warranty-dates is at visit stage. Landlord approval to proceed to provider selection was confirmed (event 009). Harbour Services is assigned and a diagnostic visit is booked for Wed 22 May 2024 14:30 with tenant at home. The ticket is on hold, waiting for the landlord on install date and spend limit, and for Harbour to evidence warranty status.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Booked Harbour Services to diagnose the oven on 22 May 2024 at 2:30pm, tenant at home. | Harbour Services (Clara), contractor | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Asked Harbour to confirm the visit date (their email said 21 June, the call said next day), send warranty evidence and install paperwork, and send a quote with photos before any repair work. | Harbour Services (Clara), contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Told tenant Leo Bennett the visit target is Wed 22 May 2:30pm, that the date is being confirmed, and the fix target is within 14 days. Included gas emergency line. | Leo Bennett, tenant | sms | A4 ✅ |
| 4 | REQUEST_INFORMATION | Told landlord Felix that the oven is reported out of warranty but unverified, the visit is booked, and asked for the install date and spend limit for any repair quote. | Felix, landlord | email | A5 ✅ |
| 5 | WAIT | Ticket on hold for landlord reply, review 2024-05-24. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 013 email)** (verified)

> Hello Clara,
> 
> Thank you for confirming the oven job at Flat 2, 176 Lantern Quay, ZZ8 5ZZ (tenant Leo Bennett).
> 
> Two things to check:
> 1. Your email says the visit is "tomorrow, 21st June", but the tenant call says the next day at 2:30pm. We have booked Wednesday 22 May 2024 at 2:30pm with the tenant at home. Please confirm this is correct, or tell us the right date.
> 2. You say the oven is no longer under warranty. Please send us the evidence (warranty term, installation date, and the invoice or job reference from the original installation). Our records show the install date differently, so we need this to tell the landlord.
> 
> Please attend to diagnose the fault. Do not start any repair work until a quote has been sent to us and approved. Please send the quote, with photos, before any work.
> 
> Kind regards,
> Operations, Northbridge Lettings

**A4 · send_message → Leo Bennett (tenant) via sms, 07700 900426** (verified)

> Hello Leo, this is Northbridge Lettings about the oven at Flat 2, 176 Lantern Quay. Harbour Services plan to visit on Wednesday 22 May at 2:30pm to look at the oven. We are confirming this date with them. If the time does not work, please tell us. We aim to have the oven looked at within 14 days. If you smell gas, leave the property and call 0800 111 999.

**A5 · send_message → Felix (landlord) via email, existing thread (event 003 email)** (verified)

> Hello Felix,
> 
> Thank you for your earlier message. We have contacted Harbour Services, who replaced the oven. They have told us the oven is no longer under warranty. We have not yet seen the warranty terms or the installation paperwork, so we are checking this with them.
> 
> We have booked Harbour Services to attend on Wednesday 22 May at 2:30pm to diagnose the fault. They will send us a quote before any repair work. Please tell us:
> 1. The date the oven was installed, and the supplier if you have it.
> 2. Whether you want us to go ahead with any repair quote Harbour Services send, and the spend limit you would like us to work to.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The booking does not confirm the fault, its cause, or whether the oven is under warranty.
- Booking the visit does not decide who pays; a repair charge still needs landlord approval of a quote.
- The warranty claim from Harbour is unverified; no warranty document is on file.
- The landlord's Keystone Works request has not been confirmed as a Harbour job; the records disagree.

## Remaining work
- Landlord (Felix) to confirm the install date and the spend limit for any repair; the ticket stays on hold until then (review 2024-05-24). Owner: operations.
- Harbour to confirm the visit date and send warranty evidence and a quote before any repair. Owner: operations.
- After the visit, record the work result and any quote; decide payer based on warranty evidence and landlord approval.

## Missing or unavailable information
- Oven installation date. The records say March 2025 (event 014), which is after today, and the tenant report says 'last year'.
- Warranty terms and evidence. Harbour says the oven is out of warranty but has provided nothing.
- Landlord spend limit for repair costs.
- Whether Keystone Works (landlord's named contractor, event 006) or Harbour Services installed the oven.

## Conflicts between sources
- Visit date: event 019 says 'tomorrow, 21st June' while event 018 (the call) says next day at 2:30pm. Today is 21 May, so I used 22 May 2024 at 2:30pm and asked Harbour to confirm.
- Install date: event 014 says Harbour replaced the oven in March 2025, which is after today. Event 001 says 'last year'. Unresolved.
- Installer: landlord (event 006) names Keystone Works; the agency's records (events 007, 010, 014) say Harbour Services. Unresolved.
- Warranty: Harbour says out of warranty (event 020) while the landlord says it should still be under warranty (event 006). Not verified; no evidence on file.
- Ticket reference: the ticket is listed as NBL-025-warranty-dates, not 025-warranty-dates; I used the listed reference.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval to proceed to provider selection is confirmed. Harbour Services is assigned, and a visit is booked for 22 May 2024 at 2:30pm. Outstanding: the visit date needs confirming (Harbour's email says 21 June), the install date and warranty status are unverified and conflict, the landlord has not given a spend limit for any repair, and the ticket is on hold until the landlord replies (review 24 May).

**2. What is the next action, who is it for, and through which channel?**

Confirm the 22 May 2:30pm visit with Harbour Services by email, and ask for warranty evidence and a quote before any work. Tell tenant Leo Bennett by SMS of the target visit and fix timescale. Ask landlord Felix by email for the install date and spend limit for repairs.

**3. Does anything need a human decision, and why?**

Not yet. The diagnostic visit is within the approval already given. Any repair cost or warranty dispute needs the landlord's decision once a quote and the install evidence arrive, so no escalation is needed now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"NBL-025-warranty-dates","contractor":"Harbour Services","visit_window":"2024-05-22 14:30-17:00"} | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back at stage visit |
| A2 | `set_visit` | {"ticket_ref":"NBL-025-warranty-dates","datetime":"2024-05-22 14:30","slot_text":"Wednesday 22 May, 2:30pm","access":"tenant_home"} | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after set_visit |
| A3 | `send_message` | {"ticket_ref":"NBL-025-warranty-dates","recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"ticket_ref":"NBL-025-warranty-dates","recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"sms","contact":"07700 900426","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"ticket_ref":"NBL-025-warranty-dates","recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"existing thread (ev… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Harbour Services attend 2024-05-22 14:30 to diagnose. Land… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
