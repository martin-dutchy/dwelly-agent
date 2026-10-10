# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second subcontractor quote rather than approving Alder Compliance's £1,370 estimate. The estimate was not actually attached to the 6 April email, so it was re-sent to the landlord with a request for a preferred subcontractor, and the provider was asked to confirm VAT and the scope gaps. The job is on hold for the landlord until 2025-04-09.

## Where the case stands
Check-out works estimate stage (ticket NBL-008-3466, stage mp_time). Provider Alder Compliance estimated £1,370 (VAT not itemised), recorded as quote Q-101. The landlord (Langley) asked on 6 Apr for one other subcontractor to quote for comparison. No approval given. Job on hold waiting for the landlord, review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Re-sent the Alder Compliance estimate to the landlord (the 6 Apr email attached the inspection report twice, not the estimate) and asked for a preferred subcontractor name; otherwise a comparison quote will be sourced. | Langley, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Asked Alder Compliance to confirm VAT, whether the bedroom carpet and bedroom walls are in scope, and whether the tap is repair or replacement. | Alder Compliance, contractor | email | A3 ✅ |
| 3 | WAIT | Wait for the landlord's reply. Review on 2025-04-09; if still silent, chase by phone and source a comparison quote only if the landlord agrees. | Langley, landlord | phone_call | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Langley (landlord) via email, existing thread (event 009 email)** (verified)

> Hi Langley, thanks for your message. We can get a second quote for comparison. Please note the email we sent on 6 April listed the inspection report twice, not the estimate. The estimate (Alder Compliance, £1,370, VAT not itemised) is attached now for your review. Do you have a preferred subcontractor you would like us to ask? If not, we will source a comparison quote for the same scope. Please also note the estimate does not cover replacing the bedroom carpet, which was in the original check-out request, so we will check this with the contractor. No work will go ahead until you have approved a quote. Northbridge Lettings

**A3 · send_message → Alder Compliance (contractor) via email, existing thread (event 003 email)** (verified)

> Hello, thank you for the estimate for Flat 5, 55 Lantern Quay (job NBL-008-3466, £1,370). Please confirm in writing: 1) whether the price includes VAT; 2) whether the bedroom carpet (burn damage and stains) is included, as the original request asked for its replacement; your estimate says it can stay; 3) whether the bath tap is to be repaired or replaced (the report says dripping, not broken); 4) whether the bedroom walls and ceiling are included, as the original request asked for the bedroom to be repainted. The landlord is considering a second quote, so please send the revised scope and price by reply. Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the estimate as quote Q-101 does not approve it; no spend is authorised.
- Sending the estimate does not mean the landlord has seen it or accepted it.
- No comparison contractor has been instructed yet.
- No visit has been booked.
- The landlord has not said which subcontractor to use.
- No tenant message was sent: the tenant has vacated and the record holds no tenant contact.

## Remaining work
- Landlord to name a preferred subcontractor or agree to a comparison quote (landlord, review 2025-04-09).
- Alder Compliance to confirm VAT and scope, and send a revised quote if needed (provider).
- Get a second quote and compare it; landlord to approve one quote before any work (agency).
- After approval: assign the contractor, book the visit, record the result, then invoice and close.

## Missing or unavailable information
- Landlord's preferred subcontractor, if any.
- Whether the £1,370 includes VAT.
- Whether the bedroom carpet and walls are in the estimate's scope.
- Whether the bath tap needs replacing or repair.
- Tenant vacating date and current occupancy; not in the record.

## Conflicts between sources
- Event 006 says the estimate is attached, but the listed attachments are the inspection report twice. The estimate was re-sent (A2).
- The estimate says the main-room carpet can stay, but the request asks for the bedroom carpet to be replaced.
- The estimate includes replacing the bath tap, but the report says the tap is dripping (repair), so the scope is unclear.
- The estimate says 'main room' walls, while the request says bedroom. The bedroom is likely the main room, but this is unconfirmed.
- Inspection report dates say 5 January 2026, but the signature and case dates are April 2025. Not resolved; treated as a date error in the report.
- Attachment-04 invoice is listed in the case hints but was not provided; not read.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A provider estimate is in (£1,370, VAT not itemised, recorded as Q-101). The landlord asked for a second subcontractor quote and has approved nothing. Outstanding: the landlord's subcontractor choice, the provider's VAT and scope confirmation, the second quote, and landlord approval. Job on hold until 2025-04-09.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord (Langley) with the estimate attached and a request for a preferred subcontractor (A2). Email Alder Compliance to confirm VAT and the carpet, wall and tap scope (A3). Chase the landlord by phone on 2025-04-09 if there is no reply (A5).

**3. Does anything need a human decision, and why?**

Not yet. Choosing the contractor and approving spend is the landlord's decision. Escalate only if the landlord stays silent after the chase or the provider cannot confirm the scope.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Alder Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 003 email)","ticket_r… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord asked for a second subcontractor quote for comparison (even… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
