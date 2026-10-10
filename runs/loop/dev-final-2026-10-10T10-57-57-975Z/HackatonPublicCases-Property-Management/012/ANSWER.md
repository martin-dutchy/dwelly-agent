# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's troubleshooting failed, and the landlord had already agreed an engineer inspection. The visit is booked for 29/04 8am-12pm. I sent the tenant written confirmation, logged the name discrepancies, returned the ticket to auto mode and set a follow-up for 30/04.

## Where the case stands
Ticket NBL-012 at visit stage. Tenant's checks failed, landlord agreed an engineer inspection, provider assigned, visit set for Wed 29/04/2026 08:00-12:00 and the provider has been told. Waiting on the visit result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Confirm the 29 April 8am-12pm visit in writing to the tenant | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Wait for the visit and report; follow-up set for 30/04. Any quote goes to the landlord before work. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for doing the checks. The engineer is booked to look at the dishwasher door on Wednesday 29 April between 8am and 12pm, as you agreed on the phone. Please make sure someone is home to let them in. If that time no longer works, let us or the engineer know. They will look at the problem and, if it needs a quote, we will agree that with the landlord before any repair work. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Confirming the visit does not establish the cause, the cost, or who pays
- Inspection approval is not approval of any repair quote
- The provider name and tenant surname discrepancies are not resolved

## Remaining work
- Visit on 29/04 and record the result
- If a quote is needed, record it and get landlord approval
- Confirm which firm is attending (Riverside Compliance vs Cedar Utilities)
- Invoice, documents, tenant confirmation and landlord update before closing

## Missing or unavailable information
- Property record has no landlord, spend limit or contractor details
- Which firm is attending: Riverside Compliance or Cedar Utilities

## Conflicts between sources
- Provider: Riverside Compliance (events 014/015/018) vs Cedar Utilities (event 016). I trusted the assignment emails.
- Tenant surname: Turner (emails) vs Kendall (event 016). I trusted Turner.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage. Inspection booked for 29/04/2026 8am-12pm. Outstanding: the visit result, any quote and landlord approval, the invoice, and closing.

**2. What is the next action, who is it for, and through which channel?**

Written confirmation of the visit slot to the tenant, Leo Turner, by email (sent). Then wait for the visit.

**3. Does anything need a human decision, and why?**

No. The case is routine and within process. The name discrepancies are noted for checking and don't need a decision now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012","note":"Record conflicts: assigned provider is Riverside Compliance (events 014/015/018) but the call log (event 016) na… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012"} | 1 | ✅ verified | Ticket NBL-012 read back after resume_auto |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-30","purpose":"Check the visit result for dishwasher inspection on 29/04; chase provider for repor… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
