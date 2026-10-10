# Kitchen cabinet maintenance request: ANSWER

**Decision:** action_taken · **Severity:** routine

Full-kitchen quote received and already forwarded to the landlord; no replacement approval exists and no visit is booked. I recorded the quote, held the job for the landlord, asked the contractor for the missing cupboards-and-doors estimate and a firm total, updated the tenant with interim cut-safety advice, and escalated the commission/VAT question.

## Where the case stands
Stage init, on hold (Waiting for Landlord) until 2025-09-29. Landlord decision on the full-kitchen quote is awaited; the cupboards-and-doors estimate is outstanding from the contractor; no visit is confirmed; the tenant's 16-18 Sept windows have passed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on the quote; review 29 Sep | Soren Pike, landlord | internal | A2 ✅ |
| 2 | CHASE_PROVIDER | Request cupboards-and-doors estimate and firm total by 29 Sep | Kellan Rook, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant, no visit booked, tape sharp edges | Elowen Marr, tenant | email | A4 ✅ |
| 4 | ESCALATE_TO_HUMAN | Management to settle commission/VAT basis | management | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Kellan Rook (contractor) via email, existing thread (event 024 email)** (verified)

> Hi Kellan, thanks for the full-kitchen figures. Two things please, by Monday 29 September: (1) the separate estimate the landlord asked for for replacement cupboards and doors only, keeping the existing appliances, worktops and flooring, priced line by line; (2) a total showing how VAT and your commission are applied. Please don't treat the quote as approved or book any start: the landlord has not approved replacement work. Please also suggest a visit slot to check the damage and the electrical item; the tenant has two dogs so access must be arranged in advance, and we'll confirm with her.

**A4 · send_message → Elowen Marr (tenant) via email, existing thread (event 010 email)** (verified)

> Hi Elowen, sorry for the slow update. The contractor has sent a price for a new kitchen and we've passed it to your landlord to decide. We're also waiting on a price for replacing only the cupboards and doors. Nothing is approved yet and no visit is booked, so nobody should be expected on 16-18 September; we'll agree a new date with you in advance, around the dogs. In the meantime, please cover the sharp peeling edges with strong tape and avoid touching them, and let us know if anyone is cut badly (seek medical help if needed). We'll update you by 29 September.

## Escalations
### 1. Confirm the commission basis, any cap and VAT treatment so the total is firm → Management team
- Escalation: A5 ✅ verified · P3 → management: Contractor commission basis, any cap and VAT treatment unresolved on a ~£8,880+VAT job
- Known: Event 022/023: contractor raised 15% commission concerns; previous arrangement was told verbally, with no calculation, cap or total settled. Event 024 quote £4,850+£3,800+£230 plus VAT (£8,880) plus £380 electrical estimate. Landlord approval only covers laminate repair (event 006); no replacement approved.
- Missing: Applicable commission basis and cap, VAT treatment, payable total; cupboards-and-doors estimate.
- Options: Confirm previous basis in writing; Renegotiate
- Recommendation: Confirm in writing before the landlord decides
- Deadline: 2025-09-29
- Evidence: events 022, 023, 024
- Done before handover:
  - Recorded quote _(no ledger entry cited)_
  - Asked contractor for total and second estimate _(no ledger entry cited)_
  - Updated tenant _(no ledger entry cited)_
  - Held job _(no ledger entry cited)_

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Soren Pike, landlord | Chase quote decision on second channel if no reply | 2025-09-29 | A2 ✅ verified |

## What this does not establish
- Recording the quote does not approve it or any replacement work
- Nothing confirms a visit date, the commission basis, or the payable total
- The tenant message does not promise a date

## Remaining work
- Landlord decision on full kitchen vs cupboards/doors vs laminate repair
- Contractor estimate for cupboards and doors
- Management ruling on commission/VAT
- Arrange visit with dog access once approved or for assessment

## Missing or unavailable information
- Cupboards-and-doors-only estimate
- Commission basis, cap and VAT treatment
- Landlord's decision

## Unknowns
- Whether the landlord prefers the full kitchen or the cheaper option

## Conflicts between sources
- Record_quote returned a total of £10,656 (system, incl. VAT on £8,880), the quote's own electrical £380 is excluded from the stated total; the contractor's lines are ex-VAT.
- Landlord voicemail (event 015) said enquiries go to his office; no office contact is on file, so the landlord record was used.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Only the laminate-repair scope is approved. The full-kitchen quote (£8,880 + VAT, plus £380 + VAT electrical estimate) is with the landlord for decision. The cupboards-and-doors estimate has not arrived. Commission, cap and VAT are unsettled. No visit or dog-access arrangement exists.

**2. What is the next action, for whom, via which channel?**

Wait for the landlord's decision (hold to 29 Sep). Contractor was chased by email for the second estimate and a firm total. The tenant was updated by email.

**3. Does anything need a human decision?**

Yes, P3 management: confirm the contractor commission, cap and VAT basis (ESC-104). Spend approval remains the landlord's decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-010","provider":"Alderline Joinery","amount_gbp":8880,"vat":"plus_vat","items":["Supply of new kitchen £4,850 + VAT","Rem… | 1 | ✅ verified | Ticket NBL-010 read back after record_quote |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-010","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on full-kitchen quote forwarded 24 Sep (event … | 1 | ✅ verified | Ticket NBL-010 read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Kellan Rook","recipient_role":"contractor","channel":"email","contact":"existing thread (event 024 email)","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Elowen Marr","recipient_role":"tenant","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Contractor commission basis, any cap and VAT treatment unresolved on a ~£8,880+VAT job","know… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
