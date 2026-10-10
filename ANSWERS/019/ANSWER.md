# Move-out maintenance at 18 Brindle Row: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider invoiced £174 for work done without a quote or written authority and with no visit evidence. I held payment, asked the provider for evidence and itemisation, and told the landlord. No human decision is needed yet.

## Where the case stands
Ticket NBL-019 on hold (waiting for provider, review 2025-09-15). Landlord approved works generally on 7 Sept with no limit; provider was asked for a quote only but says he did the work on 9 Sept and invoiced £174. No visit, access, scope or photo evidence. Payment held.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider for attendance date, access method, photos, itemised prices, who authorised the start and confirmation of scope, by 15 Sept | Rowan Pike, Alder & Finch Repairs | email | A3 ✅ |
| 2 | OTHER | Update landlord: invoice received, payment held, evidence requested | Ivo Marlow, landlord | email | A4 ✅ |
| 3 | WAIT | Hold ticket pending provider reply; review 15 Sept | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Rowan Pike (contractor) via email, existing thread (event 014 email)** (verified)

> - On what date did you attend 18 Brindle Row, and how did you get access (the tenant left on 27 August)?
> - Please send dated before and after photos of all six items.
> - Please give itemised prices for each of the six items, including materials. The invoice shows one £174.00 figure.
> - Who at Northbridge told you to start work? Our email of 7 Sept asked for a quote only and no work before written authority.
> - The invoice mentions replacing a floorboard and reinstating carpet, and a new Venetian blind. Please confirm what was done, as we asked about cracked chipboard and a blind repair.
> 
> Why: Invoice NBL-019-INV-11 arrived with no visit record, quote or completion evidence. Payment is on hold until this is clarified. Please reply by 15 September 2025.

**A4 · send_message → Ivo Marlow (landlord) via email, agency landlord record** (verified)

> Hello Mr Marlow. An update on the remedial works at 18 Brindle Row. Alder & Finch Repairs say they have completed the six items and have sent an invoice for £174.00 dated 11 September. We had asked them for a quote only and had not authorised a start, and we have no record of the visit date, how they got in, or photos. We have put payment on hold and asked them for these details, itemised prices and photos by 15 September. We have not confirmed the work was done. We will update you by then and will not pay anything before you hear from us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the work was done, or done to the stated scope.
- Landlord's general approval does not cover the unquoted £174 price or any scope variations.
- Payment hold does not decide whether the invoice is payable.

## Remaining work
- Review provider reply on 15 Sept; verify completion (photos, possibly inspect with agency keys)
- Decide payment, landlord to approve the amount
- If the provider cannot explain, escalate to accounts
- Close ticket only after evidence and invoice checks

## Missing or unavailable information
- Visit date and access method
- Photos or completion evidence
- Itemised prices
- Who authorised the start
- Whether the new Venetian blind was needed

## Conflicts between sources
- Event 012 note refers to awaiting an invoice before any was received; event 007/008 say quote only, whereas provider says he understood work was instructed.
- Tenant says he left 27 Aug and returned keys, while agency record held a set; access for the provider's visit is unexplained.
- Invoice describes replacing floorboard/carpet and a new blind, differing from the inspection items (chipboard crack, blind repair).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved works; provider says he completed them on 9 Sept and invoiced £174 (NBL-019-INV-11). Outstanding: evidence of visit, access, completion, itemised price, authorisation; payment held.

**2. What is the next action, who is it for, and through which channel?**

Evidence request to Rowan Pike by email (reply by 15 Sept), and landlord update by email; ticket held for review 15 Sept.

**3. Does anything need a human decision, and why?**

Not yet. Escalate to accounts if the provider's answer does not settle the unauthorised, unquoted invoice; the landlord must approve the amount.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `hold_payment` | {"payee":"Alder & Finch Repairs","reason":"Invoice NBL-019-INV-11 (£174) for 18 Brindle Row: no quote, no written authority, no visit date, … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-019","reason":"Waiting for Provider","comment":"Awaiting from Alder & Finch: attendance date, how access was gained, phot… | 1 | ✅ verified | Ticket NBL-019 read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Rowan Pike","recipient_role":"contractor","channel":"email","contact":"existing thread (event 014 email)","questions":["O… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Ivo Marlow","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-019","body… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
