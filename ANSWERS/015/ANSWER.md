# Vacant Property Preparation: ANSWER

**Decision:** action_taken · **Severity:** routine

Sanitation, waste removal and garden clearance at vacant 18 Thistlevaunt Lane remain on hold. Landlord approval is conditional on bond recovery, her 17 Sept "approved quote" is ambiguous, and the separate maintenance is unscheduled. I recorded the conditional decision and quote, asked the landlord to confirm, put the contractor on notice, held the ticket to 29 Sept and escalated the deposit claim.

## Where the case stands
Stage init, on hold (waiting for landlord) with review 2025-09-29. No visit booked. Waiting on the landlord's confirmation, the separate maintenance schedule and the deposit claim figures.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm which quote 'approved quote' meant and the bond condition | Nessa Quill, landlord | email | A3 ✅ |
| 2 | CHASE_PROVIDER | Keep on hold and ask about soil and VAT | Elian Wren, contractor | email | A6 ✅ |
| 3 | ESCALATE_TO_HUMAN | Deposit claim exceeds deposit | accounts | internal | A4 ✅ |
| 4 | WAIT | Hold until 29 Sept review | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Nessa Quill (landlord)** (verified)

> Please confirm yes or no: does your 17 Sept message "approved quote" mean you approve Brindlewick's £665 quote (ref NBL-015-Q1) for post-tenancy cleaning, rubbish removal and garden tidy at 18 Thistlevaunt Lane? Your earlier approval was conditional on recovery from the former tenants' bond. (£665)
> 
> Options: Yes, approve the £665 quote, accepting it may not be fully recoverable: the deposit held is £650 and the claim is still being prepared; No, the 17 Sept message referred to the separate maintenance quote; sanitation stays conditional on bond recovery; Different route, e.g. a second quote or your own contractor
> 
> Update: Sanitation work is on hold, no visit booked. It waits on the separate major maintenance being scheduled; we have no completion date and a prospective tenant wants to move in on 28 Sept. The quote does not expressly cover making good the disturbed soil in the rear garden; we will ask the contractor. Contractor has been told not to book until further notice. We will review on 2025-09-29.

**A6 · send_message → Elian Wren (contractor) via email, existing thread (event 014 email)** (verified)

> Hello Elian, thank you for your patience. The work at 18 Thistlevaunt Lane is still on hold: please do not book it yet. We are waiting on a landlord confirmation and on other maintenance being scheduled first. We will update you by 29 September. One question: does your £665 quote (NBL-015-Q1) include making good the disturbed soil in the rear garden, and does it include VAT? Please reply by 29 September.

**A7 · send_message → Tovan Rusk (internal) via email, agency internal** (verified)

> NBL-015 update: landlord approval on file is conditional on bond recovery (events 008/010); his 17 Sept "approved quote" is ambiguous and I've asked him to confirm by 29 Sept. Contractor told to stay on hold, and asked about soil and VAT. Deposit claim exceeds £650 deposit; escalated to accounts (ESC-103). Please send me the maintenance completion date when known.

## Escalation
- **P3 → accounts** (verified): Deposit claim: landlord approval conditional on bond recovery, but costs exceed the £650 deposit
  - Known: Landlord events 008/010: approval only if recovered from bond. Quote £665 (NBL-015-Q1) plus tenant-attributed damage exceed £650 deposit (event 011); claim being prepared. Event 016 "approved quote" unspecified; ask sent to landlord. Work on hold pending separate maintenance; prospective tenant 28 Sept.
  - Missing: Final itemised claim figures; whether the deposit scheme will allow the claim; landlord's answer on which quote he approved; maintenance completion date.
  - Options: Prepare deposit claim and decide whether the landlord covers any shortfall; Wait until the claim is agreed before instructing work
  - Recommendation: Owner of the deposit claim to finalise itemised figures by 29 Sept; instruct work only once the landlord confirms in writing.
  - Deadline: 2025-09-29

## What this does not establish
- The conditional record is not approval to instruct.
- No visit is booked and no date is promised.
- The deposit claim is not decided.

## Remaining work
- Landlord confirmation (agency, by 29 Sept)
- Separate maintenance scheduling (Tovan Rusk)
- Deposit claim figures (accounts)
- Contractor answer on soil and VAT

## Missing or unavailable information
- Which quote the 17 Sept message approved
- Maintenance completion date
- Whether the quote includes VAT or soil making good

## Conflicts between sources
- Event 016 'approved quote' conflicts with the earlier conditional approval; treated as unclear.
- Event 007 described the work generally; event 011 mentions a £650 figure that is the deposit, not a quote.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

On hold. The £665 quote (NBL-015-Q1) is on file. Landlord approval is conditional on bond recovery, but the deposit is only £650. The 17 Sept 'approved quote' does not say which quote. The separate major maintenance is not scheduled or completed. No visit is booked. The quote does not expressly cover the disturbed soil.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord by email to confirm which quote she approved (APR-102). Keep the contractor on hold and ask about soil and VAT (email). Tell Tovan Rusk internally. Review on 29 Sept.

**3. Does anything need a human decision, and why?**

Yes. The deposit claim exceeds the £650 deposit and approval depends on bond recovery, so accounts need to finalise the claim and decide how any shortfall is handled (ESC-103, P3).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-015","decision":"conditional","evidence_quote":"Happy to approve if they are recovered from the bond as there is no way i… | 1 | ✅ verified | Ticket NBL-015 read back after record_landlord_decision |
| A2 | `record_quote` | {"ticket_ref":"NBL-015","provider":"Brindlewick Turnover Services","amount_gbp":665,"vat":"none","items":["Degrease oven, hob and extractor"… | 1 | ✅ verified | Ticket NBL-015 read back after record_quote |
| A3 | `request_landlord_approval` | {"landlord":"Nessa Quill","ticket_ref":"NBL-015","decision_needed":"Please confirm yes or no: does your 17 Sept message \"approved quote\" m… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"accounts","reason":"Deposit claim: landlord approval conditional on bond recovery, but costs exceed the £650 deposi… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-015","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation that 17 Sept \"approved quote\" is the £66… | 1 | ✅ verified | Ticket NBL-015 read back after put_on_hold |
| A6 | `send_message` | {"recipient_name":"Elian Wren","recipient_role":"contractor","channel":"email","contact":"existing thread (event 014 email)","body":"Hello E… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Tovan Rusk","recipient_role":"internal","channel":"email","contact":"agency internal","body":"NBL-015 update: landlord ap… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
_None._
